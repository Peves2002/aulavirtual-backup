import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, X, Menu, GraduationCap, ChevronRight, Laptop, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { useLocation, Link } from "@tanstack/react-router";
const logoAdph = "/assets/Logo_ADPH-BveCxiVM.png";
const ESCUELAS = [
  { label: "Escuela de Psicología Organizacional", to: "/escuelas/psicologia-organizacional" },
  { label: "Escuela de Liderazgo y Capital Humano", to: "/escuelas/liderazgo-capital-humano" },
  { label: "Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo", to: "/escuelas/psicologia-ocupacional-sst" },
  { label: "Centro de Aprendizaje Experiencial", to: "/escuelas/aprendizaje-experiencial" }
];
const MAIN_NAV = [
  { label: "Programas", to: "/programas" },
  { label: "Soluciones Corporativas", to: "/consultoria" },
  { label: "Admisión", to: "/ficha-de-inscripcion" },
  { label: "Nosotros", to: "/nosotros" }
];
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-5 border-b border-slate-200/50"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logoAdph,
              alt: "ADPH Group",
              className: "h-10 lg:h-12 w-auto transition-transform hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden lg:flex items-center gap-8 ml-8 flex-1", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group h-full flex items-center",
                onMouseEnter: () => setDropdownOpen(true),
                onMouseLeave: () => setDropdownOpen(false),
                children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      className: "flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:text-teal uppercase tracking-wider transition-colors py-2",
                      children: [
                        "Escuelas",
                        /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-teal" : ""}` })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(AnimatePresence, { children: dropdownOpen && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: 5 },
                      transition: { duration: 0.2 },
                      className: "absolute top-full left-0 pt-4 w-[320px]",
                      children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2 flex flex-col", children: ESCUELAS.map((escuela, idx) => /* @__PURE__ */ jsx(
                        Link,
                        {
                          to: escuela.to,
                          className: "px-5 py-3 text-xs font-bold text-slate-600 hover:text-teal hover:bg-slate-50 transition-colors block border-b border-slate-50 last:border-0",
                          children: escuela.label
                        },
                        idx
                      )) })
                    }
                  ) })
                ]
              }
            ),
            MAIN_NAV.map((item) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: item.to,
                className: "relative text-[13px] font-bold text-slate-700 hover:text-teal uppercase tracking-wider transition-colors py-2 group",
                children: [
                  item.label,
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 inset-x-0 h-0.5 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left" })
                ]
              },
              item.label
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://campus.adphgroup.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden lg:flex items-center gap-2 bg-slate-900 hover:bg-teal text-white border border-transparent text-[11px] font-extrabold uppercase tracking-widest px-6 py-3 transition-colors rounded-none shadow-sm hover:shadow-md",
                children: [
                  "Campus Virtual",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                className: "lg:hidden p-2 -mr-2 text-slate-800 hover:text-teal transition-colors",
                children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-7 h-7" }) : /* @__PURE__ */ jsx(Menu, { className: "w-7 h-7" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "100vh" },
        exit: { opacity: 0, height: 0 },
        className: "fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto pt-[88px]",
        children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-8 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4", children: "Escuelas" }),
            ESCUELAS.map((escuela, idx) => /* @__PURE__ */ jsx(
              Link,
              {
                to: escuela.to,
                className: "block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-teal transition-colors",
                children: escuela.label
              },
              idx
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4", children: "Menú Principal" }),
            MAIN_NAV.map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: item.to,
                className: "block text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 hover:text-teal transition-colors",
                children: item.label
              },
              item.label
            ))
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://campus.adphgroup.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-extrabold uppercase text-xs tracking-widest py-4 transition-colors hover:bg-teal rounded-none",
              children: [
                "Campus Virtual",
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
              ]
            }
          ) })
        ] })
      }
    ) })
  ] });
}
const FacebookIcon = (props) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" }) });
const InstagramIcon = (props) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: [
  /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5" }),
  /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
  /* @__PURE__ */ jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
] });
const LinkedinIcon = (props) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" }) });
const TikTokIcon = (props) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" }) });
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-[#070D19] text-white pt-24 pb-12 overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00B4DB] to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-80 h-80 bg-teal/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 lg:col-span-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block transition-transform hover:scale-102", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logoAdph,
              alt: "ADPH Group",
              className: "h-12 w-auto brightness-0 invert"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm lg:text-base leading-relaxed max-w-sm font-medium", children: "Líderes en Gestión Humana y Salud Ocupacional, transformando el potencial organizacional a través de soluciones académicas y tecnológicas estratégicas." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: [
            { Icon: FacebookIcon, href: "https://www.facebook.com/ADPHGroup", label: "Facebook" },
            { Icon: InstagramIcon, href: "https://www.instagram.com/adph_group/", label: "Instagram" },
            { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/2664738/", label: "LinkedIn" },
            { Icon: TikTokIcon, href: "https://www.tiktok.com/@adphgroup", label: "TikTok" }
          ].map(({ Icon, href, label }) => /* @__PURE__ */ jsx(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": label,
              className: "w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#00B4DB] hover:text-white hover:border-[#00B4DB] hover:-translate-y-1 transition-all duration-300 shadow-sm",
              children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
            },
            label
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "size-4.5 text-[#00B4DB]" }),
            " Programas"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            { label: "Cursos de Especialización", to: "/programas/cursos" },
            { label: "Diplomados Ejecutivos", to: "/programas/diplomados" },
            { label: "Programas de Especialización", to: "/programas/especializaciones" },
            { label: "Certificaciones Oficiales", to: "/programas/certificaciones" }
          ].map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: "text-slate-400 hover:text-[#00B4DB] flex items-center gap-1 text-sm font-semibold transition-all group",
              children: [
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#00B4DB] flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: item.label })
              ]
            }
          ) }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Laptop, { className: "size-4.5 text-[#00B4DB]" }),
            " Soluciones"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            { label: "Consultoría Estratégica", to: "/consultoria" },
            { label: "HR CoreX (Tech Suite)", to: "/hrcorex" },
            { label: "Entrenamiento Digital", to: "/entrenamiento-digital" },
            { label: "Sobre Nosotros", to: "/nosotros" }
          ].map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: "text-slate-400 hover:text-[#00B4DB] flex items-center gap-1 text-sm font-semibold transition-all group",
              children: [
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#00B4DB] flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: item.label })
              ]
            }
          ) }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { className: "text-sm font-extrabold uppercase tracking-widest text-white mb-8 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "size-4.5 text-[#00B4DB]" }),
            " Contacto"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-[#00B4DB]", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4.5 h-4.5" }) }),
              /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-xs lg:text-sm font-semibold leading-relaxed", children: [
                "Av. Javier Prado Este 560 ",
                /* @__PURE__ */ jsx("br", {}),
                " Of. 2302, San Isidro, Lima"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-[#00B4DB]", children: /* @__PURE__ */ jsx(Phone, { className: "w-4.5 h-4.5" }) }),
              /* @__PURE__ */ jsx("a", { href: "tel:+51924943982", className: "text-slate-400 text-xs lg:text-sm font-semibold hover:text-[#00B4DB] transition-colors leading-relaxed", children: "+51 924 943 982" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-[#00B4DB]", children: /* @__PURE__ */ jsx(Mail, { className: "w-4.5 h-4.5" }) }),
              /* @__PURE__ */ jsx("a", { href: "mailto:informes@adphgroup.com", className: "text-slate-400 text-xs lg:text-sm font-semibold hover:text-[#00B4DB] transition-colors break-all leading-relaxed", children: "informes@adphgroup.com" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-3xs lg:text-2xs text-slate-500 uppercase tracking-[0.25em] font-extrabold", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-2 md:gap-6", children: [
          /* @__PURE__ */ jsx("span", { children: "© 2026 ADPH GROUP SAC" }),
          /* @__PURE__ */ jsx("span", { className: "hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700" }),
          /* @__PURE__ */ jsx("span", { children: "Todos los derechos reservados" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: /* @__PURE__ */ jsx("span", { className: "hidden lg:block text-slate-600 normal-case tracking-normal font-semibold text-xs", children: "Razón Social: ADPH GROUP SAC · Lima, Perú" }) })
      ] })
    ] })
  ] });
}
const WhatsAppIcon = (props) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) });
function WhatsAppFloat() {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: "https://wa.me/51924943982",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Contactar por WhatsApp",
      className: "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elegant flex items-center justify-center hover:scale-110 transition-transform",
      style: { boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)" },
      children: [
        /* @__PURE__ */ jsx(WhatsAppIcon, { className: "w-7 h-7" }),
        /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" })
      ]
    }
  );
}
export {
  Footer as F,
  Navbar as N,
  WhatsAppFloat as W
};
