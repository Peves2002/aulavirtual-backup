'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'

// Importar react-quill dinámicamente sin SSR para evitar errores de "document is not defined"
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: boolean
  helperText?: string
  minHeight?: number | string
  simple?: boolean
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  label,
  error,
  helperText,
  minHeight = 200,
  simple = false
}: RichTextEditorProps) {
  // Configuración de herramientas del editor (toolbar)
  const modules = useMemo(
    () => ({
      toolbar: simple
        ? [
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }],
            ['clean']
          ]
        : [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'clean']
          ]
    }),
    [simple]
  )

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link'
  ]

  return (
    <Box
      sx={{
        width: '100%',
        '.quill': {
          border: error ? '1px solid var(--mui-palette-error-main)' : '1px solid var(--mui-palette-divider)',
          borderRadius: 1,
          overflow: 'hidden',
          transition: 'border-color 0.2s'
        },
        '.ql-toolbar': {
          border: 'none',
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-default)',
          fontFamily: 'inherit'
        },
        '.ql-container': {
          border: 'none',
          fontFamily: 'inherit',
          fontSize: '1rem',
          minHeight: minHeight
        },
        '.ql-editor': {
          minHeight: minHeight
        },
        // Estilos básicos para adaptar al tema
        '.ql-stroke': {
          stroke: 'currentColor'
        },
        '.ql-fill': {
          fill: 'currentColor'
        },
        '.ql-picker': {
          color: 'currentColor'
        }
      }}
    >
      {label && (
        <Typography variant='caption' color={error ? 'error' : 'text.secondary'} sx={{ mb: 1, display: 'block' }}>
          {label}
        </Typography>
      )}
      <ReactQuill
        theme='snow'
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Escribe aquí...'}
      />
      {helperText && (
        <Typography variant='caption' color={error ? 'error' : 'text.secondary'} sx={{ mt: 0.5, ml: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}
    </Box>
  )
}
