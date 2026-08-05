import fs from 'fs'
import path from 'path'

import Link from 'next/link'

import type { Metadata } from 'next'
import { ArrowRight, ChevronRight, BookOpen, Building2 } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import AdphHeroCarousel from '@/features/web/adph/components/AdphHeroCarousel'
import AdphEscuelasCarousel from '@/features/web/adph/components/AdphEscuelasCarousel'
import TestimoniosCarousel from '@/features/web/adph/components/TestimoniosCarousel'
import FadeIn from '@/utils/components/animations/FadeIn'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'
import AdphNewsletter from '@/features/web/adph/components/AdphNewsletter'
import ClientLogosMarquee from '@/features/web/home/components/ClientLogosMarquee'



export const dynamic = 'force-dynamic'

// ── SEO: Metadata dinámica desde el panel admin ──────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const configs = await getConfigs()
  const siteName   = configs.TEMPLATE_NAME?.trim()   || 'ADPH Group'
  const slogan     = configs.TEMPLATE_SLOGAN?.trim()  || 'Formación Profesional de Alto Impacto'
  const seoTitle   = configs.SEO_HOME_TITLE?.trim()   || `${siteName} | ${slogan}`
  const seoDesc    = configs.SEO_HOME_DESC?.trim()    || slogan
  const seoKeywords = configs.SEO_KEYWORDS?.trim()    || ''
  const ogImage    = configs.SEO_OG_IMAGE?.trim()     || ''
  const siteUrl    = configs.SEO_SITE_URL?.trim()     || ''
  const googleVerification = configs.SEO_GOOGLE_VERIFICATION?.trim() || ''

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords || undefined,
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: 'website',
      locale: 'es_PE',
      siteName,
      url: siteUrl || undefined,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: siteUrl ? { canonical: siteUrl } : undefined,
  }
}


const TESTIMONIOS = [
  { id: 1, name: 'María Fernández', role: 'Gerente de RRHH en TechLatam', quote: 'Los programas de ADPH me dieron las herramientas prácticas que necesitaba para reestructurar todo nuestro departamento. Excelente nivel.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80' },
  { id: 2, name: 'Carlos Ramírez', role: 'Director de Operaciones', quote: 'La metodología de casos de la Escuela de Liderazgo superó mis expectativas. Pude aplicar lo aprendido desde la primera semana.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80' },
  { id: 3, name: 'Lucía Vargas', role: 'Analista de Cultura Org.', quote: 'Destaco la calidad de los docentes. Profesionales con trayectoria real que comparten su experiencia y te guían paso a paso.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80' },
]

