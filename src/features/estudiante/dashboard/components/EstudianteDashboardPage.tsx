'use client'

import { useSession } from 'next-auth/react'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import CampusWelcome from '@/features/estudiante/campus/components/CampusWelcome'
import CampusAvanceGeneral from '@/features/estudiante/campus/components/CampusAvanceGeneral'
import CampusMisProgramas from '@/features/estudiante/campus/components/CampusMisProgramas'
import CampusProgramasRecomendados from '@/features/estudiante/campus/components/CampusProgramasRecomendados'
import CampusRecursosNovedades from '@/features/estudiante/campus/components/CampusRecursosNovedades'
import { AxiosDashboard } from '@/features/estudiante/dashboard/http/axiosDashboard'
import type { DashboardData } from '@/features/estudiante/dashboard/entity/Dashboard'

interface Props {
  initialData?: DashboardData
  nombreUsuario?: string
}

export default function EstudianteDashboardPage({ initialData, nombreUsuario }: Props) {
  const { data: session } = useSession()

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['estudiante-dashboard'],
    queryFn: async () => {
      const token = session?.user?.accessToken ?? null
      const client = new AxiosDashboard({ getAuthToken: () => token })

      return client.getDashboard()
    },
    initialData,
    staleTime: 60_000,
  })

  const nombre =
    nombreUsuario ??
    (session?.user as { nombre?: string })?.nombre ??
    session?.user?.name ??
    'Participante'

  const kpis = data?.kpis
  const misProgramas = data?.misProgramas ?? data?.cursosRecientes ?? []
  const programasRecomendados = data?.programasRecomendados ?? []
  const recursosNovedades = data?.recursosNovedades ?? []

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        maxWidth: 960,
        mx: 'auto',
      }}
    >
      <CampusWelcome nombre={nombre} loading={isLoading && !data} />
      <CampusAvanceGeneral kpis={kpis} loading={isLoading && !data} />
      <CampusMisProgramas programas={misProgramas} loading={isLoading && !data} />
      {!isLoading && programasRecomendados.length > 0 ? (
        <CampusProgramasRecomendados programas={programasRecomendados} />
      ) : null}
      <CampusRecursosNovedades items={recursosNovedades} />
    </Box>
  )
}
