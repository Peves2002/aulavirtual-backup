export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { requireAdminOrAsesor } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { listarPedidosQuerySchema } from '@/schemas/pedido.schema'

/**
 * GET /api/pedidos
 * Listar todos los pedidos (solo ADMIN)
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdminOrAsesor(request)

    if (!auth.authorized) {
      return auth.error
    }

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    const validation = validateRequest(listarPedidosQuerySchema, query, request)

    if (!validation.success) {
      return validation.error
    }

    const { page, limit, estado, buscar, nro_pedido, nombre, departamento, provincia, mes, anio, usuario_id } = validation.data

    const where: any = {}
    
    if (usuario_id) {
      where.usuario_id = usuario_id
    }
    
    // Si el estado no es 'TODOS', aplicamos el filtro. 
    if (estado && estado !== 'TODOS') {
      where.estado = estado
    }

    if (nro_pedido) {
      const nro = parseInt(nro_pedido)

      if (!isNaN(nro)) {
        where.numero_pedido = nro
      }
    }

    if (nombre) {
      where.OR = [
        { usuario: { nombre: { contains: nombre, mode: 'insensitive' } } },
        { usuario: { apellido: { contains: nombre, mode: 'insensitive' } } },
        { usuario: { correo: { contains: nombre, mode: 'insensitive' } } }
      ]
    }

    if (buscar) {
      // Búsqueda general por transaccion_id o términos varios si no se especificaron filtros fijos
      if (!where.OR) {
        where.OR = [
          { usuario: { nombre: { contains: buscar, mode: 'insensitive' } } },
          { usuario: { apellido: { contains: buscar, mode: 'insensitive' } } },
          { usuario: { correo: { contains: buscar, mode: 'insensitive' } } },
          { transaccion_id: { contains: buscar } }
        ]
      }
    }

    if (departamento) {
      where.usuario = { ...where.usuario, departamento }
    }

    if (provincia) {
      where.usuario = { ...where.usuario, provincia }
    }

    if (anio) {
      const yearInt = parseInt(anio)

      if (!isNaN(yearInt)) {
        if (mes) {
          const monthInt = parseInt(mes)

          if (!isNaN(monthInt)) {
            const startDate = new Date(yearInt, monthInt - 1, 1)
            const endDate = new Date(yearInt, monthInt, 1)

            where.creado_en = { gte: startDate, lt: endDate }
          }
        } else {
          const startDate = new Date(yearInt, 0, 1)
          const endDate = new Date(yearInt + 1, 0, 1)

          where.creado_en = { gte: startDate, lt: endDate }
        }
      }
    } else if (mes) {
      const yearInt = new Date().getFullYear()
      const monthInt = parseInt(mes)

      if (!isNaN(monthInt)) {
        const startDate = new Date(yearInt, monthInt - 1, 1)
        const endDate = new Date(yearInt, monthInt, 1)

        where.creado_en = { gte: startDate, lt: endDate }
      }
    }

    const skip = (page - 1) * limit

    const [pedidos, total] = await Promise.all([
      prisma.pedido.findMany({
        where,
        skip,
        take: limit,
        orderBy: { creado_en: 'desc' },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              correo: true,
              departamento: true,
              provincia: true
            }
          },
          cupon: {
            select: {
              codigo: true
            }
          },
          detalles: {
            include: {
              curso: {
                select: {
                  titulo: true
                }
              },
              ebook: {
                select: {
                  titulo: true,
                  miniatura: true
                }
              }
            }
          }
        }
      }),
      prisma.pedido.count({ where })
    ])

    return ApiResponse.success(request, {
      pedidos,
      paginacion: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
