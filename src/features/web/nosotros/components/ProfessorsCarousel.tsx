'use client'

import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

import { eyebrow, sectionH2, sectionDesc } from '@/features/web/home/components/typography'

type Teacher = {
  id: string
  nombre: string
  apellido: string
  slug: string | null
  avatar: string | null
  cargo: string | null
  biografia: string | null
  _count: { cursos_dictados: number }
}

function teacherHref(t: Teacher) {
  return t.slug ? `/docentes/${t.slug}` : `/docentes/${t.id}`
}

const AVATAR_COLORS = [
  'var(--web-primary, #25927F)', 'var(--web-dark, #025E44)', '#3AB079', '#0f4438',
  '#1a73e8', '#d93025', '#e37400', '#6d4c41', '#4527a0', '#00838f',
]



export default function ProfessorsCarousel({ teachers }: { teachers: Teacher[] }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = (el: HTMLDivElement) => {
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = document.getElementById('professors-scroll-container')

    if (el) {
      const amount = el.clientWidth * 0.8

      el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }

  const total = teachers.length

  if (total === 0) return null

  // Si hay 3 o menos profesores, se centran en escritorio
  const isFew = total <= 3

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Nuestro equipo docente
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Nuestros Profesores
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            Aprende de profesionales con amplia experiencia en el sector industrial y académico.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', padding: '0 0.5rem' }}>
          {/* Cards */}
          <div
            id="professors-scroll-container"
            onScroll={(e) => checkScroll(e.currentTarget)}
            style={{
              display: 'flex',
              gap: '1.25rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              justifyContent: isFew ? 'center' : 'flex-start',
              paddingBottom: '2rem',
            }}
            className="hidden-scroll pb-4"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              #professors-scroll-container::-webkit-scrollbar { display: none; }
              @media (max-width: 768px) {
                #professors-scroll-container { justify-content: flex-start !important; }
              }
            `}} />

            {teachers.map((teacher, i) => {
              const initials = `${teacher.nombre[0]}${teacher.apellido[0]}`
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length]

              const href = teacherHref(teacher)

              return (
                <Link
                  key={teacher.id}
                  href={href}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1.5px solid hsl(214,20%,91%)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    minWidth: 'clamp(260px, 80vw, 280px)',
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement

                    el.style.transform = 'translateY(-6px)'
                    el.style.boxShadow = '0 12px 36px rgba(var(--web-primary-rgb, 37, 146, 127),0.13)'
                    el.style.borderColor = 'var(--web-primary, #25927F)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement

                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
                    el.style.borderColor = 'hsl(214,20%,91%)'
                  }}
                >
                  {/* Photo — cuadrado perfecto con padding-top hack */}
                  <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: `${color}14`, overflow: 'hidden' }}>
                    {teacher.avatar ? (
                      <Image
                        src={teacher.avatar}
                        alt={`${teacher.nombre} ${teacher.apellido}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            color: '#ffffff',
                            border: '3px solid rgba(255,255,255,0.5)',
                            boxShadow: `0 4px 20px ${color}44`,
                          }}
                        >
                          {initials}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.25rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        lineHeight: 1.35,
                        marginBottom: '0.375rem',
                      }}
                    >
                      {teacher.nombre} {teacher.apellido}
                    </h3>

                    {teacher.cargo && (
                      <p
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.8rem',
                          color: '#64748b',
                          lineHeight: 1.45,
                          marginBottom: '1rem',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } as React.CSSProperties}
                      >
                        {teacher.cargo}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        padding: '0.625rem 1rem',
                        borderRadius: '999px',
                        backgroundColor: 'transparent',
                        color: '#0A0A0A',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '1.5px solid #d1d5db',
                        transition: 'all 0.2s',
                        marginTop: 'auto',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement

                        el.style.borderColor = 'var(--web-primary, #25927F)'
                        el.style.color = 'var(--web-primary, #25927F)'
                        el.style.backgroundColor = 'rgba(var(--web-primary-rgb, 37, 146, 127),0.05)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement

                        el.style.borderColor = '#d1d5db'
                        el.style.color = '#0A0A0A'
                        el.style.backgroundColor = 'transparent'
                      }}
                    >
                      <ChevronDown size={14} />
                      Ver más
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Arrows */}
          {!isFew && (
            <>
              <button
                onClick={() => scrollByAmount('left')}
                style={{
                  position: 'absolute',
                  left: -20,
                  top: '40%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${!canScrollLeft ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: !canScrollLeft ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: !canScrollLeft ? 0 : 1,
                  pointerEvents: !canScrollLeft ? 'none' : 'auto'
                }}
              >
                <ChevronLeft size={18} color={!canScrollLeft ? '#cbd5e1' : 'var(--web-primary, #25927F)'} />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                style={{
                  position: 'absolute',
                  right: -20,
                  top: '40%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${!canScrollRight ? '#e2e8f0' : 'var(--web-primary, #25927F)'}`,
                  cursor: !canScrollRight ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  opacity: !canScrollRight ? 0 : 1,
                  pointerEvents: !canScrollRight ? 'none' : 'auto'
                }}
              >
                <ChevronRight size={18} color={!canScrollRight ? '#cbd5e1' : 'var(--web-primary, #25927F)'} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
