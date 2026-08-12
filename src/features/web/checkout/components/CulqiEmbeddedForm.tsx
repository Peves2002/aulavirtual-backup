'use client'

import { useEffect, useMemo, useState } from 'react'

import Script from 'next/script'

import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'

import CulqiScript from './CulqiScript'
import { SecureBadge, TermsCheck } from './PaymentForm'

const CULQI_CONTAINER_ID = 'culqi-embed-container'

const CULQI_PAYMENT_METHODS = {
  tarjeta: true,
  yape: true,
  billetera: true,
  bancaMovil: true,
  agente: true,
  cuotealo: true
}

interface CulqiSettings {
  currency: string
  amount: number
  order: string
  xculqirsaid?: string
  rsapublickey?: string
}

interface CulqiEmbeddedFormProps {
  publicKey: string
  culqiSettings: CulqiSettings | null
  clientEmail: string
  acceptedTerms: boolean
  onAcceptedTermsChange: (checked: boolean) => void
  isCreatingOrder: boolean
  hasOrderError: boolean
  onRetry: () => void
  onTokenReceived: (token: string, email: string) => void
  onError: (error: any) => void
}

const CulqiEmbeddedForm = ({
  publicKey,
  culqiSettings,
  clientEmail,
  acceptedTerms,
  onAcceptedTermsChange,
  isCreatingOrder,
  hasOrderError,
  onRetry,
  onTokenReceived,
  onError
}: CulqiEmbeddedFormProps) => {
  // El SDK de Culqi ya se carga vía CulqiScript, pero eso solo se monta una vez que
  // existe una orden (culqiSettings). Como la orden se crea de inmediato al entrar a
  // la pestaña, la carga del script y la creación de la orden corren en paralelo, así
  // que rastreamos el estado del script aquí para no montar CulqiScript antes de que
  // window.CulqiCheckout exista.
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.CulqiCheckout) setScriptReady(true)
  }, [])

  const client = useMemo(() => ({ email: clientEmail }), [clientEmail])

  const options = useMemo(() => ({
    lang: 'auto',
    installments: true,
    paymentMethods: CULQI_PAYMENT_METHODS,
    modal: false,
    container: `#${CULQI_CONTAINER_ID}`
  }), [])

  // `modal:false` + `container` solo cambia DÓNDE se renderiza Culqi (dentro del
  // div en vez de overlay) — el SDK igual necesita `.open()` para inicializar y
  // pintar los campos. CulqiScript ya corrió su efecto (que deja `window.Culqi`
  // listo) antes de que este efecto se dispare, porque es un componente hijo y
  // React ejecuta los efectos de los hijos antes que los del padre en el mismo commit.
  useEffect(() => {
    if (culqiSettings && scriptReady && typeof window !== 'undefined' && window.Culqi?.open) {
      window.Culqi.open()
    }
  }, [culqiSettings, scriptReady])

  return (
    <>
      <SecureBadge provider='Culqi' />
      <TermsCheck checked={acceptedTerms} onChange={onAcceptedTermsChange} />

      {hasOrderError && !isCreatingOrder && !culqiSettings && (
        <Alert
          severity='error'
          sx={{ mb: 2, borderRadius: 2 }}
          action={<Button color='inherit' size='small' onClick={onRetry}>Reintentar</Button>}
        >
          No se pudo preparar el formulario de pago.
        </Alert>
      )}

      <Box sx={{ position: 'relative', minHeight: 220 }}>
        <Script
          src='https://js.culqi.com/checkout-js'
          strategy='afterInteractive'
          onLoad={() => setScriptReady(true)}
        />

        {!culqiSettings || !scriptReady ? (
          !hasOrderError && (
            <Stack alignItems='center' justifyContent='center' spacing={1.5} sx={{ py: 5 }}>
              <CircularProgress size={28} />
              <Typography variant='caption' color='text.secondary'>
                Preparando formulario de pago seguro…
              </Typography>
            </Stack>
          )
        ) : (
          <>
            <CulqiScript
              publicKey={publicKey}
              settings={culqiSettings}
              client={client}
              options={options}
              onTokenReceived={onTokenReceived}
              onError={onError}
            />
            <div id={CULQI_CONTAINER_ID} />

            {!acceptedTerms && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  bgcolor: 'rgba(255,255,255,0.85)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 3,
                  textAlign: 'center'
                }}
              >
                <Typography variant='body2' fontWeight={700} color='text.secondary'>
                  Acepta los Términos y Condiciones para habilitar el formulario de pago
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default CulqiEmbeddedForm
