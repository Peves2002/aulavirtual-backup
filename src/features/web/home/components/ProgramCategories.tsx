import Link from 'next/link'

const categories = [
  {
    id: 1,
    title: 'Diplomados y Especialización',
    description: 'Programas de alto nivel académico con docentes expertos y certificación universitaria.',
    buttonText: 'Ver Diplomados',
    href: '/diplomados',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Cursos Asincrónicos',
    description: 'Estudia a tu propio ritmo con clases grabadas y material de estudio descargable.',
    buttonText: 'Ver Cursos',
    href: '/cursos',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Certificaciones Digitales',
    description: 'Valida tus conocimientos con nuestros certificados digitales con código QR.',
    buttonText: 'Ver Certificaciones',
    href: '/verificar-certificado',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

export default function ProgramCategories() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className="group relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden flex flex-col justify-end p-8"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {cat.title}
              </h3>
              <p className="text-gray-300 mb-6 line-clamp-3 text-sm md:text-base">
                {cat.description}
              </p>
              <Link
                href={cat.href}
                className="inline-block bg-[#e60000] hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded transition-colors text-sm"
              >
                {cat.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
