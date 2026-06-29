import React from 'react'

import { Box, Container, Typography, Divider } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidad | Master Academy',
}

export default function PoliticaDePrivacidadPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #1A1A1A)' }} mb={2} textAlign="center">
          Política de Privacidad
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          Última actualización: Junio de 2026
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #1A1A1A)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

          <Typography paragraph>
            La presente Política de Privacidad describe cómo <strong>Master Academy Grupo de Estudio S.A.C.</strong>,
            con RUC <strong>20611096627</strong>, domiciliada en Manzana D, Lote 43, APV El Manantial, San Martín de Porres, Lima,
            recopila, usa y protege la información personal que usted nos proporciona al utilizar nuestra plataforma educativa.
            Al registrarse o utilizar nuestros servicios, usted acepta los términos aquí descritos, de conformidad con la
            <strong> Ley N° 29733 — Ley de Protección de Datos Personales</strong> del Perú y su reglamento.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4">1. Datos que Recopilamos</Typography>
          <Typography paragraph>
            Al registrarse en nuestra plataforma, podemos recopilar los siguientes datos personales:
          </Typography>
          <Typography paragraph>
            <strong>Datos de identificación:</strong> nombre completo, número de DNI o documento de identidad, dirección de correo electrónico y número de teléfono.
          </Typography>
          <Typography paragraph>
            <strong>Datos de acceso:</strong> dirección IP, tipo de dispositivo, navegador, sistema operativo y registros de actividad dentro de la plataforma.
          </Typography>
          <Typography paragraph>
            <strong>Datos de pago:</strong> no almacenamos información bancaria directamente; los pagos son procesados por pasarelas certificadas (Culqi, IziPay o PayPal), las cuales cuentan con sus propias políticas de seguridad.
          </Typography>

          <Typography variant="h4">2. Finalidad del Tratamiento de Datos</Typography>
          <Typography paragraph>
            Los datos recopilados se utilizan exclusivamente para:
          </Typography>
          <Typography paragraph>
            • Gestionar su cuenta de usuario y acceso al Aula Virtual.<br />
            • Procesar pedidos, inscripciones y emisión de comprobantes de pago.<br />
            • Emitir certificados de participación o aprobación.<br />
            • Enviar comunicaciones relacionadas con los cursos adquiridos, avisos de plataforma y soporte técnico.<br />
            • Cumplir con obligaciones legales y tributarias ante SUNAT y demás organismos reguladores.
          </Typography>

          <Typography variant="h4">3. Uso de Cookies y Tecnologías de Seguimiento</Typography>
          <Typography paragraph>
            Nuestra plataforma utiliza cookies de sesión y cookies de rendimiento para garantizar el correcto funcionamiento
            del Aula Virtual, recordar su sesión iniciada y mejorar la experiencia de navegación. No utilizamos cookies
            de publicidad ni compartimos datos de navegación con redes de anuncios de terceros.
            Puede configurar su navegador para rechazar cookies; sin embargo, esto puede afectar el funcionamiento de algunas
            funcionalidades de la plataforma.
          </Typography>

          <Typography variant="h4">4. Conservación de los Datos</Typography>
          <Typography paragraph>
            Sus datos personales se conservarán durante el tiempo que mantenga una cuenta activa en nuestra plataforma
            y por el período adicional que exijan las obligaciones legales y tributarias aplicables (mínimo 5 años conforme
            a la legislación peruana). Una vez cumplido dicho período, procederemos a eliminar o anonimizar su información.
          </Typography>

          <Typography variant="h4">5. Compartición de Datos con Terceros</Typography>
          <Typography paragraph>
            Master Academy no vende, alquila ni cede su información personal a terceros con fines comerciales.
            Únicamente podemos compartir datos en los siguientes casos:
          </Typography>
          <Typography paragraph>
            • Con pasarelas de pago (Culqi, IziPay, PayPal) para procesar transacciones.<br />
            • Con proveedores de servicios tecnológicos que gestionan la infraestructura de la plataforma, bajo acuerdos de confidencialidad.<br />
            • Cuando sea requerido por autoridades competentes en virtud de una obligación legal o mandato judicial.
          </Typography>

          <Typography variant="h4">6. Derechos del Titular de los Datos (ARCO)</Typography>
          <Typography paragraph>
            De acuerdo con la Ley N° 29733, usted tiene derecho a:
          </Typography>
          <Typography paragraph>
            <strong>Acceso:</strong> conocer qué datos personales suyos tratamos y con qué finalidad.<br />
            <strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.<br />
            <strong>Cancelación:</strong> pedir la eliminación de sus datos cuando ya no sean necesarios para la finalidad con la que fueron recopilados.<br />
            <strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.
          </Typography>
          <Typography paragraph>
            Para ejercer cualquiera de estos derechos, envíe su solicitud a{' '}
            <strong>Informes@mastergrupodeestudio.com</strong> con el asunto <em>&quot;Solicitud ARCO&quot;</em>,
            indicando su nombre completo y el derecho que desea ejercer. Responderemos en un plazo máximo de <strong>20 días hábiles</strong>.
          </Typography>

          <Typography variant="h4">7. Seguridad de la Información</Typography>
          <Typography paragraph>
            Implementamos medidas técnicas y organizativas para proteger su información personal contra accesos no autorizados,
            pérdida, alteración o divulgación indebida. Esto incluye el uso de conexiones cifradas (HTTPS), control de accesos
            por roles y registros de auditoría de actividad en la plataforma.
          </Typography>

          <Typography variant="h4">8. Modificaciones a esta Política</Typography>
          <Typography paragraph>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cuando realizemos
            cambios significativos, notificaremos a los usuarios registrados a través del correo electrónico asociado a su cuenta.
            Le recomendamos revisar esta página periódicamente para estar informado sobre cómo protegemos su información.
          </Typography>

          <Typography variant="h4">9. Contacto</Typography>
          <Typography paragraph>
            Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos en:{' '}
            <strong>Informes@mastergrupodeestudio.com</strong> o por WhatsApp al <strong>+51 973 241 285</strong>.
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
