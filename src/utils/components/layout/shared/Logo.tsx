'use client'

import Link from 'next/link'

import themeConfig from '@/utils/configs/themeConfig'
import { useConfig } from '@/contexts/ConfigContext'

const Logo = () => {
  const configs = useConfig()

  const templateLogo = '/images/logo-sin-fondo.png'
  const templateName = configs.TEMPLATE_NAME || themeConfig.templateName || 'MS&M CONSULTING'

  return (
    <Link href="/" className="flex items-center gap-3 no-underline group">
      <img
        src={templateLogo}
        alt={`${templateName} Logo`}
        className="h-[72px] w-auto object-contain transition-transform group-hover:scale-105"
      />

    </Link>
  )
}

export default Logo
