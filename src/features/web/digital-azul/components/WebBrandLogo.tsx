'use client'

import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { useConfig } from '@/contexts/ConfigContext'

const LOGO_CANDIDATES = ['/images/logo-removebg-preview.png', '/images/logo.png', '/images/logo.jpeg']

export default function WebBrandLogo({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
  const configs = useConfig()
  const name = configs.TEMPLATE_NAME || 'Digital Azul'
  const [logoIndex, setLogoIndex] = useState(0)

  const logoSrc = LOGO_CANDIDATES[logoIndex] ?? LOGO_CANDIDATES[0]

  const handleLogoError = () => {
    setLogoIndex(current => Math.min(current + 1, LOGO_CANDIDATES.length - 1))
  }

  const isFooter = variant === 'footer'

  return (
    <Link href="/" className="no-underline flex items-center">
      <Image
        src={logoSrc}
        alt={name}
        width={200}
        height={52}
        priority={!isFooter}
        onError={handleLogoError}
        style={{
          height: 44,
          width: 'auto',
          maxWidth: 200,
          objectFit: 'contain',
          ...(isFooter ? { filter: 'brightness(0) invert(1)' } : {}),
        }}
      />
    </Link>
  )
}
