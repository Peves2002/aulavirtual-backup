import React from 'react'

import { redirect } from 'next/navigation'

import { Container, Typography, Box, Stack, Button } from '@mui/material'

import { getAuthSession } from '@/utils/libs/auth-helpers'
import MyCoursesList from '@/features/estudiante/mis-cursos/components/MyCoursesList'
import { AxiosMisCursos } from '@/features/estudiante/mis-cursos/http/axiosMisCursos'

export default async function MyCoursesPage() {
    const session = await getAuthSession()

    if (!session) {
        redirect('/campus?auth=login')
    }

    const token = session.user?.accessToken ?? null

    const axiosMisCursos = new AxiosMisCursos({
        getAuthToken: () => token
    })

    let courses: any[] = []

    try {
        courses = await axiosMisCursos.getAll()
    } catch (error) {
        console.error('Error fetching inscribed courses via API:', error)
    }

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
                <Stack spacing={{ xs: 3, md: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', fontFamily: 'Poppins, sans-serif' }}>
                                Mis <span style={{ color: 'var(--mui-palette-primary-main)' }}>Programas</span>
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>
                                Todos tus programas inscritos en el Campus Digital Azul.
                            </Typography>
                        </Box>
                        <Button variant='contained' color='primary' size='medium' sx={{ borderRadius: '10px', fontFamily: 'Poppins, sans-serif', textTransform: 'none' }} startIcon={<i className='tabler-search' />} href='/cursos'>
                            Explorar capacitaciones
                        </Button>
                    </Box>{/*  */}

                    <MyCoursesList courses={courses} />
                </Stack>
            </Container>
        </Box>
    )
}
