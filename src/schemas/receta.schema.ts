import { z } from 'zod'

const itemInsumoSchema = z.object({
  insumo: z.string().min(1),
  cantidad: z.string().min(1)
})

const grupoInsumosSchema = z.object({
  grupo: z.string().min(1),
  items: z.array(itemInsumoSchema)
})

const seccionProcedimientoSchema = z.object({
  seccion: z.string().min(1),
  pasos: z.array(z.string().min(1))
})

export const crearRecetaSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  imagen: z.string().min(1).optional().nullable(),
  descripcion: z.string().optional().nullable(),
  insumos: z.array(grupoInsumosSchema).default([]),
  procedimiento: z.array(seccionProcedimientoSchema).default([]),
  observaciones: z.string().optional().nullable(),
  esta_activo: z.boolean().optional()
})

export const actualizarRecetaSchema = crearRecetaSchema.partial().extend({
  insumos: z.array(grupoInsumosSchema).optional(),
  procedimiento: z.array(seccionProcedimientoSchema).optional()
})

export const listarRecetasQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform(v => parseInt(v ?? '1', 10))
    .refine(v => v >= 1),
  limit: z
    .string()
    .optional()
    .transform(v => parseInt(v ?? '10', 10))
    .refine(v => v >= 1 && v <= 100),
  buscar: z.string().optional(),
  esta_activo: z
    .string()
    .optional()
    .transform(v => (v === 'true' ? true : v === 'false' ? false : undefined))
})

export type CrearRecetaDto = z.infer<typeof crearRecetaSchema>
export type ActualizarRecetaDto = z.infer<typeof actualizarRecetaSchema>
