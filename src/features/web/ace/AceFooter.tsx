import Link from 'next/link'

import { MapPin, Mail, Phone } from 'lucide-react'

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/ebooks', label: 'Ebooks' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function AceFooter() {
  return (
    <footer className="border-t border-border bg-card/40 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="ACE Consulting PERÚ" className="h-12 w-auto rounded-md mb-3" width={160} height={48} />
          <p className="text-sm text-muted-foreground max-w-md">
            Más capacitación, mejores personas, mejores empresas, mejores resultados.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Navegación</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link href={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Contacto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
              Calle Lino Alarco 212, Miraflores, Lima
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              +51 920 184 072
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              aceconsultingperu@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ACE Consulting PERÚ. Todos los derechos reservados.
      </div>
    </footer>
  )
}
