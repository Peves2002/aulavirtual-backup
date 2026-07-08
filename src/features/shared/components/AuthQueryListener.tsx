'use client'

import { useEffect, useRef } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useAuthModal } from '@/contexts/AuthModalContext'

/** Abre el modal de auth cuando la URL trae ?auth=login|register */
export default function AuthQueryListener() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { openLogin, openRegister } = useAuthModal()
  const handled = useRef<string | null>(null)

  useEffect(() => {
    const auth = searchParams.get('auth')

    if (auth !== 'login' && auth !== 'register') return

    // En /campus el formulario va embebido; CampusClient maneja ?auth=
    if (pathname === '/campus') return

    const key = `${auth}:${searchParams.toString()}`

    if (handled.current === key) return

    handled.current = key

    const callbackUrl = searchParams.get('callbackUrl') || undefined

    if (auth === 'login') {
      openLogin(callbackUrl || undefined)
    } else {
      openRegister(callbackUrl || undefined)
    }

    const params = new URLSearchParams(searchParams.toString())

    params.delete('auth')

    const query = params.toString()

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [searchParams, pathname, router, openLogin, openRegister])

  return null
}
