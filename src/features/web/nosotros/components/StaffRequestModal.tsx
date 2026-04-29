'use client'

import React, { useState } from 'react'
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  TextField, 
  Grid, 
  Stack,
  Divider,
  Alert
} from '@mui/material'
import { X, Upload, Send, Briefcase, Building2, User, Phone, Mail, MapPin, DollarSign, Clock, FileText, CheckCircle } from 'lucide-react'

export default function StaffRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    representante: '',
    razonSocial: '',
    ruc: '',
    telefono: '',
    correo: '',
    direccion: '',
    vacantes: '',
    puesto: '',
    horario: '',
    sueldo: '',
    beneficios: '',
    funciones: '',
    requisitos: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message = `*SOLICITUD DE PERSONAL - CEPAV*%0A%0A` +
      `*Datos de la Empresa:*%0A` +
      `- Representante: ${formData.representante}%0A` +
      `- Razón Social: ${formData.razonSocial}%0A` +
      `- RUC: ${formData.ruc}%0A` +
      `- Teléfono: ${formData.telefono}%0A` +
      `- Correo: ${formData.correo}%0A` +
      `- Dirección: ${formData.direccion}%0A%0A` +
      `*Datos del Puesto:*%0A` +
      `- Vacantes: ${formData.vacantes}%0A` +
      `- Puesto: ${formData.puesto}%0A` +
      `- Horario: ${formData.horario}%0A` +
      `- Sueldo: ${formData.sueldo}%0A` +
      `- Beneficios: ${formData.beneficios}%0A` +
      `- Funciones: ${formData.funciones}%0A` +
      `- Requisitos: ${formData.requisitos}`

    const whatsappUrl = `https://wa.me/51906741327?text=${message}`
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ p: 6, textAlign: 'center' }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <CheckCircle size={32} color="var(--web-primary, #25927F)" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontFamily: 'Poppins, sans-serif' }}>
            ¡Solicitud Enviada!
          </Typography>
          <Typography sx={{ color: '#64748b', mb: 4, fontFamily: 'Poppins, sans-serif' }}>
            Hemos abierto un chat de WhatsApp con tu solicitud. Nuestro equipo de Bolsa de Trabajo se pondrá en contacto contigo a la brevedad.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => { setSubmitted(false); onClose(); }}
            sx={{ bgcolor: 'var(--web-primary, #25927F)', borderRadius: '12px', px: 4, py: 1.5, fontWeight: 700 }}
          >
            Cerrar
          </Button>
        </Box>
      </Dialog>
    )
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: '24px', overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'var(--web-dark, #025E44)', color: '#fff' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Briefcase size={24} color="var(--web-light, #BDD962)" />
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>Solicitud de Personal</Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="body1" sx={{ color: '#475569', mb: 4, fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Llena el siguiente formulario y te ayudaremos a buscar los mejores talentos para tu empresa.
          </Typography>

          <Stack spacing={4}>
            {/* 1. Datos de la empresa */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <Building2 size={18} color="var(--web-primary, #25927F)" />
                <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.125rem', fontFamily: 'Poppins, sans-serif' }}>Datos de su empresa</Typography>
              </Stack>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="1.- Representante legal" name="representante" value={formData.representante} onChange={handleChange} required placeholder="Nombre completo" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="2.- Razón social" name="razonSocial" value={formData.razonSocial} onChange={handleChange} required placeholder="Nombre de la empresa" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="3.- Nº de RUC" name="ruc" value={formData.ruc} onChange={handleChange} required placeholder="Número de RUC" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="4.- Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Ej: 999 999 999" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="5.- Correo" name="correo" value={formData.correo} onChange={handleChange} required type="email" placeholder="ejemplo@empresa.com" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="6.- Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required placeholder="Dirección física" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* 2. Datos para la solicitud */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <FileText size={18} color="var(--web-primary, #25927F)" />
                <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.125rem', fontFamily: 'Poppins, sans-serif' }}>Datos para la solicitud</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="7.- Numero de vacantes" name="vacantes" value={formData.vacantes} onChange={handleChange} type="number" required variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField fullWidth label="8.- Puesto que desea cubrir" name="puesto" value={formData.puesto} onChange={handleChange} required placeholder="Ej: Practicante – Ejecutiva de reservas" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="9.- Horario de trabajo" name="horario" value={formData.horario} onChange={handleChange} required placeholder="Ej: Lunes a Viernes 8am - 5pm" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="10.- Sueldo" name="sueldo" value={formData.sueldo} onChange={handleChange} required placeholder="Ej: S/ 1,200 o Rango negociable" variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="11.- Otros beneficios" name="beneficios" value={formData.beneficios} onChange={handleChange} multiline rows={2} placeholder="Comisiones, bonos, capacitaciones, etc." variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="12.- Funciones a realizar" name="funciones" value={formData.funciones} onChange={handleChange} required multiline rows={3} placeholder="Describe las tareas principales..." variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="13.- Requisitos" name="requisitos" value={formData.requisitos} onChange={handleChange} required multiline rows={3} placeholder="Edad, experiencia, conocimientos específicos, idiomas..." variant="outlined" InputProps={{ sx: { borderRadius: '12px' } }} />
                </Grid>
              </Grid>
            </Box>

            {/* Importante */}
            <Alert icon={false} sx={{ borderRadius: '16px', bgcolor: 'rgba(2, 94, 68, 0.04)', color: 'var(--web-dark, #025E44)', border: '1px solid rgba(2, 94, 68, 0.1)' }}>
              <Typography sx={{ fontWeight: 800, mb: 1, fontSize: '0.875rem' }}>IMPORTANTE:</Typography>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.8125rem', lineHeight: 1.6 }}>
                <li>En el puesto que deseas cubrir coloca si requerirás practicante o recién egresado...</li>
                <li>En horario de trabajo indica si el trabajo es de lunes a viernes o lunes a sábado... (Máx 48h/semana)</li>
                <li>En sueldo puedes colocar el monto fijo a pagar o un rango negociable.</li>
                <li>En otros beneficios indica bonos por productividad, comisiones, etc.</li>
                <li>Sé muy específico en las funciones que realizará.</li>
                <li>Sobre los requisitos puedes colocar edad, sexo, conocimientos específicos, idioma, etc.</li>
                <li>Si deseas cubrir de 2 a más puestos, debes llenar nuevamente el formulario.</li>
                <li>Los currículos serán enviados desde nuestro correo institucional con el asunto <strong>CEPAV – Bolsa de trabajo</strong>.</li>
              </ul>
            </Alert>

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              startIcon={<Send size={20} />}
              sx={{ py: 2, borderRadius: '16px', bgcolor: 'var(--web-primary, #25927F)', fontWeight: 800, fontSize: '1rem', '&:hover': { bgcolor: 'var(--web-dark, #025E44)' } }}
            >
              Enviar Solicitud
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
