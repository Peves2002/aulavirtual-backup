'use client'

import { useRef, useState } from 'react'

import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import { toast } from 'react-toastify'

interface ArticuloImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export default function ArticuloImageUpload({ value, onChange, disabled }: ArticuloImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes (PNG, JPG, WEBP)')
      
return
    }

    setUploading(true)

    try {
      const formData = new FormData()

      formData.append('file', file)

      const res = await fetch('/api/media', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || 'Error al subir la imagen')
      }

      onChange(json.result?.url || json.url || '')
    } catch (err: any) {
      toast.error(err.message || 'Error al subir la imagen')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <Box>
      <input
        ref={inputRef}
        type='file'
        accept='image/png,image/jpeg,image/webp'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {value ? (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
          <Box
            sx={{
              position: 'relative',
              width: 200,
              height: 120,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              bgcolor: 'background.paper'
            }}
          >
            <img src={value} alt='Portada' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton
              size='small'
              sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'background.paper', boxShadow: 1 }}
              onClick={() => onChange('')}
              disabled={disabled || uploading}
            >
              <i className='tabler-trash text-error text-sm' />
            </IconButton>
          </Box>

          <Button
            variant='text'
            size='small'
            startIcon={<i className='tabler-upload' />}
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
          >
            Cambiar Portada
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Button
            variant='outlined'
            startIcon={uploading ? <CircularProgress size={16} /> : <i className='tabler-image' />}
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir Portada'}
          </Button>
          <Typography variant='caption' color='text.secondary'>
            Resolución recomendada: 1280x720 (PNG/JPG)
          </Typography>
        </Box>
      )}
    </Box>
  )
}
