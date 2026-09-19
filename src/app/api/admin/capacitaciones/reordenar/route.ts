import { NextResponse } from 'next/server'
import prisma from '@/utils/libs/prisma'

export async function PUT(request: Request) {
  try {
    const { items } = await request.json()

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Formato inválido, se esperaba un arreglo de items' }, { status: 400 })
    }

    await prisma.$transaction(
      items.map((item: any) =>
        prisma.capacitacion.update({
          where: { id: item.id },
          data: { orden: item.orden },
        })
      )
    )

    return NextResponse.json({ success: true, message: 'Capacitaciones reordenadas correctamente' })
  } catch (error: any) {
    console.error('Error al reordenar capacitaciones:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
