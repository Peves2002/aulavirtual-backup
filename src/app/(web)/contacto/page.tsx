import { Contact } from '@/components/site/Contact'
import { PageHero } from '@/components/site/PageHero'

export const metadata = {
  title: 'Contacto | Incuba Cocina',
  description: 'Estamos aquí para ayudarte a empezar tu camino gastronómico.',
}

export default function ContactoPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title={<>Comunícate con <span className="text-[#A8E060]">Nosotros</span></>}
        subtitle="Estamos aquí para ayudarte a empezar tu camino gastronómico."
        imageSrc="/assets/CLASESPRESENCIALES/image4.webp"
      />
      <Contact />
    </div>
  )
}
