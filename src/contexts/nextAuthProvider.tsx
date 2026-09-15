'use client'

import { useEffect, useRef } from 'react'

// Third-party Imports
import { getSession, SessionProvider, useSession } from 'next-auth/react'
import type { SessionProviderProps } from 'next-auth/react'

const SessionExpiryRedirect = () => {
  const { data: session, status } = useSession()
  const wasAuthenticated = useRef(false)

  useEffect(() => {
    if (status === 'authenticated') wasAuthenticated.current = true

    if (status === 'unauthenticated' && wasAuthenticated.current) {
      window.location.replace('/login')
    }
  }, [status])

  useEffect(() => {
    if (!session?.expires) return

    // Revalidate at expiry, including sessions longer than the browser's maximum timeout.
    const delay = Math.min(Math.max(Date.parse(session.expires) - Date.now(), 0), 2147483647)
    const timer = window.setTimeout(() => void getSession(), delay)

    return () => window.clearTimeout(timer)
  }, [session?.expires])

  return null
}

export const NextAuthProvider = ({ children, ...rest }: SessionProviderProps) => {
  return (
    <SessionProvider {...rest} refetchInterval={60} refetchOnWindowFocus>
      <SessionExpiryRedirect />
      {children}
    </SessionProvider>
  )
}
