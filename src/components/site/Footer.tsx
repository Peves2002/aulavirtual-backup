"use client";

const logoImg = "/assets/LogoIncuba.png";

import Link from "next/link";

import { Facebook, Instagram, Music2, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

const nosotros = [
  { label: "Inicio", href: "/" },
  { label: "Cursos", href: "/cursos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
];

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/IncubaCocina", label: "Facebook" },
  { Icon: Music2, href: "https://www.tiktok.com/@incubacocinaescuela", label: "TikTok" },
  { Icon: Instagram, href: "https://www.instagram.com/incubacocinaescuela", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden" style={{ background: "#FFFFFF", color: "#4A7018" }}>
      {/* Background decoration elements */}
      <div 
        className="absolute top-0 inset-x-0 h-[2px]" 
        style={{ background: "linear-gradient(90deg, transparent, #A8E060, transparent)", opacity: 0.8 }} 
      />
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" 
        style={{ background: "#A8E060" }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        
        {/* Col 1 */}
        <div className="lg:pr-8">
          <div className="flex items-center mb-6">
            <img src={logoImg} alt="Incuba Cocina" className="h-20 lg:h-24 w-auto object-contain" />
          </div>
          <p className="max-w-xs" style={{ color: "#4A7018", fontSize: "14px", lineHeight: 1.8 }}>
            Escuela gastronómica de emprendimiento en Los Olivos. Aprende y emprende
            con cursos prácticos de alto impacto.
          </p>

        </div>



        {/* Col 2 */}
        <div>
          <h4 className="font-display font-bold mb-6 text-lg" style={{ color: "#1A3A0A", letterSpacing: "0.5px" }}>
            Secciones
          </h4>
          <ul className="space-y-3">
            {nosotros.map((l) => (
              <li key={l.label}>
                <Link href={l.href}
                  className="group flex items-center transition-colors"
                  style={{ color: "#4A7018", fontSize: "14px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#5A9020")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4A7018")}
                >
                  <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#5A9020]" />
                  <span className="font-medium">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-display font-bold mb-6 text-lg" style={{ color: "#1A3A0A", letterSpacing: "0.5px" }}>
            Contacto
          </h4>
          <ul className="space-y-5" style={{ color: "#4A7018", fontSize: "14px" }}>
            <li className="flex items-start gap-3 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-1.5 rounded-md" style={{ background: "#EAF7D0" }}>
                <Phone size={16} className="text-[#5A9020]" />
              </div>
              <div>
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[13px] tracking-wide">WhatsApp</span>
                <span className="font-medium">953 822 677</span>
              </div>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-1.5 rounded-md" style={{ background: "#EAF7D0" }}>
                <Mail size={16} className="text-[#5A9020]" />
              </div>
              <div>
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[13px] tracking-wide">Email</span>
                <span className="font-medium">incubacocina@gmail.com</span>
              </div>
            </li>
            <li className="flex items-start gap-3 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-1.5 rounded-md" style={{ background: "#EAF7D0" }}>
                <MapPin size={16} className="text-[#5A9020]" />
              </div>
              <div>
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[13px] tracking-wide">Ubicación</span>
                <span className="font-medium">Jr. Neptuno 102, Los Olivos</span>
              </div>
            </li>
            <li className="pt-3 border-t border-[#C8E890] mt-3">
              <span className="font-bold text-[#5A9020] tracking-wider text-[13px] block mb-4">INCUBA COCINA SAC</span>
              <div className="flex gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    style={{ 
                      background: "#F7FBF0", 
                      border: "1px solid #C8E890", 
                      color: "#2D5010",
                      boxShadow: "0 2px 8px rgba(45,80,16,0.03)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#A8E060";
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#A8E060";
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 6px 15px rgba(168, 224, 96, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F7FBF0";
                      e.currentTarget.style.color = "#2D5010";
                      e.currentTarget.style.borderColor = "#C8E890";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(45,80,16,0.03)";
                    }}
                  >
                    <Icon size={16} className="group-hover:rotate-[360deg] transition-transform duration-700" />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 mt-16 pt-8">
        <div className="absolute top-0 inset-x-5 lg:inset-x-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #C8E890, transparent)" }} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "#7AAA40", fontSize: "13px", fontWeight: 500 }}>
            © 2025 Incuba Cocina SAC. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 font-medium" style={{ color: "#7AAA40", fontSize: "13px" }}>
            <a href="#" className="hover:text-[#5A9020] transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-[#5A9020] transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
