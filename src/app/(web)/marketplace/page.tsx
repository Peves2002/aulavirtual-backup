import { getAuthSession } from '@/utils/libs/auth-helpers'
import prisma from '@/utils/libs/prisma'
import MarketplacePage from '@/features/web/atd/pages/Marketplace'

export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    const session = await getAuthSession()

    const productos: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, titulo, slug, descripcion, miniatura, precio, precio_falso, moneda, es_gratis, categoria
       FROM productos_ia WHERE estado = 'PUBLICADO' ORDER BY creado_en DESC`
    )

    let inscritosIds: string[] = []

    if (session?.user?.id) {
      const inscritos: any[] = await prisma.$queryRawUnsafe(
        `SELECT producto_ia_id FROM inscripciones_gpt WHERE usuario_id = $1 AND estado = 'ACTIVO'`,
        session.user.id
      )

      inscritosIds = inscritos.map((i: any) => i.producto_ia_id)
    }

    const data = productos.map(p => ({
      id: p.id,
      titulo: p.titulo,
      slug: p.slug,
      descripcion: p.descripcion,
      miniatura: p.miniatura,
      precio: Number(p.precio),
      precio_falso: p.precio_falso ? Number(p.precio_falso) : null,
      moneda: p.moneda,
      es_gratis: p.es_gratis,
      categoria: p.categoria,
      yaAdquirido: inscritosIds.includes(p.id)
    }))

    return <MarketplacePage productos={data} />
  } catch (e) {
    console.error('[Marketplace] DB error:', e)
    
return <MarketplacePage productos={[]} />
  }
}
