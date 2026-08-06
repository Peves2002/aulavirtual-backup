export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { asStringArray } from '@/utils/libs/pagos-cuota'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/pagos/por-alumno/[usuarioId]
 * Lista todos los registros de cuota de un alumno, con módulos por cuota.
 */
export async function GET(request: Request, { params }: { params: { usuarioId: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { usuarioId } = params

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        numero_documento: true,
        correo: true
      }
    })

    if (!usuario) {
      return ApiResponse.error(request, 'Alumno no encontrado', 404)
    }

    const registros = await prisma.registroCuotaManual.findMany({
      where: { usuario_id: usuarioId },
      orderBy: [{ curso: { titulo: 'asc' } }, { numero_cuota: 'asc' }],
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            slug: true,
            categoria: {
              select: {
                id: true,
                nombre: true,
                padre: { select: { id: true, nombre: true } }
              }
            }
          }
        }
      }
    })

    const cursoIds = [...new Set(registros.map(r => r.curso_id))]

    const [configs, modulos] =
      cursoIds.length > 0
        ? await Promise.all([
            prisma.configCuotaManual.findMany({
              where: { curso_id: { in: cursoIds } },
              select: { curso_id: true, numero_cuota: true, modulo_ids: true }
            }),
            prisma.modulo.findMany({
              where: { curso_id: { in: cursoIds } },
              select: { id: true, titulo: true, orden: true },
              orderBy: { orden: 'asc' }
            })
          ])
        : [[], []]

    const tituloById = new Map(modulos.map(m => [m.id, m.titulo]))
    const modulosPorCursoCuota = new Map<string, string[]>()

    for (const cfg of configs) {
      const key = `${cfg.curso_id}:${cfg.numero_cuota}`
      const titulos = asStringArray(cfg.modulo_ids)
        .map(id => tituloById.get(id))
        .filter((t): t is string => Boolean(t))

      modulosPorCursoCuota.set(key, titulos)
    }

    return ApiResponse.success(request, {
      alumno: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        alumno: `${usuario.nombre} ${usuario.apellido}`.trim(),
        dni: usuario.numero_documento ?? '',
        correo: usuario.correo
      },
      registros: registros.map(r => {
        const modulosCuota = modulosPorCursoCuota.get(`${r.curso_id}:${r.numero_cuota}`) ?? []

        return {
          id: r.id,
          curso_id: r.curso_id,
          curso_titulo: r.curso.titulo,
          categoria_nombre: r.curso.categoria?.padre?.nombre ?? '',
          subcategoria_nombre: r.curso.categoria?.nombre ?? '',
          inscripcion_id: r.inscripcion_id,
          usuario_id: r.usuario_id,
          numero_cuota: r.numero_cuota,
          monto_pago: Number(r.monto_pago),
          confirmacion: r.confirmacion,
          observaciones: r.observaciones ?? null,
          fecha_envio: r.fecha_envio.toISOString(),
          creado_en: r.creado_en,
          actualizado_en: r.actualizado_en,
          modulos_cuota: modulosCuota,
          modulos_enviados: r.confirmacion === 'ENVIADO' ? modulosCuota : []
        }
      })
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
