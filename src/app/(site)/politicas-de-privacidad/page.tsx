import { Box, Container, Typography, Divider } from '@mui/material'

import { Navbar } from '@/marketing/components/site/Navbar'
import { Footer } from '@/marketing/components/site/Footer'

export const metadata = {
  title: 'Políticas de Privacidad | Grupo Corpus'
}

export default function PoliticasDePrivacidadPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans">
      <Navbar />

      <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333', flexGrow: 1 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} sx={{ color: '#0c1938' }} mb={2} textAlign="center">
            Políticas de Privacidad
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
            Última actualización: Noviembre de 2024
          </Typography>

          <Box sx={{ '& h4': { color: '#0c1938', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

            <Typography paragraph>
              <strong>GRUPO CORPUS</strong>, con RUC 80338132 y domicilio en LIMA-LIMA-LOS OLIVOS - AV. ZARAGOZA MZ B LT.22,
              (en adelante &quot;La Empresa&quot;), respeta su privacidad y está comprometida con la protección de sus datos personales,
              en cumplimiento estricto con la Ley N° 29733, Ley de Protección de Datos Personales, y su Reglamento.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4">1. Recopilación de Datos Personales</Typography>
            <Typography paragraph>
              Recopilamos información personal proporcionada voluntariamente al registrarse en nuestra Aula Virtual,
              completar formularios de inscripción a cursos, contactarnos por WhatsApp o correo electrónico, o al realizar compras.
              Los datos recopilados pueden incluir nombres, apellidos, correo electrónico, teléfono y DNI/Carnet de Extranjería.
            </Typography>

            <Typography variant="h4">2. Finalidad del Tratamiento de Datos</Typography>
            <Typography paragraph>
              Utilizamos sus datos personales exclusivamente para: <br />
              - Gestionar su inscripción, acceso y desarrollo en los cursos y programas de formación. <br />
              - Emitir facturas, boletas de venta y gestionar el cobro de nuestros servicios. <br />
              - Enviarle notificaciones relacionadas con su cuenta, como certificados, material educativo y comunicaciones administrativas. <br />
              - Atender consultas, quejas y reclamos (incluyendo Libro de Reclamaciones). <br />
              - Envío de publicidad y promociones sobre nuestros cursos, siempre que contemos con su consentimiento previo.
            </Typography>

            <Typography variant="h4">3. Consentimiento y Seguridad</Typography>
            <Typography paragraph>
              Al brindarnos sus datos, usted consiente explícitamente su tratamiento bajo esta política. 
              La Empresa ha adoptado las medidas de seguridad técnicas, legales y organizativas necesarias 
              para salvaguardar la confidencialidad de su información y evitar su alteración, pérdida o acceso no autorizado.
            </Typography>

            <Typography variant="h4">4. Transferencia de Datos</Typography>
            <Typography paragraph>
              Sus datos no serán vendidos, cedidos, ni compartidos con terceros, excepto cuando sea necesario 
              para el cumplimiento de nuestras obligaciones legales o contractuales (como plataformas de pago 
              (Culqi, PayPal, Izipay) o requerimientos de autoridades competentes).
            </Typography>

            <Typography variant="h4">5. Derechos ARCO</Typography>
            <Typography paragraph>
              Usted tiene derecho a <strong>A</strong>cceder, <strong>R</strong>ectificar, <strong>C</strong>ancelar y <strong>O</strong>ponerse 
              al uso de sus datos personales. Para ejercer estos derechos, debe enviar un correo a <strong>grupocorpuscapacitaciones@gmail.com</strong>
              con el asunto &quot;Derechos ARCO&quot;, adjuntando una copia de su DNI.
            </Typography>

            <Typography variant="h4">6. Modificaciones a la Política</Typography>
            <Typography paragraph>
              Nos reservamos el derecho de modificar la presente Política de Privacidad en cualquier momento. 
              Cualquier cambio será publicado oportunamente en esta misma página.
            </Typography>

            <Typography variant="h4">7. Contacto</Typography>
            <Typography paragraph>
              Si tiene dudas adicionales sobre cómo tratamos su información, comuníquese a través de nuestros canales: <br />
              <strong>Correo Electrónico:</strong> grupocorpuscapacitaciones@gmail.com <br />
              <strong>Teléfono:</strong> +51 953 255 751 <br />
            </Typography>

          </Box>
        </Container>
      </Box>

      <Footer />
    </div>
  )
}
