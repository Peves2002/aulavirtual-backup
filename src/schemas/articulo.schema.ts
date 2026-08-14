import { z } from 'zod'

// ---------------------------------------------------------------------------
// Crear Articulo
// ---------------------------------------------------------------------------
export const crearArticuloSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres'),
  slug: z.string().trim().max(220).optional().nullable(),
  descripcion: z.string().max(200000, 'El contenido es demasiado extenso').optional().nullable(),
  imagen_portada: z.string().optional().nullable(),
  archivo_pdf: z.string().optional().nullable(),
  categoria: z.string().trim().max(100).optional().nullable(),
  autor_id: z.string().uuid('ID de autor inválido').optional().nullable(),
  estado: z.enum(['BORRADOR', 'PUBLICADO']).default('BORRADOR')
})

export type CrearArticuloDto = z.infer<typeof crearArticuloSchema>

// ---------------------------------------------------------------------------
// Actualizar Articulo
// ---------------------------------------------------------------------------
export const actualizarArticuloSchema = crearArticuloSchema.partial()

export type ActualizarArticuloDto = z.infer<typeof actualizarArticuloSchema>
