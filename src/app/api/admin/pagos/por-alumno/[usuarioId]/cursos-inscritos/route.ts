import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

export async function GET(request: Request, { params }: { params: { usuarioId: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    if (auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ message: 'No tienes permisos de administrador' }, { status: 403 })
    }

    const { usuarioId } = params

    // Cursos en los que está inscrito el alumno
    const inscripciones = await prisma.inscripcion.findMany({
      where: { usuario_id: usuarioId },
      include: {
        curso: {
          select: {
            id: true,
            titulo: true,
            modulos: {
              select: { id: true, titulo: true, orden: true },
              orderBy: { orden: 'asc' }
            }
          }
        },
        registros_cuota_manual: {
          select: { numero_cuota: true }
        },
        accesos_modulo: {
          select: { modulo_id: true }
        }
      },
      orderBy: { inscrito_en: 'desc' }
    })

    const cursos = inscripciones.map(ins => {
      const maxCuota = ins.registros_cuota_manual.reduce((max, r) => Math.max(max, r.numero_cuota), 0)

      
return {
        id: ins.curso.id,
        titulo: ins.curso.titulo,
        modulos: ins.curso.modulos,
        modulosPermitidos: ins.accesos_modulo.map(a => a.modulo_id),
        siguienteCuota: maxCuota + 1
      }
    })

    return NextResponse.json({ cursos })
  } catch (error: any) {
    console.error('Error al obtener cursos inscritos:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
