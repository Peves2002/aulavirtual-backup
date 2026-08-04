'use client'

import Link from 'next/link'

import { Sparkles, ArrowRight } from 'lucide-react'

export default function AdphNewsletter() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08479b]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06316b]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '45px 45px' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 bg-[#08479b]/20 text-[#5993e3] border border-[#08479b]/30 px-4 py-1.5 rounded-md font-bold text-xs uppercase tracking-widest font-manrope">
            <Sparkles className="w-3.5 h-3.5" /> Novedades
          </span>

          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight leading-tight font-manrope">
            Mantente al día con las mejores prácticas en Gestión Humana
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold max-w-xl mx-auto">
            Explora nuestros últimos artículos del blog, tendencias de salud ocupacional y herramientas prácticas organizacionales.
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center gap-2 bg-[#08479b] hover:bg-[#06316b] text-white font-extrabold px-8 py-4 transition-all duration-300 text-sm uppercase tracking-widest rounded-md font-manrope shadow-[0_4px_15px_rgba(8,71,155,0.3)] hover:-translate-y-1"
            >
              Ver Últimas Novedades
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
