import Link from 'next/link'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import HydratedDate from '@/utils/components/HydratedDate'

interface WebFooterProps {
  platformName?: string
  rutasHabilitado?: boolean
}

const WebFooter = async ({ platformName = 'Aula Virtual', rutasHabilitado = true }: WebFooterProps) => {
  void rutasHabilitado
  const configs = await getConfigs()
  const name = configs.TEMPLATE_NAME || platformName
  const logoSrc = configs.TEMPLATE_LOGO || null
  const phone = configs.WHATSAPP_NUMERO || ''
  const email = configs.EMAIL_CONTACTO || ''
  const address = configs.DIRECCION || ''

  return (
    <footer className="bg-edu-pattern text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pagina/logo.png"
              alt={name}
              style={{ height: '44px', width: 'auto', objectFit: 'contain', maxWidth: '160px', filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {configs.TEMPLATE_SLOGAN || ''}
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Navegación</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {[
              { label: 'Inicio', href: '/' },
              { label: 'Cursos', href: '/cursos' },
              { label: 'Contacto', href: '/contacto' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Legal</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <li><Link href="/terminos-y-condiciones" className="footer-link">Términos y Condiciones</Link></li>
            <li><Link href="/politica-de-cambios-y-devoluciones" className="footer-link">Política de Devoluciones</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contacto</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {address && (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <span>{address}</span>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                <a href={`https://wa.me/${phone}`} className="footer-link">+{phone}</a>
              </li>
            )}
            {email && (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <a href={`mailto:${email}`} className="footer-link">{email}</a>
              </li>
            )}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <p>© <HydratedDate date={new Date()} format="year" /> {name}. Todos los derechos reservados.</p>
          {configs.TEMPLATE_SLOGAN && <p>{configs.TEMPLATE_SLOGAN}</p>}
        </div>
      </div>
    </footer>
  )
}

export default WebFooter
