import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tipo = searchParams.get('tipo')
    const tipos = searchParams.get('tipos')
    
    const query: any = {}

    if (tipo) {
      query.tipo = tipo
    } else if (tipos) {
      query.tipo = { in: tipos.split(',') }
    }

    const articulos = await prisma.articulo.findMany({
      where: query,
      orderBy: { creado_en: 'desc' },
      include: {
        categorias: true,
        etiquetas: true
      }
    })
    
    return NextResponse.json(articulos)
  } catch (error) {
    console.error('Error fetching articulos:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Auto-generate slug from title if not provided
    if (!data.slug && data.titulo) {
      data.slug = data.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const categoriaIds = data.categorias || []
    const etiquetaIds = data.etiquetas || []

    const articulo = await prisma.articulo.create({
      data: {
        titulo: data.titulo,
        slug: data.slug,
        resumen: data.resumen,
        contenido: data.contenido || '',
        miniatura: data.miniatura,
        tipo: data.tipo || 'NOTICIA',
        estado: data.estado || 'BORRADOR',
        autor: data.autor,
        es_destacado: data.es_destacado || false,
        enlace_externo: data.enlace_externo,
        fecha_publicacion: data.fecha_publicacion ? new Date(data.fecha_publicacion) : new Date(),
        categorias: {
          connect: categoriaIds.map((id: string) => ({ id }))
        },
        etiquetas: {
          connect: etiquetaIds.map((id: string) => ({ id }))
        },
        fecha_evento: data.tipo === 'EVENTO' && data.fecha_evento ? new Date(data.fecha_evento) : null,
        hora_evento: data.tipo === 'EVENTO' ? data.hora_evento : null,
        modalidad_evento: data.tipo === 'EVENTO' ? data.modalidad_evento : null,
        expositor: data.tipo === 'EVENTO' ? data.expositor : null,
        link_registro: data.tipo === 'EVENTO' ? data.link_registro : null,
        codigo_embeber: data.codigo_embeber || null
      }
    })
    
    return NextResponse.json(articulo, { status: 201 })
  } catch (error) {
    console.error('Error creating articulo:', error)
    
return NextResponse.json({ error: 'Error al crear el artículo' }, { status: 500 })
  }
}
