'use client'

import Image from 'next/image'
import Link from 'next/link'

type RecetaCardProps = {
  nombre: string
  slug: string
  imagen: string | null
  descripcion: string | null
}

export function RecetaCard({ nombre, slug, imagen, descripcion }: RecetaCardProps) {
  return (
    <Link href={`/recetas/${slug}`} className='group block'>
      <div className='rounded-2xl overflow-hidden bg-[#F7FBF0] border border-[#A8E060]/20 hover:border-[#5A9020]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
        <div className='relative aspect-[4/3] overflow-hidden bg-[#EAF7D0]'>
          {imagen ? (
            <Image
              src={imagen}
              alt={nombre}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <i className='tabler-tools-kitchen-2 text-6xl text-[#A8E060]' />
            </div>
          )}
        </div>
        <div className='p-5'>
          <h3 className='font-bold text-lg text-[#1A3A0A] mb-2 group-hover:text-[#5A9020] transition-colors duration-200 line-clamp-2'>
            {nombre}
          </h3>
          {descripcion && (
            <p className='text-[#4A7018] text-sm line-clamp-2'>{descripcion}</p>
          )}
          <div className='mt-4 flex items-center gap-1 text-[#5A9020] text-sm font-semibold'>
            <span>Ver receta</span>
            <i className='tabler-arrow-right text-base' />
          </div>
        </div>
      </div>
    </Link>
  )
}
