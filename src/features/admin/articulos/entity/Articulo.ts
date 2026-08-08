export interface Articulo {
  id: string
  titulo: string
  descripcion: string | null
  imagen_portada: string | null
  archivo_pdf: string
  creado_en: string
  actualizado_en: string
}
