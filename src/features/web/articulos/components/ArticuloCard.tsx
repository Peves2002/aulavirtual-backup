import Link from 'next/link'

import { Box, Card, CardContent, Chip, Typography } from '@mui/material'

import HydratedDate from '@/utils/components/HydratedDate'
import { generarExtracto } from '@/utils/functions/generarExtracto'
import { calcularTiempoLectura } from '@/utils/functions/calcularTiempoLectura'

export interface ArticuloCardData {
  id: string
  titulo: string
  slug: string
  descripcion: string | null
  imagen_portada: string | null
  categoria: string | null
  creado_en: string | Date
}

interface Props {
  articulo: ArticuloCardData
  compact?: boolean
}

export default function ArticuloCard({ articulo, compact = false }: Props) {
  const extracto = articulo.descripcion ? generarExtracto(articulo.descripcion, compact ? 90 : 150) : null
  const tiempoLectura = articulo.descripcion ? calcularTiempoLectura(articulo.descripcion) : null

  return (
    <Card
      component={Link}
      href={`/articulo/${articulo.slug}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
      }}
    >
      <Box
        sx={{
          height: compact ? 130 : 200,
          bgcolor: 'action.hover',
          backgroundImage: articulo.imagen_portada ? `url(${articulo.imagen_portada})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: compact ? 2 : 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='overline' color='primary.main' fontWeight='bold'>
            <HydratedDate date={articulo.creado_en} format='date' options={{ year: 'numeric', month: 'short', day: 'numeric' }} />
          </Typography>
          {articulo.categoria && <Chip label={articulo.categoria} size='small' variant='outlined' />}
          {tiempoLectura && (
            <Typography variant='caption' color='text.secondary'>
              · {tiempoLectura} min de lectura
            </Typography>
          )}
        </Box>

        <Typography
          variant={compact ? 'subtitle1' : 'h5'}
          component='h3'
          fontWeight='bold'
          sx={{ mb: 1, lineHeight: 1.3, color: 'text.primary' }}
        >
          {articulo.titulo}
        </Typography>

        {extracto && (
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2, flexGrow: 1 }}>
            {extracto}
          </Typography>
        )}

        <Typography variant='button' color='primary.main' fontWeight='bold' sx={{ mt: 'auto' }}>
          Leer más &gt;
        </Typography>
      </CardContent>
    </Card>
  )
}
