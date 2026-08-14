export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { generateUniqueSlug } from '@/utils/libs/slug'
import { sanitizeArticuloHtml } from '@/utils/libs/sanitizeHtml'
import { crearArticuloSchema } from '@/schemas/articulo.schema'

const articuloInclude = {
  autor: { select: { id: true, nombre: true, apellido: true } }
}

/**
 * GET /api/admin/articulos
 * Obtener todos los artículos
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado')

    const articulos = await prisma.articulo.findMany({
      where: estado === 'BORRADOR' || estado === 'PUBLICADO' ? { estado } : undefined,
      orderBy: { creado_en: 'desc' },
      include: articuloInclude
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
    const validation = validateRequest(crearArticuloSchema, body, request)

    if (!validation.success) return validation.error

    const data = validation.data

    const slug = await generateUniqueSlug(data.slug || data.titulo, prisma.articulo)
    const descripcionSaneada = data.descripcion ? sanitizeArticuloHtml(data.descripcion) : null

    const nuevoArticulo = await prisma.articulo.create({
      data: {
        titulo: data.titulo,
        slug,
        descripcion: descripcionSaneada,
        imagen_portada: data.imagen_portada || null,
        archivo_pdf: data.archivo_pdf || null,
        categoria: data.categoria || null,
        autor_id: data.autor_id || null,
        estado: data.estado
      },
      include: articuloInclude
    })

    return ApiResponse.success(request, nuevoArticulo, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
