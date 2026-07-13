import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight, Clock, Globe, Award, CheckCircle2 } from "lucide-react";
import "react";
const DIPLOMADOS_DATA = [{
  id: "diplomado-talento",
  title: "Diplomado en Gestión del Talento Humano",
  desc: "Estrategias modernas y herramientas tecnológicas de vanguardia para liderar, atraer y desarrollar el capital humano en entornos cambiantes y altamente competitivos.",
  duration: "16 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Diplomado Ejecutivo en Gestión del Talento Humano",
  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  modules: ["Evolución y Dirección de la Gestión Humana del Futuro", "Atracción, Selección y Onboarding Asistidos por Tecnología (ATS)", "Estrategias de Capacitación, Reskilling y Aprendizaje Organizacional", "Modelos Modernos de Compensación Estratégica y Beneficios", "Cultura y Clima Organizacional como Motores de Alto Rendimiento"],
  instructor: {
    name: "Mag. Roberto Castillo",
    role: "Ex-Director Regional de RRHH en Telecomunicaciones & Consultor Estratégico",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
}, {
  id: "diplomado-seguridad",
  title: "Diplomado en Seguridad y Salud en el Trabajo",
  desc: "Formación integral técnico-legal para la implementación, auditoría y optimización del Sistema de Gestión de SST bajo la Ley 29783 y estándares internacionales.",
  duration: "14 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Diplomado Especializado en Seguridad y Salud en el Trabajo",
  image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  modules: ["Diseño y Estructura del Sistema de Gestión de Seguridad y Salud (SG-SST)", "Metodología de Identificación de Peligros e IPERC Continuo", "Salud Ocupacional, Ergonomía y Vigilancia Médica Organizacional", "Preparación de Auditorías y Fiscalizaciones Exitosas ante SUNAFIL", "Liderazgo Transformacional, Cultura de Prevención y Clima de Seguridad"],
  instructor: {
    name: "Dr. Alberto Varela",
    role: "Auditor Líder Registrado & Ex-Asesor del Ministerio de Trabajo en SST",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
}];
function ProgramasDiplomadosPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00B4DB]/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative pt-28 lg:pt-32 bg-gradient-to-b from-slate-50 via-[#FBFCFD] to-[#FBFCFD] border-b border-slate-100 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] z-0", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80", className: "w-full h-full object-cover", alt: "Hero BG" }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 max-w-7xl mx-auto px-6 lg:px-10 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 text-left space-y-6", children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 15
          }, animate: {
            opacity: 1,
            y: 0
          }, className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-extrabold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            "Educación Ejecutiva de Alto Impacto"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-slate-900 font-black text-4xl md:text-6xl tracking-tight leading-none", children: [
            "Diplomados",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Estratégicos" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base md:text-lg leading-relaxed font-semibold max-w-2xl", children: "Lidera con visión global y herramientas de vanguardia. Diplomados exhaustivos diseñados bajo un enfoque estratégico y metodologías ágiles aplicables inmediatamente a tu organización." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-2", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold px-6 py-4 transition-all hover:shadow-glow hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center gap-2", children: [
              "Matrícula en Línea ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-6 py-4 transition-all hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center gap-2", children: [
              "Consultar Vacantes ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 z-10 group", children: [
            /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80", alt: "Diplomados ADPH", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-[3rem] border-2 border-teal/10 -rotate-3 z-0" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16 space-y-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Dirección Estratégica" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Diplomados Disponibles" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-semibold", children: "Especialízate en áreas críticas del capital humano e higiene laboral de la mano de ponentes de prestigio en Latinoamérica." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: DIPLOMADOS_DATA.map((diplomado, idx) => {
        const isEven = idx % 2 === 0;
        return /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true,
          amount: 0.1
        }, transition: {
          duration: 0.7
        }, className: `flex flex-col lg:flex-row gap-10 lg:gap-16 items-center p-6 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white ${isEven ? "" : "lg:flex-row-reverse"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-[45%] flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/11] rounded-3xl overflow-hidden border border-slate-100 shadow-inner group", children: [
            /* @__PURE__ */ jsx("img", { src: diplomado.image, alt: diplomado.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2.5", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                diplomado.duration
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                diplomado.modality
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                diplomado.certification
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-slate-950 font-black text-2xl tracking-tight leading-tight", children: diplomado.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed font-semibold", children: diplomado.desc }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.25em] block mb-1", children: "Currícula Académica" }),
              /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700", children: diplomado.modules.map((mod) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-teal flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: mod })
              ] }, mod)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 max-w-md", children: [
              /* @__PURE__ */ jsx("img", { src: diplomado.instructor.image, alt: diplomado.instructor.name, className: "w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block", children: "Director Académico" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-800 text-xs font-extrabold block leading-tight", children: diplomado.instructor.name }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-[10px] font-bold block mt-0.5 leading-tight", children: diplomado.instructor.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxs(Link, { to: `/programas/${diplomado.id}`, className: "px-5 py-3 rounded-xl bg-slate-100 hover:bg-teal hover:text-white text-slate-700 font-extrabold uppercase text-[10px] tracking-wider transition-all inline-flex items-center gap-1.5", children: [
                "Ver Detalles ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "px-5 py-3 rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-sm hover:shadow-md inline-flex items-center gap-1.5", children: [
                "Matricularme ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ] })
            ] })
          ] })
        ] }, diplomado.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50/50 border-t border-b border-slate-100 relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 text-left space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Excelencia Académica" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "Formación Ejecutiva con un Enfoque 100% Práctico" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm md:text-base font-semibold leading-relaxed", children: "Nuestros diplomados integran simulaciones complejas de negocio, talleres de resolución y mentoría en vivo para asegurar la transferencia del conocimiento al campo de acción." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 pt-4", children: [{
          title: "Casos de Estudio Reales",
          desc: "Materiales y simulaciones ejecutivas con metodologías de las escuelas de negocios más prestigiosas.",
          img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Plataforma de Alto Nivel",
          desc: "Campus virtual moderno para gestionar recursos de aprendizaje de forma fluida y autónoma.",
          img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Asesoría de Expertos",
          desc: "Acceso ilimitado a nuestros directores y asesores de amplia trayectoria directiva en Latinoamérica.",
          img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Comunidad y Networking",
          desc: "Únete a un club ejecutivo exclusivo de graduados y acelera tu posicionamiento y oportunidades profesionales.",
          img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&h=120&q=80"
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("img", { src: item.img, alt: item.title, className: "w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-100 shadow-inner" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-800 text-xs font-extrabold leading-tight block", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-[10px] font-semibold leading-relaxed mt-1", children: item.desc })
          ] })
        ] }, item.title)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-[4/5] shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80", alt: "Strategic Meeting", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80", alt: "Laptops learning", className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=500&q=80", alt: "Facilitator screen", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-[4/5] shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80", alt: "Executive presenting", className: "w-full h-full object-cover" }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-slate-950 py-20 text-center relative overflow-hidden border-t border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[160px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Soluciones de Desarrollo Organizacional In House" }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "Desarrolla el Liderazgo y Talento en tu Empresa" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed", children: "Co-diseñamos diplomados corporativos a la medida del plan de sucesión y las metas estratégicas de tu organización, empoderando a tus gerentes y mandos medios con destrezas de impacto regional." }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold px-8 py-4 transition-all hover:shadow-glow hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center gap-2", children: [
          "Contactar con Dirección Académica ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProgramasDiplomadosPage as component
};
