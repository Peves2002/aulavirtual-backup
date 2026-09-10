'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight, BookOpen } from 'lucide-react'

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
  if (!teachers || teachers.length === 0) return null

  return (
    <section className="bg-slate-50 py-20 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Grid de Profesores en filas de 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher, index) => {
            const initials = `${teacher.nombre[0]}${teacher.apellido[0]}`
            const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
            const href = teacherHref(teacher)

            return (
              <div
                key={teacher.id}
                className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
                style={{ border: '1px solid hsl(214, 20%, 88%)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div>
                  {/* Photo container - Aspect-video 16:9 idéntico a la tarjeta de curso */}
                  <div className="relative overflow-hidden w-full" style={{ paddingTop: '56.25%', backgroundColor: `${color}14` }}>
                    {teacher.avatar ? (
                      <Image
                        src={teacher.avatar}
                        alt={`${teacher.nombre} ${teacher.apellido}`}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white shadow-md text-lg"
                          style={{
                            backgroundColor: color,
                            border: '2px solid rgba(255,255,255,0.7)',
                            fontFamily: 'Poppins, sans-serif'
                          }}
                        >
                          {initials}
                        </div>
                      </div>
                    )}
                    {/* Badge tipo curso */}
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: 'var(--web-primary, #25927F)', fontFamily: 'Poppins, sans-serif' }}
                      >
                        Docente
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col gap-2">
                    <Link
                      href={href}
                      className="no-underline font-bold text-base text-[#0A0A0A] hover:text-[#25927F] transition-colors leading-tight"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {teacher.nombre} {teacher.apellido}
                    </Link>

                    <p
                      className="text-xs text-slate-500 leading-relaxed min-h-[36px]"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {teacher.cargo || teacher.biografia || 'Especialista en Seguridad y Salud en el Trabajo'}
                    </p>
                  </div>
                </div>

                {/* Footer bar idéntica a CourseCard */}
                <div className="p-5 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid hsl(214, 20%, 92%)' }}>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <BookOpen size={14} className="text-[#25927F]" />
                    {teacher._count?.cursos_dictados ?? 0} {teacher._count?.cursos_dictados === 1 ? 'curso' : 'cursos'}
                  </span>

                  <Link
                    href={href}
                    className="no-underline inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      backgroundColor: 'var(--web-primary, #25927F)',
                      color: '#ffffff',
                    }}
                  >
                    Ver perfil <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
