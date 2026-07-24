export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'

/**
 * GET /api/admin/rutas/[id]
 * Detalle de una ruta con sus cursos
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || !['ADMIN', 'ASESOR'].includes(auth.user.rol)) return ApiResponse.error(request, 'No autorizado', 403)

    const ruta = await prisma.rutaAprendizaje.findUnique({
      where: { id: params.id },
      include: {
        cursos: {
          orderBy: { orden: 'asc' },
          include: {
            curso: {
              select: { id: true, titulo: true, miniatura: true }
            }
          }
        }
      }
    })

    if (!ruta) return ApiResponse.error(request, 'Paquete no encontrado', 404)

    // Formateamos los cursos para que tengan la estructura esperada: { id, titulo, miniatura, orden }
    const formattedCursos = ruta.cursos.map(rc => ({
      id: rc.curso.id,
      titulo: rc.curso.titulo,
      miniatura: rc.curso.miniatura,
      orden: rc.orden,
      seccion_id: rc.seccion_id
    }))

    return ApiResponse.success(request, { ...ruta, cursos: formattedCursos })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * PUT /api/admin/rutas/[id]
 * Actualiza una ruta
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || !['ADMIN', 'ASESOR'].includes(auth.user.rol)) return ApiResponse.error(request, 'No autorizado', 403)

    const { titulo, slug, descripcion, miniatura, beneficios, esta_activo, precio, precio_falso, moneda } = await request.json()

    await prisma.rutaAprendizaje.update({
      where: { id: params.id },
      data: {
        titulo,
        slug,
        descripcion,
        miniatura,
        beneficios,
        precio: Number(precio) || 0,
        precio_falso: Number(precio_falso) || 0,
        moneda: moneda || 'PEN',
        esta_activo,
        actualizado_en: new Date()
      }
    })

    return ApiResponse.success(request, { message: 'Paquete actualizado' })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/admin/rutas/[id]
 * Elimina una ruta
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || !['ADMIN', 'ASESOR'].includes(auth.user.rol)) return ApiResponse.error(request, 'No autorizado', 403)

    await prisma.rutaAprendizaje.delete({
      where: { id: params.id }
    })

    return ApiResponse.success(request, { message: 'Paquete eliminado' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
