import Link from 'next/link'
import Image from 'next/image'

import { TrendingUp, Briefcase, Target, ArrowRight, CheckCircle2, Users, BookOpen, Award } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import HeroCarousel from '@/features/web/ace/HeroCarousel'
import HomeCoursesSection from '@/features/web/home/components/HomeCoursesSection'
import HeroInstallButton from '@/features/web/home/components/HeroInstallButton'
import SearchCertificateSection from '@/features/web/home/components/SearchCertificateSection'
import RutasSection from '@/features/web/home/components/RutasSection'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'
import HeroVisual from '@/features/web/home/components/HeroVisual'
import ClassFeaturesSection from '@/features/web/home/components/ClassFeaturesSection'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import CompaniesSection from '@/features/web/home/components/CompaniesSection'
import EnterpriseCTASection from '@/features/web/home/components/EnterpriseCTASection'
import HomeEbooksSection from '@/features/web/home/components/HomeEbooksSection'
import HomeCTAForm from '@/features/web/home/components/HomeCTAForm'

export const metadata = {
  title: 'ACE Consulting PERÚ — Academia de Capacitación Ejecutiva',
  description: 'Cursos, eBooks y capacitación ejecutiva en emprendimiento, mundo corporativo y ventas.',
}

async function getFeaturedCourses() {
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
      coursesRaw.map(async (c) => {
        const lecciones = await prisma.leccion.count({ where: { modulo: { curso_id: c.id } } })

        return { ...c, _count: { ...c._count, lecciones } }
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
  const { courses, rutas, teachers, ebooks, heroTitle, heroDescription, logos } = await getFeaturedCourses()

  return (
    <>
      {/* ── 1. HERO CARRUSEL ── */}
      <HeroCarousel />

      {/* ── 2. NUESTRO FUNDADOR ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Liderazgo</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Nuestro fundador</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Foto */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
            <div className="relative">
              <Image
                src="/others/manuel-perfil.jpg"
                alt="Manuel Nieto Courrejolles"
                width={600}
                height={750}
                className="w-full h-auto block object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xl font-bold text-white leading-tight">Manuel Nieto Courrejolles</p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Fundador &amp; CEO — ACE Consulting PERÚ
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 py-4 px-6"
              style={{ background: 'var(--gradient-brand)' }}>
              <span className="text-2xl font-extrabold text-white">+30</span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>años de experiencia ejecutiva</span>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3 flex flex-col gap-5 text-muted-foreground text-base leading-relaxed">
            <p>
              Ejecutivo con más de treinta años de experiencia y especial habilidad en la administración
              y organización de empresas líderes en el mercado.
            </p>
            <p>
              Amplio dominio en la formación de equipos de alto rendimiento, planeamiento y supervisión
              integral de procesos. Responsable directo del manejo global de estrategias de mercado,
              campañas de servicio, calidad total de servicio brindado a los clientes, productividad
              y rentabilidad.
            </p>
            <p>
              Con estudios de Ingeniería Industrial en la <strong className="text-foreground">Universidad de Lima</strong>,
              cuenta con el Primer Programa de Especialización para Ejecutivos (PEE) en Administración de{' '}
              <strong className="text-foreground">ESAN</strong>, así como un Management Ejecutivo Gerencial en{' '}
              <strong className="text-foreground">CENTRUM Business School</strong> de la Universidad Católica del Perú.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Ingeniería Industrial', sub: 'Universidad de Lima' },
                { label: 'PEE en Administración', sub: 'ESAN' },
                { label: 'Management Ejecutivo Gerencial', sub: 'CENTRUM — PUCP' },
                { label: 'Train The Trainer (TTT)', sub: 'Sao Paulo, Brasil' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
                  <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{c.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Conocer más <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CURSOS DESTACADOS ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Formación ejecutiva</span>
            <h2 className="mt-1 text-3xl md:text-4xl font-bold">Cursos destacados</h2>
            <p className="mt-2 text-muted-foreground">Programas diseñados por especialistas con experiencia real.</p>
          </div>
          <Link
            href="/cursos"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        <HomeCoursesSection courses={courses} />
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Ver todos los cursos <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── 4. EBOOKS DESTACADOS ────────────────────── */}
      <HomeEbooksSection ebooks={ebooks} />

      {/* ── 5. CARACTERÍSTICAS DE CLASES ────────────── */}
      {/* <ClassFeaturesSection /> */}

      {/* ── 5. RUTAS DE APRENDIZAJE ─────────────────── */}
      {rutas.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Especialízate</span>
              <h2 className="mt-1 text-3xl md:text-4xl font-bold">Rutas de Aprendizaje</h2>
              <p className="mt-2 text-muted-foreground">Colecciones curadas para llevarte de principiante a experto.</p>
            </div>
          </div>
          <RutasSection rutas={rutas} />
        </section>
      )}

      {/* ── 5. NOSOTROS ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quiénes somos</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-5">
              Academia de Capacitación Ejecutiva
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ACE Consulting PERÚ nace como un emprendimiento para la Asesoría y Consultoría de Empresas.
              En pandemia se redefinió como Academia de Capacitación Ejecutiva virtual y asincrónica,
              creando más de 30 cursos y eBooks en torno a tres ejes: emprendimiento, mundo corporativo,
              y ventas y comercio.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nuestra misión: brindar capacitación de alto impacto para potenciar el talento humano
              y el desarrollo empresarial, formando líderes comprometidos con resultados.
            </p>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Conocernos más <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: '+30', sub: 'Cursos y eBooks', desc: 'Contenido especializado en 3 ejes temáticos' },
              { icon: Users, title: '+1K', sub: 'Profesionales', desc: 'Formados a través de nuestros programas' },
              { icon: Award, title: '100%', sub: 'Certificados', desc: 'Al finalizar cada programa ejecutivo' },
              { icon: Target, title: '3', sub: 'Ejes temáticos', desc: 'Emprendimiento, corporativo y ventas' },
            ].map((s) => (
              <div key={s.sub} className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--gradient-brand)' }}>
                  <s.icon className="text-white" size={20} />
                </div>
                <div className="text-2xl font-bold text-primary">{s.title}</div>
                <div className="font-semibold text-sm mt-0.5">{s.sub}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. VIDEOS YOUTUBE ── */}
      <section className="py-24" style={{ background: 'var(--gradient-brand)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Encabezado */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                Canal oficial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Aprende con nuestros videos</h2>
              <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>
                Contenido ejecutivo gratuito directo de nuestro fundador.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@manuelnietocourrejolles4757"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
              Ver más en YouTube
            </a>
          </div>

          {/* Grid: video principal + 2 secundarios */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Video principal */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/Lu3AC0rQbWM"
                title="Video principal ACE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Videos secundarios */}
            <div className="flex flex-col gap-4">
              {['xn2TjyV5jcI', 'phpbrQKAvI0'].map((id) => (
                <div key={id} className="rounded-2xl overflow-hidden shadow-xl flex-1" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`Video ${id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL ── */}
      <HomeCTAForm />
    </>
  )
}
