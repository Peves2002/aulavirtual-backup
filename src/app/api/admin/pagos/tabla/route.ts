export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { recalcularAccesosCurso } from '@/utils/libs/pagos-cuota'
import { handleApiError } from '@/utils/libs/validation'

/**
 * DELETE /api/admin/pagos/tabla
 * Elimina todos los registros y la config de una cuota (tabla) de un curso.
 * Body: { cursoId, numeroCuota }
 */
export async function DELETE(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const cursoId = typeof body.cursoId === 'string' ? body.cursoId.trim() : ''
    const numeroCuota = Number(body.numeroCuota)

    if (!cursoId) {
      return ApiResponse.error(request, 'cursoId es obligatorio', 400)
    }

    if (!Number.isInteger(numeroCuota) || numeroCuota < 1) {
      return ApiResponse.error(request, 'numeroCuota inválido', 400)
    }

    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },
      select: { id: true, titulo: true }
    })

    if (!curso) {
      return ApiResponse.error(request, 'Curso no encontrado', 404)
    }

    const [deletedRegistros, deletedConfig] = await prisma.$transaction([
      prisma.registroCuotaManual.deleteMany({
        where: { curso_id: cursoId, numero_cuota: numeroCuota }
      }),
      prisma.configCuotaManual.deleteMany({
        where: { curso_id: cursoId, numero_cuota: numeroCuota }
      })
    ])

    if (deletedRegistros.count === 0 && deletedConfig.count === 0) {
      return ApiResponse.error(request, 'No existe esa tabla de cuota', 404)
    }

    await recalcularAccesosCurso(cursoId)

    return ApiResponse.success(request, {
      cursoId,
      numeroCuota,
      registrosEliminados: deletedRegistros.count,
      configsEliminadas: deletedConfig.count
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
