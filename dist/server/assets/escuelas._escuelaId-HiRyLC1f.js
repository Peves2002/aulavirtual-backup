import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { H as HeroForm } from "./HeroForm-nKGnqK91.js";
import { BookOpen, ChevronRight } from "lucide-react";
import { b as Route } from "./router-B-h-GLFE.js";
import "react";
import "framer-motion";
import "@tanstack/react-query";
const ESCUELAS_DB = {
  "psicologia-organizacional": {
    name: "Escuela de Psicología Organizacional",
    desc: "Formación de vanguardia para potenciar el talento y el comportamiento humano en el trabajo.",
    heroBg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80"
  },
  "liderazgo-capital-humano": {
    name: "Escuela de Liderazgo y Capital Humano",
    desc: "Desarrolla habilidades directivas y estratégicas para liderar equipos de alto rendimiento.",
    heroBg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
  },
  "psicologia-ocupacional-sst": {
    name: "Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo",
    desc: "Especialización enfocada en el bienestar laboral y prevención de riesgos psicosociales.",
    heroBg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
  },
  "aprendizaje-experiencial": {
    name: "Centro de Aprendizaje Experiencial",
    desc: "Metodologías vivenciales e interactivas para una formación corporativa práctica y memorable.",
    heroBg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
  }
};
const PROGRAMAS_DB = [{
  id: 1,
  title: "Diplomado en Gestión del Clima y Cultura",
  category: "Escuela de Psicología Organizacional",
  duration: "6 meses",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80"
}, {
  id: 2,
  title: "Especialización en People Analytics",
  category: "Escuela de Liderazgo y Capital Humano",
  duration: "4 meses",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
}, {
  id: 3,
  title: "Curso de Liderazgo Ágil y Scrum",
  category: "Escuela de Liderazgo y Capital Humano",
  duration: "2 meses",
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80"
}, {
  id: 4,
  title: "Programa en Prevención de Riesgos",
  category: "Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo",
  duration: "5 meses",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
}, {
  id: 5,
  title: "Taller de Team Building Dinámico",
  category: "Centro de Aprendizaje Experiencial",
  duration: "2 semanas",
  image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80"
}, {
  id: 6,
  title: "Gestión de Recursos Humanos Básico",
  category: "Escuela de Liderazgo y Capital Humano",
  duration: "1 mes",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
}];
function EscuelaPage() {
  const {
    escuelaId
  } = Route.useParams();
  const escuela = ESCUELAS_DB[escuelaId] || ESCUELAS_DB["liderazgo-capital-humano"];
  const programasEscuela = PROGRAMAS_DB.filter((p) => p.category === escuela.name);
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(HeroForm, { title: escuela.name, subtitle: escuela.desc, backgroundImage: escuela.heroBg, defaultSchool: escuela.name }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Programas Especializados" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mt-6" })
      ] }),
      programasEscuela.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: programasEscuela.map((prog) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-56 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: prog.image, alt: prog.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider", children: prog.category })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-widest mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
            " ",
            prog.duration
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 leading-tight mb-4", children: prog.title }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsxs(Link, { to: `/programas`, className: "text-sm font-bold text-slate-700 hover:text-teal inline-flex items-center gap-2 transition-colors", children: [
            "Ver detalle ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] }) })
        ] })
      ] }, prog.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-slate-50 border border-dashed border-slate-200", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-semibold", children: "Próximamente abriremos nuevos programas para esta escuela." }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  EscuelaPage as component
};
