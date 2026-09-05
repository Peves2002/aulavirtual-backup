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

export const useBuscarAlumnosPagos = (q: string, enabled = true) => {
  const query = q.trim()

  return useQuery({
    queryKey: ['admin', 'pagos', 'alumnos', query],
    queryFn: () => factory().buscarAlumnos(query),
    enabled: enabled && query.length >= 2
  })
}

export const usePagosAlumno = (usuarioId?: string) => {
  return useQuery({
    queryKey: ['admin', 'pagos', 'alumno', usuarioId ?? null],
    queryFn: () => factory().getPagosAlumno(usuarioId!),
    enabled: Boolean(usuarioId)
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
    queryClient.invalidateQueries({ queryKey: ['admin', 'pagos'] })
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
      data: Partial<{
        monto_pago: number
        confirmacion: ConfirmacionCuota
        observaciones: string | null
        fecha_envio: string
      }>
    }) => factory().actualizarRegistro(id, data),
    onSuccess: invalidate
  })

  const eliminarTabla = useMutation({
    mutationFn: ({ numeroCuota }: { numeroCuota: number }) =>
      factory().eliminarTabla(cursoId!, numeroCuota),
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

  const crearCuotaIndividual = useMutation({
    mutationFn: ({ usuarioId, cursoId, moduloIds }: { usuarioId: string, cursoId: string, moduloIds?: string[] }) =>
      factory().crearCuotaIndividual(usuarioId, cursoId, moduloIds),
    onSuccess: invalidate
  })

  const editarCuotaIndividual = useMutation({
    mutationFn: ({ usuarioId, cuotaId, data }: { usuarioId: string, cuotaId: string, data: any }) =>
      factory().editarCuotaIndividual(usuarioId, cuotaId, data),
    onSuccess: invalidate
  })

  const eliminarCuotaIndividual = useMutation({
    mutationFn: ({ usuarioId, cuotaId }: { usuarioId: string, cuotaId: string }) =>
      factory().eliminarCuotaIndividual(usuarioId, cuotaId),
    onSuccess: invalidate
  })

  return { crearTabla, actualizarRegistro, eliminarTabla, guardarAccesos, crearCuotaIndividual, editarCuotaIndividual, eliminarCuotaIndividual }
}

export const useCursosInscritosAlumno = (usuarioId?: string) => {
  return useQuery({
    queryKey: ['admin', 'pagos', 'alumno', usuarioId, 'cursos'],
    queryFn: () => factory().getCursosInscritosAlumno(usuarioId!),
    enabled: Boolean(usuarioId)
  })
}
