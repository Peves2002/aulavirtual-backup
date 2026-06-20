export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { handleApiError } from '@/utils/libs/validation'
import { getConfigs } from '@/utils/libs/config'
import { buildCertificadoPdf } from '@/utils/libs/certificado-pdf'

/**
 * GET /api/admin/certificados/[id]/download
 * Genera y descarga el PDF del certificado (solo ADMIN)
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const reqUrl = new URL(request.url)

    // Cargar en paralelo
    const [certificado, configs] = await Promise.all([
      prisma.certificado.findUnique({
        where: { id: params.id },
        include: {
          curso: {
            select: {
              titulo: true,
              codigo: true,
              duracion: true,
              nivel: true,
              fecha_inicio: true,
              tipo_emision: true
            }
          },
          usuario: { select: { nombre: true, apellido: true } }
        }
      }),
      getConfigs()
    ])

    if (!certificado) {
      return NextResponse.json({ error: 'Certificado no encontrado' }, { status: 404 })
    }

    const inscripcion = await prisma.inscripcion.findUnique({
      where: {
        usuario_id_curso_id: {
          usuario_id: certificado.usuario_id,
          curso_id: certificado.curso_id
        }
      },
      select: { completado_en: true, inscrito_en: true }
    })

    const appUrl = `${reqUrl.protocol}//${reqUrl.host}`

    const pdfArrayBuffer = await buildCertificadoPdf({ certificado, inscripcion, configs, appUrl })

    const preview = reqUrl.searchParams.get('preview') === 'true'

    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${preview ? 'inline' : 'attachment'}; filename="certificado-${certificado.codigo_verificacion.replace(/\//g, '-')}.pdf"`,
        'Content-Length': pdfArrayBuffer.byteLength.toString()
      }
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
