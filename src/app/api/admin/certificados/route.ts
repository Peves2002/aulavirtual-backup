export const dynamic = 'force-dynamic'

import prisma from '@/utils/libs/prisma'

import { ApiResponse } from '@/utils/libs/apiResponse'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { validateRequest, handleApiError } from '@/utils/libs/validation'
import { crearCertificadoManualSchema } from '@/schemas/certificado.schema'
import { sanitizeDatetimeInput } from '@/utils/functions/sanitizeDatetime'

/**
 * GET /api/admin/certificados
 * Listar todos los certificados emitidos (solo ADMIN)
 */
export async function GET(request: Request) {
  try {
    // Verificar que sea admin
    const auth = await requireAdmin(request)

    if (!auth.authorized) {
      return auth.error
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const codigo = searchParams.get('codigo') || ''
    const nombre = searchParams.get('nombre') || ''

    const skip = (page - 1) * limit

    // Filtros
    const conditions: any[] = []


    if (codigo) {
      conditions.push({
        codigo_verificacion: { contains: codigo, mode: 'insensitive' }
      })
    }

    if (nombre) {
      conditions.push({
        usuario: {
          OR: [
            { nombre: { contains: nombre, mode: 'insensitive' } },
            { apellido: { contains: nombre, mode: 'insensitive' } }
          ]
        }
      })
    }

    const where: any = conditions.length > 0 ? { AND: conditions } : {}

    console.log('Certificados Filter Where:', JSON.stringify(where, null, 2))


    const [certificados, total] = await Promise.all([

      prisma.certificado.findMany({
        where,
        skip,
        take: limit,
        orderBy: { emitido_en: 'desc' },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              correo: true,
              avatar: true
            }
          },
          curso: {
            select: {
              id: true,
              titulo: true
            }
          }
        }
      }),
      prisma.certificado.count({ where })
    ])

    return ApiResponse.success(request, {
      certificados,
      paginacion: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/admin/certificados
 * Crea un certificado manual (solo ADMIN), sin requerir inscripción/progreso/examen previos.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const validation = validateRequest(crearCertificadoManualSchema, body, request)

    if (!validation.success) return validation.error

    const { usuario_id, curso_id, fecha_emision, fecha_inicio_curso, fecha_culminacion, nota_final, duracion } =
      validation.data

    const usuario = await prisma.usuario.findUnique({ where: { id: usuario_id } })

    if (!usuario) {
      return ApiResponse.error(request, 'El estudiante seleccionado no existe', 404)
    }

    const cursoData = await prisma.curso.findUnique({
      where: { id: curso_id },
      include: {
        profesor: {
          select: { nombre: true, apellido: true, cargo: true, firma: true }
        }
      }
    })

    if (!cursoData) {
      return ApiResponse.error(request, 'El curso seleccionado no existe', 404)
    }

    const certificadoExistente = await prisma.certificado.findUnique({
      where: { usuario_id_curso_id: { usuario_id, curso_id } }
    })

    if (certificadoExistente) {
      return ApiResponse.error(request, 'Este estudiante ya tiene un certificado para este curso', 409)
    }

    const fechaEmisionParsed = sanitizeDatetimeInput(fecha_emision)
    const fechaInicioParsed = sanitizeDatetimeInput(fecha_inicio_curso)
    const fechaCulminacionParsed = sanitizeDatetimeInput(fecha_culminacion)

    const emitidoEn = fechaEmisionParsed ? new Date(fechaEmisionParsed) : new Date()

    // Código de verificación: mismo formato que la emisión automática del estudiante.
    const anioEmision = emitidoEn.getFullYear()
    const codigoCurso = (cursoData.codigo || cursoData.titulo.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4) || 'GEN').toUpperCase()
    const certificadosDelCurso = await prisma.certificado.count({ where: { curso_id } })
    const numeroCertificado = String(certificadosDelCurso + 1).padStart(4, '0')
    const codigoVerificacion = `CER-${anioEmision}-${codigoCurso} - ${numeroCertificado}`

    const datosSnapshot = {
      curso: {
        titulo: cursoData.titulo,
        codigo: codigoCurso,
        duracion: duracion || cursoData.duracion,
        nivel: cursoData.nivel,
        tipo_emision: cursoData.tipo_emision,
        fecha_inicio: cursoData.fecha_inicio
      },
      numero_certificado: numeroCertificado,
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido
      },
      profesor: {
        nombre: cursoData.profesor.nombre,
        apellido: cursoData.profesor.apellido,
        cargo: cursoData.profesor.cargo,
        firma: cursoData.profesor.firma
      },
      fechas: {
        inicio_curso: fechaInicioParsed ? new Date(fechaInicioParsed) : cursoData.fecha_inicio,
        culminacion: fechaCulminacionParsed ? new Date(fechaCulminacionParsed) : emitidoEn,
        emision: emitidoEn
      },
      nota_final: nota_final ?? null,
      creado_manualmente_por_admin: true
    }

    const certificado = await prisma.certificado.create({
      data: {
        usuario_id,
        curso_id,
        codigo_verificacion: codigoVerificacion,
        emitido_en: emitidoEn,
        datos: datosSnapshot as any
      },
      include: {
        curso: { select: { id: true, titulo: true } },
        usuario: { select: { id: true, nombre: true, apellido: true, correo: true, avatar: true } }
      }
    })

    return ApiResponse.success(request, { certificado }, 201)
  } catch (error) {
    return handleApiError(error, request)
  }
}
