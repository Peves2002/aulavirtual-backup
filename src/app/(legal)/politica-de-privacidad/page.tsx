import React from 'react'

import { Box, Container, Typography, Divider } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidad | Elite Engineering',
  description: 'Política de privacidad y protección de datos personales de ELITE ENGINEERING E.I.R.L.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #025E44)' }} mb={2} textAlign="center">
          Política de Privacidad
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          Última actualización: Mayo de 2026
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #025E44)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

          <Typography paragraph>
            En <strong>ELITE ENGINEERING E.I.R.L.</strong> (RUC: 20610569006), con domicilio en Mza. a Cas. la Retama, JIRON EL INCA 537, nos tomamos muy en serio la privacidad y protección de sus datos personales. En cumplimiento de la <strong>Ley N° 29733 - Ley de Protección de Datos Personales</strong> de la República del Perú y su Reglamento, le informamos detalladamente sobre el uso y tratamiento que le damos a la información que recopilamos a través de nuestros servicios de implementación BIM, consultoría de ingeniería, diseño de viviendas y nuestra Aula Virtual.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4">1. Recopilación de Datos Personales</Typography>
          <Typography paragraph>
            Recopilamos información personal que usted nos proporciona directamente al registrarse, comprar un curso o contactarse con nosotros. Estos datos pueden incluir: nombre completo, número de documento de identidad (DNI/RUC), correo electrónico, número de teléfono, dirección y datos de facturación.
          </Typography>

          <Typography variant="h4">2. Finalidad del Tratamiento de Datos</Typography>
          <Typography paragraph>
            Sus datos personales serán utilizados estrictamente para las siguientes finalidades necesarias:
          </Typography>
          <Typography paragraph>
            - Gestionar su cuenta de usuario y brindarle acceso al Aula Virtual.<br />
            - Procesar sus transacciones de pago de manera segura a través de nuestras pasarelas autorizadas.<br />
            - Emitir y verificar los certificados de finalización de cursos correspondientes.<br />
            - Brindarle soporte técnico y responder a sus consultas o reclamos.<br />
            - Cumplir con las obligaciones legales y tributarias correspondientes.
          </Typography>

          <Typography variant="h4">3. Consentimiento y Seguridad de los Datos</Typography>
          <Typography paragraph>
            Al registrar sus datos en nuestra plataforma, usted otorga su consentimiento libre, previo, expreso, inequívoco e informado para el tratamiento de sus datos personales. Nos comprometemos a aplicar las medidas de seguridad técnicas, organizativas y legales necesarias para proteger su información contra accesos no autorizados, pérdida, alteración o divulgación.
          </Typography>

          <Typography variant="h4">4. Transferencia de Datos a Terceros</Typography>
          <Typography paragraph>
            No vendemos, comercializamos ni transferimos sus datos personales a terceros sin su consentimiento previo, salvo a los proveedores de servicios que nos ayudan a operar nuestra plataforma (por ejemplo, pasarelas de pago y servicios de hosting), quienes están sujetos a estrictos acuerdos de confidencialidad y tratamiento seguro de la información.
          </Typography>

          <Typography variant="h4">5. Derechos ARCO</Typography>
          <Typography paragraph>
            Usted puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) de sus datos personales. Para ello, puede enviar una solicitud formal por escrito a nuestro correo electrónico: <strong>gerencia@ingenierodeelite.com</strong>, adjuntando una copia de su documento de identidad.
          </Typography>

          <Typography variant="h4">6. Modificaciones a la Política de Privacidad</Typography>
          <Typography paragraph>
            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a novedades legislativas o prácticas del sector. Cualquier cambio será publicado en esta misma sección, por lo que le recomendamos revisarla periódicamente.
          </Typography>

          <Typography variant="h4">7. Contacto</Typography>
          <Typography paragraph>
            Si tiene alguna duda o consulta respecto a esta política o al tratamiento de sus datos personales, puede escribirnos a <strong>gerencia@ingenierodeelite.com</strong>.
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
