'use client'

import { useState } from 'react'

import { Mail, MapPin, Phone, Sparkles, Send } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || ''
  const waLink   = waNumber ? `https://wa.me/${waNumber}` : '#'
  const email1   = configs.EMAIL_CONTACTO  || ''
  const address  = configs.DIRECCION       || ''
  const tiktok   = configs.TIKTOK_URL      || ''

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const text = `Hola, soy ${data.get('name')}.\nCorreo: ${data.get('email')}\n\n${data.get('message')}`

    window.open(`${waLink}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Contacto
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Hablemos.<br />
              <span className="text-brand-orange">Tu próximo paso</span>
              <br />
              empieza aquí.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              Cuéntanos qué buscas estudiar o qué necesitas resolver. Te
              respondemos con la atención cercana que nos define.
            </p>
          </div>
        </div>
      </section>

      {/* COLOR STRIPE */}
      <div className="grid h-3 grid-cols-4">
        <div className="bg-brand-teal" />
        <div className="bg-brand-navy" />
        <div className="bg-brand-lime" />
        <div className="bg-brand-orange" />
      </div>

      {/* CONTACT GRID */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">

          {/* Info */}
          <div className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Canales directos
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-balance text-foreground">
              Donde estamos, cómo escribirnos
            </h2>
            <p className="mt-5 text-muted-foreground">
              Nuestro equipo responde cada consulta con compromiso real. No hay
              respuestas automáticas: hay personas que entienden tu camino.
            </p>

            <div className="mt-10 space-y-4">
              {waNumber && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-base hover:border-brand-orange hover:shadow-soft no-underline"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-gradient text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                    <div className="font-semibold text-foreground">+{waNumber}</div>
                  </div>
                </a>
              )}

              {email1 && (
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-gradient text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Correo</div>
                    <a href={`mailto:${email1}`} className="block font-semibold text-foreground hover:text-brand-orange no-underline">
                      {email1}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hero-gradient text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sede</div>
                    <div className="font-semibold text-foreground">{address}</div>
                  </div>
                </div>
              )}

              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl bg-hero-gradient p-5 text-white shadow-soft transition-base hover:shadow-glow no-underline"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-white/70">Síguenos en TikTok</div>
                  <div className="mt-1 font-display text-xl font-extrabold">{tiktok}</div>
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-10">
              <h2 className="font-display text-3xl font-extrabold text-foreground">
                Envíanos un mensaje
              </h2>
              <p className="mt-2 text-muted-foreground">
                Completa el formulario y te contactamos por WhatsApp.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Nombre</span>
                    <input
                      required name="name" type="text" placeholder="Tu nombre completo"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-base focus:border-brand-orange focus:ring-2"
                      style={{ '--tw-ring-color': 'rgba(244,122,34,0.2)' } as any}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Correo</span>
                    <input
                      required name="email" type="email" placeholder="tu@correo.com"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-base focus:border-brand-orange"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Área de interés</span>
                  <select name="area" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-base focus:border-brand-orange">
                    <option>Educación</option>
                    <option>Derecho</option>
                    <option>Ingeniería</option>
                    <option>Salud</option>
                    <option>Otra</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Mensaje</span>
                  <textarea
                    required name="message" rows={5} placeholder="Cuéntanos qué programa te interesa..."
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-base focus:border-brand-orange"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-gradient px-7 py-4 text-sm font-bold text-white shadow-soft transition-base hover:shadow-glow sm:w-auto"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <Send className="h-4 w-4" />
                  Enviar por WhatsApp
                </button>

                {sent && (
                  <p className="text-sm font-semibold text-brand-teal">
                    ¡Listo! Te abrimos WhatsApp con tu mensaje.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
