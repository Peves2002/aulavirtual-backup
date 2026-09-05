import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

export async function POST(request: Request, { params }: { params: { usuarioId: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    if (auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ message: 'No tienes permisos de administrador' }, { status: 403 })
    }

    const { usuarioId } = params
    const body = await request.json()
    const { cursoId, moduloIds } = body

    if (!cursoId) {
      return NextResponse.json({ message: 'Se requiere el ID del curso' }, { status: 400 })
    }

    const inscripcion = await prisma.inscripcion.findUnique({
      where: {
        usuario_id_curso_id: {
          usuario_id: usuarioId,
          curso_id: cursoId
        }
      }
    })

    if (!inscripcion) {
      return NextResponse.json({ message: 'El alumno no está inscrito en este curso' }, { status: 404 })
    }

    // Obtener la máxima cuota actual
    const maxCuotaAg = await prisma.registroCuotaManual.aggregate({
      where: { inscripcion_id: inscripcion.id },
      _max: { numero_cuota: true }
    })
    
    const numeroCuota = (maxCuotaAg._max.numero_cuota ?? 0) + 1

    let modulosAActivar: string[] = []

    if (Array.isArray(moduloIds)) {
      modulosAActivar = moduloIds
    } else {
      // Verificar si hay configuración previa de módulos para esta cuota en este curso
      const config = await prisma.configCuotaManual.findUnique({
        where: {
          curso_id_numero_cuota: {
            curso_id: cursoId,
            numero_cuota: numeroCuota
          }
        }
      })

      if (config && Array.isArray(config.modulo_ids)) {
        modulosAActivar = config.modulo_ids as string[]
      }
    }

    // Crear el registro de cuota y asignar los accesos en una transacción
    await prisma.$transaction(async (tx) => {
      await tx.registroCuotaManual.create({
        data: {
          curso_id: cursoId,
          inscripcion_id: inscripcion.id,
          usuario_id: usuarioId,
          numero_cuota: numeroCuota,
          monto_pago: 0,
          confirmacion: 'NO_ENVIADO',
          observaciones: '',
          modulo_ids: modulosAActivar.length > 0 ? modulosAActivar : []
        }
      })

      if (modulosAActivar.length > 0) {
        const accesosData = modulosAActivar.map(moduloId => ({
          inscripcion_id: inscripcion.id,
          modulo_id: moduloId
        }))

        // Upsert no es posible con createMany, usaremos find y create si no existe
        // pero dado que es una cuota nueva, los modulos no deberían estar creados por esta misma cuota,
        // aunque podrían estarlo por una previa (lo cual sería raro pero posible).
        for (const acceso of accesosData) {
          const existente = await tx.accesoModuloInscripcion.findUnique({
            where: {
              inscripcion_id_modulo_id: {
                inscripcion_id: acceso.inscripcion_id,
                modulo_id: acceso.modulo_id
              }
            }
          })

          if (!existente) {
            await tx.accesoModuloInscripcion.create({ data: acceso })
          }
        }
      }
    })

    return NextResponse.json({ success: true, numeroCuota })
  } catch (error: any) {
    console.error('Error al crear cuota individual:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
