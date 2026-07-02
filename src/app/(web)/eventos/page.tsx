import Link from 'next/link'

import { ArrowRight, Calendar, Clock, MapPin, Sparkles, Trophy } from 'lucide-react'

export const metadata = {
  title: 'Eventos & Webinars | Masterclasses de RRHH | ADPH Group',
  description:
    'Inscríbete en nuestros próximos webinars, masterclasses de reclutamiento digital y conferencias sobre gestión de riesgos y bienestar laboral.',
}

const EVENTS = [
  {
    id: 'webinar-automatizacion-ats',
    title: 'Masterclass: Automatización Inteligente en Selección y Reclutamiento',
    category: 'Webinar Gratuito',
    date: '12 de Junio, 2026',
    time: '4:00 PM (GMT-5)',
    modality: 'Online en Vivo',
    desc: 'Aprende a estructurar un embudo de selección digital (ATS) y aplicar test predictivos reduciendo tiempos operativos en un 70% sin perder la calidez humana.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    speaker: 'Mag. Roberto Castillo',
    role: 'Director de ADPH Group & Consultor de Software RRHH',
  },
  {
    id: 'taller-riesgo-psicosocial',
    title: 'Taller: Gestión y Cumplimiento de Vigilancia Médica y Riesgo Psicosocial',
    category: 'Taller Exclusivo',
    date: '25 de Junio, 2026',
    time: '9:00 AM (GMT-5)',
    modality: 'Online en Vivo (Cupos Limitados)',
    desc: 'Cómo afrontar exitosamente las auditorías de SUNAFIL mediante la implementación práctica del monitoreo psicosocial e historial de aptitudes médicas.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    speaker: 'Dr. Alberto Varela',
    role: 'Médico Ocupacional y Auditor Líder en SST',
  },
  {
    id: 'conferencia-futuro-rrhh',
    title: 'Conferencia: El Futuro del Talento y Bienestar Ocupacional en Latam',
    category: 'Conferencia Anual',
    date: '15 de Julio, 2026',
    time: '6:00 PM (GMT-5)',
    modality: 'Presencial / Auditorio Corporativo',
    desc: 'Tendencias globales en retención estratégica, flexibilidad laboral y la irrupción del bienestar digital en las organizaciones más exigentes de la región.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    speaker: 'Mag. Sofía Luna',
    role: 'Facilitadora Serious Play & Consultora Senior de Clima',
  },
]

export default function EventosPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Trophy className="w-3.5 h-3.5" /> Educación y Networking Ejecutivo
          </span>
          <h1 className="text-slate-900 font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight">
            Eventos &amp; <span className="text-[#3BA8C5]">Webinars Exclusivos</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Únete a nuestras masterclasses en vivo, conversatorios de valor y talleres prácticos guiados por
            consultores senior y líderes de la industria en Latinoamérica.
          </p>
        </div>
      </section>

      {/* 2. GRID DE EVENTOS */}
      <section className="py-24 bg-[#FBFCFD] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map(evt => (
              <div
                key={evt.id}
                className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#3BA8C5] text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-none flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> {evt.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="space-y-2 border-b border-slate-100 pb-5 mb-5 text-[11px] font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#3BA8C5] flex-shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#3BA8C5] flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800">
                      <MapPin className="w-4 h-4 text-[#3BA8C5] flex-shrink-0" />
                      <span>{evt.modality}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-[#3BA8C5] transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6 flex-grow">{evt.desc}</p>

                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                    <div>
                      <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider block">
                        Facilitador / Expositor
                      </span>
                      <span className="text-slate-800 text-[12px] font-extrabold block mt-0.5 leading-tight">
                        {evt.speaker}
                      </span>
                      <span className="text-slate-400 text-[9px] font-bold block mt-0.5 leading-tight">{evt.role}</span>
                    </div>
                    <Link
                      href="/contacto"
                      className="block text-center w-full bg-slate-100 group-hover:bg-[#3BA8C5] group-hover:text-white text-slate-800 font-extrabold py-3.5 uppercase text-[10px] tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 rounded-none"
                    >
                      Registrarme Gratis <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TALLER IN-HOUSE */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">
            Talleres Corporativos Cerrados
          </span>
          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-6">
            ¿Deseas este evento exclusivo para tu empresa?
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed mb-10">
            Diseñamos y facilitamos conferencias, capacitaciones In-house y talleres especializados adaptados 100% a
            la realidad de tu equipo de trabajo.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg"
          >
            Solicitar Taller In-house <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
