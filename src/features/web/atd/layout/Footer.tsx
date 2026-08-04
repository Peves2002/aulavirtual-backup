'use client'

import Link from "next/link";

import { Mail, MessageCircle, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const libroReclamaciones = "/atd-assets/general/libroreclamaciones.jpeg";
const logoFly = "/atd-assets/general/logoFly.svg";
const logo = "/atd-assets/general/logo.png";

const legalLinks = [
  { to: "/terminos-y-condiciones", label: "Términos y Condiciones" },
  { to: "/politica-de-privacidad", label: "Política de Privacidad" },
  { to: "/politica-de-cambios-y-devoluciones", label: "Política de Reembolsos" },
  { to: "/libro-de-reclamaciones", label: "Libro de Reclamaciones" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-card/30 mt-24 pt-16 pb-8 overflow-hidden">
      {/* Glow decorativo superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[40rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="container px-4 relative">
        {/* 12.1 Estructura de 6 columnas */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mb-16">
          {/* Columna 1 — Marca */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <img src={logo} alt="ATD Academy" className="h-10 w-auto" />
              <div className="font-display font-bold text-lg">ATD Academy</div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              &quot;Descomplicamos lo complejo. Democratizamos la IA.&quot;
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Lima, Perú</p>
              <div className="flex flex-wrap gap-2 pt-2 opacity-70">
                <span className="px-1.5 py-0.5 border border-white/10 rounded text-[10px]">MINEDU</span>
                <span className="px-1.5 py-0.5 border border-white/10 rounded text-[10px]">SUNAT</span>
                <span className="px-1.5 py-0.5 border border-white/10 rounded text-[10px]">ISO 9001</span>
              </div>
            </div>
          </div>

          {/* Columna 2 — Explora */}
          <FooterCol title="Explora" links={[
            { to: "/", label: "Inicio" },
            { to: "/nosotros", label: "Quiénes Somos" },
            { to: "/programas", label: "Programas" },
            { to: "/marketplace", label: "Productos IA" },
            { to: "/consultoria", label: "Consultoría" },
            { to: "/blog", label: "Blog" },
            { to: "/comunidad", label: "Comunidad" },
          ]} />

          {/* Columna 3 — Recursos */}
          <FooterCol title="Recursos" links={[
            { to: "/contacto", label: "Centro de Ayuda" },
            { to: "/comunidad", label: "Preguntas Frecuentes" },
            { to: "/blog", label: "Guías Gratuitas" },
            { to: "/nosotros", label: "Casos de Éxito" },
            { to: "/blog", label: "Glosario IA" },
          ]} />

          {/* Columna 4 — Para Empresas */}
          <FooterCol title="Para Empresas" links={[
            { to: "/consultoria", label: "Consultoría IA" },
            { to: "/consultoria", label: "Soluciones a Medida" },
            { to: "/contacto", label: "Agendar Reunión" },
          ]} />

          {/* Columna 5 — Legal */}
          <div className="space-y-4">
            <FooterCol title="Legal" links={legalLinks} />
            <Link href="/libro-de-reclamaciones" className="block pt-1 hover:opacity-80 transition-opacity w-fit">
              <img src={libroReclamaciones} alt="Libro de Reclamaciones" className="h-10 w-auto rounded" />
            </Link>
          </div>

          {/* Columna 6 — Contacto y Redes */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">Contacto</div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:contacto@academiatd.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                    <span className="break-all">contacto@academiatd.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/51926242351" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <MessageCircle className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                    +51 926 242 351
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                  Horario L-V 9am-6pm
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">Redes Sociales</div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/TransfDigAcademy", label: "Facebook" },
                  { Icon: Instagram, href: "https://www.instagram.com/atd_transformation_digital", label: "Instagram" },
                  { Icon: Youtube, href: "https://www.youtube.com/@transformaciondigital7267", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_16px_hsl(var(--primary)/0.35)] flex items-center justify-center transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 12.2 Certificaciones y confianza */}
        <div className="flex flex-wrap justify-center items-center gap-8 py-8 border-b border-white/5 mb-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex gap-4 items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest">Pagos Seguros</span>
            <div className="flex gap-2 h-5 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-full" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full" />
            </div>
          </div>
          <div className="flex gap-6 text-[10px] font-semibold uppercase tracking-wider">
            <span>SSL Verificado</span>
            <span>PCI-DSS Compliant</span>
            <span>GDPR Compliant</span>
            <span>Ley 29733 (Perú)</span>
            <span>Garantía 30 días</span>
          </div>
        </div>

        {/* 12.3 Línea final & enlaces legales rápidos */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center text-xs text-muted-foreground">
          <div className="text-center lg:text-left space-y-2">
            <p>© {new Date().getFullYear()} ATD - Academia de Transformación Digital. Todos los derechos reservados.</p>
            <p>Hecho con 🧠 en Latinoamérica para el mundo.</p>
            <div className="flex justify-center lg:justify-start pt-2">
              <a
                href="https://fly-software.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <span>Desarrollado por</span>
                <img src={logoFly} alt="Fly Software" className="h-4 w-auto" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.to} href={l.to} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div className="space-y-3">
    <div className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">{title}</div>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <Link href={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
