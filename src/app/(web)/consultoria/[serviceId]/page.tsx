import { notFound } from 'next/navigation'

import { Users, ArrowRight, ShieldCheck, Target, BarChart3, MessageSquare } from 'lucide-react'

import { CONSULTORIA_SERVICIOS, getConsultoriaServicio } from '@/features/web/adph/data/services'
import { getConfig } from '@/utils/libs/config'

export function generateStaticParams() {
  return CONSULTORIA_SERVICIOS.map(s => ({ serviceId: s.id }))
}

export function generateMetadata({ params }: { params: { serviceId: string } }) {
  const servicio = getConsultoriaServicio(params.serviceId)

  if (!servicio) {
    return { title: 'Servicio no encontrado - ADPH Group' }
  }

  return {
    title: `${servicio.title} - ADPH Group`,
    description: servicio.desc
  }
}

const PROPUESTA_VALOR = [
  { icon: Target, t: 'Enfoque Estratégico', d: 'Alineado a tus objetivos de negocio' },
  { icon: BarChart3, t: 'Basado en Datos', d: 'Decisiones con respaldo analítico' },
  { icon: ShieldCheck, t: 'Confidencialidad', d: 'Seguridad total en el manejo de info' },
  { icon: MessageSquare, t: 'Feedback Constante', d: 'Comunicación fluida y transparente' }
]

export default async function ConsultoriaServicioPage({ params }: { params: { serviceId: string } }) {
  const servicio = getConsultoriaServicio(params.serviceId)

  if (!servicio) notFound()

  const waNumero = await getConfig('WHATSAPP_NUMERO', '51924943982')

  return (
    <>
      {/* ── HERO OSCURO ─────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#13294D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={servicio.image} className="w-full h-full object-cover" alt={servicio.title} />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,41,77,0.95) 0%, rgba(19,41,77,0.7) 50%, transparent 100%)' }} />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[#3BA8C5] font-bold mb-6">
              <Users className="w-6 h-6" />
              <span className="uppercase tracking-widest text-xs">Consultoría Estratégica</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
              {servicio.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-semibold">
              {servicio.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── PROPUESTA DE VALOR ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Nuestra Propuesta de Valor</h2>
                <p className="text-lg text-slate-600 font-semibold leading-relaxed">
                  No solo entregamos reportes, entregamos soluciones accionables. Nuestro equipo de consultores senior trabaja mano a mano con tu organización para asegurar una implementación exitosa.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {PROPUESTA_VALOR.map(item => (
                  <div key={item.t} className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="font-black text-slate-900">{item.t}</p>
                    <p className="text-sm text-slate-500 font-semibold">{item.d}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href={`https://wa.me/${waNumero}?text=Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de%20${encodeURIComponent(servicio.title)}%20de%20ADPH%20Group`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#3BA8C5] hover:bg-[#0083B0] text-white px-10 py-5 rounded-none font-extrabold text-sm uppercase tracking-widest transition-colors shadow-lg"
                >
                  Solicitar Diagnóstico Gratuito <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#1B3A6B]/5 rotate-3" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={servicio.image}
                alt={servicio.title}
                className="relative z-10 w-full h-auto shadow-2xl object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
