import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, Linkedin } from 'lucide-react'

import WebBrandLogo from '@/features/web/digital-azul/components/WebBrandLogo'
import { daColors, daFont } from '@/features/web/digital-azul/home/homeTheme'
import { MAIN_NAV_ITEMS, SOLUCIONES_NAV_ITEMS } from '@/features/web/digital-azul/navigation/webNav'
import { getConfigs } from '@/utils/libs/config'
import HydratedDate from '@/utils/components/HydratedDate'

const RECURSOS_LINKS = [
  { label: 'Manuales', href: '/recursos' },
  { label: 'Guías', href: '/recursos' },
  { label: 'Plantillas', href: '/recursos' },
  { label: 'Artículos', href: '/recursos' },
]

interface WebFooterProps {
  platformName?: string
  rutasHabilitado?: boolean
}

const WebFooter = async ({ platformName = 'Digital Azul', rutasHabilitado = true }: WebFooterProps) => {
  void rutasHabilitado
  const configs = await getConfigs()

  const socialLinks = [
    { label: 'LinkedIn', href: configs.LINKEDIN_URL || '#', icon: Linkedin },
    { label: 'Facebook', href: configs.FACEBOOK_URL || 'https://www.facebook.com', icon: Facebook },
    { label: 'Instagram', href: configs.INSTAGRAM_URL || 'https://www.instagram.com', icon: Instagram },
    { label: 'Youtube', href: configs.YOUTUBE_URL || 'https://www.youtube.com', icon: Youtube },
  ]

  const quickLinks = MAIN_NAV_ITEMS.filter(item => !['inicio', 'contacto'].includes(item.key))

  return (
    <footer style={{ backgroundColor: daColors.blueDark, color: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Marca */}
          <div>
            <WebBrandLogo variant="footer" />
            <p
              style={{
                fontFamily: daFont,
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                marginTop: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              Soluciones de aprendizaje para personas y organizaciones que buscan avanzar al siguiente nivel.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(social => {
                const Icon = social.icon

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="no-underline flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      color: '#ffffff',
                    }}
                  >
                    <Icon size={16} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 style={{ fontFamily: daFont, fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              ENLACES RÁPIDOS
            </h4>
            <ul className="space-y-2 list-none pl-0 m-0">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.url}
                    className="no-underline hover:opacity-100 transition-opacity"
                    style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones */}
          <div>
            <h4 style={{ fontFamily: daFont, fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              SOLUCIONES
            </h4>
            <ul className="space-y-2 list-none pl-0 m-0">
              {SOLUCIONES_NAV_ITEMS.map(link => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="no-underline hover:opacity-100 transition-opacity"
                    style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 style={{ fontFamily: daFont, fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              RECURSOS
            </h4>
            <ul className="space-y-2 list-none pl-0 m-0">
              {RECURSOS_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="no-underline hover:opacity-100 transition-opacity"
                    style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontFamily: daFont, fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              CONTÁCTANOS
            </h4>
            <ul className="space-y-3 list-none pl-0 m-0">
              <li className="flex items-start gap-2" style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}>
                <Phone size={15} className="flex-shrink-0 mt-0.5" />
                <span>{configs.TELEFONO_CONTACTO || '+57 300 000 0000'}</span>
              </li>
              <li className="flex items-start gap-2" style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}>
                <Mail size={15} className="flex-shrink-0 mt-0.5" />
                <span>{configs.EMAIL_CONTACTO || 'contacto@digitalazul.com'}</span>
              </li>
              <li className="flex items-start gap-2" style={{ fontFamily: daFont, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.72)' }}>
                <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                <span>{configs.UBICACION || 'Bogotá, Colombia'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}
        >
          <p style={{ fontFamily: daFont, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © <HydratedDate date={new Date()} format="year" /> {platformName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/libro-de-reclamaciones" className="no-underline flex-shrink-0" aria-label="Libro de reclamaciones">
              <Image
                src="/images/libro-reclamaciones.png"
                alt="Libro de reclamaciones digital"
                width={120}
                height={40}
                style={{ height: 'auto', width: 'auto', maxHeight: 36 }}
              />
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="no-underline"
              style={{ fontFamily: daFont, fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="no-underline"
              style={{ fontFamily: daFont, fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}
            >
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WebFooter
