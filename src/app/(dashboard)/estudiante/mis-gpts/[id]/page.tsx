import { redirect, notFound } from 'next/navigation'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import prisma from '@/utils/libs/prisma'
import GptDetailPage from '@/features/estudiante/mis-gpts/pages/GptDetailPage'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export default async function Page({ params }: Props) {
  const session = await getAuthSession()

  if (!session?.user?.id) redirect('/login')

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
        p.precio,
        TO_CHAR(ig.inscrito_en AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS inscrito_en
      FROM inscripciones_gpt ig
      JOIN productos_ia p ON ig.producto_ia_id = p.id
      WHERE ig.usuario_id = $1 AND p.id = $2 AND ig.estado = 'ACTIVO'
      LIMIT 1
    `, session.user.id, params.id)

    if (!rows.length) notFound()

    const r = rows[0]

    const gpt = {
      id: String(r.id),
      titulo: String(r.titulo ?? ''),
      descripcion: r.descripcion ? String(r.descripcion) : null,
      miniatura: r.miniatura ? String(r.miniatura) : null,
      categoria: r.categoria ? String(r.categoria) : null,
      url_acceso: r.url_acceso ? String(r.url_acceso) : null,
      url_regalo: r.url_regalo ? String(r.url_regalo) : null,
      moneda: String(r.moneda ?? 'PEN'),
      precio: Number(r.precio ?? 0),
      inscrito_en: String(r.inscrito_en ?? new Date().toISOString()),
    }

    return <GptDetailPage gpt={gpt} />
  } catch (e: any) {
    if (e?.digest) throw e
    notFound()
  }
}
