import { getSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { AxiosVideo } from '../http/axiosVideo'
import type { Video, CreateVideoDto, UpdateVideoDto } from '../entity/Video'

const QUERY_KEY = { VIDEOS: ['admin', 'videos'] }

const videoFactory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosVideo({ getAuthToken })
}

export function useAdminVideos(params?: { buscar?: string }) {
  return useQuery<Video[]>({
    queryKey: [...QUERY_KEY.VIDEOS, params],
    queryFn: () => videoFactory().getAll(params),
  })
}

export function useAdminVideo(id: string | null) {
  return useQuery<Video>({
    queryKey: [...QUERY_KEY.VIDEOS, id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/admin/videos/${id}`)

      return data.result?.video ?? data.video
    },
    enabled: !!id,
  })
}

export function useCreateVideo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateVideoDto) => videoFactory().create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.VIDEOS }),
  })
}

export function useUpdateVideo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateVideoDto }) =>
      videoFactory().update(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEY.VIDEOS })
      qc.invalidateQueries({ queryKey: [...QUERY_KEY.VIDEOS, variables.id] })
    },
  })
}

export function useDeleteVideo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => videoFactory().remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY.VIDEOS }),
  })
}
