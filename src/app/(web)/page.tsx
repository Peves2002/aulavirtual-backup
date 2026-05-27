import Link from 'next/link'

import { ArrowRight, CheckCircle } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import HeroCarousel from '@/features/web/home/components/HeroCarousel'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'

export const metadata = {
  title: 'Master Academy - Formación Profesional para el Sector Público',
  description: 'Master Academy: fortalece tus competencias y capacidades para aprobar pruebas de aptitud académica y acceder a nuevos puestos de trabajo en el sector público.',
}

async function getHomeData() {
  try {
    const [coursesRaw, teachersRaw, configs] = await Promise.all([
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
    ])

    const courses = await Promise.all(
      coursesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const heroTitle = configs.HOME_HERO_TITLE || 'Formación de élite\npara el servicio público'
    const heroDescription = configs.HOME_HERO_DESCRIPTION || 'Fortalece tus competencias y capacidades para aprobar pruebas de aptitud académica y acceder a nuevos puestos de trabajo. Recupera los conocimientos que necesitas para avanzar en el camino del éxito laboral.'
    let logos: { label: string; url: string }[] = []

    try { logos = configs.HOME_LOGOS ? JSON.parse(configs.HOME_LOGOS) : [] } catch { logos = [] }

    return {
      courses: JSON.parse(JSON.stringify(courses)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      heroTitle,
      heroDescription,
      logos,
    }
  } catch {
    return {
      courses: [], teachers: [],
      heroTitle: 'Formación de élite\npara el servicio público',
      heroDescription: 'Fortalece tus competencias y capacidades para aprobar pruebas de aptitud académica y acceder a nuevos puestos de trabajo. Recupera los conocimientos que necesitas para avanzar en el camino del éxito laboral.',
      logos: [],
    }
  }
}

export default async function HomePage() {
  const { courses, teachers, heroTitle, heroDescription, logos } = await getHomeData()

  return (
    <>
      {/* ── 1. HERO CAROUSEL ─────────────────────────── */}
      <HeroCarousel heroTitle={heroTitle} heroDescription={heroDescription} />

      {/* ── 2. LOGO MARQUEE ─────────────────────────── */}
      <ClientLogosMarquee logos={logos} />

      {/* ── 3. CURSOS DESTACADOS ────────────────────── */}
      <section className="section-container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Cursos destacados</h2>
              <p className="section-subtitle">Control gubernamental, contratación estatal y concursos públicos</p>
            </div>
            <Link
              href="/cursos"
              className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--web-primary, #D4AF37)' }}
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
              style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'var(--web-primary, #D4AF37)', color: '#ffffff' }}
            >
              Ver todos los cursos <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 4. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 5. ESPECIALISTAS ────────────────────────── */}
      <ProfessorsCarousel teachers={teachers} />

      {/* ── 9. VERIFICAR CERTIFICADO ────────────────── */}
      <SearchCertificateSection />

      {/* ── 10. CTA INSCRIPCIÓN ─────────────────────── */}
      <section 
        className="py-24 text-center" 
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.60) 100%), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--web-light, #F0D060)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <CheckCircle size={16} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', fontWeight: 600 }}>
                Aprende con los mejores especialistas del Estado
              </span>
            </div>
            <h2
              className="mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              ¿Listo para destacar en el sector público?
            </h2>
            <p
              className="mb-8 max-w-xl mx-auto"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}
            >
              Inscríbete hoy y prepárate para concursos públicos, entrevistas técnicas y el ejercicio eficiente del control gubernamental con nuestros especialistas en actividad.
            </p>
            <Link
              href="/cursos"
              className="no-underline inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: 'var(--web-primary, #D4AF37)', boxShadow: '0 6px 20px rgba(var(--web-primary-rgb, 212, 175, 55),0.35)' }}
            >
              Inscribirse ahora <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
