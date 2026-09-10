import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { rateLimiter } from '@/utils/libs/rate-limit'

const limiter = rateLimiter({ windowMs: 60_000, max: 15 })
const headers = { 'Cache-Control': 'no-store' }

export async function POST(request: Request) {
  if (!limiter(request).success) {
    return NextResponse.json({ message: 'Has realizado varias consultas. Espera un minuto e inténtalo nuevamente.' }, { status: 429, headers })
  }

  let dni: unknown

  try {
    dni = (await request.json())?.dni
  } catch {
    return NextResponse.json({ message: 'La solicitud no es válida.' }, { status: 400, headers })
  }

  if (typeof dni !== 'string' || !/^\d{8}$/.test(dni)) {
    return NextResponse.json({ message: 'Ingresa un DNI de 8 dígitos.' }, { status: 400, headers })
  }

  try {
    const certificados = await prisma.certificado.findMany({
      where: { usuario: { numero_documento: dni } },
      orderBy: { emitido_en: 'desc' },
      select: {
        codigo_verificacion: true, emitido_en: true, datos: true,
        usuario: { select: { nombre: true, apellido: true } },
        curso: { select: { titulo: true, duracion: true } }
      }
    })

    return NextResponse.json({ certificados: certificados.map(certificado => {
      const snapshot = certificado.datos as {
        curso?: { titulo?: string; duracion?: string }
        fechas?: { emision?: string }
      } | null

      return {
        codigo: certificado.codigo_verificacion,
        estudiante: `${certificado.usuario.nombre} ${certificado.usuario.apellido}`,
        curso: snapshot?.curso?.titulo || certificado.curso.titulo,
        duracion: snapshot?.curso?.duracion || certificado.curso.duracion,
        emision: snapshot?.fechas?.emision || certificado.emitido_en.toISOString()
      }
    }) }, { headers })
  } catch {
    return NextResponse.json({ message: 'No pudimos consultar los certificados. Inténtalo nuevamente.' }, { status: 500, headers })
  }
}
