import React from 'react'

import { unstable_cache } from 'next/cache'

import { Toaster } from 'sonner'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'

import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { WhatsAppFab } from '@/components/site/WhatsAppFab'
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
  await Promise.all([getCategorias(), getConfigs()])

  return (
    <AuthModalProvider>
      <div
        className="min-h-screen flex flex-col font-sans text-foreground"
        style={{
          backgroundColor: '#FAFCF7', // Very subtle green tint to the white
          backgroundImage: `
            linear-gradient(to right, rgba(168, 224, 96, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 224, 96, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        <Navbar />
        <main className="flex-1" style={{ paddingTop: '5rem' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#EAF7D0",
              border: "1px solid #A8E060",
              color: "#1A3A0A",
            },
          }}
        />
      </div>
    </AuthModalProvider>
  )
}

export default WebLayout
