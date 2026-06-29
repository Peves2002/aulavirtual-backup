import React from 'react'

import Link from 'next/link'
import Image from 'next/image'


import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import HydratedDate from '@/utils/components/HydratedDate'

// Simple TikTok SVG icon (not in lucide-react)
const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
)

// Simple WhatsApp SVG icon
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const staticSocialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/grupo.master.academy', icon: <Facebook size={20} /> },
  { label: 'TikTok', href: 'https://tiktok.com/@grupo.master.academy', icon: <TikTokIcon size={20} /> },
  { label: 'Instagram', href: 'https://www.instagram.com/grupo.master.academy/', icon: <Instagram size={20} /> },
]

interface WebFooterProps {
  platformName?: string
  rutasHabilitado?: boolean
}

const WebFooter = async ({ platformName = 'Master Academy', rutasHabilitado = true }: WebFooterProps) => {
  const configs = await getConfigs()
  const waNumber = configs.WHATSAPP_NUMERO || '51973241285'

  const socialLinks = [
    ...staticSocialLinks,
    { label: 'WhatsApp', href: `https://wa.me/${waNumber}`, icon: <WhatsAppIcon size={20} /> },
  ]

  return (
    <footer style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>

      {/* Slogan banner */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(var(--web-primary-rgb,212,175,55),0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 text-center">
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', margin: 0 }}>
            &ldquo;Nosotros te enseñamos, tú prósperas.&rdquo;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Empresa */}
          <div>
            <h4
              className="mb-3"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff' }}
            >
              Master Academy
            </h4>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Academia virtual líder en preparación para concursos de la CGR, Sunat y especialización en Control Gubernamental y Gestión Pública.
            </p>
            <ul className="space-y-2 list-none pl-0 m-0" style={{ opacity: 0.8 }}>
              <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem' }}>
                <Phone size={14} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+51973241285" className="no-underline hover:opacity-80" style={{ color: 'inherit' }}>+51 973 241 285</a>
              </li>
              <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem' }}>
                <Mail size={14} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:Informes@mastergrupodeestudio.com" className="no-underline hover:opacity-80" style={{ color: 'inherit' }}>Informes@mastergrupodeestudio.com</a>
              </li>
              <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem' }}>
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>Mz. D, Lt. 43, APV El Manantial, San Martín de Porres, Lima</span>
              </li>
            </ul>
          </div>

          {/* Formación */}
          <div className="pt-4 md:pt-0">
            <h4
              className="mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff' }}
            >
              Formación
            </h4>
            <ul className="space-y-2 list-none pl-0 m-0" style={{ opacity: 0.8 }}>
              {([
                { label: 'Cursos', href: '/cursos' },
                { label: 'Simulacros', href: '/simulacros' },
                { label: 'Verificar Certificado', href: '/verificar-certificado' },
                ...(rutasHabilitado ? [{ label: 'Rutas de Aprendizaje', href: '/rutas' }] : []),
              ] as { label: string; href: string }[]).map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="no-underline transition-opacity hover:opacity-100"
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Más Información */}
          <div className="pt-4 md:pt-0">
            <h4
              className="mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff' }}
            >
              Información
            </h4>
            <ul className="space-y-2 list-none pl-0 m-0" style={{ opacity: 0.8 }}>
              {[
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
                { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
                { label: 'Política de Devoluciones', href: '/politica-de-cambios-y-devoluciones' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="no-underline transition-opacity hover:opacity-100 inline-flex items-center gap-1.5"
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/libro-de-reclamaciones"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/libro-reclamaciones.jpg"
                  alt="Libro de Reclamaciones"
                  width={160}
                  height={75}
                  className="h-auto w-auto max-w-[160px] rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>
          </div>

          {/* Síguenos */}
          <div>
            <h4
              className="mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff' }}
            >
              Síguenos
            </h4>

            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.875rem', lineHeight: 1.6 }}>
              Síguenos en redes sociales y entérate de nuestros simulacros, cursos y convocatorias.
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-3 mb-5">
              {socialLinks.map(social => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="no-underline transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Validar Certificado button */}
            <Link
              href="/verificar-certificado"
              className="no-underline inline-block text-center transition-opacity hover:opacity-90 mb-3"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#ffffff',
                backgroundColor: 'var(--web-primary, #D4AF37)',
                borderRadius: '9999px',
                padding: '0.5rem 1.25rem',
              }}
            >
              Validar Certificado
            </Link>

            {/* WhatsApp CTA */}
            <div>
              <a
                href={`https://wa.me/${waNumber}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20cursos%20y%20simulacros.`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  backgroundColor: '#25D366',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.25rem',
                }}
              >
                <WhatsAppIcon size={16} />
                Escríbenos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
            }}
          >
            © <HydratedDate date={new Date()} format="year" /> {platformName} — Master Academy Grupo de Estudio S.A.C. | RUC: 20611096627. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Desarrollado con ❤️ por
            <Link
              href="https://flyup.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:opacity-80 inline-flex items-center align-middle"
              style={{ color: 'var(--web-light, #F0D060)', fontWeight: 600 }}
            >
              <Image
                src="/images/logo.svg"
                alt="Fly Logo"
                width={80}
                height={25}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default WebFooter
