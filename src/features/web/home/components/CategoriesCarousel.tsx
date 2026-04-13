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
  const scrollRef = import('react').then(React => React.useRef<HTMLDivElement>(null))
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Ocultamos las flechas si hay muy pocos y caben todos, o si estamos en los bordes
  const checkScroll = (el: HTMLDivElement) => {
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = document.getElementById('categories-scroll-container')
    if (el) {
      const amount = el.clientWidth * 0.8
      el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }

  if (categorias.length === 0) return null

  // Si son pocos, los centramos en escritorio
  const isFew = categorias.length <= 3

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        
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

        {/* Contenedor Carrusel Nativo */}
        <div style={{ position: 'relative', padding: '0 0.5rem' }}>
          
          <div
            id="categories-scroll-container"
            onScroll={(e) => checkScroll(e.currentTarget)}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none', // Oculta barra en Firefox
              msOverflowStyle: 'none', // Oculta barra en IE/Edge
              justifyContent: isFew ? 'center' : 'flex-start',
              paddingBottom: '2rem', // espacio para sombras
            }}
            className="hidden-scroll pb-4" // Asumiendo que usamos alguna clase o el style de arriba
          >
            <style dangerouslySetInnerHTML={{__html: `
              #categories-scroll-container::-webkit-scrollbar { display: none; }
              @media (max-width: 768px) {
                #categories-scroll-container { justify-content: flex-start !important; }
              }
            `}} />

            {categorias.map(cat => {
              const { Icon, background } = getStylesForId(cat.id)

              return (
                <div
                  key={cat.id}
                  style={{
                    minWidth: 'clamp(280px, 80vw, 320px)',
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    display: 'flex',
                    flexDirection: 'column'
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

          {/* Botones Flotantes de Navegación (Solo PC) */}
          {!isFew && (
            <>
              <button
                onClick={() => scrollByAmount('left')}
                style={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${!canScrollLeft ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: !canScrollLeft ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: !canScrollLeft ? 0 : 1,
                  pointerEvents: !canScrollLeft ? 'none' : 'auto'
                }}
              >
                <ChevronLeft size={20} color={'var(--web-primary, #25927F)'} />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                style={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${!canScrollRight ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: !canScrollRight ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: !canScrollRight ? 0 : 1, // Desaparece si no puede ir más adelante
                  pointerEvents: !canScrollRight ? 'none' : 'auto'
                }}
              >
                <ChevronRight size={20} color={'var(--web-primary, #25927F)'} />
              </button>
            </>
          )}

        </div>
      </div>
    </section>
  )
}
