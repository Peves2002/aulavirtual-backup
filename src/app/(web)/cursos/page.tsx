import { Sparkles } from 'lucide-react'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import CourseCatalog from '@/features/web/home/components/CourseCatalog'

export const metadata = {
  title: 'Cursos y Diplomados — Aula Virtual',
  description: 'Diplomados y especializaciones online en educación, derecho, ingeniería y salud.',
}

async function getData(token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })
    const data = await axiosWebCursos.getCatalog()

    if (data.courses) {
      data.courses = data.courses.map((c: any) => ({
        ...c,
        precio: c.precio ? Number(c.precio) : 0,
        precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null,
      }))
    }

    return data
  } catch {
    return { courses: [], categories: [] }
  }
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = (session?.user as any)?.accessToken ?? null
  const { courses, categories } = await getData(token)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-edu-pattern py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              Programas académicos
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Aprende lo que te
              <br />
              <span className="text-brand-orange">pone</span> donde quieres estar.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80">
              Diplomados, especializaciones y programas de actualización online,
              diseñados para profesionales que no se conforman.
            </p>
          </div>
        </div>
      </section>

      {/* COLOR STRIPE */}
      <div className="grid h-3 grid-cols-4">
        <div className="bg-brand-teal" />
        <div className="bg-brand-navy" />
        <div className="bg-brand-lime" />
        <div className="bg-brand-orange" />
      </div>

      {/* CATÁLOGO CON FILTROS */}
      <CourseCatalog courses={courses} categories={categories} />
    </>
  )
}
