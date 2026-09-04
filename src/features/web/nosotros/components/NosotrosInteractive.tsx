'use client'

import { Heart, Lightbulb, Users, TrendingUp, ShieldCheck } from 'lucide-react'

import { eyebrow, sectionH2, sectionDesc, cardTitle, cardBody } from '@/features/web/home/components/typography'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

const valores = [
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

/* ── Sobre Nosotros Presentación ─────────────────────────── */
export function SobreNosotrosIntroSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderBottom: '1px solid hsl(214,20%,92%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>Conoce más sobre la empresa</p>
            <h2 style={{ ...sectionH2, textAlign: 'center' }}>Sobre Nosotros</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1.5px solid hsl(214,20%,91%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.0625rem',
                color: '#334155',
                lineHeight: 1.85,
                margin: 0,
                textAlign: 'center',
              }}
            >
              <em>
                &quot;Desde el año 2021, MS & M CONSULTING viene brindando servicios con profesionales innovadores, calificados con años de experiencia. Liderando proyectos en diferentes sectores, tanto privados como públicos. Nuestros servicios destacados, como Seguridad y Salud en el Trabajo, Medio Ambiente, Calidad, Seguridad en Alimentos, Inspecciones Técnicas de Seguridad en Edificaciones, Monitoreos Ocupacionales, Formalización Laboral, entre otros, permiten lograr sus objetivos organizacionales. Nuestro compromiso con los clientes es muy importante; por ello, nos esforzamos por brindar soluciones integrales a sus necesidades. Nuestra experiencia te permitirá lograr tus metas empresariales.&quot;
              </em>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ── Misión / Visión ────────────────────────────────────── */
export function MisionVisionSection() {
  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
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
          }}
        >
          {/* Misión */}
          <ScrollReveal direction="left" delay={0.05}>
            <MisionCard />
          </ScrollReveal>

          {/* Visión */}
          <ScrollReveal direction="right" delay={0.1}>
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
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 16px 40px rgba(var(--web-primary-rgb, 37, 146, 127),0.14)'
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
          background: 'linear-gradient(135deg, var(--web-dark, #025E44) 0%, var(--web-primary, #25927F) 60%, #3AB079 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
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
          <span style={{ fontSize: '2.5rem' }}>🎯</span>
        </div>
      </div>
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--web-dark, #025E44)' }}>
          Nuestra Misión
        </h3>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.75, fontStyle: 'italic' }}>
          &quot;Impulsar el crecimiento sostenible de nuestros clientes mediante soluciones especializadas en consultoría, gestión empresarial y cumplimiento legal, brindando un acompañamiento cercano, técnico y orientado a resultados.&quot;
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
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 16px 40px rgba(var(--web-light-rgb, 189, 217, 98),0.18)'
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
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a2e20 60%, var(--web-dark, #025E44) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(var(--web-light-rgb, 189, 217, 98),0.06) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div
          style={{
            width: '80px', height: '80px', borderRadius: '24px',
            backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)',
            position: 'relative', zIndex: 1,
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🔭</span>
        </div>
      </div>
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--web-dark, #025E44)' }}>
          Nuestra Visión
        </h3>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.75, fontStyle: 'italic' }}>
          &quot;Ser una consultora referente en el Perú, reconocida por la calidad de nuestros servicios, la innovación en nuestras soluciones y la confianza que construimos con empresas, PYMES y organizaciones que buscan crecer de manera ordenada, segura y sostenible.&quot;
        </p>
      </div>
    </div>
  )
}

