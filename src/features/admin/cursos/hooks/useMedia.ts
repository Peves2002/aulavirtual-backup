'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { AxiosMedia } from '../http/axiosMedia'

const QUERY_KEY = { MEDIA: ['media'] }

const axiosMediaFactory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosMedia({ getAuthToken })
}

/**
 * Hook para listar todos los medios
 */
export function useMedia(folder?: string) {
  const axiosMedia = axiosMediaFactory()

  return useQuery<any[], any>({
    queryKey: folder ? [...QUERY_KEY.MEDIA, folder] : QUERY_KEY.MEDIA,
    queryFn: async () => await axiosMedia.getAll(folder),
    staleTime: 60_000,
    retry: 1
  })
}

/**
 * Hook para subir un medio
 */
export function useUploadMedia(folder?: string) {
  const qc = useQueryClient()
  const axiosMedia = axiosMediaFactory()

  return useMutation<any, any, File>({
    mutationFn: async file => await axiosMedia.upload(file, folder),
    onSuccess: () => qc.invalidateQueries({ queryKey: folder ? [...QUERY_KEY.MEDIA, folder] : QUERY_KEY.MEDIA })
  })
}

/**
 * Hook para eliminar un medio
 */
export function useDeleteMedia() {
  const qc = useQueryClient()
  const axiosMedia = axiosMediaFactory()

  return useMutation<any, any, string>({
    mutationFn: async id => await axiosMedia.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.MEDIA })
  })
}
