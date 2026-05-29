'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Home, BookOpen, Users, Award, GraduationCap, Route, X, LayoutGrid, ChevronRight } from 'lucide-react'

import type { NavCategory } from './LeftSidebar'

const ALL_NAV_ITEMS = [
  { key: 'inicio', title: 'Inicio', url: '/', icon: Home },
  { key: 'cursos', title: 'Cursos', url: '/cursos', icon: BookOpen },
  { key: 'diplomados', title: 'Diplomados', url: '/diplomados', icon: GraduationCap },
  { key: 'rutas', title: 'Rutas', url: '/rutas', icon: Route },
  { key: 'nosotros', title: 'Nosotros', url: '/nosotros', icon: Users },
  { key: 'certificado', title: 'Certificado', url: '/verificar-certificado', icon: Award },
]

export default function MobileBottomNav({
  rutasHabilitado = true,
  categories = [],
}: {
  rutasHabilitado?: boolean
  categories?: NavCategory[]
}) {
  const pathname = usePathname()
  const [openPanel, setOpenPanel] = useState<'cursos' | 'diplomados' | null>(null)

  const navItems = ALL_NAV_ITEMS.filter(item => {
    if (item.key === 'rutas' && !rutasHabilitado) return false

    return true
  })

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'

    return pathname.startsWith(url)
  }

  return (
    <>
      {/* Categories bottom sheet */}
      {openPanel && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 55, backgroundColor: 'rgba(0,0,0,0.45)' }}
            onClick={() => setOpenPanel(null)}
          />
          <div
            style={{
              position: 'fixed',
              bottom: '64px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderRadius: '20px 20px 0 0',
              zIndex: 56,
              maxHeight: '60vh',
              overflowY: 'auto',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.15)',
            }}
          >
            {/* Sheet header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px 12px',
              borderBottom: '1px solid hsl(214,20%,93%)',
              position: 'sticky',
              top: 0,
              backgroundColor: '#ffffff',
              zIndex: 1,
            }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                {openPanel === 'diplomados' ? 'Diplomados por categoría' : 'Cursos por categoría'}
              </span>
              <button
                onClick={() => setOpenPanel(null)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ padding: '8px 12px 16px' }}>
              <Link
                href={`/${openPanel}`}
                onClick={() => setOpenPanel(null)}
                className="no-underline flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ color: 'var(--web-primary, #25927F)', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 700, backgroundColor: 'rgba(var(--web-primary-rgb,37,146,127),0.08)', marginBottom: '4px' }}
              >
                <LayoutGrid size={18} />
                {openPanel === 'diplomados' ? 'Todos los diplomados' : 'Todos los cursos'}
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/${openPanel}?categoria=${cat.slug}`}
                  onClick={() => setOpenPanel(null)}
                  className="no-underline flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ color: '#374151', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500 }}
                  onTouchStart={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(214,20%,96%)' }}
                  onTouchEnd={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                >
                  <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                  {cat.nombre}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around sm:hidden z-50"
        style={{
          height: '64px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid hsl(214, 20%, 88%)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {navItems.map(item => {
          const active = isActive(item.url)

          if (item.key === 'cursos' || item.key === 'diplomados') {
            const isOpen = openPanel === item.key

            return (
              <button
                key={item.key}
                onClick={() => setOpenPanel(p => p === item.key ? null : item.key as 'cursos' | 'diplomados')}
                className="no-underline flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
                style={{
                  color: active || isOpen ? 'var(--web-primary, #25927F)' : '#94a3b8',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{
                    width: '36px',
                    height: '28px',
                    backgroundColor: active || isOpen ? 'rgba(var(--web-primary-rgb, 37, 146, 127),0.1)' : 'transparent',
                  }}
                >
                  <item.icon size={active || isOpen ? 22 : 20} strokeWidth={active || isOpen ? 2.5 : 1.8} />
                </div>
                <span
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: active || isOpen ? 700 : 500,
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.title}
              href={item.url}
              className="no-underline flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
              style={{ color: active ? 'var(--web-primary, #25927F)' : '#94a3b8' }}
            >
              <div
                className="flex items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  width: '36px',
                  height: '28px',
                  backgroundColor: active ? 'rgba(var(--web-primary-rgb, 37, 146, 127),0.1)' : 'transparent',
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
      </nav>
    </>
  )
}
