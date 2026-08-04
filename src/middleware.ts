import { NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const rol = token?.rol as string | undefined

    // Si tiene token y está intentando acceder a login/register
    if (token && (path.startsWith('/login') || path.startsWith('/register'))) {
      if (rol === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', req.url), { status: 302 })
      if (rol === 'PROFESOR') return NextResponse.redirect(new URL('/profesor/dashboard', req.url), { status: 302 })
      return NextResponse.redirect(new URL('/estudiante/dashboard', req.url), { status: 302 })
    }

    // Redirigir /dashboard genérico según rol
    if (path === '/dashboard') {
      if (rol === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', req.url), { status: 302 })
      if (rol === 'PROFESOR') return NextResponse.redirect(new URL('/profesor/dashboard', req.url), { status: 302 })
      return NextResponse.redirect(new URL('/estudiante/dashboard', req.url), { status: 302 })
    }

    // Rutas de admin - solo ADMIN
    if (path.startsWith('/admin') && rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url), { status: 302 })
    }

    // Rutas de profesor - solo PROFESOR o ADMIN
    if (path.startsWith('/profesor') && rol !== 'ADMIN' && rol !== 'PROFESOR') {
      return NextResponse.redirect(new URL('/unauthorized', req.url), { status: 302 })
    }

    // Rutas de estudiante - ESTUDIANTE, ADMIN, y PROFESOR (para el reproductor)
    if (path.startsWith('/estudiante') && rol !== 'ADMIN' && rol !== 'ESTUDIANTE') {
      if (rol === 'PROFESOR' && path.startsWith('/estudiante/aprender')) {
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
          path.startsWith('/programas') ||
          path.startsWith('/marketplace') ||
          path.startsWith('/comunidad') ||
          path.startsWith('/blog') ||
          path.startsWith('/precios') ||
          path.startsWith('/afiliados') ||
          path.startsWith('/landing') ||
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
          path.startsWith('/politica-de-privacidad') ||
          path.startsWith('/forgot-password') ||
          path.startsWith('/reset-password') ||
          path.startsWith('/verificar-certificado') ||
          path.startsWith('/unauthorized') ||
          path.startsWith('/assets') ||
          path.startsWith('/empresas') ||
          path.startsWith('/politica-de-devoluciones') ||
          path.startsWith('/checkout') ||
          path.startsWith('/suscripciones') ||
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
    '/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|workbox-.*|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.mp4|.*\\.webm|.*\\.mkv|.*\\.gif).*)'
  ]
}
