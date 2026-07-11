import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Verifica la firma HMAC-SHA256 de la respuesta de pago de Izipay usando la
 * "Clave HMAC-SHA-256" del comercio (Back Office → Configuración → Claves de API REST).
 *
 * Izipay (basado en Lyra) documenta dos variantes de nombres de campo para el mismo
 * mecanismo, según el flujo/SDK usado:
 *  - Clásica (kr-answer / kr-hash): hash en HEXADECIMAL sobre el string `kr-answer`.
 *  - Web Core (payloadHttp / signature): hash en BASE64 sobre el string `payloadHttp`.
 * Se prueban ambas para no depender de adivinar cuál entrega el SDK en tiempo de ejecución.
 */
export function verifyIzipaySignature(
  payload: { krAnswer?: string; krHash?: string; payloadHttp?: string; signature?: string },
  claveHash: string
): boolean {
  const { krAnswer, krHash, payloadHttp, signature } = payload

  if (!claveHash) return false

  if (krAnswer && krHash) {
    const computed = createHmac('sha256', claveHash).update(krAnswer).digest('hex')

    if (safeCompare(computed, krHash)) return true

    console.warn('[IZIPAY_SIGNATURE] kr-hash no coincide. Calculado:', computed, 'Recibido:', krHash)
  }

  if (payloadHttp && signature) {
    const computed = createHmac('sha256', claveHash).update(payloadHttp).digest('base64')

    if (safeCompare(computed, signature)) return true

    console.warn('[IZIPAY_SIGNATURE] signature no coincide. Calculado:', computed, 'Recibido:', signature)
  }

  return false
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufferA = Buffer.from(a, 'utf8')
    const bufferB = Buffer.from(b, 'utf8')

    if (bufferA.length !== bufferB.length) return false

    return timingSafeEqual(bufferA, bufferB)
  } catch {
    return false
  }
}

import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Verifica la firma de la notificación IPN clásica de Izipay/Lyra (formato vads_*).
 *
 * Algoritmo oficial (docs.lyra.com/en/collect/form-payment/quick-start-guide/computing-the-ipn-signature.html):
 * 1. Ordenar alfabéticamente los campos cuyo nombre empieza con "vads_".
 * 2. Concatenar el valor de cada campo seguido de "+" (incluyendo el último campo).
 * 3. Agregar la Clave HMAC-SHA-256 al final de esa cadena (sin separador adicional,
 *    ya que el paso anterior deja un "+" colgando antes de la clave).
 * 4. Calcular HMAC-SHA256 de esa cadena completa usando la misma clave como clave del HMAC,
 *    codificado en base64. El resultado debe coincidir con el campo `signature`.
 */
export function verifyVadsSignature(params: URLSearchParams, claveHash: string): boolean {
  if (!claveHash) return false

  const receivedSignature = params.get('signature')

  if (!receivedSignature) return false

  const vadsKeys = [...params.keys()].filter(k => k.startsWith('vads_')).sort()
  const signatureContents = vadsKeys.map(k => `${params.get(k) ?? ''}+`).join('') + claveHash

  const computed = createHmac('sha256', claveHash).update(signatureContents).digest('base64')

  // TEMPORAL: diagnóstico para depurar la verificación de firma end-to-end.
  // No se loguea la clave en sí, solo metadatos para detectar espacios/saltos de línea invisibles.
  console.log('[IZIPAY_SIGNATURE][DEBUG] vadsKeys (orden usado):', JSON.stringify(vadsKeys))
  console.log(
    '[IZIPAY_SIGNATURE][DEBUG] claveHash length:', claveHash.length,
    '| trimmed length:', claveHash.trim().length,
    '| tiene \\r:', claveHash.includes('\r'),
    '| tiene \\n:', claveHash.includes('\n'),
    '| tiene espacio:', claveHash.includes(' ')
  )
  console.log('[IZIPAY_SIGNATURE][DEBUG] Computado:', computed)
  console.log('[IZIPAY_SIGNATURE][DEBUG] Recibido:', receivedSignature)

  return safeCompare(computed, receivedSignature)
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufferA = Buffer.from(a, 'utf8')
    const bufferB = Buffer.from(b, 'utf8')

    if (bufferA.length !== bufferB.length) return false

    return timingSafeEqual(bufferA, bufferB)
  } catch {
    return false
  }
}
