import React from 'react'

import type { Metadata } from 'next'

import CertificateLookup from '@/features/web/certificados/CertificateLookup'
import { getConfigs } from '@/utils/libs/config'

export const metadata: Metadata = {
  title: 'Verificar Certificado | MS&M CONSULTING',
  description: 'Consulta por DNI los cursos certificados y descarga tus certificados de MS&M CONSULTING.',
}

export default async function VerificarCertificadoPage() {
  const configs = await getConfigs()

  return (
    <CertificateLookup
      brandName={configs.TEMPLATE_NAME || 'MS&M CONSULTING'}
      logoUrl={configs.TEMPLATE_LOGO || configs.WEB_LOGO_URL}
    />
  )
}
