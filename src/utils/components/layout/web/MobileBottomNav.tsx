'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Menu } from 'lucide-react'

import { useWebNavMenu } from '@/contexts/WebNavMenuContext'
import {
  MAIN_NAV_ITEMS,
  MOBILE_BOTTOM_NAV_KEYS,
  isNavItemActive,
} from '@/features/web/digital-azul/navigation/webNav'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { toggleMenu } = useWebNavMenu()

  const navItems = MAIN_NAV_ITEMS.filter(item =>
    (MOBILE_BOTTOM_NAV_KEYS as readonly string[]).includes(item.key),
  )

  return (
    <nav
      data-scroll-lock-fixed
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around sm:hidden z-50"
      style={{
        height: '64px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid hsl(214, 20%, 88%)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {navItems.map(item => {
        const active = isNavItemActive(pathname, item)

        return (
          <Link
            key={item.key}
            href={item.url}
            className="no-underline flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
            style={{ color: active ? 'var(--web-primary, #2563EB)' : '#94a3b8' }}
          >
            <div
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: '36px',
                height: '28px',
                backgroundColor: active ? 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.1)' : 'transparent',
              }}
            >
              <item.icon size={active ? 22 : 20} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.625rem',
                fontWeight: active ? 700 : 500,
                lineHeight: 1,
              }}
            >
              {item.title}
            </span>
          </Link>
        )
      })}

      <button
        type="button"
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center gap-1 flex-1 h-full border-none bg-transparent cursor-pointer"
        style={{ color: '#94a3b8' }}
        aria-label="Abrir menú completo"
      >
        <div className="flex items-center justify-center rounded-xl" style={{ width: '36px', height: '28px' }}>
          <Menu size={20} />
        </div>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.625rem', fontWeight: 500, lineHeight: 1 }}>
          Más
        </span>
      </button>
    </nav>
  )
}
