import Link from 'next/link'

import { ArrowRight, CheckCircle } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

import HeroCarousel from '@/features/web/home/components/HeroCarousel'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import CategoriesCarousel from '@/features/web/home/components/CategoriesCarousel'

export const metadata = {
  title: 'Aula Virtual - Aprende sin límites',
  description: 'Plataforma de aprendizaje online con cursos especializados y certificados.',
}

const courseInclude = {
  profesor: { select: { nombre: true, apellido: true, avatar: true } },
  categoria: { select: { id: true, nombre: true } },
  _count: { select: { modulos: true, inscripciones: true } },
}

async function getHomeData() {
  try {
    const [coursesRaw, diplomadosRaw, teachersRaw, categoriasRaw] = await Promise.all([
      // Cursos
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'CURSO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6,
      }),

      // Diplomados
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'DIPLOMADO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6,
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
    ])

    const addLecciones = async (raw: typeof coursesRaw) =>
      Promise.all(
        raw.map(async course => {
          const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

          return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
        })
      )

    const [courses, diplomados] = await Promise.all([
      addLecciones(coursesRaw),
      addLecciones(diplomadosRaw),
    ])

    const categorias = categoriasRaw.map(c => ({
      id: c.id,
      nombre: c.nombre,
      slug: c.slug,
      icono: c.icono,
      cursosCount: c.cursos.filter(cc => cc.tipo === 'CURSO').length,
      diplomadosCount: c.cursos.filter(cc => cc.tipo === 'DIPLOMADO').length,
      total: c.cursos.length,
    }))

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      diplomados: JSON.parse(JSON.stringify(diplomados)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      categorias: JSON.parse(JSON.stringify(categorias)),
    }
  } catch {
    return {
      courses: [],
      diplomados: [],
      teachers: [],
      categorias: [],
    }
  }
}

export default async function HomePage() {
  const { courses, diplomados, teachers, categorias } = await getHomeData()

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
              <h2 className="section-title">Cursos Destacados</h2>
              <p className="section-subtitle">Aprende con los mejores profesionales</p>
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
          <HomeCoursesSection
            courses={courses}
            catalogHref="/cursos"
            emptyMessage="Pronto habrá cursos disponibles."
            viewLabel="Ver curso"
          />
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

      {/* ── 3b. DIPLOMADOS DESTACADOS ───────────────── */}
      {diplomados.length > 0 && (
        <section className="section-container" style={{ borderTop: '1px solid hsl(214, 20%, 92%)' }}>
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-title">Diplomados</h2>
                <p className="section-subtitle">Formación especializada con certificación</p>
              </div>
              <Link
                href="/diplomados"
                className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #25927F)' }}
              >
                Ver todos <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <HomeCoursesSection
              courses={diplomados}
              catalogHref="/diplomados"
              emptyMessage="Pronto habrá diplomados disponibles."
              viewLabel="Ver diplomado"
            />
          </ScrollReveal>
        </section>
      )}

      {/* ── 4. EBOOKS DESTACADOS ────────────────────── */}
      {/* {isFeatureEnabled('ebooks') && <HomeEbooksSection ebooks={ebooks} />} */}

      {/* ── 5. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 6. PROFESORES ───────────────────────────── */}
      <ProfessorsCarousel teachers={teachers} />

      {/* ── 7. EMPRESAS (B2B informativo) ───────────── */}
      {/* <CompaniesSection /> */}

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
