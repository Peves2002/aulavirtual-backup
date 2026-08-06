import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
 
export const dynamic = 'force-dynamic'

import { ArrowLeft, Facebook, Linkedin, Twitter, Search } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'

import ShareButtons from './ShareButtons'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const articulo = await prisma.articulo.findUnique({
    where: { slug: params.slug }
  })

  if (!articulo || articulo.estado !== 'PUBLICADO') return {}
  const configs = await getConfigs()
  const siteName = configs.TEMPLATE_NAME?.trim() || 'ADPH Group'

  
return {
    title: `${articulo.titulo} | ${siteName}`,
    description: articulo.resumen || articulo.titulo,
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const configs = await getConfigs()

  let articulo: any = await prisma.articulo.findUnique({
    where: { slug: params.slug },
    include: {
      categorias: true,
      etiquetas: true
    }
  })

  let isConfigBlog = false

  if (!articulo) {
    // Intentar buscar en la configuración de blogs
    const dbBlogsStr = configs.WEB_BLOGS

    if (dbBlogsStr?.trim()) {
      try {
        const parsed = JSON.parse(dbBlogsStr)
        const found = parsed.find((b: any) => b.id === params.slug)

        if (found) {
          articulo = {
            id: found.id,
            titulo: found.title,
            slug: found.id,
            resumen: found.desc,
            contenido: found.contentHtml || found.desc || '',
            miniatura: found.image,
            tipo: 'BLOG',
            estado: 'PUBLICADO',
            autor: found.author,
            fecha_publicacion: found.date ? new Date(found.date) : new Date(),
            categorias: found.category ? [{ id: 'cat-config', nombre: found.category }] : [],
            etiquetas: (found.tags || []).map((t: string, i: number) => ({ id: `tag-${i}`, nombre: t })),
            enlace_externo: found.enlaceExterno || null
          }
          isConfigBlog = true
        }
      } catch (e) {
        console.error('Error parsing config blogs in detail page fallback:', e)
      }
    }
  }

  if (!articulo || (!isConfigBlog && articulo.estado !== 'PUBLICADO')) {
    notFound()
  }

  if (!isConfigBlog && (articulo.tipo === 'EVENTO' || articulo.tipo === 'NOTICIA')) {
    redirect(`/noticias/${articulo.slug}`)
  }

  const ultimosArticulos = await prisma.articulo.findMany({
    where: { estado: 'PUBLICADO', tipo: 'BLOG', id: { not: articulo.id } },
    orderBy: { fecha_publicacion: 'desc' },
    take: 3,
    include: { categorias: true }
  })
  
  let relacionados: any[] = []
  const tagsIds = (articulo.etiquetas || []).map((e: any) => e.id).filter((id: string) => !id.startsWith('tag-'))
  const catIds = (articulo.categorias || []).map((c: any) => c.id).filter((id: string) => !id.startsWith('cat-'))
  
  if (tagsIds.length > 0 || catIds.length > 0) {
    relacionados = await prisma.articulo.findMany({
      where: {
        estado: 'PUBLICADO',
        tipo: 'BLOG',
        id: { not: articulo.id },
        OR: [
          ...(tagsIds.length > 0 ? [{ etiquetas: { some: { id: { in: tagsIds } } } }] : []),
          ...(catIds.length > 0 ? [{ categorias: { some: { id: { in: catIds } } } }] : [])
        ]
      },
      take: 3,
      include: { categorias: true }
    })
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Header Area with Return and Title */}
      <div className="bg-[#f4f5f7] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <Link 
            href="/noticias?tab=blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#08479b] uppercase tracking-widest hover:underline mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Blog
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-extrabold text-[#08479b] uppercase tracking-widest mb-6">
              {articulo.categorias.map((cat: any) => (
                <span key={cat.id} className="bg-[#08479b] text-white px-3 py-1 rounded-sm">
                  {cat.nombre}
                </span>
              ))}
              <span className="text-gray-500">
                {new Date(articulo.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-8 font-manrope">
              {articulo.titulo}
            </h1>

            <div className="flex items-center gap-4 border-l-2 border-[#08479b] pl-4">
              <div>
                <span className="text-sm font-bold text-gray-900 block">{articulo.autor || 'Académico ADPH'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Image */}
      {articulo.miniatura && (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 -mt-12 relative z-10">
          <div className="aspect-[21/9] md:aspect-[24/9] w-full overflow-hidden rounded-md shadow-lg bg-gray-100">
            <img src={articulo.miniatura} alt={articulo.titulo} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* 3. Main Content & Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Content Body (Left on Desktop) */}
        <div className="lg:col-span-8 order-1">
          <ShareButtons title={articulo.titulo} />

          <div 
            className="prose prose-xl prose-slate prose-p:leading-[2.2] prose-p:text-gray-700 prose-a:text-[#08479b] prose-headings:font-manrope prose-headings:font-black prose-headings:text-[#08479b] max-w-none text-justify tracking-wide"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />
          
          {articulo.etiquetas.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-gray-600 mr-2 flex items-center">Etiquetas:</span>
              {articulo.etiquetas.map((tag: any) => (
                <span key={tag.id} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                  {tag.nombre}
                </span>
              ))}
            </div>
          )}

          {/* Footer Widget: Artículos Relacionados */}
          {relacionados.length > 0 && (
            <div className="mt-20 pt-10 border-t-2 border-slate-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8 font-manrope">Artículos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relacionados.map(r => (
                  <Link href={`/blog/${r.slug}`} key={r.id} className="group block">
                    <div className="aspect-video bg-gray-100 mb-4 rounded overflow-hidden">
                      {r.miniatura && <img src={r.miniatura} alt={r.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    </div>
                    {r.categorias?.[0] && <span className="text-[10px] font-bold text-[#08479b] uppercase tracking-wider mb-2 block">{r.categorias[0].nombre}</span>}
                    <h4 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#08479b] transition-colors">{r.titulo}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar (Right on Desktop) */}
        <aside className="lg:col-span-4 order-2 space-y-12">
          
          <div className="sticky top-32">
            {/* Search Widget */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-10">
              <h4 className="font-bold text-gray-900 mb-4">Buscar en el Blog</h4>
              <div className="relative">
                <input type="text" placeholder="Escribe tu búsqueda..." className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 focus:outline-none focus:border-[#08479b] focus:ring-1 focus:ring-[#08479b]" />
                <button className="absolute right-3 top-3 text-gray-400 hover:text-[#08479b]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-black text-gray-900 border-b-2 border-[#08479b] pb-2 mb-6 font-manrope">Artículos Recientes</h3>
            <div className="flex flex-col gap-6">
              {ultimosArticulos.map((r) => (
                <Link href={`/blog/${r.slug}`} key={r.id} className="group flex gap-4 items-start">
                  <div className="w-24 h-24 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                    {r.miniatura && <img src={r.miniatura} alt={r.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="flex flex-col">
                    {r.categorias?.[0] && <span className="text-[10px] font-bold text-[#08479b] uppercase tracking-wider mb-1 block">{r.categorias[0].nombre}</span>}
                    <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#08479b] transition-colors line-clamp-3">
                      {r.titulo}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </article>
  )
}
