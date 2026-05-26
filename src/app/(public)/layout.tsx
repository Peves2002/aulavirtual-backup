import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import Logo from '@components/layout/shared/Logo'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50 flex items-center justify-between px-6 md:px-10 h-20 transition-all">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Logo />
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">Inicio</Link>
          <Link href="/nosotros" className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">Nosotros</Link>
          <Link href="/servicios" className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">Servicios</Link>
          <Link href="/cursos" className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">Cursos</Link>
          <Link href="/contacto" className="text-gray-600 hover:text-[var(--web-primary)] font-medium no-underline transition-colors text-sm">Contacto</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-gray-700 hover:text-[var(--web-primary)] font-semibold no-underline text-sm transition-colors">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="bg-gradient-to-r from-[var(--web-primary)] to-[#1f7d6d] text-white font-semibold py-2.5 px-6 rounded-full hover:shadow-[0_4px_14px_rgba(37,146,127,0.4)] hover:-translate-y-0.5 transition-all text-sm no-underline">
            Registrarse
          </Link>
        </div>
      </header>
      <main className="flex-1 mt-16">
        {children}
      </main>
      <footer className="bg-[#0f172a] pt-20 pb-8 text-gray-400 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--web-primary)] to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--web-primary)] opacity-5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16 mb-8 relative z-10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" className="inline-block mb-6 bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Logo />
            </Link>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-sm">
              Desde 2006, brindamos soluciones integrales en Prevención de Riesgos, Control de Operaciones y Respuesta a Emergencias.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[var(--web-primary)] hover:border-[var(--web-primary)] hover:text-white transition-all text-gray-400">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[var(--web-primary)] hover:border-[var(--web-primary)] hover:text-white transition-all text-gray-400">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[var(--web-primary)] hover:border-[var(--web-primary)] hover:text-white transition-all text-gray-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Explorar</h4>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors no-underline flex items-center gap-2 group"><span className="text-[var(--web-primary)] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 w-3">—</span>Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition-colors no-underline flex items-center gap-2 group"><span className="text-[var(--web-primary)] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 w-3">—</span>Nosotros</Link></li>
              <li><Link href="/servicios" className="hover:text-white transition-colors no-underline flex items-center gap-2 group"><span className="text-[var(--web-primary)] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 w-3">—</span>Servicios</Link></li>
              <li><Link href="/cursos" className="hover:text-white transition-colors no-underline flex items-center gap-2 group"><span className="text-[var(--web-primary)] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 w-3">—</span>Cursos</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="text-[var(--web-primary)] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed group-hover:text-gray-300 transition-colors">Callao, Callao, Bellavista.<br/>Francisco Pizarro 312</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-[var(--web-primary)] flex-shrink-0" />
                <a href="https://wa.me/51965052858" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline">965 052 858</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-[var(--web-primary)] flex-shrink-0" />
                <a href="mailto:comercial@ifsec.pe" className="hover:text-white transition-colors no-underline">comercial@ifsec.pe</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Suscríbete</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Recibe las últimas noticias y actualizaciones sobre nuestros cursos y servicios.
            </p>
            <div className="relative flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--web-primary)] focus:bg-white/10 transition-all placeholder:text-gray-500"
              />
              <button 
                type="button" 
                className="w-full bg-[var(--web-primary)] text-white font-semibold py-3 px-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#1f7d6d] transition-colors mt-2"
              >
                Suscribirse <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} IFSEC Group. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors no-underline">Política de Privacidad</Link>
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors no-underline">Términos y Condiciones</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
