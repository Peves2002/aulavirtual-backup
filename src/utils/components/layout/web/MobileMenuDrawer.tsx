'use client'

import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import { Drawer, IconButton } from '@mui/material'

import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Award,
  Building2,
  Map,
  BookText,
  LogIn,
  UserPlus,
  User,
  LayoutDashboard,
  BookMarked,
  LogOut,
} from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import { useAuthModal } from '@/contexts/AuthModalContext'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'

const ALL_NAV_ITEMS = [
  { title: 'Inicio', url: '/', icon: Home, key: 'inicio' },
  { title: 'Cursos', url: '/cursos', icon: BookOpen, key: 'cursos' },
  ...(isFeatureEnabled('ebooks') ? [{ title: 'Ebooks', url: '/ebooks', icon: BookText, key: 'ebooks' as const }] : []),
  { title: 'Rutas', url: '/rutas', icon: Map, key: 'rutas' as const },
  { title: 'Empresas', url: '/empresas', icon: Building2, key: 'empresas' },
  { title: 'Nosotros', url: '/nosotros', icon: Users, key: 'nosotros' },
  { title: 'Certificado', url: '/verificar-certificado', icon: Award, key: 'certificado' },
]

export default function MobileMenuDrawer({ empresasHabilitado = true }: { empresasHabilitado?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()

  const navItems = ALL_NAV_ITEMS.filter(item => item.key !== 'empresas' || empresasHabilitado)

  const isActive = (url: string) => (url === '/' ? pathname === '/' : pathname.startsWith(url))

  const close = () => setOpen(false)

  const handleLogout = async () => {
    close()
    await signOut({ redirect: false })
    router.push('/login')
  }

  const user = session?.user as any

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        className="sm:hidden"
        aria-label="Abrir menú"
        sx={{
          bgcolor: 'primary.50',
          color: 'primary.main',
          '&:hover': { bgcolor: 'primary.100' },
          borderRadius: '10px',
          width: 44,
          height: 44,
        }}
      >
        <Menu size={22} />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={close}>
        <div
          style={{
            width: '85vw',
            maxWidth: '320px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 16px',
              borderBottom: '1px solid hsl(214,20%,90%)',
            }}
          >
            <Logo />
            <IconButton onClick={close} size="small" aria-label="Cerrar menú">
              <X size={22} />
            </IconButton>
          </div>

          {/* Nav items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {navItems.map(item => {
              const active = isActive(item.url)

              return (
                <Link
                  key={item.key}
                  href={item.url}
                  onClick={close}
                  className="no-underline flex items-center gap-3"
                  style={{
                    padding: '16px 12px',
                    borderRadius: '12px',
                    marginBottom: '4px',
                    color: active ? 'var(--web-primary, #25927F)' : '#374151',
                    backgroundColor: active ? 'rgba(var(--web-primary-rgb, 37,146,127),0.08)' : 'transparent',
                    fontWeight: active ? 700 : 600,
                    fontSize: '1.0625rem',
                  }}
                >
                  <item.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                  {item.title}
                </Link>
              )
            })}
          </div>

          {/* Footer: auth */}
          <div style={{ padding: '16px', borderTop: '1px solid hsl(214,20%,90%)' }}>
            {session?.user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 4px 12px' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: 'var(--web-primary, #25927F)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {user?.avatar ? (
                      <Image src={user.avatar} alt="avatar" width={36} height={36} style={{ objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>
                        {(user?.nombre?.[0] || session.user.name?.[0] || '?').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#0A0A0A',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {user?.nombre ? `${user.nombre} ${user.apellido || ''}`.trim() : session.user.name}
                  </p>
                </div>

                <Link
                  href="/perfil"
                  onClick={close}
                  className="no-underline flex items-center gap-3"
                  style={{ padding: '10px 8px', color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  <User size={18} /> Mi Perfil
                </Link>

                {user?.rol === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    onClick={close}
                    className="no-underline flex items-center gap-3"
                    style={{ padding: '10px 8px', color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}
                  >
                    <LayoutDashboard size={18} /> Panel de Administración
                  </Link>
                )}

                {user?.rol === 'ESTUDIANTE' && (
                  <Link
                    href="/estudiante/mis-cursos"
                    onClick={close}
                    className="no-underline flex items-center gap-3"
                    style={{ padding: '10px 8px', color: '#374151', fontWeight: 600, fontSize: '0.875rem' }}
                  >
                    <BookMarked size={18} /> Mis Cursos
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    marginTop: '6px',
                  }}
                >
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => {
                    close()
                    openLogin()
                  }}
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--web-primary, #25927F)',
                    backgroundColor: 'transparent',
                    color: 'var(--web-primary, #25927F)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <LogIn size={18} /> Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    close()
                    openRegister()
                  }}
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: 'var(--web-primary, #25927F)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <UserPlus size={18} /> Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}
