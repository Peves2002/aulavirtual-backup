export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'
import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAuth } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'

function getEstadoProgreso(progreso: number): 'sin_iniciar' | 'en_progreso' | 'completado' {
  if (progreso >= 100) return 'completado'
  if (progreso > 0) return 'en_progreso'

  return 'sin_iniciar'
}

const RECURSOS_NOVEDADES = [
  { id: 'r1', titulo: 'Guía para retomar tu aprendizaje', tipo: 'guia' as const, href: '/recursos' },
  { id: 'r2', titulo: 'Plantillas de planificación formativa', tipo: 'plantilla' as const, href: '/recursos' },
  { id: 'r3', titulo: 'Novedades del Campus Digital Azul', tipo: 'noticia' as const, href: '/recursos' },
]

/**
 * GET /api/estudiante/dashboard
 * Campus Digital Azul — datos de la pantalla principal del participante
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const usuarioId = auth.user.id

    const [inscripciones, totalCertificados, certificados, cursosRecomendadosRaw] = await Promise.all([
      prisma.inscripcion.findMany({
        where: { usuario_id: usuarioId, estado: 'ACTIVO' },
        include: {
          curso: {
            include: {
              profesor: { select: { nombre: true, apellido: true } },
              categoria: { select: { nombre: true } },
              progreso: { where: { usuario_id: usuarioId } },
            },
          },
        },
        orderBy: { inscrito_en: 'desc' },
      }),
      prisma.certificado.count({ where: { usuario_id: usuarioId } }),
      prisma.certificado.findMany({
        where: { usuario_id: usuarioId },
        include: {
          curso: {
            select: {
              id: true,
              titulo: true,
              slug: true,
              miniatura: true,
              nivel: true,
              profesor: { select: { nombre: true, apellido: true } },
            },
          },
        },
        orderBy: { emitido_en: 'desc' },
        take: 3,
      }),
      prisma.curso.findMany({
        where: {
          estado: 'PUBLICADO',
          inscripciones: { none: { usuario_id: usuarioId, estado: 'ACTIVO' } },
        },
        select: {
          id: true,
          titulo: true,
          slug: true,
          miniatura: true,
          categoria: { select: { nombre: true } },
        },
        orderBy: { creado_en: 'desc' },
        take: 4,
      }),
    ])

    const cursosConProgreso = inscripciones.map(ins => {
      const progreso = ins.curso.progreso[0]?.porcentaje_progreso ?? 0

      return {
        id: ins.curso.id,
        titulo: ins.curso.titulo,
        slug: ins.curso.slug,
        miniatura: ins.curso.miniatura ?? undefined,
        profesor: ins.curso.profesor,
        categoria: ins.curso.categoria?.nombre,
        progreso,
        estado: getEstadoProgreso(progreso),
      }
    })

    const programasActivos = cursosConProgreso.filter(c => c.progreso < 100)
    const totalInscritos = cursosConProgreso.length
    const cursosCompletados = cursosConProgreso.filter(c => c.progreso >= 100).length
    const cursosEnProgreso = cursosConProgreso.filter(c => c.progreso > 0 && c.progreso < 100).length

    const avanceGeneral =
      programasActivos.length > 0
        ? Math.round(
            programasActivos.reduce((sum, c) => sum + c.progreso, 0) / programasActivos.length,
          )
        : cursosCompletados > 0
          ? 100
          : 0

    const misProgramas = [...programasActivos].sort((a, b) => b.progreso - a.progreso)

    const cursosRecientes = misProgramas.slice(0, 4)

    const programasRecomendados = cursosRecomendadosRaw.map(c => ({
      id: c.id,
      titulo: c.titulo,
      slug: c.slug,
      miniatura: c.miniatura ?? undefined,
      categoria: c.categoria?.nombre,
    }))

    return ApiResponse.success(request, {
      kpis: {
        totalInscritos,
        cursosEnProgreso,
        cursosCompletados,
        totalCertificados,
        avanceGeneral,
        programasActivos: programasActivos.length,
      },
      misProgramas,
      cursosRecientes,
      certificadosRecientes: certificados.map(c => ({
        id: c.id,
        codigo_verificacion: c.codigo_verificacion,
        emitido_en: c.emitido_en,
        curso: c.curso,
      })),
      programasRecomendados,
      recursosNovedades: RECURSOS_NOVEDADES,
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
