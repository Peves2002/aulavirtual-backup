'use client'

import { useRef, useState } from 'react'

import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import { toast } from 'react-toastify'

interface ArticuloUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export default function ArticuloUpload({ value, onChange, disabled }: ArticuloUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Solo se permiten archivos PDF')
      
return
    }

    setUploading(true)

    try {
      const formData = new FormData()

      formData.append('file', file)

      // You can adjust the endpoint if your API uses a different one for PDFs
      const res = await fetch('/api/media', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || 'Error al subir el archivo')
      }

      onChange(json.result?.url || json.url || '')
    } catch (err: any) {
      toast.error(err.message || 'Error al subir el archivo')
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
        accept='application/pdf'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {value ? (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
          <Button 
            variant="outlined" 
            color="info" 
            href={value} 
            target="_blank"
            startIcon={<i className='tabler-file-text' />}
          >
            Ver Documento Actual
          </Button>

          <Button
            variant='text'
            size='small'
            startIcon={<i className='tabler-upload' />}
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
          >
            Cambiar
          </Button>

          <IconButton
            size='small'
            color='error'
            onClick={() => onChange('')}
            disabled={disabled || uploading}
          >
            <i className='tabler-trash text-error text-sm' />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Button
            variant='outlined'
            startIcon={uploading ? <CircularProgress size={16} /> : <i className='tabler-upload' />}
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir PDF'}
          </Button>
          <Typography variant='caption' color='text.secondary'>
            Solo archivos en formato PDF
          </Typography>
        </Box>
      )}
    </Box>
  )
}
