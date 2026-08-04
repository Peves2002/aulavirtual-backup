'use client'

import { useState, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import Script from 'next/script'

import { useSession } from 'next-auth/react'

import { ChevronRight, Repeat2, Check, ShieldCheck, RefreshCw, CreditCard, Loader2, BookOpen, Lock, ArrowLeft } from 'lucide-react'

import { toast } from 'react-toastify'

import { useAuthModal } from '@/contexts/AuthModalContext'
import { Card } from '@/features/web/atd/ui/card'
import { Button } from '@/features/web/atd/ui/button'
import { Checkbox } from '@/features/web/atd/ui/checkbox'
import type { PlanPublico } from '@/features/estudiante/suscripciones/entity/Suscripcion'
import { INTERVALO_LABELS } from '@/features/estudiante/suscripciones/entity/Suscripcion'

declare global {
  interface Window {
    CulqiCheckout: any
    Culqi: any
  }
}

interface SuscripcionCheckoutViewProps {
  plan: PlanPublico
  culqiPublicKey: string
}

export function SuscripcionCheckoutView({ plan, culqiPublicKey }: SuscripcionCheckoutViewProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { openLogin } = useAuthModal()

  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)

  const precio = Number(plan.precio)
  const monedaSimbolo = plan.moneda === 'PEN' ? 'S/' : '$'
  const amount = Math.round(precio * 100)
  const email = session?.user?.email ?? ''

  const beneficios: string[] = Array.isArray(plan.beneficios) ? plan.beneficios : []
  const tieneBeneficios = beneficios.length > 0

  const handleTokenReceived = useCallback(async (tokenId: string) => {
    setProcesando(true)
    setError(null)

    try {
      const res = await fetch('/api/estudiante/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id, tokenId })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.result?.message ?? data?.message ?? 'Error al procesar la suscripción')
      }

      setExito(true)
      setTimeout(() => router.push('/estudiante/suscripcion'), 2000)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado')
      setProcesando(false)
    }
  }, [plan.id, router])

  const handleSuscribirse = () => {
    if (!session?.user) {
      openLogin()

      return
    }

    if (!aceptaTerminos) {
      toast.warning('Debes aceptar los términos y condiciones para continuar.')

      return
    }

    if (!window.CulqiCheckout) {
      toast.error('El sistema de pagos se está cargando. Espera un momento e intenta de nuevo.')

      return
    }

    setError(null)

    // Inicializar Culqi en el momento del click (garantiza timing correcto)
    try {
      if (window.Culqi) {
        try { window.Culqi.close() } catch { }
      }

      const config = {
        settings: {
          currency: plan.moneda,
          amount,
        },
        client: { email },
        options: {
          modal: true,
          lang: 'auto',
          installments: false,
          paymentMethods: {
            tarjeta: true,
            yape: false,
            billetera: false,
            bancaMovil: false,
            agente: false,
            cuotealo: false
          }
        }
      }

      const culqi = new window.CulqiCheckout(culqiPublicKey, config)

      culqi.culqi = () => {
        if (culqi.token) {
          handleTokenReceived(culqi.token.id)
        } else if (culqi.error) {
          const msg = culqi.error.user_message || culqi.error.merchant_message || 'Error al procesar el pago'

          setError(msg)
        }
      }

      window.Culqi = culqi
      window.Culqi.open()
    } catch (err: any) {
      toast.error('Error al abrir el sistema de pagos. Recarga la página e intenta de nuevo.')
    }
  }

  // Pantalla de éxito
  if (exito) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-secondary/10 border-2 border-secondary/40 flex items-center justify-center mx-auto mb-6">
            <Check className="h-9 w-9 text-secondary" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Suscripción activada!</h1>
          <p className="text-muted-foreground mb-4">
            Ya tienes acceso a los cursos de <strong className="text-foreground">{plan.nombre}</strong>. Redirigiendo a tu panel...
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span className="text-sm">Redirigiendo...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Cargar script de Culqi */}
      <Script src="https://js.culqi.com/checkout-js" strategy="afterInteractive" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="container relative py-10 md:py-14">
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {[{ label: 'Inicio', href: '/' }, { label: 'Suscripciones', href: '/suscripciones' }].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
              </div>
            ))}
            <span className="text-sm font-semibold text-primary">Checkout</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
              <Repeat2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Activar Suscripción</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Accede a todos los cursos del plan. Cancela cuando quieras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Formulario de pago */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="p-6 md:p-10 bg-card/50 border-white/5">

              {/* Encabezado de sección */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="h-[18px] w-[18px] text-primary" />
                </div>
                <div>
                  <p className="font-bold">Datos de pago</p>
                  <p className="text-xs text-muted-foreground">Transacción encriptada y segura con Culqi</p>
                </div>
              </div>

              {session?.user && (
                <div className="mb-6 p-4 rounded-2xl bg-muted/50 border border-white/5 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                    {((session.user as any)?.nombre?.[0] || session.user.name?.[0] || 'U').toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide mb-0.5">Suscripción para</p>
                    <p className="text-sm font-bold truncate">
                      {(session.user as any)?.nombre
                        ? `${(session.user as any).nombre} ${(session.user as any).apellido || ''}`.trim()
                        : session.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-dashed border-primary/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Al hacer click en <strong className="text-foreground">Activar suscripción</strong> se abrirá la ventana segura de Culqi para ingresar los datos de tu tarjeta.
                  {plan.dias_prueba > 0 ? (
                    <> Los primeros <strong className="text-foreground">{plan.dias_prueba} días son gratis</strong>, luego se cobrará automáticamente cada <strong className="text-foreground">{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}</strong>.</>
                  ) : (
                    <> El primer cobro se realizará hoy y luego de forma automática cada <strong className="text-foreground">{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}</strong>.</>
                  )}
                </p>
              </div>

              {/* Checkbox de términos y condiciones */}
              <label className="mb-6 flex items-start gap-2.5 cursor-pointer">
                <Checkbox
                  checked={aceptaTerminos}
                  onCheckedChange={(checked) => setAceptaTerminos(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Acepto los{' '}
                  <Link href="/terminos-y-condiciones" target="_blank" className="text-primary font-semibold underline underline-offset-2">
                    Términos y Condiciones
                  </Link>
                </span>
              </label>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleSuscribirse}
                disabled={procesando}
              >
                {procesando ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Activar suscripción · {monedaSimbolo} {precio.toFixed(2)}/{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}
                  </>
                )}
              </Button>

              {!session?.user && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Necesitas{' '}
                  <button onClick={() => openLogin()} className="text-primary font-semibold underline underline-offset-2">
                    iniciar sesión
                  </button>
                  {' '}para suscribirte.
                </p>
              )}

              {/* Badges de confianza */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/5 flex-wrap">
                {[
                  { icon: <ShieldCheck className="h-4 w-4" />, text: 'Pago seguro' },
                  { icon: <RefreshCw className="h-4 w-4" />, text: 'Cancela cuando quieras' },
                  { icon: <Lock className="h-4 w-4" />, text: 'Datos encriptados' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
                    {badge.icon}
                    <span className="text-xs font-semibold">{badge.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Enlace para volver */}
            <div className="mt-4 text-center">
              <Link href="/suscripciones" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Volver a los planes
              </Link>
            </div>
          </div>

          {/* Resumen del plan */}
          <div className="order-1 lg:order-2">
            <Card className="overflow-hidden bg-card/50 border-white/5 lg:sticky lg:top-24">
              <div className="p-6 border-b border-white/5 bg-mesh">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 mb-3">
                  <Repeat2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase">{INTERVALO_LABELS[plan.intervalo]}</span>
                </div>
                <h2 className="text-xl font-bold mb-1">{plan.nombre}</h2>
                {plan.descripcion && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.descripcion}</p>
                )}
              </div>

              <div className="p-6 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-muted-foreground">{monedaSimbolo}</span>
                  <span className="text-4xl font-bold">{precio.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">/{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}</span>
                </div>
                {plan.dias_prueba > 0 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1">
                    <Check className="h-3 w-3 text-secondary" strokeWidth={3} />
                    <span className="text-xs font-bold text-secondary">{plan.dias_prueba} días gratis incluidos</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {tieneBeneficios ? (
                  <>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">¿Qué incluye?</p>
                    <div className="space-y-3">
                      {beneficios.map((beneficio, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="h-[18px] w-[18px] rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-[11px] w-[11px] text-primary" strokeWidth={3} />
                          </div>
                          <span className="text-sm">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                    {plan.cursos.length > 0 && (
                      <div className="flex items-center gap-2 mt-5 p-3 rounded-xl bg-muted">
                        <BookOpen className="h-[15px] w-[15px] text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">
                          {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''} incluido{plan.cursos.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                      Incluye {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-3">
                      {plan.cursos.map(c => (
                        <div key={c.curso_id} className="flex items-start gap-2.5">
                          <div className="h-[18px] w-[18px] rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-[11px] w-[11px] text-primary" strokeWidth={3} />
                          </div>
                          <span className="text-sm">{c.curso.titulo}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
