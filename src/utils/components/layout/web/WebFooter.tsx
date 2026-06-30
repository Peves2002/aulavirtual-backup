import Link from 'next/link'

import { Mail, MapPin, Phone } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import HydratedDate from '@/utils/components/HydratedDate'

interface WebFooterProps {
  platformName?: string
  rutasHabilitado?: boolean
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const WebFooter = async ({ platformName = 'Aula Virtual', rutasHabilitado = true }: WebFooterProps) => {
  void rutasHabilitado
  const configs = await getConfigs()
  const name = configs.TEMPLATE_NAME || platformName
  const phone = configs.WHATSAPP_NUMERO || '51931529171'
  const email = configs.EMAIL_CONTACTO || 'coplimitainstitute@gmail.com'
  const address = configs.DIRECCION || 'Jr. Alfonzo Peláez Bazán 240, Cajamarca, Perú'

  return (
    <footer className="bg-edu-pattern text-white">

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pagina/logo.png"
                alt={name}
                style={{ height: '44px', width: 'auto', objectFit: 'contain', maxWidth: '160px', filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '240px' }}>
              {configs.TEMPLATE_SLOGAN || 'Despierta tu talento, impulsa tu futuro.'}
            </p>

            {/* Datos legales */}
            <div className="mt-5 space-y-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <p><span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Razón Social:</span> Coop Nuevo Mundo Sermul</p>
              <p><span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>RUC:</span> 20601400384</p>
            </div>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.tiktok.com/@coplimita"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Coplimita"
                className="footer-social-icon"
              >
                <TikTokIcon />
              </a>
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Coplimita"
                className="footer-social-icon"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Programas / Servicios */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Nuestros Servicios</h4>
            <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {[
                { label: 'Diplomados', href: '/cursos' },
                { label: 'Especializaciones', href: '/cursos' },
                { label: 'Programas de Actualización', href: '/cursos' },
                { label: 'Ver todos los programas', href: '/cursos' },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institución */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Institución</h4>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Docentes', href: '/docentes' },
                { label: 'Certificados', href: '/verificar-certificado' },
                { label: 'Contacto', href: '/contacto' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Legal</h4>
            <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <li><Link href="/terminos-y-condiciones" className="footer-link">Términos y Condiciones</Link></li>
              <li><Link href="/politica-de-cambios-y-devoluciones" className="footer-link">Política de Devoluciones</Link></li>
              <li><Link href="/libro-de-reclamaciones" className="footer-link">Libro de Reclamaciones</Link></li>
            </ul>
          </div>

          {/* Col 5 — Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contáctanos</h4>
            <ul className="mt-5 space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  <span>{address}</span>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                <a href={`https://wa.me/${phone}`} className="footer-link">+{phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${email}`} className="footer-link">{email}</a>
                  <a href="mailto:coplimitainformes@gmail.com" className="footer-link">coplimitainformes@gmail.com</a>
                </div>
              </li>
            </ul>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hola, me gustaría obtener información sobre los programas de Coplimita.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold no-underline"
              style={{
                backgroundColor: '#25D366',
                color: '#ffffff',
                display: 'inline-flex',
                marginTop: '1.5rem',
              }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <p>© <HydratedDate date={new Date()} format="year" /> {name} — Coop Nuevo Mundo Sermul. Todos los derechos reservados.</p>
          <p style={{ color: 'rgba(255,255,255,0.35)' }}>RUC 20601400384 · Cajamarca, Perú</p>
        </div>
      </div>

    </footer>
  )
}

export default WebFooter
