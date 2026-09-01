'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import { formatCoursePrice } from '@/utils/functions/formatPrice'

interface CourseCardCatalogProps {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  precio_usd?: number | null
  moneda: string
  es_gratis: boolean
  categoria?: { nombre: string }
  tipo?: string
}

export default function CourseCardCatalog({
  titulo,
  slug,
  miniatura,
  precio,
  precio_usd,
  moneda,
  es_gratis,
  categoria,
  tipo
}: CourseCardCatalogProps) {
  const router = useRouter()
  const { currency } = useCurrency()

  return (
    <div 
      className="flex flex-col bg-white border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/cursos/${slug}`)}
    >
      {/* Thumbnail with overlay text */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {miniatura ? (
          <img 
            src={miniatura} 
            alt={titulo} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
        {/* Gradient overlay for title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white font-bold text-sm md:text-base leading-tight text-center">
            {titulo}
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        <h4 className="font-bold text-gray-900 text-[15px] leading-snug mb-1">
          {titulo}
        </h4>
        
        <p className="text-gray-500 text-xs mb-2">
          {categoria?.nombre || 'General'}
        </p>
        
        <div className="font-bold text-gray-900 text-sm mb-4">
          {es_gratis ? 'Gratis' : formatCoursePrice({ precio, precio_usd }, currency)}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          <span className="text-[11px] px-2 py-0.5 border border-gray-300 text-gray-600 rounded">
            {tipo === 'DIPLOMADO' ? 'Diplomado' : 'Curso'}
          </span>
          {/* Si quieres mostrar más tags, puedes agregarlos aquí */}
        </div>

        <Link
          href={`/cursos/${slug}`}
          className="w-full text-center bg-[#e60000] hover:bg-red-700 text-white font-bold py-2.5 px-4 text-xs tracking-wide transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          SELECCIONAR OPCIONES
        </Link>
      </div>
    </div>
  )
}
