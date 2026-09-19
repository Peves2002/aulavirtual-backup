import React from 'react'

import { Box, Container, Typography, Divider } from '@mui/material'

export const metadata = {
  title: 'Política de Calidad (SGC) | MS&M CONSULTING',
}

export default function PoliticaDeCalidadPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #025E44)' }} mb={6} textAlign="center">
          POLÍTICA DEL SISTEMA DE GESTIÓN DE LA CALIDAD (SGC)
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #025E44)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 3, lineHeight: 1.8, textAlign: 'justify' }, '& li': { mb: 2, lineHeight: 1.8, textAlign: 'justify' } }}>

          <Typography paragraph>
            En <strong>MS & M CONSULTING S.R.L.</strong> con 6 años de experiencia en el mercado brindando los Servicios de Consultoría y Gestión Empresarial promoviendo la formalidad para el cumplimiento Legal de la Normatividad en Seguridad y Salud en el trabajo, Sistema de Gestión de la Calidad, Medioambiental, Intervención Frente al Hostigamiento Sexual, Inspecciones Técnicas de Seguridad en Edificaciones, Monitoreos Ocupacionales, actividades de Auditoría de Sistema de Gestión y diseños eléctricos, según su sector económico, brindando un servicio de Calidad.
          </Typography>

          <Typography paragraph>
            La Gerencia General acuerdan en establecer y mostrar su compromiso en la gestión de los procesos, y ha establecido los siguientes lineamientos:
          </Typography>

          <ul>
            <li>Cumplir con los requisitos del cliente, legales aplicables y los que la organización suscriba relacionados con la calidad del servicio.</li>
            <li>Mejorar el desempeño de nuestros Servicios de Consultorías y Gestión Empresarial.</li>
            <li>Aumentar la Satisfacción del Cliente.</li>
            <li>Atención efectiva de los reclamos y sugerencias.</li>
            <li>Realizar un seguimiento continuo a los objetivos para mejorar la gestión de la empresa.</li>
          </ul>

          <Typography paragraph sx={{ mt: 3 }}>
            La Gerencia General se compromete con la difusión de la Política a las Partes Interesadas pertinentes.
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
