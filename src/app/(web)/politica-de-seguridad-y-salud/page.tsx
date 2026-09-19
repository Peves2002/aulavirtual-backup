import React from 'react'

import { Box, Container, Typography } from '@mui/material'

export const metadata = {
  title: 'Política SG-SST | MS&M CONSULTING',
}

export default function PoliticaDeSeguridadPage() {
  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333' }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--web-dark, #025E44)' }} mb={6} textAlign="center">
          POLÍTICA DEL SISTEMA DE GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO (SG-SST)
        </Typography>

        <Box sx={{ '& h4': { color: 'var(--web-dark, #025E44)', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 3, lineHeight: 1.8, textAlign: 'justify' }, '& li': { mb: 2, lineHeight: 1.8, textAlign: 'justify' } }}>

          <Typography paragraph>
            En <strong>MS & M CONSULTING S.R.L.</strong> con 6 años de experiencia en el mercado brindando los Servicios de Consultoría y Gestión Empresarial promoviendo la formalidad para el cumplimiento Legal de la Normatividad en Seguridad y Salud en el trabajo, Sistema de Gestión de la Calidad, Medioambiental, Intervención Frente al Hostigamiento Sexual, Inspecciones Técnicas de Seguridad en Edificaciones, Monitoreos Ocupacionales, actividades de Auditoría de Sistema de Gestión y diseños eléctricos.
          </Typography>

          <Typography paragraph>
            La Gerencia General con el Objetivo de establecer y mostrar su compromiso en la gestión de Seguridad y Salud en el trabajo ha establecido los siguientes lineamientos:
          </Typography>

          <ul>
            <li>Proporcionar condiciones de trabajo seguros y saludables para prevenir lesiones, enfermedades ocupacionales, accidentes e incidentes laborales a todos los colaboradores de MS&M Consulting y de aquellos que tengan acceso a los lugares de trabajo.</li>
            <li>Cumplir con la normativa de Seguridad y Salud en el Trabajo del Perú aplicable a nuestras actividades, y otras que podamos adaptarnos voluntariamente.</li>
            <li>Garantizar la protección, participación y consulta en los elementos del sistema de gestión de seguridad y salud en el trabajo por parte de los colaboradores y sus representantes.</li>
            <li>Fomentar las condiciones de seguridad, salud e integridad física, mental y social de los trabajadores durante el desarrollo de las labores en el centro de trabajo y en todos aquellos lugares a los que se le comisione un servicio, siendo uno de sus objetivos principales evitar riesgos y accidentes de trabajo, así como enfermedades ocupacionales.</li>
            <li>Propiciar la mejora continua de nuestro desempeño en la prevención de riesgos, implementando un Sistema de Seguridad y Salud en el Trabajo, a través del cual se involucra a todos los trabajadores de la empresa en la identificación continua de los peligros y evaluación de sus riesgos para poder tomar oportunas y eficaces medidas para el control de los mismos.</li>
          </ul>

          <Typography paragraph sx={{ mt: 3 }}>
            La Gerencia General se compromete con la difusión de la Política a las Partes Interesadas pertinentes.
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}
