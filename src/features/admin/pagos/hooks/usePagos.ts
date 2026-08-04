'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { AxiosPagos } from '../http/axiosPagos'
import type { ConfirmacionCuota } from '../entity/PagoCuota'

const factory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosPagos({ getAuthToken })
}

export const usePagosFiltros = (categoriaId?: string, subcategoriaId?: string) => {
  return useQuery({
    queryKey: ['admin', 'pagos', 'filtros', categoriaId ?? null, subcategoriaId ?? null],
    queryFn: () => factory().getFiltros(categoriaId, subcategoriaId)
  })
}

export const usePagosRecientes = (enabled = true) => {
  return useQuery({
    queryKey: ['admin', 'pagos', 'recientes'],
    queryFn: () => factory().getRecientes(15),
    enabled
  })
}

export const usePagosCurso = (cursoId?: string) => {
  return useQuery({
    queryKey: ['admin', 'pagos', 'curso', cursoId ?? null],
    queryFn: () => factory().getByCurso(cursoId!),
    enabled: Boolean(cursoId)
  })
}

export const usePagosMutations = (cursoId?: string) => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'pagos', 'recientes'] })

    if (cursoId) {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pagos', 'curso', cursoId] })
    }
  }

  const crearTabla = useMutation({
    mutationFn: () => factory().crearTabla(cursoId!),
    onSuccess: invalidate
  })

  const actualizarRegistro = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: Partial<{ monto_pago: number; confirmacion: ConfirmacionCuota }>
    }) => factory().actualizarRegistro(id, data),
    onSuccess: invalidate
  })

  const guardarAccesos = useMutation({
    mutationFn: ({
      numeroCuota,
      moduloIds
    }: {
      numeroCuota: number
      moduloIds: string[]
    }) => factory().guardarAccesos(cursoId!, numeroCuota, moduloIds),
    onSuccess: invalidate
  })

  return { crearTabla, actualizarRegistro, guardarAccesos }
}
