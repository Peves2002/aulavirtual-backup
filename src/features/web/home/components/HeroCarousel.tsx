'use client'

import React, { useState, useEffect, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'


const STATS = [
  { value: '+1,200', label: 'Estudiantes' },
  { value: '+80', label: 'Cursos' },
  { value: '98%', label: 'Satisfacción' },
]

const SLIDES = [
  {
    eyebrow: 'Plataforma educativa online',
    title: 'Socios de las Cámaras',
    titleAccent: 'más importantes del país.',
    description: 'Formamos alianzas estratégicas con las principales Cámaras de Comercio del país, fortaleciendo nuestra propuesta educativa y garantizando programas de alto nivel para nuestros estudiantes.',
    visual: 'camaras' as const,
  },
  {
    eyebrow: 'Plataforma educativa online',
    title: 'Doble certificación',
    titleAccent: 'Internacional ISO',
    description: 'Nuestro proceso de enseñanza está respaldado por procesos certificados internacionalmente, asegurando una formación profesional más sólida y confiable.',
    visual: 'isos' as const,
  },
  {
    eyebrow: 'Plataforma educativa online',
    title: 'Tu Éxito Profesional Comienza con una',
    titleAccent: 'Doble Certificación',
    description: 'Especialízate con programas avalados por universidades y respaldados por los colegios profesionales más importantes del Perú.',
    visual: 'portada3' as const,
  },
  {
    eyebrow: 'Plataforma educativa online',
    title: 'Estamos presentes',
    titleAccent: 'en todo el país.',
    description: 'Llevamos nuestros servicios a cada rincón del Perú, contando con sedes presenciales en 21 regiones de nuestro país.',
    visual: 'portada4' as const,
  },
]

function VisualCamaras() {
  const logos = [
    { src: '/images/camaras/cc-arequipa.webp', alt: 'Cámara de Comercio e Industria de Arequipa' },
    { src: '/images/camaras/cc-tacna.webp', alt: 'Cámara de Comercio Industria y Producción de Tacna' },
    { src: '/images/camaras/cc-lima.webp', alt: 'CCL Cámara de Comercio Lima' },
    { src: '/images/camaras/cc-ica.webp', alt: 'Cámara de Comercio Industria y Turismo de Ica' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', width: '100%', maxWidth: '480px' }}>
      {logos.map(logo => (
        <div
          key={logo.alt}
          style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}
        >
          <div style={{ position: 'relative', width: '100%', height: '70px' }}>
            <Image src={logo.src} alt={logo.alt} fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualIsos() {
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
      {['/images/isos/iso9001.webp', '/images/isos/iso21001.webp'].map((src, i) => (
        <div key={i} style={{ position: 'relative', width: '180px', height: '180px', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))' }}>
          <Image src={src} alt={`ISO ${i === 0 ? '9001' : '21001'}`} fill style={{ objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}

function VisualImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, ...style }}>
      <Image src={src} alt={alt} fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} sizes="580px" priority />
    </div>
  )
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 500)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const t = setInterval(next, 6000)

    return () => clearInterval(t)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
      position: 'relative',
      overflow: 'hidden',
      height: '560px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Patrón decorativo */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb,37,146,127),0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>

          {/* Izquierda: texto (igual para todos) */}
          <div
            key={`left-${current}`}
            style={{ position: 'relative', zIndex: 2, animation: 'heroFadeIn 0.5s ease', maxWidth: '560px' }}
          >

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(var(--web-light-rgb,189,217,98),0.15)', border: '1px solid rgba(var(--web-light-rgb,189,217,98),0.3)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                {slide.eyebrow}
              </span>
            </div>

            {/* Título */}
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              {slide.title}
              <br />
              <span style={{ color: 'var(--web-light, #BDD962)' }}>{slide.titleAccent}</span>
            </h1>

            {/* Descripción */}
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: '480px', marginBottom: '2rem' }}>
              {slide.description}
            </p>

            {/* Botones */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <Link
                href="/cursos"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '12px', backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(var(--web-primary-rgb,37,146,127),0.45)' }}
              >
                Ver Cursos <ArrowRight size={18} />
              </Link>
              <Link
                href="/nosotros"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
              >
                Saber más
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.375rem', fontWeight: 800, color: 'var(--web-light, #BDD962)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha: visual del slide (solo camaras e isos en el grid) */}
          {(slide.visual === 'camaras' || slide.visual === 'isos') && (
            <div
              key={`right-${current}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: slide.visual === 'isos' ? 'flex-start' : 'center', animation: 'heroFadeIn 0.5s ease' }}
            >
              {slide.visual === 'camaras' && <VisualCamaras />}
              {slide.visual === 'isos' && <VisualIsos />}
            </div>
          )}
        </div>

      </div>

      {/* Imágenes absolutas relativas a la section (ignoran el padding) */}
      {slide.visual === 'portada3' && (
        <div key={`img-${current}`} style={{ animation: 'heroFadeIn 0.5s ease', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <VisualImage
            src="/images/3.png"
            alt="Grupo Ollarves equipo"
            style={{ right: '16%', width: '44%', height: '100%' }}
          />
        </div>
      )}
      {slide.visual === 'portada4' && (
        <div key={`img-${current}`} style={{ animation: 'heroFadeIn 0.5s ease', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <VisualImage
            src="/images/4.png"
            alt="Presencia nacional"
            style={{ left: '50%', transform: 'translateX(-18%)', width: '52%', top: '3rem' }}
          />
        </div>
      )}

      {/* Indicadores de portada */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '2rem', display: 'flex', justifyContent: 'center', gap: '0.625rem', zIndex: 2 }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Ir a la portada ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              borderRadius: '999px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: i === current ? 'var(--web-light, #BDD962)' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
