import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/configs/auth'
import prisma from '@/utils/libs/prisma'
import GptDetailPage from '@/features/estudiante/mis-gpts/pages/GptDetailPage'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export default async function Page({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  try {
    const rows: any[] = await prisma.$queryRawUnsafe(`
      SELECT p.id, p.titulo, p.descripcion, p.miniatura, p.categoria, p.url_acceso, p.url_regalo, p.moneda, p.precio, ig.inscrito_en
      FROM inscripciones_gpt ig
      JOIN productos_ia p ON ig.producto_ia_id = p.id
      WHERE ig.usuario_id = $1 AND p.id = $2 AND ig.estado = 'ACTIVO'
      LIMIT 1
    `, session.user.id, params.id)

    if (!rows.length) notFound()
    const gpt = { ...rows[0], precio: Number(rows[0].precio) }
    return <GptDetailPage gpt={gpt} />
  } catch {
    notFound()
  }
}
