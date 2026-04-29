'use client'

import Link from 'next/link'

import { Users, Settings, GraduationCap, Search, BarChart, Check } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, cardTitle, cardBody } from './typography'

const services = [
  {
    icon: Users,
    title: '1.- Capacitación corporativa',
    desc: 'Entrenamos a tu equipo según las necesidades específicas de tu empresa.',
  },
  {
    icon: Settings,
    title: '2.- Programas personalizados',
    desc: 'Capacitación por áreas especializadas en el sector:',
    items: [
      'Ventas y cierre comercial',
      'Atención al cliente',
      'Operaciones y reservas',
      'Marketing turístico',
    ],
    footer: 'Modalidad online o en vivo.',
  },
  {
    icon: GraduationCap,
    title: '3.- Acceso a nuestra plataforma educativa',
    desc: 'Brinda a tu equipo acceso a cursos especializados en turismo.',
    items: [
      'Acceso 24/7',
      'Cursos actualizados constantemente',
      'Seguimiento del avance de cada colaborador',
      'Certificación al finalizar',
    ],
  },
  {
    icon: Search,
    title: '4.- Reclutamiento y selección de talento',
    desc: 'Te ayudamos a encontrar personal capacitado para tu empresa.',
    items: [
      'Publicación de ofertas laborales',
      'Acceso a nuestra base de talento',
      'Preselección de candidatos',
      'Apoyo en el proceso de contratación',
    ],
    cta: { text: 'Publica tu oferta aquí', link: '/contacto' },
  },
  {
    icon: BarChart,
    title: '5.- Evaluación y diagnóstico de equipos',
    desc: 'Identificamos las oportunidades de mejora de tu equipo.',
    items: [
      'Evaluación de habilidades',
      'Detección de brechas',
      'Plan de capacitación personalizado',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={eyebrow}>SECCIÓN: NUESTROS SERVICIOS</p>
          <h2 style={sectionH2}>Soluciones diseñadas para empresas del sector turismo</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {services.map((s, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div 
                style={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '24px', 
                  padding: '2.5rem', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'
                  e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                }}
              >
                <div 
                  style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '16px', 
                    backgroundColor: 'rgba(37, 146, 127, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <s.icon size={28} color="var(--web-primary, #25927F)" />
                </div>
                
                <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1.25rem', lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ ...cardBody, marginBottom: s.items ? '1.5rem' : '0', color: '#475569' }}>{s.desc}</p>
                
                {s.items && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                    {s.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.625rem' }}>
                        <Check size={16} color="var(--web-primary, #25927F)" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ ...cardBody, fontSize: '0.875rem', color: '#64748b' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.footer && (
                  <p style={{ ...cardBody, fontSize: '0.875rem', fontWeight: 600, color: 'var(--web-primary, #25927F)', marginTop: 'auto' }}>
                    {s.footer}
                  </p>
                )}

                {s.cta && (
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <Link 
                      href={s.cta.link}
                      style={{ 
                        color: 'var(--web-primary, #25927F)', 
                        fontWeight: 700, 
                        fontSize: '0.9375rem', 
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px'
                      }}
                    >
                      {s.cta.text}
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
