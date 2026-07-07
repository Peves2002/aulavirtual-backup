'use client'

import { useRef, useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import { ChevronDown, ChevronRight, LogIn, UserPlus, User, LayoutDashboard, BookMarked, LogOut } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'
import {
  HIGHLIGHTED_CTAS,
  MAIN_NAV_ITEMS,
  SOLUCIONES_NAV_ITEMS,
  isNavItemActive,
  isSolucionesActive,
} from '@/features/web/digital-azul/navigation/webNav'

export default function LeftSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [solucionesOpen, setSolucionesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ bottom: 0, left: 0 })
  const { data: session } = useSession()
  const userButtonRef = useRef<HTMLButtonElement>(null)
  const { openLogin, openRegister } = useAuthModal()

  const solucionesActive = isSolucionesActive(pathname)

  useEffect(() => {
    if (solucionesActive) setSolucionesOpen(true)
  }, [solucionesActive])

  const handleUserClick = () => {
    if (userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect()

      setMenuPos({ bottom: window.innerHeight - rect.bottom, left: rect.right + 8 })
    }

    setUserMenuOpen(o => !o)
  }

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await signOut({ redirect: false })
    router.push('/campus?auth=login')
  }

  const user = session?.user as { nombre?: string; apellido?: string; avatar?: string; rol?: string } | undefined

  return (
    <>
      <aside
        className="fixed left-0 bottom-0 hidden sm:flex flex-col items-start py-4 gap-0.5 overflow-hidden shadow-xl transition-all duration-300 ease-in-out"
        style={{
          top: 'var(--navbar-height)',
          width: expanded ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--web-dark, #1E40AF)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          zIndex: 40,
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false)
          if (!solucionesActive) setSolucionesOpen(false)
        }}
      >
        {MAIN_NAV_ITEMS.map(item => {
          const active = isNavItemActive(pathname, item)
          const isSoluciones = item.key === 'soluciones'

          if (isSoluciones) {
            return (
              <div key={item.key} className="w-full">
                <button
                  type="button"
                  onClick={() => setSolucionesOpen(o => !o)}
                  className="flex items-center w-full px-4 transition-colors duration-200 relative border-none cursor-pointer"
                  style={{
                    height: '52px',
                    color: active ? 'var(--web-light, #38BDF8)' : '#ffffff',
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  {active && (
                    <div
                      className="absolute left-0 rounded-r-full"
                      style={{ width: '4px', height: '28px', backgroundColor: 'var(--web-light, #38BDF8)' }}
                    />
                  )}
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      minWidth: '48px',
                      height: '48px',
                      backgroundColor: active ? 'var(--web-light, #38BDF8)' : 'transparent',
                      color: active ? '#0A0A0A' : 'inherit',
                    }}
                  >
                    <item.icon style={{ width: '22px', height: '22px' }} />
                  </div>
                  <span
                    className="ml-3 text-sm whitespace-nowrap overflow-hidden flex-1 text-left"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      opacity: expanded ? 1 : 0,
                      maxWidth: expanded ? '140px' : '0px',
                      transition: 'opacity 0.2s, max-width 0.3s',
                    }}
                  >
                    {item.title}
                  </span>
                  {expanded ? (
                    solucionesOpen ? <ChevronDown size={16} style={{ marginRight: '8px' }} /> : <ChevronRight size={16} style={{ marginRight: '8px' }} />
                  ) : null}
                </button>

                {(solucionesOpen || solucionesActive) && expanded ? (
                  <div className="w-full pb-1">
                    {SOLUCIONES_NAV_ITEMS.map(sub => {
                      const subActive = pathname.startsWith(sub.url)

                      return (
                        <Link
                          key={sub.url}
                          href={sub.url}
                          className="no-underline flex items-center w-full pl-14 pr-4 py-2 transition-colors"
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: subActive ? 700 : 500,
                            color: subActive ? 'var(--web-light, #38BDF8)' : 'rgba(255,255,255,0.75)',
                          }}
                        >
                          {sub.title}
                        </Link>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          }

          return (
            <Link
              key={item.key}
              href={item.url}
              className="no-underline flex items-center w-full px-4 transition-colors duration-200 relative"
              style={{
                height: '52px',
                color: active ? 'var(--web-light, #38BDF8)' : '#ffffff',
                fontWeight: active ? 700 : 500,
                backgroundColor: active ? 'rgba(255,255,255,0.05)' : 'transparent',
              }}
            >
              {active && (
                <div
                  className="absolute left-0 rounded-r-full"
                  style={{ width: '4px', height: '28px', backgroundColor: 'var(--web-light, #38BDF8)' }}
                />
              )}
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  minWidth: '48px',
                  height: '48px',
                  backgroundColor: active ? 'var(--web-light, #38BDF8)' : 'transparent',
                  color: active ? '#0A0A0A' : 'inherit',
                }}
              >
                <item.icon style={{ width: '22px', height: '22px' }} />
              </div>
              <span
                className="ml-3 text-sm whitespace-nowrap overflow-hidden"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  opacity: expanded ? 1 : 0,
                  maxWidth: expanded ? '160px' : '0px',
                  transition: 'opacity 0.2s, max-width 0.3s',
                }}
              >
                {item.title}
              </span>
            </Link>
          )
        })}

        {/* CTAs sidebar */}
        <div className="mt-2 px-3 w-full">
          <Link
            href={HIGHLIGHTED_CTAS.campus.url}
            className="no-underline flex items-center w-full rounded-xl px-3 mb-2 transition-all"
            style={{
              height: '44px',
              gap: '12px',
              backgroundColor: 'var(--web-light, #38BDF8)',
            }}
          >
            <div style={{ flexShrink: 0, minWidth: '30px', display: 'flex', justifyContent: 'center' }}>
              <GraduationCapIcon />
            </div>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#0A0A0A',
                opacity: expanded ? 1 : 0,
                maxWidth: expanded ? '160px' : '0px',
                transition: 'opacity 0.2s, max-width 0.3s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {HIGHLIGHTED_CTAS.campus.label}
            </span>
          </Link>
        </div>

        {/* User / auth */}
        <div className="mt-auto px-3 w-full" style={{ paddingBottom: '16px', position: 'relative' }}>
          {session?.user && userMenuOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setUserMenuOpen(false)} />
              <div style={{
                position: 'fixed',
                bottom: menuPos.bottom,
                left: menuPos.left,
                width: '240px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                border: '1px solid hsl(214,20%,91%)',
                zIndex: 50,
                overflow: 'hidden',
              }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid hsl(214,20%,93%)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {user?.avatar ? (
                      <Image src={user.avatar} alt="avatar" width={38} height={38} style={{ objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 800, color: '#fff' }}>
                        {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#0A0A0A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                    </p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <div style={{ padding: '6px' }}>
                  {[
                    { label: 'Mi Perfil', icon: User, href: '/perfil' },
                    ...(user?.rol === 'ADMIN' ? [{ label: 'Panel de Administración', icon: LayoutDashboard, href: '/admin/dashboard' }] : []),
                    ...(user?.rol === 'ESTUDIANTE' ? [{ label: 'Mis Cursos', icon: BookMarked, href: '/estudiante/mis-cursos' }] : []),
                  ].map(({ label, icon: Icon, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setUserMenuOpen(false)}
                      className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                      style={{ color: '#374151', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid hsl(214,20%,93%)', marginTop: '6px', paddingTop: '6px' }}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: '#fef2f2', color: '#dc2626', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700 }}
                    >
                      <LogOut size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {session?.user ? (
            <button
              ref={userButtonRef}
              type="button"
              onClick={handleUserClick}
              className="flex items-center gap-3 rounded-xl px-3 py-3 w-full transition-colors"
              style={{ backgroundColor: userMenuOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
            >
              <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)' }}>
                {user?.avatar ? (
                  <Image src={user.avatar} alt="avatar" width={36} height={36} style={{ objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 800, color: '#fff' }}>
                    {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                  </span>
                )}
              </div>
              <div style={{ overflow: 'hidden', textAlign: 'left', opacity: expanded ? 1 : 0, maxWidth: expanded ? '160px' : '0px', transition: 'opacity 0.2s, max-width 0.3s', whiteSpace: 'nowrap' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                </p>
              </div>
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => openLogin()}
                className="flex items-center w-full rounded-xl px-3 transition-all"
                style={{ height: '40px', gap: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              >
                <div style={{ flexShrink: 0, minWidth: '30px', display: 'flex', justifyContent: 'center' }}>
                  <LogIn size={18} color="rgba(255,255,255,0.7)" />
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', opacity: expanded ? 1 : 0, maxWidth: expanded ? '160px' : '0px', transition: 'opacity 0.2s, max-width 0.3s', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  Iniciar sesión
                </span>
              </button>
              <button
                type="button"
                onClick={() => openRegister()}
                className="flex items-center w-full rounded-xl px-3 transition-all"
                style={{ height: '40px', gap: '12px', backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
              >
                <div style={{ flexShrink: 0, minWidth: '30px', display: 'flex', justifyContent: 'center' }}>
                  <UserPlus size={18} color="#ffffff" />
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', opacity: expanded ? 1 : 0, maxWidth: expanded ? '160px' : '0px', transition: 'opacity 0.2s, max-width 0.3s', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  Registrarse
                </span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function GraduationCapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
    </svg>
  )
}
