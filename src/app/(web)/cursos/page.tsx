// Next Imports
import React from 'react'

import { Box } from '@mui/material'

// Component Imports
import CourseCatalog from '@/features/web/home/components/CourseCatalog'

// Http Client
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import { getAuthSession } from '@/utils/libs/auth-helpers'

// Server Action / Data Fetching
async function getData(token: string | null) {
  try {
    const axiosWebCursos = new AxiosWebCursos({
      getAuthToken: () => token
    })

    const data = await axiosWebCursos.getCatalog()

    // Serialización manual de Decimal a Number para evitar errores en Client Components
    if (data.courses) {
      data.courses = data.courses.map((c: any) => ({
        ...c,
        precio: c.precio ? Number(c.precio) : 0,
        precio_oferta: c.precio_oferta ? Number(c.precio_oferta) : null
      }))
    }

    return data
  } catch (error) {
    console.error('Error fetching data in CursosPage via API:', error)

    return { courses: [], categories: [] }
  }
}

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_URL} | Cursos`,
  description: 'Explora nuestra amplia variedad de cursos y comienza a aprender hoy mismo.'
}

export default async function CursosPage() {
  const session = await getAuthSession()
  const token = session?.user?.accessToken ?? null

  const { courses, categories } = await getData(token)

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 100%), url("/images/cursos.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: 360,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
          py: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(var(--web-light-rgb, 240, 208, 96),0.06)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, right: 80, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <Box sx={{ maxWidth: 1280, mx: 'auto', width: '100%', position: 'relative', zIndex: 1, textAlign: 'left' }}>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              component="a"
              href="/"
              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', '&:hover': { color: 'var(--web-light, #F0D060)' }, transition: 'color 0.2s' }}
            >
              Inicio
            </Box>
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>/</Box>
            <Box component="span" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'var(--web-light, #F0D060)', fontWeight: 600 }}>
              Cursos
            </Box>
          </Box>

          <Box
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 1,
              lineHeight: 1.2,
            }}
            component="h1"
          >
            Cursos para <span style={{ color: 'var(--web-light, #F0D060)' }}>Profesionales del Sector Público</span>
          </Box>
          <Box
            sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', maxWidth: 580, lineHeight: 1.7 }}
            component="p"
          >
            Fortalece tus competencias y capacidades para aprobar tus pruebas de aptitud académica y acceder a nuevos puestos de trabajo. Recupera los conocimientos que necesitas para avanzar con éxito en tu carrera profesional.
          </Box>

          {/* Stats chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            {[
              { label: `${courses.length} cursos disponibles`, icon: '🏛️' },
              { label: `${categories.length} áreas de especialización`, icon: '📋' },
              { label: 'Formación orientada a resultados', icon: '🎓' },
            ].map(chip => (
              <Box
                key={chip.label}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#ffffff',
                  fontWeight: 500,
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <CourseCatalog courses={courses} categories={categories} />
    </Box>
  )
}
