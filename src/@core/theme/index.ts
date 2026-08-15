// Next Imports
import localFont from 'next/font/local'

// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode, Skin } from '@core/types'

// Theme Options Imports
import overrides from './overrides'
import colorSchemes from './colorSchemes'
import spacing from './spacing'
import shadows from './shadows'
import customShadows from './customShadows'
import typography from './typography'

export const plus_jakarta_sans = localFont({
  src: [
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-300.woff2', weight: '300', style: 'normal' },
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-500.woff2', weight: '500', style: 'normal' },
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-600.woff2', weight: '600', style: 'normal' },
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-700.woff2', weight: '700', style: 'normal' },
    { path: '../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-800.woff2', weight: '800', style: 'normal' }
  ],
  variable: '--font-plus-jakarta-sans'
})

const theme = (settings: Settings, mode: SystemMode, direction: Theme['direction']): Theme => {
  return {
    direction,
    components: overrides(settings.skin as Skin),
    colorSchemes: colorSchemes(settings.skin as Skin),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(mode),
    typography: typography(plus_jakarta_sans.style.fontFamily),
    customShadows: customShadows(mode),
    mainColorChannels: {
      light: '47 43 61',
      dark: '225 222 245',
      lightShadow: '47 43 61',
      darkShadow: '19 17 32'
    }
  } as Theme
}

export default theme
