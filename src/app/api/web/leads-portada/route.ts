import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const { nombres, apellidos, email, celular, pais, ciudad, profesion, detalle, escuela } = body

    // Validation
    if (!nombres || !apellidos || !email || !celular) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const lead = await prisma.leadPortada.create({
      data: {
        nombres,
        apellidos,
        email,
        celular,
        pais,
        ciudad,
        profesion,
        detalle,
        dni: '', // Defaults for old fields if still required
        escuela: escuela || '',
        modalidad: '',
        aceptaDatos: true,
        autorizaPublicidad: true,
      }
    })

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('Error creating lead portada:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await prisma.leadPortada.findMany({
      orderBy: { creado_en: 'desc' }
    })
    
    return NextResponse.json({ success: true, data: leads })
  } catch (error) {
    console.error('Error fetching leads portada:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
