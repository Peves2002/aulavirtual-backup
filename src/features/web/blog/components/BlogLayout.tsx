'use client'

import Link from 'next/link'
import BlogCard from './BlogCard'

// Dummy Data matching the screenshot
const dummyPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
    title: 'El Congreso censura a José Jerí y abre una nueva transición presidencial',
    date: 'febrero 17, 2026',
    excerpt: 'El Congreso censuró a José Jerí con 75 votos, tras cuestionamientos por reuniones no registradas e investigaciones. El miércoles 18 se elegirá a su sucesor, en plena antesala electoral nacional.',
    slug: 'congreso-censura-jose-jeri'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    title: 'Ley 32069: MEF actualiza las bases estándar de contratación pública',
    date: 'enero 20, 2026',
    excerpt: 'La RD 0001-2026-EF/54.01 actualiza 19 bases estándar de la Ley 32069 para contrataciones públicas, alineadas al nuevo reglamento y mayor eficiencia.',
    slug: 'ley-32069-mef-actualiza-bases'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    title: 'Gálvez disuelve equipos anticorrupción y reabre la preocupación por la impunidad',
    date: 'enero 12, 2026',
    excerpt: 'Tomás Gálvez disolvió los equipos especiales Lava Jato, Cuellos Blancos, Eficcop y Eficavip, generando preocupación sobre la continuidad de las investigaciones clave contra la corrupción y violaciones de derechos humanos.',
    slug: 'galvez-disuelve-equipos-anticorrupcion'
  },
  {
    id: '4',
    title: 'Maduro es capturado por Estados Unidos tras un ataque en Caracas',
    date: 'enero 3, 2026',
    excerpt: 'Estados Unidos captura a Nicolás Maduro tras un ataque en Caracas y lo traslada a Nueva York, provocando reacciones internacionales, tensión regional y un incierto escenario político en Venezuela.',
    slug: 'maduro-capturado-estados-unidos'
  }
]

export default function BlogLayout() {
  return (
    <div className="bg-white min-h-screen">
      {/* Blog Header */}
      <div className="w-full bg-[#f1f1f1] py-8 border-b border-gray-200 mt-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h1 className="text-[28px] md:text-[34px] font-bold text-black mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Noticias EGEC PERÚ
          </h1>
          <div className="text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#e60000] transition-colors">Inicio</Link> 
            <span className="mx-2">›</span> 
            <span className="text-gray-700">Noticias EGEC PERÚ</span>
          </div>
        </div>
      </div>

      {/* Blog Grid (Masonry) */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {dummyPosts.map((post) => (
            <BlogCard 
              key={post.id}
              image={post.image}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
