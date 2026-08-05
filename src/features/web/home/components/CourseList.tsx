'use client'

import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material'

import CourseCard from './CourseCard'
import ProgramCardView from './ProgramCardView'

interface CourseListProps {
  courses: any[]
  loading?: boolean
  error?: string | null
  emptySearchMessage?: string
  tipo?: string
}

const CourseList = ({ courses, loading, error, emptySearchMessage = 'No encontramos cursos que coincidan con tu búsqueda.', tipo }: CourseListProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (courses.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>
          {emptySearchMessage}
        </Typography>
        <Typography variant="body1" color="text.disabled" sx={{ mt: 1 }}>
          Prueba con otras palabras clave o categorías.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={6}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
            {tipo === 'CURSO' ? (
              <ProgramCardView
                id={course.id}
                titulo={course.titulo}
                slug={course.slug}
                miniatura={course.miniatura}
                categoria={course.categoria}
                duracion={course.duracion}
              />
            ) : (
              <CourseCard
                id={course.id}
                titulo={course.titulo}
                slug={course.slug}
                descripcion={course.descripcion}
                miniatura={course.miniatura}
                precio={Number(course.precio)}
                moneda={course.moneda}
                es_gratis={course.es_gratis}
                profesor={{
                  nombre: course.profesor?.nombre || 'Profe',
                  apellido: course.profesor?.apellido || 'Prueba',
                  avatar: course.profesor?.avatar
                }}
                categoria={course.categoria}
                nivel={course.nivel}
                tipo_emision={course.tipo_emision}
                fecha_inicio={course.fecha_inicio}
                creado_en={course.creado_en}
                duracion={course.duracion}
                es_comprado={course.es_comprado}
                video_presentacion={course.video_presentacion}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CourseList
