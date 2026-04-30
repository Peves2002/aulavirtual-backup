import { Box, Container, Typography, Stack, Grid, Paper, Divider, Button } from '@mui/material'

import { Mail, MessageCircle, Facebook, Award, ShieldAlert, ArrowRight, UserPlus } from 'lucide-react'

import JobOffersSection from '@/features/web/bolsa/components/JobOffersSection'

export const metadata = {
  title: 'Bolsa de Trabajo - CEPAV',
  description: 'Conoce las oportunidades laborales en el sector turismo a través de la red de agencias de CEPAV y Futurismo Group.',
}

const FONT = 'Poppins, sans-serif'

export default function BolsaTrabajoPage() {
  const facebookGroup = 'https://www.facebook.com/groups/trabajoypracticasenturismo'
  const email = 'informes@crececoncepav.com'

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 14, md: 20 },
          px: { xs: 3, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Bolsa de Trabajo
          </Typography>
          <Typography
            sx={{ fontFamily: FONT, fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
          >
            Conectamos el talento de nuestros estudiantes con las mejores agencias de viaje del Perú.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          {/* Main Info & Offers */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                      Nuestra Red de Empleabilidad
                    </Typography>
                    <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                      CEPAV forma parte del grupo de marcas que también maneja <strong>Futurismo Group</strong>, agencia de viajes tour operadora con una amplia red de agencias aliadas en Lima y provincias. 
                    </Typography>
                    <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, fontSize: '1.0625rem', mt: 2 }}>
                      Recibimos solicitudes semanales de personal (practicantes y egresados) que compartimos exclusivamente con nuestra comunidad educativa a través de nuestra web, correo y WhatsApp.
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: FONT, fontWeight: 800, color: '#1e293b', mb: 3 }}>
                      ¿Cómo acceder a las oportunidades?
                    </Typography>
                    <Stack spacing={3}>
                      {[
                        { 
                          icon: Award, 
                          title: '1. Actualiza tu CV', 
                          desc: 'Al finalizar tu curso, integra tus nuevas habilidades y certificados en tu currículo profesional.' 
                        },
                        { 
                          icon: Mail, 
                          title: '2. Envíanos tu Perfil', 
                          desc: `Envía tu CV actualizado a ${email} con el asunto "BOLSA DE TRABAJO CEPAV".` 
                        },
                        { 
                          icon: MessageCircle, 
                          title: '3. Grupo de WhatsApp', 
                          desc: 'Únete a nuestra comunidad de alertas laborales en tiempo real.',
                          action: { label: 'Unirme a WhatsApp', href: '#', color: '#25D366' }
                        },
                        { 
                          icon: Facebook, 
                          title: '4. Comunidad de Facebook', 
                          desc: 'Accede a ofertas y contenido de valor en nuestro grupo oficial.',
                          action: { label: 'Ir al Grupo de Facebook', href: facebookGroup, color: '#1877F2' }
                        }
                      ].map((step, i) => (
                        <Box key={i} sx={{ display: 'flex', gap: 2.5 }}>
                          <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <step.icon size={22} color="var(--web-primary, #25927F)" />
                          </Box>
                          <Box>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>{step.title}</Typography>
                            <Typography sx={{ fontFamily: FONT, color: '#64748b', fontSize: '0.9375rem', mt: 0.5 }}>{step.desc}</Typography>
                            {step.action && (
                              <Button 
                                variant="text" 
                                href={step.action.href} 
                                target="_blank"
                                sx={{ 
                                  mt: 1, p: 0, textTransform: 'none', fontWeight: 700, 
                                  color: step.action.color, fontFamily: FONT,
                                  '&:hover': { bgcolor: 'transparent', opacity: 0.8 }
                                }}
                              >
                                {step.action.label} <ArrowRight size={16} style={{ marginLeft: 4 }} />
                              </Button>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

              {/* Sección de Ofertas Laborales */}
              <JobOffersSection />
            </Stack>
          </Grid>

          {/* Sidebar Info */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={4}>
              {/* Futurismo Hiring */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', bgcolor: 'var(--web-dark, #025E44)', color: '#ffffff' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <UserPlus size={24} color="var(--web-light, #BDD962)" />
                </Box>
                <Typography variant="h6" sx={{ fontFamily: FONT, fontWeight: 800, mb: 1.5, color: '#ffffff' }}>
                  Ingreso Directo a Futurismo
                </Typography>
                <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', opacity: 1, lineHeight: 1.6, mb: 2, color: '#ffffff' }}>
                  Los estudiantes con participación sobresaliente pueden ingresar directamente a trabajar en Futurismo como ejecutivos de ventas. 
                </Typography>
                <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', fontWeight: 600, color: 'var(--web-light, #BDD962)' }}>
                  * Contrataciones semestrales basadas en desempeño académico.
                </Typography>
              </Paper>

              {/* Disclaimer */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', bgcolor: '#fff', border: '1px solid #fee2e2' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <ShieldAlert size={20} color="#ef4444" />
                  <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#991b1b' }}>Aviso Legal</Typography>
                </Box>
                <Typography sx={{ fontFamily: FONT, fontSize: '0.8125rem', color: '#7f1d1d', opacity: 0.8, lineHeight: 1.6 }}>
                  CEPAV actúa únicamente como intermediario entre el postulante y la empresa. Una vez concretado el empleo, CEPAV no mantiene vínculo ni responsabilidad legal sobre la relación laboral resultante.
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
