export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/articulos
 * Obtener todos los artículos publicados
 */
export async function GET(request: Request) {
  try {
    const articulos = await prisma.articulo.findMany({
      where: { estado: 'PUBLICADO' },
      orderBy: { creado_en: 'desc' }
    })

    return ApiResponse.success(request, articulos)
  } catch (error) {
    return handleApiError(error, request)
  }
}
