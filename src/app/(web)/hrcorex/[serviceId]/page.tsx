import { notFound } from 'next/navigation'

import { ArrowRight, Zap, Shield, Sparkles, Cpu } from 'lucide-react'

import { HRCOREX_SERVICIOS, getHrcorexServicio } from '@/features/web/adph/data/services'
import { getConfig } from '@/utils/libs/config'

export function generateStaticParams() {
  return HRCOREX_SERVICIOS.map(s => ({ serviceId: s.id }))
}

export function generateMetadata({ params }: { params: { serviceId: string } }) {
  const servicio = getHrcorexServicio(params.serviceId)

  if (!servicio) {
    return { title: 'Producto no encontrado - ADPH Group' }
  }

  return {
    title: `${servicio.title} - HR CoreX - ADPH Group`,
    description: servicio.desc
  }
}

const FEATURES_IA = [
  { icon: Zap, t: 'Ultra Rápido', d: 'Procesa grandes volúmenes de datos en milisegundos.' },
  { icon: Shield, t: 'Máxima Seguridad', d: 'Cumplimiento con normativas internacionales de privacidad.' },
  { icon: Sparkles, t: 'Experiencia Premium', d: 'Diseño centrado en el usuario para máxima adopción.' }
]

export default async function HrcorexServicioPage({ params }: { params: { serviceId: string } }) {
  const servicio = getHrcorexServicio(params.serviceId)

  if (!servicio) notFound()

  const waNumero = await getConfig('WHATSAPP_NUMERO', '51924943982')

  return (
    <>
      {/* ── HERO OSCURO ─────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A1629] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={servicio.image} className="w-full h-full object-cover" alt={servicio.title} />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3BA8C5]/20 rounded-full blur-[120px] -mr-48 -mt-48" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[#3BA8C5] font-bold mb-6">
                <Cpu className="w-6 h-6" />
                <span className="uppercase tracking-[0.2em] text-xs">HR CoreX Tech Solutions</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {servicio.title}
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-semibold mb-10">
                {servicio.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${waNumero}?text=Hola%2C%20quisiera%20solicitar%20una%20demo%20de%20${encodeURIComponent(servicio.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#3BA8C5] text-white px-8 py-4 rounded-none font-extrabold text-xs uppercase tracking-widest hover:bg-[#0083B0] transition-colors flex items-center gap-2"
                >
                  Solicitar Demo <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#caracteristicas"
                  className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-none font-extrabold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Ver Características
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#3BA8C5]/30 rounded-3xl blur-[100px] opacity-20" />
              <div className="relative bg-[#13294D] p-4 rounded-none border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={servicio.image}
                  alt="Platform Preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPUESTA IA ─────────────────────── */}
      <section id="caracteristicas" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Potencia tus procesos con IA</h2>
            <p className="text-lg text-slate-600 font-semibold">
              HR CoreX no es solo una plataforma, es el motor que impulsa la eficiencia de tu departamento de Recursos Humanos mediante tecnología de vanguardia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES_IA.map(item => (
              <div
                key={item.t}
                className="p-8 bg-slate-50 border border-slate-100 hover:border-[#3BA8C5]/30 transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#3BA8C5]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-[#3BA8C5]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.t}</h3>
                <p className="text-slate-500 leading-relaxed font-semibold">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
