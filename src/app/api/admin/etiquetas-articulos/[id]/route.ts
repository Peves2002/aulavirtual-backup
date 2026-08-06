import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

const slugify = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { nombre } = data

    if (!nombre) {
      return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
    }

    const baseSlug = slugify(nombre)
    let slug = baseSlug
    let counter = 1

    while (
      await prisma.etiquetaArticulo.findFirst({
        where: { slug, id: { not: params.id } }
      })
    ) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const etiqueta = await prisma.etiquetaArticulo.update({
      where: { id: params.id },
      data: { nombre, slug }
    })

    return NextResponse.json(etiqueta)
  } catch (error: any) {
    console.error('Error updating etiqueta articulo:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una etiqueta con ese nombre' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Error al actualizar la etiqueta' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.etiquetaArticulo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Etiqueta eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting etiqueta articulo:', error)
    
    return NextResponse.json({ error: 'Error al eliminar la etiqueta' }, { status: 500 })
  }
}
