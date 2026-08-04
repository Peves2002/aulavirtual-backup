import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articulo = await prisma.articulo.findUnique({
      where: { id: params.id },
      include: { categorias: true,
        etiquetas: true }
    })

    if (!articulo) {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 })
    }

    return NextResponse.json(articulo)
  } catch (error) {
    console.error('Error fetching articulo:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    // Auto-generate slug from title if not provided
    if (!data.slug && data.titulo) {
      data.slug = data.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const categoriaIds = data.categorias
    const etiquetaIds = data.etiquetas || []

    const articulo = await prisma.articulo.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo,
        slug: data.slug,
        resumen: data.resumen,
        contenido: data.contenido,
        miniatura: data.miniatura,
        tipo: data.tipo,
        estado: data.estado,
        autor: data.autor,
        es_destacado: data.es_destacado,
        enlace_externo: data.enlace_externo,
        fecha_publicacion: data.fecha_publicacion ? new Date(data.fecha_publicacion) : undefined,
        categorias: {
          set: categoriaIds.map((id: string) => ({ id }))
        },
        etiquetas: {
          set: etiquetaIds.map((id: string) => ({ id }))
        }
      }
    })

    return NextResponse.json(articulo)
  } catch (error) {
    console.error('Error updating articulo:', error)
    
return NextResponse.json({ error: 'Error al actualizar el artículo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.articulo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Artículo eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting articulo:', error)
    
return NextResponse.json({ error: 'Error al eliminar el artículo' }, { status: 500 })
  }
}
