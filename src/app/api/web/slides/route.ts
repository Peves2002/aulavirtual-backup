import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

const DEFAULT_SLIDES = [
  {
    id: 'default-slide-1',
    titulo: 'Desarrolla tu potencial con ADPH Group',
    subtitulo: 'Educación ejecutiva especializada para líderes que buscan transformar la cultura y productividad de sus organizaciones.',
    imagen_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    boton_texto: 'Conocer Programas',
    boton_url: '/programas',
    orden: 0,
    esta_activo: true
  },
  {
    id: 'default-slide-2',
    titulo: 'Liderazgo que Transforma Organizaciones',
    subtitulo: 'Aprende con expertos en gestión humana y metodologías ágiles diseñadas para el impacto inmediato.',
    imagen_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80',
    boton_texto: 'Explorar Escuelas',
    boton_url: '#escuelas',
    orden: 1,
    esta_activo: true
  },
  {
    id: 'default-slide-3',
    titulo: 'Soluciones In-Company a la Medida',
    subtitulo: 'Potenciamos el talento de tu empresa a través de consultoría y entrenamiento digital de alto nivel.',
    imagen_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
    boton_texto: 'Soluciones Corporativas',
    boton_url: '/consultoria',
    orden: 2,
    esta_activo: true
  }
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const slides = await prisma.heroSlide.findMany({
      where: all ? {} : { esta_activo: true },
      orderBy: { orden: 'asc' }
    })

    if (slides.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_SLIDES })
    }

    return NextResponse.json({ success: true, data: slides })
  } catch (error) {
    console.error('Error fetching slides:', error)

    // Fallback gracefully to default slides so the UI never breaks
    return NextResponse.json({ success: true, data: DEFAULT_SLIDES })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { titulo, subtitulo, imagen_url, boton_texto, boton_url, orden } = body

    if (!titulo || !imagen_url || !boton_url) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const slide = await prisma.heroSlide.create({
      data: {
        titulo,
        subtitulo,
        imagen_url,
        boton_texto: boton_texto || 'Más información',
        boton_url,
        orden: Number(orden) || 0
      }
    })

    return NextResponse.json({ success: true, data: slide })
  } catch (error) {
    console.error('Error creating slide:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
