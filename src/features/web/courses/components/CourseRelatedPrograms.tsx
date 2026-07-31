'use client'

import React from 'react'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from '@mui/material'

const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif"

interface Program {
  title: string
  category: string
  description: string
  image: string
}

interface CourseRelatedProgramsProps {
  title?: string
  programs?: Program[]
}

const defaultPrograms: Program[] = [
  {
    title: 'Executive MBA',
    category: 'MBAs',
    description: 'El Executive MBA impulsa tu desarrollo profesional en una empresa...',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Global MBA',
    category: 'MBAs',
    description: 'Un challenge en mercados internacionales con visión global...',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'International MBA',
    category: 'MBAs',
    description: 'Un MBA con visión internacional y con residencial Boston...',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

export default function CourseRelatedPrograms({
  title = 'Programas relacionados',
  programs = defaultPrograms
}: CourseRelatedProgramsProps) {
  if (!programs || programs.length === 0) return null

  return (
    <Box sx={{ mt: 10, bgcolor: '#222222', py: 8 }}>
      <Container maxWidth={false} sx={{ px: { xs: 3, md: 8, lg: 12 } }}>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: '#ffffff', mb: 5, letterSpacing: '-0.02em' }}>
          {title}
        </Typography>

        <Grid container spacing={3}>
          {programs.map((program, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: '100%', borderRadius: 0, border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={program.image}
                  alt={program.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, pb: '32px !important' }}>
                  <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#111111', mb: 0.5 }}>
                    {program.title}
                  </Typography>
                  <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '0.85rem', color: '#a0a0a0', mb: 2 }}>
                    {program.category}
                  </Typography>
                  <Typography sx={{ fontFamily: FONT, fontSize: '0.9rem', color: '#777777', lineHeight: 1.5 }}>
                    {program.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
