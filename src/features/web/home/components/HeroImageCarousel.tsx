'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface HeroImageCarouselProps {
  images: string[]
}

function arrowStyle(side: 'left' | 'right'): CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '1.5rem',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#0A0A0A',
    fontSize: '1.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 2,
  }
}

export default function HeroImageCarousel({ images }: HeroImageCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return undefined

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(200px, 26vw, 420px)',
            overflow: 'hidden',
          }}
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`Imagen de portada ${i + 1}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                display: i === index ? 'block' : 'none',
              }}
            />
          ))}

          {/* Degradado inferior para que los controles/puntos resalten sobre cualquier foto */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))',
              pointerEvents: 'none',
            }}
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={() => setIndex(prev => (prev - 1 + images.length) % images.length)}
                style={arrowStyle('left')}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Siguiente imagen"
                onClick={() => setIndex(prev => (prev + 1) % images.length)}
                style={arrowStyle('right')}
              >
                ›
              </button>
            </>
          )}

          {images.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                zIndex: 2,
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir a la imagen ${i + 1}`}
                  onClick={() => setIndex(i)}
                  style={{
                    width: i === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: i === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'width 0.2s, background-color 0.2s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
