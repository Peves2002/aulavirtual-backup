export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { actualizarRecetaSchema } from '@/schemas/receta.schema'
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
 * GET /api/recetas/[id]
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const receta = await prisma.receta.findUnique({ where: { id: params.id } })

    if (!receta) return ApiResponse.error(request, 'Receta no encontrada', 404)

    return ApiResponse.success(request, { receta })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * PATCH /api/recetas/[id]
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const existing = await prisma.receta.findUnique({ where: { id: params.id } })

    if (!existing) return ApiResponse.error(request, 'Receta no encontrada', 404)

    const body = await request.json()
    const validation = validateRequest(actualizarRecetaSchema, body, request)

    if (!validation.success) return validation.error

    const { nombre, imagen, descripcion, insumos, procedimiento, observaciones, video_url, esta_activo } = validation.data

    const data: any = {}

    if (nombre !== undefined) {
      data.nombre = nombre
      data.slug = await generateUniqueSlug(nombre, params.id)
    }

    if (imagen !== undefined) data.imagen = imagen
    if (descripcion !== undefined) data.descripcion = descripcion
    if (insumos !== undefined) data.insumos = insumos
    if (procedimiento !== undefined) data.procedimiento = procedimiento
    if (observaciones !== undefined) data.observaciones = observaciones
    if (video_url !== undefined) data.video_url = video_url
    if (esta_activo !== undefined) data.esta_activo = esta_activo

    const receta = await prisma.receta.update({ where: { id: params.id }, data })

    return ApiResponse.success(request, { receta })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/recetas/[id]
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const existing = await prisma.receta.findUnique({ where: { id: params.id } })

    if (!existing) return ApiResponse.error(request, 'Receta no encontrada', 404)

    await prisma.receta.delete({ where: { id: params.id } })

    return ApiResponse.success(request, { message: 'Receta eliminada correctamente' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
