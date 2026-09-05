import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

async function recalcularAccesos(inscripcionId: string, cursoId: string) {
  const cuotas = await prisma.registroCuotaManual.findMany({
    where: { inscripcion_id: inscripcionId }
  })
  
  const modulosPermitidos = new Set<string>()

  for (const cuota of cuotas) {
    if ((cuota as any).modulo_ids && Array.isArray((cuota as any).modulo_ids)) {
      ((cuota as any).modulo_ids as string[]).forEach(id => modulosPermitidos.add(id))
    } else {
      const config = await prisma.configCuotaManual.findUnique({
        where: { curso_id_numero_cuota: { curso_id: cursoId, numero_cuota: cuota.numero_cuota } }
      })

      if (config && Array.isArray(config.modulo_ids)) {
        (config.modulo_ids as string[]).forEach(id => modulosPermitidos.add(id))
      }
    }
  }

  const accesosData = Array.from(modulosPermitidos).map(moduloId => ({
    inscripcion_id: inscripcionId,
    modulo_id: moduloId
  }))

  await prisma.$transaction(async (tx) => {
    // Delete existing
    await tx.accesoModuloInscripcion.deleteMany({
      where: { inscripcion_id: inscripcionId }
    })
    
    // Insert new
    if (accesosData.length > 0) {
      await tx.accesoModuloInscripcion.createMany({
        data: accesosData
      })
    }
  })
}

export async function PUT(request: Request, { params }: { params: { usuarioId: string, cuotaId: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    if (auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ message: 'No tienes permisos de administrador' }, { status: 403 })
    }

    const { cuotaId } = params
    const body = await request.json()

    const cuota = await prisma.registroCuotaManual.findUnique({
      where: { id: cuotaId }
    })

    if (!cuota) return NextResponse.json({ message: 'Cuota no encontrada' }, { status: 404 })

    const { monto_pago, confirmacion, fecha_envio, observaciones, moduloIds } = body

    const dataToUpdate: any = {}

    if (monto_pago !== undefined) dataToUpdate.monto_pago = monto_pago
    if (confirmacion !== undefined) dataToUpdate.confirmacion = confirmacion
    if (fecha_envio !== undefined) dataToUpdate.fecha_envio = fecha_envio ? new Date(fecha_envio) : null
    if (observaciones !== undefined) dataToUpdate.observaciones = observaciones

    await prisma.registroCuotaManual.update({
      where: { id: cuotaId },
      data: dataToUpdate
    })

    if (moduloIds !== undefined) {
      const jsonModuloIds = JSON.stringify(Array.isArray(moduloIds) ? moduloIds : [])

      await prisma.$executeRawUnsafe(
        `UPDATE "registros_cuota_manual" SET "modulo_ids" = $1::jsonb WHERE "id" = $2`,
        jsonModuloIds,
        cuotaId
      )
      await recalcularAccesos(cuota.inscripcion_id, cuota.curso_id)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error al actualizar cuota individual:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { usuarioId: string, cuotaId: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    if (auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ message: 'No tienes permisos de administrador' }, { status: 403 })
    }

    const { cuotaId } = params

    const cuota = await prisma.registroCuotaManual.findUnique({
      where: { id: cuotaId }
    })

    if (!cuota) return NextResponse.json({ message: 'Cuota no encontrada' }, { status: 404 })

    await prisma.registroCuotaManual.delete({
      where: { id: cuotaId }
    })

    await recalcularAccesos(cuota.inscripcion_id, cuota.curso_id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error al eliminar cuota individual:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
