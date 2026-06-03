'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import { Check, Repeat2, BookOpen, Star, Sparkles } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'
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
      <div className="text-center py-20 px-6 max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-up">
        <Repeat2 size={48} className="mx-auto mb-4 text-gray-300 animate-spin" style={{ animationDuration: '4s' }} />
        <h3 className="font-display font-bold text-lg text-[#1A3A0A] mb-2">No hay planes disponibles</h3>
        <p className="text-gray-500 text-sm">
          Estamos configurando los mejores planes para ti. Por favor, vuelve a intentarlo más tarde o contáctanos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
      {planes.map(plan => {
        const isHovered = hoveredId === plan.id
        const esTrimestral = plan.intervalo === 'TRIMESTRAL'
        const esPopular = esTrimestral // Destacamos el plan trimestral como recomendado
        const beneficios: string[] = Array.isArray(plan.beneficios) ? plan.beneficios : []
        const tieneBeneficios = beneficios.length > 0

        return (
          <div
            key={plan.id}
            onMouseEnter={() => setHoveredId(plan.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative flex flex-col justify-between bg-white border border-[#A8E060]/30 rounded-[32px] p-8 transition-all duration-300 ${
              isHovered 
                ? 'shadow-2xl -translate-y-2' 
                : 'shadow-lg hover:shadow-xl'
            }`}
          >

            <div>
              {/* Plan Interval Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7D0] text-[#2D5010] text-[11px] font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A9020]"></span>
                {INTERVALO_LABELS[plan.intervalo]}
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-2xl text-[#1A3A0A] mb-3">
                {plan.nombre}
              </h3>

              {plan.descripcion && (
                <p className="text-gray-500 text-[13px] mb-6 leading-relaxed">
                  {plan.descripcion}
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-[#1A3A0A]">
                  {plan.moneda === 'PEN' ? 'S/' : '$'}
                </span>
                <span className="text-5xl font-display font-black text-[#1A3A0A] tracking-tight">
                  {Number(plan.precio).toFixed(0)}
                </span>
                <span className="text-sm font-bold text-gray-400">
                  /{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}
                </span>
              </div>

              {plan.dias_prueba > 0 && (
                <span className="inline-block mb-6 bg-[#EAF7D0] text-[#2D5010] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {plan.dias_prueba} días de prueba gratis
                </span>
              )}

              <div className="h-px w-full bg-gray-100 mb-6"></div>

              {/* Beneficios */}
              <div className="mb-8">
                {tieneBeneficios ? (
                  <>
                    <p className="font-display text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                      ¿Qué incluye este plan?
                    </p>
                    <ul className="space-y-3">
                      {beneficios.map((beneficio, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-[#EAF7D0] flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-[#5A9020]" strokeWidth={3} />
                          </div>
                          <span className="text-[#1A3A0A] text-[14px] leading-snug">
                            {beneficio}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.cursos.length > 0 && (
                      <div className="flex items-center gap-2 mt-6 p-3 bg-[#F7FBF0] border border-[#EAF7D0] rounded-2xl">
                        <BookOpen size={16} className="text-[#5A9020]" />
                        <span className="font-display text-[12px] text-[#2D5010] font-semibold">
                          {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''} incluido{plan.cursos.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-display text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Incluye {plan.cursos.length} curso{plan.cursos.length !== 1 ? 's' : ''}
                    </p>
                    <ul className="space-y-3">
                      {plan.cursos.slice(0, 5).map(c => (
                        <li key={c.curso_id} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-[#EAF7D0] flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-[#5A9020]" strokeWidth={3} />
                          </div>
                          <span className="text-[#1A3A0A] text-[14px] leading-snug">
                            {c.curso.titulo}
                          </span>
                        </li>
                      ))}
                      {plan.cursos.length > 5 && (
                        <li className="pl-8 text-[12px] text-gray-400 font-medium">
                          +{plan.cursos.length - 5} cursos más en el catálogo
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSuscribirse(plan)}
              className="cursor-pointer w-full font-bold text-[15px] rounded-full py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center bg-[#0A1A04] text-white hover:bg-black"
            >
              Suscribirse ahora
            </button>
          </div>
        )
      })}
    </div>
  )
}
