import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

const slugify = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

export async function GET() {
  try {
    const etiquetas = await prisma.etiquetaArticulo.findMany({
      orderBy: { nombre: 'asc' },
      include: {
        _count: { select: { articulos: true } }
      }
    })

    
return NextResponse.json(etiquetas)
  } catch (error) {
    console.error('Error fetching etiquetas articulo:', error)
    
return NextResponse.json({ error: 'Error al obtener etiquetas' }, { status: 500 })
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

    while (await prisma.etiquetaArticulo.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const etiqueta = await prisma.etiquetaArticulo.create({
      data: { nombre, slug }
    })

    return NextResponse.json(etiqueta)
  } catch (error: any) {
    console.error('Error creating etiqueta articulo:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una etiqueta con ese nombre' }, { status: 400 })
    }

    
return NextResponse.json({ error: 'Error al crear la etiqueta' }, { status: 500 })
  }
}
