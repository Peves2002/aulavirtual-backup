import axios from 'axios'

import type { ProductoIA, ProductoIAListaItem, CrearProductoIADto, ActualizarProductoIADto, EstadoProductoIA } from '../entity/ProductoIA'

export const axiosGetProductosIA = async (): Promise<ProductoIAListaItem[]> => {
  const { data } = await axios.get('/api/productos-ia?admin=true')

  
return data.data
}

export const axiosGetProductoIA = async (id: string): Promise<ProductoIA> => {
  const { data } = await axios.get(`/api/productos-ia/${id}`)

  
return data.data
}

export const axiosCrearProductoIA = async (dto: CrearProductoIADto): Promise<ProductoIA> => {
  const { data } = await axios.post('/api/productos-ia', dto)

  
return data.data
}

export const axiosActualizarProductoIA = async (id: string, dto: ActualizarProductoIADto): Promise<ProductoIA> => {
  const { data } = await axios.patch(`/api/productos-ia/${id}`, dto)

  
return data.data
}

export const axiosEliminarProductoIA = async (id: string): Promise<void> => {
  await axios.delete(`/api/productos-ia/${id}`)
}

export const axiosCambiarEstadoProductoIA = async (id: string, estado: EstadoProductoIA): Promise<ProductoIA> => {
  const { data } = await axios.patch(`/api/productos-ia/${id}/estado`, { estado })

  
return data.data
}
