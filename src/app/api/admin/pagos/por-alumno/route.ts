export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/admin/pagos/por-alumno?q=
 * Busca alumnos con registros de cuota por nombre, apellido o DNI.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const q = (new URL(request.url).searchParams.get('q') || '').trim()

    if (q.length < 2) {
      return ApiResponse.success(request, { alumnos: [] })
    }

    const tokens = q.split(/\s+/).filter(Boolean)

    const usuarios = await prisma.usuario.findMany({
      where: {
        rol: 'ESTUDIANTE',
        registros_cuota_manual: { some: {} },
        AND: tokens.map(token => ({
          OR: [
            { nombre: { contains: token, mode: 'insensitive' } },
            { apellido: { contains: token, mode: 'insensitive' } },
            { numero_documento: { contains: token, mode: 'insensitive' } },
            { correo: { contains: token, mode: 'insensitive' } }
          ]
        }))
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        numero_documento: true,
        correo: true,
        registros_cuota_manual: {
          select: {
            monto_pago: true,
            confirmacion: true,
            numero_cuota: true
          }
        }
      },
      orderBy: [{ apellido: 'asc' }, { nombre: 'asc' }],
      take: 30
    })

    const alumnos = usuarios.map(u => {
      const registros = u.registros_cuota_manual
      const enviados = registros.filter(r => r.confirmacion === 'ENVIADO')

      return {
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido,
        alumno: `${u.nombre} ${u.apellido}`.trim(),
        dni: u.numero_documento ?? '',
        correo: u.correo,
        totalCuotas: registros.length,
        enviados: enviados.length,
        montoTotal: enviados.reduce((acc, r) => acc + Number(r.monto_pago), 0)
      }
    })

    return ApiResponse.success(request, { alumnos })
  } catch (error) {
    return handleApiError(error, request)
  }
}
