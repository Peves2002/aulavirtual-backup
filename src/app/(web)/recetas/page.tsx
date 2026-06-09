import { PageHero } from '@/components/site/PageHero'
import { RecetasListPage } from '@/features/web/recetas/pages/RecetasListPage'
import { AxiosWebRecetas } from '@/features/web/recetas/http/axiosWebRecetas'

export const metadata = {
  title: "Recetas",
  description: 'Descubre nuestras recetas y aprende las técnicas de cocina profesional.'
}

async function getData() {
  try {
    const client = new AxiosWebRecetas()
    const { recetas } = await client.getAll()

    return recetas
  } catch {
    return []
  }
}

export default async function RecetasPage() {
  const recetas = await getData()

  return (
    <div className='flex flex-col min-h-screen'>
      <PageHero
        title='Nuestras Recetas'
        subtitle='Aprende las técnicas, conoce los insumos y domina cada preparación.'
        imageSrc='https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'
      />
      <RecetasListPage recetas={recetas} />
    </div>
  )
}
