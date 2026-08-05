'use client'

import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

interface ProgramCardViewProps {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  categoria?: {
    nombre: string
  }
  duracion?: string | null
}

export default function ProgramCardView({
  titulo,
  slug,
  miniatura,
  categoria,
  duracion
}: ProgramCardViewProps) {
  return (
    <Link href={`/programas/${slug}`} className="block relative h-[450px] rounded-[2rem] overflow-hidden group shadow-lg w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={miniatura || '/images/default-course.jpg'} 
        alt={titulo} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
      
      {/* Top Tag */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {duracion || 'FLEXIBLE'}
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#08479b] group-hover:border-[#08479b] transition-colors">
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Content Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="w-12 h-1 bg-[#fcd116] mb-6 rounded-full transform origin-left transition-all duration-300 group-hover:w-20"></div>
        <h3 className="text-white font-black text-2xl leading-tight mb-3">
          {titulo}
        </h3>
        <p className="text-white/70 text-sm font-medium">
          {categoria?.nombre || 'Categoría General'}
        </p>
      </div>
    </Link>
  )
}
