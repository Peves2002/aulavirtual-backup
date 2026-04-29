'use client'

import { Lightbulb } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardBody } from './typography'

const models = [
  '1. Capacitación por curso',
  '2. Programas completos por área',
  '3. Talleres o workshops personalizados',
  '4. Planes mensuales de formación continua',
]

export default function WorkModelsSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={eyebrow}>SECCIÓN: MODELOS DE TRABAJO</p>
          <h2 style={sectionH2}>Nos adaptamos a las necesidades de tu empresa</h2>
          <p style={sectionDesc}>Ofrecemos diferentes modalidades de trabajo:</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {models.map((m, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div 
                style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '2rem', 
                  borderRadius: '16px', 
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ ...cardBody, fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>{m}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '1rem 2rem', 
              backgroundColor: 'rgba(37, 146, 127, 0.05)', 
              borderRadius: '999px',
              border: '1px dashed var(--web-primary, #25927F)'
            }}
          >
            <Lightbulb size={20} color="var(--web-primary, #25927F)" />
            <span style={{ ...cardBody, color: 'var(--web-primary, #25927F)', fontWeight: 700 }}>
              👉 Diseñamos una solución a medida para tu empresa.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
