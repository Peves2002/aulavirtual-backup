import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const autores = await prisma.usuario.findMany({
      where: {
        rol: {
          in: ['ADMIN', 'PROFESOR']
        }
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        rol: true
      },
      orderBy: { nombre: 'asc' }
    })

    return NextResponse.json(autores)
  } catch (error) {
    console.error('Error fetching autores:', error)

return NextResponse.json({ error: 'Error al obtener los autores' }, { status: 500 })
  }
}
