import type { NextRequest } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdmin(req)

    if (!auth.authorized) return auth.error

    const body = await req.json()
    const { cursos } = body

    if (!Array.isArray(cursos)) {
      return ApiResponse.error(req, 'Formato inválido. Se esperaba un array de cursos.', 400)
    }

    const updates = cursos.map((curso: { id: string, orden: number }) => {
      return prisma.curso.update({
        where: { id: curso.id },
        data: { orden: curso.orden }
      })
    })

    await prisma.$transaction(updates)

    return ApiResponse.success(req, { message: 'Orden actualizado correctamente' })
  } catch (error) {
    return handleApiError(error, req)
  }
}
