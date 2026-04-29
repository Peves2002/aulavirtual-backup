import { Box, Container, Typography, Stack, Divider, Paper } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidad - CEPAV',
  description: 'Política de Privacidad de CORPORACIÓN EDUCATIVA EN TURISMO S.A.C. (CEPAV)',
}

const FONT = 'Poppins, sans-serif'

export default function PoliticaPrivacidadPage() {
  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Política de Privacidad
          </Typography>
          <Typography
            sx={{ fontFamily: FONT, fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, mx: 'auto' }}
          >
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus datos personales.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -5, position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 8 }, 
            borderRadius: '32px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}
        >
          <Stack spacing={4}>
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                1. IDENTIDAD DEL TITULAR
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                CORPORACIÓN EDUCATIVA EN TURISMO S.A.C. (CEPAV), identificada con RUC N.º [COMPLETAR], con domicilio en Cooperativa Magdalena MZ B LT 23, distrito de Los Olivos, provincia y departamento de Lima, Perú, es titular del sitio web www.crececoncepav.com (en adelante, el “Portal”).
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, mt: 1 }}>
                CEPAV es una plataforma de educación online especializada en la formación de agentes de viaje y profesionales del sector turismo.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                2. MARCO LEGAL
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                La presente Política de Privacidad cumple con lo establecido en:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Ley N.º 29733 – Ley de Protección de Datos Personales (Perú)</li>
                <li>Decreto Supremo N.º 016-2024-JUS (Reglamento actualizado)</li>
              </Box>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, mt: 1 }}>
                El tratamiento de datos personales se realiza bajo los principios de legalidad, consentimiento, finalidad, proporcionalidad, calidad, seguridad y disposición de recurso.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                3. DATOS PERSONALES QUE RECOPILAMOS
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', mb: 1 }}>Datos básicos:</Typography>
              <Box component="ul" sx={{ pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Nombres y apellidos</li>
                <li>Correo electrónico</li>
                <li>Número telefónico</li>
                <li>Fecha de nacimiento</li>
                <li>País y ciudad de residencia</li>
              </Box>
              
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', mt: 2, mb: 1 }}>Datos académicos y de uso:</Typography>
              <Box component="ul" sx={{ pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Cursos adquiridos</li>
                <li>Progreso académico</li>
                <li>Evaluaciones y participación</li>
                <li>Interacción dentro de la plataforma</li>
              </Box>

              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', mt: 2, mb: 1 }}>Datos obtenidos automáticamente:</Typography>
              <Box component="ul" sx={{ pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Dirección IP</li>
                <li>Tipo de dispositivo</li>
                <li>Navegador</li>
                <li>Comportamiento de navegación (cookies)</li>
              </Box>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                4. DATOS DE MENORES DE EDAD
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                El Portal puede ser utilizado por adolescentes mayores de 14 años. En el caso de menores de edad, el tratamiento de datos se realizará únicamente con el consentimiento de sus padres o tutores legales.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                5. FINALIDAD DEL TRATAMIENTO DE DATOS
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', mb: 1 }}>Finalidades necesarias (obligatorias):</Typography>
              <Box component="ul" sx={{ pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Gestionar el registro del usuario</li>
                <li>Brindar acceso a los cursos y servicios educativos</li>
                <li>Procesar pagos y emitir comprobantes</li>
                <li>Gestionar certificaciones</li>
                <li>Brindar soporte académico y técnico</li>
                <li>Gestionar reclamos y consultas</li>
              </Box>
              
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b', mt: 2, mb: 1 }}>Finalidades adicionales (previo consentimiento):</Typography>
              <Box component="ul" sx={{ pl: 3, color: '#475569', fontFamily: FONT, lineHeight: 1.8 }}>
                <li>Enviar información promocional, ofertas y nuevos cursos</li>
                <li>Realizar encuestas y estudios de mercado</li>
                <li>Personalizar la experiencia del usuario</li>
                <li>Recomendar cursos según intereses (perfilamiento)</li>
              </Box>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                6. USO DE DATOS PARA EMPLEABILIDAD
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Como parte de nuestros servicios, CEPAV podrá compartir el perfil del usuario con empresas del sector turismo y recomendar candidatos a oportunidades laborales. Esto se realizará únicamente con consentimiento previo del usuario.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                7. TRANSFERENCIA DE DATOS PERSONALES
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Sus datos podrán ser transferidos a nivel nacional e internacional a socios estratégicos, docentes y proveedores tecnológicos (como Google, Zoom, Stripe, Mercado Pago) garantizando siempre los niveles adecuados de protección conforme a ley.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                12. DERECHOS DEL USUARIO (ARCO)
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                El usuario puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición enviando una solicitud a:
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: 'var(--web-primary, #25927F)', mt: 1 }}>
                informes@crececoncepav.com
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, mt: 1 }}>
                Debe incluir su nombre completo, documento de identidad y descripción clara del pedido.
              </Typography>
            </section>

            <Divider />

            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                16. OFICIAL DE PROTECCIÓN DE DATOS
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Responsable designado:
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: '#1e293b' }}>
                Jhonatan Ponte Guerrero
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: 'var(--web-primary, #25927F)' }}>
                jponte@crececoncepav.com
              </Typography>
            </section>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
