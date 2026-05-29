import React from 'react'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import AnnouncementBar from '@/features/web/atd/layout/AnnouncementBar'
import Navbar from '@/features/web/atd/layout/Navbar'
import Footer from '@/features/web/atd/layout/Footer'

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthModalProvider>
      <div className="web-layout min-h-screen flex flex-col bg-background">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AuthModalProvider>
  )
}

export default WebLayout
