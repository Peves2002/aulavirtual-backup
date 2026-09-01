import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import { getTipoProgramaConfig } from '@/utils/configs/tipoPrograma'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'

// Imports nuevos para el rediseño
import HomeHeroRedesign from '@/features/web/home/components/HomeHeroRedesign'
import HomeCoursesSectionRed from '@/features/web/home/components/HomeCoursesSectionRed'
import CertificateBanner from '@/features/web/home/components/CertificateBanner'
import SpecializationAreas from '@/features/web/home/components/SpecializationAreas'
import ProgramCategories from '@/features/web/home/components/ProgramCategories'
import LatestPublications from '@/features/web/home/components/LatestPublications'
import TrustBanner from '@/features/web/home/components/TrustBanner'

export const metadata = {
  description: 'Plataforma de aprendizaje online con cursos especializados y certificados.',
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  // Si no hay descripción, no se muestra ni el título ni la descripción — el admin
  // dejó el campo vacío a propósito, no se rellena con un texto por defecto.
  if (!subtitle?.trim()) return null

  const words = title.trim().split(' ')
  const last = words.pop()
  const rest = words.join(' ')

  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <h2 className="section-title">
        {rest ? `${rest} ` : ''}
        <span style={{ color: 'var(--web-primary, #25927F)' }}>{last}</span>
      </h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  )
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

    let heroImages: string[] = []

    try {
      const parsed = configs.HOME_HERO_IMAGES ? JSON.parse(configs.HOME_HERO_IMAGES) : []

      if (Array.isArray(parsed)) heroImages = parsed.filter(Boolean)
    } catch { heroImages = [] }

    if (heroImages.length === 0 && configs.HOME_HERO_IMAGE) heroImages = [configs.HOME_HERO_IMAGE]

    let convenios: { label: string; url: string }[] = []

    try { convenios = configs.HOME_CONVENIOS_LOGOS ? JSON.parse(configs.HOME_CONVENIOS_LOGOS) : [] } catch { convenios = [] }

    let logosEmpresas: { label: string; url: string }[] = []

    try { logosEmpresas = configs.HOME_LOGOS ? JSON.parse(configs.HOME_LOGOS) : [] } catch { logosEmpresas = [] }

    let porQueElegirnos: { icono: string; titulo: string; descripcion: string }[] = []

    try { porQueElegirnos = configs.HOME_POR_QUE_ELEGIRNOS ? JSON.parse(configs.HOME_POR_QUE_ELEGIRNOS) : [] } catch { porQueElegirnos = [] }

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
      heroImages,

      // Título/descripción de estas secciones vienen únicamente de Configuracion (ver seed
      // para los valores por defecto). Si el admin borra la descripción, la sección oculta
      // tanto el título como la descripción — no hay texto de relleno hardcodeado aquí.
      cursosTitle: configs.HOME_CURSOS_TITLE || '',
      cursosSubtitle: configs.HOME_CURSOS_SUBTITLE || '',
      convenios,
      conveniosHabilitado: configs.HOME_CONVENIOS_HABILITADO !== 'false',
      conveniosTitle: configs.HOME_CONVENIOS_TITLE || '',
      conveniosDescription: configs.HOME_CONVENIOS_DESCRIPTION || '',
      logosEmpresas,
      logosEmpresasHabilitado: configs.HOME_LOGOS_HABILITADO !== 'false',
      logosEmpresasDescription: configs.HOME_LOGOS_SUBTITLE || '',
      logosEmpresasTitle: configs.HOME_LOGOS_TITLE || '',
      porQueElegirnos,
      porQueElegirnosHabilitado: configs.HOME_POR_QUE_ELEGIRNOS_HABILITADO !== 'false',
      docentesTitle: configs.HOME_DOCENTES_TITLE || '',
      docentesSubtitle: configs.HOME_DOCENTES_SUBTITLE || '',
    }
  } catch {
    return {
      courses: [], diplomados: [], especializaciones: [], teachers: [], ebooks: [],
      heroTitle: 'Aprende sin límites,\ncrece sin fronteras',
      heroDescription: 'Accede a cursos especializados, rutas de aprendizaje y certificaciones diseñadas para impulsar tu carrera profesional.',
      heroImages: [],
      cursosTitle: '',
      cursosSubtitle: '',
      convenios: [],
      conveniosHabilitado: true,
      conveniosTitle: '',
      conveniosDescription: '',
      logosEmpresas: [],
      logosEmpresasHabilitado: true,
      logosEmpresasDescription: '',
      logosEmpresasTitle: '',
      porQueElegirnos: [],
      porQueElegirnosHabilitado: true,
      docentesTitle: '',
      docentesSubtitle: '',
    }
  }
}

export default async function HomePage() {
  const { diplomados } = await getHomeData()

  // Limit to 4 for the design grid
  const destacados = diplomados.slice(0, 4)

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <HomeHeroRedesign />

      {/* 2. DIPLOMADOS DESTACADOS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Diplomados Destacados
          </h2>
          <div className="w-16 h-1 bg-[#e60000] mx-auto" />
        </div>
        
        <HomeCoursesSectionRed courses={destacados} />
      </section>

      {/* 3. CERTIFICATE BANNER */}
      <CertificateBanner />

      {/* 4. ÁREAS DE ESPECIALIZACIÓN */}
      <SpecializationAreas />

      {/* 5. PROGRAM CATEGORIES */}
      <ProgramCategories />

      {/* 6. ÚLTIMAS PUBLICACIONES */}
      <LatestPublications />

      {/* 7. TRUST BANNER */}
      <TrustBanner />
    </div>
  )
}
