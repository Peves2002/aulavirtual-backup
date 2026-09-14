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
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    color: '#ffffff',
    fontSize: '1.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 2,
    transition: 'all 0.3s ease',
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
            height: 'clamp(220px, 28vw, 450px)',
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
                opacity: i === index ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out, transform 6s ease-in-out',
                transform: i === index ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ))}

          {/* Gradient overlay bottom */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))',
              pointerEvents: 'none',
            }}
          />

          {/* Gradient overlay top */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '25%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))',
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
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Siguiente imagen"
                onClick={() => setIndex(prev => (prev + 1) % images.length)}
                style={arrowStyle('right')}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
              >
                ›
              </button>
            </>
          )}

          {images.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: '0.625rem',
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
                    width: i === index ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    border: '2px solid rgba(255,255,255,0.5)',
                    backgroundColor: i === index ? '#ffffff' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                    boxShadow: i === index ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
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
