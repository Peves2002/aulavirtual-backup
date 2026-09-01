'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Menu, Mail, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

import UserDropdown from '@components/layout/shared/UserDropdown'
import CartIcon from '@/features/web/cart/components/CartIcon'
import WebBrandLogo from '@/features/web/digital-azul/components/WebBrandLogo'

import { useAuthModal } from '@/contexts/AuthModalContext'
import { useWebNavMenu } from '@/contexts/WebNavMenuContext'
import {
  HIGHLIGHTED_CTAS,
  HEADER_NAV_ITEMS,
  isNavItemActive,
} from '@/features/web/digital-azul/navigation/webNav'

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

export default function WebHeader({
  initialCategories = [],
  platformName = 'Digital Azul',
  platformSlogan = 'Conocimiento que impulsa capacidades',
}: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan

  const pathname = usePathname()
  const { data: session } = useSession()
  const { openLogin } = useAuthModal()
  const { toggleMenu } = useWebNavMenu()

  const navLinkStyle = (active: boolean) => ({
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
  })

  return (
    <header
      data-scroll-lock-fixed
      className="fixed top-0 left-0 right-0 bg-white z-50"
      style={{ height: 'var(--navbar-height)', borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
    >
      <div
        className="h-full mx-auto px-4 md:px-6 lg:px-8 grid items-center gap-4"
        style={{ maxWidth: '1280px', gridTemplateColumns: 'auto 1fr auto' }}
      >
        <WebBrandLogo />

        {/* Navegación desktop — centrada */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5 min-w-0">
          {HEADER_NAV_ITEMS.map(item => {
            const active = isNavItemActive(pathname, item)

            return (
              <Link
                key={item.key}
                href={item.url}
                className="no-underline px-3 py-2 rounded-lg transition-colors whitespace-nowrap hover:bg-slate-50"
                style={navLinkStyle(active)}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* CTAs + auth + mobile menu */}
        <div className="flex items-center justify-end gap-2 sm:gap-2.5 flex-shrink-0">
          <Link
            href={HIGHLIGHTED_CTAS.contact.url}
            className="no-underline hidden md:inline-flex items-center gap-1.5 px-[14px] py-[8px] rounded-[10px] font-medium transition-all hover:bg-slate-50"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '16px',
              color: 'var(--color-primary)',
              border: `1px solid var(--color-primary)`,
              backgroundColor: '#ffffff',
            }}
          >
            <Mail size={16} />
            {HIGHLIGHTED_CTAS.contact.label}
          </Link>

          <Link
            href={session ? '/campus' : HIGHLIGHTED_CTAS.campus.url}
            className="no-underline hidden sm:inline-flex items-center justify-center gap-1.5 p-[8px] sm:px-[14px] sm:py-[8px] rounded-[10px] font-medium text-white shadow-sm transition-all hover:opacity-90"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '16px',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
            }}
          >
            <User size={18} />
            <span className="hidden xl:inline">{HIGHLIGHTED_CTAS.campus.label}</span>
            <span className="xl:hidden hidden sm:inline">Campus</span>
          </Link>

          <CartIcon />

          {session ? (
            <div className="hidden sm:block">
              <UserDropdown />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openLogin()}
              aria-label="Iniciar sesión"
              className="hidden sm:flex items-center justify-center rounded-full transition-colors hover:bg-slate-100"
              style={{
                width: '36px',
                height: '36px',
                border: `1px solid var(--color-primary)`,
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                color: 'var(--color-primary)',
              }}
            >
              <User size={18} strokeWidth={2} />
            </button>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center rounded-lg"
            aria-label="Abrir menú"
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <Menu size={20} color="#334155" />
          </button>
        </div>
      </div>
    </header>
  )
}
