import axios from 'axios'

import type { AxiosStatic } from 'axios'

import { getBaseURL } from '@/utils/env'
import { AxiosInternalHttpClient } from '@/features/shared/http/httpClient'

type RecetaResumen = {
  id: string
  nombre: string
  slug: string
  imagen: string | null
  descripcion: string | null
  creado_en: string
}

type RecetaCompleta = RecetaResumen & {
  insumos: any[]
  procedimiento: any[]
  observaciones: string | null
  video_url: string | null
}

type Params = {
  axiosLib?: AxiosStatic
  getAuthToken?: () => Promise<string | null> | string | null
}

export class AxiosWebRecetas extends AxiosInternalHttpClient {
  constructor(params: Params = {}) {
    const baseURL = getBaseURL()

    super({
      axiosLib: params.axiosLib ?? axios,
      baseURL: `${baseURL}/api/web/recetas`,
      getAuthToken: params.getAuthToken
    })
  }

  async getAll(): Promise<{ recetas: RecetaResumen[] }> {
    try {
      return await this.iGet<{ recetas: RecetaResumen[] }>('')
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async getBySlug(slug: string): Promise<{ receta: RecetaCompleta }> {
    try {
      return await this.iGet<{ receta: RecetaCompleta }>(`/${slug}`)
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }
}
