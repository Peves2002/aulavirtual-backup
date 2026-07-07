/** URL de ingreso — modal en Campus, nunca la página /login en blanco */
export function getLoginRedirectPath(callbackUrl?: string) {
  const params = new URLSearchParams({ auth: 'login' })

  if (callbackUrl) {
    params.set('callbackUrl', callbackUrl)
  }

  return `/campus?${params.toString()}`
}

export function getRegisterRedirectPath(callbackUrl?: string) {
  const params = new URLSearchParams({ auth: 'register' })

  if (callbackUrl) {
    params.set('callbackUrl', callbackUrl)
  }

  return `/campus?${params.toString()}`
}
