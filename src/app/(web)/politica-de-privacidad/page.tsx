import React from 'react'

import { Box, Container, Typography, Divider } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidad | Grupo Ollarves',
  description: 'Conoce cómo GRUPO OLLARVES E.I.R.L. recopila, usa y protege tus datos personales.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #025E44)' }} mb={2} textAlign="center">
          Política de Privacidad
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          Última actualización: Junio de 2026
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #025E44)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>

          <Typography paragraph>
            <strong>GRUPO OLLARVES E.I.R.L.</strong>, con RUC <strong>20608467298</strong>, domiciliada en
            Octavio Muñoz Najar 128 - Segundo Piso, Arequipa, Perú (en adelante, &quot;Grupo Ollarves&quot;),
            es responsable del tratamiento de los datos personales que usted nos proporciona a través
            de nuestra plataforma de Aula Virtual y sitio web.
          </Typography>
          <Typography paragraph>
            La presente Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos
            su información personal, en cumplimiento de la <strong>Ley N° 29733 — Ley de Protección de Datos Personales</strong>{' '}
            y su reglamento (D.S. N° 003-2013-JUS).
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4">1. Datos que Recopilamos</Typography>
          <Typography paragraph>
            Al registrarse y utilizar nuestra plataforma, podemos recopilar los siguientes datos:
          </Typography>
          <Typography paragraph>
            <strong>a) Datos de identificación:</strong> nombre completo, número de documento (DNI/CE), correo electrónico, número de teléfono o celular.
          </Typography>
          <Typography paragraph>
            <strong>b) Datos de pago:</strong> información de la transacción procesada por la pasarela de pago (Culqi o PayPal). No almacenamos datos de tarjetas bancarias.
          </Typography>
          <Typography paragraph>
            <strong>c) Datos de uso:</strong> progreso de cursos, lecciones visualizadas, resultados de evaluaciones, certificados emitidos y actividad dentro de la plataforma.
          </Typography>
          <Typography paragraph>
            <strong>d) Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo y cookies de sesión, necesarios para el correcto funcionamiento del servicio.
          </Typography>

          <Typography variant="h4">2. Finalidad del Tratamiento</Typography>
          <Typography paragraph>
            Los datos recopilados se utilizan exclusivamente para:
          </Typography>
          <Typography paragraph>
            — Gestionar su cuenta y acceso a los cursos adquiridos.<br />
            — Procesar pagos y emitir comprobantes.<br />
            — Emitir certificados de finalización.<br />
            — Enviar comunicaciones relacionadas con sus cursos (notificaciones, recordatorios, actualizaciones).<br />
            — Cumplir con obligaciones legales y tributarias aplicables en el Perú.<br />
            — Mejorar nuestros servicios y experiencia de usuario.
          </Typography>

          <Typography variant="h4">3. Compartición de Datos</Typography>
          <Typography paragraph>
            Grupo Ollarves <strong>no vende, alquila ni cede</strong> sus datos personales a terceros con fines comerciales.
            Solo compartimos datos con terceros en los siguientes casos:
          </Typography>
          <Typography paragraph>
            — Con procesadores de pago (Culqi, PayPal) exclusivamente para completar transacciones.<br />
            — Con proveedores de servicios tecnológicos que prestan soporte a la plataforma, bajo acuerdos de confidencialidad.<br />
            — Cuando sea requerido por autoridades competentes conforme a la ley peruana.
          </Typography>

          <Typography variant="h4">4. Cookies</Typography>
          <Typography paragraph>
            Utilizamos cookies propias necesarias para mantener su sesión activa y garantizar el funcionamiento
            de la plataforma. Al usar nuestro sitio, usted acepta el uso de estas cookies. Puede configurar
            su navegador para rechazarlas, aunque esto puede afectar la funcionalidad del servicio.
          </Typography>

          <Typography variant="h4">5. Seguridad de los Datos</Typography>
          <Typography paragraph>
            Implementamos medidas técnicas y organizativas para proteger sus datos contra acceso no autorizado,
            pérdida, alteración o divulgación. Las comunicaciones entre su navegador y nuestros servidores
            se realizan mediante protocolo HTTPS con cifrado SSL.
          </Typography>

          <Typography variant="h4">6. Derechos del Titular</Typography>
          <Typography paragraph>
            Conforme a la Ley N° 29733, usted tiene derecho a <strong>acceder, rectificar, cancelar y oponerse</strong>{' '}
            al tratamiento de sus datos personales (derechos ARCO). Para ejercerlos, envíe su solicitud a:
          </Typography>
          <Typography paragraph>
            <strong>Correo:</strong> ollarvescapacitaciones@gmail.com<br />
            <strong>WhatsApp:</strong> +51 944 270 957<br />
            <strong>Dirección:</strong> Octavio Muñoz Najar 128 - Segundo Piso, Arequipa, Perú
          </Typography>
          <Typography paragraph>
            Atenderemos su solicitud en un plazo máximo de <strong>20 días hábiles</strong>.
          </Typography>

          <Typography variant="h4">7. Retención de Datos</Typography>
          <Typography paragraph>
            Conservamos sus datos personales mientras mantenga una cuenta activa en nuestra plataforma
            o sea necesario para cumplir con obligaciones legales y tributarias. Al eliminar su cuenta,
            procederemos a suprimir sus datos en un plazo máximo de 30 días, salvo obligación legal en contrario.
          </Typography>

          <Typography variant="h4">8. Modificaciones a esta Política</Typography>
          <Typography paragraph>
            Grupo Ollarves se reserva el derecho de actualizar esta Política de Privacidad. Cualquier
            cambio relevante será notificado a través de nuestra plataforma o por correo electrónico.
            El uso continuado del servicio tras la publicación de cambios implica su aceptación.
          </Typography>

          <Typography variant="h4">9. Contacto</Typography>
          <Typography paragraph>
            Para cualquier consulta relacionada con el tratamiento de sus datos personales:
          </Typography>
          <Typography paragraph>
            <strong>GRUPO OLLARVES E.I.R.L.</strong><br />
            RUC: 20608467298<br />
            Octavio Muñoz Najar 128 - Segundo Piso, Arequipa, Perú<br />
            Correo: ollarvescapacitaciones@gmail.com<br />
            WhatsApp: +51 944 270 957
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
