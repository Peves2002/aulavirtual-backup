export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/estudiante/certificados
 * Lista todos los certificados del estudiante autenticado
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const certificados = await prisma.certificado.findMany({
      where: { usuario_id: auth.user.id },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            slug: true,
            miniatura: true,
            duracion: true,
            nivel: true,
            precio_certificado: true,
            profesor: {
              select: { nombre: true, apellido: true }
            }
          }
        }
      },
      orderBy: { emitido_en: 'desc' }
    })

    const inscripciones = await prisma.inscripcion.findMany({
      where: { usuario_id: auth.user.id },
      select: { curso_id: true, certificado_habilitado: true }
    })

    return ApiResponse.success(request, {
      certificados: certificados.map(c => {
        const inscripcion = inscripciones.find(i => i.curso_id === c.curso.id)
        const tieneCertPago = c.curso.precio_certificado && Number(c.curso.precio_certificado) > 0
        const isHabilitado = tieneCertPago ? (inscripcion?.certificado_habilitado ?? false) : true

        return {
          id: c.id,
          codigo_verificacion: c.codigo_verificacion,
          emitido_en: c.emitido_en,
          curso: c.curso,
          habilitado: isHabilitado
        }
      })
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
