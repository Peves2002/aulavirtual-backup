export interface ItemInsumo {
  insumo: string
  cantidad: string
}

export interface GrupoInsumos {
  grupo: string
  items: ItemInsumo[]
}

export interface SeccionProcedimiento {
  seccion: string
  pasos: string[]
}

export interface Receta {
  id: string
  nombre: string
  slug: string
  imagen: string | null
  descripcion: string | null
  insumos: GrupoInsumos[]
  procedimiento: SeccionProcedimiento[]
  observaciones: string | null
  video_url: string | null
  esta_activo: boolean
  creado_en: string
  actualizado_en: string
}
