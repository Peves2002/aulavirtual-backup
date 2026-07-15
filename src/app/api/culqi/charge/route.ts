import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { completeOrder } from '@/utils/libs/order-service'

/**
 * POST /api/culqi/charge
 * Recibe el token generado por Culqi Checkout y procesa el cargo.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const { pedidoId, tokenId, email } = await request.json()

    if (!pedidoId || !tokenId) {
      return ApiResponse.error(request, 'Datos de pago incompletos (pedidoId o tokenId faltante)', 400)
    }

    // 1. Obtener el pedido y las llaves de configuración
    const [pedido, configs] = await Promise.all([
      prisma.pedido.findUnique({
        where: { id: pedidoId },
        include: { detalles: true }
      }),
      getConfigs()
    ])

    if (!pedido) {
      return ApiResponse.error(request, 'Pedido no encontrado', 404)
    }

    if (pedido.usuario_id !== auth.user.id) {
      return ApiResponse.error(request, 'No tienes permiso para procesar este pedido', 403)
    }

    if (pedido.estado === 'COMPLETADO') {
      return ApiResponse.error(request, 'Este pedido ya ha sido procesado anteriormente', 400)
    }

    // 2. Preparar el cargo para Culqi
    const privateKey = configs.CULQI_PRIVATE_KEY

    if (!privateKey || privateKey.includes('placeholder')) {
      return ApiResponse.error(
        request,
        'La pasarela Culqi no está configurada correctamente (falta la llave privada)',
        500
      )
    }

    let culqiData: any

    if (tokenId === 'PAYMENT_SUCCESS') {
      // El widget de Culqi Checkout se abrió con una Order (flujo usado por este checkout) y ya
      // procesó el pago del lado de Culqi: no hay token de tarjeta que cobrar, solo se debe
      // verificar el estado real de la orden antes de completar el pedido.
      const culqiOrderId = pedido.token_pago

      if (!culqiOrderId) {
        return ApiResponse.error(request, 'No se encontró la orden de Culqi asociada a este pedido', 400)
      }

      const orderResponse = await fetch(`https://api.culqi.com/v2/orders/${culqiOrderId}`, {
        headers: { Authorization: `Bearer ${privateKey}` }
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        console.error('[CULQI_ORDER_VERIFY_ERROR]', orderData)

        return ApiResponse.error(
          request,
          orderData.user_message || 'Error al verificar la orden con Culqi',
          orderResponse.status
        )
      }

      if (orderData.state !== 'paid') {
        return ApiResponse.error(request, `El pago no pudo ser confirmado (estado: ${orderData.state})`, 400)
      }

      culqiData = orderData
    } else {
      // Flujo de token directo (checkout sin Order, ej. suscripciones)
      const amountInCents = Math.round(Number(pedido.total) * 100)
      const currency = pedido.moneda || 'PEN'

      // 3. Crear el cargo en la API de Culqi v2
      const culqiResponse = await fetch('https://api.culqi.com/v2/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${privateKey}`
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency_code: currency,
          email: email || auth.user.email,
          source_id: tokenId,
          description: `Pedido #${pedido.numero_pedido} - Aula Virtual`,
          antifraud_details: {
            first_name: auth.user.nombre?.split(' ')[0] || auth.user.name?.split(' ')[0] || 'User',
            last_name: auth.user.nombre?.split(' ').slice(1).join(' ') || auth.user.apellido || auth.user.name?.split(' ').slice(1).join(' ') || 'User',
            email: auth.user.email || '',
            address: 'Av. Principal 123',
            address_city: 'Lima',
            country_code: 'PE',
            phone_number: '999999999'
          },
          metadata: {
            pedido_id: pedido.id,
            numero_pedido: pedido.numero_pedido,
            usuario_id: auth.user.id,
            plataforma: 'Aula Virtual'
          }
        })
      })

      culqiData = await culqiResponse.json()

      if (!culqiResponse.ok) {
        console.error('[CULQI_CHARGE_ERROR]', culqiData)

        return ApiResponse.error(
          request,
          culqiData.user_message || 'Error al procesar el cargo con Culqi',
          culqiResponse.status
        )
      }
    }

    // 4. Pago exitoso - Completar el pedido
    // culqiData contiene el objeto charge de Culqi
    const { pedido: pedidoActualizado, inscripciones } = await completeOrder(pedidoId, {
      metodo_pago: 'CULQI',
      transaccion_id: culqiData.id,
      respuesta_pago: culqiData
    })

    return ApiResponse.success(request, {
      message: '¡Pago exitoso! Tu inscripción ha sido activada.',
      pedido: pedidoActualizado,
      inscripciones,
      chargeId: culqiData.id
    })
  } catch (error) {
    console.error('[CULQI_ROUTE_ERROR]', error)

    return handleApiError(error, request)
  }
}
