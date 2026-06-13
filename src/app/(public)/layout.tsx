import React from 'react'

import Link from 'next/link'

import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'

import Logo from '@components/layout/shared/Logo'
import { AuthModalProvider } from '@/contexts/AuthModalContext'
import PublicHeader from './PublicHeader'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
    <div className="min-h-screen bg-white flex flex-col">
      <PublicHeader />
      <main className="flex-1">
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
          
          {/* Validar Certificado Column */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Certificados</h4>
            <p className="text-sm mb-6 leading-relaxed">
              Verifica la autenticidad de un certificado emitido por IFSEC Group escaneando el código QR o ingresando el código.
            </p>
            <Link
              href="/verificar-certificado"
              className="inline-flex items-center gap-2 bg-[var(--web-primary)] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1f7d6d] transition-colors no-underline"
            >
              <ShieldCheck size={18} />
              Validar Certificado
            </Link>
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
    </AuthModalProvider>
  )
}
