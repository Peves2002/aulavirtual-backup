export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { generateUniqueSlug } from '@/utils/libs/slug'
import { sanitizeArticuloHtml } from '@/utils/libs/sanitizeHtml'
import { actualizarArticuloSchema } from '@/schemas/articulo.schema'

const articuloInclude = {
  autor: { select: { id: true, nombre: true, apellido: true } }
}

/**
 * PUT /api/admin/articulos/[id]
 * Actualizar un artículo
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { id } = params
    const body = await request.json()
    const validation = validateRequest(actualizarArticuloSchema, body, request)

    if (!validation.success) return validation.error

    const data = validation.data

    const articulo = await prisma.articulo.findUnique({ where: { id } })

    if (!articulo) {
      return ApiResponse.error(request, 'Artículo no encontrado', 404)
    }

    const updateData: Record<string, unknown> = { ...data }

    // Regenerar slug solo si el admin lo cambió explícitamente, o si cambió el
    // título y no proveyó un slug propio.
    if ((data.slug && data.slug !== articulo.slug) || (data.titulo && data.titulo !== articulo.titulo && !data.slug)) {
      updateData.slug = await generateUniqueSlug(data.slug || data.titulo!, prisma.articulo, id)
    } else {
      delete updateData.slug
    }

    if (data.descripcion !== undefined) {
      updateData.descripcion = data.descripcion ? sanitizeArticuloHtml(data.descripcion) : null
    }

    const articuloActualizado = await prisma.articulo.update({
      where: { id },
      data: updateData,
      include: articuloInclude
    })

    return ApiResponse.success(request, articuloActualizado)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/admin/articulos/[id]
 * Eliminar un artículo
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { id } = params

    const articulo = await prisma.articulo.findUnique({ where: { id } })

    if (!articulo) {
      return ApiResponse.error(request, 'Artículo no encontrado', 404)
    }

    await prisma.articulo.delete({ where: { id } })

    return ApiResponse.success(request, { message: 'Artículo eliminado exitosamente' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
