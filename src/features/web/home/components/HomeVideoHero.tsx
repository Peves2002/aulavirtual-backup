'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomeVideoHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#000000]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro para asegurar la legibilidad del texto sobre el video */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenido Central */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <h1
          className="text-white font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-8"
          style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}
        >
          No solo brindamos servicios,{' '}
          <span className="text-[#FFB600]">construimos confianza</span>
        </h1>

        <Link
          href="/cursos"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB600] text-[#000000] rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-[0_4px_14px_0_rgba(255,182,0,0.39)]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Ver nuestros programas <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  )
}
