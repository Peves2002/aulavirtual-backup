import { z } from 'zod'

export const evaluacionAdjuntosSchema = z.array(z.object({
  nombre: z.string().trim().min(1).max(255),
  url: z.string().max(2048).refine(value => {
    if (/^\/uploads\/[^\\\s]+$/.test(value)) return true

    try {
      return ['http:', 'https:'].includes(new URL(value).protocol)
    } catch {
      return false
    }
  }, 'URL de adjunto inválida')
})).max(20)

export type EvaluacionAdjunto = z.infer<typeof evaluacionAdjuntosSchema>[number]
