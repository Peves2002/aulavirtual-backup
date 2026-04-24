'use client'

import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material'
import CourseCard from './CourseCard'

interface CourseListProps {
  courses: any[]
  loading?: boolean
  error?: string | null
}

const CourseList = ({ courses, loading, error }: CourseListProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'hsl(var(--accent))' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 5 }}>
        <Alert severity="error" sx={{ borderRadius: '16px' }}>{error}</Alert>
      </Box>
    )
  }

  if (courses.length === 0) {
    return (
      <Box sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 900, mb: 2 }}>
          No se encontraron cursos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Prueba ajustando los filtros o buscando con otras palabras clave.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} lg={4} xl={3}>
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
                nombre: course.profesor.nombre,
                apellido: course.profesor.apellido,
                avatar: course.profesor.avatar,
                slug: course.profesor.slug
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
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CourseList
