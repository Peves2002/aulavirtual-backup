'use client'

import { Heart, Lightbulb, Users, TrendingUp, ShieldCheck } from 'lucide-react'

import { eyebrow, sectionH2, sectionDesc, cardTitle, cardBody } from '@/features/web/home/components/typography'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

const valores = [
  {
    icon: ShieldCheck,
    title: 'Integridad',
    desc: 'Actuamos con transparencia y honestidad, los mismos principios que enseñamos en el control gubernamental y la ética del servidor público.',
  },
  {
    icon: Lightbulb,
    title: 'Excelencia',
    desc: 'Buscamos los más altos estándares en cada curso, actualizando nuestros contenidos con la normativa y directivas vigentes del sector público.',
  },
  {
    icon: Users,
    title: 'Compromiso',
    desc: 'Nos dedicamos plenamente a cada estudiante, acompañándolos desde su preparación hasta que logran su plaza o fortalecen su desempeño como funcionario.',
  },
  {
    icon: TrendingUp,
    title: 'Innovación',
    desc: 'Aplicamos metodologías modernas y casos prácticos reales para hacer la formación en gestión pública más accesible y efectiva.',
  },
  {
    icon: Heart,
    title: 'Confianza',
    desc: 'Construimos relaciones sólidas con nuestros estudiantes basadas en el respeto, la dedicación y resultados comprobados en concursos públicos.',
  },
]

/* ── Misión / Visión ────────────────────────────────────── */
export function MisionVisionSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>Quiénes somos</p>
            <h2 style={{ ...sectionH2, textAlign: 'center' }}>Misión y Visión</h2>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {/* Misión */}
          <ScrollReveal direction="left" delay={0.05} className="h-full">
            <MisionCard />
          </ScrollReveal>

          {/* Visión */}
          <ScrollReveal direction="right" delay={0.1} className="h-full">
            <VisionCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function MisionCard() {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        border: '1.5px solid hsl(214,20%,91%)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 16px 40px rgba(var(--web-primary-rgb, 212, 175, 55),0.14)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
      }}
    >
      <div
        style={{
          height: '200px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.50)), url("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '80px', height: '80px', borderRadius: '24px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255,255,255,0.2)',
            position: 'relative', zIndex: 1,
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🏛️</span>
        </div>
      </div>
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--web-dark, #1A1A1A)' }}>
          Nuestra Misión
        </h3>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.75, fontStyle: 'italic' }}>
          &quot;Ser líderes en la formación de profesionales del sector público, brindando herramientas y recursos para aprobar exámenes de ascenso y fomentando la mejora continua y el desarrollo de habilidades para el desempeño efectivo en su trabajo. Nos esforzamos por ser una academia innovadora, que se adapta a los cambios en el entorno laboral y las necesidades de nuestros estudiantes, para brindar una formación integral que les permita crecer y alcanzar sus metas profesionales a largo plazo.&quot;
        </p>
      </div>
    </div>
  )
}

function VisionCard() {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        border: '1.5px solid hsl(214,20%,91%)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 16px 40px rgba(var(--web-light-rgb, 240, 208, 96),0.18)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'
      }}
    >
      <div
        style={{
          height: '200px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.50)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '80px', height: '80px', borderRadius: '24px',
            backgroundColor: 'rgba(var(--web-light-rgb, 240, 208, 96),0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(var(--web-light-rgb, 240, 208, 96),0.25)',
            position: 'relative', zIndex: 1,
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🌟</span>
        </div>
      </div>
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--web-dark, #1A1A1A)' }}>
          Nuestra Visión
        </h3>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.75, fontStyle: 'italic' }}>
          &quot;Brindar herramientas y recursos de calidad a profesionales, con el fin de ayudarles a aprobar sus exámenes de ascenso y alcanzar sus metas profesionales. Nos comprometemos a proporcionar una educación de excelencia y una experiencia de aprendizaje adecuada para cada estudiante.&quot;
        </p>
      </div>
    </div>
  )
}

/* ── Valores ─────────────────────────────────────────────── */
export function ValoresSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>Lo que nos define</p>
            <h2 style={{ ...sectionH2, textAlign: 'center' }}>Valores que nos identifican</h2>
            <p style={{ ...sectionDesc, textAlign: 'center', marginTop: '0.75rem' }}>
              &quot;La excelencia no es un acto, sino un hábito. Cada valor que practicamos a diario define quiénes somos y hacia dónde vamos.&quot;
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {valores.map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.06} className="h-full">
              <ValorCard v={v} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValorCard({ v }: { v: typeof valores[number] }) {
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        border: '1.5px solid #e5e5e5',
        textAlign: 'center',
        cursor: 'default',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s, background-color 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 12px 36px rgba(var(--web-primary-rgb, 212, 175, 55),0.12)'
        el.style.borderColor = 'var(--web-primary, #D4AF37)'
        el.style.backgroundColor = '#ffffff'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.borderColor = '#e5e5e5'
        el.style.backgroundColor = '#f5f5f5'
      }}
    >
      <div
        style={{
          width: '60px', height: '60px', borderRadius: '18px',
          backgroundColor: 'rgba(var(--web-primary-rgb, 212, 175, 55),0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          border: '1.5px solid rgba(var(--web-primary-rgb, 212, 175, 55),0.2)',
        }}
      >
        <v.icon size={28} color="var(--web-primary, #D4AF37)" />
      </div>
      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '0.625rem' }}>
        {v.title}
      </h3>
      <p style={{ ...cardBody, textAlign: 'center' }}>{v.desc}</p>
    </div>
  )
}
