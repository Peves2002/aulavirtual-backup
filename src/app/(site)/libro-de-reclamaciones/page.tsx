import { Box, Container, Typography, Divider, Button } from '@mui/material'

import { Navbar } from '@/marketing/components/site/Navbar'
import { Footer } from '@/marketing/components/site/Footer'

export const metadata = {
  title: 'Libro de Reclamaciones | Grupo Corpus'
}

export default function LibroDeReclamacionesPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans">
      <Navbar />

      <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 10 }, color: '#333', flexGrow: 1 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} sx={{ color: '#0c1938' }} mb={2} textAlign="center">
            Libro de Reclamaciones
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571)
          </Typography>

          <Box sx={{ '& h4': { color: '#0c1938', fontWeight: 800, mt: 5, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8 } }}>
            <Box 
              sx={{ 
                p: 3, 
                bgcolor: '#f8f9fa', 
                borderRadius: 2, 
                border: '1px solid #e9ecef',
                mb: 5
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#0c1938', mb: 1 }}>
                Datos del Proveedor
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                <strong>Razón Social:</strong> GRUPO CORPUS <br />
                <strong>RUC:</strong> 80338132 <br />
                <strong>Dirección:</strong> LIMA-LIMA-LOS OLIVOS - AV. ZARAGOZA MZ B LT.22 <br />
                <strong>Correo:</strong> grupocorpuscapacitaciones@gmail.com <br />
                <strong>Teléfono:</strong> +51 953 255 751
              </Typography>
            </Box>

            <Typography paragraph>
              Estimado cliente, ponemos a su disposición nuestro Libro de Reclamaciones Virtual. 
              Usted puede presentar un reclamo o una queja, de acuerdo con la siguiente clasificación:
            </Typography>

            <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>
                <strong>Reclamo:</strong> Disconformidad relacionada con los productos o servicios adquiridos.
              </li>
              <li>
                <strong>Queja:</strong> Disconformidad no relacionada a los productos o servicios, o malestar 
                o descontento respecto a la atención al público.
              </li>
            </ul>

            <Typography paragraph>
              El proceso de atención a sus reclamos o quejas será respondido al correo electrónico 
              proporcionado en un plazo máximo de treinta (30) días calendario, conforme a la normativa vigente.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Box textAlign="center" sx={{ mt: 5 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#0c1938', mb: 3 }}>
                Para registrar su reclamo o queja, por favor escríbanos detallando su caso:
              </Typography>
              <Button 
                variant="contained" 
                href="mailto:grupocorpuscapacitaciones@gmail.com?subject=Libro%20de%20Reclamaciones"
                sx={{ 
                  bgcolor: '#cca353', 
                  color: '#fff', 
                  px: 4, 
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#b38a42'
                  }
                }}
              >
                Enviar correo de Reclamo / Queja
              </Button>
            </Box>

          </Box>
        </Container>
      </Box>

      <Footer />
    </div>
  )
}
