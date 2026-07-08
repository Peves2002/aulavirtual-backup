'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

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

const CARD_WIDTH = 400
const PHOTO_HEIGHT = 176

function teacherHref(t: Teacher) {
  return t.slug ? `/docentes/${t.slug}` : `/docentes/${t.id}`
}

const AVATAR_COLORS = [
  'var(--web-primary, #25927F)', 'var(--web-dark, #025E44)', '#3AB079', '#0f4438',
  '#1a73e8', '#d93025', '#e37400', '#6d4c41', '#4527a0', '#00838f',
]

export default function ProfessorsCarousel({ teachers }: { teachers: Teacher[] }) {
  if (teachers.length === 0) return null

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '4rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ ...eyebrow, display: 'block', textAlign: 'center' }}>
            Especialistas y docentes
          </p>
          <h2 style={{ ...sectionH2, textAlign: 'center', marginBottom: '0.75rem' }}>
            Nuestro equipo
          </h2>
          <p style={{ ...sectionDesc, textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            Profesionales con experiencia en formación aplicada para organizaciones e individuos.
          </p>
        </div>

        <div
          className="professors-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(3, ${CARD_WIDTH}px)`,
            gap: '1.5rem',
            justifyContent: 'center',
            maxWidth: `${CARD_WIDTH * 3 + 48}px`,
            margin: '0 auto',
          }}
        >
          {teachers.map((teacher, i) => {
            const initials = `${teacher.nombre[0]}${teacher.apellido[0]}`
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length]
            const href = teacherHref(teacher)

            return (
              <Link
                key={teacher.id}
                href={href}
                className="professor-card"
                style={{
                  width: CARD_WIDTH,
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid hsl(214,20%,91%)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement

                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow = '0 12px 32px rgba(var(--web-primary-rgb, 37, 146, 127),0.1)'
                  el.style.borderColor = 'var(--web-primary, #25927F)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement

                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  el.style.borderColor = 'hsl(214,20%,91%)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: PHOTO_HEIGHT,
                    backgroundColor: `${color}14`,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {teacher.avatar ? (
                    <Image
                      src={teacher.avatar}
                      alt={`${teacher.nombre} ${teacher.apellido}`}
                      fill
                      sizes={`${CARD_WIDTH}px`}
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
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          backgroundColor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          color: '#ffffff',
                          border: '3px solid rgba(255,255,255,0.5)',
                        }}
                      >
                        {initials}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ padding: '1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: '#0A0A0A',
                      lineHeight: 1.3,
                      margin: '0 0 0.4rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } as React.CSSProperties}
                  >
                    {teacher.nombre} {teacher.apellido}
                  </h3>

                  {teacher.cargo ? (
                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.25rem',
                        color: '#64748b',
                        lineHeight: 1.35,
                        margin: '0 0 0.75rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}
                    >
                      {teacher.cargo}
                    </p>
                  ) : null}

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--web-primary, #25927F)',
                      marginTop: 'auto',
                    }}
                  >
                    Ver perfil <ArrowRight size={20} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .professors-grid {
            grid-template-columns: repeat(2, ${CARD_WIDTH}px) !important;
            max-width: ${CARD_WIDTH * 2 + 24}px !important;
          }
        }
        @media (max-width: 479px) {
          .professors-grid {
            grid-template-columns: repeat(1, min(${CARD_WIDTH}px, 100%)) !important;
            max-width: ${CARD_WIDTH}px !important;
          }
          .professor-card {
            width: 100% !important;
            max-width: ${CARD_WIDTH}px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
