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
      await prisma.categoriaArticulo.findFirst({
        where: { slug, id: { not: params.id } }
      })
    ) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const categoria = await prisma.categoriaArticulo.update({
      where: { id: params.id },
      data: { nombre, slug }
    })

    return NextResponse.json(categoria)
  } catch (error: any) {
    console.error('Error updating categoria articulo:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una categoría con ese nombre' }, { status: 400 })
    }

    
return NextResponse.json({ error: 'Error al actualizar la categoría' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.categoriaArticulo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Categoría eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting categoria articulo:', error)
    
return NextResponse.json({ error: 'Error al eliminar la categoría' }, { status: 500 })
  }
}
