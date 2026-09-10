import React from 'react'

import type { Metadata } from 'next'

import { getConfigs } from '@/utils/libs/config'
import ServiciosClient from '@/features/web/servicios/components/ServiciosClient'

export const metadata: Metadata = {
  title: 'Servicios Especializados | MS&M CONSULTING',
  description: 'Implementación de SG-SST, Monitoreos Ocupacionales, Soporte Mensual en SST y Vigilancia de Salud Ocupacional en Perú.',
}

export default async function ServiciosPage() {
  const configs = await getConfigs()
  const waNumero = configs.WHATSAPP_NUMERO || '51900281578'

  return <ServiciosClient waNumero={waNumero} />
}
