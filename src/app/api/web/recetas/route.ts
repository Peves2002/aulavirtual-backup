export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { handleApiError } from '@/utils/libs/validation'
import { ApiResponse } from '@/utils/libs/apiResponse'

/**
 * GET /api/web/recetas
 * Listar recetas activas (público)
 */
export async function GET(request: Request) {
  try {
    const recetas = await prisma.receta.findMany({
      where: { esta_activo: true },
      orderBy: { creado_en: 'desc' },
      select: {
        id: true,
        nombre: true,
        slug: true,
        imagen: true,
        descripcion: true,
        creado_en: true
      }
    })

    return ApiResponse.success(request, { recetas })
  } catch (error) {
    return handleApiError(error, request)
  }
}
