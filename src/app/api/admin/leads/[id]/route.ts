/* eslint-disable padding-line-between-statements, newline-before-return, import/order */
import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import prisma from '@/utils/libs/prisma'
import { getAuthOptions } from '@/utils/configs/auth'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const options = await getAuthOptions()
    const session = await getServerSession(options)
    
    if (!session || (!session.user?.permisos?.includes('VER_LEADS') && session.user?.rol !== 'ADMIN')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { nombres, apellidos, email, celular, dni, profesion, detalle, pais } = body

    const lead = await prisma.leadPortada.update({
      where: { id: params.id },
      data: {
        nombres,
        apellidos,
        email,
        celular,
        dni: dni || '',
        profesion: profesion || '',
        detalle: detalle || '',
        pais: pais || ''
      }
    })
    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const options = await getAuthOptions()
    const session = await getServerSession(options)
    
    if (!session || (!session.user?.permisos?.includes('VER_LEADS') && session.user?.rol !== 'ADMIN')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await prisma.leadPortada.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
