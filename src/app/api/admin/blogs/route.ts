import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10))
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where = search ? {
      OR: [
        { titulo: { contains: search, mode: 'insensitive' as const } },
        { contenido: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}

    const [total, blogs] = await Promise.all([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { creado_en: 'desc' },
        include: {
          categoria: {
            select: { nombre: true }
          }
        }
      })
    ])

    return NextResponse.json({
      data: blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)

return NextResponse.json({ error: 'Error al obtener los blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const data = await request.json()

    // Auto-generate slug from title if not provided
    if (!data.slug && data.titulo) {
      data.slug = data.titulo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const blog = await prisma.blog.create({
      data: {
        titulo: data.titulo,
        slug: data.slug,
        extracto: data.extracto,
        contenido: data.contenido,
        miniatura: data.miniatura,
        estado: data.estado || 'BORRADOR',
        fecha_publicacion: data.fecha_publicacion ? new Date(data.fecha_publicacion) : null,
        autor: data.autor,
        categoria_id: data.categoria_id,
      }
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe un blog con este slug' }, { status: 400 })
    }


return NextResponse.json({ error: 'Error al crear el blog' }, { status: 500 })
  }
}
