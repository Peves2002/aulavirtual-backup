import Link from 'next/link'

import { ArrowRight, CheckCircle, Map } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import RutasSection from '@/features/web/home/components/RutasSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

import HeroCarousel from '@/features/web/home/components/HeroCarousel'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import CompaniesSection from '@/features/web/home/components/CompaniesSection'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import CategoriesCarousel from '@/features/web/home/components/CategoriesCarousel'

export const metadata = {
  title: 'Aula Virtual - Aprende sin límites',
  description: 'Plataforma de aprendizaje online con cursos especializados, rutas de aprendizaje y certificados.',
}

async function getHomeData() {
  try {
    const [coursesRaw, rutasRaw, teachersRaw, categoriasRaw, configs] = await Promise.all([
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

      // Categorías
      prisma.categoria.findMany({
        where: { esta_activo: true },
        include: {
          cursos: {
            where: { estado: 'PUBLICADO' },
            select: { tipo: true },
          },
        },
        orderBy: { orden: 'asc' },
      }),

      // Configs
      getConfigs(),
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

    const categorias = categoriasRaw.map(c => {
      const cursosCount = c.cursos.filter(cc => cc.tipo === 'CURSO').length
      const diplomadosCount = c.cursos.filter(cc => cc.tipo === 'DIPLOMADO').length

      return {
        id: c.id,
        nombre: c.nombre,
        slug: c.slug,
        cursosCount,
        diplomadosCount,
        total: c.cursos.length
      }
    })

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      rutas: JSON.parse(JSON.stringify(rutas)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      categorias: JSON.parse(JSON.stringify(categorias)),
      heroTitle: configs['hero_title'] ?? 'Aprende sin límites\ncon los mejores',
      heroDescription: configs['hero_description'] ?? 'Accede a cursos especializados, rutas de aprendizaje y certificados reconocidos. Aprende a tu ritmo con profesionales del sector.',
    }
  } catch {
    return {
      courses: [], rutas: [], teachers: [], categorias: [],
      heroTitle: 'Aprende sin límites\ncon los mejores',
      heroDescription: 'Accede a cursos especializados, rutas de aprendizaje y certificados reconocidos. Aprende a tu ritmo con profesionales del sector.',
    }
  }
}

export default async function HomePage() {
  const { courses, rutas, teachers, categorias, heroTitle, heroDescription } = await getHomeData()

  return (
    <>
      {/* ── 1. HERO CAROUSEL ────────────────────────── */}
      <HeroCarousel />

      {/* ── 1.5 CATEGORÍAS ──────────────────────────── */}
      {categorias.length > 0 && <CategoriesCarousel categorias={categorias} />}

      {/* ── 2. LOGO MARQUEE ─────────────────────────── */}
      {/* <ClientLogosMarquee /> */}

      {/* ── 3. CURSOS DESTACADOS ────────────────────── */}
      <section className="section-container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Cursos destacados</h2>
              <p className="section-subtitle">Descubre nuestros cursos más recientes</p>
            </div>
            <Link
              href="/cursos"
              className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #25927F)' }}
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <HomeCoursesSection courses={courses} />
          <div className="flex justify-center mt-8 sm:hidden">
            <Link
              href="/cursos"
              className="no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff' }}
            >
              Ver todos los cursos <ArrowRight size={16} />
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
    </>
  )
}
