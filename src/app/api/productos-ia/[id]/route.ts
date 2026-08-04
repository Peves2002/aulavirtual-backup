import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const rows: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM productos_ia WHERE id = $1 LIMIT 1`, params.id)

    if (!rows.length) return ApiResponse.error(request, 'Producto IA no encontrado', 404)
    const row = rows[0]

    
return ApiResponse.success(request, { ...row, precio: Number(row.precio), precio_falso: row.precio_falso ? Number(row.precio_falso) : null })
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const rows: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM productos_ia WHERE id = $1`, params.id)

    if (!rows.length) return ApiResponse.error(request, 'Producto IA no encontrado', 404)

    const body = await request.json()
    const { titulo, descripcion, miniatura, estado, precio, precio_falso, moneda, es_gratis, categoria, url_acceso, url_regalo } = body

    const sets: string[] = ['actualizado_en = NOW()']
    const vals: any[] = []
    let i = 1

    const add = (col: string, val: any) => { sets.push(`${col} = $${i++}`); vals.push(val) }

    if (titulo !== undefined) add('titulo', titulo)
    if (descripcion !== undefined) add('descripcion', descripcion || null)
    if (miniatura !== undefined) add('miniatura', miniatura || null)
    if (estado !== undefined) add('estado', estado)
    if (precio !== undefined) add('precio', Number(precio))
    if (precio_falso !== undefined) add('precio_falso', precio_falso ? Number(precio_falso) : null)
    if (moneda !== undefined) add('moneda', moneda)
    if (es_gratis !== undefined) add('es_gratis', es_gratis)
    if (categoria !== undefined) add('categoria', categoria || null)
    if (url_acceso !== undefined) add('url_acceso', url_acceso || null)
    if (url_regalo !== undefined) add('url_regalo', url_regalo || null)

    vals.push(params.id)
    await prisma.$executeRawUnsafe(`UPDATE productos_ia SET ${sets.join(', ')} WHERE id = $${i}`, ...vals)

    const updated: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM productos_ia WHERE id = $1`, params.id)
    const row = updated[0]

    
return ApiResponse.success(request, { ...row, precio: Number(row.precio), precio_falso: row.precio_falso ? Number(row.precio_falso) : null })
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const rows: any[] = await prisma.$queryRawUnsafe(`SELECT id, estado FROM productos_ia WHERE id = $1`, params.id)

    if (!rows.length) return ApiResponse.error(request, 'Producto IA no encontrado', 404)
    if (rows[0].estado !== 'BORRADOR') return ApiResponse.error(request, 'Solo se pueden eliminar productos en borrador', 400)

    await prisma.$executeRawUnsafe(`DELETE FROM productos_ia WHERE id = $1`, params.id)
    
return ApiResponse.success(request, { message: 'Eliminado correctamente' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
