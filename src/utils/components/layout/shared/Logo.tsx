'use client'

import Link from 'next/link'

import themeConfig from '@/utils/configs/themeConfig'
import { useConfig } from '@/contexts/ConfigContext'

const Logo = () => {
  const configs = useConfig()

  const templateLogo = configs.TEMPLATE_LOGO || themeConfig.templateLogo || '/images/logo.png'
  const templateName = configs.TEMPLATE_NAME || themeConfig.templateName || 'MS&M CONSULTING'

  return (
    <Link href="/" className="flex items-center gap-3 no-underline group">
      <img
        src={templateLogo}
        alt={`${templateName} Logo`}
        className="h-[42px] w-auto object-contain transition-transform group-hover:scale-105"
      />
      <div className="flex flex-col justify-center">
        <span
          className="font-extrabold tracking-tight leading-tight text-[#02115C] whitespace-nowrap"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem' }}
        >
          {templateName}
        </span>
      </div>
    </Link>
  )
}

export default Logo
