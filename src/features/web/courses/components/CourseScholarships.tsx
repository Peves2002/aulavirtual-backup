'use client'

import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif"

interface Scholarship {
  title: string
  description?: string
  items?: string[]
}

interface CourseScholarshipsProps {
  scholarships?: Scholarship[]
  title?: string
}

const defaultScholarships: Scholarship[] = [
  {
    title: 'Becas OEA y de la Universidad',
    items: ['Beca OEA 30% a 50%', 'Beca Excelencia (30%)', 'Beca de Emprendimiento (20%)', 'Beca Mujer Directiva (20%)']
  },
  {
    title: 'Ayudas al Estudio',
    items: ['Alumni (20%)', 'Empresas Partners (20%)', 'Ayuda por Discapacidad (20%)']
  },
  {
    title: 'Otras becas y ayudas',
    items: ['Agencia Peruana de Cooperación Internacional (APCI)', 'Beca Retorno a Perú (20%)']
  }
]

export default function CourseScholarships({
  title = 'Ayudas y Becas',
  scholarships
}: CourseScholarshipsProps) {
  const data = scholarships && scholarships.length > 0 ? scholarships : defaultScholarships

  return (
    <Box sx={{ my: 8 }}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: '#111111', mb: 5, letterSpacing: '-0.02em' }}>
        {title}
      </Typography>

      <Stack spacing={4}>
        {data.map((scholarship, i) => (
          <Box key={i}>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#d92c2c', mb: 1 }}>
              {scholarship.title}
            </Typography>
            {scholarship.description && (
              <Typography sx={{ fontFamily: FONT, fontSize: '1rem', color: '#475569', lineHeight: 1.6, mb: 1 }}>
                {scholarship.description}
              </Typography>
            )}
            {scholarship.items && scholarship.items.length > 0 && (
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {scholarship.items.map((item, idx) => (
                  <Typography component="li" key={idx} sx={{ fontFamily: FONT, fontSize: '1rem', color: '#475569', lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
