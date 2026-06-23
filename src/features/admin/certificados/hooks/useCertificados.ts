import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { AxiosCertificado } from '../http/axiosCertificado'
import type { Certificado, CertificadosResponse } from '../entity/Certificado'
import type { CrearCertificadoManualDto } from '@/schemas/certificado.schema'

const axiosCertificadoFactory = () => {
  const getAuthToken = async () => {
    const s = await getSession()

    return s?.user?.accessToken ?? null
  }

  return new AxiosCertificado({ getAuthToken })
}

export const useCertificados = (
  params: { page: number; limit: number; buscar?: string; codigo?: string; nombre?: string },
  initialData?: CertificadosResponse['result']
) => {
  const isDefault =
    params.page === 1 && params.limit === 10 && !params.buscar && !params.codigo && !params.nombre

  return useQuery({
    queryKey: ['admin-certificados', params],
    queryFn: async () => {
      const axiosCertificado = axiosCertificadoFactory()

      return await axiosCertificado.getAll(params)
    },
    initialData: isDefault ? initialData : undefined,
    placeholderData: keepPreviousData
  })
}

/**
 * Hook para crear un certificado manual (Admin)
 */
export const useCreateCertificadoManual = () => {
  const qc = useQueryClient()

  return useMutation<{ certificado: Certificado }, any, CrearCertificadoManualDto>({
    mutationFn: async (data: CrearCertificadoManualDto) => {
      const axiosCertificado = axiosCertificadoFactory()

      return await axiosCertificado.createManual(data)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-certificados'] })
  })
}
