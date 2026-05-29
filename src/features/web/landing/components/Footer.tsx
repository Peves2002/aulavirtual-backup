'use client'

import { motion } from "framer-motion";
import { ArrowUp, MapPin } from "lucide-react";

const footerLinks = {
  servicios: [
    { name: "Implementación BIM", href: "#servicios" },
    { name: "Modelamiento BIM", href: "#servicios" },
    { name: "Diseño de Viviendas", href: "#servicios" },
    { name: "Capacitaciones", href: "#servicios" },
  ],
  empresa: [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Logros", href: "#logros" },
    { name: "Aula Virtual", href: "/cursos" },
    { name: "Contacto", href: "#contacto" },
  ],
  tecnologia: [
    { name: "Realidad Virtual", href: "#servicios" },
    { name: "Realidad Aumentada", href: "#servicios" },
    { name: "Vistas 360°", href: "#servicios" },
    { name: "Drones", href: "#logros" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/p/Elite-Engineering-100048414673399/?_rdc=1&_rdr#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/103097936/admin/page-posts/published/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/igenierosdeelite?igsh=YmUwN2cyY24zdWhv",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
      </svg>
    ),
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] pt-24 md:pt-32 pb-10 overflow-hidden border-t border-slate-800/50">
      {/* Decorative background lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute top-0 -left-48 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="flex items-center mb-10 group"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/images/logo-elite.png" 
                alt="Elite Engineering" 
                className="h-24 w-auto drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-500" 
              />
            </motion.a>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm mb-12">
              Transformando el horizonte de la construcción con precisión técnica y mentalidad de élite.
            </p>

            {/* Social Trust */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.15em] text-xs mb-6">Servicios</h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium hover:translate-x-2">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.15em] text-xs mb-6">Compañía</h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium hover:translate-x-2">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.15em] text-xs mb-6">Legal</h4>
            <ul className="space-y-3 list-none p-0">
              <li><a href="/terminos-y-condiciones" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium hover:translate-x-2"><span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />Términos y Condiciones</a></li>
              <li><a href="/politica-de-privacidad" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium hover:translate-x-2"><span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />Política de Privacidad</a></li>
              <li><a href="/politica-de-cambios-y-devoluciones" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-medium hover:translate-x-2"><span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />Política de Devoluciones</a></li>
            </ul>
            <div className="mt-8">
              <a
                href="/libro-de-reclamaciones"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <img
                  src="/images/libro-reclamaciones.jpg"
                  alt="Libro de Reclamaciones"
                  className="h-auto w-auto max-w-[140px] rounded-lg border border-slate-800"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-10 mt-16 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              © {new Date().getFullYear()} Elite Engineering E.I.R.L. <span className="mx-2 text-white/5">|</span> Made for Excellence
            </p>
            <span className="hidden sm:inline text-slate-800">|</span>
            <p className="text-slate-500 text-xs font-medium flex items-center gap-2">
              Desarrollado por
              <a
                href="https://flyup.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity inline-flex items-center align-middle"
              >
                <img
                  src="/images/logo.svg"
                  alt="Fly Logo"
                  className="h-4 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity"
                />
              </a>
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Cajamarca, Perú</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg group"
              whileHover={{ y: -4 }}
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
