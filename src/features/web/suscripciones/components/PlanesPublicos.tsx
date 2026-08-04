'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import { Check, Repeat2, BookOpen } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'
import { Card } from '@/features/web/atd/ui/card'
import { Button } from '@/features/web/atd/ui/button'
import type { PlanPublico } from '@/features/estudiante/suscripciones/entity/Suscripcion'
import { INTERVALO_LABELS } from '@/features/estudiante/suscripciones/entity/Suscripcion'

interface PlanesPublicosProps {
  planes: PlanPublico[]
}

export function PlanesPublicos({ planes }: PlanesPublicosProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { openLogin } = useAuthModal()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSuscribirse = (plan: PlanPublico) => {
    if (!session?.user) {
      openLogin(`/suscripciones/checkout/${plan.id}`)

      return
    }

    router.push(`/suscripciones/checkout/${plan.id}`)
  }

  if (planes.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Repeat2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p>No hay planes disponibles en este momento.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {planes.map(plan => {
        const isHovered = hoveredId === plan.id
        const beneficios: string[] = Array.isArray(plan.beneficios) ? plan.beneficios : []
        const tieneBeneficios = beneficios.length > 0

        return (
          <Card
            key={plan.id}
            onMouseEnter={() => setHoveredId(plan.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`p-8 bg-card/50 flex flex-col transition-all ${isHovered ? 'border-primary/50 -translate-y-1' : 'border-white/5'}`}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 mb-3">
                <Repeat2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">{INTERVALO_LABELS[plan.intervalo]}</span>
              </div>

              <h3 className="text-xl font-bold mb-2">{plan.nombre}</h3>

              {plan.descripcion && (
                <p className="text-sm text-muted-foreground leading-relaxed">{plan.descripcion}</p>
              )}
            </div>

            {/* Precio */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-muted-foreground">{plan.moneda === 'PEN' ? 'S/' : '$'}</span>
                <span className="text-4xl font-bold">{Number(plan.precio).toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">/{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}</span>
              </div>

              {plan.dias_prueba > 0 && (
                <span className="inline-block mt-2 rounded-full bg-secondary/15 text-secondary text-xs font-semibold px-2.5 py-1">
                  {plan.dias_prueba} días gratis
                </span>
              )}
            </div>

            {/* Beneficios o cursos */}
            <div className="flex-1 mb-6">
              {tieneBeneficios ? (
                <>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">¿Qué incluye?</p>
                  <ul className="space-y-2">
                    {beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.cursos.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-lg bg-muted">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''} incluido{plan.cursos.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Incluye {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''}
                  </p>
                  <ul className="space-y-2">
                    {plan.cursos.slice(0, 5).map(c => (
                      <li key={c.curso_id} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{c.curso.titulo}</span>
                      </li>
                    ))}
                    {plan.cursos.length > 5 && (
                      <li className="pl-6 text-xs text-muted-foreground">
                        +{plan.cursos.length - 5} cursos más
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>

            {/* CTA */}
            <Button variant="hero" size="lg" className="w-full" onClick={() => handleSuscribirse(plan)}>
              Suscribirse ahora
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
