import Link from 'next/link'
import { Box, Typography, Button } from '@mui/material'

export const metadata = {
  title: 'Acceso Denegado | Aula Virtual'
}

export default function UnauthorizedPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, textAlign: 'center' }}>
      <Typography variant='h1' sx={{ fontWeight: 800, color: 'error.main', fontSize: { xs: '4rem', md: '6rem' } }}>
        403
      </Typography>
      <Typography variant='h4' sx={{ mb: 2, fontWeight: 600 }}>
        Acceso Denegado
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 500 }}>
        No tienes los permisos necesarios para acceder a esta página del panel administrativo. Si crees que esto es un error, contacta con el administrador.
      </Typography>
      <Button variant='contained' component={Link} href='/dashboard' sx={{ px: 4, py: 1.5 }}>
        Volver al Inicio
      </Button>
    </Box>
  )
}
