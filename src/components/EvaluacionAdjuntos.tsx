'use client'

import { Box, IconButton, Stack, Typography } from '@mui/material'

import type { EvaluacionAdjunto } from '@/schemas/evaluacion-adjuntos.schema'
import { normalizeMediaUrl } from '@/utils/functions/normalizeMediaUrl'

const formatos: Record<string, { icon: string; label: string; color: string }> = {
  pdf: { icon: 'tabler-file-type-pdf', label: 'Documento PDF', color: 'error.main' },
  doc: { icon: 'tabler-file-type-doc', label: 'Documento Word', color: 'info.main' },
  docx: { icon: 'tabler-file-type-docx', label: 'Documento Word', color: 'info.main' },
  xls: { icon: 'tabler-file-type-xls', label: 'Hoja de cálculo', color: 'success.main' },
  xlsx: { icon: 'tabler-file-type-xls', label: 'Hoja de cálculo', color: 'success.main' },
  ppt: { icon: 'tabler-presentation', label: 'Presentación', color: 'warning.main' },
  pptx: { icon: 'tabler-presentation', label: 'Presentación', color: 'warning.main' },
  zip: { icon: 'tabler-file-zip', label: 'Archivo comprimido', color: 'text.secondary' }
}

interface EvaluacionAdjuntosProps {
  adjuntos?: EvaluacionAdjunto[]
  titulo?: string
  onRemove?: (url: string) => void
  disabled?: boolean
}

export default function EvaluacionAdjuntos({
  adjuntos = [], titulo = 'Archivos de la evaluación', onRemove, disabled = false
}: EvaluacionAdjuntosProps) {
  if (!adjuntos.length) return null

  return (
    <Stack spacing={1.5} sx={{ my: 2, minWidth: 0 }}>
      {titulo && <Typography variant='subtitle2'>{titulo}</Typography>}
      {adjuntos.map(adjunto => {
        const url = normalizeMediaUrl(adjunto.url)

        const extension = (url.split(/[?#]/)[0].match(/\.([a-z0-9]+)$/i)?.[1]
          || adjunto.nombre.match(/\.([a-z0-9]+)$/i)?.[1] || '').toLowerCase()

        const esImagen = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)

        const formato = esImagen
          ? { icon: 'tabler-photo', label: 'Imagen', color: 'primary.main' }
          : formatos[extension] || { icon: 'tabler-file', label: 'Archivo adjunto', color: 'text.secondary' }

        return (
          <Box key={adjunto.url} sx={{
            display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider',
            borderRadius: 2, bgcolor: 'background.paper', overflow: 'hidden', minWidth: 0
          }}>
            <Box component='a' href={url} target='_blank' rel='noopener noreferrer'
              aria-label={`Abrir ${adjunto.nombre} en una nueva pestaña`}
              sx={{
                display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, p: 1.5,
                flex: 1, minWidth: 0, color: 'inherit', textDecoration: 'none',
                '&:hover': { bgcolor: 'action.hover' },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 }
              }}>
              <Box sx={{
                width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, flexShrink: 0,
                borderRadius: 1.5, overflow: 'hidden', bgcolor: 'action.hover',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: formato.color
              }}>
                {esImagen ? (
                  <Box component='img' src={url} alt='' loading='lazy'
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                ) : <Box component='i' className={formato.icon} aria-hidden='true' sx={{ fontSize: 36 }} />}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant='body2' fontWeight={600} sx={{ overflowWrap: 'anywhere' }}>
                  {adjunto.nombre}
                </Typography>
                <Typography variant='caption' color='text.secondary' display='block' sx={{ mt: 0.5 }}>
                  {formato.label}{extension ? ` · ${extension.toUpperCase()}` : ''}
                </Typography>
                <Typography variant='caption' color='primary.main' display='block' sx={{ mt: 0.5 }}>
                  {esImagen ? 'Ver imagen' : 'Abrir archivo'}
                </Typography>
              </Box>
              <Box component='i' className='tabler-external-link' aria-hidden='true'
                sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
            </Box>
            {onRemove && (
              <IconButton aria-label={`Quitar ${adjunto.nombre}`} color='error' size='small'
                disabled={disabled} onClick={() => onRemove(adjunto.url)} sx={{ mr: 1 }}>
                <i className='tabler-trash' />
              </IconButton>
            )}
          </Box>
        )
      })}
    </Stack>
  )
}
