'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronLeft, ChevronRight, Layers, GraduationCap, Compass, BookOpen, Star, Code, Target, BookMarked, Brain } from 'lucide-react'

import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

type CategoryData = {
  id: string
  nombre: string
  slug: string
  cursosCount: number
  diplomadosCount: number
  total: number
}

// Iconos aleatorios según un hash del id (para darles personalidad)
const ICONS = [Layers, GraduationCap, Compass, BookOpen, Star, Code, Target, BookMarked, Brain]

// Gradientes vibrantes (glassmorphism/modernos)
const GRADIENTS = [
  'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Emerald
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // Amber
  'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', // Violet
  'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', // Pink
  'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', // Cyan
  'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', // Rose
  'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // Lime
]

function getStylesForId(id: string) {
  let hash = 0

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  const positiveHash = Math.abs(hash)
  const Icon = ICONS[positiveHash % ICONS.length]
  const background = GRADIENTS[positiveHash % GRADIENTS.length]
  
  return { Icon, background }
}

function useVisibleItems() {
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth

      setVisible(w < 500 ? 1 : w < 800 ? 2 : w < 1100 ? 3 : 4)
    }

    update()
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return visible
}

export default function CategoriesCarousel({ categorias }: { categorias: CategoryData[] }) {
  const [current, setCurrent] = useState(0)
  const visible = useVisibleItems()
  const total = categorias.length
  const maxStart = Math.max(0, total - visible)

  useEffect(() => {
    setCurrent(c => Math.min(c, maxStart))
  }, [maxStart])

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxStart, c + 1))

  const dots = Math.ceil(total / visible)
  const activeDot = Math.floor(current / visible)

  if (total === 0) return null

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Explora por áreas
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Nuestras Categorías
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            Encuentra programas formativos especializados en el área de tu interés. Tenemos tanto cursos cortos como diplomados.
          </p>
        </div>

        {/* Contenedor Carrusel */}
        <div style={{ position: 'relative', padding: '0 1rem' }}>
          
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              transform: `translateX(calc(-${current * (100 / visible)}% - ${current > 0 ? (1.5 * current) / visible : 0}rem))`
            }}
          >
            {categorias.map(cat => {
              const { Icon, background } = getStylesForId(cat.id)
              
              // Removido href general, usaremos enlaces específicos para cada botón

              return (
                <div
                  key={cat.id}
                  style={{
                    minWidth: `calc(${100 / visible}% - ${(1.5 * (visible - 1)) / visible}rem)`,
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '2rem 1.5rem',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      border: '1px solid hsl(214, 20%, 92%)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      zIndex: 1,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement

                      el.style.transform = 'translateY(-8px)'
                      el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'
                      el.style.borderColor = 'transparent'
                      
                      const bgEl = el.querySelector('.bg-hover') as HTMLDivElement

                      if (bgEl) bgEl.style.opacity = '1'
                      
                      const iconEl = el.querySelector('.icon-circle') as HTMLDivElement

                      if (iconEl) iconEl.style.transform = 'scale(1.1) rotate(5deg)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement

                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'
                      el.style.borderColor = 'hsl(214, 20%, 92%)'

                      const bgEl = el.querySelector('.bg-hover') as HTMLDivElement

                      if (bgEl) bgEl.style.opacity = '0'

                      const iconEl = el.querySelector('.icon-circle') as HTMLDivElement

                      if (iconEl) iconEl.style.transform = 'scale(1) rotate(0deg)'
                    }}
                  >
                    {/* Fondo hover sutil (glass glow) */}
                    <div
                      className="bg-hover"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: background,
                        opacity: 0,
                        zIndex: -1,
                        transition: 'opacity 0.4s ease',
                      }}
                    />
                    <div
                      className="bg-hover"
                      style={{
                        position: 'absolute',
                        inset: '2px',
                        backgroundColor: '#ffffff',
                        borderRadius: '22px',
                        zIndex: -1,
                      }}
                    />

                    {/* Icono */}
                    <div
                      className="icon-circle"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        marginBottom: '1.5rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <Icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        lineHeight: 1.3,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {cat.nombre}
                    </h3>

                    {/* Botones de acción específicos */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                      {cat.cursosCount > 0 && (
                        <Link
                          href={`/cursos?categoria=${cat.slug}`}
                          style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                            backgroundColor: 'rgba(37, 146, 127, 0.08)', color: 'var(--web-primary, #25927F)',
                            padding: '0.625rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent'
                          }}
                          onMouseEnter={e => {e.currentTarget.style.backgroundColor = 'var(--web-primary, #25927F)'; e.currentTarget.style.color = '#fff'}}
                          onMouseLeave={e => {e.currentTarget.style.backgroundColor = 'rgba(37, 146, 127, 0.08)'; e.currentTarget.style.color = 'var(--web-primary, #25927F)'}}
                        >
                          Ver {cat.cursosCount} {cat.cursosCount === 1 ? 'Curso' : 'Cursos'}
                        </Link>
                      )}
                      
                      {cat.diplomadosCount > 0 && (
                        <Link
                          href={`/diplomados?categoria=${cat.slug}`}
                          style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                            backgroundColor: 'rgba(2, 94, 68, 0.08)', color: 'var(--web-dark, #025E44)',
                            padding: '0.625rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent'
                          }}
                          onMouseEnter={e => {e.currentTarget.style.backgroundColor = 'var(--web-dark, #025E44)'; e.currentTarget.style.color = '#fff'}}
                          onMouseLeave={e => {e.currentTarget.style.backgroundColor = 'rgba(2, 94, 68, 0.08)'; e.currentTarget.style.color = 'var(--web-dark, #025E44)'}}
                        >
                          Ver {cat.diplomadosCount} {cat.diplomadosCount === 1 ? 'Diplomado' : 'Diplomados'}
                        </Link>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Botones Flotantes de Navegación */}
          {total > visible && (
            <>
              <button
                onClick={prev}
                disabled={current === 0}
                style={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${current === 0 ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: current === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: current === 0 ? 0 : 1, // Desaparece si no puede ir más atrás
                  pointerEvents: current === 0 ? 'none' : 'auto'
                }}
              >
                <ChevronLeft size={20} color={'var(--web-primary, #25927F)'} />
              </button>
              <button
                onClick={next}
                disabled={current >= maxStart}
                style={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${current >= maxStart ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: current >= maxStart ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: current >= maxStart ? 0 : 1, // Desaparece si no puede ir más adelante
                  pointerEvents: current >= maxStart ? 'none' : 'auto'
                }}
              >
                <ChevronRight size={20} color={'var(--web-primary, #25927F)'} />
              </button>
            </>
          )}

        </div>

        {/* Paginación Dots */}
        {dots > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2.5rem' }}>
            {Array.from({ length: dots }).map((_, di) => (
              <button
                key={di}
                onClick={() => setCurrent(Math.min(di * visible, maxStart))}
                style={{
                  width: di === activeDot ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: di === activeDot ? 'var(--web-primary, #25927F)' : '#e2e8f0',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
