import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/configs/auth'
import prisma from '@/utils/libs/prisma'
import ProductoIACheckoutView from '@/features/web/checkout/components/ProductoIACheckoutView'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export default async function Page({ params }: Props) {
  try {
    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, titulo, slug, descripcion, miniatura, precio, precio_falso, moneda, es_gratis, categoria, estado, url_acceso
       FROM productos_ia WHERE slug = $1 LIMIT 1`, params.slug
    )
    if (!rows.length) notFound()

    const producto = { ...rows[0], precio: Number(rows[0].precio), precio_falso: rows[0].precio_falso ? Number(rows[0].precio_falso) : null }

    if (producto.estado !== 'PUBLICADO') redirect('/marketplace')

    const session = await getServerSession(authOptions)
    if (producto.es_gratis && session?.user?.id) {
      const inscExist: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM inscripciones_gpt WHERE usuario_id = $1 AND producto_ia_id = $2 LIMIT 1`,
        session.user.id, producto.id
      )
      if (inscExist.length) redirect('/estudiante/mis-gpts')
    }

    return <ProductoIACheckoutView producto={producto} />
  } catch (e: any) {
    if (e?.digest) throw e
    notFound()
  }
}
