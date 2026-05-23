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
        <div className="lg:pr-8 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center sm:justify-start mb-6">
            <img src={logoImg} alt="Incuba Cocina" className="h-24 lg:h-32 w-auto object-contain" />
          </div>
          <p className="max-w-xs mx-auto sm:mx-0" style={{ color: "#4A7018", fontSize: "16px", lineHeight: 1.8 }}>
            Escuela gastronómica de emprendimiento en Los Olivos. Aprende y emprende
            con cursos prácticos de alto impacto.
          </p>
        </div>



        {/* Col 2 */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
          <h4 className="font-display font-bold mb-6 text-xl" style={{ color: "#1A3A0A", letterSpacing: "0.5px" }}>
            Secciones
          </h4>
          <ul className="space-y-4 flex flex-col items-center sm:items-start">
            {nosotros.map((l) => (
              <li key={l.label}>
                <Link href={l.href}
                  className="group flex items-center justify-center sm:justify-start transition-colors"
                  style={{ color: "#4A7018", fontSize: "16px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#5A9020")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4A7018")}
                >
                  <ChevronRight size={18} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#5A9020]" />
                  <span className="font-medium">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
          <h4 className="font-display font-bold mb-6 text-xl" style={{ color: "#1A3A0A", letterSpacing: "0.5px" }}>
            Contacto
          </h4>
          <ul className="space-y-6 flex flex-col items-center sm:items-start" style={{ color: "#4A7018", fontSize: "16px" }}>
            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-2 rounded-md" style={{ background: "#EAF7D0" }}>
                <Phone size={20} className="text-[#5A9020]" />
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[15px] tracking-wide">WhatsApp</span>
                <span className="font-medium">953 822 677</span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-2 rounded-md" style={{ background: "#EAF7D0" }}>
                <Mail size={20} className="text-[#5A9020]" />
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[15px] tracking-wide">Email</span>
                <span className="font-medium">incubacocina@gmail.com</span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 transition-colors hover:text-[#2D5010]">
              <div className="mt-0.5 p-2 rounded-md" style={{ background: "#EAF7D0" }}>
                <MapPin size={20} className="text-[#5A9020]" />
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-bold text-[#1A3A0A] mb-0.5 text-[15px] tracking-wide">Ubicación</span>
                <span className="font-medium">Jr. Neptuno 102, Los Olivos</span>
              </div>
            </li>
            <li className="pt-4 border-t border-[#C8E890] mt-4 list-none w-full flex flex-col items-center sm:items-start">
              <h4 className="font-display font-bold mb-4 text-xl" style={{ color: "#1A3A0A", letterSpacing: "0.5px" }}>
                Incuba Cocina SAC
              </h4>
              <div className="flex justify-center sm:justify-start gap-4">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 group"
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
                    <Icon size={20} className="group-hover:rotate-[360deg] transition-transform duration-700" />
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
          <p className="text-center md:text-left" style={{ color: "#7AAA40", fontSize: "15px", fontWeight: 500 }}>
            © {new Date().getFullYear()} Incuba Cocina SAC. Todos los derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 font-medium" style={{ color: "#7AAA40", fontSize: "15px" }}>
            <Link href="/terminos-y-condiciones" className="hover:text-[#5A9020] transition-colors">Términos y Condiciones</Link>
            <Link href="/politica-de-cambios-y-devoluciones" className="hover:text-[#5A9020] transition-colors">Política de reembolso</Link>
            <Link href="/libro-de-reclamaciones" className="hover:opacity-80 transition-opacity">
              <img
                src="/images/libro-reclamaciones.jpg"
                alt="Libro de reclamaciones"
                className="h-16 w-auto rounded-lg shadow-sm"
              />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-[#EAF7D0] pt-6">
          <p style={{ color: "#7AAA40", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            Desarrollado por
            <Link href="https://flyup.pe" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center">
              <span
                style={{
                  display: "inline-block",
                  height: "28px",
                  width: "90px",
                  backgroundColor: "#7AAA40",
                  maskImage: "url(/images/logo.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "url(/images/logo.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center"
                }}
                aria-label="Flyup"
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
