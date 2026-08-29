'use client'

import Link from "next/link"

import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";

const logoImg = "/images/grupo-corpus/logofooter.png"

const socialLinks = [
  { 
    icon: <MessageCircle size={20} />, 
    href: "https://wa.me/51956266147", 
    label: "WhatsApp" 
  },
  { 
    icon: <Facebook size={20} />, 
    href: "https://facebook.com", 
    label: "Facebook" 
  },
  { 
    icon: <Instagram size={20} />, 
    href: "https://instagram.com", 
    label: "Instagram" 
  },
  { 
    icon: <Youtube size={20} />, 
    href: "https://youtube.com", 
    label: "YouTube" 
  },
  { 
    icon: <Linkedin size={20} />, 
    href: "https://linkedin.com", 
    label: "LinkedIn" 
  },
  { 
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.54-4.06-1.4-1.17-.87-1.96-2.19-2.26-3.62-.03 2.44-.02 4.88-.03 7.32-.01 1.34-.33 2.7-.99 3.87-.71 1.25-1.85 2.27-3.21 2.82-1.37.55-2.91.66-4.36.32-1.46-.35-2.82-1.22-3.76-2.43-1.02-1.31-1.53-3-1.44-4.66.07-1.71.74-3.41 1.98-4.59 1.24-1.18 2.96-1.87 4.67-1.93.42-.01.84.02 1.25.08v4.08c-.46-.07-.94-.09-1.4-.04-.84.07-1.68.46-2.25 1.1-.56.63-.84 1.48-.79 2.33.04.85.42 1.66.97 2.26.54.59 1.31.95 2.12.98.81.04 1.65-.2 2.28-.73.66-.55.99-1.38.99-2.22.01-4.63-.01-9.26-.01-13.89z" />
      </svg>
    ), 
    href: "https://tiktok.com", 
    label: "TikTok" 
  },
];

export const Footer = () => (
  <footer className="bg-gradient-to-b from-[#111625] via-[#0b0e1a] to-[#04060b] text-white pt-12 pb-12 border-t border-[#cca353]/15 relative overflow-hidden">
    {/* Decorative background ambient lights */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cca353]/5 blur-[140px] -z-10 rounded-full translate-x-1/3 -translate-y-1/3" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gc-blue-corp/10 blur-[120px] -z-10 rounded-full -translate-x-1/3 translate-y-1/3" />

    <div className="gc-container-custom">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 mb-16">
        
        {/* Brand Column */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-6">
          <Link href="/" className="inline-block group">
            <img 
              src={logoImg} 
              alt="Grupo Corpus" 
              className="h-24 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
            />
          </Link>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Especialistas en formación técnica para el sector eléctrico.
            </p>
            <div className="border-l-2 border-[#cca353] pl-3 py-0.5">
              <p className="text-gray-200 font-medium italic text-sm">
                &quot;Instalaciones seguras, profesionales de excelencia.&quot;
              </p>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-3 flex-wrap pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#cca353] hover:border-[#cca353] hover:shadow-[0_0_15px_rgba(204,163,83,0.3)] hover:-translate-y-1 transition-all duration-300 text-gray-400 hover:text-gc-black"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Enlaces Column */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2 lg:pt-12">
          <h4 className="font-gc-sans font-bold text-base text-white mb-6 tracking-wider uppercase text-xs text-[#cca353] border-b border-white/5 pb-2">
            Enlaces
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link href="/recursos" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Artículos</span>
              </Link>
            </li>
            <li>
              <Link href="/cursos-en-vivo" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Cursos en Vivo</span>
              </Link>
            </li>
            <li>
              <Link href="/cursos" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Cursos offline</span>
              </Link>
            </li>
            <li>
              <Link href="/campus-virtual" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Campus Virtual</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legales Column */}
        <div className="col-span-6 md:col-span-6 lg:col-span-2 lg:pt-12">
          <h4 className="font-gc-sans font-bold text-base text-white mb-6 tracking-wider uppercase text-xs text-[#cca353] border-b border-white/5 pb-2">
            Legales
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/terminos-y-condiciones" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Términos y Condiciones</span>
              </Link>
            </li>
            <li>
              <Link href="/politicas-de-privacidad" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Políticas de Privacidad</span>
              </Link>
            </li>
            <li>
              <Link href="/politicas-de-reembolso" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Políticas de Reembolso</span>
              </Link>
            </li>
            <li>
              <Link href="/libro-de-reclamaciones" className="hover:text-[#cca353] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span>Libro de Reclamaciones</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto Column */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-6 lg:pt-12">
          <h4 className="font-gc-sans font-bold text-base text-white mb-6 tracking-wider uppercase text-xs text-[#cca353] border-b border-white/5 pb-2">
            Contacto Directo
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#cca353] flex-shrink-0 group-hover:bg-[#cca353] group-hover:text-gc-black transition-colors duration-300">
                <MapPin size={16} />
              </div>
              <p className="text-gray-400 group-hover:text-white transition-colors duration-300 pt-1.5 max-w-[200px]">
                LIMA-LIMA-LOS OLIVOS - AV. ZARAGOZA MZ B LT.22
              </p>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#cca353] flex-shrink-0 group-hover:bg-[#cca353] group-hover:text-gc-black transition-colors duration-300">
                <Mail size={16} />
              </div>
              <a 
                href="mailto:grupocorpuscapacitaciones@gmail.com" 
                className="text-gray-400 group-hover:text-white transition-colors duration-300 pt-1.5 break-all"
              >
                grupocorpuscapacitaciones@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#cca353] flex-shrink-0 group-hover:bg-[#cca353] group-hover:text-gc-black transition-colors duration-300">
                <Phone size={16} />
              </div>
              <p className="text-gray-400 group-hover:text-white transition-colors duration-300 pt-1.5 font-medium">
                +51 953 255 751
              </p>
            </div>
          </div>
          
          <div className="pt-2">
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center gap-2 w-full lg:max-w-[280px] px-4 py-2.5 border border-[#cca353]/30 hover:border-[#cca353] bg-[#cca353]/5 hover:bg-[#cca353]/15 text-[#cca353] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,163,83,0.15)] group"
            >
              <span>Ir al formulario de contacto</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
        <div className="text-center md:text-left">
          © 2026 <span className="text-gray-300 font-bold">Grupo Corpus</span>. Todos los derechos reservados.
        </div>

        <div className="flex justify-center md:justify-end">
          <a href="https://fly-software.lovable.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-white transition-colors">
            <span>Desarrollado por: </span>
            <img src="/images/logo.svg" alt="Fly" className="h-5 w-auto opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
