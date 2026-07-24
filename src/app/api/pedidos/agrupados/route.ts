export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { requireAdminOrAsesor } from '@/utils/libs/auth-helpers'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { listarPedidosAgrupadosQuerySchema } from '@/schemas/pedido.schema'

/**
 * GET /api/pedidos/agrupados
 * Listar estudiantes que tienen pedidos registrados, sumando el total de sus pedidos pagados.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdminOrAsesor(request)

    if (!auth.authorized) {
      return auth.error
    }

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    const validation = validateRequest(listarPedidosAgrupadosQuerySchema, query, request)

    if (!validation.success) {
      return validation.error
    }

    const { page, limit, nombre, departamento, provincia } = validation.data

    const where: any = {
      pedidos: {
        some: {} // Solo usuarios que tengan al menos un pedido
      }
    }

    if (nombre) {
      where.OR = [
        { nombre: { contains: nombre, mode: 'insensitive' } },
        { apellido: { contains: nombre, mode: 'insensitive' } },
        { correo: { contains: nombre, mode: 'insensitive' } }
      ]
    }

    if (departamento) {
      where.departamento = departamento
    }

    if (provincia) {
      where.provincia = provincia
    }

    const skip = (page - 1) * limit

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          nombre: true,
          apellido: true,
          correo: true,
          departamento: true,
          provincia: true,
          pedidos: {
            where: {
              estado: 'COMPLETADO' // Solo sumamos el total de lo pagado exitosamente
            },
            select: {
              total: true,
              moneda: true
            }
          }
        },
        orderBy: {
          creado_en: 'desc'
        }
      }),
      prisma.usuario.count({ where })
    ])

    // Transformamos la data para que el frontend la procese más fácil
    const usuariosAgrupados = usuarios.map(u => {
      // Calculamos la suma total (asumiendo que todo está en la misma moneda, PEN por defecto)
      const totalPagado = u.pedidos.reduce((acc, p) => acc + Number(p.total), 0)
      const moneda = u.pedidos.length > 0 ? u.pedidos[0].moneda : 'PEN'

      return {
        usuario_id: u.id,
        nombre: u.nombre,
        apellido: u.apellido,
        correo: u.correo,
        departamento: u.departamento,
        provincia: u.provincia,
        total_pagado: totalPagado,
        moneda: moneda,
        cantidad_pedidos_pagados: u.pedidos.length
      }
    })

    return ApiResponse.success(request, {
      agrupados: usuariosAgrupados,
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
