'use client'

import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Music, Play } from "lucide-react";

const libroReclamaciones = "/atd-assets/general/libroreclamaciones.jpeg";
const logoFly = "/atd-assets/general/logoFly.svg";
const logo = "/atd-assets/general/logo.png";


const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-card/30 mt-24 pt-16 pb-8">
      <div className="container px-4">
        {/* 12.1 Estructura de 6 columnas */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mb-16">
          {/* Columna 1 — Marca */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img src={logo} alt="ATD Academy" className="h-10 w-auto" />
              <div className="font-display font-bold text-lg">ATD Academy</div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Descomplicamos lo complejo. Democratizamos la IA."
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
            { to: "/quienes-somos", label: "Quiénes Somos" },
            { to: "/programas", label: "Programas" },
            { to: "/marketplace", label: "Productos IA" },
            { to: "/consultoria", label: "Consultoría" },
            { to: "/blog", label: "Blog" },
            { to: "/comunidad", label: "Comunidad" },
          ]} />

          {/* Columna 3 — Recursos */}
          <FooterCol title="Recursos" links={[
            { to: "#", label: "Centro de Ayuda" },
            { to: "#", label: "Preguntas Frecuentes" },
            { to: "#", label: "Guías Gratuitas" },
            { to: "#", label: "Webinars" },
            { to: "#", label: "Casos de Éxito" },
            { to: "#", label: "Glosario IA" },
            { to: "#", label: "Newsletter" },
          ]} />

          {/* Columna 4 — Para Empresas */}
          <FooterCol title="Para Empresas" links={[
            { to: "/consultoria", label: "Consultoría IA" },
            { to: "#", label: "Plan Corporate" },
            { to: "#", label: "Soluciones a Medida" },
            { to: "#", label: "Casos de Éxito B2B" },
            { to: "/contacto", label: "Agendar Reunión" },
          ]} />

          {/* Columna 5 — Legal */}
          <div className="space-y-4">
            <FooterCol title="Legal" links={[
              { to: "#", label: "Términos y Condiciones" },
              { to: "#", label: "Política de Privacidad" },
              { to: "#", label: "Política de Cookies" },
              { to: "#", label: "Política de Reembolsos" },
              { to: "#", label: "Aviso Legal" },
              { to: "#", label: "Compliance y GDPR" },
            ]} />
            <Link href="/libro-reclamaciones" className="block pt-2 hover:opacity-80 transition-opacity">
              <img src={libroReclamaciones} alt="Libro de Reclamaciones" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Columna 6 — Contacto y Redes */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Contacto</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:contacto@academiatd.com" className="hover:text-foreground transition-colors break-all">contacto@academiatd.com</a></li>
                <li><a href="https://wa.me/51926242351" className="hover:text-foreground transition-colors">WhatsApp: +51 926 242 351</a></li>
                <li>Horario L-V 9am-6pm</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Redes Sociales</div>
              <div className="flex flex-wrap gap-3">
                {[Facebook, Instagram, Youtube, Linkedin, Twitter, Music, Play].map((Icon, i) => (
                  <a key={i} href="#" className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 12.2 Newsletter del footer */}
        <div className="border-y border-white/5 py-12 mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-xl font-bold">Únete a más de 10.000 profesionales que reciben tips semanales de IA.</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm">
                Suscribirme
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Al suscribirte aceptas nuestra <Link href="#" className="underline">Política de Privacidad</Link>. Cancela cuando quieras.
            </p>
          </div>
        </div>

        {/* 12.3 Certificaciones y confianza */}
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

        {/* 12.4 Línea final & 12.5 Selectores */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center text-xs text-muted-foreground">
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

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <span>Idioma:</span>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-foreground">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Moneda:</span>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-foreground">
                <option value="USD">USD</option>
                <option value="PEN">PEN</option>
                <option value="MXN">MXN</option>
                <option value="COP">COP</option>
                <option value="ARS">ARS</option>
                <option value="CLP">CLP</option>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>País:</span>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-foreground">
                <option value="PE">Perú (Auto)</option>
                <option value="MX">México</option>
                <option value="CO">Colombia</option>
                <option value="AR">Argentina</option>
                <option value="CL">Chile</option>
                <option value="ES">España</option>
                <option value="US">USA</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div className="space-y-3">
    <div className="text-sm font-semibold text-foreground">{title}</div>
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
