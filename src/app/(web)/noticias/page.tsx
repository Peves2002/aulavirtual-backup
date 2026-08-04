import Link from 'next/link'
 
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'

import { ArrowRight,  BookOpen } from 'lucide-react'

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






import prisma from '@/utils/libs/prisma'
 
 export default async function NoticiasPage() {
   
   // Consultar todos los artículos de tipo NOTICIA y EVENTO de la base de datos
   const dbEventos = await prisma.articulo.findMany({
     where: { 
       tipo: { in: ['NOTICIA', 'EVENTO'] },
       estado: 'PUBLICADO' 
     },
     orderBy: { fecha_publicacion: 'desc' },
     include: { categorias: true }
   })
 
   const dynamicNoticias = dbEventos.map(e => ({
     id: e.slug,
     tag: e.tipo,
     title: e.titulo,
     date: new Date(e.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
     image: e.miniatura || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
     url: `/noticias/${e.slug}`
   }))
 
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
             Próximos <span className="text-[#3BA8C5]">Eventos</span>
           </h1>
           <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8 rounded-full"></div>
           <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
             Participa en nuestras masterclasses, webinars y conferencias presenciales y virtuales sobre la gestión estratégica de personas.
           </p>
         </div>
       </section>
 
       {/* 2. GRID DE EVENTOS */}
       <section className="py-24 bg-[#F4F7FC] border-b border-slate-200/60">
         <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
           {dynamicNoticias.length === 0 ? (
             <div className="text-center py-16">
               <p className="text-slate-500 font-semibold">No hay eventos programados en este momento.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
               {dynamicNoticias.map((news, index) => {
                 const targetUrl = `/noticias/${news.id}`
 
                 return (
                   <FadeIn key={news.id} delay={index * 0.1}>
                     <div className="group bg-white border border-slate-200 rounded-none overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300">
                       <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
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
                           className="text-xs font-bold text-[#08479b] hover:underline mt-6 inline-flex items-center gap-1.5 font-manrope self-start"
                         >
                           Ver detalles del evento <ArrowRight className="w-3.5 h-3.5" />
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

    </>
  )
}
