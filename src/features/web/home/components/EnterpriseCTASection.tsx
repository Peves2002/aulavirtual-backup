'use client'

/* ─────────────────────────────────────────────
   EnterpriseCTASection — fondo Lime
   CTA para agendar reunión corporativa.
   ───────────────────────────────────────────── */

import { Calendar, Zap, Shield, HeadphonesIcon } from 'lucide-react'

import { useConfig } from '@/contexts/ConfigContext'

import ScrollReveal from './ScrollReveal'
import { sectionH2, sectionDesc, cardTitle, cardBody, smallText } from './typography'

const WHATSAPP_MSG = encodeURIComponent('Hola, me gustaría agendar una reunión para explorar sus planes corporativos.')

const bullets = [
  { icon: Zap, text: 'Planes desde 5 hasta 100+ colaboradores' },
  { icon: Shield, text: 'Facturación a nombre de empresa con RUC' },
  { icon: HeadphonesIcon, text: 'Soporte dedicado 24 / 7' },
]

export default function EnterpriseCTASection() {
  const configs = useConfig()
  const waNumber = configs.WHATSAPP_NUMERO_EMPRESAS || configs.WHATSAPP_NUMERO || '51928510125'
  const waLink = `https://wa.me/${waNumber}?text=${WHATSAPP_MSG}`

  return (
    <section
      style={{
        backgroundColor: 'var(--web-light, #BDD962)',
        padding: '5rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Patrón decorativo */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(var(--web-dark-rgb, 2, 94, 68),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--web-dark-rgb, 2, 94, 68),0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Decoración geométrica fondo */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          backgroundColor: 'rgba(var(--web-dark-rgb, 2, 94, 68),0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          backgroundColor: 'rgba(var(--web-dark-rgb, 2, 94, 68),0.06)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* ── Izquierda: texto ── */}
          <ScrollReveal direction="left">
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(var(--web-dark-rgb, 2, 94, 68),0.12)',
                  borderRadius: '999px',
                  padding: '0.375rem 1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <Calendar size={14} color="var(--web-dark, #025E44)" />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--web-dark, #025E44)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                  Para empresas
                </span>
              </div>

              <h2 style={{ ...sectionH2, marginBottom: '1rem' }}>
                ¿Capacitas equipos<br />en tu empresa?
              </h2>
              <p style={{ ...sectionDesc, color: 'rgba(10,10,10,0.6)', marginBottom: '2rem', maxWidth: '440px' }}>
                Agenda una reunión gratuita con nuestro equipo y descubre cómo podemos diseñar un plan de formación a medida para tus colaboradores.
              </p>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(var(--web-dark-rgb, 2, 94, 68),0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <b.icon size={16} color="var(--web-dark, #025E44)" />
                    </div>
                    <span style={{ ...cardBody, color: '#0A0A0A', fontWeight: 500 }}>
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* ── Derecha: botones ── */}
          <ScrollReveal direction="right" delay={0.15}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    border: '2px solid rgba(var(--web-light-rgb, 189, 217, 98),0.3)',
                  }}
                >
                  <Calendar size={36} color="var(--web-dark, #025E44)" />
                </div>
                <h3 style={{ ...cardTitle, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  Reunión sin costo
                </h3>
                <p style={cardBody}>
                  30 minutos para entender tus necesidades y presentarte nuestra propuesta de valor.
                </p>
              </div>

              {/* Botón principal */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '14px',
                  backgroundColor: 'var(--web-dark, #025E44)',
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(var(--web-dark-rgb, 2, 94, 68),0.25)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement

                  el.style.backgroundColor = '#014d37'
                  el.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement

                  el.style.backgroundColor = 'var(--web-dark, #025E44)'
                  el.style.transform = 'scale(1)'
                }}
              >
                <Calendar size={18} />
                Agendar reunión gratuita
              </a>

              {/* Nota */}
              <p style={{ ...smallText, textAlign: 'center', marginTop: '1rem' }}>
                Sin compromisos · Respuesta en menos de 24 h
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
