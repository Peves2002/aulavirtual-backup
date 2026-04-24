// Next Imports
import React from 'react'
import { Box } from '@mui/material'

// Component Imports
import CourseCatalog from '@/features/web/cursos/components/CourseCatalog'
import { Navbar } from '@/features/web/landing/components/Navbar'
import { Footer } from '@/features/web/landing/components/Footer'

// Libs
import prisma from '@/utils/libs/prisma'
import { getAuthSession } from '@/utils/libs/auth-helpers'

// Server Action / Data Fetching
async function getData(userId: string | null) {
  try {
    const [courses, categories] = await Promise.all([
      prisma.curso.findMany({
        where: { estado: 'PUBLICADO' },
        include: {
          profesor: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              avatar: true,
              slug: true
            }
          },
          categoria: {
            select: {
              id: true,
              nombre: true,
              slug: true
            }
          },
          inscripciones: userId ? {
            where: { usuario_id: userId }
          } : false
        },
        orderBy: { creado_en: 'desc' }
      }),
      prisma.categoria.findMany({
        where: { esta_activo: true },
        orderBy: { orden: 'asc' }
      })
    ])

    // Serialización y flag de compra
    const serializedCourses = courses.map((c: any) => ({
      ...c,
      precio: Number(c.precio),
      precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null,
      es_comprado: userId ? c.inscripciones.length > 0 : false
    }))

    return { courses: serializedCourses, categories }
  } catch (error) {
    console.error('Error fetching data for CursosPage:', error)
    return { courses: [], categories: [] }
  }
}

export const metadata = {
  title: 'Catálogo de Cursos - Elite BIM Vision',
  description: 'Domina las herramientas y metodologías BIM de vanguardia con nuestros cursos certificados.'
}

import { FloatingCartButton } from '@/features/web/cart/components/FloatingCartButton'

export default async function CursosPage() {
  const session = await getAuthSession()
  const userId = session?.user?.id ?? null

  const { courses, categories } = await getData(userId)

  return (
    <div className="min-h-screen bg-background elite-landing">
      <Navbar />
      <Box
        sx={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #1a2e3d 100%)',
          pt: { xs: 20, md: 28 },
          pb: { xs: 12, md: 20 },
          px: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(224, 123, 57, 0.1)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <Box sx={{ maxWidth: 1280, mx: 'auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
            <Box
              component="a"
              href="/"
              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', '&:hover': { color: 'hsl(var(--accent))' }, transition: 'color 0.2s' }}
            >
              Inicio
            </Box>
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</Box>
            <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'hsl(var(--accent))', fontWeight: 600 }}>
              Cursos
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              mb: 3,
              lineHeight: 1,
            }}
            component="h1"
          >
            Academia de <span className="text-gradient-orange">Élite</span>
          </Box>
          <Box
            sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: 700, lineHeight: 1.6 }}
            component="p"
          >
            Nuestros programas están diseñados para ingenieros que no se conforman con lo convencional. 
            Especialízate en BIM, VR y las tecnologías que están construyendo el futuro.
          </Box>
        </Box>
      </Box>

      <CourseCatalog courses={courses} categories={categories} />
      <Footer />
      <FloatingCartButton />
    </div>
  )
}
