'use client'

import { useState, useEffect, useCallback } from 'react'

const TRANSITION_MS = 700
const INTERVAL_MS = 7000

const slides = [
  '/hero/1.jpg',
  '/hero/2.jpg',
  '/hero/3.jpg',
  '/hero/4.jpg',
  '/hero/5.jpg',
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return
      setCurrent(idx)
    },
    [current],
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden" style={{ display: 'grid' }}>
      {slides.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          style={{
            gridArea: '1 / 1',
            width: '100%',
            height: 'auto',
            display: 'block',
            opacity: i === current ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
          }}
        />
      ))}

      {/* Indicator dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 10 }}
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
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
