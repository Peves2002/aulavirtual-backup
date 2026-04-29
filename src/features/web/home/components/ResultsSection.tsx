'use client'

import { CheckCircle2, TrendingUp } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardBody } from './typography'

const results = [
  'Incrementar tus ventas',
  'Mejorar la experiencia del cliente',
  'Reducir errores operativos',
  'Profesionalizar a tu equipo',
  'Fortalecer tu marca en el mercado',
  'Reducir la rotación de personal',
]

export default function ResultsSection() {
  return (
    <section style={{ backgroundColor: 'var(--web-dark, #025E44)', padding: '5rem 1rem', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <ScrollReveal direction="left">
            <div>
              <p style={{ ...eyebrow, color: 'var(--web-light, #BDD962)' }}>SECCIÓN: RESULTADOS</p>
              <h2 style={{ ...sectionH2, color: '#ffffff', marginBottom: '1rem' }}>¿Qué logrará tu empresa con CEPAV?</h2>
              <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
                Después de capacitar a tu equipo con nosotros, podrás:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {results.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={20} color="var(--web-light, #BDD962)" style={{ flexShrink: 0 }} />
                    <span style={{ ...cardBody, color: '#ffffff', fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderRadius: '24px', 
                padding: '3.5rem 2.5rem', 
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '20px', 
                  backgroundColor: 'rgba(189, 217, 98, 0.15)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <TrendingUp size={40} color="var(--web-light, #BDD962)" />
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--web-light, #BDD962)', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>+40%</div>
              <p style={{ ...cardBody, color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 500 }}>
                Incremento promedio en ventas reportado por agencias capacitadas.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
