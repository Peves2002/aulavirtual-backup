
import prisma from '@/utils/libs/prisma'
import { requirePermission } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/roles/[id]
 * Obtener un rol específico
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requirePermission(request, 'VER_USUARIOS')

    if (!auth.authorized) {
      return auth.error
    }

    const { id } = params

    const role = await prisma.rolPersonalizado.findUnique({
      where: { id }
    })

    if (!role) {
      return ApiResponse.error(request, 'El rol no existe', 404)
    }

    return ApiResponse.success(request, role)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * PUT /api/admin/roles/[id]
 * Actualizar un rol personalizado
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requirePermission(request, 'VER_USUARIOS')

    if (!auth.authorized) {
      return auth.error
    }

    const { id } = params
    const body = await request.json()
    const { nombre, descripcion, permisos } = body

    const existingRole = await prisma.rolPersonalizado.findUnique({
      where: { id }
    })

    if (!existingRole) {
      return ApiResponse.error(request, 'El rol no existe', 404)
    }

    // Si cambia de nombre, verificar que no choque
    if (nombre && nombre !== existingRole.nombre) {
      const nameConflict = await prisma.rolPersonalizado.findUnique({
        where: { nombre }
      })

      if (nameConflict) {
        return ApiResponse.error(request, 'Ya existe otro rol con este nombre', 409)
      }
    }

    const updatedRole = await prisma.rolPersonalizado.update({
      where: { id },
      data: {
        nombre: nombre ?? existingRole.nombre,
        descripcion: descripcion !== undefined ? descripcion : existingRole.descripcion,
        permisos: permisos ?? existingRole.permisos
      }
    })

    return ApiResponse.success(request, updatedRole)
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/admin/roles/[id]
 * Eliminar un rol personalizado
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requirePermission(request, 'VER_USUARIOS')

    if (!auth.authorized) {
      return auth.error
    }

    const { id } = params

    const existingRole = await prisma.rolPersonalizado.findUnique({
      where: { id }
    })

    if (!existingRole) {
      return ApiResponse.error(request, 'El rol no existe', 404)
    }

    // Borrar el rol (las relaciones en Usuario se pondrán en null gracias a onDelete: SetNull)
    await prisma.rolPersonalizado.delete({
      where: { id }
    })

    return ApiResponse.success(request, { message: 'Rol eliminado con éxito' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
