'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRight, Mail, X, User } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useWebNavMenu } from '@/contexts/WebNavMenuContext'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { daColors, daType } from '@/features/web/digital-azul/home/homeTheme'
import {
  HIGHLIGHTED_CTAS,
  HEADER_NAV_ITEMS,
  isNavItemActive,
} from '@/features/web/digital-azul/navigation/webNav'

export default function WebMobileMenu() {
  const pathname = usePathname()
  const { isOpen, closeMenu } = useWebNavMenu()
  const { data: session } = useSession()
  const { openLogin } = useAuthModal()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
        onClick={closeMenu}
        aria-hidden
      />
      <aside
        className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col lg:hidden"
        style={{
          width: 'min(320px, 88vw)',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
      >
        <div
          className="flex items-center justify-between px-5 border-b"
          style={{ height: 'var(--navbar-height)', borderColor: 'hsl(214, 20%, 92%)' }}
        >
          <span style={{ ...daType.nav, fontWeight: 700, color: '#0A0A0A' }}>
            Menú
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú"
            style={{
              width: '36px', height: '36px', borderRadius: '10px', border: 'none',
              backgroundColor: '#f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {HEADER_NAV_ITEMS.map(item => {
            const active = isNavItemActive(pathname, item)

            return (
              <div key={item.key} className="mb-1">
                <Link
                  href={item.url}
                  onClick={closeMenu}
                  className="no-underline flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
                  style={{
                    ...daType.nav,
                    fontWeight: active ? 700 : 600,
                    color: active ? 'var(--web-primary, #2563EB)' : '#334155',
                    backgroundColor: active ? 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.08)' : 'transparent',
                  }}
                >
                  <item.icon size={20} />
                  {item.title}
                </Link>
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: 'hsl(214, 20%, 92%)' }}>
          <Link
            href={HIGHLIGHTED_CTAS.contact.url}
            onClick={closeMenu}
            className="no-underline text-center rounded-xl py-3 font-semibold inline-flex items-center justify-center gap-2"
            style={{
              ...daType.navSm,
              fontWeight: 600,
              color: daColors.blue,
              border: `1.5px solid ${daColors.blue}`,
              backgroundColor: pathname.startsWith('/contacto') ? 'rgba(11,58,130,0.06)' : '#ffffff',
            }}
          >
            <Mail size={16} />
            {HIGHLIGHTED_CTAS.contact.label}
          </Link>
          <Link
            href={HIGHLIGHTED_CTAS.campus.url}
            onClick={closeMenu}
            className="no-underline text-center rounded-xl py-3 font-bold text-white flex items-center justify-center gap-2"
            style={{
              ...daType.navSm,
              fontWeight: 700,
              backgroundColor: daColors.blueDark,
            }}
          >
            {HIGHLIGHTED_CTAS.campus.label}
            <ChevronRight size={16} />
          </Link>
          {!session && (
            <button
              onClick={() => { closeMenu(); openLogin(); }}
              className="text-center rounded-xl py-3 font-semibold inline-flex items-center justify-center gap-2 mt-1"
              style={{
                ...daType.navSm,
                fontWeight: 600,
                color: '#334155',
                border: '1.5px solid #E2E8F0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <User size={16} />
              Iniciar sesión
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
