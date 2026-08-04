import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

const slugify = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

export async function GET() {
  try {
    const categorias = await prisma.categoriaArticulo.findMany({
      orderBy: { nombre: 'asc' },
      include: {
        _count: { select: { articulos: true } }
      }
    })

    
return NextResponse.json(categorias)
  } catch (error) {
    console.error('Error fetching categorias articulo:', error)
    
return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { nombre } = data

    if (!nombre) {
      return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
    }

    const baseSlug = slugify(nombre)
    let slug = baseSlug
    let counter = 1

    while (await prisma.categoriaArticulo.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const categoria = await prisma.categoriaArticulo.create({
      data: { nombre, slug }
    })

    return NextResponse.json(categoria)
  } catch (error: any) {
    console.error('Error creating categoria articulo:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una categoría con ese nombre' }, { status: 400 })
    }

    
return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 })
  }
}
