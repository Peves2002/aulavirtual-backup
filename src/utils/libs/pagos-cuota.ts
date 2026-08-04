import { randomUUID } from 'crypto'

import prisma from '@/utils/libs/prisma'

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value.filter((v): v is string => typeof v === 'string')
}

/**
 * Recalcula AccesoModuloInscripcion del curso:
 * unión de módulos de cada cuota donde el alumno tiene confirmación ENVIADO.
 */
export async function recalcularAccesosCurso(cursoId: string) {
  const [configs, registros] = await Promise.all([
    prisma.configCuotaManual.findMany({
      where: { curso_id: cursoId },
      select: { numero_cuota: true, modulo_ids: true }
    }),
    prisma.registroCuotaManual.findMany({
      where: { curso_id: cursoId },
      select: { inscripcion_id: true, numero_cuota: true, confirmacion: true }
    })
  ])

  const modulosPorCuota = new Map<number, string[]>()

  for (const cfg of configs) {
    modulosPorCuota.set(cfg.numero_cuota, asStringArray(cfg.modulo_ids))
  }

  const porInscripcion = new Map<string, Set<string>>()

  for (const reg of registros) {
    if (!porInscripcion.has(reg.inscripcion_id)) {
      porInscripcion.set(reg.inscripcion_id, new Set())
    }

    if (reg.confirmacion !== 'ENVIADO') continue

    const mods = modulosPorCuota.get(reg.numero_cuota) ?? []

    for (const moduloId of mods) {
      porInscripcion.get(reg.inscripcion_id)!.add(moduloId)
    }
  }

  const inscripcionIds = [...porInscripcion.keys()]

  await prisma.$transaction(async tx => {
    await tx.accesoModuloInscripcion.deleteMany({
      where: { inscripcion: { curso_id: cursoId } }
    })

    const data = [...porInscripcion.entries()].flatMap(([inscripcion_id, mods]) =>
      [...mods].map(modulo_id => ({
        id: randomUUID(),
        inscripcion_id,
        modulo_id
      }))
    )

    if (data.length > 0) {
      await tx.accesoModuloInscripcion.createMany({ data })
    }
  })

  return {
    inscripciones: inscripcionIds.length,
    accesos: [...porInscripcion.values()].reduce((acc, set) => acc + set.size, 0)
  }
}

export { asStringArray }
