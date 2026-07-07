'use client'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

import { ArrowRight, BookOpen, KeyRound, LayoutDashboard, LogIn, Map, BarChart3 } from 'lucide-react'

import { useAuthModal } from '@/contexts/AuthModalContext'

type CampusLink = {
  label: string
  href: string
  icon: typeof BookOpen
  description: string
}

function getCampusLinks(rol?: string): CampusLink[] {
  const common: CampusLink[] = [
    { label: 'Inicio Campus', href: '/estudiante/dashboard', icon: LayoutDashboard, description: 'Tu pantalla principal de aprendizaje' },
    { label: 'Mis programas', href: '/estudiante/mis-cursos', icon: BookOpen, description: 'Accede a tus programas y capacitaciones' },
    { label: 'Catálogo de cursos', href: '/cursos', icon: BookOpen, description: 'Explora capacitaciones disponibles' },
    { label: 'Rutas de aprendizaje', href: '/rutas', icon: Map, description: 'Programas curados por competencias' },
  ]

  if (rol === 'ADMIN') {
    return [
      { label: 'Panel de administración', href: '/admin/dashboard', icon: LayoutDashboard, description: 'Gestión académica y reportes' },
      ...common,
    ]
  }

  if (rol === 'PROFESOR') {
    return [
      { label: 'Mis cursos dictados', href: '/profesor/mis-cursos', icon: LayoutDashboard, description: 'Gestiona tus programas' },
      ...common.filter(l => l.href !== '/estudiante/mis-cursos'),
    ]
  }

  if (rol === 'ESTUDIANTE') {
    return [
      ...common,
      { label: 'Mis certificados', href: '/estudiante/mis-certificados', icon: BarChart3, description: 'Consulta tus certificaciones' },
    ]
  }

  return common
}

export default function CampusClient() {
  const { data: session, status } = useSession()
  const { openLogin, openRegister } = useAuthModal()
  const user = session?.user as { rol?: string } | undefined
  const links = getCampusLinks(user?.rol)

  if (status === 'loading') {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#64748b' }}>
        Cargando Campus Digital Azul...
      </div>
    )
  }

  if (!session) {
    return (
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              border: '1px solid hsl(214, 20%, 92%)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                backgroundColor: 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <LogIn size={28} color="var(--web-primary, #2563EB)" />
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0A0A0A' }}>
              Accede al Campus Digital Azul
            </h2>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>
              Inicia sesión para acceder a tus programas, cursos, evaluaciones y certificados.
            </p>

            <button
              type="button"
              onClick={() => openLogin()}
              className="w-full mb-3 rounded-xl py-3 font-bold text-white border-none cursor-pointer"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--web-primary, #2563EB)' }}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => openRegister()}
              className="w-full mb-4 rounded-xl py-3 font-semibold cursor-pointer"
              style={{
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: 'transparent',
                color: 'var(--web-primary, #2563EB)',
                border: '1.5px solid var(--web-primary, #2563EB)',
              }}
            >
              Crear cuenta
            </button>

            <Link
              href="/forgot-password"
              className="no-underline inline-flex items-center gap-2 justify-center"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}
            >
              <KeyRound size={16} />
              Recuperar contraseña
            </Link>
          </div>

          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#64748b', marginTop: '2rem' }}>
            ¿Aún no tienes acceso?{' '}
            <Link href="/cursos" className="no-underline font-semibold" style={{ color: 'var(--web-primary, #2563EB)' }}>
              Explora las capacitaciones disponibles
            </Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#64748b', marginBottom: '2rem', textAlign: 'center' }}>
          Bienvenido al Campus Digital Azul. Selecciona dónde deseas continuar:
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="no-underline block rounded-2xl p-5 transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid hsl(214, 20%, 92%)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(var(--web-primary-rgb, 37, 99, 235), 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <link.icon size={22} color="var(--web-primary, #2563EB)" />
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', marginBottom: '0.375rem' }}>
                {link.label}
              </h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--web-primary, #2563EB)' }}>
                Acceder <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
