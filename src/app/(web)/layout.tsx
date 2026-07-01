import React from 'react'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'
import WebFooter from '@/utils/components/layout/web/WebFooter'
import WebHeader from '@/utils/components/layout/web/WebHeader'
import LeftSidebar from '@/utils/components/layout/web/LeftSidebar'
import MobileBottomNav from '@/utils/components/layout/web/MobileBottomNav'
import PWAInstalledToast from '@/features/web/home/components/PWAInstalledToast'

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

  const platformName = configs.TEMPLATE_NAME || 'Aula Virtual'
  const platformSlogan = configs.TEMPLATE_SLOGAN || 'Aprende sin límites'
  const rutasHabilitado = configs.WEB_RUTAS_HABILITADO !== 'false'
  const empresasHabilitado = configs.WEB_EMPRESAS_HABILITADO !== 'false'

  return (
    <AuthModalProvider>
      <div className="ace-web min-h-screen flex flex-col bg-background text-foreground">
        <AceHeader />
        <main className="flex-1">{children}</main>
        <AceFooter />
      </div>
    </AuthModalProvider>
  )
}

export default WebLayout
