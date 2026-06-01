'use client'

import { useState } from 'react'

import { Box, Button, Checkbox, FormControlLabel, styled, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Icon } from '@iconify/react'

import AppModal from '@/utils/components/AppModal'
import { useDeleteReceta } from '../hooks/useRecetas'

type Props = {
  open: boolean
  handleClose: () => void
  receta: { id: string; nombre: string; slug: string } | null
  onSuccess?: () => void
}

const WarningBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: 16,
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'light' ? '#FFF4E5' : '#3E2723',
  border: `1px solid ${theme.palette.mode === 'light' ? '#FFB74D' : '#5D4037'}`,
  marginBottom: 24
}))

const InfoBox = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : '#424242',
  marginBottom: 24
}))

export const DeleteRecetaModal = ({ open, handleClose, receta, onSuccess }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [confirmed, setConfirmed] = useState(false)
  const deleteMutation = useDeleteReceta()

  const handleDelete = async () => {
    if (!receta || !confirmed) return

    try {
      await deleteMutation.mutateAsync(receta.id)
      enqueueSnackbar('Receta eliminada exitosamente', { variant: 'success' })
      setConfirmed(false)
      handleClose()
      onSuccess?.()
    } catch (error: any) {
      enqueueSnackbar(error?.message || error?.error || 'Error al eliminar receta', { variant: 'error' })
    }
  }

  const handleCloseModal = () => {
    if (!deleteMutation.isPending) {
      setConfirmed(false)
      handleClose()
    }
  }

  if (!receta) return null

  return (
    <AppModal open={open} handleClose={handleCloseModal}>
      <Typography variant='h5' sx={{ mb: 2 }}>Eliminar Receta</Typography>

      <Box sx={{ padding: '16px 0' }}>
        <WarningBox>
          <Icon icon='mdi:alert-circle' fontSize={32} color='#F57C00' />
          <Box>
            <Typography variant='subtitle1' fontWeight={600}>¡Advertencia!</Typography>
            <Typography variant='body2'>Esta acción no se puede deshacer.</Typography>
          </Box>
        </WarningBox>

        <Typography variant='body1' sx={{ mb: 2 }}>Estás a punto de eliminar la siguiente receta:</Typography>

        <InfoBox>
          <Typography variant='body2' sx={{ mb: 1 }}><strong>Nombre:</strong> {receta.nombre}</Typography>
          <Typography variant='body2'><strong>Slug:</strong> {receta.slug}</Typography>
        </InfoBox>

        <FormControlLabel
          control={<Checkbox checked={confirmed} onChange={e => setConfirmed(e.target.checked)} disabled={deleteMutation.isPending} color='error' />}
          label={<Typography variant='body2'>Confirmo que deseo eliminar esta receta de forma permanente</Typography>}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button variant='outlined' onClick={handleCloseModal} disabled={deleteMutation.isPending}>Cancelar</Button>
          <Button variant='contained' color='error' onClick={handleDelete}
            disabled={!confirmed || deleteMutation.isPending} startIcon={<Icon icon='mdi:delete' />}>
            {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar Receta'}
          </Button>
        </Box>
      </Box>
    </AppModal>
  )
}
