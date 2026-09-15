'use client'

import { useState } from 'react'

import { Box } from '@mui/material'

import { DEFAULT_COURSE_COVER } from '@/utils/configs/courseCover'

export default function CertificateThumbnail({ src, title, height = 160 }: {
  src?: string | null
  title: string
  height?: number
}) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const imageSrc = src?.trim()

  return (
    <Box sx={{
      height, flexShrink: 0, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 75% 20%, #247e92 0%, #123d59 50%, #10273e 100%)'
    }}>
      <Box role='img' aria-label={`Certificado de ${title}`} sx={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        '&::before': {
          content: '""', position: 'absolute', width: 250, height: 250,
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', right: -40, top: -100
        }
      }}>
        <Box aria-hidden='true' sx={{
          width: 190, height: 112, bgcolor: '#fffdf6', borderRadius: '5px', position: 'relative',
          boxShadow: '0 12px 28px rgba(0,0,0,0.25)', p: '10px', transform: 'rotate(-5deg)'
        }}>
          <Box sx={{ height: '100%', border: '1px solid #cfb477', textAlign: 'center', pt: '9px' }}>
            <i className='tabler-school' style={{ color: '#1b5670', fontSize: 23 }} />
            <Box sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#163b53', mt: '2px' }}>CERTIFICADO</Box>
            <Box sx={{ width: 78, height: 3, bgcolor: '#d3dedf', mx: 'auto', mt: '7px' }} />
            <Box sx={{ width: 54, height: 2, bgcolor: '#e1e7e5', mx: 'auto', mt: '5px' }} />
          </Box>
          <Box sx={{
            position: 'absolute', right: 13, bottom: -10, color: '#c4963f',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.15))'
          }}>
            <i className='tabler-award-filled' style={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Box>
      {imageSrc && imageSrc !== DEFAULT_COURSE_COVER && (
        <Box component='img' key={imageSrc} src={imageSrc} alt={title}
          onLoad={() => setLoadedSrc(imageSrc)}
          onError={() => setLoadedSrc(null)}
          sx={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: loadedSrc === imageSrc ? 1 : 0
          }}
        />
      )}
    </Box>
  )
}
