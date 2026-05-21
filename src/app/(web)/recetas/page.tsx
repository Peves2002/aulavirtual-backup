import { Recetas } from '@/components/site/Recetas'
import { FinalCta } from '@/components/site/FinalCta'
import { PageHero } from '@/components/site/PageHero'

export const metadata = {
  title: 'Recetas | Incuba Cocina',
  description: 'Descubre las increíbles recetas que aprenderás a preparar y vender.',
}

export default function RecetasPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <PageHero 
        title={<>Nuestras <span className="text-[#A8E060]">Recetas</span></>}
        subtitle="Descubre las increíbles recetas que aprenderás a preparar y vender."
        imageSrc="/assets/hero.png"
        imagePosition="top"
      />
      <Recetas />
      <div className="mt-auto">
        <FinalCta />
      </div>
    </div>
  )
}
