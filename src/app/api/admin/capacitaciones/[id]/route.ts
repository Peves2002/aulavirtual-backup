import { NextResponse } from 'next/server'
import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.authorized) return auth.error

    const capacitacion = await prisma.capacitacion.findUnique({
      where: { id: params.id },
      include: {
        categoria: {
          select: { nombre: true, id: true }
        }
      }
    })

    if (!capacitacion) {
      return NextResponse.json({ error: 'Capacitación no encontrada' }, { status: 404 })
    }

    return NextResponse.json(capacitacion)
  } catch (error) {
    console.error('Error fetching capacitacion:', error)
    return NextResponse.json({ error: 'Error al obtener la capacitación' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.authorized) return auth.error

    const data = await request.json()

    if (!data.slug && data.titulo) {
      data.slug = data.titulo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const capacitacion = await prisma.capacitacion.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo,
        slug: data.slug,
        descripcion: data.descripcion,
        dirigido_a: data.dirigido_a,
        temario: data.temario,
        proximas_fechas: data.proximas_fechas,
        miniatura: data.miniatura,
        orden: Number(data.orden) || 0,
        estado: data.estado,
        categoria_id: data.categoria_id,
      }
    })

    return NextResponse.json(capacitacion)
  } catch (error: any) {
    console.error('Error updating capacitacion:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una capacitación con este slug' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error al actualizar la capacitación' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.authorized) return auth.error

    await prisma.capacitacion.delete({
      where: { id: params.id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting capacitacion:', error)
    return NextResponse.json({ error: 'Error al eliminar la capacitación' }, { status: 500 })
  }
}
