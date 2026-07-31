import Link from 'next/link'


import type { Metadata } from 'next'



import { ArrowRight } from 'lucide-react'


import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import ProfessorsCarousel from '@/features/web/nosotros/components/ProfessorsCarousel'
import { MisionVisionSection, ValoresSection } from '@/features/web/nosotros/components/NosotrosInteractive'



export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const configs = await getConfigs()
  const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'
  const desc = configs.SEO_NOSOTROS_DESC?.trim() || 'Conoce quiénes somos, nuestra misión, visión y los valores que guían nuestra plataforma educativa de alto impacto.'
  const ogImage = configs.SEO_OG_IMAGE?.trim() || ''
  const siteUrl = configs.SEO_SITE_URL?.trim() || ''
  const title = `Nosotros | ${siteName}`

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'website',
      locale: 'es_PE',
      siteName,
      ...(siteUrl ? { url: `${siteUrl}/nosotros` } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: desc, ...(ogImage ? { images: [ogImage] } : {}) },
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}/nosotros` } } : {}),
  }
}


async function getTeachers() {
  try {
    return await prisma.usuario.findMany({
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
      take: 12,
    })
  } catch {
    return []
  }
}

export default async function NosotrosPage() {
  const teachers = await getTeachers()
  const configs = await getConfigs()

  const heroTitle = configs['NOSOTROS_HERO_TITLE']?.trim() || 'Somos calidad y responsabilidad a tu servicio'
  const heroDesc = configs['NOSOTROS_HERO_DESC']?.trim() || 'Somos una plataforma educativa especializada en la formación profesional de alto impacto. Ofrecemos cursos diseñados por expertos del sector, con certificaciones reconocidas que impulsan tu desarrollo profesional y el de tu equipo.'

  const misionTitle = configs['NOSOTROS_MISION_TITLE']?.trim() || undefined
  const misionText = configs['NOSOTROS_MISION_TEXT']?.trim() || undefined
  const visionTitle = configs['NOSOTROS_VISION_TITLE']?.trim() || undefined
  const visionText = configs['NOSOTROS_VISION_TEXT']?.trim() || undefined

  let dynamicValores: { title: string; desc: string }[] | undefined = undefined
  const dbValoresStr = configs['NOSOTROS_VALORES']

  if (dbValoresStr?.trim()) {
    try { dynamicValores = JSON.parse(dbValoresStr) } catch { /* fallback */ }
  }

  const stats = [
    { emoji: '\uD83D\uDC69\u200D\uD83C\uDF93', value: configs['NOSOTROS_STAT_1_VALUE']?.trim() || '+1,200', label: configs['NOSOTROS_STAT_1_LABEL']?.trim() || 'Estudiantes formados' },
    { emoji: '\uD83D\uDCDA', value: configs['NOSOTROS_STAT_2_VALUE']?.trim() || '+80', label: configs['NOSOTROS_STAT_2_LABEL']?.trim() || 'Cursos disponibles' },
    { emoji: '\uD83D\uDC68\u200D\uD83C\uDFEB', value: configs['NOSOTROS_STAT_3_VALUE']?.trim() || '+30', label: configs['NOSOTROS_STAT_3_LABEL']?.trim() || 'Docentes expertos' },
    { emoji: '\uD83C\uDFC6', value: configs['NOSOTROS_STAT_4_VALUE']?.trim() || '98%', label: configs['NOSOTROS_STAT_4_LABEL']?.trim() || 'Tasa de satisfacción' },
  ]

  const heroBg = configs['NOSOTROS_HERO_IMAGE']?.trim()

  

  return (
    <>
      {/* ── 1. HERO SOBRE NOSOTROS ─────────────────────── */}
      {/* ── 1. HERO SOBRE NOSOTROS ─────────────────────── */}
      <section className="relative min-h-[70vh] lg:min-h-screen pt-[72px] lg:pt-[80px] pb-24 flex flex-col justify-start overflow-hidden bg-[#08479b]">
        {heroBg && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroBg} alt="Nosotros" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08479b] via-[#08479b]/80 to-[#08479b]"></div>
          </div>
        )}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-8 mx-auto">
                <span className="w-2 h-2 rounded-full bg-[#fcd116]"></span>
                Sobre nosotros
              </div>
              <h1 
                className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 [&>p]:m-0 mx-auto"
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />
              <div 
                className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: heroDesc }}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <Link
                  href="/programas"
                  className="bg-[#fcd116] hover:bg-white text-slate-900 px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-2 transition-all hover:shadow-xl w-full sm:w-auto"
                >
                  Ver programas <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contacto"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-2 transition-all w-full sm:w-auto"
                >
                  Trabaja con nosotros
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Highlights Bar (Stats) */}
      <section className="bg-slate-900 border-b border-white/10 relative z-20 -mt-6 lg:-mt-10 mx-6 lg:mx-10 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="p-4 md:p-6 flex items-center gap-4">
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white text-base md:text-lg font-black leading-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. BANNER ISO ─────────────────────────────── */}
      {/* <section
        style={{
          backgroundColor: '#0A0A0A',
          padding: '2.5rem 1.5rem',
          borderTop: '1px solid rgba(59,168,197,0.2)',
          borderBottom: '1px solid rgba(59,168,197,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(59,168,197,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid rgba(59,168,197,0.3)', flexShrink: 0,
            }}
          >
            <Award size={28} color="#3BA8C5" />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
              Calidad certificada:{' '}
              <span style={{ color: '#3BA8C5' }}>ISO 9001:2015</span> e{' '}
              <span style={{ color: '#3BA8C5' }}>ISO 21001:2018</span>
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
              Comprometidos con los más altos estándares de calidad educativa y de gestión
            </div>
          </div>
        </div>
      </section> */}

      {/* ── 3. MISIÓN / VISIÓN (client component) ─────── */}
      <MisionVisionSection
        misionTitle={misionTitle}
        misionText={misionText}
        visionTitle={visionTitle}
        visionText={visionText}
      />

      {/* ── 4. VALORES (client component) ─────────────── */}
      <ValoresSection valores={dynamicValores} />

      {/* ── 5. PROFESORES ─────────────────────────────── */}
      <ProfessorsCarousel teachers={JSON.parse(JSON.stringify(teachers))} />
    </>
  )
}
