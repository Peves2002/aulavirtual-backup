import Link from 'next/link'
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import HydratedDate from '@/utils/components/HydratedDate'

interface WebFooterProps {
  platformName?: string
  rutasHabilitado?: boolean
}

const FooterCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div className="space-y-3">
    <div className="text-sm font-semibold text-white">{title}</div>
    <ul className="space-y-2">
      {links.map(l => (
        <li key={l.label}>
          <Link href={l.to} className="footer-link text-sm no-underline">{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const WebFooter = async ({ platformName = 'Aula Virtual', rutasHabilitado = true }: WebFooterProps) => {
  void rutasHabilitado
  const configs = await getConfigs()
  const name      = configs.TEMPLATE_NAME    || platformName
  const waNumber  = configs.WHATSAPP_NUMERO  || ''
  const email     = configs.EMAIL_CONTACTO   || ''

  return (
    <footer className="border-t mt-24 pt-16 pb-8" style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'hsl(240 25% 8% / 0.3)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Grid 6 columnas */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mb-16">

          {/* Columna 1 — Marca */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 no-underline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pagina/logo.png" alt={name} style={{ height: '40px', width: 'auto', objectFit: 'contain', maxWidth: '120px' }} />
              <div className="font-display font-bold text-lg text-white">{name}</div>
            </Link>
            <p className="text-sm leading-relaxed footer-link">
              Descomplicamos lo complejo. Democratizamos el conocimiento.
            </p>
            <div className="text-xs space-y-1 footer-link">
              <p>Lima, Perú</p>
              <div className="flex flex-wrap gap-2 pt-2 opacity-70">
                {['MINEDU', 'SUNAT', 'ISO 9001'].map(b => (
                  <span key={b} className="px-1.5 py-0.5 rounded text-[10px]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2 — Explora */}
          <FooterCol title="Explora" links={[
            { to: '/',                      label: 'Inicio' },
            { to: '/cursos',                label: 'Programas' },
            { to: '/nosotros',              label: 'Quiénes Somos' },
            { to: '/verificar-certificado', label: 'Verificar Certificado' },
            { to: '/contacto',              label: 'Contacto' },
          ]} />

          {/* Columna 3 — Recursos */}
          <FooterCol title="Recursos" links={[
            { to: '#', label: 'Centro de Ayuda' },
            { to: '#', label: 'Preguntas Frecuentes' },
            { to: '#', label: 'Guías Gratuitas' },
            { to: '#', label: 'Webinars' },
            { to: '#', label: 'Casos de Éxito' },
          ]} />

          {/* Columna 4 — Para Empresas */}
          <FooterCol title="Para Empresas" links={[
            { to: '/contacto', label: 'Consultoría' },
            { to: '/contacto', label: 'Plan Corporativo' },
            { to: '/contacto', label: 'Soluciones a Medida' },
            { to: '/contacto', label: 'Agendar Reunión' },
          ]} />

          {/* Columna 5 — Legal */}
          <div className="space-y-4">
            <FooterCol title="Legal" links={[
              { to: '/terminos-y-condiciones',             label: 'Términos y Condiciones' },
              { to: '/politica-de-cambios-y-devoluciones', label: 'Política de Privacidad' },
              { to: '/politica-de-cambios-y-devoluciones', label: 'Política de Reembolsos' },
            ]} />
            <Link href="/libro-de-reclamaciones" className="block pt-2 hover:opacity-80 transition-opacity no-underline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/libro-reclamaciones.jpg" alt="Libro de Reclamaciones" style={{ height: '40px', width: 'auto' }} />
            </Link>
          </div>

          {/* Columna 6 — Contacto y Redes */}
          <div className="space-y-6">
            {(email || waNumber) && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-white">Contacto</div>
                <ul className="space-y-2 text-sm">
                  {email    && <li><a href={`mailto:${email}`}              className="footer-link no-underline">{email}</a></li>}
                  {waNumber && <li><a href={`https://wa.me/${waNumber}`}    className="footer-link no-underline">WhatsApp: +{waNumber}</a></li>}
                  <li className="footer-link">Horario L-V 9am-6pm</li>
                </ul>
              </div>
            )}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-white">Redes Sociales</div>
              <div className="flex flex-wrap gap-3">
                {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="footer-social-icon h-8 w-8 rounded-lg flex items-center justify-center transition-colors no-underline">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-y py-12 mb-12" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-xl font-bold text-white">Únete a miles de profesionales que reciben tips semanales.</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'hsl(210 40% 98%)' }}
              />
              <button className="btn-hero px-8 py-3 rounded-lg text-sm" style={{ fontFamily: 'inherit' }}>
                Suscribirme
              </button>
            </div>
            <p className="text-xs footer-link">
              Al suscribirte aceptas nuestra{' '}
              <Link href="/politica-de-cambios-y-devoluciones" className="underline footer-link">Política de Privacidad</Link>.
            </p>
          </div>
        </div>

        {/* Línea final */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center text-xs footer-link">
          <div className="text-center lg:text-left space-y-1">
            <p>© <HydratedDate date={new Date()} format="year" /> {name}. Todos los derechos reservados.</p>
            <p>Hecho con 🧠 en Latinoamérica para el mundo.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <span>Idioma:</span>
              <select className="rounded focus:ring-0 cursor-pointer text-xs" style={{ background: 'transparent', border: 'none', color: 'inherit' }}>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Moneda:</span>
              <select className="rounded focus:ring-0 cursor-pointer text-xs" style={{ background: 'transparent', border: 'none', color: 'inherit' }}>
                <option value="PEN">PEN</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WebFooter
