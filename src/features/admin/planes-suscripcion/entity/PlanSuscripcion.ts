export type IntervaloSuscripcion = 'MENSUAL' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL'

// Representa un curso EXCLUIDO del plan: la suscripción da acceso a todos los
// cursos de la plataforma salvo los listados en PlanSuscripcion.cursos.
export interface CursoEnPlan {
  plan_id: string
  curso_id: string
  curso: {
    id: string
    titulo: string
    estado: string
  }
}

export interface PlanSuscripcion {
  id: string
  nombre: string
  descripcion: string | null
  precio: number
  moneda: string
  intervalo: IntervaloSuscripcion
  culqi_interval_unit: number
  culqi_interval_count: number
  dias_prueba: number
  esta_activo: boolean
  beneficios: string[]
  culqi_plan_id: string | null
  culqi_short_name: string | null
  creado_en: string
  actualizado_en: string
  cursos: CursoEnPlan[]
  _count?: {
    suscripciones: number
    cursos: number
  }
}

export interface PlanPayload {
  nombre: string
  descripcion?: string | null
  precio: number
  moneda: string
  intervalo: IntervaloSuscripcion

  // Ya no se edita desde el admin: no está conectado al cobro real en Culqi.
  dias_prueba?: number
  esta_activo: boolean
  beneficios?: string[]

  // IDs de cursos a EXCLUIR del plan (vacío = acceso a todos los cursos)
  cursoIds: string[]
}

export const INTERVALO_LABELS: Record<IntervaloSuscripcion, string> = {
  MENSUAL: 'Mensual',
  TRIMESTRAL: 'Trimestral',
  SEMESTRAL: 'Semestral',
  ANUAL: 'Anual'
}
