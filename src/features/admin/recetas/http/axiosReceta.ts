import axios from 'axios'

import type { AxiosStatic } from 'axios'

import { getBaseURL } from '@/utils/env'
import { AxiosInternalHttpClient } from '@/features/shared/http/httpClient'
import type { Receta } from '../entity/Receta'
import type { CrearRecetaDto, ActualizarRecetaDto } from '@/schemas/receta.schema'

type Params = {
  axiosLib?: AxiosStatic
  baseURL?: string
  getAuthToken?: () => Promise<string | null> | string | null
}

export class AxiosReceta extends AxiosInternalHttpClient {
  constructor(params: Params = {}) {
    const baseURL = getBaseURL()

    super({
      axiosLib: params.axiosLib ?? axios,
      baseURL: `${baseURL}/api/recetas`,
      getAuthToken: params.getAuthToken
    })
  }

  async searchAll(query?: Record<string, string | number | boolean | undefined | null>): Promise<{ recetas: Receta[]; paginacion: any }> {
    try {
      const cleanQuery = query
        ? Object.fromEntries(Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== ''))
        : {}

      const queryString = Object.keys(cleanQuery).length > 0
        ? '?' + new URLSearchParams(cleanQuery as any).toString()
        : ''

      const payload = await this.iGet<{ recetas: Receta[]; paginacion: any }>(queryString)

      return payload || { recetas: [], paginacion: {} }
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async getById(id: string): Promise<Receta> {
    try {
      const result = await this.iGet<{ receta: Receta }>(`/${id}`)

      return result.receta
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async create(receta: CrearRecetaDto): Promise<{ receta: Receta }> {
    try {
      return await this.iPost<{ receta: Receta }>('', receta)
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async update(id: string, receta: ActualizarRecetaDto): Promise<{ receta: Receta }> {
    try {
      return await this.iPatch<{ receta: Receta }>(`/${id}`, receta)
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      return await this.iDelete<{ message: string }>(`/${id}`)
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }

  async toggleStatus(id: string, esta_activo: boolean): Promise<{ receta: Receta }> {
    try {
      return await this.iPatch<{ receta: Receta }>(`/${id}`, { esta_activo })
    } catch (err: any) {
      throw err?.response?.data ?? err
    }
  }
}
