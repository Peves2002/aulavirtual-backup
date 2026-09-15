import { evaluacionAdjuntosSchema } from '@/schemas/evaluacion-adjuntos.schema'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireProfesorOrAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

async function verifyCursoAccess(request: Request, cursoId: string) {
  const auth = await requireProfesorOrAdmin(request)

  if (!auth.authorized) return { authorized: false as const, error: auth.error }

  const curso = await prisma.curso.findUnique({ where: { id: cursoId } })

  if (!curso) return { authorized: false as const, error: ApiResponse.error(request, 'Curso no encontrado', 404) }

  if (auth.user.rol === 'PROFESOR' && curso.profesor_id !== auth.user.id) {
    return { authorized: false as const, error: ApiResponse.error(request, 'No tienes permiso', 403) }
  }

  return { authorized: true as const }
}

/**
 * PATCH /api/cursos/[id]/examenes/[examenId]/preguntas/[preguntaId]
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; examenId: string; preguntaId: string } }
) {
  try {
    const access = await verifyCursoAccess(request, params.id)

    if (!access.authorized) return access.error

    const body = await request.json()
    const adjuntos = evaluacionAdjuntosSchema.optional().safeParse(body.adjuntos)

    if (!adjuntos.success) return ApiResponse.error(request, 'Adjuntos inválidos (máximo 20 por pregunta)', 400)
    const { texto, tipo, puntos, opciones } = body

    if (!texto || !tipo || !opciones || !Array.isArray(opciones) || opciones.length === 0) {
      return ApiResponse.error(request, 'Faltan datos requeridos', 400)
    }

    const pregunta = await prisma.pregunta.findFirst({
      where: { id: params.preguntaId, examen_id: params.examenId, examen: { curso_id: params.id } }
    })

    if (!pregunta) return ApiResponse.error(request, 'Pregunta no encontrada', 404)

    const updatedPregunta = await prisma.$transaction(async tx => {
      await tx.pregunta.update({
        where: { id: params.preguntaId },
        data: { texto, tipo, puntos: Number(puntos || 1), ...(adjuntos.data !== undefined && { adjuntos: adjuntos.data }) }
      })

      await tx.opcionPregunta.deleteMany({ where: { pregunta_id: params.preguntaId } })

      await tx.opcionPregunta.createMany({
        data: opciones.map((opt: any, index: number) => ({
          texto: opt.texto,
          es_correcta: Boolean(opt.es_correcta),
          orden: index + 1,
          pregunta_id: params.preguntaId
        }))
      })

      return tx.pregunta.findUnique({
        where: { id: params.preguntaId },
        include: { opciones: { orderBy: { orden: 'asc' } } }
      })
    })

    return ApiResponse.success(request, { pregunta: updatedPregunta })
  } catch (error: any) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/cursos/[id]/examenes/[examenId]/preguntas/[preguntaId]
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; examenId: string; preguntaId: string } }
) {
  try {
    const access = await verifyCursoAccess(request, params.id)

    if (!access.authorized) return access.error

    await prisma.pregunta.delete({ where: { id: params.preguntaId } })

    return ApiResponse.success(request, { message: 'Pregunta eliminada' })
  } catch (error: any) {
    return handleApiError(error, request)
  }
}
