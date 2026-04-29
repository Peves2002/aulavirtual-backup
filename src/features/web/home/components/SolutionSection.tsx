'use client'

import { CheckCircle2 } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardBody } from './typography'

const solutions = [
  'Formación práctica enfocada en resultados',
  'Docentes con experiencia real en el sector turismo',
  'Contenido actualizado según el mercado',
  'Modalidad flexible (online y/o en vivo)',
  'Enfoque en ventas, atención al cliente y gestión',
]

export default function SolutionSection() {
  return (
    <section style={{ backgroundColor: 'hsl(167, 30%, 96%)', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Imagen / Visual a la izquierda para variar el layout */}
          <ScrollReveal direction="left">
            <div 
              style={{ 
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                border: '1.5px solid #e2e8f0',
              }}
            >
              <div style={{ textAlign: 'center', padding: '2.5rem' }}>
                <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>🚀</div>
                <div style={{ ...sectionH2, fontSize: '1.5rem', color: 'var(--web-primary, #25927F)' }}>Resultados Tangibles</div>
                <p style={{ ...sectionDesc, color: '#64748b', fontSize: '0.9375rem' }}>
                  Transformamos el potencial de tus colaboradores en crecimiento para tu empresa.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <p style={eyebrow}>SECCIÓN: SOLUCIÓN</p>
              <h2 style={sectionH2}>
                En CEPAV formamos equipos que <br />
                <span style={{ color: 'var(--web-primary, #25927F)' }}>venden, fidelizan y crecen</span>
              </h2>
              <p style={{ ...sectionDesc, marginBottom: '2rem' }}>
                Somos el primer centro especializado en capacitación para agentes de viaje en Perú, con programas diseñados para mejorar el desempeño real de tu equipo.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {solutions.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(37, 146, 127, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--web-primary, #25927F)" />
                    </div>
                    <span style={{ ...cardBody, color: '#334155', fontSize: '1.125rem', fontWeight: 500 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
