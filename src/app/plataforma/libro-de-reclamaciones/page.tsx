import React from 'react'

import { Box, Container } from '@mui/material'

import { getConfigs } from '@/utils/libs/config'
import LibroReclamacionesForm from '@/features/web/legal/components/LibroReclamacionesForm'

export const metadata = {
  title: 'Libro de Reclamaciones | ARM Asset Reliability Management',
  description: 'Libro de reclamaciones virtual para el registro de quejas y reclamos conforme a la ley peruana.',
}

export default async function LibroReclamacionesPage() {
  const config = await getConfigs()

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <LibroReclamacionesForm
          empresaNombre={config.EMPRESA_RAZON_SOCIAL || undefined}
          empresaRuc={config.EMPRESA_RUC || undefined}
          empresaDireccion={config.EMPRESA_DIRECCION || undefined}
        />
      </Container>
    </Box>
  )
}
