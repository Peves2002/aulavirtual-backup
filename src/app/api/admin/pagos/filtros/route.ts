export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/pagos/filtros
 * Categorías padre, subcategorías y programas (cursos) en cascada.
 * Query: ?categoriaId=&subcategoriaId=
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const categoriaId = searchParams.get('categoriaId')
    const subcategoriaId = searchParams.get('subcategoriaId')

    const categorias = await prisma.categoria.findMany({
      where: { categoria_padre_id: null, esta_activo: true },
      orderBy: [{ orden: 'asc' }, { nombre: 'asc' }],
      select: { id: true, nombre: true, slug: true }
    })

    let subcategorias: { id: string; nombre: string; slug: string }[] = []

    if (categoriaId) {
      subcategorias = await prisma.categoria.findMany({
        where: { categoria_padre_id: categoriaId, esta_activo: true },
        orderBy: [{ orden: 'asc' }, { nombre: 'asc' }],
        select: { id: true, nombre: true, slug: true }
      })
    }

    let programas: { id: string; titulo: string; slug: string }[] = []

    if (subcategoriaId) {
      programas = await prisma.curso.findMany({
        where: { categoria_id: subcategoriaId },
        orderBy: [{ orden: 'asc' }, { titulo: 'asc' }],
        select: { id: true, titulo: true, slug: true }
      })
    }

    return ApiResponse.success(request, { categorias, subcategorias, programas })
  } catch (error) {
    return handleApiError(error, request)
  }
}