/* ── Historia de la Empresa ──────────────────────────────── */
const hitosHistoriaNarrativa = [
  {
    year: '2020',
    title: 'Fundación e Inicios SST',
    text: 'Damos nuestros inicios empresariales como empresa de Gestión en Seguridad y Salud en el Trabajo, implementando sistemas frente a la prevención de la COVID-19 y brindando implementaciones a clientes importantes.',
  },
  {
    year: '2021',
    title: 'Crecimiento y Consolidación en ONGs',
    text: 'Experimentamos un crecimiento significativo, superando los obstáculos del primer año de la pandemia y expandiendo nuestro alcance de manera notable. Nos consolidamos como líderes en el sector ONG, brindando soluciones efectivas y ganando la confianza de muchas organizaciones.',
  },
  {
    year: '2022 - 2023',
    title: 'Diversificación de Servicios y Cobertura',
    text: 'Nos permitió llegar a clientes de sectores económicos importantes, brindando una variedad de servicios adicionales a la implementación de Seguridad y Salud en el Trabajo, como optimización de Sistemas Operativos y aceleración al cliente.',
  },
  {
    year: '2024',
    title: 'Expansión a Salud Ocupacional',
    text: 'Nos consolidamos con clientes del sector ONG e incorporamos de manera integral el servicio de implementación y seguimiento en Salud Ocupacional.',
  },
  {
    year: '2025',
    title: 'Premio PRO INNOVATE & Plataforma PASS',
    text: 'Nos hicimos acreedores de un Premio de Tecnología Ágil por PRO INNOVATE, el cual nos permitió obtener la plataforma PASS para el beneficio de nuestros clientes y la optimización de su gestión documentaria.',
  },
  {
    year: '2026',
    title: 'Ecosistema Digital y Consolidación',
    text: 'Buscamos consolidarnos en clientes de diversos sectores económicos, brindando capacitaciones con un alto profesionalismo a través de herramientas y plataformas de tecnología digital de última generación.',
  },
]

export function HistoriaSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>Trayectoria y Evolución</p>
            <h2 style={{ ...sectionH2, textAlign: 'center' }}>Nuestra Historia</h2>
          </div>
        </ScrollReveal>

        {/* Línea temporal vertical con viñetas animadas por scroll */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* Línea guía vertical continua */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              bottom: '12px',
              left: '9px',
              width: '2px',
              backgroundColor: 'var(--web-primary, #25927F)',
              opacity: 0.3,
            }}
          />

          {hitosHistoriaNarrativa.map((hito, index) => (
            <ScrollReveal key={hito.year} delay={index * 0.08} direction="up">
              <div
                style={{
                  position: 'relative',
                  marginBottom: index === hitosHistoriaNarrativa.length - 1 ? 0 : '3rem',
                }}
              >
                {/* Viñeta / Nodo en la línea temporal */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '4px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '3.5px solid var(--web-primary, #25927F)',
                    boxShadow: '0 0 0 4px rgba(37, 146, 127, 0.15)',
                    zIndex: 2,
                  }}
                />

                {/* Texto del hito */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 800,
                        color: 'var(--web-primary, #25927F)',
                      }}
                    >
                      {hito.year}
                    </span>
                    <span style={{ color: '#cbd5e1', fontWeight: 300 }}>—</span>
                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        margin: 0,
                      }}
                    >
                      {hito.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.9375rem',
                      color: '#475569',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {hito.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Valores ─────────────────────────────────────────────── */
export function ValoresSection() {
  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}>
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
          }}
        >
          {valores.map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
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
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        border: '1.5px solid hsl(214,20%,92%)',
        textAlign: 'center',
        cursor: 'default',
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s, background-color 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 12px 36px rgba(var(--web-primary-rgb, 37, 146, 127),0.12)'
        el.style.borderColor = 'var(--web-primary, #25927F)'
        el.style.backgroundColor = '#ffffff'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement

        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.borderColor = 'hsl(214,20%,92%)'
        el.style.backgroundColor = '#ffffff'
      }}
    >
      <div
        style={{
          width: '60px', height: '60px', borderRadius: '18px',
          backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127),0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          border: '1.5px solid rgba(var(--web-primary-rgb, 37, 146, 127),0.2)',
        }}
      >
        <v.icon size={28} color="var(--web-primary, #25927F)" />
      </div>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '0.625rem' }}>
        {v.title}
      </h3>
      <p style={{ ...cardBody, textAlign: 'center' }}>{v.desc}</p>
    </div>
  )
}

