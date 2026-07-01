import Link from 'next/link'

import { Hero } from '@/components/site/Hero'
import { Services } from '@/components/site/Services'
import { TestimonialsCta } from '@/components/site/TestimonialsCta'
import { Recetas } from '@/components/site/Recetas'
import { SubscriptionSection } from '@/components/site/SubscriptionSection'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'

import prisma from '@/utils/libs/prisma'

export const metadata = {
  title: 'Incuba Cocina - Escuela de Cocina y Emprendimiento',
  description: 'Cursos cortos de cocina y emprendimiento gastronómico. Aprende recetas profesionales, costea y vende.',
}

export default async function HomePage() {
  let mappedCourses: any[] = [];

  try {
    const [coursesRaw, rutasRaw, teachersRaw, configs, ebooksRaw] = await Promise.all([
      // Cursos
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO' },
        include: {
          profesor: { select: { nombre: true, apellido: true, avatar: true } },
          categoria: { select: { id: true, nombre: true } },
          _count: { select: { modulos: true, inscripciones: true } },
        },
        orderBy: { creado_en: 'desc' },
        take: 6,
      }),

      // Rutas
      prisma.rutaAprendizaje.findMany({
        where: { esta_activo: true },
        include: {
          cursos: {
            take: 4,
            include: { curso: { select: { miniatura: true, titulo: true } } },
          },
        },
        take: 3,
      }),

      // Profesores
      prisma.usuario.findMany({
        where: { rol: 'PROFESOR' },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          slug: true,
          avatar: true,
          cargo: true,
          biografia: true,
          _count: { select: { cursos_dictados: true } },
        },
        orderBy: { cursos_dictados: { _count: 'desc' } },
        take: 8,
      }),
      getConfigs(),

      // Ebooks destacados
      prisma.ebook.findMany({
        where: { estado: 'PUBLICADO' },
        select: {
          id: true, titulo: true, slug: true, miniatura: true,
          autor: true, precio: true, precio_falso: true, moneda: true,
          es_gratis: true, paginas: true, genero: true,
          categoria: { select: { nombre: true } },
        },
        orderBy: { creado_en: 'desc' },
        take: 5,
      }),
    ])

    const courses = await Promise.all(
      coursesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const rutas = rutasRaw.map(r => ({
      ...r,
      total_cursos: r.cursos.length,
      cursos: r.cursos.map(c => ({ miniatura: c.curso.miniatura, titulo: c.curso.titulo })),
    }))

    const heroTitle = configs.HOME_HERO_TITLE || 'Aprende sin límites,\ncrece sin fronteras'
    const heroDescription = configs.HOME_HERO_DESCRIPTION || 'Accede a cursos especializados, rutas de aprendizaje y certificaciones diseñadas para impulsar tu carrera profesional.'
    let logos: { label: string; url: string }[] = []

    try { logos = configs.HOME_LOGOS ? JSON.parse(configs.HOME_LOGOS) : [] } catch { logos = [] }

    const ebooks = ebooksRaw.map(e => ({
      ...e,
      precio: Number(e.precio),
      precio_falso: Number(e.precio_falso),
    }))

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      rutas: JSON.parse(JSON.stringify(rutas)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      ebooks: JSON.parse(JSON.stringify(ebooks)),
      heroTitle,
      heroDescription,
      logos,
    }
  } catch {
    return {
      courses: [], rutas: [], teachers: [], ebooks: [],
      heroTitle: 'Aprende sin límites,\ncrece sin fronteras',
      heroDescription: 'Accede a cursos especializados, rutas de aprendizaje y certificaciones diseñadas para impulsar tu carrera profesional.',
      logos: [],
    }
  }
}

export default async function HomePage() {
  const { courses, rutas, teachers, ebooks, heroTitle, heroDescription, logos } = await getHomeData()

  return (
    <div className="bg-transparent">
      <Hero />

      {/* Latest Courses Section */}
      <section className="py-24 relative" style={{ backgroundColor: "#F7FBF0", backgroundImage: "radial-gradient(#d9f99d 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7FBF0]/90 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#A8E060] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-[#5A9020] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mx-auto max-w-3xl mb-16 reveal">
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-[#1A3A0A] mb-4">
              Nuestros <span className="text-[#5A9020]">Últimos Cursos</span>
            </h2>
            <p className="text-[#4A7018] text-lg">
              Aprende las mejores técnicas y recetas rentables paso a paso.
            </p>
          </div>

          <HomeCoursesSection courses={mappedCourses} />

          <div className="mt-12 text-center">
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              style={{ border: "2px solid #5A9020", color: "#5A9020" }}
            >
              VER TODOS LOS CURSOS
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 4. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 5. RUTAS DE APRENDIZAJE ─────────────────── */}
      {rutas.length > 0 && (
        <section style={{ backgroundColor: 'hsl(210, 15%, 97%)', borderTop: '1px solid hsl(214, 20%, 92%)' }}>
          <div className="section-container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div
                    className="inline-flex items-center gap-2 mb-3"
                    style={{ color: 'var(--web-primary, #25927F)', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    <Map size={14} /> Especialízate
                  </div>
                  <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Rutas de Aprendizaje</h2>
                  <p className="section-subtitle">Colecciones curadas para llevarte de principiante a experto.</p>
                </div>
                <Link
                  href="/rutas"
                  className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #25927F)' }}
                >
                  Ver todas <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <RutasSection rutas={rutas} embedded />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── 6. PROFESORES ───────────────────────────── */}
      <ProfessorsCarousel teachers={teachers} />

      {/* ── 7. EMPRESAS (B2B informativo) ───────────── */}
      <CompaniesSection />

      {/* ── 8. CTA AGENDAR REUNIÓN ──────────────────── */}
      <EnterpriseCTASection />

      {/* ── 9. VERIFICAR CERTIFICADO ────────────────── */}
      <SearchCertificateSection />

      {/* ── 10. CTA INSCRIPCIÓN ─────────────────────── */}
      <section className="bg-white py-16 text-center" style={{ borderTop: '1px solid hsl(214, 20%, 88%)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127),0.08)', color: 'var(--web-dark, #025E44)' }}
            >
              <CheckCircle size={16} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600 }}>
                Únete a miles de estudiantes
              </span>
            </div>
            <h2
              className="mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em' }}
            >
              ¿Listo para transformar tu carrera?
            </h2>
            <p
              className="mb-8 max-w-xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'hsl(215, 16%, 47%)', lineHeight: 1.7 }}
            >
              Inscríbete hoy y comienza a aprender con los mejores profesionales del sector.
            </p>
            <Link
              href="/cursos"
              className="no-underline inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', boxShadow: '0 6px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.35)' }}
            >
              Inscribirse ahora <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Services />

      <SubscriptionSection />

      <TestimonialsCta />
      <Recetas />
    </div>
  )
}
