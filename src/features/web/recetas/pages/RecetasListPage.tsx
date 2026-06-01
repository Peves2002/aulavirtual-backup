'use client'

import { RecetaCard } from '../components/RecetaCard'

type RecetaResumen = {
  id: string
  nombre: string
  slug: string
  imagen: string | null
  descripcion: string | null
}

type Props = {
  recetas: RecetaResumen[]
}

export function RecetasListPage({ recetas }: Props) {
  if (recetas.length === 0) {
    return (
      <section className='py-20 text-center'>
        <i className='tabler-tools-kitchen-2 text-6xl text-[#A8E060] block mb-4' />
        <p className='text-[#4A7018] text-lg'>No hay recetas disponibles por el momento.</p>
      </section>
    )
  }

  return (
    <section className='py-16 max-w-7xl mx-auto px-5 lg:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {recetas.map(receta => (
          <RecetaCard key={receta.id} {...receta} />
        ))}
      </div>
    </section>
  )
}
