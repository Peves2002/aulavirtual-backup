import React from 'react'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import AceHeader from '@/features/web/ace/AceHeader'
import AceFooter from '@/features/web/ace/AceFooter'

const WebLayout = ({ children }: { children: React.ReactNode }) => {
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
