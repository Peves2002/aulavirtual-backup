export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'
import { culqiSuscripcion, mapearEstadoCulqi } from '@/utils/libs/culqi-suscripcion'

/**
 * POST /api/estudiante/suscripciones/sync
 * Consulta el estado actual en Culqi y actualiza la suscripción PENDIENTE del usuario.
 * Usado cuando el webhook no llegó a tiempo o no incluyó subscription_id.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const suscripcion = await prisma.suscripcion.findFirst({
      where: {
        usuario_id: auth.user.id,
        estado: 'PENDIENTE',
        culqi_suscripcion_id: { not: null }
      },
      include: {
        plan: {
          include: {
            cursos: {
              include: { curso: { select: { id: true, titulo: true } } }
            }
          }
        }
      }
    })

    if (!suscripcion) {
      return ApiResponse.success(request, { sincronizado: false, mensaje: 'No hay suscripción pendiente para sincronizar' })
    }

    const culqiSub = await culqiSuscripcion.consultarSuscripcion(suscripcion.culqi_suscripcion_id!)

    const culqiStatus: number = culqiSub.status ?? 1
    const estadoNuevo = mapearEstadoCulqi(culqiStatus)

    console.log(`[SYNC_SUSCRIPCION] Culqi status=${culqiStatus} → estadoNuevo=${estadoNuevo} para sub=${suscripcion.id}`)

    // Solo actualizar si el estado cambió (Culqi confirmó que ya no está pendiente)
    if (estadoNuevo !== 'PENDIENTE') {
      const fechaProximo = culqiSub.next_billing_date
        ? new Date(Number(culqiSub.next_billing_date) * 1000)
        : suscripcion.fecha_proximo_cobro

      const actualizada = await prisma.$transaction(async tx => {
        const sub = await tx.suscripcion.update({
          where: { id: suscripcion.id },
          data: {
            estado: estadoNuevo,
            ...(fechaProximo && { fecha_proximo_cobro: fechaProximo })
          },
          include: {
            plan: {
              include: {
                cursos: {
                  include: { curso: { select: { id: true, titulo: true } } }
                }
              }
            }
          }
        })

        // Si el estado es ACTIVA y el pago inicial estaba como PENDIENTE, actualizarlo
        if (estadoNuevo === 'ACTIVA') {
          await tx.pagoSuscripcion.updateMany({
            where: { suscripcion_id: suscripcion.id, estado: 'PENDIENTE', culqi_cargo_id: null },
            data: { estado: 'COMPLETADO', periodo_fin: fechaProximo }
          })
        }

        return sub
      })

      return ApiResponse.success(request, { sincronizado: true, suscripcion: actualizada })
    }

    // Culqi aún reporta PENDIENTE — devolvemos la suscripción sin cambios
    return ApiResponse.success(request, { sincronizado: false, suscripcion })
  } catch (error) {
    console.error('[SYNC_SUSCRIPCION_ERROR]', error)

    return handleApiError(error, request)
  }
}
