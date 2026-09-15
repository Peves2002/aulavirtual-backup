export async function verifyReclamacionCaptcha(token: unknown): Promise<'valid' | 'invalid' | 'unavailable'> {
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) return 'invalid'

  const secret = process.env.TURNSTILE_SECRET_KEY
  const hostname = process.env.TURNSTILE_EXPECTED_HOSTNAME

  if (!secret || !hostname) return 'unavailable'

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store'
    })

    if (!response.ok) return 'unavailable'

    const result = await response.json()

    return result?.success === true && result.action === 'reclamacion' && result.hostname === hostname
      ? 'valid'
      : 'invalid'
  } catch {
    return 'unavailable'
  }
}
