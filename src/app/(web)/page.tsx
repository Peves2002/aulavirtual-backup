import { Hero } from '@/components/site/Hero'
import { Services } from '@/components/site/Services'
import { TestimonialsCta } from '@/components/site/TestimonialsCta'
import { Recetas } from '@/components/site/Recetas'

export const metadata = {
  title: 'Incuba Cocina - Escuela de Cocina y Emprendimiento',
  description: 'Cursos cortos de cocina y emprendimiento gastronómico. Aprende recetas profesionales, costea y vende.',
}

export default function HomePage() {
  return (
    <div className="bg-transparent">
      <Hero />
      <Services />
      <TestimonialsCta />
      <Recetas />
    </div>
  )
}
