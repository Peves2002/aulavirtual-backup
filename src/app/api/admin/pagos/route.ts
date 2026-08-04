export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { asStringArray } from '@/utils/libs/pagos-cuota'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/pagos?cursoId=
 * Lista registros de cuota, módulos del curso y accesos por inscripción.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const cursoId = searchParams.get('cursoId')

    if (!cursoId) {
      return ApiResponse.error(request, 'cursoId es obligatorio', 400)
    }

    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },
      select: {
        id: true,
        titulo: true,
        slug: true,
        modulos: {
          orderBy: { orden: 'asc' },
          select: { id: true, titulo: true, orden: true }
        }
      }
    })

    if (!curso) {
      return ApiResponse.error(request, 'Curso no encontrado', 404)
    }

    const [registros, accesos, totalInscritos, configs] = await Promise.all([
      prisma.registroCuotaManual.findMany({
        where: { curso_id: cursoId },
        orderBy: [
          { numero_cuota: 'asc' },
          { usuario: { apellido: 'asc' } },
          { usuario: { nombre: 'asc' } },
          { id: 'asc' }
        ],
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              correo: true,
              numero_documento: true
            }
          }
        }
      }),
      prisma.accesoModuloInscripcion.findMany({
        where: { inscripcion: { curso_id: cursoId } },
        select: { inscripcion_id: true, modulo_id: true }
      }),
      prisma.inscripcion.count({
        where: { curso_id: cursoId, estado: { in: ['ACTIVO', 'COMPLETADO'] } }
      }),
      prisma.configCuotaManual.findMany({
        where: { curso_id: cursoId },
        select: { numero_cuota: true, modulo_ids: true }
      })
    ])

    const accesosPorInscripcion: Record<string, string[]> = {}

    for (const acceso of accesos) {
      if (!accesosPorInscripcion[acceso.inscripcion_id]) {
        accesosPorInscripcion[acceso.inscripcion_id] = []
      }

      accesosPorInscripcion[acceso.inscripcion_id].push(acceso.modulo_id)
    }

    const modulosPorCuota: Record<string, string[]> = {}

    for (const cfg of configs) {
      modulosPorCuota[String(cfg.numero_cuota)] = asStringArray(cfg.modulo_ids)
    }

    const tablasMap = new Map<
      number,
      { numero_cuota: number; totalAlumnos: number; enviados: number; montoTotal: number }
    >()

    for (const r of registros) {
      const actual = tablasMap.get(r.numero_cuota) ?? {
        numero_cuota: r.numero_cuota,
        totalAlumnos: 0,
        enviados: 0,
        montoTotal: 0
      }

      actual.totalAlumnos += 1

      if (r.confirmacion === 'ENVIADO') actual.enviados += 1
      actual.montoTotal += Number(r.monto_pago)
      tablasMap.set(r.numero_cuota, actual)
    }

    const tablas = [...tablasMap.values()].sort((a, b) => a.numero_cuota - b.numero_cuota)

    const siguienteCuota =
      tablas.length > 0 ? Math.max(...tablas.map(t => t.numero_cuota)) + 1 : 1

    return ApiResponse.success(request, {
      curso: { id: curso.id, titulo: curso.titulo, slug: curso.slug },
      modulos: curso.modulos,
      registros: registros.map(r => ({
        id: r.id,
        curso_id: r.curso_id,
        inscripcion_id: r.inscripcion_id,
        usuario_id: r.usuario_id,
        numero_cuota: r.numero_cuota,
        monto_pago: Number(r.monto_pago),
        confirmacion: r.confirmacion,
        alumno: `${r.usuario.nombre} ${r.usuario.apellido}`.trim(),
        dni: r.usuario.numero_documento ?? '',
        correo: r.usuario.correo
      })),
      accesosPorInscripcion,
      modulosPorCuota,
      totalInscritos,
      tieneTabla: registros.length > 0,
      tablas,
      siguienteCuota
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
