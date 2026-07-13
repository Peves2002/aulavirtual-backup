import Link from 'next/link'

import { ArrowRight, Users, Laptop, Quote, CheckCircle2 } from 'lucide-react'

import { CONSULTORIA_SERVICIOS, HRCOREX_SERVICIOS } from '@/features/web/adph/data/services'
import { getConfigs } from '@/utils/libs/config'

export const metadata = {
  title: 'Consultoría en RRHH - ADPH Group',
  description: 'Soluciones a medida en capacitación in-house, evaluaciones ocupacionales y gestión del talento humano para tu organización.'
}

const TESTIMONIOS = [
  {
    quote: 'El diplomado de ADPH transformó mi forma de liderar. La metodología del caso y el nivel de los facilitadores son de clase mundial.',
    name: 'María Fernanda Ríos',
    role: 'Gerente de Talento',
    company: 'Banco Continental',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    quote: 'Implementamos HR CoreX en toda la organización y redujimos en 60% los tiempos de selección. Una solución verdaderamente disruptiva.',
    name: 'Carlos Eduardo Villanueva',
    role: 'Director de RRHH',
    company: 'Grupo Romero',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    quote: 'La consultoría de clima laboral nos dio claridad estratégica. ADPH no solo capacita, acompaña la transformación cultural.',
    name: 'Ana Lucía Paredes',
    role: 'CHRO',
    company: 'Alicorp',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
  }
]

export default async function ConsultoriaPage() {
  const configs = await getConfigs()
  const waNumero = configs.WHATSAPP_NUMERO ?? '51924943982'
  const consultoriaHeroTitle = configs['CONSULTORIA_HERO_TITLE']?.trim() || 'Consultoría Estratégica en RRHH'
  const consultoriaHeroDesc = configs['CONSULTORIA_HERO_DESC']?.trim() || 'Acompañamos a las organizaciones en el fortalecimiento de su capital humano con soluciones personalizadas.'
  const consultoriaSec2Title = configs['CONSULTORIA_SEC2_TITLE']?.trim() || 'Soluciones Corporativas a Medida'
  const consultoriaSec2Desc = configs['CONSULTORIA_SEC2_DESC']?.trim() || 'Fortalecemos la gestión del talento humano y la salud ocupacional en tu organización a través de metodologías de alto impacto regional.'
  const consultoriaSec3Title = configs['CONSULTORIA_SEC3_TITLE']?.trim() || 'Tecnología Inteligente para RRHH'
  const consultoriaSec3Desc = configs['CONSULTORIA_SEC3_DESC']?.trim() || 'Digitaliza y optimiza tus procesos de selección, evaluación y psicometría con nuestra suite SaaS avanzada de nivel corporativo.'

  let dynamicTestimonios = TESTIMONIOS
  const dbTestimoniosStr = configs.WEB_TESTIMONIOS

  if (dbTestimoniosStr?.trim()) {
    try {
      dynamicTestimonios = JSON.parse(dbTestimoniosStr)
    } catch (e) {
      console.error('Error parsing dynamic testimonials in consultoria:', e)
    }
  }

  const heroBg = configs['CONSULTORIA_HERO_IMAGE']?.trim() || ''

  const heroStyle: React.CSSProperties = {
    padding: '6rem 1.5rem 5rem',
    position: 'relative',
    overflow: 'hidden',
    background: heroBg
      ? `url(${heroBg}) center/cover no-repeat`
      : 'linear-gradient(135deg, #13294D 0%, #1B3A6B 45%, #1B3A6B 100%)',
  }

  return (
    <main>
      {/* ── 1. HERO ─────────────────────── */}
      <section style={heroStyle}>
        {heroBg && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(19, 41, 77, 0.85)' }} />
        )}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,168,197,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(59,168,197,0.12)', border: '1px solid rgba(59,168,197,0.25)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3BA8C5', boxShadow: '0 0 6px #3BA8C5' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#3BA8C5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Consultoría Estratégica
              </span>
            </div>
            <div
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.15 }}
              className="[&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: consultoriaHeroTitle }}
            />
            <div
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: '1rem' }}
              dangerouslySetInnerHTML={{ __html: consultoriaHeroDesc }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. SERVICIOS CONSULTORÍA ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3BA8C5]/10 text-[#3BA8C5] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5">
              <Users className="w-3.5 h-3.5" /> Consultoría Estratégica
            </span>
            <div
              className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: consultoriaSec2Title }}
            />
            <div
              className="text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: consultoriaSec2Desc }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CONSULTORIA_SERVICIOS.map(s => {
              const dbImage = configs[`CONSULTORIA_SVC_${s.id.toUpperCase()}_IMAGE`]

              
