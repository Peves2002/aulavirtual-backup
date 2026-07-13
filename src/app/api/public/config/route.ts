export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'

/**
 * GET /api/public/config
 * Devuelve solo las claves de configuración no-sensibles que necesita el frontend público.
 * No requiere autenticación.
 */

const PUBLIC_KEYS = [
  'COMUNIDAD_HABILITADO',
  'COMUNIDAD_TEXTO',
  'COMUNIDAD_DESCRIPCION',
  'COMUNIDAD_URL',
  'COMUNIDAD_TIPO',
  'TEMPLATE_NAME',
  'WHATSAPP_NUMERO',
]

export async function GET() {
  try {
    const rows = await prisma.configuracion.findMany({
      where: { clave: { in: PUBLIC_KEYS } },
      select: { clave: true, valor: true }
    })

    const result: Record<string, string> = {}

    for (const row of rows) {
      result[row.clave] = row.valor
    }

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
    })
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}
