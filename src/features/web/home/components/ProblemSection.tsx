'use client'

import { AlertCircle } from 'lucide-react'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardBody } from './typography'

const problems = [
  'Equipos que no logran cerrar ventas',
  'Falta de conocimiento en cotizaciones y herramientas',
  'Atención al cliente poco diferenciada',
  'Alta rotación de personal',
  'Dificultad para encontrar talento capacitado',
]

export default function ProblemSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          <ScrollReveal direction="left">
            <div>
              <p style={eyebrow}>SECCIÓN: PROBLEMA</p>
              <h2 style={sectionH2}>
                Sabemos los desafíos que <br />
                <span style={{ color: 'var(--web-primary, #25927F)' }}>enfrenta tu empresa</span>
              </h2>
              <p style={{ ...sectionDesc, marginBottom: '2rem' }}>
                En el sector turismo, muchas empresas enfrentan problemas como:
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {problems.map((p, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <AlertCircle size={14} color="#ef4444" />
                    </div>
                    <span style={{ ...cardBody, color: '#334155', fontSize: '1.125rem', fontWeight: 500 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div 
              style={{ 
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                backgroundColor: 'hsl(167, 30%, 96%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid hsl(167, 30%, 89%)',
              }}
            >
              <div style={{ textAlign: 'center', padding: '2.5rem' }}>
                <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>😟</div>
                <p style={{ ...sectionDesc, color: '#475569', fontWeight: 500 }}>
                  No permitas que la falta de capacitación detenga el crecimiento de tu negocio turístico.
                </p>
                <div style={{ marginTop: '1.5rem', height: '4px', width: '60px', backgroundColor: 'var(--web-primary, #25927F)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
