import type { Metadata } from 'next'

import { getServerSession } from 'next-auth'

import { Providers } from '@/components/Providers'
import { getConfigs } from '@/utils/libs/config'
import { resolveFaviconUrl } from '@/utils/functions/syncFavicon'
import { getAuthOptions } from '@/utils/configs/auth'
import { plus_jakarta_sans } from '@core/theme'

import './globals.css'
import '@assets/iconify-icons/generated-icons.css'

export async function generateMetadata(): Promise<Metadata> {
  const configs = await getConfigs()
  const title = configs.TEMPLATE_NAME || 'Aula Virtual'
  const slogan = configs.TEMPLATE_SLOGAN || ''
  const logo = resolveFaviconUrl(configs)

  return {
    title: slogan ? `${title} - ${slogan}` : title,
    description: slogan,
    manifest: '/manifest.json',
    icons: {
      icon: logo,
      shortcut: logo,
      apple: '/icons/apple-touch-icon.png',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title,
    },
  }
}

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16) || 0
  const g = parseInt(clean.slice(2, 4), 16) || 0
  const b = parseInt(clean.slice(4, 6), 16) || 0

  return `${r}, ${g}, ${b}`
}

function darkenHex(hex: string, factor: number): string {
  const clean = hex.replace('#', '')
  const r = Math.round((parseInt(clean.slice(0, 2), 16) || 0) * factor)
  const g = Math.round((parseInt(clean.slice(2, 4), 16) || 0) * factor)
  const b = Math.round((parseInt(clean.slice(4, 6), 16) || 0) * factor)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const configs = await getConfigs()
  const authOptions = await getAuthOptions()
  const session = await getServerSession(authOptions)

  // Colores MUI admin
  const primaryMain = '#FFB600'
  const primaryLight = '#FFC833'
  const primaryDark = '#CC9200'

  // Colores web (Nueva Paleta MS&M)
  const webPrimary = '#FFB600' // Amarillo MS&M
  const webLight = '#F2F2F2'   // Gris claro
  const webDark = '#000000'    // Negro
  const webDarkDeep = '#000000'
  const webDarkMid = '#4D4D4D' // Gris oscuro

  return (
    <html lang='es' suppressHydrationWarning className={`${plus_jakarta_sans.variable} ${plus_jakarta_sans.className}`}>
      <body className='flex is-full min-bs-full flex-col' id="__next">
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-main: ${primaryMain};
              --primary-light: ${primaryLight};
              --primary-dark: ${primaryDark};
              --web-primary:     ${webPrimary};
              --web-primary-rgb: ${hexToRgb(webPrimary)};
              --web-light:       ${webLight};
              --web-light-rgb:   ${hexToRgb(webLight)};
              --web-dark:        ${webDark};
              --web-dark-rgb:    ${hexToRgb(webDark)};
              --web-dark-deep:   ${webDarkDeep};
              --web-dark-mid:    ${webDarkMid};
            }
          `
        }} />
        <Providers session={session} configs={configs}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
