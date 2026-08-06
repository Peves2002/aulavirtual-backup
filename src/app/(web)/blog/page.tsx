export const dynamic = 'force-dynamic'

import { BookOpen } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import BlogGrid from '@/features/web/blog/components/BlogGrid'

export const metadata = {
  title: 'Nuestro Blog | Artículos y Tendencias de RRHH | ADPH Group',
  description:
    'Explora nuestros artículos, guías y tendencias en recursos humanos, psicología ocupacional y consultoría organizacional.',
}


import prisma from '@/utils/libs/prisma'

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

export default async function BlogPage() {
  const configs = await getConfigs()
  
  // 1. Consultar todos los artículos de tipo BLOG de la base de datos
  const dbBlogs = await prisma.articulo.findMany({
    where: { 
      tipo: 'BLOG',
      estado: 'PUBLICADO' 
    },
    orderBy: { fecha_publicacion: 'desc' },
    include: { categorias: true }
  })
 
  const mappedDbBlogs = dbBlogs.map(b => ({
    id: b.slug,
    title: b.titulo,
    category: b.categorias?.[0]?.nombre || 'Actualidad',
    readTime: '5 min lectura',
    date: new Date(b.fecha_publicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
    desc: b.resumen || '',
    image: b.miniatura || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: b.autor || 'Académico ADPH',
    role: 'Autor',
    tags: [],
    fechaOriginal: b.fecha_publicacion
  }))
 
  // 2. Cargar blogs de la configuración (Gestión de Blogs)
  let mappedConfigBlogs: any[] = []
  const dbBlogsStr = configs.WEB_BLOGS

  if (dbBlogsStr?.trim()) {
    try {
      const parsed = JSON.parse(dbBlogsStr)

      if (parsed && parsed.length > 0) {
        mappedConfigBlogs = parsed.map((b: any) => ({
          id: b.id,
          title: b.title,
          category: b.category || 'General',
          readTime: b.readTime || '5 min lectura',
          date: b.date || 'Actualidad',
          desc: b.desc || '',
          image: b.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
          author: b.author || 'Académico ADPH',
          role: b.role || 'Autor',
          tags: b.tags || [],
          fechaOriginal: b.date ? parseSpanishDate(b.date) : new Date(0)
        }))
      }
    } catch (e) {
      console.error('Error parsing config blogs in blog index:', e)
    }
  }
 
  // Combinar y ordenar por fecha descendente
  const allBlogs = [...mappedDbBlogs, ...mappedConfigBlogs].sort((a, b) => {
    const timeA = a.fechaOriginal instanceof Date && !isNaN(a.fechaOriginal.getTime()) ? a.fechaOriginal.getTime() : 0
    const timeB = b.fechaOriginal instanceof Date && !isNaN(b.fechaOriginal.getTime()) ? b.fechaOriginal.getTime() : 0

    return timeB - timeA
  })
 
  const dynamicBlogs = allBlogs

  return (
    <>
      {/* 1. HERO */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <span className="text-[#3BA8C5] font-extrabold text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <BookOpen className="w-3.5 h-3.5" /> Conocimiento y Aprendizaje
          </span>
          <h1 className="text-slate-900 font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight">
            Nuestro <span className="text-[#3BA8C5]">Blog Organizacional</span>
          </h1>
          <div className="w-16 h-1.5 bg-[#3BA8C5] mx-auto mt-6 mb-8"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Tendencias, herramientas estratégicas e investigación en Gestión de Personas, Seguridad &amp; Salud en el
            Trabajo y Soluciones Tecnológicas de RRHH.
          </p>
        </div>
      </section>

      {/* 2. GRID DE ARTÍCULOS */}
      <section className="py-24 bg-[#FBFCFD] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <BlogGrid blogs={dynamicBlogs} />
        </div>
      </section>

    </>
  )
}
