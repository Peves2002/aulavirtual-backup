export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'

/**
 * GET /api/planes-suscripcion
 * Lista los planes activos (pública, para la página de pricing)
 */
export async function GET(request: Request) {
  try {
    const [planes, totalCursosPublicados] = await Promise.all([
      prisma.planSuscripcion.findMany({
        where: { esta_activo: true },
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          precio: true,
          moneda: true,
          intervalo: true,
          dias_prueba: true,
          esta_activo: true,
          beneficios: true,
          cursos: {
            include: {
              curso: { select: { id: true, titulo: true, miniatura: true, estado: true } }
            }
          },
          _count: { select: { suscripciones: true } }
        },
        orderBy: { precio: 'asc' }
      }),
      prisma.curso.count({ where: { estado: 'PUBLICADO' } })
    ])

    // cursos = lista de EXCLUSIÓN del plan; el plan da acceso a todos los cursos publicados salvo esos
    const planesConAcceso = planes.map(plan => ({
      ...plan,
      cursosIncluidosCount: Math.max(totalCursosPublicados - plan.cursos.length, 0)
    }))

    return ApiResponse.success(request, { planes: planesConAcceso })
  } catch (error) {
    return handleApiError(error, request)
  }
}
