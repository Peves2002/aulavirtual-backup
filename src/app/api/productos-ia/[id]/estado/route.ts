import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { estado } = await request.json()
    const valid = ['BORRADOR', 'PUBLICADO', 'ARCHIVADO']

    if (!valid.includes(estado)) return ApiResponse.error(request, 'Estado inválido', 400)

    const rows: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM productos_ia WHERE id = $1`, params.id)

    if (!rows.length) return ApiResponse.error(request, 'Producto IA no encontrado', 404)

    await prisma.$executeRawUnsafe(`UPDATE productos_ia SET estado = $1, actualizado_en = NOW() WHERE id = $2`, estado, params.id)
    const updated: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM productos_ia WHERE id = $1`, params.id)
    const row = updated[0]

    
return ApiResponse.success(request, { ...row, precio: Number(row.precio) })
  } catch (error) {
    return handleApiError(error, request)
  }
}
