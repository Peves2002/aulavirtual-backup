import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        categoria: {
          select: { nombre: true }
        }
      }
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog no encontrado' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)

return NextResponse.json({ error: 'Error al obtener el blog' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const data = await request.json()

    if (data.slug === '') {
      data.slug = data.titulo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo,
        slug: data.slug,
        extracto: data.extracto,
        contenido: data.contenido,
        miniatura: data.miniatura,
        estado: data.estado,
        fecha_publicacion: data.fecha_publicacion ? new Date(data.fecha_publicacion) : null,
        categoria_id: data.categoria_id,
        autor: data.autor,
      }
    })

    return NextResponse.json(blog)
  } catch (error: any) {
    console.error('Error updating blog:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe un blog con este slug' }, { status: 400 })
    }


return NextResponse.json({ error: 'Error al actualizar el blog' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    await prisma.blog.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)

return NextResponse.json({ error: 'Error al eliminar el blog' }, { status: 500 })
  }
}
