import Link from 'next/link'

import { ArrowRight, CheckCircle, CheckCircle2 } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import GridexaHero from '@/features/web/home/components/GridexaHero'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import HomeEbooksSection from '@/features/web/home/components/HomeEbooksSection'
import { SERVICIOS } from '@/utils/data/servicios'

export const metadata = {
  title: 'Aula Virtual - Aprende sin límites',
  description: 'Accede a cursos especializados, certificaciones y desarrollo profesional continuo con los mejores expertos.',
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
  const { courses, diplomados, especializaciones, teachers, ebooks, logos } = await getHomeData()
  const cursosConfig = getTipoProgramaConfig('CURSO')
  const diplomadosConfig = getTipoProgramaConfig('DIPLOMADO')
  const especializacionesConfig = getTipoProgramaConfig('ESPECIALIZACION')

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────── */}
      <GridexaHero />
      
      {/* ── SERVICIOS HIGHLIGHT ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#02115C] font-poppins">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Soluciones de ingeniería y gestión energética para impulsar la eficiencia y confiabilidad de sus operaciones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICIOS.slice(0, 6).map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div 
                className="w-full h-48 bg-gray-200"
                style={{
                  backgroundImage: `url(${srv.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-[#BDD962] mt-1 flex-shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#02115C] font-poppins leading-tight">
                    {srv.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-inter flex-1">
                  {srv.desc}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/51936032964?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio: ${srv.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white text-center py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <i className="tabler-brand-whatsapp text-lg" />
                    Cotizar
                  </a>
                  <Link
                    href={`/servicios/${srv.id}`}
                    className="flex-1 bg-[#02115C] hover:bg-[#031d99] text-white text-center py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-[#02115C] hover:bg-[#0A50A1] transition-colors shadow-md"
          >
            Ver Todos los Servicios <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── 2. LOGO MARQUEE ─────────────────────────── */}
      <ClientLogosMarquee logos={logos} />

      {/* ── 3. CURSOS DESTACADOS ────────────────────── */}
      <section className="section-container">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">{cursosConfig.homeTitle}</h2>
              <p className="section-subtitle">{cursosConfig.homeSubtitle}</p>
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
                <h2 className="section-title">{diplomadosConfig.homeTitle}</h2>
                <p className="section-subtitle">{diplomadosConfig.homeSubtitle}</p>
              </div>
              <Link
                href={diplomadosConfig.webPath}
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
              catalogHref={diplomadosConfig.webPath}
              emptyMessage={diplomadosConfig.emptyMessage}
              viewLabel="Ver diplomado"
            />
          </ScrollReveal>
        </section>
      )}

      {/* ── 3c. ESPECIALIZACIONES DESTACADAS ────────── */}
      {especializaciones.length > 0 && (
        <section className="section-container" style={{ borderTop: '1px solid hsl(214, 20%, 92%)' }}>
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-title">{especializacionesConfig.homeTitle}</h2>
                <p className="section-subtitle">{especializacionesConfig.homeSubtitle}</p>
              </div>
              <Link
                href={especializacionesConfig.webPath}
                className="no-underline hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--web-primary, #25927F)' }}
              >
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <HomeCoursesSection
              courses={especializaciones}
              catalogHref={especializacionesConfig.webPath}
              emptyMessage={especializacionesConfig.emptyMessage}
              viewLabel="Ver especialización"
            />
          </ScrollReveal>
        </section>
      )}

      {/* ── 4. EBOOKS DESTACADOS ────────────────────── */}
      {isFeatureEnabled('ebooks') && <HomeEbooksSection ebooks={ebooks} />}

      {/* ── 5. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 6. PROFESORES ───────────────────────────── */}
      <ProfessorsCarousel teachers={teachers} />

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
