'use client'

import { Typography, Box, CircularProgress } from '@mui/material'
import { useParams } from 'next/navigation'
import { CapacitacionForm } from '../components/CapacitacionForm'
import { useCapacitacion } from '../hooks'

export const CapacitacionEdit = () => {
  const params = useParams()
  const id = params?.id as string

  const { data: capacitacion, isLoading } = useCapacitacion(id)

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='300px'>
        <CircularProgress />
      </Box>
    )
  }

  if (!capacitacion) {
    return (
      <Typography variant='h6' color='error'>
        Capacitación no encontrada
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant='h4' mb={4} fontWeight={700}>
        Editar Capacitación
      </Typography>
      <CapacitacionForm capacitacion={capacitacion} />
    </Box>
  )
}
