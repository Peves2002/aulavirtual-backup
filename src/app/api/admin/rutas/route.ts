export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'

/**
 * GET /api/admin/rutas
 * Lista todas las rutas de aprendizaje (solo ADMIN)
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || !['ADMIN', 'ASESOR'].includes(auth.user.rol)) {
      return ApiResponse.error(request, 'No tienes permisos para realizar esta acción', 403)
    }

    const rutas = await prisma.rutaAprendizaje.findMany({
      include: {
        _count: {
          select: { cursos: true }
        }
      },
      orderBy: { creado_en: 'desc' }
    })

    const formattedRutas = rutas.map(r => ({
      ...r,
      total_cursos: r._count.cursos
    }))

    return ApiResponse.success(request, formattedRutas)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/admin/rutas
 * Crea una nueva ruta de aprendizaje
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || !['ADMIN', 'ASESOR'].includes(auth.user.rol)) {
      return ApiResponse.error(request, 'No tienes permisos para realizar esta acción', 403)
    }

    const { titulo, slug, descripcion, miniatura, beneficios, esta_activo, precio, precio_falso, moneda } = await request.json()

    if (!titulo || !slug) {
      return ApiResponse.error(request, 'El título y el slug son requeridos', 400)
    }

    const ruta = await prisma.rutaAprendizaje.create({
      data: {
        titulo,
        slug,
        descripcion,
        miniatura,
        beneficios: beneficios || [],
        precio: Number(precio) || 0,
        precio_falso: Number(precio_falso) || 0,
        moneda: moneda || 'PEN',
        esta_activo: esta_activo ?? true
      }
    })

    return ApiResponse.success(request, { id: ruta.id, message: 'Paquete creado correctamente' })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return ApiResponse.error(request, 'Ya existe un paquete con ese slug', 400)
    }

    return handleApiError(error, request)
  }
}
