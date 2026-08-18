import prisma from '@/utils/libs/prisma'
import { reordenarCategoriasSchema } from '@/schemas/categoria.schema'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'

/**
 * PATCH /api/categorias/reordenar
 * Reordenar categorías principales (padres)
 */
export async function PATCH(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const validation = validateRequest(reordenarCategoriasSchema, body, request)

    if (!validation.success) return validation.error

    const { items } = validation.data

    // Actualizar el orden de cada categoría en una transacción
    await prisma.$transaction(
      items.map(item =>
        prisma.categoria.update({
          where: { id: item.id },
          data: { orden: item.orden }
        })
      )
    )

    // Retornar las categorías actualizadas
    const categoriasActualizadas = await prisma.categoria.findMany({
      where: { categoria_padre_id: null },
      orderBy: { orden: 'asc' },
      select: {
        id: true,
        nombre: true,
        slug: true,
        descripcion: true,
        esta_activo: true,
        orden: true,
        creado_en: true,
        actualizado_en: true
      }
    })

    return ApiResponse.success(request, { categorias: categoriasActualizadas })
  } catch (error) {
    return handleApiError(error, request)
  }
}
