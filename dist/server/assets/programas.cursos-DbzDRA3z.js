import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { H as HeroForm } from "./HeroForm-nKGnqK91.js";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Globe, Award, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
const PROGRAMAS_DATA = [{
  id: "curso-riesgo-psicosocial",
  title: "Programa: Factores de Riesgo Psicosocial",
  category: "Escuela de Recursos Humanos",
  desc: "Identificación, evaluación y gestión de riesgos según la normativa legal vigente.",
  duration: "4 semanas",
  modality: "Online (Asincrónico)",
  certification: "Certificación Oficial ADPH Group",
  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  modules: ["Normativa Legal Peruana (Ley 29783 y R.M. 375-2008-TR)", "Metodología de Identificación y Checklists de Control", "Plan de Monitoreo Psicosocial en las Organizaciones", "Implementación de Medidas de Control y Mitigación de Estrés"],
  instructor: {
    name: "Ing. Carlos Ruiz",
    role: "Auditor Líder ISO 45001 & Consultor en SST",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
}, {
  id: "curso-seleccion-ia",
  title: "Programa Ejecutivo: Selección con Inteligencia Artificial",
  category: "Escuela de Tecnología",
  desc: "Aprende a digitalizar y automatizar tu embudo de selección reclutando con Inteligencia Artificial.",
  duration: "3 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Acreditación Tecnológica en RRHH",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  modules: ["Introducción a los Sistemas ATS Modernos (CoreX Recruiter)", "Prompt Engineering para Redacción de Perfiles y Convocatorias", "Filtros de Candidatos Asistidos por IA y Clasificación", "Entrevistas en Video Automatizadas y Métricas de Selección"],
  instructor: {
    name: "Mg. Lisbeth Suarez",
    role: "Especialista en Talent Acquisition & HR Tech",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
}, {
  id: "curso-feedback-360",
  title: "Programa Avanzado: Feedback y Evaluación 360°",
  category: "Escuela de Liderazgo",
  desc: "Diseña e implementa metodologías de evaluación objetiva orientadas a KPIs y objetivos clave (OKRs).",
  duration: "4 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Certificado Ejecutivo en Liderazgo",
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  modules: ["Modelamiento de Formularios de Evaluación por Puestos", "Técnicas de Feedback Constructivo y Plan de Acción", "Alineamiento Estratégico de Objetivos Individuales y OKRs", "Plan de Retorno y Compensación de Alto Rendimiento"],
  instructor: {
    name: "MBA. Elmer Requejo P.",
    role: "Consultor Senior de Clima y Desempeño",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  }
}, {
  id: "prog-estrategia",
  title: "Programa en Gestión Estratégica",
  category: "Escuela de Negocios",
  desc: "Desarrolla visión empresarial y toma de decisiones a nivel directivo.",
  duration: "6 semanas",
  modality: "Híbrido",
  certification: "Diploma en Estrategia Corporativa",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  modules: ["Análisis del Entorno Competitivo", "Planeamiento Estratégico Financiero", "Innovación de Modelos de Negocio", "Implementación y OKRs"],
  instructor: {
    name: "Ph.D. Antonio Velasquez",
    role: "Director Financiero LATAM",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
}];
const ESCUELAS_FILTERS = ["Todos", "Escuela de Negocios", "Escuela de Recursos Humanos", "Escuela de Tecnología", "Escuela de Liderazgo", "Escuela de Operaciones"];
function ProgramasPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filteredProgramas = activeFilter === "Todos" ? PROGRAMAS_DATA : PROGRAMAS_DATA.filter((p) => p.category === activeFilter);
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(HeroForm, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Catálogo de ",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Programas" })
    ] }), subtitle: "Especializaciones dinámicas de alto impacto diseñadas para potenciar competencias técnicas inmediatas y resolver retos específicos del entorno laboral.", backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80" }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative z-10 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12 space-y-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Nuestra Oferta Académica" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Programas Disponibles" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-semibold", children: "Explora e inscríbete en nuestros programas liderados por consultores senior expertos en el sector." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 mb-16", children: ESCUELAS_FILTERS.map((filter) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveFilter(filter), className: `px-6 py-2.5 rounded-none text-[11px] font-extrabold uppercase tracking-widest transition-all ${activeFilter === filter ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`, children: filter }, filter)) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredProgramas.length > 0 ? filteredProgramas.map((programa, idx) => {
        const isEven = idx % 2 === 0;
        return /* @__PURE__ */ jsxs(motion.div, { layout: true, initial: {
          opacity: 0,
          scale: 0.95
        }, animate: {
          opacity: 1,
          scale: 1
        }, exit: {
          opacity: 0,
          scale: 0.95
        }, transition: {
          duration: 0.4
        }, className: `flex flex-col lg:flex-row gap-10 lg:gap-16 items-center p-8 rounded-none border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white ${isEven ? "" : "lg:flex-row-reverse"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-[45%] flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/11] overflow-hidden group border border-slate-100 bg-slate-50", children: [
            /* @__PURE__ */ jsx("img", { src: programa.image, alt: programa.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider", children: programa.category })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2.5", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.duration
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.modality
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.certification
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-slate-950 font-black text-2xl tracking-tight leading-tight", children: programa.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed font-semibold", children: programa.desc }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.25em] block mb-1", children: "Currícula Académica" }),
              /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700", children: programa.modules.map((mod) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-teal flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: mod })
              ] }, mod)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 max-w-md", children: [
              /* @__PURE__ */ jsx("img", { src: programa.instructor.image, alt: programa.instructor.name, className: "w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block", children: "Docente Expositor" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-800 text-sm font-extrabold block leading-tight mt-0.5", children: programa.instructor.name }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-[10px] font-bold block mt-0.5 leading-tight", children: programa.instructor.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxs(Link, { to: `/programas/${programa.id}`, className: "px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold uppercase text-xs tracking-widest transition-colors inline-flex items-center gap-2", children: [
                "Ver Detalles ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "px-6 py-4 bg-teal hover:bg-[#0083B0] text-white font-extrabold uppercase text-xs tracking-widest transition-colors inline-flex items-center gap-2", children: [
                "Matricularme ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              ] })
            ] })
          ] })
        ] }, programa.id);
      }) : /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "text-center py-24 bg-slate-50 border border-dashed border-slate-200", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-semibold", children: "No se encontraron programas para la escuela seleccionada." }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-slate-950 py-24 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[160px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Programas In House / Corporativos" }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "¿Deseas adaptar estos programas para tu empresa?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm font-semibold max-w-xl mx-auto leading-relaxed", children: "Diseñamos e impartimos programas in-house a la medida de tu organización, capacitando a tus líderes bajo metodologías dinámicas orientadas a la acción y resultados reales." }),
        /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "bg-teal hover:bg-[#0083B0] text-white font-extrabold px-8 py-5 transition-colors uppercase text-xs tracking-widest inline-flex items-center gap-2", children: [
          "Contactar con un Asesor ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProgramasPage as component
};
