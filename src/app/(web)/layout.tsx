import React from 'react'

import { unstable_cache } from 'next/cache'
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'
import PWAInstalledToast from '@/features/web/home/components/PWAInstalledToast'
import AdphNavbar from '@/features/web/adph/components/AdphNavbar'
import AdphFooter from '@/features/web/adph/components/AdphFooter'
import AdphWhatsAppFloat from '@/features/web/adph/components/AdphWhatsAppFloat'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--adph-font'
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope'
})

const getCategorias = unstable_cache(
  () =>
    prisma.categoria.findMany({
      where: { esta_activo: true },
      select: { id: true, nombre: true, slug: true },
      orderBy: { orden: 'asc' }
    }),
  ['web-categorias'],
  { revalidate: 300 }
)

const WebLayout = async ({ children }: { children: React.ReactNode }) => {
  const [categories, configs] = await Promise.all([getCategorias(), getConfigs()])

  const platformName = configs.TEMPLATE_NAME || 'ADPH Group'
  const whatsappNumero = configs.WHATSAPP_NUMERO || '51924943982'

  void categories

  return (
    <AuthModalProvider>
      <div className={`web-layout min-h-screen bg-[#FBFCFD] text-slate-800 flex flex-col font-adph overflow-x-hidden ${plusJakarta.variable} ${manrope.variable}`}>
        {/* Navbar ADPH */}
        <AdphNavbar />

        <main className="flex-1 flex flex-col min-w-0" style={{ paddingTop: 'var(--adph-navbar-height, 80px)' }}>
          <div className="flex-1">
            {children}
          </div>
          {/* Footer ADPH */}
          <AdphFooter platformName={platformName} />
        </main>

        <AdphWhatsAppFloat phoneNumber={whatsappNumero} />
        <PWAInstalledToast />
      </div>
    </AuthModalProvider>
  )
}

export default WebLayout
