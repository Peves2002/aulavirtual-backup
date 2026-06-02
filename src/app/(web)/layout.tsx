import React from 'react'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import { CartProvider } from '@/features/web/cart/context/CartContext'
import CartDrawer from '@/features/web/cart/components/CartDrawer'
import AnnouncementBar from '@/features/web/atd/layout/AnnouncementBar'
import Navbar from '@/features/web/atd/layout/Navbar'
import Footer from '@/features/web/atd/layout/Footer'

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthModalProvider>
      <CartProvider>
        <div className="web-layout min-h-screen flex flex-col bg-background">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </AuthModalProvider>
  )
}

export default WebLayout
