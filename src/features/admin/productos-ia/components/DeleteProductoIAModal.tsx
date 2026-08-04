'use client'

import { Box, Button, Typography } from '@mui/material'

import AppModal from '@/utils/components/AppModal'
import { useEliminarProductoIA } from '../hooks/useProductosIA'
import type { ProductoIAListaItem } from '../entity/ProductoIA'

interface Props {
  open: boolean
  onClose: () => void
  producto: ProductoIAListaItem
}

export default function DeleteProductoIAModal({ open, onClose, producto }: Props) {
  const eliminar = useEliminarProductoIA()

  const handleDelete = () => {
    eliminar.mutate(producto.id, { onSuccess: onClose })
  }

  return (
    <AppModal open={open} handleClose={onClose}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={1}>Eliminar Producto IA</Typography>
        <Typography color="text.secondary" mb={3}>
          ¿Estás seguro de que deseas eliminar <strong>{producto.titulo}</strong>? Esta acción no se puede deshacer.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={eliminar.isPending}>
            {eliminar.isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </Box>
      </Box>
    </AppModal>
  )
}
