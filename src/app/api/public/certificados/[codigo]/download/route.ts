import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { rateLimiter } from '@/utils/libs/rate-limit'
import { getPdfBuffer } from '@/app/api/_shared/certificados/getPdfBuffer'

export const dynamic = 'force-dynamic'
const limiter = rateLimiter({ windowMs: 60_000, max: 10 })

export async function GET(request: Request, { params }: { params: { codigo: string } }) {
  if (!limiter(request).success) {
    return NextResponse.json({ message: 'Espera un minuto antes de descargar otro certificado.' }, { status: 429 })
  }

  try {
    const certificado = await prisma.certificado.findUnique({
      where: { codigo_verificacion: params.codigo }, select: { id: true }
    })

    if (!certificado) return NextResponse.json({ message: 'Certificado no encontrado.' }, { status: 404 })

    const { buffer } = await getPdfBuffer(certificado.id, new URL(request.url))
    const filename = `certificado-${params.codigo.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`

    return new NextResponse(buffer, { headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    } })
  } catch {
    return NextResponse.json({ message: 'No pudimos generar el PDF. Inténtalo nuevamente.' }, { status: 500 })
  }
}
