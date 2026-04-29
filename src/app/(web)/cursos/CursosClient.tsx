'use client'

import React, { useState } from 'react'
import { Box, Tabs, Tab, Container } from '@mui/material'

// Component Imports
import CourseCatalog from '@/features/web/home/components/CourseCatalog'
import EbookCatalog from '@/features/web/ebooks/components/EbookCatalog'

interface CursosClientProps {
  initialCourses: any[]
  initialCategories: any[]
}

export default function CursosClient({ initialCourses, initialCategories }: CursosClientProps) {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          py: { xs: 5, md: 7 },
          px: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.06)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <Box sx={{ maxWidth: 1280, mx: 'auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              component="a"
              href="/"
              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', '&:hover': { color: 'var(--web-light, #BDD962)' }, transition: 'color 0.2s' }}
            >
              Inicio
            </Box>
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</Box>
            <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>
              {tabValue === 0 ? 'Cursos' : 'Ebooks'}
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 1,
              lineHeight: 1.2,
            }}
            component="h1"
          >
            {tabValue === 0 ? 'Catálogo de Cursos' : 'Tienda de Ebooks'}
          </Box>
          <Box
            sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.6 }}
            component="p"
          >
            {tabValue === 0 
              ? 'Explora nuestra selección de cursos y comienza a aprender hoy.' 
              : 'Descubre nuestros libros digitales especializados en el sector turismo.'}
          </Box>

          {/* Tab Selection */}
          <Box sx={{ mt: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--web-light, #BDD962)',
                  height: 3
                },
                '& .MuiTab-root': {
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: '#ffffff'
                  }
                }
              }}
            >
              <Tab label="Cursos" />
              <Tab label="Ebooks" />
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* Content based on Tab */}
      {tabValue === 0 ? (
        <CourseCatalog courses={initialCourses} categories={initialCategories} />
      ) : (
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
          <EbookCatalog />
        </Container>
      )}
    </Box>
  )
}
