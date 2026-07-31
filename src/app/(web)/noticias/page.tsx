import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRight, Calendar, BookOpen } from 'lucide-react'
import { getConfigs } from '@/utils/libs/config'
import FadeIn from '@/utils/components/animations/FadeIn'

export async function generateMetadata(): Promise<Metadata> {
  const configs = await getConfigs()
  const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'
  const desc = configs.SEO_NOTICIAS_DESC?.trim() || 'Mantente al día con las últimas noticias, tendencias e innovación metodológica de ADPH Group.'
  const ogImage = configs.SEO_OG_IMAGE?.trim() || ''
  const siteUrl = configs.SEO_SITE_URL?.trim() || ''
  const title = `Noticias | ${siteName}`

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'website',
      locale: 'es_PE',
      siteName,
      ...(siteUrl ? { url: `${siteUrl}/noticias` } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: desc, ...(ogImage ? { images: [ogImage] } : {}) },
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}/noticias` } } : {}),
  }
}


const DEFAULT_NOTICIAS = [
  {
    id: '1',
    tag: 'TENDENCIAS',
    title: 'ADPH Group presenta el estudio de Clima Laboral 2026',
    date: 'Julio 05, 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    url: '/blog'
  },
  {
    id: '2',
    tag: 'INNOVACIÓN',
    title: 'Nuevas metodologías experienciales en alianza internacional',
    date: 'Junio 28, 2026',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    url: '/blog'
  }
]

export default async function NoticiasPage() {
  const configs = await getConfigs()
  
  let dynamicNoticias = DEFAULT_NOTICIAS
  const dbNoticiasStr = configs['WEB_NOTICIAS']
  if (dbNoticiasStr?.trim()) {
    try {
      dynamicNoticias = JSON.parse(dbNoticiasStr)
    } catch (e) {
      console.error('Error parsing dynamic news in page:', e)
    }
  }

  return (
    <>
      {/* 1. HERO */}
      <section className="py-24 bg-gradient-to-br from-[#070D19] to-[#0F1E36] text-center relative overflow-hidden">
        {/* Glow grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(8,71,155,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-3.5 h-3.5" /> Actualidad e Impacto
          </span>
          <h1 className="text-white font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight font-manrope">
            Noticias <span className="text-[#3BA8C5]">Destacadas</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8 rounded-full"></div>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Descubre las últimas novedades de ADPH Group, estudios sectoriales, alianzas académicas y tendencias globales en consultoría organizacional.
          </p>
        </div>
      </section>

      {/* 2. GRID DE NOTICIAS */}
      <section className="py-24 bg-[#F4F7FC] border-b border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {dynamicNoticias.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 font-semibold">No hay noticias registradas en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
              {dynamicNoticias.map((news, index) => {
                const isExternal = !!news.enlaceExterno
                const targetUrl = news.enlaceExterno || (news.url && news.url.startsWith('http') ? news.url : `/noticias/${news.id}`)

                return (
                  <FadeIn key={news.id} delay={index * 0.1}>
                    <div className="group bg-white border border-slate-200 rounded-none overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="h-60 relative overflow-hidden bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
                        <div className="absolute top-4 left-4 bg-[#08479b] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none">
                          {news.tag}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.date}</span>
                          <h4 className="text-lg font-black text-slate-900 group-hover:text-[#08479b] transition-colors leading-snug font-manrope">
                            {news.title}
                          </h4>
                        </div>
                        <Link 
                          href={targetUrl}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-xs font-bold text-[#08479b] hover:underline mt-6 inline-flex items-center gap-1.5 font-manrope self-start"
                        >
                          Leer noticia <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. NEWSLETTER */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest block mb-4">
            Mantente Conectado
          </span>
          <h2 className="text-white font-black text-3xl tracking-tight mb-6">
            Suscríbete a nuestras novedades
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed mb-10">
            Recibe en tu correo alertas sobre nuestros últimos estudios, webinars gratuitos y noticias del ámbito corporativo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu dirección de correo"
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-[#3BA8C5] focus:ring-1 focus:ring-[#3BA8C5] transition-colors rounded-none"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center bg-[#3BA8C5] hover:bg-[#0083B0] text-white font-extrabold px-6 py-3.5 transition-colors text-xs uppercase tracking-widest rounded-none"
            >
              Suscribirme
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
