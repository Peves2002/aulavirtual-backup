import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'El correo electrónico es requerido' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Formato de correo electrónico inválido' }, { status: 400 })
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSuscriptor.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json({ error: 'Este correo electrónico ya se encuentra suscrito' }, { status: 400 })
    }

    // Save subscriber
    const subscriber = await prisma.newsletterSuscriptor.create({
      data: { email }
    })

    return NextResponse.json({ success: true, data: subscriber })
  } catch (error) {
    console.error('Error creating newsletter subscriber:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSuscriptor.findMany({
      orderBy: { creado_en: 'desc' }
    })

    
return NextResponse.json({ success: true, data: subscribers })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    
return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
