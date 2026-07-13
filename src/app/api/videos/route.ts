export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import prisma from '@/utils/libs/prisma'
import { handleApiError } from '@/utils/libs/validation'

/**
 * GET /api/videos — Listado completo de videos (público)
 */
export async function GET(request: Request) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { creado_en: 'desc' },
    })

    return NextResponse.json({ videos })
  } catch (error) {
    return handleApiError(error, request)
  }
}
