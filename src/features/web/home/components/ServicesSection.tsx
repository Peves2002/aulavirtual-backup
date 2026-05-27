'use client'

import Link from 'next/link'

import { Users, Settings, GraduationCap, Search, BarChart, Check, ArrowRight } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, cardTitle, cardBody } from './typography'

const services = [
  {
    icon: Users,
    title: 'Capacitación corporativa',
    desc: 'Entrenamos a tu equipo según las necesidades específicas de tu empresa.',
    featured: false,
  },
  {
    icon: Settings,
    title: 'Programas personalizados',
    desc: 'Capacitación por áreas especializadas en el sector:',
    items: [
      'Ventas y cierre comercial',
      'Atención al cliente',
      'Operaciones y reservas',
      'Marketing turístico',
    ],
    footer: 'Modalidad online o en vivo.',
    featured: false,
  },
  {
    icon: GraduationCap,
    title: 'Plataforma educativa',
    desc: 'Brinda a tu equipo acceso a cursos especializados en turismo.',
    items: [
      'Acceso 24/7',
      'Cursos actualizados constantemente',
      'Seguimiento del avance de cada colaborador',
      'Certificación al finalizar',
    ],
    featured: true,
    cta: { text: 'Ver catálogo de cursos', link: '/cursos' },
  },
  {
    icon: Search,
    title: 'Reclutamiento de talento',
    desc: 'Te ayudamos a encontrar personal capacitado para tu empresa.',
    items: [
      'Publicación de ofertas laborales',
      'Acceso a nuestra base de talento',
      'Preselección de candidatos',
      'Apoyo en el proceso de contratación',
    ],
    cta: { text: 'Publica tu oferta aquí', link: '/contacto' },
    featured: false,
  },
  {
    icon: BarChart,
    title: 'Evaluación de equipos',
    desc: 'Identificamos las oportunidades de mejora de tu equipo.',
    items: [
      'Evaluación de habilidades',
      'Detección de brechas',
      'Plan de capacitación personalizado',
    ],
    featured: false,
  },
]

export default function ServicesSection() {
  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={eyebrow}>NUESTROS SERVICIOS</p>
          <h2 style={sectionH2}>Soluciones diseñadas para empresas del sector turismo</h2>
          <p style={{ ...cardBody, color: '#64748b', maxWidth: '560px', margin: '1rem auto 0' }}>
            Desde capacitación hasta reclutamiento, acompañamos a tu empresa en cada etapa del crecimiento.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {services.map((s, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: s.featured ? 'var(--web-dark, #025E44)' : '#ffffff',
                  borderRadius: '24px',
                  padding: '2.25rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: s.featured ? 'none' : '1px solid #e2e8f0',
                  boxShadow: s.featured
                    ? '0 20px 48px rgba(2, 94, 68, 0.28)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (!s.featured) {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.09)'
                    e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'
                  }
                }}
                onMouseLeave={e => {
                  if (!s.featured) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                  }
                }}
              >
                {/* Glow decorativo en card destacada */}
                {s.featured && (
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '180px', height: '180px', borderRadius: '50%',
                    background: 'rgba(37,211,102,0.08)', pointerEvents: 'none',
                  }} />
                )}

                {/* Badge destacado */}
                {s.featured && (
                  <span style={{
                    display: 'inline-block', marginBottom: '1.25rem',
                    padding: '0.3rem 0.9rem', borderRadius: '999px',
                    backgroundColor: 'rgba(189,217,98,0.18)',
                    color: 'var(--web-light, #BDD962)', fontSize: '0.72rem',
                    fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    Más popular
                  </span>
                )}

                {/* Icono */}
                <div
                  style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    backgroundColor: s.featured
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <s.icon size={26} color={s.featured ? '#ffffff' : 'var(--web-primary, #25927F)'} />
                </div>

                <h3 style={{
                  ...cardTitle, fontSize: '1.125rem', marginBottom: '0.75rem', lineHeight: 1.35,
                  color: s.featured ? '#ffffff' : '#0f172a',
                }}>
                  {s.title}
                </h3>

                <p style={{
                  ...cardBody, marginBottom: s.items ? '1.25rem' : '0',
                  color: s.featured ? 'rgba(255,255,255,0.72)' : '#475569',
                }}>
                  {s.desc}
                </p>

                {s.items && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', flexGrow: 1 }}>
                    {s.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Check
                          size={15}
                          color={s.featured ? 'var(--web-light, #BDD962)' : 'var(--web-primary, #25927F)'}
                          style={{ marginTop: '3px', flexShrink: 0 }}
                        />
                        <span style={{
                          ...cardBody, fontSize: '0.875rem',
                          color: s.featured ? 'rgba(255,255,255,0.65)' : '#64748b',
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.footer && (
                  <p style={{
                    ...cardBody, fontSize: '0.8125rem', fontWeight: 600,
                    color: s.featured ? 'rgba(255,255,255,0.55)' : 'var(--web-primary, #25927F)',
                    marginTop: 'auto', paddingTop: '0.5rem',
                  }}>
                    {s.footer}
                  </p>
                )}

                {s.cta && (
                  <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                    <Link
                      href={s.cta.link}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: s.featured ? '0.75rem 1.5rem' : '0',
                        borderRadius: s.featured ? '12px' : '0',
                        backgroundColor: s.featured ? 'var(--web-light, #BDD962)' : 'transparent',
                        color: s.featured ? '#0f172a' : 'var(--web-primary, #25927F)',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700, fontSize: '0.9rem',
                        textDecoration: s.featured ? 'none' : 'underline',
                        textUnderlineOffset: '4px',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                    >
                      {s.cta.text}
                      {s.featured && <ArrowRight size={16} />}
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA bottom */}
        <ScrollReveal direction="up" delay={0.3}>
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <p style={{ ...cardBody, color: '#64748b', marginBottom: '1.25rem' }}>
              ¿Buscas capacitar a tu equipo ahora mismo?
            </p>
            <Link
              href="/cursos"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.875rem 2.25rem',
                borderRadius: '14px',
                backgroundColor: 'var(--web-primary, #25927F)',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(var(--web-primary-rgb,37,146,127),0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(var(--web-primary-rgb,37,146,127),0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--web-primary-rgb,37,146,127),0.3)'
              }}
            >
              Explorar catálogo de cursos
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
