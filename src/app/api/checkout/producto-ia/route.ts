import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import { getConfigs } from '@/utils/libs/config'

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const { productoId, gateway = 'IZIPAY', metodoPagoManualId, tipoComprobante, numeroComprobante } = await request.json()

    if (!productoId) return ApiResponse.error(request, 'productoId es requerido', 400)

    // 1. Obtener producto y verificar
    const productos: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, titulo, slug, precio, moneda, es_gratis, estado FROM productos_ia WHERE id = $1 LIMIT 1`, productoId
    )

    if (!productos.length) return ApiResponse.error(request, 'Producto IA no encontrado', 404)
    const producto = productos[0]

    if (producto.estado !== 'PUBLICADO') return ApiResponse.error(request, 'Este producto no está disponible', 400)

    // 2. Verificar si ya lo compró
    const inscExist: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM inscripciones_gpt WHERE usuario_id = $1 AND producto_ia_id = $2 LIMIT 1`,
      auth.user.id, productoId
    )

    if (inscExist.length) return ApiResponse.error(request, 'Ya tienes acceso a este producto', 400)

    const total = producto.es_gratis ? 0 : Number(producto.precio)
    const moneda = producto.moneda || 'USD'

    // 3. Si es gratis, inscribir directamente
    if (producto.es_gratis) {
      const { randomUUID } = await import('crypto')

      await prisma.$executeRawUnsafe(
        `INSERT INTO inscripciones_gpt (id, usuario_id, producto_ia_id, estado, inscrito_en) VALUES ($1, $2, $3, 'ACTIVO', NOW())`,
        randomUUID(), auth.user.id, productoId
      )
      
return ApiResponse.success(request, { message: 'Acceso concedido', gratis: true }, 201)
    }

    // 4. Crear pedido
    const pedido = await prisma.pedido.create({
      data: {
        usuario_id: auth.user.id,
        total,
        moneda,
        estado: 'PENDIENTE',
        tipo_comprobante: tipoComprobante,
        numero_comprobante: numeroComprobante,
        ...(gateway === 'MANUAL' && metodoPagoManualId ? { metodo_pago_manual_id: metodoPagoManualId } : {})
      }
    })

    // 5. Insertar detalle con producto_ia_id (raw, fuera del tipo Prisma)
    const { randomUUID } = await import('crypto')
    const detalleId = randomUUID()

    await prisma.$executeRawUnsafe(
      `INSERT INTO detalles_pedido (id, pedido_id, producto_ia_id, precio_unitario, descuento, subtotal, total, cantidad)
       VALUES ($1, $2, $3, $4, 0, $4, $4, 1)`,
      detalleId, pedido.id, productoId, total
    )

    if (gateway === 'MANUAL') {
      return ApiResponse.success(request, {
        message: 'Pedido creado. Sube tu comprobante de pago.',
        pedidoId: pedido.id,
        numeroPedido: pedido.numero_pedido,
        total,
        moneda,
        productos: [producto.titulo]
      }, 201)
    }

    const transactionId = String(Date.now())
    const orderNumber = String(pedido.numero_pedido).padStart(10, '0')

    if (gateway === 'IZIPAY') {
      const configs = await getConfigs()
      const { IZIPAY_MERCHANT_CODE: merchantCode, IZIPAY_API_KEY: apiKey, IZIPAY_ENDPOINT: endpoint, IZIPAY_RSA_KEY: rsaKey } = configs

      if (!merchantCode || !apiKey || !endpoint || !rsaKey) return ApiResponse.error(request, 'Izipay no configurado', 500)

      const tokenResponse = await fetch(`${endpoint}/security/v1/Token/Generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', transactionId },
        body: JSON.stringify({ requestSource: 'ECOMMERCE', merchantCode, orderNumber, publicKey: apiKey, amount: String(total.toFixed(2)), currency: moneda })
      })

      const tokenData = await tokenResponse.json()

      if (!tokenResponse.ok || tokenData.code !== '00') return ApiResponse.error(request, 'Error al obtener token Izipay', 500)
      const actualToken = tokenData.response?.token || tokenData.response

      await prisma.pedido.update({ where: { id: pedido.id }, data: { token_pago: String(actualToken) } })

      const userName = auth.user.nombre || auth.user.name || 'Cliente'
      const firstName = userName.split(' ')[0]
      const lastName = userName.split(' ').slice(1).join(' ') || 'Cliente'
      const documentStr = auth.user.numero_documento || '12345678'
      const validDocument = documentStr.length >= 8 ? documentStr.substring(0, 15) : '12345678'

      return ApiResponse.success(request, {
        message: 'Pasarela preparada',
        iziConfig: {
          transactionId, action: 'pay', merchantCode,
          order: { orderNumber, currency: moneda, amount: String(total.toFixed(2)), payMethod: 'all', processType: 'AT', merchantBuyerId: String(auth.user.id).substring(0, 15), dateTimeTransaction: String(Date.now()) },
          billing: { firstName, lastName, email: auth.user.email || 'cliente@email.com', phoneNumber: '999999999', street: 'Av. Default 123', city: 'Lima', state: 'Lima', country: 'PE', postalCode: '15000', documentType: 'DNI', document: validDocument },
          render: { typeForm: 'pop-up' }
        },
        token: String(actualToken),
        keyRSA: rsaKey,
        pedidoId: pedido.id
      }, 201)
    }

    if (gateway === 'CULQI') {
      const configs = await getConfigs()
      const privateKey = configs.CULQI_PRIVATE_KEY

      if (!privateKey || privateKey.includes('placeholder')) return ApiResponse.error(request, 'Culqi no configurado', 500)

      const res = await fetch('https://api.culqi.com/v2/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${privateKey}` },
        body: JSON.stringify({
          amount: Math.round(total * 100), currency_code: moneda,
          description: `Producto IA: ${producto.titulo}`,
          order_number: `ORD-${pedido.numero_pedido}-${Date.now()}`,
          client_details: { first_name: auth.user.nombre?.split(' ')[0] || 'User', last_name: auth.user.apellido || 'User', email: auth.user.email || '', phone_number: '999999999' },
          expiration_date: Math.floor(Date.now() / 1000) + 86400
        })
      })

      const culqiData = await res.json()

      if (!res.ok) return ApiResponse.error(request, culqiData.user_message || 'Error Culqi', 500)

      return ApiResponse.success(request, {
        message: 'Orden Culqi creada', pedidoId: pedido.id,
        culqiOrderId: culqiData.id, publicKey: configs.CULQI_PUBLIC_KEY,
        rsaId: configs.CULQI_RSA_ID, rsaPublicKey: configs.CULQI_RSA_PUBLIC_KEY
      }, 201)
    }

    if (gateway === 'MERCADOPAGO') {
      const configs = await getConfigs()
      const accessToken = configs.MP_ACCESS_TOKEN

      if (!accessToken) return ApiResponse.error(request, 'Mercado Pago no configurado', 500)
      const appUrl = new URL(request.url).origin

      const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          external_reference: pedido.id,
          items: [{ id: productoId, title: producto.titulo, quantity: 1, unit_price: total, currency_id: moneda }],
          back_urls: {
            success: `${appUrl}/checkout/mercadopago/success?pedidoId=${pedido.id}`,
            failure: `${appUrl}/checkout/mercadopago/failure?pedidoId=${pedido.id}`,
            pending: `${appUrl}/checkout/mercadopago/pending?pedidoId=${pedido.id}`
          },
          auto_return: 'approved',
          notification_url: `${appUrl}/api/mercadopago/webhook`
        })
      })

      if (!mpRes.ok) return ApiResponse.error(request, 'Error Mercado Pago', 500)
      const mpData = await mpRes.json()

      await prisma.pedido.update({ where: { id: pedido.id }, data: { token_pago: mpData.id, metodo_pago: 'MERCADOPAGO' } })

      return ApiResponse.success(request, {
        message: 'Preferencia MP creada', pedidoId: pedido.id,
        mpInitPoint: mpData.init_point, mpSandboxInitPoint: mpData.sandbox_init_point, preferenceId: mpData.id
      }, 201)
    }

    return ApiResponse.success(request, { message: 'Pedido creado', pedidoId: pedido.id }, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
