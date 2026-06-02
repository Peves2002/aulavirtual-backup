'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

const TRANSITION_MS = 700
const INTERVAL_MS = 7000

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=1920&h=800&q=80',
    badge: 'LIDERAZGO EJECUTIVO',
    title: 'Forma líderes que',
    highlight: 'transforman empresas.',
    description:
      'Programas ejecutivos diseñados para potenciar habilidades de liderazgo, gestión estratégica y toma de decisiones de alto impacto en el mundo corporativo.',
    cta: { label: 'Ver cursos', href: '/cursos' },
    cta2: { label: 'Explorar eBooks', href: '/ebooks' },
  },
  {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1920&h=800&q=80',
    badge: 'EMPRENDIMIENTO DIGITAL',
    title: 'Lanza tu negocio',
    highlight: 'con confianza.',
    description:
      'Aprende a validar, lanzar y escalar tu emprendimiento con metodologías probadas, herramientas prácticas y mentoring especializado.',
    cta: { label: 'Ver cursos', href: '/cursos' },
    cta2: { label: 'Explorar eBooks', href: '/ebooks' },
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&w=1920&h=800&q=80',
    badge: 'VENTAS Y COMERCIO',
    title: 'Cierra más ventas,',
    highlight: 'mejores resultados.',
    description:
      'Técnicas avanzadas de ventas consultivas B2B y negociación comercial para equipos de alto rendimiento que buscan resultados sostenibles.',
    cta: { label: 'Ver cursos de ventas', href: '/cursos' },
    cta2: { label: 'Contactarnos', href: '/contacto' },
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const clearPrevTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return
      if (clearPrevTimer.current) clearTimeout(clearPrevTimer.current)

      // Keep the outgoing slide visible (z-index 1) while the incoming one
      // fades IN on top (z-index 2). No white gap ever shows.
      setPrev(current)
      setCurrent(idx)
      setAnimKey((k) => k + 1)

      // Once the transition is done, release the outgoing slot
      clearPrevTimer.current = setTimeout(() => setPrev(null), TRANSITION_MS + 50)
    },
    [current],
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative h-[580px] md:h-[680px] overflow-hidden">
      {/* ── Background images ─────────────────────────────────
          Strategy:
            · current  → z-index 2, fades IN  (opacity 0 → 1 via CSS transition)
            · prev     → z-index 1, stays at opacity 1 with NO transition
                         so it remains fully visible while current fades in
            · rest     → z-index 0, opacity 0 (hidden)
          This eliminates any gap / white-flash between slides.
      ──────────────────────────────────────────────────────── */}
      {slides.map((s, i) => {
        const isCurrent = i === current
        const isPrev = i === prev

        const opacity = isCurrent || isPrev ? 1 : 0
        const zIndex = isCurrent ? 2 : isPrev ? 1 : 0

        // Only the entering (current) slide uses the CSS opacity transition.
        // The prev slide must NOT transition so it stays opaque as a backdrop.
        const transition = isCurrent ? `opacity ${TRANSITION_MS}ms ease-in-out` : 'none'

        return (
          <div key={i} className="absolute inset-0" style={{ opacity, zIndex, transition }}>
            <Image
              src={s.image}
              alt={s.badge}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.15) 100%)',
              }}
            />
          </div>
        )
      })}

      {/* ── Slide content ─────────────────────────────────── */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div
            key={animKey}
            className="max-w-2xl"
            style={{ animation: `heroSlideIn ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards` }}
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest rounded-full mb-5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.38)',
                color: '#fff',
              }}
            >
              {slide.badge}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5 text-white">
              {slide.title}
              <br />
              <span className="text-primary">{slide.highlight}</span>
            </h1>

            <p
              className="text-base md:text-lg mb-8"
              style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '520px', lineHeight: 1.7 }}
            >
              {slide.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-[var(--shadow-glow)]"
              >
                {slide.cta.label} <ArrowRight size={18} />
              </Link>
              <Link
                href={slide.cta2.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all hover:bg-white/20"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.38)',
                  color: '#fff',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {slide.cta2.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Indicator dots ─────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 20 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '2rem' : '0.5rem',
              height: '0.5rem',
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
