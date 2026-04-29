'use client'

import React, { useState } from 'react'

import { Box, Typography, Button, Stack, Grid, Paper, Avatar, Collapse, Divider } from '@mui/material'

import { MapPin, Briefcase, Users, DollarSign, ListChecks, Info, ChevronDown, ChevronUp } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'

interface JobOffer {
  id: string
  logo: string
  nombreEmpresa: string
  ciudad: string
  puesto: string
  vacantes: number
  sueldo: string
  requisitos: string[]
  funciones: string[]
  contacto: {
    email?: string
    whatsapp?: string
  }
}

// Ejemplo de ofertas (pueden ser actualizadas manualmente aquí)
const jobOffers: JobOffer[] = [
  {
    id: '1',
    logo: '/images/logo-arm.png', // Reemplazar con logos reales
    nombreEmpresa: 'Futurismo Group & Travel',
    ciudad: 'Lima (Miraflores)',
    puesto: 'Egresado - Ejecutivo Comercial',
    vacantes: 2,
    sueldo: 'S/ 1,200 + Comisiones',
    requisitos: [
      'Egresado de la carrera de Turismo o afines.',
      'Conocimiento de destinos nacionales.',
      'Proactivo y con orientación a resultados.',
      'Experiencia mínima de 6 meses en ventas.'
    ],
    funciones: [
      'Asesoría personalizada a clientes.',
      'Cierre de ventas de paquetes turísticos.',
      'Seguimiento post-venta.',
      'Elaboración de itinerarios.'
    ],
    contacto: {
      email: 'rrhh@futurismogroup.com',
      whatsapp: '51906741327'
    }
  }
]

export default function JobOffersSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showContactId, setShowContactId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePostular = (id: string) => {
    setShowContactId(showContactId === id ? null : id)
  }

  return (
    <Box sx={{ py: 8 }}>
      <ScrollReveal>
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 900, 
              color: 'var(--web-dark, #025E44)', 
              mb: 2,
              textAlign: 'center'
            }}
          >
            OFERTAS LABORALES
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              color: '#475569', 
              textAlign: 'center', 
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Encuentra las mejores ofertas de trabajo con empresas debidamente filtradas y que te brindarán la mejor experiencia laboral posible.
          </Typography>
        </Box>
      </ScrollReveal>

      <Stack spacing={3}>
        {jobOffers.map((offer) => (
          <ScrollReveal key={offer.id} direction="up">
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: '24px', 
                border: '1px solid #e2e8f0', 
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }
              }}
            >
              {/* Resumen de la oferta */}
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <Avatar 
                      src={offer.logo} 
                      variant="rounded" 
                      sx={{ width: 80, height: 80, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                      {offer.puesto}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#64748b' }}>
                        <MapPin size={16} />
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{offer.ciudad}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'var(--web-primary, #25927F)' }}>
                        <Users size={16} />
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>{offer.vacantes} vacantes</Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#1e293b' }}>
                        <DollarSign size={16} />
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{offer.sueldo}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md="auto">
                    <Stack direction="row" spacing={2}>
                      <Button 
                        variant="outlined" 
                        onClick={() => toggleExpand(offer.id)}
                        endIcon={expandedId === offer.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        sx={{ 
                          borderRadius: '12px', 
                          textTransform: 'none', 
                          fontWeight: 700, 
                          fontFamily: 'Poppins, sans-serif',
                          borderColor: '#e2e8f0',
                          color: '#475569',
                          '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' }
                        }}
                      >
                        {expandedId === offer.id ? 'Ver menos' : 'Ver detalles'}
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={() => handlePostular(offer.id)}
                        sx={{ 
                          borderRadius: '12px', 
                          textTransform: 'none', 
                          fontWeight: 800, 
                          fontFamily: 'Poppins, sans-serif',
                          bgcolor: 'var(--web-primary, #25927F)',
                          '&:hover': { bgcolor: 'var(--web-dark, #025E44)' }
                        }}
                      >
                        Postular
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>

                {/* Mensaje de Postulación */}
                <Collapse in={showContactId === offer.id}>
                  <Box sx={{ mt: 3, p: 2.5, borderRadius: '16px', bgcolor: 'rgba(37, 146, 127, 0.05)', border: '1px solid rgba(37, 146, 127, 0.1)' }}>
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: 'var(--web-dark, #025E44)', fontWeight: 600 }}>
                      Envía tu CV al correo <span style={{ textDecoration: 'underline' }}>{offer.contacto.email}</span> o whatsapp <span style={{ textDecoration: 'underline' }}>{offer.contacto.whatsapp}</span> indicando en asunto el puesto al que postulas.
                    </Typography>
                  </Box>
                </Collapse>
              </Box>

              {/* Detalles expandidos */}
              <Collapse in={expandedId === offer.id}>
                <Divider />
                <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: '#fafafa' }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ListChecks size={20} color="var(--web-primary, #25927F)" />
                          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#0f172a' }}>Requisitos</Typography>
                        </Stack>
                        <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {offer.requisitos.map((req, i) => (
                            <li key={i} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#475569' }}>{req}</li>
                          ))}
                        </ul>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Briefcase size={20} color="var(--web-primary, #25927F)" />
                          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#0f172a' }}>Funciones</Typography>
                        </Stack>
                        <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {offer.funciones.map((func, i) => (
                            <li key={i} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#475569' }}>{func}</li>
                          ))}
                        </ul>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </Paper>
          </ScrollReveal>
        ))}

        {jobOffers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#ffffff', borderRadius: '32px', border: '1px dashed #e2e8f0' }}>
            <Info size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', color: '#64748b' }}>No hay ofertas laborales disponibles en este momento.</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
