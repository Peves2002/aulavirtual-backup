'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'

import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { useConfig } from '@/contexts/ConfigContext'

export interface Category {
  id: string
  nombre: string
  slug: string
}

interface WebHeaderProps {
  initialCategories?: Category[]
  platformName?: string
  platformSlogan?: string
}

export default function WebHeader({ initialCategories = [] }: WebHeaderProps) {
  void initialCategories
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const configs = useConfig()
  const primaryColor = configs.COLOR_PRIMARIO || '#02115C'
  const logoSrc = configs.TEMPLATE_LOGO || '/images/logo.png'
  const siteName = configs.TEMPLATE_NAME || 'Aula Virtual'

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50 flex items-center justify-between px-3 sm:px-6 md:px-10"
      style={{ height: 'var(--navbar-height)' }}
    >
      {/* Logo — solo imagen en móvil, imagen+nombre en sm+ */}
      <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
        <Image
          src={logoSrc}
          alt={siteName}
          width={44}
          height={44}
          style={{ objectFit: 'contain', height: '44px', width: 'auto' }}
        />
        <span
          className="hidden sm:block font-bold text-sm"
          style={{ color: primaryColor, fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}
        >
          {siteName}
        </span>
      </Link>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <CartIcon />
        {session ? (
          <UserDropdown />
        ) : (
          <>
            <Button
              onClick={() => openLogin()}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#02115C', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', minWidth: 'auto', px: { xs: 1, sm: 2 } }}
            >
              <span className="hidden xs:inline">Iniciar Sesión</span>
              <span className="xs:hidden">Login</span>
            </Button>
            <Button
              onClick={() => openRegister()}
              variant="contained"
              size="small"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                borderRadius: '8px',
                backgroundColor: primaryColor,
                whiteSpace: 'nowrap',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': { backgroundColor: primaryColor, opacity: 0.85 },
              }}
            >
              Registrarse
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
