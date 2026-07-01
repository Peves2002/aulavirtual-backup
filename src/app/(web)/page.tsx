import Link from 'next/link'

import { ArrowRight, MessageCircle, BookOpen } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import HeroVisual from '@/features/web/home/components/HeroVisual'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ResultsSection from '@/features/web/home/components/ResultsSection'
import TargetAudienceSection from '@/features/web/home/components/TargetAudienceSection'
import WorkModelsSection from '@/features/web/home/components/WorkModelsSection'
import ServicesSection from '@/features/web/home/components/ServicesSection'
import WhyUsSection from '@/features/web/home/components/WhyUsSection'
import NewsletterSection from '@/features/web/home/components/NewsletterSection'
import FinalCTASection from '@/features/web/home/components/FinalCTASection'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import { getConfigs } from '@/utils/libs/config'

export const metadata = {
  title: 'CEPAV - Capacitación Especializada para el Sector Turismo',
  description: 'Potenciamos tu equipo de turismo con capacitación especializada, herramientas de ventas y atención al cliente.',
}

async function getHomeData() {
  try {
    const courseInclude = {
      profesor: { select: { nombre: true, apellido: true, avatar: true } },
      categoria: { select: { id: true, nombre: true } },
      _count: { select: { modulos: true, inscripciones: true } }
    }

    const [coursesRaw, diplomadosRaw, especializacionesRaw, teachersRaw, configs, ebooksRaw] = await Promise.all([
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'CURSO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
      }),
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'DIPLOMADO' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
      }),
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO', tipo: 'ESPECIALIZACION' },
        include: courseInclude,
        orderBy: { creado_en: 'desc' },
        take: 6
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
      isFeatureEnabled('ebooks')
        ? prisma.ebook.findMany({
          where: { estado: 'PUBLICADO' },
          select: {
            id: true, titulo: true, slug: true, miniatura: true,
            autor: true, precio: true, precio_falso: true, moneda: true,
            es_gratis: true, paginas: true, genero: true,
            categoria: { select: { nombre: true } },
          },
          orderBy: { creado_en: 'desc' },
          take: 5,
        })
        : Promise.resolve([]),
    ])

    const courses = await Promise.all(
      coursesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const diplomados = await Promise.all(
      diplomadosRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

    const especializaciones = await Promise.all(
      especializacionesRaw.map(async course => {
        const leccionesCount = await prisma.leccion.count({ where: { modulo: { curso_id: course.id } } })

        return { ...course, _count: { ...course._count, lecciones: leccionesCount } }
      })
    )

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
      diplomados: JSON.parse(JSON.stringify(diplomados)),
      especializaciones: JSON.parse(JSON.stringify(especializaciones)),
      teachers: JSON.parse(JSON.stringify(teachersRaw)),
      ebooks: JSON.parse(JSON.stringify(ebooks)),
      heroTitle,
      heroDescription,
      logos,
    }
  } catch {
    return {
      courses: [], diplomados: [], especializaciones: [], teachers: [], ebooks: [],
      heroTitle: 'Aprende sin límites,\ncrece sin fronteras',
      heroDescription: 'Accede a cursos especializados, rutas de aprendizaje y certificaciones diseñadas para impulsar tu carrera profesional.',
      logos: [],
    }
  }
}

export default async function HomePage() {
  const { courses, diplomados, especializaciones, teachers, ebooks, heroTitle, heroDescription, logos } = await getHomeData()
  const cursosConfig = getTipoProgramaConfig('CURSO')
  const diplomadosConfig = getTipoProgramaConfig('DIPLOMADO')
  const especializacionesConfig = getTipoProgramaConfig('ESPECIALIZACION')

  return (
    <div className="is-home">
      {/* ── 1. HERO ─────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Patrón de grid decorativo */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow derecho */}
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

            {/* ── Izquierda: texto ── */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.15)', border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.3)' }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--web-light, #BDD962)' }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
                  Capacitación Corporativa
                </span>
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                }}
              >
                Potencia tu equipo,<br />
                <span style={{ color: 'var(--web-light, #BDD962)' }}>escala tus ventas</span>
              </h1>

              {/* Descripción */}
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.75,
                  maxWidth: '480px',
                  marginBottom: '2.5rem',
                }}
              >
                {heroDescription}
              </p>

              {/* Botones */}
              <div className="flex flex-wrap gap-4" style={{ marginBottom: '2.5rem' }}>
                <a
                  href="/cursos"
                  className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', boxShadow: '0 4px 20px rgba(var(--web-primary-rgb, 37, 146, 127),0.45)' }}
                >
                  Ver cursos <ArrowRight size={18} />
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 no-underline rounded-xl font-semibold transition-all duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '0.9375rem', padding: '0.875rem 1.75rem', border: '1.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
                >
                  <MessageCircle size={18} /> Contactar ahora
                </a>
              </div>

              {/* Mini stats */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { value: '+50', label: 'Empresas' },
                  { value: '+1,500', label: 'Colaboradores' },
                  { value: '100%', label: 'Resultados' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.375rem', fontWeight: 800, color: 'var(--web-light, #BDD962)', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Derecha: visual interactivo ── */}
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── 2. LOGO MARQUEE ─────────────────────────── */}
      <ClientLogosMarquee logos={logos} />

      {/* ── 5. RESULTADOS ───────────────────────── */}
      <ResultsSection />

      {/* ── 6. PÚBLICO OBJETIVO ─────────────────── */}
      <TargetAudienceSection />

      {/* ── 7. MODELOS DE TRABAJO ───────────────── */}
      <WorkModelsSection />

      {/* ── 8. SERVICIOS ────────────────────────── */}
      <div id="servicios">
        <ServicesSection />
      </div>

      {/* ── 8.5 CURSOS DESTACADOS (Programas de Capacitación) ── */}
      <section className="section-container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div
                className="inline-flex items-center gap-2 mb-3"
                style={{ color: 'var(--web-primary, #25927F)', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                <BookOpen size={14} /> Formación especializada
              </div>
              <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Nuestros Programas</h2>
              <p className="section-subtitle">Capacitaciones diseñadas para los desafíos actuales del sector.</p>
            </div>
            <Link
              href="/cursos"
              className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
              style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #25927F)' }}
            >
              Ver catálogo completo <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <HomeCoursesSection
            courses={courses}
            catalogHref={cursosConfig.webPath}
            emptyMessage={cursosConfig.emptyMessage}
            viewLabel="Ver curso"
          />
          <div className="flex justify-center mt-8 sm:hidden">
            <Link
              href="/cursos"
              className="no-underline inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #25927F)', color: '#ffffff' }}
            >
              Ver todos los programas <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 9. POR QUÉ NOSOTROS ─────────────────── */}
      <WhyUsSection />

      {/* ── 10. NEWSLETTER ──────────────────────── */}
      {/* <NewsletterSection /> */}

      {/* ── 11. CTA FINAL ───────────────────────── */}
      <FinalCTASection />
    </div>
  )
}
