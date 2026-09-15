import assert from 'node:assert/strict'
import { test } from 'node:test'

import { verifyReclamacionCaptcha } from './verify-reclamacion-captcha'

test('captcha rejects missing tokens, provider failures and mismatched claims', async () => {
  const originalFetch = globalThis.fetch
  const originalSecret = process.env.TURNSTILE_SECRET_KEY
  const originalHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME
  let calls = 0
  let payload: unknown = { success: true, action: 'reclamacion', hostname: 'example.com' }

  process.env.TURNSTILE_SECRET_KEY = 'test-secret'
  process.env.TURNSTILE_EXPECTED_HOSTNAME = 'example.com'

  globalThis.fetch = async (_url, options) => {
    calls++
    assert.deepEqual(JSON.parse(String(options?.body)), { secret: 'test-secret', response: 'token' })

    return Response.json(payload)
  }

  try {
    for (const token of [undefined, null, '', ' ', 123, {}, 'x'.repeat(2049)]) {
      assert.equal(await verifyReclamacionCaptcha(token), 'invalid')
    }

    assert.equal(calls, 0)
    assert.equal(await verifyReclamacionCaptcha('token'), 'valid')

    for (const result of [
      { success: false, 'error-codes': ['timeout-or-duplicate'] },
      { success: true, action: 'other', hostname: 'example.com' },
      { success: true, action: 'reclamacion', hostname: 'other.com' },
      null
    ]) {
      payload = result
      assert.equal(await verifyReclamacionCaptcha('token'), 'invalid')
    }

    globalThis.fetch = async () => new Response('', { status: 500 })
    assert.equal(await verifyReclamacionCaptcha('token'), 'unavailable')
    globalThis.fetch = async () => { throw new Error('network timeout') }
    assert.equal(await verifyReclamacionCaptcha('token'), 'unavailable')
    delete process.env.TURNSTILE_SECRET_KEY
    assert.equal(await verifyReclamacionCaptcha('token'), 'unavailable')
    process.env.TURNSTILE_SECRET_KEY = 'test-secret'
    delete process.env.TURNSTILE_EXPECTED_HOSTNAME
    assert.equal(await verifyReclamacionCaptcha('token'), 'unavailable')
  } finally {
    globalThis.fetch = originalFetch
    if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
    else process.env.TURNSTILE_SECRET_KEY = originalSecret
    if (originalHostname === undefined) delete process.env.TURNSTILE_EXPECTED_HOSTNAME
    else process.env.TURNSTILE_EXPECTED_HOSTNAME = originalHostname
  }
})
