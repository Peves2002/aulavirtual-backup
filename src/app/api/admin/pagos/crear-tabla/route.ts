export const dynamic = 'force-dynamic'

import { randomUUID } from 'crypto'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

/**
 * POST /api/admin/pagos/crear-tabla
 * Crea la siguiente cuota secuencial (1, 2, 3…) para todos los inscritos.
 * Body: { cursoId }
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const cursoId = body.cursoId as string | undefined

    if (!cursoId) {
      return ApiResponse.error(request, 'cursoId es obligatorio', 400)
    }

    const curso = await prisma.curso.findUnique({ where: { id: cursoId }, select: { id: true } })

    if (!curso) {
      return ApiResponse.error(request, 'Curso no encontrado', 404)
    }

    const inscripciones = await prisma.inscripcion.findMany({
      where: { curso_id: cursoId, estado: { in: ['ACTIVO', 'COMPLETADO'] } },
      select: { id: true, usuario_id: true }
    })

    if (inscripciones.length === 0) {
      return ApiResponse.error(request, 'No hay alumnos inscritos en este programa', 400)
    }

    const agg = await prisma.registroCuotaManual.aggregate({
      where: { curso_id: cursoId },
      _max: { numero_cuota: true }
    })

    const numeroCuota = (agg._max.numero_cuota ?? 0) + 1

    const now = new Date()

    await prisma.registroCuotaManual.createMany({
      data: inscripciones.map(i => ({
        id: randomUUID(),
        curso_id: cursoId,
        inscripcion_id: i.id,
        usuario_id: i.usuario_id,
        numero_cuota: numeroCuota,
        monto_pago: 0,
        confirmacion: 'NO_ENVIADO',
        fecha_envio: now,
        actualizado_en: now
      })),
      skipDuplicates: true
    })

    return ApiResponse.success(
      request,
      {
        creados: inscripciones.length,
        omitidos: 0,
        numeroCuota
      },
      201
    )
  } catch (error) {
    return handleApiError(error, request)
  }
}
