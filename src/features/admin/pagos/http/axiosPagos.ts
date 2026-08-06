import axios from 'axios'

import type { AxiosStatic } from 'axios'

import { getBaseURL } from '@/utils/env'
import { AxiosInternalHttpClient } from '@/features/shared/http/httpClient'
import type {
  AlumnoPagoResumen,
  ConfirmacionCuota,
  CuotaReciente,
  PagosCursoData,
  PagosFiltrosData,
  PagosPorAlumnoDetalle,
  RegistroCuotaManual
} from '../entity/PagoCuota'

type Params = {
  axiosLib?: AxiosStatic
  baseURL?: string
  getAuthToken?: () => Promise<string | null> | string | null
}

export class AxiosPagos extends AxiosInternalHttpClient {
  constructor(params: Params = {}) {
    const baseURL = getBaseURL()

    super({
      axiosLib: params.axiosLib ?? axios,
      baseURL: params.baseURL ?? `${baseURL}/api/admin/pagos`,
      getAuthToken: params.getAuthToken
    })
  }

  async getFiltros(categoriaId?: string, subcategoriaId?: string): Promise<PagosFiltrosData> {
    const qs = new URLSearchParams()

    if (categoriaId) qs.set('categoriaId', categoriaId)
    if (subcategoriaId) qs.set('subcategoriaId', subcategoriaId)

    const query = qs.toString()

    return this.iGet<PagosFiltrosData>(`/filtros${query ? `?${query}` : ''}`)
  }

  async getRecientes(limit = 15): Promise<CuotaReciente[]> {
    const res = await this.iGet<{ recientes: CuotaReciente[] }>(`/recientes?limit=${limit}`)

    return res?.recientes ?? []
  }

  async buscarAlumnos(q: string): Promise<AlumnoPagoResumen[]> {
    const res = await this.iGet<{ alumnos: AlumnoPagoResumen[] }>(
      `/por-alumno?q=${encodeURIComponent(q)}`
    )

    return res?.alumnos ?? []
  }

  async getPagosAlumno(usuarioId: string): Promise<PagosPorAlumnoDetalle> {
    return this.iGet<PagosPorAlumnoDetalle>(`/por-alumno/${encodeURIComponent(usuarioId)}`)
  }

  async getByCurso(cursoId: string): Promise<PagosCursoData> {
    return this.iGet<PagosCursoData>(`?cursoId=${encodeURIComponent(cursoId)}`)
  }

  async crearTabla(cursoId: string) {
    return this.iPost<{ creados: number; omitidos: number; numeroCuota: number }>('/crear-tabla', {
      cursoId
    })
  }

  async actualizarRegistro(
    id: string,
    data: Partial<{
      monto_pago: number
      confirmacion: ConfirmacionCuota
      observaciones: string | null
      fecha_envio: string
    }>
  ): Promise<RegistroCuotaManual> {
    const res = await this.iPatch<{ registro: RegistroCuotaManual }>(`/${id}`, data)

    return res.registro
  }

  async eliminarTabla(cursoId: string, numeroCuota: number) {
    return this.iDelete<{
      cursoId: string
      numeroCuota: number
      registrosEliminados: number
      configsEliminadas: number
    }>('/tabla', {
      data: { cursoId, numeroCuota }
    })
  }

  async guardarAccesos(cursoId: string, numeroCuota: number, moduloIds: string[]) {
    return this.iPut<{
      cursoId: string
      numeroCuota: number
      moduloIds: string[]
      alumnosAfectados: number
      accesosRecalculados: number
    }>('/accesos', {
      cursoId,
      numeroCuota,
      moduloIds
    })
  }
}
