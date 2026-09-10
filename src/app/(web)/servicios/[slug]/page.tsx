import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { getConfigs } from '@/utils/libs/config'
import { SERVICES_DATA } from '@/features/web/servicios/data/servicesData'
import ServiceDetailClient from '@/features/web/servicios/components/ServiceDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = SERVICES_DATA.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    return {
      title: 'Servicio no encontrado | MS&M CONSULTING',
    }
  }

  return {
    title: `${service.shortTitle} | MS&M CONSULTING`,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const service = SERVICES_DATA.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

  const configs = await getConfigs()
  const waNumero = configs.WHATSAPP_NUMERO || '51900281578'

  return <ServiceDetailClient service={service} waNumero={waNumero} />
}
