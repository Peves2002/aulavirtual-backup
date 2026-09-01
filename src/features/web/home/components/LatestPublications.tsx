import Link from 'next/link'

const publications = [
  {
    id: 1,
    title: 'La nueva reforma penal: Cambios e implicancias 2026',
    excerpt: 'Análisis detallado sobre las recientes modificaciones en el código procesal penal y cómo afectará los litigios actuales.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '#'
  },
  {
    id: 2,
    title: '¿Por qué especializarse en Contrataciones del Estado?',
    excerpt: 'Descubre las ventajas competitivas y el panorama laboral para los profesionales del derecho enfocados en el sector público.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '#'
  },
  {
    id: 3,
    title: 'El impacto de la inteligencia artificial en el derecho civil',
    excerpt: 'Cómo las nuevas tecnologías están transformando la redacción de contratos, resolución de conflictos y la labor del abogado moderno.',
    image: 'https://images.unsplash.com/photo-1505664159854-232144cebe5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '#'
  }
]

export default function LatestPublications() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Últimas Publicaciones
        </h2>
        <div className="w-16 h-1 bg-[#e60000] mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map((pub) => (
          <Link 
            key={pub.id} 
            href={pub.href}
            className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <img 
                src={pub.image}
                alt={pub.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#e60000] transition-colors leading-tight line-clamp-2">
                {pub.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                {pub.excerpt}
              </p>
              <div className="text-[#e60000] font-semibold text-sm flex items-center gap-1 mt-auto">
                Leer artículo <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
