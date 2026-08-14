import { Box, Grid, Typography } from '@mui/material'

import ArticuloCard, { type ArticuloCardData } from './ArticuloCard'

interface Props {
  articulos: ArticuloCardData[]
}

export default function ArticuloCatalog({ articulos }: Props) {
  if (articulos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 8, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant='h6' color='text.secondary'>
          Próximamente publicaremos nuevos artículos.
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={4}>
      {articulos.map(articulo => (
        <Grid item xs={12} md={6} lg={4} key={articulo.id}>
          <ArticuloCard articulo={articulo} />
        </Grid>
      ))}
    </Grid>
  )
}
