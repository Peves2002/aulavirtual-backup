import { SubscriptionSection } from '@/components/site/SubscriptionSection'
import { PageHero } from '@/components/site/PageHero'

export const metadata = {
  title: 'Plan Premium - Incuba Cocina',
  description: 'Adquiere tu suscripción premium y accede a todos nuestros cursos, recetarios y asesoría personalizada de por vida.',
}

export default function PlanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Plan Premium"
        subtitle="Suscríbete a nuestro plan mensual. Accede a todos los cursos, recetarios y asesoría exclusiva."
        imageSrc="/assets/CLASESPRESENCIALES/image.webp"
      />
      <SubscriptionSection />
    </div>
  )
}
