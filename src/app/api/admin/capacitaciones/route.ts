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
        { descripcion: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}

    const [total, capacitaciones] = await Promise.all([
      prisma.capacitacion.count({ where }),
      prisma.capacitacion.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ orden: 'asc' }, { creado_en: 'desc' }],
        include: {
          categoria: {
            select: { nombre: true }
          }
        }
      })
    ])

    return NextResponse.json({
      data: capacitaciones,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching capacitaciones:', error)
    return NextResponse.json({ error: 'Error al obtener las capacitaciones' }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    const capacitacion = await prisma.capacitacion.create({
      data: {
        titulo: data.titulo,
        slug: data.slug,
        descripcion: data.descripcion,
        dirigido_a: data.dirigido_a,
        temario: data.temario,
        proximas_fechas: data.proximas_fechas,
        miniatura: data.miniatura,
        orden: Number(data.orden) || 0,
        estado: data.estado || 'BORRADOR',
        categoria_id: data.categoria_id,
      }
    })

    return NextResponse.json(capacitacion, { status: 201 })
  } catch (error: any) {
    console.error('Error creating capacitacion:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe una capacitación con este slug' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error al crear la capacitación' }, { status: 500 })
  }
}
