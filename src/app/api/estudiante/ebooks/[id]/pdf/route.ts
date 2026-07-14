export const dynamic = 'force-dynamic'

import { readFile } from 'fs/promises'
import path from 'path'

import { NextResponse } from 'next/server'

import { handleApiError } from '@/utils/libs/validation'
import prisma from '@/utils/libs/prisma'
import { requireAuth } from '@/utils/libs/auth-helpers'

/**
 * GET /api/estudiante/ebooks/[id]/pdf
 * Sirve el PDF del ebook de forma segura (inline, sin descarga).
 * Solo accesible para usuarios autenticados con EbookAcceso registrado.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(request)

    if (!auth.authorized) return auth.error

    const ebook = await prisma.ebook.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
        estado: 'PUBLICADO',
      },
      select: { id: true, titulo: true, archivo_pdf: true },
    })

    if (!ebook) return NextResponse.json({ error: 'Ebook no encontrado' }, { status: 404 })

    const acceso = await prisma.ebookAcceso.findUnique({
      where: { usuario_id_ebook_id: { usuario_id: auth.user.id, ebook_id: ebook.id } },
    })

    if (!acceso && auth.user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No tienes acceso a este ebook' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const list = searchParams.get('list') === 'true'
    const download = searchParams.get('download') === 'true'
    const indexParam = searchParams.get('index')
    const index = indexParam ? parseInt(indexParam, 10) : 0

    if (list) {
      let pdfList = [{ nombre: 'PDF Principal', url: ebook.archivo_pdf }]

      if (ebook.archivo_pdf.trim().startsWith('[')) {
        try {
          const parsed = JSON.parse(ebook.archivo_pdf)

          if (Array.isArray(parsed)) {
            pdfList = parsed.map((item, idx) => ({
              nombre: item.nombre || `Archivo PDF ${idx + 1}`,
              url: item.url || '',
            })).filter(f => f.url)
          }
        } catch {}
      }

      return NextResponse.json({ pdfs: pdfList })
    }

    let pdfPath = ebook.archivo_pdf
    let fileName = `${ebook.titulo}.pdf`

    if (ebook.archivo_pdf.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(ebook.archivo_pdf)

        if (Array.isArray(parsed) && parsed.length > 0) {
          const selected = parsed[index] || parsed[0]

          pdfPath = selected.url || ''

          if (selected.nombre) {
            fileName = `${ebook.titulo} - ${selected.nombre}.pdf`
          }
        }
      } catch (e) {
        // Fallback to legacy string
      }
    }

    if (!pdfPath) {
      return NextResponse.json({ error: 'Archivo PDF no disponible' }, { status: 404 })
    }

    let pdfBuffer: Buffer

    if (pdfPath.startsWith('http://') || pdfPath.startsWith('https://')) {
      const res = await fetch(pdfPath)

      if (!res.ok) return NextResponse.json({ error: 'No se pudo obtener el archivo' }, { status: 502 })
      pdfBuffer = Buffer.from(await res.arrayBuffer())
    } else {
      // Paths from /api/media are relative URLs like /uploads/cursos/file.pdf
      // path.isAbsolute('/uploads/...') returns true on Windows (/ is a path separator)
      // but the actual file lives under public/ — always join with cwd/public
      const absPath = path.join(process.cwd(), 'public', pdfPath)

      pdfBuffer = await readFile(absPath)
    }

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': download ? `attachment; filename="${encodeURIComponent(fileName)}"` : 'inline',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    return handleApiError(error, request)
  }
}
