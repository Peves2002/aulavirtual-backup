export interface Video {
  id: string
  url: string
  titulo?: string | null
  creado_en: string | Date
  actualizado_en: string | Date
}

export interface CreateVideoDto {
  url: string
  titulo?: string | null
}

export interface UpdateVideoDto {
  url?: string
  titulo?: string | null
}
