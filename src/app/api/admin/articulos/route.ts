export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/articulos
 * Obtener todos los artículos
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const articulos = await prisma.articulo.findMany({
      orderBy: { creado_en: 'desc' }
    })

    return ApiResponse.success(request, articulos)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/admin/articulos
 * Crear un nuevo artículo
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const { titulo, descripcion, imagen_portada, archivo_pdf } = body

    if (!titulo || !archivo_pdf) {
      return ApiResponse.error(request, 'El título y el archivo PDF son obligatorios', 400)
    }

    const nuevoArticulo = await prisma.articulo.create({
      data: {
        titulo,
        descripcion,
        imagen_portada,
        archivo_pdf
      }
    })

    return ApiResponse.success(request, nuevoArticulo, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
