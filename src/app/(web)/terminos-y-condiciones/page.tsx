import React from 'react'

import { Box, Container, Typography, Divider, Paper, Stack } from '@mui/material'

export const metadata = {
  title: 'Términos y Condiciones | CEPAV',
  description: 'Términos y Condiciones de uso de la plataforma educativa CEPAV - Corporación Educativa en Turismo S.A.C.',
}

const FONT = 'Poppins, sans-serif'

export default function TerminosYCondicionesPage() {
  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>

      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
          textAlign: 'center',
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
            Términos y Condiciones
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, mx: 'auto' }}>
            Última actualización: Mayo de 2025
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
            border: '1px solid #e2e8f0',
          }}
        >
          <Stack spacing={4} sx={{ '& section p, & section li': { fontFamily: FONT, color: '#475569', lineHeight: 1.8 } }}>

            {/* Introducción */}
            <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
              Bienvenido a <strong>CORPORACIÓN EDUCATIVA EN TURISMO S.A.C. (CEPAV)</strong>, identificada con RUC N.º 20611331194
              (&quot;Nosotros&quot;, &quot;CEPAV&quot;). Al acceder a nuestro sitio web y utilizar nuestros servicios educativos,
              usted (&quot;el Usuario&quot;) acepta estar sujeto a los presentes Términos y Condiciones.
              Le sugerimos leer esta página cuidadosamente antes de proceder con cualquier compra o inscripción.
            </Typography>

            <Divider />

            {/* 1. Generalidades */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                1. Generalidades de los Servicios
              </Typography>
              <Typography paragraph sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                CEPAV es una plataforma de educación online especializada en la formación de profesionales del sector turismo,
                con domicilio en Lima, Perú y presencia en www.crececoncepav.com. Ofrecemos los siguientes servicios:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li><strong>Capacitación corporativa:</strong> Entrenamos equipos empresariales según las necesidades específicas de cada organización del sector turismo.</li>
                <li><strong>Programas personalizados por área:</strong> Ventas y cierre comercial, atención al cliente, operaciones y reservas, marketing turístico; en modalidad online o en vivo.</li>
                <li><strong>Acceso a plataforma educativa:</strong> Cursos especializados en turismo con acceso 24/7, seguimiento de avance por colaborador y certificación al finalizar.</li>
                <li><strong>Reclutamiento y selección de talento:</strong> Publicación de ofertas laborales, acceso a base de talento turístico, preselección de candidatos y apoyo en el proceso de contratación.</li>
                <li><strong>Evaluación y diagnóstico de equipos:</strong> Evaluación de habilidades, detección de brechas y elaboración de un plan de capacitación personalizado.</li>
              </Box>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Al adquirir un curso o servicio, el usuario está comprando una licencia de acceso individual e intransferible,
                salvo en modalidades corporativas donde se indiquen condiciones distintas.
              </Typography>
            </section>

            <Divider />

            {/* 2. Pagos */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                2. Pagos, Precios e Impuestos
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Todos los pagos procesados en nuestro sitio web se gestionan a través de pasarelas de pago seguras (IziPay, Culqi o PayPal).
                Los precios están expresados en soles peruanos (PEN) o dólares (USD) según se indique, y pueden estar sujetos a cambios.
                Una vez procesada una orden y validado el pago, el precio se mantendrá respetado.
                Los cupones de descuento deben aplicarse antes de finalizar el proceso de compra.
              </Typography>
            </section>

            <Divider />

            {/* 3. Devoluciones */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                3. Políticas de Devolución
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Debido a la naturaleza de los bienes digitales (cursos pre-grabados y contenido virtual),{' '}
                <strong>las devoluciones o reembolsos no están permitidos</strong> una vez que el usuario ingresa al Aula Virtual
                o se comprueba el acceso al material. Ante fallo técnico comprobado, puede escribir a nuestro equipo de soporte,
                que evaluará excepciones únicamente ante defectos probados del sistema.
                Para servicios de capacitación corporativa, las condiciones de cancelación se establecerán en el contrato respectivo.
              </Typography>
            </section>

            <Divider />

            {/* 4. Propiedad intelectual */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                4. Propiedad Intelectual
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Todo el material expuesto en la plataforma (textos, gráficos, videos, evaluaciones y recursos educativos)
                pertenece a <strong>CORPORACIÓN EDUCATIVA EN TURISMO S.A.C. (CEPAV)</strong> o a sus instructores afiliados.
                Queda estrictamente prohibida su copia, distribución o cualquier modalidad de reproducción no autorizada.
                Cualquier violación implicará el bloqueo irrevocable de la cuenta y podrá conllevar acciones legales.
              </Typography>
            </section>

            <Divider />

            {/* 5. Certificaciones */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                5. Certificaciones
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                La emisión de certificados está sujeta a los requisitos indicados en cada curso (visualización completa al 100%,
                aprobación de evaluaciones, etc.). Los certificados son verificables mediante código QR.
                CEPAV se reserva el derecho de no emitir certificaciones si constata fraude o suplantación de identidad.
              </Typography>
            </section>

            <Divider />

            {/* 6. Privacidad */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                6. Privacidad y Datos Personales
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                El tratamiento de datos personales se realiza conforme a la Ley N.º 29733 – Ley de Protección de Datos Personales
                y su reglamento vigente (D.S. N.º 016-2024-JUS). Los datos se utilizan exclusivamente para la prestación del servicio
                educativo y facturación. Para mayor detalle, consulte nuestra{' '}
                <a href="/politica-de-privacidad" style={{ color: 'var(--web-dark, #025E44)', textDecoration: 'underline' }}>
                  Política de Privacidad
                </a>.
              </Typography>
            </section>

            <Divider />

            {/* 7. Contacto */}
            <section>
              <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 2 }}>
                7. Contacto y Libro de Reclamaciones
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8 }}>
                Para consultas de soporte o información, contáctenos a{' '}
                <strong>informes@crececoncepav.com</strong>.
                De acuerdo con la legislación vigente de protección al consumidor peruano, mantenemos un{' '}
                <a href="/libro-de-reclamaciones" style={{ color: 'var(--web-dark, #025E44)', textDecoration: 'underline' }}>
                  Libro de Reclamaciones a disposición pública
                </a>{' '}
                en nuestra plataforma web.
              </Typography>
              <Typography sx={{ fontFamily: FONT, color: '#475569', lineHeight: 1.8, mt: 2 }}>
                <strong>CORPORACIÓN EDUCATIVA EN TURISMO S.A.C. (CEPAV)</strong><br />
                RUC N.º 20611331194<br />
                Lima, Perú — www.crececoncepav.com
              </Typography>
            </section>

          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
