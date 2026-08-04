import { redirect } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import prisma from '@/utils/libs/prisma'
import MisGptsPage from '@/features/estudiante/mis-gpts/pages/MisGptsPage'

export const dynamic = 'force-dynamic'

interface Props { searchParams?: { success?: string } }

export default async function Page({ searchParams }: Props) {
  const session = await getAuthSession()

  if (!session?.user?.id) redirect('/login')

  let gpts: any[] = []

  try {
    const rows: any[] = await prisma.$queryRawUnsafe(`
      SELECT
        p.id,
        p.titulo,
        p.descripcion,
        p.miniatura,
        p.categoria,
        p.url_acceso,
        p.url_regalo,
        p.moneda,
        TO_CHAR(ig.inscrito_en AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS inscrito_en
      FROM inscripciones_gpt ig
      JOIN productos_ia p ON ig.producto_ia_id = p.id
      WHERE ig.usuario_id = $1 AND ig.estado = 'ACTIVO'
      ORDER BY ig.inscrito_en DESC
    `, session.user.id)

    gpts = rows.map(r => ({
      id: String(r.id),
      titulo: String(r.titulo ?? ''),
      descripcion: r.descripcion ? String(r.descripcion) : null,
      miniatura: r.miniatura ? String(r.miniatura) : null,
      categoria: r.categoria ? String(r.categoria) : null,
      url_acceso: r.url_acceso ? String(r.url_acceso) : null,
      url_regalo: r.url_regalo ? String(r.url_regalo) : null,
      moneda: String(r.moneda ?? 'PEN'),
      inscrito_en: String(r.inscrito_en ?? new Date().toISOString()),
    }))
  } catch (e) {
    console.error('[MisGpts] Error al obtener GPTs:', e)
  }

  return <MisGptsPage gpts={gpts} success={searchParams?.success === '1'} />
}
