export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

/**
 * PATCH /api/admin/inscripciones/[id]/certificado
 * Actualiza la autorización individual de certificación o la habilitación por pago.
 * Sin tipo conserva el comportamiento de pago de los clientes existentes.
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { habilitado, tipo = 'pago' } = await request.json()

    if (tipo !== 'pago' && tipo !== 'certificacion') {
      return ApiResponse.error(request, 'Tipo de habilitación inválido', 400)
    }

    if (typeof habilitado !== 'boolean') {
      return ApiResponse.error(request, 'El campo habilitado debe ser un booleano', 400)
    }

    const inscripcion = await prisma.inscripcion.findUnique({ where: { id: params.id } })

    if (!inscripcion) {
      return ApiResponse.error(request, 'Inscripción no encontrada', 404)
    }

    const actualizada = await prisma.inscripcion.update({
      where: { id: params.id },
      data: tipo === 'certificacion'
        ? { certificacion_habilitada: habilitado }
        : { certificado_habilitado: habilitado },
      select: { id: true, certificado_habilitado: true, certificacion_habilitada: true, usuario_id: true, curso_id: true }
    })

    return ApiResponse.success(request, { inscripcion: actualizada })
  } catch (error) {
    return handleApiError(error, request)
  }
}
