'use client'

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { AxiosCupon } from '../http/axiosCupon'
import type { Cupon } from '../entity/Cupon'

const axiosCuponFactory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosCupon({ getAuthToken })
}

export const useCupones = (query?: Record<string, string>, initialData?: Cupon[], initialPaginacion?: any) => {
  const isDefaultQuery = !query?.buscar && (!query?.page || query.page === '1')

  return useQuery<{ cupones: Cupon[]; paginacion: any }, any>({
    queryKey: ['cupones', query],
    queryFn: async () => {
      const axiosCupon = axiosCuponFactory()

      return await axiosCupon.getAll(query)
    },
    initialData:
      isDefaultQuery && initialData ? { cupones: initialData, paginacion: initialPaginacion ?? {} } : undefined,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: 1
  })
}

export const useCuponMutation = () => {
  const queryClient = useQueryClient()

  const createCupon = useMutation({
    mutationFn: async (data: any) => {
      const axiosCupon = axiosCuponFactory()

      return await axiosCupon.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cupones'] })
    }
  })

  const updateCupon = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const axiosCupon = axiosCuponFactory()

      return await axiosCupon.update(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cupones'] })
    }
  })

  const deleteCupon = useMutation({
    mutationFn: async (id: string) => {
      const axiosCupon = axiosCuponFactory()

      return await axiosCupon.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cupones'] })
    }
  })

  return { createCupon, updateCupon, deleteCupon }
}
