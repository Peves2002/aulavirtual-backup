import React from 'react'

import { unstable_cache } from 'next/cache'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import { WebNavMenuProvider } from '@/contexts/WebNavMenuContext'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'
import WebFooter from '@/utils/components/layout/web/WebFooter'
import WebHeader from '@/utils/components/layout/web/WebHeader'
import MobileBottomNav from '@/utils/components/layout/web/MobileBottomNav'
import WebMobileMenu from '@/features/web/digital-azul/components/WebMobileMenu'
import WhatsAppFloat from '@/features/web/digital-azul/components/WhatsAppFloat'

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

  const platformName = configs.TEMPLATE_NAME || 'Digital Azul'
  const platformSlogan = configs.TEMPLATE_SLOGAN || 'Conocimiento que impulsa capacidades'
  const rutasHabilitado = configs.WEB_RUTAS_HABILITADO !== 'false'

  return (
    <AuthModalProvider>
      <WebNavMenuProvider>
        <div className="web-layout min-h-screen bg-background flex flex-col">
          <WebHeader initialCategories={categories} platformName={platformName} platformSlogan={platformSlogan} />
          <WebMobileMenu />
          <main className="flex-1 flex flex-col min-w-0" style={{ paddingTop: 'var(--navbar-height)' }}>
            <style>{`@media (max-width: 639px) { main { padding-bottom: 64px; } }`}</style>
            <div className="flex-1">
              {children}
            </div>
            <WebFooter platformName={platformName} rutasHabilitado={rutasHabilitado} />
          </main>
          <MobileBottomNav />
          <WhatsAppFloat />
        </div>
      </WebNavMenuProvider>
    </AuthModalProvider>
  )
}

export default WebLayout
