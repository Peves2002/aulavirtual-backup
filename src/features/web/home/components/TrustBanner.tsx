import Link from 'next/link'

export default function TrustBanner() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-[#e2e8f0] py-16 mt-12 border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Más de 20,000 profesionales confían en <span className="text-[#e60000]">EGEC PERÚ</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Únete a la comunidad más grande de profesionales del derecho y gestión pública. Impulsa tu carrera hoy mismo.
        </p>
        <Link
          href="/cursos"
          className="inline-block bg-[#e60000] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
        >
          ¡Inicia tu curso ahora!
        </Link>
      </div>
    </section>
  )
}
