export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { recalcularAccesosCurso } from '@/utils/libs/pagos-cuota'
import { handleApiError } from '@/utils/libs/validation'

/**
 * PATCH /api/admin/pagos/[id]
 * Actualiza monto_pago y/o confirmacion.
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { id } = params
    const body = await request.json()

    const existing = await prisma.registroCuotaManual.findUnique({ where: { id } })

    if (!existing) {
      return ApiResponse.error(request, 'Registro no encontrado', 404)
    }

    const data: {
      monto_pago?: number
      confirmacion?: 'NO_ENVIADO' | 'ENVIADO'
      observaciones?: string | null
      fecha_envio?: Date
    } = {}

    if (body.numero_cuota !== undefined) {
      return ApiResponse.error(
        request,
        'El N° de cuota no se puede editar; las cuotas son progresivas (1, 2, 3…)',
        400
      )
    }

    if (body.monto_pago !== undefined) {
      const m = Number(body.monto_pago)

      if (Number.isNaN(m) || m < 0) {
        return ApiResponse.error(request, 'monto_pago inválido', 400)
      }

      data.monto_pago = m
    }

    if (body.confirmacion !== undefined) {
      if (body.confirmacion !== 'ENVIADO' && body.confirmacion !== 'NO_ENVIADO') {
        return ApiResponse.error(request, 'confirmacion inválida', 400)
      }

      data.confirmacion = body.confirmacion
    }

    if (body.observaciones !== undefined) {
      if (body.observaciones === null) {
        data.observaciones = null
      } else if (typeof body.observaciones === 'string') {
        const texto = body.observaciones.trim()

        if (texto.length > 500) {
          return ApiResponse.error(request, 'observaciones no puede superar 500 caracteres', 400)
        }

        data.observaciones = texto || null
      } else {
        return ApiResponse.error(request, 'observaciones inválida', 400)
      }
    }

    if (body.fecha_envio !== undefined) {
      if (body.fecha_envio === null || body.fecha_envio === '') {
        return ApiResponse.error(request, 'fecha_envio es obligatoria', 400)
      }

      const fecha = new Date(body.fecha_envio)

      if (Number.isNaN(fecha.getTime())) {
        return ApiResponse.error(request, 'fecha_envio inválida', 400)
      }

      data.fecha_envio = fecha
    }

    if (Object.keys(data).length === 0) {
      return ApiResponse.error(request, 'Sin campos para actualizar', 400)
    }

    try {
      const confirmacionCambio = data.confirmacion !== undefined && data.confirmacion !== existing.confirmacion

      const registro = await prisma.registroCuotaManual.update({
        where: { id },
        data,
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido: true,
              correo: true,
              numero_documento: true
            }
          }
        }
      })

      if (confirmacionCambio) {
        await recalcularAccesosCurso(existing.curso_id)
      }

      return ApiResponse.success(request, {
        registro: {
          id: registro.id,
          curso_id: registro.curso_id,
          inscripcion_id: registro.inscripcion_id,
          usuario_id: registro.usuario_id,
          numero_cuota: registro.numero_cuota,
          monto_pago: Number(registro.monto_pago),
          confirmacion: registro.confirmacion,
          observaciones: registro.observaciones ?? null,
          fecha_envio: registro.fecha_envio.toISOString(),
          alumno: `${registro.usuario.nombre} ${registro.usuario.apellido}`.trim(),
          dni: registro.usuario.numero_documento ?? '',
          correo: registro.usuario.correo
        }
      })
    } catch (err: any) {
      if (err?.code === 'P2002') {
        return ApiResponse.error(request, 'Ya existe un registro con ese N° de cuota para el alumno', 400)
      }

      throw err
    }
  } catch (error) {
    return handleApiError(error, request)
  }
}
