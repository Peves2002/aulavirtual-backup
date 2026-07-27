'use client'

// React Imports
import { useEffect, useRef } from 'react'

// Next Imports
// import Img from 'next/image'
import Link from 'next/link'

// Third-party Imports
// Component Imports
// import VuexyLogo from '@core/svg/Logo'

// Config Imports
import themeConfig from '@/utils/configs/themeConfig'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import { useConfig } from '@/contexts/ConfigContext'

const Logo = () => {
  // Refs
  const logoTextRef = useRef<HTMLDivElement>(null)

  // Hooks
  const { isHovered } = useVerticalNav()
  const { settings } = useSettings()
  const configs = useConfig()

  // Vars
  const { layout } = settings
  
  const templateLogo = '/images/logo-gridexa.png'
  const templateName = configs.TEMPLATE_NAME || themeConfig.templateName

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout])

  return (
    <Link href='/' className='flex items-center'>
      <img src={templateLogo} alt={`${templateName} Logo`} className='bs-[46px]' />
    </Link>
  )
}

export default Logo
