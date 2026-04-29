'use client'

import { Building2, Store, Map, Hotel, Truck, Rocket } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, cardTitle } from './typography'

const audiences = [
  { icon: Building2, text: 'Agencias de viaje' },
  { icon: Store, text: 'Mayoristas' },
  { icon: Map, text: 'Operadores turísticos' },
  { icon: Hotel, text: 'Hoteles' },
  { icon: Truck, text: 'Empresas de transporte turístico' },
  { icon: Rocket, text: 'Emprendedores del sector' },
]

export default function TargetAudienceSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={eyebrow}>SECCIÓN: ¿PARA QUIÉN ES?</p>
          <h2 style={sectionH2}>Trabajamos con empresas del sector turismo como:</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {audiences.map((a, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div 
                style={{ 
                  textAlign: 'center', 
                  padding: '2rem 1.5rem', 
                  borderRadius: '20px', 
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.backgroundColor = '#f8fafc'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div 
                  style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '18px', 
                    backgroundColor: 'rgba(37, 146, 127, 0.08)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}
                >
                  <a.icon size={32} color="var(--web-primary, #25927F)" />
                </div>
                <h3 style={{ ...cardTitle, fontSize: '1.1rem', lineHeight: 1.3 }}>{a.text}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
