'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material'
import { useCambiarEstadoProductoIA } from '../hooks/useProductosIA'
import DeleteProductoIAModal from './DeleteProductoIAModal'
import type { ProductoIAListaItem, EstadoProductoIA } from '../entity/ProductoIA'

interface Props { row: ProductoIAListaItem }

export default function ProductoIAActions({ row }: Props) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const cambiarEstado = useCambiarEstadoProductoIA()

  const estadoSiguiente: Record<EstadoProductoIA, { label: string; value: EstadoProductoIA }> = {
    BORRADOR: { label: 'Publicar', value: 'PUBLICADO' },
    PUBLICADO: { label: 'Archivar', value: 'ARCHIVADO' },
    ARCHIVADO: { label: 'Volver a Borrador', value: 'BORRADOR' }
  }
  const siguiente = estadoSiguiente[row.estado]

  return (
    <>
      <IconButton size="small" onClick={() => router.push(`/admin/productos-ia/${row.id}`)}>
        <i className="tabler-edit text-[18px]" />
      </IconButton>
      <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)}>
        <i className="tabler-dots-vertical text-[18px]" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { setAnchorEl(null); cambiarEstado.mutate({ id: row.id, estado: siguiente.value }) }}>
          <ListItemIcon><i className="tabler-refresh text-[18px]" /></ListItemIcon>
          <Typography>{siguiente.label}</Typography>
        </MenuItem>
        {row.estado === 'BORRADOR' && (
          <MenuItem onClick={() => { setAnchorEl(null); setDeleteOpen(true) }} sx={{ color: 'error.main' }}>
            <ListItemIcon><i className="tabler-trash text-[18px] text-error" /></ListItemIcon>
            <Typography>Eliminar</Typography>
          </MenuItem>
        )}
      </Menu>

      <DeleteProductoIAModal open={deleteOpen} onClose={() => setDeleteOpen(false)} producto={row} />
    </>
  )
}
