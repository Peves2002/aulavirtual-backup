'use client'

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import type { Receta } from '../entity/Receta'
import type { CrearRecetaDto, ActualizarRecetaDto } from '@/schemas/receta.schema'
import { AxiosReceta } from '../http/axiosReceta'

const QUERY_KEY = { RECETAS: ['recetas'] }

const axiosRecetaFactory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosReceta({ getAuthToken })
}

export function useRecetas(query?: Record<string, any>, initialData?: Receta[], initialTotal?: number) {
  const axiosReceta = axiosRecetaFactory()

  const isInitialQuery = !query || (
    (query.page === '1' || !query.page) &&
    (query.limit === '10' || !query.limit) &&
    (!query.buscar || query.buscar === '') &&
    (query.esta_activo === undefined)
  )

  return useQuery<{ recetas: Receta[]; paginacion: any }, any>({
    queryKey: [...QUERY_KEY.RECETAS, query],
    queryFn: async () => await axiosReceta.searchAll(query),
    initialData: (isInitialQuery && initialData)
      ? { recetas: initialData, paginacion: { total: initialTotal || initialData.length, page: 1, limit: 10 } }
      : undefined,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: 1
  })
}

export function useReceta(id: string) {
  const axiosReceta = axiosRecetaFactory()

  return useQuery<Receta, any>({
    queryKey: [...QUERY_KEY.RECETAS, id],
    queryFn: async () => await axiosReceta.getById(id),
    enabled: !!id,
    staleTime: 60_000,
    retry: 1
  })
}

export function useCreateReceta() {
  const qc = useQueryClient()
  const axiosReceta = axiosRecetaFactory()

  return useMutation<{ receta: Receta }, any, CrearRecetaDto>({
    mutationFn: async (payload) => await axiosReceta.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.RECETAS })
  })
}

export function useEditReceta() {
  const qc = useQueryClient()
  const axiosReceta = axiosRecetaFactory()

  return useMutation<{ receta: Receta }, any, { id: string; data: ActualizarRecetaDto }>({
    mutationFn: async ({ id, data }) => await axiosReceta.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.RECETAS })
  })
}

export function useDeleteReceta() {
  const qc = useQueryClient()
  const axiosReceta = axiosRecetaFactory()

  return useMutation<{ message: string }, any, string>({
    mutationFn: async (id) => await axiosReceta.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.RECETAS })
  })
}

export function useToggleRecetaStatus() {
  const qc = useQueryClient()
  const axiosReceta = axiosRecetaFactory()

  return useMutation<{ receta: Receta }, any, { id: string; esta_activo: boolean }>({
    mutationFn: async ({ id, esta_activo }) => await axiosReceta.toggleStatus(id, esta_activo),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.RECETAS })
  })
}
