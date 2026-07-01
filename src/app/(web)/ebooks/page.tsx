export const dynamic = 'force-dynamic'

import { Box } from '@mui/material'

import prisma from '@/utils/libs/prisma'
import { getAuthSession } from '@/utils/libs/auth-helpers'
import EbookCatalog from '@/features/web/ebooks/components/EbookCatalog'
import PageHero from '@/features/web/ace/PageHero'

export const metadata = {
  title: `Ebooks`,
  description: 'Explora nuestra colección de ebooks especializados.',
}

export default async function EbooksPage() {
  const session = await getAuthSession()

  const ebooks = await prisma.ebook.findMany({
    where: { estado: 'PUBLICADO' },
    orderBy: { creado_en: 'desc' },
    select: {
      id: true, titulo: true, slug: true, descripcion: true,
      autor: true, miniatura: true, precio: true, precio_falso: true,
      moneda: true, es_gratis: true, paginas: true, genero: true,
      categoria: { select: { nombre: true } },
    },
  })

  let adquiridosIds: string[] = []

  if (session?.user?.id) {
    const accesos = await prisma.ebookAcceso.findMany({
      where: { usuario_id: session.user.id },
      select: { ebook_id: true },
    })

    adquiridosIds = accesos.map(a => a.ebook_id)
  }

  const ebooksSerializados = ebooks.map(e => ({
    ...e,
    precio: Number(e.precio),
    precio_falso: Number(e.precio_falso),
  }))

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <PageHero
        badge="EBOOKS"
        title="Catálogo de Ebooks"
        description="Amplía tu conocimiento con nuestra colección de ebooks especializados."
        image="/hero/ebooks.jpg"
      />
      <EbookCatalog ebooks={ebooksSerializados} adquiridosIds={adquiridosIds} />
    </Box>
  )
}
