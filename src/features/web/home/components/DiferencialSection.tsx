'use client'

import { Star, ShieldCheck, UserCheck, Briefcase, Users, MessageSquare } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, cardTitle, cardBody } from './typography'

const differentials = [
  { icon: Star, title: 'Especialización 100% en turismo', desc: 'Conocemos el sector mejor que nadie.' },
  { icon: ShieldCheck, title: 'Formación práctica y aplicable', desc: 'Resultados desde el primer día.' },
  { icon: UserCheck, title: 'Docentes con experiencia real', desc: 'Aprendizaje de profesionales activos.' },
  { icon: Briefcase, title: 'Acceso a bolsa de trabajo', desc: 'Talento capacitado a tu disposición.' },
  { icon: Users, title: 'Comunidad activa del sector', desc: 'Networking y crecimiento conjunto.' },
  { icon: MessageSquare, title: 'Acompañamiento constante', desc: 'No estás solo en el proceso.' },
]

export default function DiferencialSection() {
  return (
    <section style={{ backgroundColor: 'hsl(167, 30%, 96%)', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p style={eyebrow}>SECCIÓN: DIFERENCIAL CEPAV</p>
          <h2 style={sectionH2}>¿Por qué elegir CEPAV para capacitar a tu equipo?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {differentials.map((d, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  backgroundColor: '#ffffff', 
                  padding: '2rem', 
                  borderRadius: '24px',
                  border: '1px solid hsl(167, 30%, 89%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  height: '100%'
                }}
              >
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '14px', 
                    backgroundColor: 'rgba(37, 146, 127, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <d.icon size={26} color="var(--web-primary, #25927F)" />
                </div>
                <div>
                  <h3 style={{ ...cardTitle, fontSize: '1.15rem', marginBottom: '0.5rem' }}>{d.title}</h3>
                  <p style={{ ...cardBody, color: '#64748b', fontSize: '0.9375rem' }}>{d.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
