import { z } from 'zod'

export const crearCertificadoManualSchema = z.object({
  usuario_id: z.string().uuid('Selecciona un estudiante'),
  curso_id: z.string().uuid('Selecciona un curso'),
  fecha_emision: z.string().trim().optional().nullable(),
  fecha_inicio_curso: z.string().trim().optional().nullable(),
  fecha_culminacion: z.string().trim().optional().nullable(),
  nota_final: z.coerce.number().min(0, 'La nota no puede ser negativa').max(100, 'La nota no puede exceder 100').optional().nullable(),
  duracion: z.string().trim().max(50, 'La duración no puede exceder 50 caracteres').optional().nullable()
})

export type CrearCertificadoManualDto = z.infer<typeof crearCertificadoManualSchema>
