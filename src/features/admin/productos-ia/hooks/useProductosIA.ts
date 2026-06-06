import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'

import {
  axiosGetProductosIA, axiosGetProductoIA, axiosCrearProductoIA,
  axiosActualizarProductoIA, axiosEliminarProductoIA, axiosCambiarEstadoProductoIA
} from '../http/axiosProductoIA'
import type { CrearProductoIADto, ActualizarProductoIADto, EstadoProductoIA } from '../entity/ProductoIA'

const KEY = 'productos-ia'

export const useProductosIA = () =>
  useQuery({ queryKey: [KEY], queryFn: axiosGetProductosIA })

export const useProductoIA = (id: string) =>
  useQuery({ queryKey: [KEY, id], queryFn: () => axiosGetProductoIA(id), enabled: !!id })

export const useCrearProductoIA = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CrearProductoIADto) => axiosCrearProductoIA(dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [KEY] }); enqueueSnackbar('Producto IA creado', { variant: 'success' }) },
    onError: (e: any) => enqueueSnackbar(e?.response?.data?.message || 'Error al crear', { variant: 'error' })
  })
}

export const useEditarProductoIA = (id: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: ActualizarProductoIADto) => axiosActualizarProductoIA(id, dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [KEY] }); enqueueSnackbar('Producto IA actualizado', { variant: 'success' }) },
    onError: (e: any) => enqueueSnackbar(e?.response?.data?.message || 'Error al actualizar', { variant: 'error' })
  })
}

export const useEliminarProductoIA = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => axiosEliminarProductoIA(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [KEY] }); enqueueSnackbar('Producto IA eliminado', { variant: 'success' }) },
    onError: (e: any) => enqueueSnackbar(e?.response?.data?.message || 'Error al eliminar', { variant: 'error' })
  })
}

export const useCambiarEstadoProductoIA = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: EstadoProductoIA }) => axiosCambiarEstadoProductoIA(id, estado),
    onSuccess: () => { qc.invalidateQueries({ queryKey: [KEY] }); enqueueSnackbar('Estado actualizado', { variant: 'success' }) },
    onError: (e: any) => enqueueSnackbar(e?.response?.data?.message || 'Error', { variant: 'error' })
  })
}
