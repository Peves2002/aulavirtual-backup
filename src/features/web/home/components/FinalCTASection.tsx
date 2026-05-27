'use client'

import { Calendar, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

import ScrollReveal from './ScrollReveal'
import { sectionH2Dark, sectionDescDark } from './typography'
import EnterpriseContactForm from './EnterpriseContactForm'

const BULLETS = [
  'Capacitación especializada en turismo',
  'Programas a medida para tu equipo',
  'Seguimiento y certificación incluida',
]

export default function FinalCTASection() {
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO || '51906741327'
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hola, me gustaría solicitar una propuesta personalizada para mi empresa.')}`

  return (
    <section style={{
      background: 'linear-gradient(145deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 65%, var(--web-primary, #25927F) 100%)',
      padding: '6rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blobs con colores de config */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189,217,98), 0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37,146,127), 0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <Sparkles size={120} color="rgba(var(--web-light-rgb, 189,217,98), 0.06)"
        style={{ position: 'absolute', top: '2rem', left: '2rem', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>

          {/* Izquierda */}
          <ScrollReveal direction="left">
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 1rem', borderRadius: '999px',
                backgroundColor: 'rgba(var(--web-light-rgb, 189,217,98), 0.1)',
                border: '1px solid rgba(var(--web-light-rgb, 189,217,98), 0.28)',
                marginBottom: '1.75rem',
              }}>
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: 'var(--web-light, #BDD962)',
                }} />
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem',
                  fontWeight: 700, color: 'var(--web-light, #BDD962)', letterSpacing: '0.08em',
                }}>
                  PARA EMPRESAS DEL SECTOR TURISMO
                </span>
              </div>

              {/* Título */}
              <h2 style={{ ...sectionH2Dark, fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Potencia tu equipo y haz{' '}
                <br />
                <span style={{ color: 'var(--web-light, #BDD962)' }}>
                  crecer tu empresa.
                </span>
              </h2>

              <p style={{ ...sectionDescDark, fontSize: '1.0625rem', marginBottom: '2rem', maxWidth: '480px' }}>
                Estamos listos para ayudarte a construir un equipo más profesional, competitivo y preparado para los retos del sector turismo.
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {BULLETS.map((text, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: i % 2 === 0
                        ? 'var(--web-light, #BDD962)'
                        : 'var(--web-primary, #25927F)',
                    }} />
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem',
                      color: 'rgba(255,255,255,0.75)', fontWeight: 500,
                    }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Botones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.75rem',
                    backgroundColor: 'var(--web-light, #BDD962)',
                    color: 'var(--web-dark-deep, #012d22)',
                    borderRadius: '14px', textDecoration: 'none',
                    fontWeight: 800, fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem',
                    boxShadow: '0 8px 28px rgba(var(--web-light-rgb, 189,217,98), 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.04)'
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(var(--web-light-rgb, 189,217,98), 0.42)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(var(--web-light-rgb, 189,217,98), 0.3)'
                  }}
                >
                  <MessageCircle size={18} />
                  Solicitar propuesta personalizada
                  <ArrowRight size={16} />
                </a>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.75rem',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: '#ffffff',
                    borderRadius: '14px', textDecoration: 'none',
                    fontWeight: 600, fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  }}
                >
                  <Calendar size={18} />
                  Agendar reunión
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Formulario */}
          <ScrollReveal direction="right" delay={0.2}>
            <div
              id="form"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '28px',
                border: '1px solid rgba(var(--web-light-rgb, 189,217,98), 0.15)',
                padding: '0.25rem',
                backdropFilter: 'blur(12px)',
              }}
            >
              <EnterpriseContactForm />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
