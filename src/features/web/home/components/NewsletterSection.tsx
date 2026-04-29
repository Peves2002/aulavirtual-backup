'use client'

import { useState } from 'react'
import { Box, Container, Typography, Grid, TextField, Button, Checkbox, FormControlLabel, FormGroup, Collapse, IconButton, Paper, Stack } from '@mui/material'
import { ChevronDown, ChevronUp, Send, Mail, BellRing } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const FONT = 'Poppins, sans-serif'

const topics = [
  'Ventas',
  'Marketing',
  'Recursos Humanos',
  'Finanzas',
  'Atención al cliente'
]

export default function NewsletterSection() {
  const [showTopics, setShowTopics] = useState(false)
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    selectedTopics: [] as string[]
  })
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleTopicChange = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de suscripción
    setIsSubscribed(true)
  }

  if (isSubscribed) {
    return (
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc' }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: '32px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <Send size={32} color="var(--web-primary, #25927F)" />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: FONT, fontWeight: 900, mb: 2 }}>¡Gracias por suscribirte!</Typography>
            <Typography sx={{ fontFamily: FONT, color: '#64748b' }}>Muy pronto recibirás nuestras novedades y contenido inspirador en tu correo.</Typography>
          </Paper>
        </Container>
      </section>
    )
  }

  return (
    <section style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <ScrollReveal direction="up">
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 8 }, 
              borderRadius: '48px', 
              background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(1, 45, 34, 0.25)'
            }}
          >
            {/* Decoración */}
            <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.03)' }} />
            <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(189, 217, 98, 0.05)' }} />

            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} lg={5}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '999px', width: 'fit-content' }}>
                    <BellRing size={18} color="var(--web-light, #BDD962)" />
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.05em' }}>SUSCRÍBETE</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontFamily: FONT, fontWeight: 900, lineHeight: 1.1, fontSize: { xs: '2rem', md: '2.75rem' } }}>
                    Sé el primero en saber nuestras <span style={{ color: 'var(--web-light, #BDD962)' }}>novedades</span>
                  </Typography>
                  <Typography sx={{ fontFamily: FONT, fontSize: '1.0625rem', opacity: 0.8, lineHeight: 1.6 }}>
                    Déjanos tus datos y recibe semanalmente información privilegiada e inspiradora que te será muy útil en tu vida profesional y que aportará muchísimo para tu Agencia de viajes.
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} lg={7}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <NewsletterField label="Nombres" value={formData.nombres} onChange={v => setFormData(p => ({ ...p, nombres: v }))} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NewsletterField label="Apellidos" value={formData.apellidos} onChange={v => setFormData(p => ({ ...p, apellidos: v }))} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NewsletterField label="Correo" type="email" value={formData.correo} onChange={v => setFormData(p => ({ ...p, correo: v }))} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NewsletterField label="Teléfono" value={formData.telefono} onChange={v => setFormData(p => ({ ...p, telefono: v }))} />
                    </Grid>

                    {/* Temas Preferidos */}
                    <Grid item xs={12}>
                      <Box 
                        onClick={() => setShowTopics(!showTopics)}
                        sx={{ 
                          p: 2, 
                          borderRadius: '16px', 
                          bgcolor: 'rgba(255,255,255,0.06)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.9375rem', fontWeight: 600 }}>
                          Temas de interés {formData.selectedTopics.length > 0 && `(${formData.selectedTopics.length})`}
                        </Typography>
                        {showTopics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </Box>
                      
                      <Collapse in={showTopics}>
                        <Box sx={{ mt: 2, p: 3, bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                            {topics.map(topic => (
                              <FormControlLabel
                                key={topic}
                                control={
                                  <Checkbox 
                                    checked={formData.selectedTopics.includes(topic)}
                                    onChange={() => handleTopicChange(topic)}
                                    sx={{ 
                                      color: 'rgba(255,255,255,0.3)', 
                                      '&.Mui-checked': { color: 'var(--web-light, #BDD962)' } 
                                    }} 
                                  />
                                }
                                label={<Typography sx={{ fontFamily: FONT, fontSize: '0.875rem' }}>{topic}</Typography>}
                              />
                            ))}
                          </FormGroup>
                        </Box>
                      </Collapse>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ 
                          py: 2, 
                          borderRadius: '16px', 
                          bgcolor: 'var(--web-light, #BDD962)', 
                          color: 'var(--web-dark, #025E44)',
                          fontWeight: 800,
                          fontSize: '1.125rem',
                          fontFamily: FONT,
                          textTransform: 'none',
                          boxShadow: '0 10px 30px rgba(189, 217, 98, 0.3)',
                          '&:hover': { bgcolor: '#acc55a', transform: 'translateY(-2px)' },
                          transition: 'all 0.3s'
                        }}
                      >
                        Suscribirme ahora
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </ScrollReveal>
      </Container>
    </section>
  )
}

function NewsletterField({ label, type = 'text', value, onChange }: { label: string, type?: string, value: string, onChange: (v: string) => void }) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      variant="outlined"
      value={value}
      onChange={e => onChange(e.target.value)}
      sx={{
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)', fontFamily: FONT },
        '& .MuiOutlinedInput-root': { 
          color: '#ffffff',
          fontFamily: FONT,
          borderRadius: '16px',
          bgcolor: 'rgba(255,255,255,0.06)',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--web-light, #BDD962)' }
        },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--web-light, #BDD962)' }
      }}
    />
  )
}
