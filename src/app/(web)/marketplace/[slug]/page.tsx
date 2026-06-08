import { notFound } from 'next/navigation'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import prisma from '@/utils/libs/prisma'
import ProductoIADetailView from '@/features/web/marketplace/ProductoIADetailView'

export const dynamic = 'force-dynamic'

interface Props { params: { slug: string } }

export default async function Page({ params }: Props) {
  try {
    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, titulo, slug, descripcion, miniatura, precio, precio_falso, moneda, es_gratis, categoria, estado, url_acceso, url_regalo
       FROM productos_ia WHERE slug = $1 LIMIT 1`, params.slug
    )
    if (!rows.length || rows[0].estado !== 'PUBLICADO') notFound()

    const producto = {
      ...rows[0],
      precio: Number(rows[0].precio),
      precio_falso: rows[0].precio_falso ? Number(rows[0].precio_falso) : null
    }

    const session = await getAuthSession()
    let yaAdquirido = false
    if (session?.user?.id) {
      const ins: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM inscripciones_gpt WHERE usuario_id = $1 AND producto_ia_id = $2 LIMIT 1`,
        session.user.id, producto.id
      )
      yaAdquirido = ins.length > 0
    }

    return <ProductoIADetailView producto={producto} yaAdquirido={yaAdquirido} />
  } catch (e: any) {
    if (e?.digest) throw e
    notFound()
  }
}

export async function generateMetadata({ params }: Props) {
  try {
    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT titulo, descripcion FROM productos_ia WHERE slug = $1 LIMIT 1`, params.slug
    )
    if (!rows.length) return {}
    return { title: rows[0].titulo, description: rows[0].descripcion }
  } catch { return {} }
}
