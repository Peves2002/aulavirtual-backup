import React from 'react'

import { AuthModalProvider } from '@/contexts/AuthModalContext'
import PublicHeader from '@/app/(public)/PublicHeader'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <PublicHeader />
      <div className="pt-20">{children}</div>
    </AuthModalProvider>
  )
}
