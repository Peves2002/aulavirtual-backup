'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'

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
  empresasHabilitado?: boolean
}

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/cursos', label: 'Programas' },
  { to: '/rutas', label: 'Paquetes' },
  { to: '/verificar-certificado', label: 'Certificado' },
  { to: '/contacto', label: 'Contacto' },
] as const

export default function WebHeader({ initialCategories = [], platformName = 'Aula Virtual', platformSlogan = 'Institute' }: WebHeaderProps) {
  void initialCategories
  void platformSlogan
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const configs = useConfig()
  const name = configs.TEMPLATE_NAME || platformName
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()


  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pagina/logo.png"
            alt={name}
            style={{ height: '44px', width: 'auto', objectFit: 'contain', maxWidth: '160px' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map(l => (
            <Link
              key={l.to}
              href={l.to}
              className="story-link text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground no-underline"
              data-active={l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: cart + auth */}
        <div className="hidden items-center gap-2 md:flex">
          <CartIcon />
          {session ? (
            <UserDropdown />
          ) : (
            <>
              <button
                onClick={() => openLogin()}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-foreground transition-base hover:bg-muted"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => openRegister()}
                className="rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-base hover:shadow-glow"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="rounded-lg p-2 text-foreground md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map(l => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted no-underline"
              >
                {l.label}
              </Link>
            ))}
            {!session && (
              <div className="mt-2 flex flex-col gap-2">
                <button
                  onClick={() => { setOpen(false); openLogin() }}
                  className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-foreground hover:bg-muted"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => { setOpen(false); openRegister() }}
                  className="rounded-full bg-orange-gradient px-5 py-3 text-center text-sm font-bold text-white"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Registrarse
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
