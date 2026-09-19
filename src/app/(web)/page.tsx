import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import HomeVideoHero from '@/features/web/home/components/HomeVideoHero'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'

import HomeEbooksSection from '@/features/web/home/components/HomeEbooksSection'


export const metadata = {
  title: 'Aula Virtual - MS&M CONSULTING',
  description: 'Plataforma de consultoría especializada en SST, Salud Ocupacional, ITSE, Capacitaciones y Sistemas Integrados de Gestión.',
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


      {/* ── 2. HERO PRINCIPAL ─────────────────────────── */}
      {/* ── 2. HERO PRINCIPAL ─────────────────────────── */}
      <HomeVideoHero />

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
              Ver todos los programas <ArrowRight size={16} />
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

      {/* ── 3c. CONVENIOS, RESPALDOS Y RECONOCIMIENTOS ────────── */}
      <section className="section-container" style={{ borderTop: '1px solid hsl(214, 20%, 92%)' }}>
        <ScrollReveal>
          <div className="flex justify-center mb-10 text-center">
            <h2 className="section-title">Convenios, respaldos y reconocimientos</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 max-w-5xl mx-auto px-4 opacity-90 pb-10">
            
            <div className="relative group cursor-pointer">
              <img src="/images/convenios/convenios/camara-de-comercio.jpg" alt="Cámara de Comercio de Lima" className="max-h-24 md:max-h-28 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-medium">
                convenios - cámara de comercio
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <img src="/images/convenios/respaldos/cipm.jpg" alt="CIPM" className="max-h-24 md:max-h-28 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-medium">
                respaldos - cipm
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <img src="/images/convenios/respaldos/laboratorio-labihsi.jpg" alt="LABIHSI" className="max-h-24 md:max-h-28 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-medium">
                respaldos - laboratorio labihsi
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <img src="/images/convenios/reconocimientos/proinnovate.png" alt="Proinnovate" className="max-h-20 md:max-h-24 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-medium">
                reconocimientos - proinnovate
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <img src="/images/convenios/reconocimientos/produce.png" alt="Produce" className="max-h-20 md:max-h-24 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-medium">
                reconocimientos - produce
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ── 4. EBOOKS DESTACADOS ────────────────────── */}
      {isFeatureEnabled('ebooks') && <HomeEbooksSection ebooks={ebooks} />}

      {/* ── 5. CARACTERÍSTICAS DE CLASES ────────────── */}
      <ClassFeaturesSection />

      {/* ── 6. PROFESORES ───────────────────────────── */}
      <ProfessorsCarousel teachers={teachers} />

      {/* ── 7. EMPRESAS (B2B informativo) ───────────── */}
      {/* <CompaniesSection /> */}


    </>
  )
}
