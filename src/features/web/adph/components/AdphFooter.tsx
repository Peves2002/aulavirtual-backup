import Link from 'next/link'

import { MapPin, Phone, Mail, ChevronRight, GraduationCap, Laptop, Sparkles } from 'lucide-react'

type IconProps = React.SVGProps<SVGSVGElement>

const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
)

const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
)

const TikTokIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
)

// Links actualizados a las rutas de aulavirtual
const PROGRAMAS_LINKS = [
  { label: 'Cursos de Especialización', href: '/programas' },
  { label: 'Diplomados Ejecutivos', href: '/diplomados' },
  { label: 'Programas de Especialización', href: '/especializaciones' },
  { label: 'Capacitaciones', href: '/capacitacion' },
]

const SOLUCIONES_LINKS = [
  { label: 'Consultoría Estratégica', href: '/consultoria' },
  { label: 'HR CoreX (Tech Suite)', href: '/hrcorex' },
  { label: 'Entrenamiento Digital', href: '/entrenamiento-digital' },
  { label: 'Empresas B2B', href: '/empresas' },
  { label: 'Sobre Nosotros', href: '/nosotros' },
]

export default function AdphFooter({ platformName = 'ADPH Group' }: { platformName?: string }) {
  return (
    <footer className="bg-[#070D19] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative gradient glowing top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3BA8C5] to-transparent" />

      {/* Background blurs for a premium dark vibe */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(59, 168, 197, 0.05)', filter: 'blur(100px)' }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Brand Column */}
          <div className="space-y-8 lg:col-span-2">
            <Link href="/" className="inline-block">
              {/* Coloca el logo en public/adph/Logo_ADPH.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/adph/Logo_ADPH.png"
                alt={platformName}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-sm font-medium">
              Líderes en Gestión Humana y Salud Ocupacional, transformando el potencial organizacional a través de soluciones académicas y tecnológicas estratégicas.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: 'https://www.facebook.com/ADPHGroup', label: 'Facebook' },
                { Icon: InstagramIcon, href: 'https://www.instagram.com/adph_group/', label: 'Instagram' },
                { Icon: LinkedinIcon, href: 'https://www.linkedin.com/company/2664738/', label: 'LinkedIn' },
                { Icon: TikTokIcon, href: 'https://www.tiktok.com/@adphgroup', label: 'TikTok' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 bg-white/5 border border-white/5 hover:bg-[#3BA8C5] hover:border-[#3BA8C5] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programas Académicos Column */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#3BA8C5]" /> Programas
            </h4>
            <ul className="space-y-4">
              {PROGRAMAS_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#3BA8C5] flex items-center gap-1 text-sm font-semibold transition-all group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#3BA8C5] flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones Column */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#3BA8C5]" /> Soluciones
            </h4>
            <ul className="space-y-4">
              {SOLUCIONES_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#3BA8C5] flex items-center gap-1 text-sm font-semibold transition-all group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#3BA8C5] flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Column */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3BA8C5]" /> Contacto
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-[#3BA8C5]" style={{ borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-400 text-xs lg:text-sm font-semibold leading-relaxed">
                  Av. Javier Prado Este 560 <br /> Of. 2302, San Isidro, Lima
                </span>
              </li>
              <li className="flex gap-3">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-[#3BA8C5]" style={{ borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+51924943982" className="text-slate-400 text-xs lg:text-sm font-semibold hover:text-[#3BA8C5] transition-colors leading-relaxed">
                  +51 924 943 982
                </a>
              </li>
              <li className="flex gap-3">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-[#3BA8C5]" style={{ borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:informes@adphgroup.com" className="text-slate-400 text-xs lg:text-sm font-semibold hover:text-[#3BA8C5] transition-colors break-all leading-relaxed">
                  informes@adphgroup.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Premium Bottom Copyright and Legal Bar */}
        <div className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 uppercase tracking-[0.25em] font-extrabold" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.6rem' }}>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} {platformName} SAC</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span>Todos los derechos reservados</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terminos-y-condiciones" className="text-slate-600 normal-case tracking-normal font-semibold text-xs hover:text-slate-400 transition-colors">
              Términos y condiciones
            </Link>
            <span className="hidden lg:block text-slate-600 normal-case tracking-normal font-semibold text-xs">
              Lima, Perú
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
