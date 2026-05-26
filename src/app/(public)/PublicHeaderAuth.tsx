'use client'

import { useSession } from 'next-auth/react'
import UserDropdown from '@components/layout/shared/UserDropdown'
import { useAuthModal } from '@/contexts/AuthModalContext'

export default function PublicHeaderAuth() {
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()

  if (session) {
    return <UserDropdown />
  }

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={() => openLogin()}
        className="text-gray-700 hover:text-[var(--web-primary)] font-semibold text-sm transition-colors bg-transparent border-none cursor-pointer p-0"
      >
        Iniciar Sesión
      </button>
      <button
        onClick={() => openRegister()}
        className="bg-gradient-to-r from-[var(--web-primary)] to-[#1f7d6d] text-white font-semibold py-2.5 px-6 rounded-full hover:shadow-[0_4px_14px_rgba(37,146,127,0.4)] hover:-translate-y-0.5 transition-all text-sm border-none cursor-pointer"
      >
        Registrarse
      </button>
    </div>
  )
}
