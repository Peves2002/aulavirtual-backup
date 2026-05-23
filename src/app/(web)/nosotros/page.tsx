import { Story } from '@/components/site/Story'
import { MissionVision } from '@/components/site/MissionVision'
import { HowItWorks } from '@/components/site/HowItWorks'
import { PageHero } from '@/components/site/PageHero'

export const metadata = {
  title: 'Nosotros | Incuba Cocina',
  description: 'Nacimos para transformar el talento en ingresos reales.',
}

export default function NosotrosPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={<>Sobre <span className="text-[#A8E060]">Nosotros</span></>}
        subtitle="Nacimos para transformar el talento en ingresos reales."
        imageSrc="/assets/CursodeGestionrestaurantes/image3.webp"
      />
      <Story />
      <MissionVision />
      <HowItWorks />
    </div>
  )
}
