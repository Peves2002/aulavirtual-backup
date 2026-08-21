'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'

import { Drawer, Box, IconButton, Divider } from '@mui/material'
import { X, User } from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import { useAuthModal } from '@/contexts/AuthModalContext'

interface NavItem {
  href: string
  label: string
}

interface PublicMobileNavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
}

export default function PublicMobileNavDrawer({ open, onClose, navItems }: PublicMobileNavDrawerProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { openLogin, openRegister } = useAuthModal()

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 300 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, pt: 3, pb: 2 }}>
          <Logo />
          <IconButton
            onClick={onClose}
            aria-label="Cerrar menú"
            sx={{ bgcolor: 'rgba(37,146,127,0.08)', borderRadius: '10px', width: 40, height: 40 }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 4, py: 3 }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="no-underline block"
              style={{
                padding: '12px 0',
                color: isActive(item.href) ? 'var(--web-primary, #25927F)' : '#1f2937',
                fontFamily: 'inherit',
                fontSize: '1.125rem',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>

        <Box sx={{ px: 4, pb: 4, pt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {session ? (
            <Link
              href="/perfil"
              onClick={onClose}
              className="no-underline flex items-center justify-center gap-2"
              style={{
                height: '48px',
                borderRadius: '999px',
                border: '2px solid var(--web-primary, #25927F)',
                color: 'var(--web-primary, #25927F)',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              <User size={18} />
              Mi Cuenta
            </Link>
          ) : (
            <>
              <button
                onClick={() => {
                  onClose()
                  openLogin()
                }}
                className="flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                style={{
                  height: '48px',
                  borderRadius: '999px',
                  border: '2px solid var(--web-primary, #25927F)',
                  color: 'var(--web-primary, #25927F)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  onClose()
                  openRegister()
                }}
                className="flex items-center justify-center gap-2 cursor-pointer text-white"
                style={{
                  height: '48px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'linear-gradient(to right, var(--web-primary, #25927F), #1f7d6d)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
