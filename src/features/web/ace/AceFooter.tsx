import Link from 'next/link'

import { MapPin, Mail, Phone, Facebook, Youtube, Linkedin } from 'lucide-react'

// Simple WhatsApp SVG icon
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/ManuelNC', icon: <Facebook size={18} /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@ManuelNietoCourrejolles', icon: <Youtube size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ManuelNietoCourrejolles', icon: <Linkedin size={18} /> },
  { label: 'WhatsApp', href: 'https://wa.me/51920184072', icon: <WhatsAppIcon size={18} /> },
]

const formacion = [
  { to: '/cursos', label: 'Cursos' },
  { to: '/ebooks', label: 'eBooks' },
  { to: '/rutas', label: 'Rutas de Aprendizaje' },
  { to: '/verificar-certificado', label: 'Verificar Certificado' },
]

const informacion = [
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  { to: '/politica-de-cambios-y-devoluciones', label: 'Política de Devoluciones' },
  { to: '/libro-de-reclamaciones', label: 'Libro de Reclamaciones' },
]

export default function AceFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      {/* Slogan banner */}
      <div className="border-b border-border/50 py-4 text-center px-4">
        <p className="text-sm text-muted-foreground italic">
          &ldquo;Más capacitación, mejores personas, mejores empresas, mejores resultados.&rdquo;
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {/* Empresa */}
        <div className="lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="ACE Consulting PERÚ" className="h-12 w-auto rounded-md mb-3" width={160} height={48} />
          <p className="text-sm text-muted-foreground max-w-xs mb-4 leading-relaxed">
            Academia de Capacitación Ejecutiva especializada en emprendimiento, mundo corporativo y ventas. Formación 100% virtual y asincrónica.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-primary shrink-0" />
              Calle Lino Alarco 212, Miraflores, Lima
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-primary shrink-0" />
              <a href="tel:+51920184072" className="hover:text-primary transition-colors">+51 920 184 072</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-primary shrink-0" />
              <a href="mailto:aceconsultingperu@gmail.com" className="hover:text-primary transition-colors">aceconsultingperu@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Formación */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Formación</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {formacion.map((n) => (
              <li key={n.to}>
                <Link href={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Información */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Información</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {informacion.map((n) => (
              <li key={n.to}>
                <Link href={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Síguenos */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Síguenos</h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Contenido ejecutivo, cursos y novedades en nuestras redes sociales.
          </p>
          <div className="flex items-center gap-3 mb-5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href="https://wa.me/51920184072?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20cursos%20y%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon size={15} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ACE Consulting PERÚ. Todos los derechos reservados.</span>
          <span>DNI: 07771730 | Manuel Nieto Courrejolles | Miraflores, Lima, Perú</span>
        </div>
      </div>
    </footer>
  )
}
