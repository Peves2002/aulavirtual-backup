'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '../../cart/context/CartContext'
import { useCurrency } from '@/contexts/CurrencyContext'
import { formatCoursePrice } from '@/utils/functions/formatPrice'
import CourseThumbnail from '@/utils/components/CourseThumbnail'

interface CourseCardRedProps {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  precio_usd?: number | null
  moneda: string
  es_gratis: boolean
  profesor: {
    nombre: string
    apellido: string
    avatar?: string
  }
  es_comprado?: boolean
}

export default function CourseCardRed({
  id,
  titulo,
  slug,
  miniatura,
  precio,
  precio_usd,
  moneda,
  es_gratis,
  profesor,
  es_comprado
}: CourseCardRedProps) {
  const router = useRouter()
  const { addToCart, isInCart } = useCart()
  const { currency } = useCurrency()

  const inCart = isInCart(id)

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation()
    if (inCart) {
      router.push('/checkout')
      return
    }
    addToCart({ id, type: 'CURSO', titulo, slug, miniatura, precio, precio_usd, moneda })
  }

  return (
    <div 
      className="flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] cursor-pointer h-full border border-gray-100"
      onClick={() => router.push(`/cursos/${slug}`)}
    >
      <div className="relative w-full aspect-[16/10.5] overflow-hidden">
        <CourseThumbnail
          src={miniatura}
          title={titulo}
          aspectRatio="16/10.5"
        />
      </div>
      
      <div className="flex flex-col flex-grow p-4 md:p-5">
        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 min-h-[2.8rem] hover:text-[#e60000] transition-colors">
          {titulo}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
            {profesor?.avatar ? (
              <img src={profesor.avatar} alt={profesor.nombre} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                {profesor?.nombre?.charAt(0)}
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-gray-600 truncate">
            Por {profesor?.nombre} {profesor?.apellido}
          </p>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <span className="font-bold text-xl text-[#e60000]">
              {es_comprado ? 'Adquirido' : (es_gratis ? 'Gratis' : formatCoursePrice({ precio, precio_usd }, currency))}
            </span>
          </div>

          <div className="flex gap-2 w-full">
            <Link
              href={es_comprado ? `/estudiante/aprender/${slug}` : `/cursos/${slug}`}
              className="flex-1 flex justify-center items-center py-2.5 px-2 border-2 border-[#e60000] text-[#e60000] font-bold rounded-lg text-sm hover:bg-red-50 transition-colors text-center"
              onClick={(e) => e.stopPropagation()}
            >
              Ver más
            </Link>
            {!es_comprado && (
              <button
                onClick={handleAddToCart}
                className={`flex-[1.5] flex justify-center items-center py-2.5 px-2 font-bold rounded-lg text-sm transition-colors text-white shadow-md ${
                  inCart ? 'bg-green-600 hover:bg-green-700' : 'bg-[#e60000] hover:bg-red-700'
                }`}
              >
                {inCart ? 'Ir a pagar' : 'Añadir al carrito'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
