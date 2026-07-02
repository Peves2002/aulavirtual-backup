import Link from 'next/link'

import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Sparkles, Lock, Cpu } from 'lucide-react'

import { HRCOREX_PRODUCTOS, HRCOREX_DETALLE_IDS } from '@/features/web/adph/data/services'
import { getConfig } from '@/utils/libs/config'

export const metadata = {
  title: 'HR CoreX - Plataformas de Software de Recursos Humanos - ADPH Group',
  description: 'Descubre nuestra suite avanzada de software para selección, evaluación psicométrica, salud ocupacional y analítica de talento humano.'
}

const VALOR_TECH = [
  { icon: Zap, title: 'Automatización Inteligente', desc: 'Reduce hasta un 65% de tareas operativas y acelera la contratación.' },
  { icon: ShieldCheck, title: 'Seguridad y Cumplimiento', desc: 'Fichas y datos protegidos bajo altos estándares de confidencialidad.' },
  { icon: Sparkles, title: 'Adopción sin Esfuerzo', desc: 'Plataformas sumamente intuitivas y adaptables a cualquier dispositivo.' }
]

const existsInServices = (id: string) => HRCOREX_DETALLE_IDS.includes(id)

export default async function HRCoreXPage() {
  const waNumero = await getConfig('WHATSAPP_NUMERO', '51924943982')

  return (
    <>
      {/* ── 1. HERO CON MOCKUP DE DASHBOARD ─────────────────────── */}
      <section className="pt-16 pb-20 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Columna Izquierda: Texto */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3BA8C5]/10 border border-[#3BA8C5]/20 text-[#3BA8C5] text-[11px] font-extrabold uppercase tracking-widest">
                <Cpu className="w-3.5 h-3.5" />
                HR CoreX Plataforma Cloud
              </div>

              <h1 className="text-slate-900 font-black leading-[1.08] text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Transformamos el Futuro de la{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BA8C5] to-[#0083B0]">
                  Gestión Humana.
                </span>
              </h1>

              <p className="text-slate-600 text-base md:text-lg lg:text-xl font-semibold max-w-2xl leading-relaxed">
                Nuestra suite integral de software modular está diseñada para automatizar, medir y potenciar cada fase del ciclo de vida del talento en las organizaciones más exigentes de Latinoamérica.
              </p>

              <div className="flex flex-wrap gap-4 items-center pt-2">
                <a
                  href="#productos"
                  className="rounded-none bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold px-8 py-4 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest shadow-lg"
                >
                  Ver Software <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contacto"
                  className="rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-8 py-4 transition-colors text-xs uppercase tracking-widest"
                >
                  Solicitar Demo
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Mockup Dashboard */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-slate-100/50 p-3 rounded-none border border-slate-200/60 shadow-xl overflow-hidden">
                <div className="bg-white p-6 shadow-inner space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">HR CoreX Dashboard</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border border-slate-100 text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Candidatos Evaluados</span>
                      <span className="text-2xl font-black text-slate-800">1,482</span>
                      <span className="text-[9px] font-bold text-green-500 block mt-1">+12.4% este mes</span>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100 text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Aptitud Promedio</span>
                      <span className="text-2xl font-black text-slate-800">87.5%</span>
                      <span className="text-[9px] font-bold text-[#3BA8C5] block mt-1">Nivel Alto Estratégico</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Desempeño Organizacional</span>
                      <span className="text-[9px] font-extrabold text-[#3BA8C5] uppercase">Tiempo Real</span>
                    </div>
                    <div className="h-20 flex items-end justify-between gap-1 pt-2">
                      {[40, 60, 45, 80, 55, 95, 70, 85, 100].map((h, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-t-md bg-gradient-to-t ${
                            idx === 8 ? 'from-[#3BA8C5] to-[#7FD1E5]' : 'from-slate-200 to-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FRANJA DE PROPUESTA DE VALOR TECH ─────────────────────── */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {VALOR_TECH.map(item => (
              <div key={item.title} className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5] flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-black text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. GRID DE PRODUCTOS ─────────────────────── */}
      <section id="productos" className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">

          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-[0.2em] block">Nuestra Suite Tecnológica</span>
            <h2 className="text-slate-900 font-black text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Software Corporativo a la Medida de tu Talento
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Explora las diferentes plataformas integradas dentro de nuestro ecosistema HR CoreX.
              Elige los módulos que tu organización necesita para escalar al siguiente nivel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HRCOREX_PRODUCTOS.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-none border border-slate-100 p-6 flex flex-col justify-between text-left transition-all duration-300 relative group overflow-hidden hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#3BA8C5] to-[#7FD1E5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                <div>
                  <div className="relative aspect-video w-full overflow-hidden mb-6 border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-[10px] font-extrabold text-[#3BA8C5] uppercase tracking-widest block mb-2">
                    {p.category}
                  </span>

                  <h3 className="text-slate-900 text-xl font-black mb-3 group-hover:text-[#3BA8C5] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-semibold">
                    {p.desc}
                  </p>

                  <ul className="space-y-2.5 border-t border-slate-100 pt-5 mb-8">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3BA8C5]/80 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-xs font-semibold leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href={existsInServices(p.id) ? `/hrcorex/${p.id}` : '/contacto'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3BA8C5] hover:text-[#0083B0] transition-colors uppercase tracking-widest"
                  >
                    Ver detalles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. BANNER SOLICITAR DEMO ─────────────────────── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3BA8C5]/10 flex items-center justify-center mx-auto text-[#3BA8C5]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-slate-950 font-black text-3xl md:text-4xl tracking-tight">
            ¿Listo para Digitalizar tu Organización?
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            Nuestros consultores de tecnología están listos para brindarte un recorrido guiado por nuestra suite de plataformas.
            Descubre cómo HR CoreX puede integrarse en tu equipo.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="rounded-none bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold px-8 py-4 transition-colors text-xs uppercase tracking-widest shadow-lg"
            >
              Solicitar una Demo Gratis
            </Link>
            <a
              href={`https://wa.me/${waNumero}?text=Hola%2C%20quisiera%20solicitar%20soporte%20sobre%20HR%20CoreX`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none bg-white border border-slate-200 text-slate-800 font-extrabold px-8 py-4 transition-colors text-xs uppercase tracking-widest hover:bg-slate-100"
            >
              Hablar con Soporte
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
