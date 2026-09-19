'use client'

import { Typography, Box } from '@mui/material'
import { CapacitacionForm } from '../components/CapacitacionForm'

export const CapacitacionCreate = () => {
  return (
    <Box>
      <Typography variant='h4' mb={4} fontWeight={700}>
        Nueva Capacitación
      </Typography>
      <CapacitacionForm />
    </Box>
  )
}
