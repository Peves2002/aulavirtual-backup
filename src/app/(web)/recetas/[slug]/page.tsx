import { notFound } from 'next/navigation'

import { RecetaDetallePage } from '@/features/web/recetas/pages/RecetaDetallePage'
import { AxiosWebRecetas } from '@/features/web/recetas/http/axiosWebRecetas'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  try {
    const client = new AxiosWebRecetas()
    const { receta } = await client.getBySlug(params.slug)

    return {
      title: `${receta.nombre} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      description: receta.descripcion || `Receta de ${receta.nombre}`
    }
  } catch {
    return { title: 'Receta no encontrada' }
  }
}

export default async function RecetaSlugPage({ params }: Props) {
  try {
    const client = new AxiosWebRecetas()
    const { receta } = await client.getBySlug(params.slug)

    return <RecetaDetallePage receta={receta} />
  } catch {
    notFound()
  }
}
