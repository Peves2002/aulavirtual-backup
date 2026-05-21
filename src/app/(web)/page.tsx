import { Hero } from '@/components/site/Hero'
import { Services } from '@/components/site/Services'
import { TestimonialsCta } from '@/components/site/TestimonialsCta'

export const metadata = {
  title: 'Incuba Cocina - Escuela de Cocina y Emprendimiento',
  description: 'Cursos cortos de cocina y emprendimiento gastronómico. Aprende recetas profesionales, costea y vende.',
}

export default function HomePage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <Hero />
      <Services />
      <TestimonialsCta />
    </div>
  )
}
