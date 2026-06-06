import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/configs/auth'
import prisma from '@/utils/libs/prisma'
import MisGptsPage from '@/features/estudiante/mis-gpts/pages/MisGptsPage'

export const dynamic = 'force-dynamic'

interface Props { searchParams?: { success?: string } }

export default async function Page({ searchParams }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const rows: any[] = await prisma.$queryRawUnsafe(`
    SELECT p.id, p.titulo, p.descripcion, p.miniatura, p.categoria, p.url_acceso, p.url_regalo, p.moneda, ig.inscrito_en
    FROM inscripciones_gpt ig
    JOIN productos_ia p ON ig.producto_ia_id = p.id
    WHERE ig.usuario_id = $1 AND ig.estado = 'ACTIVO'
    ORDER BY ig.inscrito_en DESC
  `, session.user.id)

  return <MisGptsPage gpts={rows} success={searchParams?.success === '1'} />
}
