import React from 'react'

import { Box, Container, Typography, Divider } from '@mui/material'

export const metadata = {
  title: 'Términos y Condiciones | Coplimita',
}

export default function TerminosYCondicionesPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #025E44)' }} mb={2} textAlign="center">
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          Última actualización: Junio de 2026
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #025E44)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

          <Typography paragraph>
            Bienvenido a <strong>Coplimita</strong> (&quot;Nosotros&quot;, &quot;la Institución&quot;), plataforma educativa
            de <strong>Coop Nuevo Mundo Sermul</strong>, con RUC <strong>20601400384</strong>, con domicilio en
            Jr. Alfonzo Peláez Bazán 240, Cajamarca, Perú.
            Al acceder a nuestro sitio web y utilizar nuestros servicios de Aula Virtual,
            usted (&quot;el Usuario&quot;) acepta estar sujeto a los presentes Términos y Condiciones.
            Le sugerimos leer esta página cuidadosamente antes de proceder con cualquier compra o inscripción.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4">1. Generalidades de los Servicios</Typography>
          <Typography paragraph>
            Coplimita brinda servicios de formación y actualización profesional online, mediante diplomados,
            especializaciones y programas de actualización dirigidos a docentes, abogados, ingenieros,
            profesionales de la salud y de diversas áreas profesionales.
            Al adquirir un programa, está comprando una licencia de acceso individual e intransferible.
          </Typography>

          <Typography variant="h4">2. Pagos, Precios e Impuestos</Typography>
          <Typography paragraph>
            Todos los pagos procesados en nuestro sitio web se gestionan a través de pasarelas de pago seguras.
            Los precios expuestos pueden estar sujetos a cambios; no obstante, una vez procesada una orden y validado el pago,
            el precio se mantendrá respetado. En caso de aplicar cupones de descuento, estos deben validarse antes del check-out final.
          </Typography>

          <Typography variant="h4">3. Políticas de Devolución</Typography>
          <Typography paragraph>
            Debido a la naturaleza de los bienes digitales (programas pre-grabados y contenido virtual),
            <strong> las devoluciones o reembolsos no están permitidos</strong> una vez que el usuario ingresa al Aula Virtual
            o se comprueba el acceso al material. Ante cualquier incidencia inusual o fallo técnico,
            puede escribir a nuestro equipo de soporte que evaluará excepciones únicamente ante defectos probados del sistema.
          </Typography>

          <Typography variant="h4">4. Propiedad Intelectual e Industrial</Typography>
          <Typography paragraph>
            Todo el material expuesto en la plataforma (textos, gráficos, videos, diagramas y recursos)
            pertenece originariamente a <strong>Coplimita — Coop Nuevo Mundo Sermul</strong> o a sus instructores afiliados.
            Queda estrictamente prohibida su copia, distribución sin autorización comercial y cualquier modalidad de piratería.
            Cualquier violación directa implicará el bloqueo irrevocable de la cuenta y potenciales acciones civiles correspondientes.
          </Typography>

          <Typography variant="h4">5. Certificaciones</Typography>
          <Typography paragraph>
            La emisión de certificados dentro de nuestra plataforma se somete a los requisitos técnicos
            indicados en cada programa (visualización al 100%, aprobación de evaluaciones, etc.). Coplimita se reserva
            el derecho de verificar la identidad de los estudiantes y de no emitir certificaciones si constata fraude o suplantación.
          </Typography>

          <Typography variant="h4">6. Privacidad y Datos Personales</Typography>
          <Typography paragraph>
            Nos comprometemos a mantener la confidencialidad de la información proporcionada por los usuarios en el momento
            del registro, de conformidad con la Ley de Protección de Datos Personales (Ley N° 29733) y su reglamento.
            Los datos se utilizan estrictamente para la prestación del servicio educativo y fines facturativos,
            nunca serán cedidos a bases de datos de terceros sin autorización expresa del titular.
          </Typography>

          <Typography variant="h4">7. Contacto y Libro de Reclamaciones</Typography>
          <Typography paragraph>
            Para consultas de soporte, envíe sus requerimientos a{' '}
            <strong>
              <a href="mailto:coplimitainstitute@gmail.com" style={{ color: 'var(--web-dark, #025E44)' }}>coplimitainstitute@gmail.com</a>
            </strong>{' '}
            o{' '}
            <strong>
              <a href="mailto:coplimitainformes@gmail.com" style={{ color: 'var(--web-dark, #025E44)' }}>coplimitainformes@gmail.com</a>
            </strong>.
            También puede contactarnos por WhatsApp al{' '}
            <strong>
              <a href="https://wa.me/51931529171" style={{ color: 'var(--web-dark, #025E44)' }}>+51 931 529 171</a>
            </strong>.
            De acuerdo a la legislación vigente de protección al consumidor peruano, mantenemos un{' '}
            <a href="/libro-de-reclamaciones" style={{ color: 'var(--web-dark, #025E44)', textDecoration: 'underline' }}>Libro de Reclamaciones a disposición pública</a>{' '}
            en nuestra plataforma web.
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
