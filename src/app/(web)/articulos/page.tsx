'use client'

import { useEffect, useState } from 'react'

import { Card, CardContent, Typography, Button, Container, Grid, Box, CircularProgress } from '@mui/material'
import { Newspaper, FileDown, ExternalLink } from 'lucide-react'

interface Articulo {
  id: string
  titulo: string
  descripcion: string | null
  imagen_portada: string | null
  archivo_pdf: string
  creado_en: string
}

export default function ArticulosWebPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const res = await fetch('/api/articulos')
        const json = await res.json()

        if (json.status) {
          setArticulos(json.result)
        }
      } catch (error) {
        console.error('Error fetching articulos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArticulos()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', p: 2, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', mb: 2 }}>
            <Newspaper size={32} />
          </Box>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom color="primary.main">
            Artículos y Noticias
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explora nuestra colección de artículos, documentos y novedades.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress size={48} />
          </Box>
        ) : articulos.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 8, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" color="text.secondary">
              Próximamente publicaremos nuevos artículos.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {articulos.map((articulo) => (
              <Grid item xs={12} md={6} lg={4} key={articulo.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  {articulo.imagen_portada && (
                    <Box 
                      sx={{ 
                        height: 200, 
                        backgroundImage: `url(${articulo.imagen_portada})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }} 
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography variant="overline" color="primary.main" fontWeight="bold">
                      {new Date(articulo.creado_en).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                    <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mt: 1, mb: 2, lineHeight: 1.3 }}>
                      {articulo.titulo}
                    </Typography>
                    {articulo.descripcion && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {articulo.descripcion}
                      </Typography>
                    )}
                    <Box sx={{ mt: 'auto', pt: 2, display: 'flex', gap: 2 }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        startIcon={<ExternalLink size={18} />}
                        href={articulo.archivo_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: 2 }}
                      >
                        Leer PDF
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        href={articulo.archivo_pdf}
                        download
                        sx={{ minWidth: 'auto', p: 1.5, borderRadius: 2 }}
                        title="Descargar"
                      >
                        <FileDown size={20} />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  )
}
