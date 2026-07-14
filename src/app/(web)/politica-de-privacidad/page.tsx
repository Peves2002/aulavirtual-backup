import React from 'react'

import { Box, Container, Typography, Divider, Grid } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidad | ACE Consulting PERÚ',
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
            En <strong>ACE Consulting PERÚ</strong> (&quot;Nosotros&quot;, &quot;ACE&quot;), valoramos profundamente tu privacidad y la seguridad de tu información personal.
            Esta Política de Privacidad explica de manera transparente cómo recopilamos, usamos, almacenamos y protegemos tus datos de acuerdo con la
            <strong> Ley N° 29733 — Ley de Protección de Datos Personales del Perú</strong> y su Reglamento.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4">1. Introducción</Typography>
          <Typography paragraph>
            ACE Consulting PERÚ, representada por Manuel Nieto Courrejolles (DNI 07771730), con domicilio en Calle Lino Alarco 212, Miraflores, Lima, Perú,
            se compromete a proteger la privacidad de nuestros clientes y usuarios de la Academia Virtual. Al utilizar nuestro sitio web o registrarte en nuestros servicios,
            aceptas de conformidad las prácticas descritas en este documento.
          </Typography>

          <Typography variant="h4">2. ¿Qué información recopilamos?</Typography>
          <Typography paragraph>
            Recopilamos datos que nos proporcionas directamente al registrarte o interactuar con nuestra plataforma, así como datos generados por navegación:
          </Typography>
          <Typography paragraph>
            <strong>Información proporcionada directamente:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2, lineHeight: 1.8 }}>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono o celular</li>
            <li>DNI, RUC o documento de identidad (para la emisión de facturas y certificados)</li>
            <li>Nombre de tu empresa o cargo (opcional, para capacitaciones corporativas)</li>
          </Box>
          <Typography paragraph>
            <strong>Información recopilada automáticamente:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2, lineHeight: 1.8 }}>
            <li>Dirección IP de conexión</li>
            <li>Tipo de navegador y dispositivo utilizado</li>
            <li>Páginas visitadas dentro del Aula Virtual y tiempos de permanencia</li>
            <li>Cookies técnicas esenciales para mantener activa tu sesión en la plataforma</li>
          </Box>

          <Typography variant="h4">3. ¿Para qué utilizamos tu información?</Typography>
          <Typography paragraph>
            Tratamos tus datos personales bajo fines estrictamente legítimos y necesarios para la prestación de los servicios adquiridos:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2, lineHeight: 1.8 }}>
            <li><strong>Gestión académica:</strong> Habilitación de accesos al Aula Virtual, cursos, exámenes y eBooks.</li>
            <li><strong>Certificaciones:</strong> Emisión de los certificados de aprobación del curso correspondiente una vez cumplidos los requisitos.</li>
            <li><strong>Facturación y cobros:</strong> Procesamiento de transacciones a través de pasarelas seguras e informes contables internos.</li>
            <li><strong>Soporte al cliente:</strong> Responder dudas técnicas, consultas comerciales y gestionar el Libro de Reclamaciones.</li>
            <li><strong>Comunicaciones:</strong> Avisos de actualizaciones en el Aula Virtual, boletines formativos o promocionales (solo con tu consentimiento previo).</li>
          </Box>

          <Typography variant="h4">4. Seguridad y Protección de Datos</Typography>
          <Typography paragraph>
            Implementamos medidas de seguridad técnicas, organizativas y de cifrado lógico para evitar la pérdida, alteración o el acceso no autorizado de tu información personal.
            Nuestra plataforma cuenta con certificado SSL seguro (HTTPS) y las pasarelas de pago externas (Culqi, Izipay y PayPal) cumplen con los estándares mundiales PCI-DSS para el procesamiento de transacciones financieras.
          </Typography>

          <Typography variant="h4">5. Derechos del Usuario (ARCO)</Typography>
          <Typography paragraph>
            Conforme a la Ley N° 29733, tienes derecho a ejercer el control sobre tus datos personales. Estos se conocen como Derechos ARCO:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2, borderLeft: '4px solid var(--web-primary, #25927F)' }}>
                <Typography variant="subtitle2" fontWeight="bold">Acceso y Rectificación</Typography>
                <Typography variant="caption" color="text.secondary">Puedes solicitar conocer qué datos poseemos y corregir cualquier información desactualizada o inexacta.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2, borderLeft: '4px solid var(--web-primary, #25927F)' }}>
                <Typography variant="subtitle2" fontWeight="bold">Cancelación y Oposición</Typography>
                <Typography variant="caption" color="text.secondary">Tienes la facultad de exigir la eliminación de tu cuenta e información personal, o bien oponerte a ciertos tratamientos.</Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography paragraph>
            Para ejercer tus derechos ARCO, puedes enviarnos una solicitud formal al correo <strong>aceconsultingperu@gmail.com</strong> indicando como asunto &quot;Derechos ARCO&quot;, detallando tu requerimiento e incluyendo tu identificación (DNI o similar). Responderemos en el plazo máximo establecido por ley.
          </Typography>

          <Typography variant="h4">6. Compartición con Terceros</Typography>
          <Typography paragraph>
            ACE Consulting PERÚ no vende, comercializa ni cede bases de datos de usuarios a terceros con fines publicitarios.
            Tus datos únicamente se comunicarán a proveedores externos estrictamente asociados al funcionamiento del servicio (tales como servidores de hosting, procesadores de pago y sistemas de email transaccional) bajo estrictos contratos de confidencialidad y procesamiento seguro de datos personales.
          </Typography>

          <Typography variant="h4">7. Contacto e Información</Typography>
          <Typography paragraph>
            Si tienes dudas o consultas adicionales sobre la administración de tu privacidad, por favor contáctanos:
          </Typography>
          <Box sx={{ bgcolor: '#f4f6f8', p: 3, borderRadius: 2, border: '1px solid #e0e0e0', mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" color="var(--web-dark, #025E44)">ACE Consulting PERÚ</Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1, '& span': { display: 'block', mb: 0.5 } }}>
              <span><strong>Representante:</strong> Manuel Nieto Courrejolles</span>
              <span><strong>Domicilio:</strong> Calle Lino Alarco 212, Miraflores, Lima, Perú</span>
              <span><strong>Correo de Contacto:</strong> aceconsultingperu@gmail.com</span>
              <span><strong>Teléfono / WhatsApp:</strong> +51 920 184 072</span>
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  )
}
