'use client'
/* eslint-disable padding-line-between-statements, newline-before-return, import/order */

import { useState, useEffect } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Box } from '@mui/material'
import Swal from 'sweetalert2'

export default function EditLeadModal({ open, handleClose, lead, onUpdated }: { open: boolean, handleClose: () => void, lead: any, onUpdated: (lead: any) => void }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    celular: '',
    pais: '',
    profesion: '',
    detalle: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (lead) {
      setFormData({
        nombres: lead.nombres || '',
        apellidos: lead.apellidos || '',
        dni: lead.dni || '',
        email: lead.email || '',
        celular: lead.celular || '',
        pais: lead.pais || '',
        profesion: lead.profesion || '',
        detalle: lead.detalle || ''
      })
    }
  }, [lead])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (!formData.nombres || !formData.email || !formData.celular) {
      Swal.fire('Error', 'Nombres, email y celular son obligatorios', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()

        Swal.fire('Éxito', 'Registro actualizado correctamente', 'success')
        onUpdated(data.data)
        handleClose()
      } else {
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'Ocurrió un problema de conexión', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!lead) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Lead</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="DNI" name="dni" value={formData.dni} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="País" name="pais" value={formData.pais} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Celular" name="celular" value={formData.celular} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Profesión / Nivel de Estudios" name="profesion" value={formData.profesion} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Detalles (Edad, Lugar de Trabajo, etc.)" name="detalle" value={formData.detalle} onChange={handleChange} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={isSubmitting}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  )
}
