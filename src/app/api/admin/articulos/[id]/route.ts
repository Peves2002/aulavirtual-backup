export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

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
    const { titulo, descripcion, imagen_portada, archivo_pdf } = body

    const articulo = await prisma.articulo.findUnique({ where: { id } })

    if (!articulo) {
      return ApiResponse.error(request, 'Artículo no encontrado', 404)
    }

    const articuloActualizado = await prisma.articulo.update({
      where: { id },
      data: {
        titulo: titulo !== undefined ? titulo : articulo.titulo,
        descripcion: descripcion !== undefined ? descripcion : articulo.descripcion,
        imagen_portada: imagen_portada !== undefined ? imagen_portada : articulo.imagen_portada,
        archivo_pdf: archivo_pdf !== undefined ? archivo_pdf : articulo.archivo_pdf
      }
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
