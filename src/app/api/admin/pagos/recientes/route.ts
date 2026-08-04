export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/pagos/recientes
 * Últimas tablas de cuota creadas (agrupadas por curso + N° cuota).
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const limit = Math.min(Number(new URL(request.url).searchParams.get('limit') || 15), 50)

    const grupos = await prisma.registroCuotaManual.groupBy({
      by: ['curso_id', 'numero_cuota'],
      _count: { id: true },
      _max: { creado_en: true, actualizado_en: true },
      _sum: { monto_pago: true },
      orderBy: { _max: { creado_en: 'desc' } },
      take: limit
    })

    if (grupos.length === 0) {
      return ApiResponse.success(request, { recientes: [] })
    }

    const cursoIds = [...new Set(grupos.map(g => g.curso_id))]

    const [cursos, enviadosPorGrupo] = await Promise.all([
      prisma.curso.findMany({
        where: { id: { in: cursoIds } },
        select: {
          id: true,
          titulo: true,
          slug: true,
          categoria_id: true,
          categoria: {
            select: {
              id: true,
              nombre: true,
              categoria_padre_id: true,
              padre: { select: { id: true, nombre: true } }
            }
          }
        }
      }),
      prisma.registroCuotaManual.groupBy({
        by: ['curso_id', 'numero_cuota'],
        where: {
          confirmacion: 'ENVIADO',
          OR: grupos.map(g => ({ curso_id: g.curso_id, numero_cuota: g.numero_cuota }))
        },
        _count: { id: true }
      })
    ])

    const cursoMap = new Map(cursos.map(c => [c.id, c]))

    const enviadosMap = new Map(
      enviadosPorGrupo.map(e => [`${e.curso_id}:${e.numero_cuota}`, e._count.id])
    )

    const recientes = grupos.map(g => {
      const curso = cursoMap.get(g.curso_id)
      const subcategoria = curso?.categoria
      const categoria = subcategoria?.padre

      return {
        curso_id: g.curso_id,
        curso_titulo: curso?.titulo ?? 'Programa',
        curso_slug: curso?.slug ?? '',
        numero_cuota: g.numero_cuota,
        totalAlumnos: g._count.id,
        enviados: enviadosMap.get(`${g.curso_id}:${g.numero_cuota}`) ?? 0,
        montoTotal: Number(g._sum.monto_pago ?? 0),
        creado_en: g._max.creado_en,
        actualizado_en: g._max.actualizado_en,
        categoria_id: categoria?.id ?? subcategoria?.categoria_padre_id ?? '',
        categoria_nombre: categoria?.nombre ?? '',
        subcategoria_id: subcategoria?.id ?? curso?.categoria_id ?? '',
        subcategoria_nombre: subcategoria?.nombre ?? ''
      }
    })

    return ApiResponse.success(request, { recientes })
  } catch (error) {
    return handleApiError(error, request)
  }
}
