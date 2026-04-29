'use client'

import { useState } from 'react'
import { Box, Grid, Typography, Button, Rating, Card, CardMedia, Modal, IconButton, Stack, Divider, Chip } from '@mui/material'
import { ShoppingCart, Eye, X, BookOpen, Calendar, FileText, User, Star } from 'lucide-react'
import ScrollReveal from '@/features/web/home/components/ScrollReveal'

import libro from '@/utils/assets/ebok/libro.webp'

// Mock Data
const ebooks = [
  {
    id: '1',
    titulo: 'Los primeros 90 días',
    autor: 'Michael D. Watkins',
    portada: libro.src,
    precio: 49.90,
    formato: 'Digital (PDF / ePUB)',
    anio: 2023,
    paginas: 280,
    resena: 'Este libro es una guía esencial para líderes en transición. Watkins ofrece estrategias probadas para navegar los retos de los primeros meses en un nuevo rol, asegurando un impacto positivo y sostenible en la organización.',
    indice: [
      '1. Prepárese usted mismo',
      '2. Acelere su aprendizaje',
      '3. Ajuste la estrategia a la situación',
      '4. Negocie el éxito',
      '5. Logre victorias tempranas',
    ],
    valoracion: 4.8,
    comentarios: [
      { usuario: 'Juan P.', estrellas: 5, comentario: 'Excelente guía, muy práctica.' },
      { usuario: 'Maria L.', estrellas: 4, comentario: 'Muy útil para mi nuevo cargo.' }
    ]
  },
  {
    id: '2',
    titulo: 'Marketing Turístico 4.0',
    autor: 'CEPAV Ediciones',
    portada: libro.src,
    precio: 35.00,
    formato: 'Digital (PDF)',
    anio: 2024,
    paginas: 150,
    resena: 'Descubre las últimas tendencias en marketing digital aplicadas específicamente al sector turismo. Aprende a conectar con el viajero moderno y optimizar tus canales de venta.',
    indice: [
      '1. El nuevo ecosistema digital',
      '2. El viaje del cliente (Customer Journey)',
      '3. Estrategias de contenido',
      '4. Publicidad en redes sociales',
      '5. Automatización de ventas',
    ],
    valoracion: 4.5,
    comentarios: [
      { usuario: 'Roberto T.', estrellas: 5, comentario: 'Información muy actualizada.' }
    ]
  }
]

export default function EbookCatalog() {
  const [selectedEbook, setSelectedEbook] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDetail = (ebook: any) => {
    setSelectedEbook(ebook)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>
        {ebooks.map((ebook) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={ebook.id}>
            <ScrollReveal direction="up">
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover .hover-overlay': { opacity: 1 },
                  '&:hover .book-cover': { transform: 'scale(1.05)' },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                {/* Portada */}
                <Box
                  className="book-cover"
                  component="img"
                  src={ebook.portada}
                  alt={ebook.titulo}
                  sx={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Overlay al pasar el cursor */}
                <Box
                  className="hover-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(2, 94, 68, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    backdropFilter: 'blur(4px)',
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    {ebook.titulo}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart size={18} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      const WHATSAPP_NUMBER = '51906741327';
                      const message = `Hola, me interesa comprar el ebook: ${ebook.titulo}`;
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    sx={{
                      bgcolor: 'var(--web-light, #BDD962)',
                      color: 'var(--web-dark, #025E44)',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#acc55a' }
                    }}
                  >
                    Comprar - S/ {ebook.precio.toFixed(2)}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Eye size={18} />}
                    onClick={() => handleOpenDetail(ebook)}
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#fff' }
                    }}
                  >
                    Ver detalle
                  </Button>
                </Box>
              </Box>
            </ScrollReveal>
          </Grid>
        ))}
      </Grid>

      {/* Modal de Detalle */}
      <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box sx={{ 
          bgcolor: '#fff', 
          borderRadius: '24px', 
          width: '100%', 
          maxWidth: '1000px', 
          maxHeight: '90vh', 
          overflowY: 'auto', 
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          {/* Close Button */}
          <IconButton 
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, bgcolor: '#f1f5f9' }}
          >
            <X size={20} />
          </IconButton>

          {selectedEbook && (
            <Grid container>
              {/* Columna Izquierda: Imagen y CTA */}
              <Grid item xs={12} md={4} sx={{ p: 4, bgcolor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
                <Box 
                  component="img" 
                  src={selectedEbook.portada} 
                  sx={{ 
                    width: '100%', 
                    borderRadius: '12px', 
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    mb: 4
                  }} 
                />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--web-dark, #025E44)', mb: 1 }}>
                    S/ {selectedEbook.precio.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCart />}
                    onClick={() => {
                      const WHATSAPP_NUMBER = '51906741327';
                      const message = `Hola, me interesa comprar el ebook: ${selectedEbook.titulo}`;
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    sx={{ 
                      py: 2, 
                      borderRadius: '12px', 
                      bgcolor: 'var(--web-primary, #25927F)',
                      fontWeight: 700,
                      mb: 2
                    }}
                  >
                    Comprar ahora
                  </Button>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    * Entrega inmediata por correo electrónico
                  </Typography>
                </Box>
              </Grid>

              {/* Columna Derecha: Información */}
              <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, lineHeight: 1.2 }}>
                      {selectedEbook.titulo}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="subtitle1" sx={{ color: 'var(--web-primary, #25927F)', fontWeight: 600 }}>
                        {selectedEbook.autor}
                      </Typography>
                      <Divider orientation="vertical" flexItem sx={{ height: 16, alignSelf: 'center' }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={selectedEbook.valoracion} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedEbook.valoracion}</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Atributos */}
                  <Grid container spacing={2}>
                    {[
                      { icon: BookOpen, label: 'Formato', value: selectedEbook.formato },
                      { icon: Calendar, label: 'Año', value: selectedEbook.anio },
                      { icon: FileText, label: 'Páginas', value: selectedEbook.paginas },
                    ].map((attr, i) => (
                      <Grid item xs={4} key={i}>
                        <Box sx={{ textAlign: 'center', p: 2, borderRadius: '12px', bgcolor: '#f8fafc' }}>
                          <attr.icon size={20} color="#64748b" style={{ marginBottom: 4 }} />
                          <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 500 }}>{attr.label}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{attr.value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider />

                  {/* Reseña */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>Reseña del libro</Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                      {selectedEbook.resena}
                    </Typography>
                  </Box>

                  {/* Índice */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>Índice de contenidos</Typography>
                    <Stack spacing={1}>
                      {selectedEbook.indice.map((item: string, i: number) => (
                        <Box key={i} sx={{ display: 'flex', gap: 1.5, p: 1.5, borderRadius: '8px', border: '1px dashed #e2e8f0' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--web-primary, #25927F)' }}>{i + 1}.</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{item}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Divider />

                  {/* Valoraciones */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Valoraciones y Comentarios</Typography>
                    <Stack spacing={2}>
                      {selectedEbook.comentarios.map((c: any, i: number) => (
                        <Box key={i} sx={{ p: 2, borderRadius: '12px', bgcolor: '#f8fafc' }}>
                          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'var(--web-primary, #25927F)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                                {c.usuario[0]}
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.usuario}</Typography>
                            </Stack>
                            <Rating value={c.estrellas} size="small" readOnly />
                          </Stack>
                          <Typography variant="body2" sx={{ color: '#64748b' }}>{c.comentario}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
