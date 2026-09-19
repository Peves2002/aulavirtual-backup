import { Categoria } from '@/features/admin/categorias/entity'

export type EstadoCapacitacion = 'BORRADOR' | 'PUBLICADO' | 'ARCHIVADO'

export interface Capacitacion {
  id: string
  titulo: string
  slug: string
  descripcion: string | null
  dirigido_a: string | null
  temario: string | null
  proximas_fechas: string | null
  miniatura: string | null
  orden: number
  estado: EstadoCapacitacion
  creado_en: string
  actualizado_en: string
  categoria_id: string | null
  categoria?: Categoria | null
}

export interface CreateCapacitacionDTO {
  titulo: string
  slug?: string
  descripcion?: string
  dirigido_a?: string
  temario?: string
  proximas_fechas?: string
  miniatura?: string
  orden?: number
  estado?: EstadoCapacitacion
  categoria_id?: string
}

export interface UpdateCapacitacionDTO extends Partial<CreateCapacitacionDTO> {
  id: string
}
