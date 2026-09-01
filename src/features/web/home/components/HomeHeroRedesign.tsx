import Link from 'next/link'

export default function HomeHeroRedesign() {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] flex flex-col justify-end mt-16 md:mt-20">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0 bg-[#0f172a]">
        <img 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Profesional" 
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 pt-32 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Especialízate en <span className="text-[#e60000]">Derecho Penal</span> y fortalece tu <span className="text-[#e60000]">perfil profesional</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
            Domina el derecho con los mejores especialistas y alcanza el siguiente nivel en tu carrera.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/diplomados"
              className="bg-[#e60000] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded flex items-center gap-2 transition-colors"
            >
              Ver diplomados
            </Link>
            <Link 
              href="/contacto"
              className="border-2 border-white/50 hover:border-white text-white font-semibold py-3 px-8 rounded flex items-center gap-2 transition-colors backdrop-blur-sm"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Red Stats Bar */}
      <div className="relative z-20 w-full bg-[#e60000]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/20">
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2 md:gap-4 pt-4 md:pt-0">
              <span className="text-4xl md:text-5xl font-bold tracking-tight">+200MIL</span>
              <div className="flex flex-col text-sm md:text-base font-medium leading-tight text-white/90 justify-center">
                <span>Alumnos</span>
                <span>Inscritos</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2 md:gap-4 pt-4 md:pt-0 pl-0 md:pl-8">
              <span className="text-4xl md:text-5xl font-bold tracking-tight">+70</span>
              <div className="flex flex-col text-sm md:text-base font-medium leading-tight text-white/90 justify-center">
                <span>Programas</span>
                <span>Únicos</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2 md:gap-4 pt-4 md:pt-0 pl-0 md:pl-8">
              <span className="text-4xl md:text-5xl font-bold tracking-tight">+32</span>
              <div className="flex flex-col text-sm md:text-base font-medium leading-tight text-white/90 justify-center">
                <span>Docentes</span>
                <span>Expertos</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
