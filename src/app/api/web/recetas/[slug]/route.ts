export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { handleApiError } from '@/utils/libs/validation'
import { ApiResponse } from '@/utils/libs/apiResponse'

/**
 * GET /api/web/recetas/[slug]
 * Obtener receta activa por slug (público)
 */
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const receta = await prisma.receta.findFirst({
      where: { slug: params.slug, esta_activo: true }
    })

    if (!receta) return ApiResponse.error(request, 'Receta no encontrada', 404)

    return ApiResponse.success(request, { receta })
  } catch (error) {
    return handleApiError(error, request)
  }
}
