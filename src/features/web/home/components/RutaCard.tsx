'use client'

import Link from 'next/link'

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  AvatarGroup,
  Chip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowRight } from 'lucide-react'

import CourseThumbnail from '@/utils/components/CourseThumbnail'

interface RutaCardProps {
  titulo: string
  slug: string
  descripcion?: string
  miniatura?: string
  total_cursos: number
  cursos: any[]
  precio?: any
  moneda?: string
}

const StyledCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '24px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  border: '1.5px solid rgba(var(--web-primary-rgb, 37, 146, 127),0.1)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 24px 48px rgba(var(--web-primary-rgb, 37, 146, 127), 0.12)',
    borderColor: 'rgba(var(--web-primary-rgb, 37, 146, 127),0.4)',
    '& .arrow-icon': {
      transform: 'translateX(4px)'
    },
    '& .card-btn': {
      backgroundColor: 'var(--web-primary, #25927F)',
      color: '#ffffff',
      borderColor: 'var(--web-primary, #25927F)'
    },
    '& .price-chip': {
      backgroundColor: 'rgba(var(--web-primary-rgb, 37, 146, 127), 0.1)',
      color: 'var(--web-primary, #25927F)'
    }
  }
}))

const RutaCard = ({
  titulo,
  slug,
  descripcion,
  miniatura,
  total_cursos,
  cursos,
  precio,
  moneda
}: RutaCardProps) => {
  const isFree = !precio || Number(precio) === 0
  const displayPrice = isFree ? 'Gratis' : `${moneda === 'USD' ? '$' : 'S/'} ${Number(precio).toFixed(2)}`

  
return (
    <Link href={`/rutas/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
    <StyledCard>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CourseThumbnail
          src={miniatura}
          title={titulo}
          icon="tabler-map-2"
          aspectRatio="16/9"
          sx={{ display: 'block' }}
        />
        {/* Gradiente oscuro inferior para legibilidad */}
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1
        }} />

        {/* Badge superior */}
        <Chip
          label="PAQUETE"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            bgcolor: 'var(--web-light, #BDD962)',
            color: '#0A0A0A',
            fontWeight: 800,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            height: 24,
            boxShadow: '0 4px 12px rgba(var(--web-light-rgb, 189, 217, 98),0.4)'
          }}
        />

        {/* Info Cursos (Inferior) */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 16, zIndex: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AvatarGroup 
            max={4} 
            sx={{ 
              '& .MuiAvatar-root': { 
                width: 32, 
                height: 32, 
                fontSize: '0.75rem', 
                border: '2px solid rgba(255,255,255,0.8)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              } 
            }}
          >
            {cursos.slice(0, 4).map((c, i) => (
              <Avatar key={i} src={c.miniatura || ''} alt={c.titulo} />
            ))}
          </AvatarGroup>
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {total_cursos} Programas incluidos
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            mb: 1.5,
            color: '#0f172a',
            lineHeight: 1.3,
            minHeight: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {titulo}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#64748b',
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
            lineHeight: 1.6
          }}
        >
          {descripcion || 'Sigue este paquete estructurado para dominar esta especialidad desde cero hasta un nivel avanzado.'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            className="price-chip"
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: '14px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: '#475569',
              bgcolor: '#f1f5f9',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid transparent'
            }}
          >
            {displayPrice}
          </Box>
          <Button
            className="card-btn"
            variant="outlined"
            sx={{
              flexGrow: 1,
              borderRadius: '14px',
              py: 1.5,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.95rem',
              borderWidth: '2px',
              borderColor: '#e2e8f0',
              color: '#334155',
              transition: 'all 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              pointerEvents: 'none', /* Click is handled by the Card itself */
            }}
          >
            Ver detalles
            <ArrowRight className="arrow-icon" size={18} style={{ transition: 'transform 0.3s ease' }} />
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
    </Link>
  )
}

export default RutaCard
