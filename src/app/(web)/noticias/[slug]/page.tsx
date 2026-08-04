import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
 
export const dynamic = 'force-dynamic'

import { ArrowLeft } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import { getConfigs } from '@/utils/libs/config'
import FadeIn from '@/utils/components/animations/FadeIn'
import SafeHtml from '@/components/SafeHtml'
import EventRegisterForm from '@/features/web/adph/components/EventRegisterForm'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const articulo = await prisma.articulo.findUnique({
    where: { slug: params.slug }
  })

  if (!articulo || articulo.estado !== 'PUBLICADO') return {}

  const configs = await getConfigs()
  const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'

  return {
    title: `${articulo.titulo} | ${siteName}`,
    description: articulo.resumen || articulo.titulo,
    openGraph: {
      title: articulo.titulo,
      description: articulo.resumen || articulo.titulo,
      images: articulo.miniatura ? [{ url: articulo.miniatura }] : [],
    }
  }
}

export default async function ArticuloPage({ params }: PageProps) {
  const articulo = await prisma.articulo.findUnique({
    where: { slug: params.slug },
    include: {
      categorias: true
    }
  })

  if (!articulo || articulo.estado !== 'PUBLICADO') {
    notFound()
  }

  // Redirigir a la sección de blog si no es de tipo EVENTO o NOTICIA
  if (articulo.tipo !== 'EVENTO' && articulo.tipo !== 'NOTICIA') {
    redirect(`/blog/${articulo.slug}`)
  }

  return (
    <article className="bg-white min-h-screen">
      
      {/* 1. HERO TITLE BANNER (Estilo PAD) */}
      <div className="bg-slate-50 border-b border-slate-100 pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <Link 
            href="/noticias" 
            className="inline-flex items-center gap-2 text-[#08479b] hover:underline text-xs tracking-widest font-extrabold uppercase mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> 
            Volver a Noticias y Eventos
          </Link>
          
          <div className="w-8 h-1.5 bg-[#08479b] mb-4"></div>
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight leading-tight max-w-4xl font-manrope">
            {articulo.titulo}
          </h1>
        </div>
      </div>

      {/* 2. CONTENIDO Y FORMULARIO (Estilo PAD) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* COLUMNA IZQUIERDA: Sobre el evento/noticia y detalles */}
          <div className={articulo.tipo === 'EVENTO' ? "lg:col-span-7 space-y-8" : "lg:col-span-12 space-y-8"}>
            <div className="space-y-4">
              <div className="w-8 h-1.5 bg-[#08479b]"></div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-manrope uppercase">
                {articulo.tipo === 'EVENTO' ? 'Sobre el Evento' : 'Contenido'}
              </h2>
            </div>
            
            {/* Contenido descriptivo */}
            {articulo.contenido && (
              <FadeIn delay={0.1}>
                <div 
                  className="prose prose-lg prose-slate prose-a:text-[#08479b] prose-a:font-semibold max-w-none text-justify leading-relaxed text-gray-700 font-sans"
                  dangerouslySetInnerHTML={{ __html: articulo.contenido }}
                />
              </FadeIn>
            )}

            {(articulo as any).codigo_embeber && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                <SafeHtml html={(articulo as any).codigo_embeber} />
              </div>
            )}
            
            {/* Metadatos del evento (Modalidad, expositor, fecha) al final del texto */}
            {articulo.tipo === 'EVENTO' && (
              <div className="space-y-6 pt-10 border-t border-slate-100">
                {articulo.modalidad_evento && (
                  <div>
                    <h4 className="text-[#08479b] font-bold uppercase text-xs tracking-wider mb-1">Modalidad:</h4>
                    <p className="text-slate-900 font-semibold text-lg">{articulo.modalidad_evento}</p>
                  </div>
                )}
                {articulo.expositor && (
                  <div>
                    <h4 className="text-[#08479b] font-bold uppercase text-xs tracking-wider mb-1">Expositor:</h4>
                    <p className="text-slate-900 font-semibold text-lg">{articulo.expositor}</p>
                  </div>
                )}
                {articulo.fecha_evento && (
                  <div>
                    <h4 className="text-[#08479b] font-bold uppercase text-xs tracking-wider mb-1">Fecha y hora:</h4>
                    <p className="text-slate-900 font-semibold text-lg">
                      {new Date(articulo.fecha_evento).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                      {articulo.hora_evento ? ` a las ${articulo.hora_evento}` : ''}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="text-[#08479b] font-bold uppercase text-xs tracking-wider mb-1">Tipo:</h4>
                  <p className="text-slate-900 font-semibold text-lg">{articulo.categorias?.[0]?.nombre || 'Conferencia Especializada'}</p>
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Formulario Sticky con borde redondeado (Solo para eventos) */}
          {articulo.tipo === 'EVENTO' && (
            <div className="lg:col-span-5">
              <div className="bg-black text-white p-6 md:p-10 rounded-br-[2rem] shadow-xl border border-slate-900 sticky top-32">
                <EventRegisterForm eventTitle={articulo.titulo} />
              </div>
            </div>
          )}

        </div>
      </div>

    </article>
  )
}
