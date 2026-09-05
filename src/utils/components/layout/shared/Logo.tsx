'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
// import Img from 'next/image'
import Link from 'next/link'

// Config Imports
import themeConfig from '@/utils/configs/themeConfig'

// Hook Imports
import { useConfig } from '@/contexts/ConfigContext'

interface LogoProps {

  // Cuando el logo subido es casi cuadrado (o vertical) se ve muy pequeño a la
  // altura fija. Con esto activado, se mide el aspect ratio real de la
  // imagen y se le da más alto a los logos cuadrados y un tamaño generoso a los horizontales.
  enlargeSquare?: boolean
  className?: string
  compactHeight?: number
  squareHeight?: number

  // Envuelve el logo en un contenedor blanco redondeado, para headers con
  // fondo oscuro donde el logo (a menudo con texto/íconos oscuros) pierde contraste.
  whiteBg?: boolean
}

const DEFAULT_COMPACT_HEIGHT = 64
const DEFAULT_SQUARE_HEIGHT = 74

const Logo = ({
  enlargeSquare = false,
  className,
  compactHeight = DEFAULT_COMPACT_HEIGHT,
  squareHeight = DEFAULT_SQUARE_HEIGHT,
  whiteBg = false,
}: LogoProps = {}) => {
  // Hooks
  const configs = useConfig()
  const [imgHeight, setImgHeight] = useState(compactHeight)

  // Vars
  const templateLogo = configs.TEMPLATE_LOGO || themeConfig.templateLogo
  const templateName = themeConfig.templateName

  const handleImgLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!enlargeSquare) return

    const { naturalWidth, naturalHeight } = e.currentTarget

    if (!naturalWidth || !naturalHeight) return

    const ratio = naturalWidth / naturalHeight

    setImgHeight(ratio < 1.6 ? squareHeight : compactHeight)
  }

  const img = (
    <img
      src={templateLogo}
      alt={`${templateName} Logo`}
      onLoad={handleImgLoad}
      className={enlargeSquare ? 'max-h-[74px] max-w-full object-contain' : 'bs-[46px]'}
      style={enlargeSquare ? { height: `${imgHeight}px`, width: 'auto' } : undefined}
    />
  )

  return (
    <Link href='/' className={`flex items-center ${className || ''}`}>
      {whiteBg ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '6px 12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {img}
        </div>
      ) : (
        img
      )}
    </Link>
  )
}

export default Logo
