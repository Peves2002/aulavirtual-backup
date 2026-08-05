'use client'

import Link from 'next/link'

import { ArrowUpRight } from 'lucide-react'

import type { Escuela } from '../data/escuelas'

interface AdphEscuelasCarouselProps {
  escuelas: Escuela[]
}

export default function AdphEscuelasCarousel({ escuelas }: AdphEscuelasCarouselProps) {
  
  const renderCard = (escuela: Escuela) => {
    return (
      <Link 
        key={escuela.id} 
        href={`/escuelas/${escuela.id}`}
        className="group block rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] hover:shadow-2xl hover:shadow-[#08479b]/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden"
      >
        {/* Image container */}
        <div className="relative w-full h-[220px] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src={escuela.image} 
            alt={escuela.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Info box */}
        <div className="p-7 flex flex-col items-start gap-4 flex-grow bg-white relative z-20">
          <h3 className="text-slate-800 font-extrabold text-xl leading-tight font-manrope group-hover:text-[#08479b] transition-colors duration-300">
            {escuela.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-auto pt-5 border-t border-slate-100 w-full text-xs font-black text-[#fcd116] group-hover:text-[#08479b] transition-colors duration-300 uppercase tracking-widest">
            <span>Ver Programas</span>
            <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-[#08479b] group-hover:text-white flex items-center justify-center ml-auto transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {escuelas.map((escuela) => renderCard(escuela))}
      </div>
    </div>
  )
}

