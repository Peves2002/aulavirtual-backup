import { Galeria } from '@/components/site/Galeria'
import { FinalCta } from '@/components/site/FinalCta'
import { PageHero } from '@/components/site/PageHero'

export const metadata = {
  title: 'Galería | Incuba Cocina',
  description: 'Descubre la experiencia de aprender y emprender con nosotros en acción.',
}

export default function GaleriaPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <PageHero 
        title={<>Nuestra <span className="text-[#A8E060]">Galería</span></>}
        subtitle="Descubre la experiencia de aprender y emprender con nosotros en acción."
        imageSrc="/assets/CLASESPRESENCIALES/image9.webp"
      />
      <Galeria />
      <div className="mt-auto">
        <FinalCta />
      </div>
    </div>
  )
}
