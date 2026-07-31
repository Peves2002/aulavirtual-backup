import { z } from 'zod'

// ---------------------------------------------------------------------------
// Crear Curso (Paso 1 del wizard: info básica)
// ---------------------------------------------------------------------------
export const crearCursoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres'),
  descripcion: z.string().trim().max(5000, 'La descripción no puede exceder 5000 caracteres').optional(),
  categoria_id: z.string().uuid('ID de categoría inválido').optional().nullable(),
  escuela: z.string().optional().nullable(),
  tipo: z.enum(['CURSO', 'DIPLOMADO', 'ESPECIALIZACION']).default('CURSO'),
  profesor_id: z.string().uuid('ID de profesor inválido'),
  tipo_emision: z.enum(['SINCRONO', 'ASINCRONO', 'MIXTO']).default('ASINCRONO'),

  // Paso 2: Configuración y precio (opcional al crear)
  es_gratis: z.boolean().default(false),
  es_destacado: z.boolean().optional().default(false),
  precio: z.coerce.number().min(0, 'El precio no puede ser negativo').default(0),
  precio_falso: z.coerce.number().min(0, 'El precio falso no puede ser negativo').default(0),
  moneda: z.string().max(3).default('PEN'),
  duracion: z.string().max(50).optional().nullable(),
  codigo: z.string().max(20).optional().nullable(),

  // Paso 3: Media (opcional al crear)
  miniatura: z.string().optional().nullable(),
  video_presentacion: z.string().optional().nullable(),
  brochure: z.string().optional().nullable(),
  fecha_inicio: z.string().optional().nullable(),
  fecha_fin: z.string().optional().nullable(),
  vigencia_meses: z.coerce.number().int().positive().optional().nullable(),
  nivel: z.enum(['BASICO', 'INTERMEDIO', 'AVANZADO']).optional().nullable()
})

export type CrearCursoDto = z.infer<typeof crearCursoSchema>

// ---------------------------------------------------------------------------
// Actualizar Curso
// ---------------------------------------------------------------------------
export const actualizarCursoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres')
    .optional(),
  descripcion: z.string().trim().max(5000, 'La descripción no puede exceder 5000 caracteres').optional().nullable(),
  categoria_id: z.string().uuid('ID de categoría inválido').optional().nullable(),
  escuela: z.string().optional().nullable(),
  tipo: z.enum(['CURSO', 'DIPLOMADO', 'ESPECIALIZACION']).optional(),
  profesor_id: z.string().uuid('ID de profesor inválido').optional(),
  tipo_emision: z.enum(['SINCRONO', 'ASINCRONO', 'MIXTO']).optional(),
  nivel: z.enum(['BASICO', 'INTERMEDIO', 'AVANZADO']).optional().nullable(),
  es_gratis: z.boolean().optional(),
  es_destacado: z.boolean().optional(),
  es_privado: z.boolean().optional(),
  completar_automatico: z.boolean().optional(),
  precio_certificado: z.coerce.number().min(0).optional().nullable(),
  precio: z.coerce.number().min(0, 'El precio no puede ser negativo').optional(),
  precio_falso: z.coerce.number().min(0, 'El precio falso no puede ser negativo').optional(),
  moneda: z.string().max(3).optional(),
  duracion: z.string().max(50).optional().nullable(),
  codigo: z.string().max(20).optional().nullable(),
  miniatura: z.string().optional().nullable(),
  video_presentacion: z.string().optional().nullable(),
  brochure: z.string().optional().nullable(),
  fecha_inicio: z.string().optional().nullable(),
  fecha_fin: z.string().optional().nullable(),
  vigencia_meses: z.coerce.number().int().positive().optional().nullable(),
  objetivos: z.array(z.string()).optional(),
  metodologia: z.array(z.any()).optional(),
  beneficios: z.array(z.any()).optional(),
  incluye: z.array(z.any()).optional(),
  perfil_estudiante: z.string().optional().nullable(),
  salidas_profesionales: z.array(z.any()).optional(),
  testimonios: z.array(z.any()).optional(),

  // Flags de visibilidad de secciones
  mostrar_beneficios: z.boolean().optional(),
  mostrar_metodologia: z.boolean().optional(),
  mostrar_objetivos: z.boolean().optional(),
  mostrar_salidas: z.boolean().optional(),
  mostrar_perfil: z.boolean().optional(),
  mostrar_incluye: z.boolean().optional(),
  mostrar_admision: z.boolean().optional(),
  mostrar_becas: z.boolean().optional(),
  mostrar_certificaciones: z.boolean().optional(),
  mostrar_director: z.boolean().optional(),
  mostrar_empresas: z.boolean().optional(),
  mostrar_faqs: z.boolean().optional(),
  mostrar_herramientas: z.boolean().optional(),
  mostrar_por_que_estudiar: z.boolean().optional(),
  mostrar_por_que_nosotros: z.boolean().optional(),
  mostrar_rankings: z.boolean().optional(),
  mostrar_relacionados: z.boolean().optional(),
  mostrar_acompanamiento: z.boolean().optional(),

  // Campos de contenido premium
  director: z.string().optional().nullable(),
  por_que_estudiar: z.string().optional().nullable(),
  por_que_nosotros: z.string().optional().nullable(),
  proceso_admision: z.string().optional().nullable(),
  titulo_admision: z.string().optional().nullable(),
  requisitos_admision: z.string().optional().nullable(),
  ayudas_becas: z.string().optional().nullable(),
  certificaciones: z.array(z.any()).optional(),
  titulo_certificaciones: z.string().optional().nullable(),
  herramientas: z.array(z.any()).optional(),
  acompanamiento: z.string().optional().nullable(),
  empresas_alumnos: z.array(z.any()).optional(),
  rankings: z.array(z.any()).optional(),
  faqs: z.array(z.any()).optional(),
  programas_relacionados: z.array(z.any()).optional(),
  titulo_programa: z.string().optional().nullable(),
  titulo_plan_estudios: z.string().optional().nullable(),
  titulo_salidas: z.string().optional().nullable()
})

export type ActualizarCursoDto = z.infer<typeof actualizarCursoSchema>

// ---------------------------------------------------------------------------
// Cambiar estado del curso
// ---------------------------------------------------------------------------
export const cambiarEstadoCursoSchema = z.object({
  estado: z.enum(['BORRADOR', 'PUBLICADO', 'ARCHIVADO'])
})

export type CambiarEstadoCursoDto = z.infer<typeof cambiarEstadoCursoSchema>

// ---------------------------------------------------------------------------
// Query params para listar cursos
// ---------------------------------------------------------------------------
export const listarCursosQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  buscar: z.string().optional(),
  estado: z.enum(['BORRADOR', 'PUBLICADO', 'ARCHIVADO', '']).optional(),
  categoria_id: z.string().uuid().optional(),
  tipo: z.enum(['CURSO', 'DIPLOMADO', 'ESPECIALIZACION']).optional(),
  profesor_id: z.string().uuid().optional()
})

export type ListarCursosQuery = z.infer<typeof listarCursosQuerySchema>
