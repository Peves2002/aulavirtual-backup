'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

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
  '#08479b', '#1B3A6B', '#1268db', '#fcd116',
  '#3BA8C5', '#1a73e8', '#d93025', '#e37400', '#6d4c41', '#4527a0',
]

function useVisible() {
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setVisible(w < 640 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return visible
}

export default function ProfessorsCarousel({ teachers }: { teachers: Teacher[] }) {
  const [current, setCurrent] = useState(0)
  const visible = useVisible()
  const total = teachers.length
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
    <section className="bg-slate-50 py-24 px-6 lg:px-10 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[#08479b] font-bold text-sm tracking-widest uppercase mb-4">Nuestro equipo docente</h2>
            <h3 className="text-slate-900 font-black text-3xl md:text-5xl mb-6">Nuestros Profesores</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Aprende de profesionales con amplia experiencia en el sector industrial y académico, dispuestos a guiarte en tu camino al éxito.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative px-0 md:px-12">
          {/* Cards */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${Math.min(visible, total)}, 1fr)` }}
          >
            {teachers.slice(current, current + visible).map((teacher, i) => {
              const initials = `${teacher.nombre[0]}${teacher.apellido[0]}`
              const color = AVATAR_COLORS[(current + i) % AVATAR_COLORS.length]
              const href = teacherHref(teacher)

              return (
                <Link
                  key={teacher.id}
                  href={href}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(8,71,155,0.08)] hover:border-[#08479b]/20"
                >
                  {/* Photo Area */}
                  <div className="relative w-full pt-[100%] bg-slate-100 overflow-hidden">
                    {teacher.avatar ? (
                      <Image
                        src={teacher.avatar}
                        alt={`${teacher.nombre} ${teacher.apellido}`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg"
                          style={{ backgroundColor: color, border: '4px solid rgba(255,255,255,0.5)' }}
                        >
                          {initials}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#08479b] transition-colors line-clamp-1">
                      {teacher.nombre} {teacher.apellido}
                    </h3>

                    {teacher.cargo && (
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 flex-1 line-clamp-2">
                        {teacher.cargo}
                      </p>
                    )}
                    
                    <div className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm transition-colors group-hover:border-[#08479b]/20 group-hover:bg-[#08479b]/5 group-hover:text-[#08479b]">
                      <ChevronDown className="w-4 h-4" />
                      Ver perfil completo
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Arrows */}
          {total > visible && (
            <>
              <button
                onClick={prev}
                disabled={current === 0}
                className="absolute left-0 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all hover:bg-slate-50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 hidden md:flex"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button
                onClick={next}
                disabled={current >= maxStart}
                className="absolute right-0 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all hover:bg-slate-50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 hidden md:flex"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {dots > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: dots }).map((_, di) => (
              <button
                key={di}
                onClick={() => setCurrent(di * visible)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  di === activeDot ? 'w-8 bg-[#08479b]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
