export const dynamic = 'force-dynamic'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) {
      return auth.error
    }

    const { user } = auth

    const inscriptions = await prisma.inscripcion.findMany({
      where: {
        usuario_id: user.id,
        estado: 'ACTIVO'
      },
      include: {
        curso: {
          include: {
            profesor: {
              select: { nombre: true, apellido: true }
            },
            categoria: {
              select: { nombre: true }
            },
            progreso: {
              where: { usuario_id: user.id }
            }
          }
        }
      }
    })

    const ahora = new Date()

    const cursosInscritos = inscriptions.map(ins => {
      const vigenciaMeses = ins.curso.vigencia_meses ?? 0
      let tieneAcceso = true

      if (vigenciaMeses > 0) {
        const accesHasta = new Date(ins.inscrito_en)

        accesHasta.setMonth(accesHasta.getMonth() + vigenciaMeses)
        tieneAcceso = accesHasta > ahora
      }

      return {
        id: ins.curso.id,
        titulo: ins.curso.titulo,
        slug: ins.curso.slug,
        miniatura: ins.curso.miniatura ?? undefined,
        profesor: ins.curso.profesor,
        categoria: ins.curso.categoria?.nombre,
        progreso: ins.curso.progreso[0]?.porcentaje_progreso || 0,
        tieneAcceso,
        origen: 'COMPRA' as const
      }
    })

    // Suscripción activa: da acceso a todos los cursos publicados, excepto los excluidos del plan
    const suscripcionActiva = await prisma.suscripcion.findFirst({
      where: {
        usuario_id: user.id,
        estado: { in: ['ACTIVA', 'EN_PRUEBA'] }
      },
      include: {
        plan: { include: { cursos: { select: { curso_id: true } } } }
      }
    })

    const excluidoIds = suscripcionActiva?.plan.cursos.map(c => c.curso_id) ?? []

    const cursosSuscripcion = suscripcionActiva
      ? (await prisma.curso.findMany({
          where: {
            estado: 'PUBLICADO',
            ...(excluidoIds.length > 0 ? { id: { notIn: excluidoIds } } : {})
          },
          include: {
            profesor: { select: { nombre: true, apellido: true } },
            categoria: { select: { nombre: true } },
            progreso: { where: { usuario_id: user.id } }
          }
        })).map(curso => ({
          id: curso.id,
          titulo: curso.titulo,
          slug: curso.slug,
          miniatura: curso.miniatura ?? undefined,
          profesor: curso.profesor,
          categoria: curso.categoria?.nombre,
          progreso: curso.progreso[0]?.porcentaje_progreso || 0,
          tieneAcceso: true,
          origen: 'SUSCRIPCION' as const
        }))
      : []

    // Combinar y deduplicar por id (compra tiene prioridad sobre suscripción)
    const idsInscritos = new Set(cursosInscritos.map(c => c.id))
    const cursosSoloSub = cursosSuscripcion.filter(c => !idsInscritos.has(c.id))
    const courses = [...cursosInscritos, ...cursosSoloSub]

    return ApiResponse.success(request, { courses })
  } catch (error) {
    return handleApiError(error, request)
  }
}
