'use client'
/* eslint-disable padding-line-between-statements, newline-before-return, import/order */

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, Box, Divider } from '@mui/material'

export default function ViewLeadModal({ open, handleClose, lead }: { open: boolean, handleClose: () => void, lead: any }) {
  if (!lead) return null

  const parseDetalle = (detalle: string | null) => {
    if (!detalle) return { lugarTrabajo: '-', eventName: '-' }
    const lugarMatch = detalle.match(/Lugar de trabajo:\s*([^|]+)/)
    const eventMatch = detalle.match(/Registro al evento:\s*(.+)/)
    return {
      lugarTrabajo: lugarMatch ? lugarMatch[1].trim() : '-',
      eventName: eventMatch ? eventMatch[1].trim() : '-'
    }
  }

  const isEvento = lead.escuela === 'Registro de Evento'
  const detailData = isEvento ? parseDetalle(lead.detalle) : null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Detalles del Lead</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary">Fecha de Registro</Typography>
          <Typography variant="body1">{new Date(lead.creado_en).toLocaleString('es-PE')}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Nombres</Typography>
            <Typography variant="body1">{lead.nombres}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Apellidos</Typography>
            <Typography variant="body1">{lead.apellidos || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">DNI</Typography>
            <Typography variant="body1">{lead.dni || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">País / Ciudad</Typography>
            <Typography variant="body1">{lead.pais || '-'} {lead.ciudad ? `/ ${lead.ciudad}` : ''}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Email</Typography>
            <Typography variant="body1">{lead.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">Celular</Typography>
            <Typography variant="body1">{lead.celular}</Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">Profesión / Cargo / Nivel de Estudios</Typography>
          <Typography variant="body1">{lead.profesion || '-'}</Typography>
        </Box>

        {isEvento ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Empresa / Lugar de Trabajo</Typography>
              <Typography variant="body1">{detailData?.lugarTrabajo || '-'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Evento de Interés</Typography>
              <Typography variant="body1" color="primary" fontWeight="bold">{detailData?.eventName || '-'}</Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Programa de Interés</Typography>
              <Typography variant="body1" color="primary" fontWeight="bold">{lead.escuela || '-'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Detalles adicionales</Typography>
              <Typography variant="body1">{lead.detalle || '-'}</Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
