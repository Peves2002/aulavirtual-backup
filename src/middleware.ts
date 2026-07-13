import { NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'
import { Rol } from '@prisma/client'

function getRequiredPermission(path: string): string | null {
  if (path.startsWith('/admin/inscripciones')) return 'VER_INSCRIPCIONES'
  if (path.startsWith('/admin/usuarios')) return 'VER_USUARIOS'
  if (path.startsWith('/admin/roles')) return 'VER_USUARIOS'
  if (path.startsWith('/admin/categorias')) return 'VER_CATEGORIAS'
  if (path.startsWith('/admin/cursos')) return 'VER_CURSOS'
  if (path.startsWith('/admin/ebooks')) return 'VER_EBOOKS'
  if (path.startsWith('/admin/simulacros')) return 'VER_SIMULACROS'
  if (path.startsWith('/admin/rutas')) return 'VER_RUTAS'
  if (path.startsWith('/admin/pedidos')) return 'VER_PEDIDOS'
  if (path.startsWith('/admin/cupones')) return 'VER_CUPONES'
  if (path.startsWith('/admin/certificados')) return 'VER_CERTIFICADOS'
  if (path.startsWith('/admin/planes-suscripcion')) return 'VER_SUSCRIPCIONES'
  if (path.startsWith('/admin/suscripciones')) return 'VER_SUSCRIPCIONES'
  if (path.startsWith('/admin/reclamaciones')) return 'VER_RECLAMACIONES'
  if (path.startsWith('/admin/carrousel')) return 'VER_CARRUSEL'
  if (path.startsWith('/admin/edicion-web')) return 'EDITAR_CONTENIDO_WEB'
  if (path.startsWith('/admin/configuracion')) return 'VER_CONFIGURACION'
  return null
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Si tiene token y está intentando acceder a login/register
    if (token && (path.startsWith('/login') || path.startsWith('/register'))) {
      // Redirigir según rol
      const rol = token.rol as Rol
      const permisos = (token?.permisos as string[]) || []

      if (rol === Rol.ADMIN || permisos.length > 0) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url), { status: 302 })
      }

      if (rol === Rol.PROFESOR) {
        return NextResponse.redirect(new URL('/profesor/dashboard', req.url), { status: 302 })
      }

      return NextResponse.redirect(new URL('/estudiante/dashboard', req.url), { status: 302 })
    }

    // Redirigir /dashboard genérico según rol y permisos
    if (path === '/dashboard') {
      const rol = token?.rol as Rol
      const permisos = (token?.permisos as string[]) || []

      if (rol === Rol.ADMIN || permisos.length > 0) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url), { status: 302 })
      }

      if (rol === Rol.PROFESOR) {
        return NextResponse.redirect(new URL('/profesor/dashboard', req.url), { status: 302 })
      }

      return NextResponse.redirect(new URL('/estudiante/dashboard', req.url), { status: 302 })
    }

    // Verificar acceso a rutas según rol y permisos
    const rol = token?.rol as Rol
    const permisos = (token?.permisos as string[]) || []

    // Rutas de admin
    if (path.startsWith('/admin')) {
      if (rol === Rol.ADMIN) {
        return NextResponse.next()
      }

      const hasCustomPermissions = permisos.length > 0
      const isAsesor = rol === Rol.ASESOR

      if (hasCustomPermissions || isAsesor) {
        const requiredPerm = getRequiredPermission(path)

        if (!requiredPerm) {
          return NextResponse.next()
        }

        // Asesor por defecto
        if (isAsesor && !token?.rol_personalizado_nombre) {
          if (requiredPerm === 'VER_PEDIDOS' || requiredPerm === 'VER_RECLAMACIONES' || requiredPerm === 'VER_INSCRIPCIONES') {
            return NextResponse.next()
          }
        }

        if (permisos.includes(requiredPerm)) {
          return NextResponse.next()
        }
      }

      return NextResponse.redirect(new URL('/unauthorized', req.url), { status: 302 })
    }

    // Rutas de profesor - solo PROFESOR o ADMIN o usuarios autorizados a panel
    if (path.startsWith('/profesor')) {
      if (rol === Rol.ADMIN || rol === Rol.PROFESOR) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/unauthorized', req.url), { status: 302 })
    }

    // Rutas de estudiante - solo ESTUDIANTE, ASESOR o ADMIN (y PROFESOR para ver el reproductor)
    if (path.startsWith('/estudiante') && rol !== Rol.ADMIN && rol !== Rol.ESTUDIANTE && rol !== Rol.ASESOR) {
      // Excepción: Los profesores pueden acceder al reproductor para ver su curso
      if (rol === Rol.PROFESOR && path.startsWith('/estudiante/aprender')) {
        // Permitido
      } else {
        return NextResponse.redirect(new URL('/unauthorized', req.url), { status: 302 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Rutas públicas
        if (
          path.startsWith('/login') ||
          path.startsWith('/register') ||
          path.startsWith('/cursos') ||
          path.startsWith('/diplomados') ||
          path.startsWith('/especializaciones') ||
          path.startsWith('/ebooks') ||
          path.startsWith('/rutas') ||
          path.startsWith('/proyectos') ||
          path.startsWith('/mantenimiento') ||
          path.startsWith('/consultoria') ||
          path.startsWith('/capacitacion') ||
          path.startsWith('/contacto') ||
          path.startsWith('/nosotros') ||
          path.startsWith('/docentes') ||
          path.startsWith('/libro-de-reclamaciones') ||
          path.startsWith('/terminos-y-condiciones') ||
          path.startsWith('/politica-de-cambios-y-devoluciones') ||
          path.startsWith('/forgot-password') ||
          path.startsWith('/reset-password') ||
          path.startsWith('/verificar-certificado') ||
          path.startsWith('/unauthorized') ||
          path.startsWith('/assets') ||
          path.startsWith('/empresas') ||
          path.startsWith('/politica-de-devoluciones') ||
          path.startsWith('/suscripciones') ||
          path.startsWith('/hrcorex') ||
          path.startsWith('/blog') ||
          path.startsWith('/eventos') ||
          path.startsWith('/entrenamiento-digital') ||
          path.startsWith('/ficha-de-inscripcion') ||
          path.startsWith('/escuelas') ||
          path === '/'
        ) {
          return true
        }

        // Rutas protegidas requieren token
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|workbox-.*|pwa-init\\.js|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.mp4|.*\\.webm|.*\\.mkv|.*\\.gif|.*\\.pdf).*)'
  ]
}
