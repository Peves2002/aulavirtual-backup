'use client'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import { Home, BookOpen, Users, Award, Map, Building2, LogIn, UserPlus, User, LayoutDashboard, BookMarked, LogOut, Menu, X, ChevronDown, ClipboardList } from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import CartIcon from '@/features/web/cart/components/CartIcon'
import { useAuthModal } from '@/contexts/AuthModalContext'

export interface Category {
  id: string
  nombre: string
  slug: string
}

interface WebHeaderProps {
  initialCategories?: Category[]
  platformName?: string
  platformSlogan?: string
  rutasHabilitado?: boolean
  empresasHabilitado?: boolean
}

const ALL_NAV_ITEMS = [
  { title: 'Inicio', url: '/', icon: Home, key: 'inicio' },
  { title: 'Cursos', url: '/cursos', icon: BookOpen, key: 'cursos' },
  { title: 'Simulacros', url: '/simulacros', icon: ClipboardList, key: 'simulacros' },
  { title: 'Rutas', url: '/rutas', icon: Map, key: 'rutas' },
  { title: 'Empresas', url: '/empresas', icon: Building2, key: 'empresas' },
  { title: 'Nosotros', url: '/nosotros', icon: Users, key: 'nosotros' },
  { title: 'Certificado', url: '/verificar-certificado', icon: Award, key: 'certificado' },
]

export default function WebHeader({
  initialCategories = [],
  platformName = 'Aula Virtual',
  platformSlogan = 'Aprende sin límites',
  rutasHabilitado = true,
  empresasHabilitado = true,
}: WebHeaderProps) {
  void initialCategories
  void platformName
  void platformSlogan

  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const userButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ALL_NAV_ITEMS.filter(item => {
    if (item.key === 'rutas' && !rutasHabilitado) return false
    if (item.key === 'empresas' && !empresasHabilitado) return false

    return true
  })

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/'

    return pathname.startsWith(url)
  }

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await signOut({ redirect: false })
    router.push('/login')
  }

  const user = session?.user as any

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          height: 'var(--navbar-height)',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.75)' : '#000000',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.05)',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
          <Logo />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const active = isActive(item.url)

            return (
              <Link
                key={item.key}
                href={item.url}
                className="no-underline flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: active ? 'var(--web-light, #F0D060)' : 'rgba(255,255,255,0.75)',
                  backgroundColor: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                  fontWeight: active ? 700 : 500,
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'
                }}
              >
                <item.icon size={15} />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Right: cart + user + mobile toggle */}
        <div className="flex items-center gap-2">
          <CartIcon />

          {session?.user ? (
            <div className="relative">
              <button
                ref={userButtonRef}
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors cursor-pointer"
                style={{
                  backgroundColor: userMenuOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { if (!userMenuOpen) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)' }}
              >
                <div style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {user?.avatar ? (
                    <Image src={user.avatar} alt="avatar" width={30} height={30} style={{ objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>
                      {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.nombre || session.user.name}
                </span>
                <ChevronDown size={14} color="rgba(255,255,255,0.6)" style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setUserMenuOpen(false)} />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    backgroundColor: '#1E293B',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    zIndex: 50,
                    overflow: 'hidden',
                  }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--web-primary, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {user?.avatar ? (
                          <Image src={user.avatar} alt="avatar" width={38} height={38} style={{ objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 800, color: '#fff' }}>
                            {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                        </p>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                          style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                        >
                          <Icon size={16} />
                          {label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '6px', paddingTop: '6px' }}>
                        <button
                          onClick={handleLogout}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: 'rgba(220,38,38,0.12)', color: '#f87171', fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(220,38,38,0.2)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(220,38,38,0.12)' }}
                        >
                          <LogOut size={16} />
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => openLogin()}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.8)', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => openRegister()}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#0A0A0A', backgroundColor: 'var(--web-primary, #D4AF37)', border: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#b8960c'; (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--web-primary, #D4AF37)'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A' }}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 z-50 md:hidden flex flex-col py-4 gap-1 overflow-y-auto"
            style={{
              width: '260px',
              backgroundColor: '#0F172A',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 'calc(var(--navbar-height) + 8px)',
            }}
          >
            {navItems.map(item => {
              const active = isActive(item.url)

              return (
                <Link
                  key={item.key}
                  href={item.url}
                  onClick={() => setMobileOpen(false)}
                  className="no-underline flex items-center gap-3 mx-3 px-4 py-3 rounded-xl transition-colors"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--web-light, #F0D060)' : 'rgba(255,255,255,0.8)',
                    backgroundColor: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                  }}
                >
                  <item.icon size={18} />
                  {item.title}
                </Link>
              )
            })}

            {!session?.user && (
              <div className="mx-3 mt-4 flex flex-col gap-2">
                <button
                  onClick={() => { openLogin(); setMobileOpen(false) }}
                  className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => { openRegister(); setMobileOpen(false) }}
                  className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#0A0A0A', backgroundColor: 'var(--web-light, #F0D060)', border: 'none' }}
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
