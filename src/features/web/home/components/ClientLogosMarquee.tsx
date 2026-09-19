'use client'

import React, { useRef } from 'react'

type DynamicLogo = { label: string; url: string }

const REAL_CLIENT_LOGOS: DynamicLogo[] = [
  { label: 'Anddes Perú', url: '/clientes/anddes-peru.png' },
  { label: 'Cámara de Comercio de Lima', url: '/clientes/camara-de-comercio-de-lima.jpg' },
  { label: 'Conde Consulting', url: '/clientes/conde-consulting.png' },
  { label: 'Consorcio e Inversiones Generales', url: '/clientes/consorcio-e-inversiones-generales-sac.png' },
  { label: 'Equilux', url: '/clientes/equilux.png' },
  { label: 'I.E. Viterbo', url: '/clientes/i-e-viterbo.png' },
  { label: 'Instituto de Ingenieros de Minas del Perú', url: '/clientes/instituto-de-ingenieros-de-minas-del-peru.png' },
  { label: 'JOR S.A.C.', url: '/clientes/logo-jorsac-2000x991-1-1024x507.webp' },
  { label: 'UNFV', url: '/clientes/logo-unfv.jpg' },
  { label: 'Naltech', url: '/clientes/logotipo-naltech-01.png' },
  { label: 'Mac Pres Digital', url: '/clientes/new-logo-mac-press.png' },
  { label: 'Save the Children Perú', url: '/clientes/save-the-children-peru-coeeci.png' },
  { label: 'Trattoria Pizzeria', url: '/clientes/tratoria-pizzeria.png' },
  { label: 'World Vision Perú', url: '/clientes/world-vision-peru.png' },
]

interface Props {
  logos?: DynamicLogo[]
}

export default function ClientLogosMarquee({ logos: logosFromProps }: Props) {
  const activeLogos: DynamicLogo[] =
    logosFromProps && logosFromProps.length > 0 ? logosFromProps : REAL_CLIENT_LOGOS

  const track = [...activeLogos, ...activeLogos, ...activeLogos]
  const rowRef = useRef<HTMLDivElement>(null)

  const pauseAnimation = () => {
    if (rowRef.current) rowRef.current.style.animationPlayState = 'paused'
  }

  const resumeAnimation = () => {
    if (rowRef.current) rowRef.current.style.animationPlayState = 'running'
  }

  return (
    <section
      style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid hsl(214,20%,91%)',
        borderBottom: '1px solid hsl(214,20%,91%)',
        padding: '3rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1rem' }}>
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--web-primary, #25927F)',
            marginBottom: '0.75rem',
          }}
        >
          Empresas que confían en nosotros
        </p>
        <h2
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            color: '#0A0A0A',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Capacita a tu equipo,{' '}
          <span style={{ color: 'var(--web-primary, #25927F)' }}>sin complicaciones</span>
        </h2>
      </div>

      {/* Marquee wrapper */}
      <div style={{ position: 'relative' }}>
        {/* Fade izquierdo */}
        <div
          aria-hidden
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '10rem', zIndex: 2,
            background: 'linear-gradient(to right, #f8fafc 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Fade derecho */}
        <div
          aria-hidden
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '10rem', zIndex: 2,
            background: 'linear-gradient(to left, #f8fafc 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Track */}
        <div
          ref={rowRef}
          onMouseEnter={pauseAnimation}
          onMouseLeave={resumeAnimation}
          style={{
            display: 'flex',
            gap: '1.25rem',
            width: 'max-content',
            animation: 'marqueeScroll 40s linear infinite',
          }}
        >
          {track.map((logo, i) => (
            <DynamicLogoCard key={i} label={logo.label} url={logo.url} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}

function DynamicLogoCard({ label, url }: { label: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (!ref.current) return
    ref.current.style.filter = 'opacity(1)'
    ref.current.style.transform = 'scale(1.05)'
    ref.current.style.borderColor = 'var(--web-primary, #25927F)'
    ref.current.style.boxShadow = '0 6px 24px rgba(37,146,127,0.2)'
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.filter = 'opacity(0.9)'
    ref.current.style.transform = 'scale(1)'
    ref.current.style.borderColor = 'hsl(214,20%,90%)'
    ref.current.style.boxShadow = 'none'
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flexShrink: 0,
        width: '200px',
        height: '80px',
        padding: '0.5rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        border: '1.5px solid hsl(214,20%,90%)',
        backgroundColor: '#ffffff',
        cursor: 'default',
        filter: 'opacity(0.9)',
        transition: 'filter 0.3s ease, transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        userSelect: 'none',
      }}
    >
      <img
        src={url}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}
