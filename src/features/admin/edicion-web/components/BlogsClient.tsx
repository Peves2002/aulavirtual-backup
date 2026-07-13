'use client'

import { useState } from 'react'
import { Box, Paper, Button, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { getSession } from 'next-auth/react'

import { AxiosConfiguracion } from '../../configuracion/http/axiosConfiguracion'
import type { Configuracion } from '../../configuracion/entity/Configuracion'
import BlogsSettings from '../../configuracion/components/BlogsSettings'

interface Props {
  initialData?: Configuracion[]
}

export function BlogsClient({ initialData }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [saving, setSaving] = useState(false)

  const initialMapped = (initialData || []).reduce((acc: { [key: string]: string }, curr: Configuracion) => {
    acc[curr.clave] = curr.valor
    return acc
  }, {})

  const [config, setConfig] = useState<{ [key: string]: string }>({
    WEB_BLOGS: '[]',
    ...initialMapped
  })

  const handleInputChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = Object.entries(config).map(([clave, valor]) => {
        const item = initialData?.find(d => d.clave === clave)
        return { clave, valor, descripcion: item?.descripcion || '' }
      })
      const getAuthToken = async () => {
        const s = await getSession()
        return s?.user?.accessToken ?? null
      }
      const axiosConfig = new AxiosConfiguracion({ getAuthToken })
      await axiosConfig.save(payload)
      enqueueSnackbar('Blogs actualizados correctamente.', { variant: 'success' })
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Error al guardar los blogs', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Gestión de Blogs</Typography>
        <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={<i className="tabler-device-floppy" />}>
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Stack>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <BlogsSettings config={config} onInputChange={handleInputChange} />
      </Box>
    </Paper>
  )
}
