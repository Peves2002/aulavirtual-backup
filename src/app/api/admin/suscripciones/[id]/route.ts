export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'
import { culqiSuscripcion } from '@/utils/libs/culqi-suscripcion'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || auth.user.rol !== 'ADMIN') {
      return ApiResponse.error(request, 'No tienes permisos', 403)
    }

    const suscripcion = await prisma.suscripcion.findUnique({ where: { id: params.id } })

    if (!suscripcion) return ApiResponse.error(request, 'Suscripción no encontrada', 404)

    const body = await request.json()
    const { estado, fecha_proximo_cobro } = body

    const data: Record<string, any> = {}

    if (estado) data.estado = estado
    
    if (fecha_proximo_cobro !== undefined) {
      data.fecha_proximo_cobro = fecha_proximo_cobro ? new Date(fecha_proximo_cobro) : null
    }

    if (estado === 'CANCELADA' && suscripcion.estado !== 'CANCELADA') {
      data.fecha_cancelacion = new Date()
      data.cancelado_por_usuario = false

      if (suscripcion.culqi_suscripcion_id) {
        try {
          await culqiSuscripcion.cancelarSuscripcion(suscripcion.culqi_suscripcion_id)
        } catch (e: any) {
          console.error('Error cancelando en Culqi:', e?.message)
        }
      }
    }

    const actualizada = await prisma.suscripcion.update({
      where: { id: params.id },
      data
    })

    return ApiResponse.success(request, { suscripcion: actualizada })
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || auth.user.rol !== 'ADMIN') {
      return ApiResponse.error(request, 'No tienes permisos', 403)
    }

    const suscripcion = await prisma.suscripcion.findUnique({ where: { id: params.id } })

    if (!suscripcion) return ApiResponse.error(request, 'Suscripción no encontrada', 404)

    if (suscripcion.culqi_suscripcion_id) {
      try {
        await culqiSuscripcion.cancelarSuscripcion(suscripcion.culqi_suscripcion_id)
      } catch (e: any) {
        console.error('Error cancelando en Culqi:', e?.message)
      }
    }

    await prisma.suscripcion.update({
      where: { id: params.id },
      data: { estado: 'CANCELADA', fecha_cancelacion: new Date() }
    })

    return ApiResponse.success(request, { message: 'Suscripción cancelada' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
