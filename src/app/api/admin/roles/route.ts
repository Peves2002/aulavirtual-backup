import { NextResponse } from 'next/server'
import prisma from '@/utils/libs/prisma'
import { requirePermission } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/roles
 * Listar todos los roles personalizados
 */
export async function GET(request: Request) {
  try {
    const auth = await requirePermission(request, 'VER_USUARIOS')
    if (!auth.authorized) {
      return auth.error
    }

    const roles = await prisma.rolPersonalizado.findMany({
      orderBy: { creado_en: 'desc' },
      include: {
        _count: {
          select: { usuarios: true }
        }
      }
    })

    return ApiResponse.success(request, roles)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/admin/roles
 * Crear un nuevo rol personalizado
 */
export async function POST(request: Request) {
  try {
    const auth = await requirePermission(request, 'VER_USUARIOS')
    if (!auth.authorized) {
      return auth.error
    }

    const body = await request.json()
    const { nombre, descripcion, permisos } = body

    if (!nombre) {
      return ApiResponse.error(request, 'El nombre del rol es requerido', 400)
    }

    // Verificar si ya existe
    const exist = await prisma.rolPersonalizado.findUnique({
      where: { nombre }
    })

    if (exist) {
      return ApiResponse.error(request, 'Ya existe un rol con este nombre', 409)
    }

    const newRole = await prisma.rolPersonalizado.create({
      data: {
        nombre,
        descripcion,
        permisos: permisos || []
      }
    })

    return ApiResponse.success(request, newRole, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
