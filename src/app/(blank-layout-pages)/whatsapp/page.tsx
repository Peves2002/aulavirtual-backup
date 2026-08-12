import type { Metadata } from 'next'

import WhatsAppRedirectView from '@/features/web/whatsapp-redirect/components/WhatsAppRedirectView'
import { getConfigs } from '@/utils/libs/config'
import themeConfig from '@/utils/configs/themeConfig'

export const metadata: Metadata = {
  title: 'Habla con un asesor',
  description: 'Te estamos conectando con un asesor por WhatsApp.'
}

export default async function WhatsAppRedirectPage() {
  const configs = await getConfigs()
  const waNumero = configs.WHATSAPP_NUMERO || '51959436827'
  const mensaje = configs.WHATSAPP_MENSAJE_LANDING || 'Hola, quiero información sobre sus cursos'
  const logoUrl = configs.TEMPLATE_LOGO || themeConfig.templateLogo
  const templateName = configs.TEMPLATE_NAME || themeConfig.templateName

  return <WhatsAppRedirectView waNumber={waNumero} mensaje={mensaje} logoUrl={logoUrl} templateName={templateName} />
}
