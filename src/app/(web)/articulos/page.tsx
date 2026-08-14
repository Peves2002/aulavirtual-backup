export const dynamic = 'force-dynamic'

import { Box, Container, Typography } from '@mui/material'
import { Newspaper } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import ArticuloCatalog from '@/features/web/articulos/components/ArticuloCatalog'

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME || 'Aula Virtual'} | Artículos`,
  description: 'Explora nuestra colección de artículos, documentos y novedades.'
}

export default async function ArticulosWebPage() {
  const articulos = await prisma.articulo.findMany({
    where: { estado: 'PUBLICADO' },
    orderBy: { creado_en: 'desc' },
    select: {
      id: true,
      titulo: true,
      slug: true,
      descripcion: true,
      imagen_portada: true,
      categoria: true,
      creado_en: true
    }
  })

  const articulosSerializados = articulos.map(a => ({ ...a, creado_en: a.creado_en.toISOString() }))

  return (
    <div className='min-h-screen bg-slate-50 pt-20 pb-12'>
      <Container maxWidth='lg'>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              mb: 2
            }}
          >
            <Newspaper size={32} />
          </Box>
          <Typography variant='h3' component='h1' fontWeight='bold' gutterBottom color='primary.main'>
            Artículos y Noticias
          </Typography>
          <Typography variant='h6' color='text.secondary' sx={{ maxWidth: 600, mx: 'auto' }}>
            Explora nuestra colección de artículos, documentos y novedades.
          </Typography>
        </Box>

        <ArticuloCatalog articulos={articulosSerializados} />
      </Container>
    </div>
  )
}
