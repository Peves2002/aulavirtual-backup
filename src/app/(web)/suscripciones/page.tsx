import { PlanesPublicos } from '@/features/web/suscripciones/components/PlanesPublicos'
import PageHeader from '@/features/web/atd/PageHeader'
import type { PlanPublico } from '@/features/estudiante/suscripciones/entity/Suscripcion'

export const metadata = {
  title: 'Planes de Suscripción | Aula Virtual',
  description: 'Accede a todos nuestros cursos con un plan de suscripción mensual, trimestral, semestral o anual.'
}

async function getPlanes(): Promise<PlanPublico[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/planes-suscripcion`, { cache: 'no-store' })

    if (!res.ok) return []
    const data = await res.json()

    return data?.result?.planes ?? []
  } catch {
    return []
  }
}

const faqs = [
  { q: '¿Puedo cancelar en cualquier momento?', r: 'Sí. Puedes cancelar tu suscripción desde tu panel de estudiante y no se realizarán más cobros.' },
  { q: '¿Qué pasa si vence mi suscripción?', r: 'Perderás el acceso a los cursos del plan, pero tu progreso se guarda. Puedes reactivar cuando quieras.' },
  { q: '¿Puedo suscribirme a varios planes?', r: 'Actualmente cada cuenta admite un plan activo a la vez.' },
]

export default async function SuscripcionesPage() {
  const planes = await getPlanes()

  return (
    <>
      <PageHeader
        eyebrow="Acceso ilimitado"
        title={<>Un plan para <span className="text-gradient-primary">todos tus cursos</span></>}
        subtitle="Accede a múltiples cursos por un precio fijo recurrente. Cancela cuando quieras."
      />

      <section className="container py-12">
        <PlanesPublicos planes={planes} />
      </section>

      {planes.length > 0 && (
        <section className="container pb-24 max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas frecuentes</h2>
          <div className="space-y-0">
            {faqs.map(({ q, r }) => (
              <div key={q} className="border-b border-white/5 py-5">
                <p className="font-semibold mb-1.5">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
