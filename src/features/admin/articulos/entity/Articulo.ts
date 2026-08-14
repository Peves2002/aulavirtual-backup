export interface Articulo {
  id: string
  titulo: string
  slug: string
  descripcion: string | null
  imagen_portada: string | null
  archivo_pdf: string | null
  categoria: string | null
  autor_id: string | null
  autor?: { id: string; nombre: string; apellido: string } | null
  estado: 'BORRADOR' | 'PUBLICADO'
  creado_en: string
  actualizado_en: string
}
