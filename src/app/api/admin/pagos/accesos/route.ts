export const dynamic = 'force-dynamic'

import { randomUUID } from 'crypto'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { asStringArray, recalcularAccesosCurso } from '@/utils/libs/pagos-cuota'
import { handleApiError } from '@/utils/libs/validation'

/**
 * PUT /api/admin/pagos/accesos
 * Guarda módulos NUEVOS de la cuota (progresivos) y recalcula accesos.
 * Body: { cursoId, numeroCuota, moduloIds: string[] }
 *
 * Los módulos de cuotas anteriores se consideran ya otorgados y no se re-guardan aquí.
 * moduloIds puede incluir los previos (marcados en UI); el servidor solo persiste los nuevos.
 */
export async function PUT(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const cursoId = body.cursoId as string | undefined
    const numeroCuota = Number(body.numeroCuota)
    const moduloIds = Array.isArray(body.moduloIds) ? (body.moduloIds as string[]) : null

    if (!cursoId || !moduloIds) {
      return ApiResponse.error(request, 'cursoId y moduloIds son obligatorios', 400)
    }

    if (!Number.isInteger(numeroCuota) || numeroCuota < 1) {
      return ApiResponse.error(request, 'numeroCuota inválido', 400)
    }

    const curso = await prisma.curso.findUnique({ where: { id: cursoId }, select: { id: true } })

    if (!curso) {
      return ApiResponse.error(request, 'Curso no encontrado', 404)
    }

    const configsPrevias = await prisma.configCuotaManual.findMany({
      where: { curso_id: cursoId, numero_cuota: { lt: numeroCuota } },
      select: { modulo_ids: true }
    })

    const previos = new Set<string>()

    for (const cfg of configsPrevias) {
      for (const id of asStringArray(cfg.modulo_ids)) previos.add(id)
    }

    const modulosValidos = await prisma.modulo.findMany({
      where: { curso_id: cursoId, id: { in: moduloIds } },
      select: { id: true }
    })

    const idsSolicitados = new Set(modulosValidos.map(m => m.id))

    // Solo se persisten módulos nuevos de esta cuota (no los ya otorgados antes).
    const idsNuevos = [...idsSolicitados].filter(id => !previos.has(id))

    await prisma.configCuotaManual.upsert({
      where: {
        curso_id_numero_cuota: {
          curso_id: cursoId,
          numero_cuota: numeroCuota
        }
      },
      create: {
        id: randomUUID(),
        curso_id: cursoId,
        numero_cuota: numeroCuota,
        modulo_ids: idsNuevos
      },
      update: {
        modulo_ids: idsNuevos
      }
    })

    const recalc = await recalcularAccesosCurso(cursoId)

    const enviados = await prisma.registroCuotaManual.count({
      where: {
        curso_id: cursoId,
        numero_cuota: numeroCuota,
        confirmacion: 'ENVIADO'
      }
    })

    return ApiResponse.success(request, {
      cursoId,
      numeroCuota,
      moduloIds: idsNuevos,
      moduloIdsPrevios: [...previos],
      alumnosAfectados: enviados,
      accesosRecalculados: recalc.accesos
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
