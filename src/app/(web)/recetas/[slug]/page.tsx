import { notFound } from 'next/navigation'

import { RecetaDetallePage } from '@/features/web/recetas/pages/RecetaDetallePage'
import { AxiosWebRecetas } from '@/features/web/recetas/http/axiosWebRecetas'

const BASE = 'https://incubacocina.com'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  try {
    const client = new AxiosWebRecetas()
    const { receta } = await client.getBySlug(params.slug)

    const url = `${BASE}/recetas/${params.slug}`
    const description = receta.descripcion || `Receta de ${receta.nombre} — técnicas y preparación paso a paso`
    const image = receta.imagen || `${BASE}/og-default.jpg`

    return {
      title: receta.nombre,
      description,
      keywords: `${receta.nombre}, receta, cocina profesional, gastronomía, Incuba Cocina`,
      alternates: { canonical: url },
      openGraph: {
        title: receta.nombre,
        description,
        url,
        type: 'article',
        images: [{ url: image, width: 1200, height: 630, alt: receta.nombre }],
      },
      twitter: {
        card: 'summary_large_image',
        title: receta.nombre,
        description,
        images: [image],
      },
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
