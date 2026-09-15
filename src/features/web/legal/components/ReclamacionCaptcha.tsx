'use client'

import { useEffect, useRef, useState } from 'react'

import Script from 'next/script'

import { Alert, Box } from '@mui/material'

type Turnstile = {
  render: (container: HTMLElement, options: {
    sitekey: string
    action: string
    language: string
    size: string
    callback: (token: string) => void
    'expired-callback': () => void
    'error-callback': () => void
  }) => string
  remove: (id: string) => void
}

export default function ReclamacionCaptcha({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    const turnstile = (window as Window & { turnstile?: Turnstile }).turnstile

    if (!ready || !sitekey || !container.current || !turnstile) return

    const id = turnstile.render(container.current, {
      sitekey,
      action: 'reclamacion',
      language: 'es',
      size: 'flexible',
      callback: token => {
        setError(false)
        onToken(token)
      },
      'expired-callback': () => onToken(''),
      'error-callback': () => {
        onToken('')
        setError(true)
      }
    })

    return () => {
      turnstile.remove(id)
      onToken('')
    }
  }, [ready, sitekey, onToken])

  if (!sitekey) {
    return <Alert severity='warning' sx={{ mb: 3 }}>La verificación de seguridad no está disponible. Intenta más tarde.</Alert>
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        onReady={() => setReady(true)}
        onError={() => {
          onToken('')
          setError(true)
        }}
      />
      <div ref={container} aria-label='Verificación de seguridad' />
      {error && <Alert severity='error'>No se pudo completar la verificación. Revisa tu conexión y recarga la página.</Alert>}
    </Box>
  )
}
