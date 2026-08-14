import { Box, Grid, Typography } from '@mui/material'

import ArticuloCard, { type ArticuloCardData } from './ArticuloCard'

interface Props {
  articulos: ArticuloCardData[]
}

export default function ArticulosRelacionados({ articulos }: Props) {
  if (articulos.length === 0) return null

  return (
    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant='h5' component='h2' fontWeight='bold' sx={{ mb: 3 }}>
        Artículos relacionados
      </Typography>
      <Grid container spacing={3}>
        {articulos.map(articulo => (
          <Grid item xs={12} sm={6} md={4} key={articulo.id}>
            <ArticuloCard articulo={articulo} compact />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
