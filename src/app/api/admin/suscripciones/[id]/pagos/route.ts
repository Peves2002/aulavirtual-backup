export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized || auth.user.rol !== 'ADMIN') {
      return ApiResponse.error(request, 'No tienes permisos', 403)
    }

    const suscripcion = await prisma.suscripcion.findUnique({ where: { id: params.id } })

    if (!suscripcion) return ApiResponse.error(request, 'Suscripción no encontrada', 404)

    const pagosRaw = await prisma.pagoSuscripcion.findMany({
      where: { suscripcion_id: params.id },
      orderBy: { creado_en: 'desc' }
    })

    // Serialización explícita para evitar problemas con Prisma Decimal
    const pagos = JSON.parse(JSON.stringify(pagosRaw))

    return ApiResponse.success(request, { pagos })
  } catch (error) {
    return handleApiError(error, request)
  }
}
