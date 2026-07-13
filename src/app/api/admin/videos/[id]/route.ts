export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { handleApiError, validateRequest } from '@/utils/libs/validation'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { actualizarVideoSchema } from '@/schemas/video.schema'

/**
 * GET /api/admin/videos/[id] — Obtener video individual
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const video = await prisma.video.findUnique({
      where: { id: params.id },
    })

    if (!video) {
      return NextResponse.json({ message: 'Video no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ video })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * PUT /api/admin/videos/[id] — Actualizar video
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const validation = validateRequest(actualizarVideoSchema, body, request)

    if (!validation.success) return validation.error

    const { url, titulo } = validation.data

    const video = await prisma.video.update({
      where: { id: params.id },
      data: {
        url: url ? url.trim() : undefined,
        titulo: titulo !== undefined ? (titulo?.trim() || null) : undefined,
      },
    })

    return NextResponse.json({ video })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * DELETE /api/admin/videos/[id] — Eliminar video
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    await prisma.video.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Video eliminado correctamente' })
  } catch (error) {
    return handleApiError(error, request)
  }
}
