'use client'

import { useEffect, useState } from 'react'

import { Box, Typography, Button, Skeleton } from '@mui/material'

import useVerticalNav from '@menu/hooks/useVerticalNav'

// ─── Icono por tipo de comunidad ───────────────────────────────────────────────

const TIPO_META: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  whatsapp: { icon: 'tabler-brand-whatsapp', color: '#fff', bg: '#25D366', label: 'WhatsApp' },
  facebook: { icon: 'tabler-brand-facebook', color: '#fff', bg: '#1877F2', label: 'Facebook' },
  telegram: { icon: 'tabler-brand-telegram', color: '#fff', bg: '#229ED9', label: 'Telegram' },
  discord:  { icon: 'tabler-brand-discord', color: '#fff', bg: '#5865F2', label: 'Discord' },
  youtube:  { icon: 'tabler-brand-youtube',  color: '#fff', bg: '#FF0000', label: 'YouTube' },
  otro:     { icon: 'tabler-link',            color: '#fff', bg: '#6366F1', label: 'Comunidad' },
}

// ─── Hook de datos ─────────────────────────────────────────────────────────────

function useComunidadConfig() {
  const [data, setData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    fetch('/api/public/config')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({}))
  }, [])

  return data
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ComunidadCard() {
  const config = useComunidadConfig()
  const { isCollapsed, isHovered } = useVerticalNav()

  // Si el menú está colapsado (y no en hover), no mostramos la tarjeta
  const isNavCollapsed = isCollapsed && !isHovered

  if (!config) {
    // Skeleton mientras carga
    return !isNavCollapsed ? (
      <Box sx={{ mx: 2, mb: 2 }}>
        <Skeleton variant='rounded' height={88} sx={{ borderRadius: 3 }} />
      </Box>
    ) : null
  }

  // No mostrar si está deshabilitado o sin URL
  if (config.COMUNIDAD_HABILITADO === 'false' || !config.COMUNIDAD_URL?.trim()) {
    return null
  }

  const tipo = config.COMUNIDAD_TIPO || 'otro'
  const meta = TIPO_META[tipo] ?? TIPO_META.otro

  const texto = config.COMUNIDAD_TEXTO || `¡Únete a nuestra comunidad!`
  const descripcion = config.COMUNIDAD_DESCRIPCION || 'Conecta con otros estudiantes'
  const url = config.COMUNIDAD_URL

  // Vista colapsada: solo botón icono
  if (isNavCollapsed) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 1 }}>
        <Box
          component='a'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: meta.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'scale(1.1)', boxShadow: 4 },
            cursor: 'pointer',
          }}
        >
          <i className={meta.icon} style={{ fontSize: 20, color: meta.color }} />
        </Box>
      </Box>
    )
  }

  // Vista expandida: tarjeta completa
  return (
    <Box sx={{ mx: 2, mb: 2.5, mt: 1 }}>
      <Box
        sx={{
          borderRadius: 3,
          p: 2,
          background: `linear-gradient(135deg, ${meta.bg}dd 0%, ${meta.bg}99 100%)`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.12)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -30,
            right: 10,
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }
        }}
      >
        {/* Icono flotante */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: 1.5,
            bgcolor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className={meta.icon} style={{ fontSize: 18, color: '#fff' }} />
        </Box>

        {/* Texto */}
        <Typography
          variant='subtitle2'
          sx={{ color: '#fff', fontWeight: 700, mb: 0.4, pr: 5, lineHeight: 1.3 }}
        >
          {texto}
        </Typography>
        <Typography
          variant='caption'
          sx={{ color: 'rgba(255,255,255,0.85)', display: 'block', mb: 1.5, lineHeight: 1.3 }}
        >
          {descripcion}
        </Typography>

        {/* Botón */}
        <Button
          component='a'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          size='small'
          variant='contained'
          sx={{
            bgcolor: 'rgba(255,255,255,0.95)',
            color: meta.bg,
            fontWeight: 700,
            fontSize: '0.75rem',
            px: 2,
            py: 0.5,
            borderRadius: 5,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s',
          }}
          startIcon={<i className={meta.icon} style={{ fontSize: 14 }} />}
        >
          Unirse al grupo
        </Button>
      </Box>
    </Box>
  )
}