return (
                <div
                  key={s.id}
                  className="group relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-[#3BA8C5]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dbImage || s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/95 shadow-sm flex items-center justify-center text-[#3BA8C5] group-hover:scale-110 transition-transform duration-300">
                        <s.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm lg:text-base font-black text-slate-900 group-hover:text-[#3BA8C5] transition-colors leading-snug min-h-[2.4rem]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-slate-500 text-xs leading-relaxed line-clamp-3 font-semibold">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={`/consultoria/${s.id}`}
                        className="inline-flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-[#3BA8C5] uppercase tracking-widest hover:text-[#0083B0] transition-colors"
                      >
                        Ver servicio <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. HR COREX ─────────────────────── */}
      <section className="pb-24 bg-[#FBFCFD] border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5">
              <Laptop className="w-3.5 h-3.5" /> HR CoreX (Tech Suite)
            </span>
            <div
              className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: consultoriaSec3Title }}
            />
            <div
              className="text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: consultoriaSec3Desc }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {HRCOREX_SERVICIOS.map(s => {
              const dbImage = configs[`HRCOREX_SVC_${s.id.toUpperCase()}_IMAGE`]

              
return (
                <div
                  key={s.id}
                  className="group relative bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-[#1B3A6B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dbImage || s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/95 shadow-sm flex items-center justify-center text-[#1B3A6B] group-hover:scale-110 transition-transform duration-300">
                        <s.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1B3A6B] transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-slate-500 text-sm leading-relaxed font-semibold">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-slate-50">
                      <Link
                        href={`/hrcorex/${s.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#1B3A6B] uppercase tracking-widest hover:text-[#3BA8C5] transition-colors"
                      >
                        Conocer solución <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIOS ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3BA8C5]/10 text-[#3BA8C5] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5">
              <Quote className="w-3.5 h-3.5" /> Testimonios de Alumnos
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Lo que dicen nuestros participantes
            </h2>
            <p className="text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto">
              Conoce la experiencia de líderes y estudiantes que han impulsado sus carreras y transformado sus organizaciones junto a ADPH Group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dynamicTestimonios.map((t: any) => (
              <div
                key={t.id || t.name}
                className="group bg-white border border-slate-200 rounded-none p-8 hover:border-[#3BA8C5]/30 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5] mb-6">
                  <Quote className="w-5 h-5" />
                </div>
                <p className="italic text-slate-600 text-sm leading-relaxed mb-8 flex-grow font-semibold">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                  <div>
                    <div className="font-black text-slate-900 text-sm leading-none mb-1">{t.name}</div>
                    <div className="text-xs font-bold text-slate-400">
                      {t.role} {t.company ? <span className="text-[#3BA8C5] font-extrabold">@ {t.company}</span> : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA FINAL ─────────────────────── */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
            alt="Estudiantes y profesionales en capacitación ejecutiva"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/85" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, rgba(2,8,25,0.95), rgba(2,8,25,0.75), transparent)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3BA8C5]/20 border border-[#3BA8C5]/40 text-[#7FD1E5] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5">
            ¡Da el siguiente paso!
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            ¿Listo para impulsar tu carrera y transformar tu organización?
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Únete a nuestra comunidad de más de 5,000 profesionales y líderes corporativos en Latinoamérica. Accede a metodologías experienciales de clase mundial y certificaciones oficiales con validez regional.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-[#3BA8C5] font-extrabold pt-2 pb-4">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Certificación Oficial Regional</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Metodología Experiencial LEGO®</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Red de Contactos Internacional</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 rounded-none bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              Solicitar Información Personalizada
            </Link>
            <a
              href={`https://wa.me/${waNumero}?text=Hola%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Consultor%C3%ADa%20de%20ADPH%20Group`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none border border-white/20 bg-white/5 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors"
            >
              Hablar con un Asesor Académico
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
