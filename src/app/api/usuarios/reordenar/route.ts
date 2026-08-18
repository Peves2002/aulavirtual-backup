import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

export async function PUT(req: Request) {
  try {
    const { items } = await req.json()

    if (!Array.isArray(items)) {
      return NextResponse.json({ message: 'Formato de datos inválido' }, { status: 400 })
    }

    const updates = items.map((item: { id: string; orden: number }) => {
      return prisma.usuario.update({
        where: { id: item.id },
        data: { orden: item.orden }
      })
    })

    await prisma.$transaction(updates)

    return NextResponse.json({ message: 'Orden actualizado correctamente' }, { status: 200 })
  } catch (error) {
    console.error('Error reordenando docentes:', error)
    
return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
