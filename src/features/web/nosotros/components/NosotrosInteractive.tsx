'use client'

import { Heart, Lightbulb, Users, TrendingUp, ShieldCheck } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'

const DEFAULT_VALORES = [
  {
    icon: Heart,
    title: 'Compromiso',
    desc: 'Nos dedicamos plenamente a la formación de cada estudiante, acompañándolos en cada etapa de su aprendizaje.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    desc: 'Buscamos constantemente nuevas formas de enseñar y de acercar el conocimiento de manera más efectiva.',
  },
  {
    icon: Users,
    title: 'Trabajo en Equipo',
    desc: 'Creemos en la colaboración como motor del aprendizaje y el crecimiento colectivo.',
  },
  {
    icon: TrendingUp,
    title: 'Mejora Continua',
    desc: 'Actualizamos nuestros contenidos y metodologías para mantenernos a la vanguardia del sector.',
  },
  {
    icon: ShieldCheck,
    title: 'Integridad',
    desc: 'Actuamos con transparencia y honestidad, generando confianza en cada relación con nuestros estudiantes y empresas.',
  },
]

const VALOR_ICONS = [Heart, Lightbulb, Users, TrendingUp, ShieldCheck]

/* ── Misión / Visión ────────────────────────────────────── */
interface MisionVisionProps {
  misionTitle?: string
  misionText?: string
  visionTitle?: string
  visionText?: string
}

export function MisionVisionSection({ misionTitle, misionText, visionTitle, visionText }: MisionVisionProps) {
  return (
    <section className="bg-slate-50 py-20 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Quiénes somos</h2>
            <h3 className="text-slate-900 font-black text-3xl md:text-5xl">Misión y Visión</h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          <ScrollReveal direction="left" delay={0.05}>
            <MisionCard title={misionTitle} text={misionText} />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <VisionCard title={visionTitle} text={visionText} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function MisionCard({ title, text }: { title?: string; text?: string }) {
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(8,71,155,0.1)] hover:border-[#08479b]/20">
      <div className="h-[240px] bg-gradient-to-br from-[#08479b] to-[#1268db] flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        {/* Icon Container */}
        <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
          <span className="text-5xl">🎯</span>
        </div>
      </div>
      <div className="p-8 md:p-12 text-center md:text-left">
        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#08479b] transition-colors">
          {title || 'Nuestra Misión'}
        </h3>
        <div 
          className="text-slate-600 leading-relaxed text-lg [&>p]:m-0"
          dangerouslySetInnerHTML={{ __html: text || '<p>Brindar formación profesional de alta calidad, accesible y orientada al sector industrial, impulsando el desarrollo de competencias que generan valor real en las organizaciones y en la carrera de nuestros estudiantes.</p>' }}
        />
      </div>
    </div>
  )
}

function VisionCard({ title, text }: { title?: string; text?: string }) {
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(8,71,155,0.1)] hover:border-[#08479b]/20">
      <div className="h-[240px] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        {/* Icon Container */}
        <div className="w-24 h-24 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
          <span className="text-5xl">🔭</span>
        </div>
      </div>
      <div className="p-8 md:p-12 text-center md:text-left">
        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#08479b] transition-colors">
          {title || 'Nuestra Visión'}
        </h3>
        <div 
          className="text-slate-600 leading-relaxed text-lg [&>p]:m-0"
          dangerouslySetInnerHTML={{ __html: text || '<p>Ser la plataforma de referencia a nivel hispanoamericano en educación continua e In-House, destacando por nuestra innovación, excelencia académica y contribución al crecimiento competitivo del ecosistema corporativo.</p>' }}
        />
      </div>
    </div>
  )
}

/* ── Valores ─────────────────────────────────────────────── */
interface ValorItem {
  title: string
  desc: string
}

interface ValoresSectionProps {
  valores?: ValorItem[]
}

export function ValoresSection({ valores }: ValoresSectionProps) {
  const activeValores = valores && valores.length > 0
    ? valores.map((v, i) => ({ ...v, icon: VALOR_ICONS[i % VALOR_ICONS.length] }))
    : DEFAULT_VALORES

  return (
    <section className="bg-white py-24 px-6 lg:px-10 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Lo que nos define</h2>
            <h3 className="text-slate-900 font-black text-3xl md:text-5xl mb-6">Valores que nos identifican</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              &quot;La excelencia no es un acto, sino un hábito. Cada valor que practicamos a diario define quiénes somos y hacia dónde vamos.&quot;
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {activeValores.map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <ValorCard v={v} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValorCard({ v }: { v: { icon: typeof Heart; title: string; desc: string } }) {
  return (
    <div className="group h-full bg-slate-50 rounded-[24px] p-8 border border-slate-200 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-[#08479b]/30 hover:shadow-[0_12px_40px_rgb(8,71,155,0.08)] flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-[#08479b]/5 flex items-center justify-center mb-6 border border-[#08479b]/10 transition-colors duration-300 group-hover:bg-[#08479b]/10 group-hover:border-[#08479b]/20">
        <v.icon className="w-8 h-8 text-[#08479b]" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {v.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {v.desc}
      </p>
    </div>
  )
}
