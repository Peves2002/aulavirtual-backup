/**
 * Backfill de una sola vez: congela `plantilla_id` / `firmante_1` / `firmante_2`
 * en `Certificado.datos` para certificados emitidos ANTES de que existiera ese
 * snapshot (ver src/app/api/_shared/certificados/getPdfBuffer.ts).
 *
 * Usa la configuración ACTUAL del curso de cada certificado como mejor dato
 * disponible (no había forma de saber qué plantilla/firmantes tenía el curso
 * en el momento exacto de cada emisión pasada).
 *
 * Es idempotente: solo toca certificados cuyo `datos.plantilla_id` no existe
 * todavía, y solo agrega esos 3 campos sin tocar nada más de `datos`
 * (preserva archivo_pdf, pdf_history, snapshot de curso/profesor/fechas, etc).
 *
 * Uso:
 *   npx dotenv -e .env -- npx tsx prisma/scripts/backfill-certificado-snapshot.ts          (dry-run, solo reporta)
 *   npx dotenv -e .env -- npx tsx prisma/scripts/backfill-certificado-snapshot.ts --apply   (aplica los cambios)
 */
import { PrismaClient } from '@prisma/client'
import { resolverFirmantes } from '../../src/app/api/_shared/certificados/resolverFirmantes'
import { resolverPlantillaId } from '../../src/app/api/_shared/certificados/resolverPlantilla'
import { getConfigs } from '../../src/utils/libs/config'

const prisma = new PrismaClient()
const APLICAR = process.argv.includes('--apply')

async function main() {
  const certificados = await prisma.certificado.findMany({
    select: { id: true, curso_id: true, datos: true }
  })

  const pendientes = certificados.filter(c => {
    const datos = c.datos as any

    return !datos?.plantilla_id || typeof datos.plantilla_id !== 'string'
  })

  console.log(`Certificados totales: ${certificados.length}`)
  console.log(`Certificados sin snapshot congelado: ${pendientes.length}`)

  if (pendientes.length === 0) {
    console.log('Nada que hacer.')
    await prisma.$disconnect()

    return
  }

  const cursoIds = [...new Set(pendientes.map(c => c.curso_id))]

  const [cursos, configs] = await Promise.all([
    prisma.curso.findMany({
      where: { id: { in: cursoIds } },
      select: {
        id: true,
        certificado_plantilla: true,
        firmante_1: { select: { nombre: true, cargo: true, firma: true, sello: true } },
        firmante_2: { select: { nombre: true, cargo: true, firma: true, sello: true } }
      }
    }),
    getConfigs()
  ])

  const cursosPorId = new Map(cursos.map(c => [c.id, c]))

  let actualizados = 0
  let saltados = 0

  for (const cert of pendientes) {
    const curso = cursosPorId.get(cert.curso_id)

    if (!curso) {
      console.warn(`  ⚠ Certificado ${cert.id}: su curso ${cert.curso_id} ya no existe, se salta`)
      saltados++
      continue
    }

    const plantillaId = resolverPlantillaId(curso.certificado_plantilla, configs)
    const { firmante1, firmante2 } = await resolverFirmantes({
      cursoFirmante1: curso.firmante_1,
      cursoFirmante2: curso.firmante_2,
      configs
    })

    const datosActuales = (cert.datos as any) || {}

    const nuevosDatos = {
      ...datosActuales,
      plantilla_id: plantillaId,
      firmante_1: firmante1,
      firmante_2: firmante2
    }

    console.log(
      `  ${APLICAR ? '✓' : '·'} ${cert.id}: plantilla_id=${plantillaId}, ` +
        `firmante_1=${firmante1?.nombre ?? 'null'}, firmante_2=${firmante2?.nombre ?? 'null'}`
    )

    if (APLICAR) {
      await prisma.certificado.update({
        where: { id: cert.id },
        data: { datos: nuevosDatos as any }
      })
    }

    actualizados++
  }

  console.log('')
  console.log(APLICAR ? `Actualizados: ${actualizados}` : `Se actualizarían: ${actualizados} (dry-run, no se escribió nada)`)
  if (saltados > 0) console.log(`Saltados (curso inexistente): ${saltados}`)
  if (!APLICAR) console.log('\nCorré de nuevo con --apply para aplicar los cambios.')

  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
