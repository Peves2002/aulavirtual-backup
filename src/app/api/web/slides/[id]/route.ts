import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    const { titulo, subtitulo, imagen_url, boton_texto, boton_url, orden, esta_activo } = body

    if (!titulo || !imagen_url || !boton_url) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        titulo,
        subtitulo,
        imagen_url,
        boton_texto: boton_texto || 'Más información',
        boton_url,
        orden: orden !== undefined ? Number(orden) : undefined,
        esta_activo: esta_activo !== undefined ? Boolean(esta_activo) : undefined
      }
    })

    return NextResponse.json({ success: true, data: slide })
  } catch (error) {
    console.error('Error updating slide:', error)
    
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.heroSlide.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Slide eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting slide:', error)
    
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