const BLOGS = [
  { id: 1, title: 'El futuro del liderazgo en la era digital y remota', date: '15 Oct, 2023', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80' },
  { id: 2, title: 'Salud Mental y Prevención en el Entorno Laboral', date: '02 Nov, 2023', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80' },
  { id: 3, title: 'Gamificación: El secreto del aprendizaje corporativo', date: '20 Nov, 2023', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80' },
]

const NOTICIAS = [
  { id: 1, tag: 'TENDENCIAS', title: 'ADPH Group presenta el estudio de Clima Laboral 2026', date: 'Julio 05, 2026', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80' },
  { id: 2, tag: 'INNOVACIÓN', title: 'Nuevas metodologías experienciales en alianza internacional', date: 'Junio 28, 2026', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80' }
]

function parseSpanishDate(dateStr: string): Date {
  if (!dateStr) return new Date(0)
  
  const clean = dateStr.toLowerCase().replace(/ de /g, ' ').replace(/,/g, '').trim()
  const parts = clean.split(/\s+/)
  
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10)
    const monthStr = parts[1]
    const year = parseInt(parts[2], 10)
    
    const months: Record<string, number> = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    }
    
    const month = months[monthStr]

    if (month !== undefined && !isNaN(day) && !isNaN(year)) {
      return new Date(year, month, day)
    }
  }
  
  const parsed = new Date(dateStr)

  return isNaN(parsed.getTime()) ? new Date(0) : parsed
}

export default async function HomePage() {
  // Query configurations to apply dynamic school images
  const configs = await getConfigs()

  const dynamicEscuelas = ESCUELAS.map(esc => {
    const configKeyPrefix = `ESCUELA_${esc.id.toUpperCase().replace(/-/g, '_')}`
    const dbImage = configs[`${configKeyPrefix}_IMAGE`]
    const dbHeroBg = configs[`${configKeyPrefix}_HEROBG`]

    return {
      ...esc,
      image: dbImage?.trim() ? dbImage : esc.image,
      heroBg: dbHeroBg?.trim() ? dbHeroBg : esc.heroBg
    }
  })

  // Load dynamic testimonials
  let dynamicTestimonios: any[] = TESTIMONIOS
  const dbTestimoniosStr = configs['WEB_TESTIMONIOS']

  if (dbTestimoniosStr?.trim()) {
    try {
      dynamicTestimonios = JSON.parse(dbTestimoniosStr)
    } catch (e) {
      console.error('Error parsing dynamic testimonials:', e)
    }
  }


  // Load dynamic blogs from DB
  const dbBlogs = await prisma.articulo.findMany({
    where: { tipo: 'BLOG', estado: 'PUBLICADO', es_destacado: true },
    orderBy: { fecha_publicacion: 'desc' },
    take: 4,
    include: { categorias: true }
  })

  const mappedDbBlogs = dbBlogs.map(blog => ({
    id: blog.slug,
    title: blog.titulo,
    date: new Date(blog.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: blog.miniatura || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    author: blog.autor || 'Académico ADPH',
    resumen: blog.resumen || 'Explora a fondo las mejores estrategias de formación ejecutiva.',
    enlaceExterno: blog.enlace_externo,
    targetUrl: blog.enlace_externo || `/blog/${blog.slug}`,
    fechaOriginal: blog.fecha_publicacion
  }))

  // Combinar y ordenar por fecha descendente
  let mappedConfigBlogs: any[] = []
  const dbBlogsStr = configs.WEB_BLOGS

  if (dbBlogsStr?.trim()) {
    try {
      const parsed = JSON.parse(dbBlogsStr)

      if (parsed && parsed.length > 0) {
        mappedConfigBlogs = parsed.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          date: blog.date || 'Actualidad',
          image: blog.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
          author: blog.author || 'Académico ADPH',
          resumen: blog.desc || 'Explora a fondo las mejores estrategias de formación ejecutiva.',
          enlaceExterno: blog.enlaceExterno || null,
          targetUrl: blog.enlaceExterno || `/blog/${blog.id}`,
          fechaOriginal: blog.date ? parseSpanishDate(blog.date) : new Date(0)
        }))
      }
    } catch (e) {
      console.error('Error parsing dynamic blogs in landing page:', e)
    }
  }

  // Combinar y ordenar por fecha descendente
  const allBlogs = [...mappedDbBlogs, ...mappedConfigBlogs].sort((a, b) => {
    const timeA = a.fechaOriginal instanceof Date && !isNaN(a.fechaOriginal.getTime()) ? a.fechaOriginal.getTime() : 0
    const timeB = b.fechaOriginal instanceof Date && !isNaN(b.fechaOriginal.getTime()) ? b.fechaOriginal.getTime() : 0

    return timeB - timeA
  })

  const parsedBlogs = allBlogs.length > 0 ? allBlogs : BLOGS.map(blog => ({
    id: blog.id.toString(),
    title: blog.title,
    date: blog.date,
    image: blog.image,
    author: 'Académico ADPH',
    resumen: 'Explora a fondo las mejores estrategias de formación ejecutiva.',
    enlaceExterno: null,
    targetUrl: '/blog'
  })); // Fallback to hardcoded if empty

  // Load dynamic news from DB
  const dbNoticias = await prisma.articulo.findMany({
    where: { tipo: { in: ['NOTICIA', 'EVENTO'] }, estado: 'PUBLICADO', es_destacado: true },
    orderBy: { fecha_publicacion: 'desc' },
    take: 6,
    include: { etiquetas: true }
  })

  const parsedNoticias = dbNoticias.length > 0 ? dbNoticias.map(news => ({
    id: news.slug,
    title: news.titulo,
    date: new Date(news.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: news.miniatura || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    tag: news.tipo,
    enlaceExterno: news.enlace_externo,
    targetUrl: news.enlace_externo || `/noticias/${news.slug}`
  })) : NOTICIAS.map(news => ({
    id: news.id.toString(),
    title: news.title,
    date: news.date,
    image: news.image,
    tag: news.tag,
    enlaceExterno: null,
    targetUrl: '/noticias'
  })); // Fallback to hardcoded if empty

  let dynamicLogos: any[] = []
  const dbLogosStr = configs['HOME_LOGOS']

  if (dbLogosStr?.trim()) {
    try {
      dynamicLogos = JSON.parse(dbLogosStr)
    } catch (e) {
      console.error('Error parsing dynamic logos:', e)
    }
  }

  // Dynamic section texts with fallbacks
  const homeEscuelasTitle = configs['HOME_ESCUELAS_TITLE']?.trim() || 'Escuelas Especializadas'
  const homeProgramasTitle = configs['HOME_PROGRAMAS_TITLE']?.trim() || 'Programas en convocatoria'
  const homeNosotrosTitle = configs['HOME_NOSOTROS_TITLE']?.trim() || 'Expertos en formación ejecutiva'
  const homeNosotrosDesc = configs['HOME_NOSOTROS_DESC']?.trim() || 'ADPH Group is an executive education leader dedicated to transforming talent for organizations across Latin America. Through high-level training, first-class faculty, and actionable methodologies, we deliver tangible business outcomes.'
  const homeNosotrosVideoUrl = configs['HOME_NOSOTROS_VIDEO_URL']?.trim() || 'https://www.youtube.com/embed/ZUZif1Ll9u4'
  const homeNosotrosBtnText = configs['HOME_NOSOTROS_BUTTON_TEXT']?.trim() || 'Conoce nuestra historia'
  const homeNosotrosBtnUrl = configs['HOME_NOSOTROS_BUTTON_URL']?.trim() || '/nosotros'
  const homeCorpTitle = configs['HOME_CORP_TITLE']?.trim() || 'Soluciones Corporativas'
  const homeCorpDesc = configs['HOME_CORP_DESC']?.trim() || 'Diseñamos programas a medida para potenciar el talento de tu organización: capacitación in-company, consultoría y tecnología de gestión humana.'
  const homeCorpBtnText = configs['HOME_CORP_BUTTON_TEXT']?.trim() || 'Explorar Soluciones Corporativas'
  const homeCorpBtnUrl = configs['HOME_CORP_BUTTON_URL']?.trim() || '/empresas'

  // Query featured courses from Database
  let cursosDestacados: any[] = []

  try {
    cursosDestacados = await prisma.curso.findMany({
      where: {
        estado: 'PUBLICADO',
        es_destacado: true
      },
      take: 6,
      orderBy: {
        creado_en: 'desc'
      },
      include: {
        categoria: true
      }
    })
  } catch (err) {
    console.error('Error fetching courses from database:', err)
  }

  // Map to display structure
  const FALLBACK_IMAGES = [
    '/images/cursos/evaluacion-y-gestion-del-clima-laboral.png',
    '/images/especializaciones/curso-especializado-diseno-de-tableros-de-mando-para-la-gestion-de-recursos-humanos.png',
    '/images/cursos/creacion-de-equipos-de-alto-rendimiento-con-scrum.jpg',
    '/images/especializaciones/especializacion-en-psicologia-ocupacional.png',
    '/images/talleres/taller-investigacion-del-clima-laboral-con-bloques-de-lego.jpeg',
    '/images/cursos/planes-de-desarrollo-y-capacitacion-del-talento-humano.jpg'
  ]

  const displayProgramas = cursosDestacados.map((c, index) => {
    let finalImage = '/images/cursos.jpg'

    if (c.miniatura && typeof c.miniatura === 'string' && c.miniatura.trim() !== '') {
      const cleanPath = c.miniatura.startsWith('/') ? c.miniatura : `/${c.miniatura}`
      const fullPath = path.join(process.cwd(), 'public', cleanPath)

      if (fs.existsSync(fullPath)) {
        finalImage = cleanPath
      } else {
        finalImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
      }
    } else {
      finalImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
    }

    return {
      id: c.id,
      title: c.titulo,
      image: finalImage,
      category: c.categoria?.nombre || (c.tipo === 'DIPLOMADO' ? 'Diplomado' : c.tipo === 'ESPECIALIZACION' ? 'Especialización' : 'Curso'),
      duration: c.duracion || 'Variable',
      slug: c.slug
    }
  })

  return (
    <>
      {/* 2. PORTADA INICIAL (Dynamic Hero Carousel) */}
      <AdphHeroCarousel />

      {/* 3. SECCIÓN 'ESCUELAS' */}
      <section className="py-24 bg-[#F4F7FC] border-b border-slate-200/60 overflow-hidden relative" id="escuelas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-16 text-center md:text-left">
              <div 
                className="text-slate-900 font-black text-3xl md:text-5xl tracking-tight font-manrope [&>p]:m-0"
                dangerouslySetInnerHTML={{ __html: homeEscuelasTitle }}
              />
              <div className="w-16 h-1.5 bg-[#08479b] mt-6 md:mx-0 mx-auto rounded-full"></div>
            </div>
          </FadeIn>
        </div>

        {/* Schools 3x2 Grid */}
        <FadeIn delay={0.2}>
          <AdphEscuelasCarousel escuelas={dynamicEscuelas} />
        </FadeIn>
      </section>

      {/* 4. SECCIÓN 'PROGRAMAS EN CONVOCATORIA' */}
      {displayProgramas.length > 0 && (
      <section
        className="py-24 border-b border-blue-900 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #06316b 0%, #08479b 45%, #0a56b8 100%)' }}
      >
        {/* Esferas decorativas de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
          <FadeIn>
            <div className="mb-16 text-center">
              <div
                className="text-white font-black text-3xl md:text-5xl tracking-tight font-manrope drop-shadow-lg [&>p]:m-0"
                dangerouslySetInnerHTML={{ __html: homeProgramasTitle }}
              />
              <div className="w-16 h-1.5 bg-[#fcd116] mx-auto mt-5 rounded-full shadow-[0_0_12px_rgba(252,209,22,0.7)]"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProgramas.map((prog, index) => (
              <FadeIn key={prog.id} delay={index * 0.1}>
                <div
                  className="overflow-hidden group flex flex-col h-full transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_40px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4),0_8px_20px_rgba(252,209,22,0.15)]"
                  style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '6px' }}
                >
                  {/* Imagen con overlay */}
                  <div className="h-56 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradiente al hacer hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(6,49,107,0.55) 0%, transparent 60%)' }}
                    />
                    {/* Badge glassmorphism */}
                    <div
                      className="absolute top-4 left-4 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider font-manrope"
                      style={{
                        background: 'rgba(6,49,107,0.8)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      }}
                    >
                      {prog.category}
                    </div>
                  </div>

                  {/* Línea dorada animada */}
                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: 'linear-gradient(90deg, #fcd116, #08479b)' }}
                  />

                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-[#08479b] uppercase tracking-widest mb-3 flex items-center gap-1.5 bg-[#08479b]/10 self-start px-3 py-1 rounded-md font-manrope">
                      <BookOpen className="w-3.5 h-3.5" /> {prog.duration}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-snug mb-4 group-hover:text-[#08479b] transition-colors font-manrope">{prog.title}</h3>
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <Link
                        href={`/programas/${prog.slug}`}
                        className="group/link text-sm font-bold text-slate-500 group-hover:text-[#08479b] inline-flex items-center gap-2 transition-colors font-manrope"
                      >
                        Ver detalle
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 text-[#08479b]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-16 text-center">
              <Link
                href="/programas"
                className="inline-flex items-center justify-center bg-[#fcd116] hover:bg-white text-slate-950 hover:text-[#08479b] font-extrabold text-sm md:text-base uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 transition-all duration-300 shadow-[0_8px_30px_rgba(252,209,22,0.35)] hover:shadow-[0_12px_40px_rgba(252,209,22,0.5)] hover:-translate-y-1 font-manrope"
                style={{ borderRadius: '4px' }}
              >
                Ver todos los Programas
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* 5. SECCIÓN 'SOLUCIONES CORPORATIVAS' */}
      <section className="py-32 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
        {/* Abstract Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#08479b]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#06316b]/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <FadeIn>
            <div 
              className="text-white font-black text-4xl md:text-6xl tracking-tight mb-8 drop-shadow-lg font-manrope [&>p]:m-0"
              dangerouslySetInnerHTML={{ __html: homeCorpTitle }}
            />
            <div 
              className="max-w-2xl mx-auto text-slate-300 font-medium text-lg leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: homeCorpDesc }}
            />
            <Link
              href={homeCorpBtnUrl}
              className="inline-flex items-center justify-center gap-2.5 bg-[#08479b] hover:bg-[#06316b] text-white font-extrabold text-sm md:text-base uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-md transition-all duration-300 shadow-[0_0_30px_rgba(8,71,155,0.4)] hover:shadow-[0_0_40px_rgba(8,71,155,0.6)] hover:-translate-y-1 font-manrope"
            >
              <Building2 className="w-5 h-5" /> {homeCorpBtnText}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 5.5. MARQUESINA DE LOGOS DE CLIENTES */}
      {dynamicLogos.length > 0 ? (
        <ClientLogosMarquee logos={dynamicLogos} />
      ) : (
        <ClientLogosMarquee />
      )}

      {/* 6. SECCIÓN 'SOBRE NOSOTROS' (Two-column layout with editable video) */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-hidden" id="sobre-nosotros">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <FadeIn>
              <div className="space-y-6 text-left">

                <div 
                  className="text-slate-900 font-black text-4xl sm:text-5xl tracking-tight leading-tight font-manrope [&>p]:m-0"
                  dangerouslySetInnerHTML={{ __html: homeNosotrosTitle }}
                />
                <div 
                  className="text-slate-600 text-base md:text-lg font-medium leading-relaxed font-manrope"
                  dangerouslySetInnerHTML={{ __html: homeNosotrosDesc }}
                />
                <div className="pt-4 font-manrope">
                  <Link
                    href={homeNosotrosBtnUrl}
                    className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-900 font-manrope"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#08479b]/10 text-[#08479b] flex items-center justify-center group-hover:bg-[#08479b] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {homeNosotrosBtnText.toUpperCase()}
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Editable Video Card */}
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Background glow decoration */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#08479b]/5 rounded-full blur-[80px] pointer-events-none -translate-y-10 translate-x-10" />
                
                <div className="relative z-10 w-full aspect-[4/3] rounded-none overflow-hidden shadow-lg bg-slate-950">
                  {/* YouTube Iframe - URL can be edited using the NOSOTROS_VIDEO_URL constant at the top of the file */}
                  <iframe 
                    src={homeNosotrosVideoUrl} 
                    title="Presentación ADPH Group"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 7. SECCIÓN 'TESTIMONIOS' */}
      <section className="py-24 bg-[#08479b] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-white font-black text-3xl md:text-5xl tracking-tight font-manrope">Lo que dicen nuestros alumnos</h2>
              <div className="w-16 h-1.5 bg-[#fcd116] mx-auto mt-6 rounded-full"></div>
            </div>
          </FadeIn>

          <TestimoniosCarousel testimonios={dynamicTestimonios} />
        </div>
      </section>

      {/* 8. SECCIÓN 'BLOG - TARJETAS HORIZONTALES' */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <h2 className="text-slate-900 font-black text-3xl md:text-5xl tracking-tight font-manrope">Últimos Artículos</h2>
                <div className="w-16 h-1.5 bg-[#08479b] mt-6 rounded-full"></div>
              </div>
              <Link href="/blog" className="group inline-flex items-center gap-3 text-slate-900 font-extrabold uppercase text-xs tracking-widest hover:text-[#08479b] transition-colors font-manrope">
                <span className="bg-white shadow-sm border border-slate-200 rounded-md p-3 group-hover:shadow-md transition-all">
                  <ArrowRight className="w-4 h-4 text-[#08479b]" />
                </span>
                Ver todos los artículos
              </Link>
            </div>
          </FadeIn>

          {/* 2-Column Horizontal Blog Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {parsedBlogs.slice(0, 4).map((blog, index) => (
              <FadeIn key={blog.id} delay={index * 0.1}>
                <div className="group flex flex-col md:flex-row bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden h-full">
                  <div className="md:w-2/5 h-52 md:h-auto relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#08479b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{blog.date}</span>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#08479b] transition-colors leading-tight font-manrope line-clamp-2">{blog.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">
                        Explora a fondo las mejores estrategias de formación ejecutiva y metodologías aplicadas para liderar con éxito en las organizaciones modernas.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-6 font-manrope">
                      <span className="text-[10px] text-slate-400 font-bold">Por: {blog.author || 'Académico ADPH'}</span>
                      <Link
                        href={blog.targetUrl || '/blog'}
                        target={blog.enlaceExterno ? '_blank' : undefined}
                        rel={blog.enlaceExterno ? 'noopener noreferrer' : undefined}
                        className="text-xs font-bold text-[#08479b] hover:underline inline-flex items-center gap-1"
                      >
                        Leer artículo <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECCIÓN 'NOTICIAS' (Centered grid of featured news) */}
      <section
        className="py-24 border-b border-blue-900"
        style={{
          background: 'linear-gradient(160deg, #06316b 0%, #08479b 45%, #0a56b8 100%)',
        }}
      >
        {/* Partículas de fondo decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 -left-10 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fcd116 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-white font-black text-3xl md:text-5xl tracking-tight font-manrope drop-shadow-lg">Noticias Destacadas</h2>
                <div className="w-16 h-1.5 bg-[#fcd116] mt-5 rounded-full shadow-[0_0_12px_rgba(252,209,22,0.7)]"></div>
              </div>
              <Link
                href="/noticias"
                className="group flex items-center gap-3 text-xs font-extrabold uppercase tracking-widest text-white hover:text-[#fcd116] transition-all duration-300 font-manrope"
              >
                <span
                  className="flex items-center justify-center rounded-md p-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-[#fcd116]" />
                </span>
                Ver todas las noticias
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
            {parsedNoticias.map((news, index) => {
              const targetUrl = news.targetUrl || `/noticias/${news.id}`

              return (
                <FadeIn key={news.id} delay={index * 0.15}>
                  <div
                    className="group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_40px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4),0_8px_20px_rgba(252,209,22,0.15)]"
                    style={{
                      background: 'rgba(255,255,255,0.97)',
                      borderRadius: '4px',
                    }}
                  >
                    {/* Imagen con overlay gradiente */}
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay gradiente sobre imagen */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(to top, rgba(6,49,107,0.5) 0%, transparent 60%)' }}
                      />
                      {/* Badge con glassmorphism */}
                      <div
                        className="absolute top-4 left-4 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(8,71,155,0.85)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '3px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                      >
                        {news.tag}
                      </div>
                    </div>

                    {/* Línea decorativa animada */}
                    <div
                      className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: 'linear-gradient(90deg, #fcd116, #08479b)' }}
                    />

                    <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.date}</span>
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-[#08479b] transition-colors leading-snug font-manrope">
                          {news.title}
                        </h4>
                      </div>
                      <Link
                        href={news.enlaceExterno || targetUrl}
                        target={news.enlaceExterno ? '_blank' : undefined}
                        rel={news.enlaceExterno ? 'noopener noreferrer' : undefined}
                        className="group/link mt-6 inline-flex items-center gap-1.5 self-start font-manrope"
                      >
                        <span className="text-xs font-bold text-[#08479b] group-hover/link:underline">Leer noticia</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#08479b] transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER CAPTURE (Newsletter component right before Footer) */}
      <AdphNewsletter />
    </>
  )
}
