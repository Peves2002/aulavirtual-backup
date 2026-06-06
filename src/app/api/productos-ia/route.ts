import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const admin = searchParams.get('admin') === 'true'
    const buscar = searchParams.get('buscar') || ''
    const estado = searchParams.get('estado') || ''

    let where = ''
    const conditions: string[] = []
    if (!admin) conditions.push(`estado = 'PUBLICADO'`)
    if (estado) conditions.push(`estado = '${estado}'`)
    if (buscar) conditions.push(`titulo ILIKE '%${buscar.replace(/'/g, "''")}%'`)
    if (conditions.length) where = `WHERE ${conditions.join(' AND ')}`

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, titulo, slug, miniatura, estado, precio, precio_falso, moneda, es_gratis, categoria, creado_en FROM productos_ia ${where} ORDER BY creado_en DESC`
    )

    return ApiResponse.success(request, rows.map(r => ({ ...r, precio: Number(r.precio), precio_falso: r.precio_falso ? Number(r.precio_falso) : null })))
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.authorized) return auth.error

    const body = await request.json()
    const { titulo, descripcion, miniatura, estado = 'BORRADOR', precio = 0, precio_falso, moneda = 'USD', es_gratis = false, categoria, url_acceso } = body

    if (!titulo?.trim()) return ApiResponse.error(request, 'El título es requerido', 400)

    const slug = slugify(titulo) + '-' + Date.now().toString(36)
    const { randomUUID } = await import('crypto')
    const id = randomUUID()

    await prisma.$executeRawUnsafe(
      `INSERT INTO productos_ia (id, titulo, slug, descripcion, miniatura, estado, precio, precio_falso, moneda, es_gratis, categoria, url_acceso, creado_en, actualizado_en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())`,
      id, titulo.trim(), slug, descripcion || null, miniatura || null, estado,
      Number(precio), precio_falso ? Number(precio_falso) : null, moneda, es_gratis, categoria || null, url_acceso || null
    )

    const rows: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM productos_ia WHERE id = $1`, id)
    const row = rows[0]
    return ApiResponse.success(request, { ...row, precio: Number(row.precio) }, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
