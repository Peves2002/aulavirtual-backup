export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { handleApiError, validateRequest } from '@/utils/libs/validation'
import { requireAdmin } from '@/utils/libs/auth-helpers'
import { crearVideoSchema } from '@/schemas/video.schema'

/**
 * GET /api/admin/videos — Listado completo (admin)
 */
export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const { searchParams } = new URL(request.url)
    const buscar = searchParams.get('buscar') ?? undefined

    const where: any = {}

    if (buscar) {
      where.OR = [
        { titulo: { contains: buscar, mode: 'insensitive' } },
        { url: { contains: buscar, mode: 'insensitive' } },
      ]
    }

    const videos = await prisma.video.findMany({
      where,
      orderBy: { creado_en: 'desc' },
    })

    return NextResponse.json({ videos })
  } catch (error) {
    return handleApiError(error, request)
  }
}

/**
 * POST /api/admin/videos — Crear video
 */
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request)

    if (!auth.authorized) return auth.error

    const body = await request.json()
    const validation = validateRequest(crearVideoSchema, body, request)

    if (!validation.success) return validation.error

    const { url, titulo } = validation.data

    const video = await prisma.video.create({
      data: {
        url: url.trim(),
        titulo: titulo?.trim() || null,
      },
    })

    return NextResponse.json({ video })
  } catch (error) {
    return handleApiError(error, request)
  }
}
