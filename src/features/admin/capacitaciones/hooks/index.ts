import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCapacitaciones, getCapacitacionById, createCapacitacion, updateCapacitacion, deleteCapacitacion, reorderCapacitaciones } from '../http'
import { CreateCapacitacionDTO, UpdateCapacitacionDTO } from '../entity'

export const CAPACITACIONES_KEYS = {
  all: ['capacitaciones'] as const,
  lists: () => [...CAPACITACIONES_KEYS.all, 'list'] as const,
  list: (params: any) => [...CAPACITACIONES_KEYS.lists(), params] as const,
  details: () => [...CAPACITACIONES_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CAPACITACIONES_KEYS.details(), id] as const,
}

export const useCapacitaciones = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: CAPACITACIONES_KEYS.list(params),
    queryFn: () => getCapacitaciones(params),
  })
}

export const useCapacitacion = (id: string) => {
  return useQuery({
    queryKey: CAPACITACIONES_KEYS.detail(id),
    queryFn: () => getCapacitacionById(id),
    enabled: !!id,
  })
}

export const useCreateCapacitacion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateCapacitacionDTO) => createCapacitacion(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAPACITACIONES_KEYS.lists() })
    },
  })
}

export const useUpdateCapacitacion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateCapacitacionDTO) => updateCapacitacion(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CAPACITACIONES_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: CAPACITACIONES_KEYS.detail(data.id) })
    },
  })
}

export const useDeleteCapacitacion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCapacitacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAPACITACIONES_KEYS.lists() })
    },
  })
}

export const useReordenarCapacitaciones = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (items: { id: string; orden: number }[]) => reorderCapacitaciones(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAPACITACIONES_KEYS.lists() })
    },
  })
}
