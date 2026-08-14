import Link from 'next/link'

import { Box, Button, Chip, Container, Divider, Typography } from '@mui/material'

import HydratedDate from '@/utils/components/HydratedDate'
import UserAvatar from '@/utils/components/UserAvatar'
import { calcularTiempoLectura } from '@/utils/functions/calcularTiempoLectura'
import ArticuloBody from './ArticuloBody'
import ArticulosRelacionados from './ArticulosRelacionados'
import type { ArticuloCardData } from './ArticuloCard'

export interface ArticuloDetailData {
  id: string
  titulo: string
  slug: string
  descripcion: string | null
  imagen_portada: string | null
  archivo_pdf: string | null
  categoria: string | null
  creado_en: string | Date
  autor: { id: string; nombre: string; apellido: string; avatar: string | null } | null
}

interface Props {
  articulo: ArticuloDetailData
  relacionados: ArticuloCardData[]
}

export default function ArticuloDetail({ articulo, relacionados }: Props) {
  const tiempoLectura = articulo.descripcion ? calcularTiempoLectura(articulo.descripcion) : null

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          py: { xs: 5, md: 7 },
          px: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              component={Link}
              href='/articulos'
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                '&:hover': { color: 'var(--web-light, #BDD962)' },
                transition: 'color 0.2s'
              }}
            >
              Artículos
            </Box>
            <Box component='span' sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
              /
            </Box>
            <Box
              component='span'
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.8125rem',
                color: 'var(--web-light, #BDD962)',
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 320
              }}
            >
              {articulo.titulo}
            </Box>
          </Box>

          {articulo.categoria && (
            <Chip
              label={articulo.categoria}
              size='small'
              sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600 }}
            />
          )}

          <Typography
            component='h1'
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 2,
              lineHeight: 1.2
            }}
          >
            {articulo.titulo}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            {articulo.autor && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <UserAvatar
                  name={articulo.autor.nombre}
                  apellido={articulo.autor.apellido}
                  src={articulo.autor.avatar}
                  size={32}
                />
                <Typography sx={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
                  {articulo.autor.nombre} {articulo.autor.apellido}
                </Typography>
              </Box>
            )}
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              <HydratedDate
                date={articulo.creado_en}
                format='date'
                options={{ year: 'numeric', month: 'long', day: 'numeric' }}
              />
            </Typography>
            {tiempoLectura && (
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                {tiempoLectura} min de lectura
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Container maxWidth='md' sx={{ py: { xs: 4, md: 6 } }}>
        {articulo.imagen_portada && (
          <Box
            component='img'
            src={articulo.imagen_portada}
            alt={articulo.titulo}
            sx={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 2, mb: 4 }}
          />
        )}

        {articulo.descripcion ? (
          <ArticuloBody html={articulo.descripcion} />
        ) : (
          <Typography color='text.secondary'>Este artículo todavía no tiene contenido.</Typography>
        )}

        {articulo.archivo_pdf && (
          <>
            <Divider sx={{ my: 4 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                p: 3,
                borderRadius: 2,
                bgcolor: 'action.hover'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <i className='tabler-file-type-pdf' style={{ fontSize: 28 }} />
                <Typography fontWeight={600}>Documento PDF adjunto</Typography>
              </Box>
              <Button
                variant='contained'
                startIcon={<i className='tabler-download' />}
                href={articulo.archivo_pdf}
                target='_blank'
                rel='noopener noreferrer'
              >
                Descargar PDF
              </Button>
            </Box>
          </>
        )}

        <ArticulosRelacionados articulos={relacionados} />
      </Container>
    </Box>
  )
}
