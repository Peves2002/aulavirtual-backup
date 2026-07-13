import { z } from 'zod'

// Match youtube.com, youtu.be, youtube-nocookie.com, etc.
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/

export const crearVideoSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'La URL es requerida')
    .regex(youtubeRegex, 'Debe ser una URL de YouTube válida'),
  titulo: z
    .string()
    .trim()
    .max(200, 'El título no puede exceder 200 caracteres')
    .optional()
    .nullable(),
})

export type CrearVideoDto = z.infer<typeof crearVideoSchema>

export const actualizarVideoSchema = crearVideoSchema.partial()

export type ActualizarVideoDto = z.infer<typeof actualizarVideoSchema>
