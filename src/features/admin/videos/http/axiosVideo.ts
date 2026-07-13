import axios from 'axios'

import type { AxiosStatic } from 'axios'

import { getBaseURL } from '@/utils/env'
import { AxiosInternalHttpClient } from '@/features/shared/http/httpClient'
import type { Video, CreateVideoDto, UpdateVideoDto } from '../entity/Video'

type Params = {
  axiosLib?: AxiosStatic
  getAuthToken?: () => Promise<string | null> | string | null
}

export class AxiosVideo extends AxiosInternalHttpClient {
  constructor(params: Params = {}) {
    super({
      axiosLib: params.axiosLib ?? axios,
      baseURL: `${getBaseURL()}/api/admin/videos`,
      getAuthToken: params.getAuthToken,
    })
  }

  async getAll(params?: { buscar?: string }): Promise<Video[]> {
    try {
      const query = new URLSearchParams()

      if (params?.buscar) query.set('buscar', params.buscar)
      const qs = query.toString() ? `?${query.toString()}` : ''

      const { videos } = await this.iGet<{ videos: Video[] }>(`${qs}`)

      return videos
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async getById(id: string): Promise<Video> {
    try {
      const { video } = await this.iGet<{ video: Video }>(`/${id}`)

      return video
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async create(payload: CreateVideoDto): Promise<Video> {
    try {
      const { video } = await this.iPost<{ video: Video }>('', payload)

      return video
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async update(id: string, payload: UpdateVideoDto): Promise<Video> {
    try {
      const { video } = await this.iPut<{ video: Video }>(`/${id}`, payload)

      return video
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.iDelete(`/${id}`)
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }
}
