export type EstadoProductoIA = 'BORRADOR' | 'PUBLICADO' | 'ARCHIVADO'

export interface ProductoIA {
  id: string
  titulo: string
  slug: string
  descripcion?: string | null
  miniatura?: string | null
  estado: EstadoProductoIA
  precio: number
  precio_falso?: number | null
  moneda: string
  es_gratis: boolean
  categoria?: string | null
  url_acceso?: string | null
  url_regalo?: string | null
  creado_en: string
  actualizado_en: string
}

export interface ProductoIAListaItem {
  id: string
  titulo: string
  slug: string
  miniatura?: string | null
  estado: EstadoProductoIA
  precio: number
  moneda: string
  es_gratis: boolean
  categoria?: string | null
  creado_en: string
}

export interface CrearProductoIADto {
  titulo: string
  descripcion?: string
  miniatura?: string
  estado?: EstadoProductoIA
  precio?: number
  precio_falso?: number
  moneda?: string
  es_gratis?: boolean
  categoria?: string
  url_acceso?: string
  url_regalo?: string
}

export type ActualizarProductoIADto = Partial<CrearProductoIADto>
