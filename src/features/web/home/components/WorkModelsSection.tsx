'use client'

import { BookOpen, Layers, Presentation, RefreshCw, Lightbulb } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

import ScrollReveal from './ScrollReveal'
import { eyebrow, sectionH2 } from './typography'

const WA_MSG = encodeURIComponent('Hola, estoy interesado/a en que me diseñen una solución de capacitación a medida para mi empresa.')

const models = [
  {
    icon: BookOpen,
    label: 'Capacitación',
    sublabel: 'por curso',
    accent: '#25927F',
    bg: 'rgba(37, 146, 127, 0.07)',
    gradientFrom: '#25927F',
    gradientTo: '#1a7a69',
  },
  {
    icon: Layers,
    label: 'Programas completos',
    sublabel: 'por área',
    accent: '#BDD962',
    bg: 'rgba(189, 217, 98, 0.1)',
    gradientFrom: '#a3c13d',
    gradientTo: '#BDD962',
  },
  {
    icon: Presentation,
    label: 'Talleres y workshops',
    sublabel: 'personalizados',
    accent: '#025E44',
    bg: 'rgba(2, 94, 68, 0.07)',
    gradientFrom: '#025E44',
    gradientTo: '#03785a',
  },
  {
    icon: RefreshCw,
    label: 'Formación',
    sublabel: 'continua',
    accent: '#0ea5e9',
    bg: 'rgba(14, 165, 233, 0.07)',
    gradientFrom: '#0284c7',
    gradientTo: '#0ea5e9',
  },
]

export default function WorkModelsSection() {
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || '51906741327'
  const waLink = `https://wa.me/${waNumber}?text=${WA_MSG}`

  return (
    <section style={{
      background: 'linear-gradient(160deg, #f0fdf8 0%, #ffffff 50%, #f8faff 100%)',
      padding: '5.5rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blob decorativo */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(189,217,98,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,146,127,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={eyebrow}>MODELOS DE TRABAJO</p>
          <h2 style={sectionH2}>Nos adaptamos a las necesidades de tu empresa</h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
            Elige la modalidad que mejor se ajuste a tu equipo:
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {models.map((m, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '1px solid #e9eef4',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.28s ease',
                  cursor: 'default',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = `0 20px 44px rgba(0,0,0,0.1)`
                  e.currentTarget.style.borderColor = m.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  e.currentTarget.style.borderColor = '#e9eef4'
                }}
              >
                {/* Franja de color superior */}
                <div style={{
                  height: '5px',
                  background: `linear-gradient(90deg, ${m.gradientFrom}, ${m.gradientTo})`,
                }} />

                <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {/* Número + Icono */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      color: m.accent,
                    }}>
                      0{i + 1}
                    </span>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: m.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <m.icon size={26} color={m.accent} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Texto */}
                  <div>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      margin: 0,
                      lineHeight: 1.3,
                    }}>
                      {m.label}
                    </p>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.875rem',
                      color: '#64748b',
                      margin: '0.25rem 0 0',
                    }}>
                      {m.sublabel}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <ScrollReveal direction="up" delay={0.35}>
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.25rem',
                background: 'linear-gradient(135deg, rgba(37,146,127,0.08) 0%, rgba(189,217,98,0.1) 100%)',
                borderRadius: '999px',
                border: '1.5px dashed var(--web-primary, #25927F)',
                textDecoration: 'none',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,146,127,0.14) 0%, rgba(189,217,98,0.16) 100%)'
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.borderStyle = 'solid'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,146,127,0.08) 0%, rgba(189,217,98,0.1) 100%)'
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderStyle = 'dashed'
              }}
            >
              <Lightbulb size={20} color="var(--web-primary, #25927F)" />
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9375rem',
                color: 'var(--web-primary, #25927F)',
                fontWeight: 700,
              }}>
                👉 Diseñamos una solución a medida para tu empresa.
              </span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
