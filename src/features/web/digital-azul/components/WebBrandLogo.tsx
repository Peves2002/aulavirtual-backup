'use client'

import Link from 'next/link'

import { useConfig } from '@/contexts/ConfigContext'
import { daColors, daFont } from '@/features/web/digital-azul/home/homeTheme'

export default function WebBrandLogo({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
  const configs = useConfig()
  const name = configs.TEMPLATE_NAME || 'DIGITAL AZUL'
  const slogan = configs.TEMPLATE_SLOGAN || 'SOLUCIONES DE APRENDIZAJE'
  const isFooter = variant === 'footer'

  return (
    <Link href="/" className="no-underline flex items-center gap-2.5">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          background: isFooter ? '#ffffff' : daColors.blue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: daFont,
            fontWeight: 900,
            fontSize: '1.125rem',
            color: isFooter ? daColors.blue : '#ffffff',
            lineHeight: 1,
          }}
        >
          D
        </span>
      </div>
      <div>
        <div
          style={{
            fontFamily: daFont,
            fontWeight: 800,
            fontSize: isFooter ? '0.9375rem' : '1rem',
            color: isFooter ? '#ffffff' : daColors.blue,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
          }}
        >
          {name.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: daFont,
            fontSize: '0.5625rem',
            fontWeight: 600,
            color: isFooter ? 'rgba(255,255,255,0.65)' : daColors.textMuted,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          {slogan.toUpperCase()}
        </div>
      </div>
    </Link>
  )
}
