export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { crearRecetaSchema, listarRecetasQuerySchema } from '@/schemas/receta.schema'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function generateUniqueSlug(nombre: string, excludeId?: string): Promise<string> {
  const slug = generateSlug(nombre)
  let counter = 0
  let candidateSlug = slug

  while (true) {
    const existing = await prisma.receta.findUnique({ where: { slug: candidateSlug } })

    if (!existing || existing.id === excludeId) return candidateSlug

    counter++
    candidateSlug = `${slug}-${counter}`
  }
}

/**
 * GET /api/recetas
 * Listar recetas con paginación y búsqueda (solo ADMIN)
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    const validation = validateRequest(listarRecetasQuerySchema, query, request)

    if (!validation.success) return validation.error

    const { page, limit, buscar, esta_activo } = validation.data

    const where: any = {}

    if (esta_activo !== undefined) where.esta_activo = esta_activo

    if (buscar) {
      where.OR = [
        { nombre: { contains: buscar, mode: 'insensitive' } },
        { slug: { contains: buscar, mode: 'insensitive' } }
      ]
    }

    const skip = (page - 1) * limit

    const [recetas, total] = await Promise.all([
      prisma.receta.findMany({ where, skip, take: limit, orderBy: { creado_en: 'desc' } }),
      prisma.receta.count({ where })
    ])

    return ApiResponse.success(request, {
      recetas,
      paginacion: { total, page, limit, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/recetas
 * Crear una nueva receta (solo ADMIN)
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const validation = validateRequest(crearRecetaSchema, body, request)

    if (!validation.success) return validation.error

    const { nombre, imagen, descripcion, insumos, procedimiento, observaciones, esta_activo } = validation.data

    const slug = await generateUniqueSlug(nombre)

    const receta = await prisma.receta.create({
      data: {
        nombre,
        slug,
        imagen: imagen ?? null,
        descripcion: descripcion ?? null,
        insumos: insumos as any,
        procedimiento: procedimiento as any,
        observaciones: observaciones ?? null,
        esta_activo: esta_activo ?? true
      }
    })

    return ApiResponse.success(request, { receta }, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
