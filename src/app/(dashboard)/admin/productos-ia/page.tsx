import prisma from '@/utils/libs/prisma'
import ProductosIAPage from '@/features/admin/productos-ia/pages/ProductosIAPage'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const rows: any[] = await prisma.$queryRawUnsafe(
    `SELECT id, titulo, slug, miniatura, estado, precio, precio_falso, moneda, es_gratis, categoria, creado_en FROM productos_ia ORDER BY creado_en DESC`
  )

  const initialData = rows.map(r => ({ ...r, precio: Number(r.precio), precio_falso: r.precio_falso ? Number(r.precio_falso) : null }))

  
return <ProductosIAPage initialData={initialData} />
}
