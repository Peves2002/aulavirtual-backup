import { Box, Container, Typography, Divider } from '@mui/material'

import { Navbar } from '@/marketing/components/site/Navbar'
import { Footer } from '@/marketing/components/site/Footer'

export const metadata = {
  title: 'Políticas de Reembolso | Grupo Corpus'
}

export default function PoliticasDeReembolsoPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans">
      <Navbar />

      <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333', flexGrow: 1 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} sx={{ color: '#0c1938' }} mb={2} textAlign="center">
            Políticas de Reembolso
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
            Última actualización: Noviembre de 2024
          </Typography>

          <Box sx={{ '& h4': { color: '#0c1938', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

            <Typography paragraph>
              <strong>GRUPO CORPUS</strong>, en adelante &quot;La Empresa&quot;, establece las siguientes políticas de reembolso para los cursos y servicios adquiridos a través de nuestra plataforma virtual.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4">1. Condiciones Generales</Typography>
            <Typography paragraph>
              Las solicitudes de reembolso serán evaluadas de acuerdo con la naturaleza del servicio adquirido (curso en vivo o curso grabado). Es indispensable que el estudiante se comunique por los canales oficiales dentro de los plazos establecidos.
            </Typography>

            <Typography variant="h4">2. Cursos en Vivo</Typography>
            <Typography paragraph>
              - Se aceptarán solicitudes de reembolso hasta <strong>7 días hábiles antes</strong> del inicio oficial del curso. <br />
              - Una vez iniciado el curso, no se realizarán reembolsos por inasistencias o problemas técnicos ajenos a La Empresa.
            </Typography>

            <Typography variant="h4">3. Cursos Grabados / Paquetes Asíncronos</Typography>
            <Typography paragraph>
              Debido a la naturaleza del contenido digital y su acceso inmediato, <strong>no se realizarán reembolsos</strong> para cursos grabados o material descargable una vez que el usuario haya accedido a la plataforma o visualizado el contenido.
            </Typography>

            <Typography variant="h4">4. Procedimiento de Solicitud</Typography>
            <Typography paragraph>
              Toda solicitud de reembolso debe ser enviada al correo electrónico <strong>grupocorpuscapacitaciones@gmail.com</strong>, indicando: <br />
              - Nombre completo y DNI. <br />
              - Nombre del curso adquirido. <br />
              - Comprobante de pago o número de transacción. <br />
              - Motivo detallado de la solicitud. <br />
              La Empresa responderá en un plazo máximo de <strong>15 días hábiles</strong>.
            </Typography>

            <Typography variant="h4">5. Reembolsos Aprobados</Typography>
            <Typography paragraph>
              En caso de ser aprobado, el reembolso se procesará utilizando el mismo método de pago utilizado durante la compra, y puede tardar entre 15 y 30 días hábiles en verse reflejado en la cuenta bancaria o tarjeta del cliente, dependiendo de los tiempos de la entidad financiera.
            </Typography>

            <Typography variant="h4">6. Contacto</Typography>
            <Typography paragraph>
              Si tiene dudas sobre estas políticas, comuníquese con nosotros: <br />
              <strong>Correo Electrónico:</strong> grupocorpuscapacitaciones@gmail.com <br />
              <strong>Teléfono / WhatsApp:</strong> +51 953 255 751 <br />
            </Typography>

          </Box>
        </Container>
      </Box>

      <Footer />
    </div>
  )
}
