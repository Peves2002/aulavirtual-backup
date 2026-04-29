'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Facebook, Youtube, Send, Building, User } from 'lucide-react'
import { Box, TextField, Button, Grid, Typography, Stack, Paper, Divider } from '@mui/material'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

const FONT = 'Poppins, sans-serif'

// Simple TikTok Icon
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
)

export function ContactView() {
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={6}>
        {/* Columna Izquierda: Formulario */}
        <Grid item xs={12} lg={7}>
          <ScrollReveal direction="left">
            <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
              <Typography variant="h4" sx={{ fontFamily: FONT, fontWeight: 800, mb: 1, color: '#0f172a' }}>Envíanos un mensaje</Typography>
              <Typography sx={{ fontFamily: FONT, color: '#64748b', mb: 4 }}>Completa el formulario y nos pondremos en contacto contigo a la brevedad.</Typography>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombres" variant="outlined" sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Empresa" variant="outlined" sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Teléfono" variant="outlined" sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Correo" variant="outlined" sx={inputSx} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Asunto" variant="outlined" multiline rows={4} sx={inputSx} />
                  </Grid>
                </Grid>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<Send size={20} />}
                  sx={{ 
                    py: 2, borderRadius: '14px', bgcolor: 'var(--web-primary, #25927F)', 
                    fontFamily: FONT, fontWeight: 700, textTransform: 'none', fontSize: '1.0625rem',
                    '&:hover': { bgcolor: 'var(--web-dark, #025E44)' }
                  }}
                >
                  Enviar Mensaje
                </Button>
              </Box>
            </Paper>
          </ScrollReveal>
        </Grid>

        {/* Columna Derecha: Información de contacto */}
        <Grid item xs={12} lg={5}>
          <ScrollReveal direction="right">
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, mb: 3, color: '#0f172a' }}>PONTE EN CONTACTO CON NOSOTROS</Typography>
                
                <Stack spacing={3}>
                  <ContactItem 
                    title="Información general"
                    email="informes@crececoncepav.com"
                    phone="906 741 327"
                  />
                  <ContactItem 
                    title="Dirección Académica"
                    person="Carmen Perez-Palma"
                    email="cperezpalma@crececoncepav.com"
                    phone="939 354 884"
                  />
                  <ContactItem 
                    title="Dirección Comercial"
                    person="Jhonatan Ponte"
                    email="jponte@crececoncepav.com"
                    phone="984 736 982"
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Oficina */}
              <Box>
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapPin size={20} color="var(--web-primary, #25927F)" /> Oficina
                </Typography>
                <Typography sx={{ fontFamily: FONT, color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, mb: 2 }}>
                  Jr. Francisco Gonzales Vigil 116 – Los Olivos. <br/>
                  <span style={{ fontSize: '0.8125rem', opacity: 0.8 }}>
                    Alt. cdra 6 de Av. Carlos Izaguirre. Cruce de cdra 9 de Av. Jose Santos Chocano con Gonzales Vigil. Primer piso del hotel Géminis.
                  </span>
                </Typography>
                
                {/* Mapa Embed */}
                <Box sx={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.502844122187!2d-77.0697727!3d-11.9918236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf0000000000%3A0x0!2zMTHCsDU5JzMwLjYiUyA3N8KwMDQnMTEuMiJX!5e0!3m2!1ses!2spe!4v1714260000000!5m2!1ses!2spe" 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                  />
                </Box>
              </Box>

              <Divider />

              {/* Redes Sociales */}
              <Box>
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, mb: 2 }}>Nuestras Redes</Typography>
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: Facebook, href: 'https://www.facebook.com/crececoncepav', color: '#1877F2' },
                    { icon: TikTokIcon, href: 'https://tiktok.com/@crececoncepav', color: '#000000' },
                    { icon: Youtube, href: 'https://www.youtube.com/crececoncepav', color: '#FF0000' },
                  ].map((social, i) => (
                    <Box 
                      key={i} component="a" href={social.href} target="_blank"
                      sx={{ 
                        width: '44px', height: '44px', borderRadius: '12px', bgcolor: '#f1f5f9', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569',
                        transition: 'all 0.2s', '&:hover': { bgcolor: social.color, color: '#fff' }
                      }}
                    >
                      <social.icon size={22} />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

function ContactItem({ title, person, email, phone }: { title: string, person?: string, email: string, phone: string }) {
  return (
    <Box>
      <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '1rem', color: 'var(--web-primary, #25927F)', mb: 0.5 }}>{title}</Typography>
      {person && <Typography sx={{ fontFamily: FONT, fontWeight: 600, fontSize: '0.9375rem', color: '#1e293b', mb: 0.5 }}>{person}</Typography>}
      <Stack spacing={0.5}>
        <Box component="a" href={`mailto:${email}`} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { color: 'var(--web-primary, #25927F)' } }}>
          <Mail size={14} /> {email}
        </Box>
        <Box component="a" href={`https://wa.me/51${phone.replace(/\s/g, '')}`} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { color: '#25D366' } }}>
          <Phone size={14} /> {phone} (WhatsApp)
        </Box>
      </Stack>
    </Box>
  )
}

function Container({ children, sx }: { children: React.ReactNode, sx?: any }) {
  return <Box sx={{ maxWidth: '1280px', margin: '0 auto', px: { xs: 2, md: 4 }, ...sx }}>{children}</Box>
}

const inputSx = {
  '& .MuiOutlinedInput-root': { fontFamily: FONT, borderRadius: '12px' },
  '& .MuiInputLabel-root': { fontFamily: FONT }
}
