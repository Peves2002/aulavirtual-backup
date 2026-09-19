import axios from 'axios'
import { Capacitacion, CreateCapacitacionDTO, UpdateCapacitacionDTO } from '../entity'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export const getCapacitaciones = async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Capacitacion>> => {
  const { data } = await axios.get('/api/admin/capacitaciones', { params })
  return data
}

export const getCapacitacionById = async (id: string): Promise<Capacitacion> => {
  const { data } = await axios.get(`/api/admin/capacitaciones/${id}`)
  return data
}

export const createCapacitacion = async (dto: CreateCapacitacionDTO): Promise<Capacitacion> => {
  const { data } = await axios.post('/api/admin/capacitaciones', dto)
  return data
}

export const updateCapacitacion = async (dto: UpdateCapacitacionDTO): Promise<Capacitacion> => {
  const { data } = await axios.put(`/api/admin/capacitaciones/${dto.id}`, dto)
  return data
}

export const deleteCapacitacion = async (id: string): Promise<void> => {
  await axios.delete(`/api/admin/capacitaciones/${id}`)
}

export const reorderCapacitaciones = async (items: { id: string; orden: number }[]): Promise<void> => {
  await axios.put('/api/admin/capacitaciones/reordenar', { items })
}
