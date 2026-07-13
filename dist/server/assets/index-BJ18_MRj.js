import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { H as HeroForm } from "./HeroForm-nKGnqK91.js";
import { ArrowRight, BookOpen, ChevronRight, Quote } from "lucide-react";
import "react";
import "framer-motion";
const ESCUELAS = [{
  id: "psicologia-organizacional",
  name: "Escuela de Psicología Organizacional",
  desc: "Formación de vanguardia para potenciar el talento y el comportamiento humano en el trabajo.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
}, {
  id: "liderazgo-capital-humano",
  name: "Escuela de Liderazgo y Capital Humano",
  desc: "Desarrolla habilidades directivas y estratégicas para liderar equipos de alto rendimiento.",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
}, {
  id: "psicologia-ocupacional-sst",
  name: "Escuela de Psicología Ocupacional y SST",
  desc: "Especialización enfocada en el bienestar laboral y prevención de riesgos psicosociales.",
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
}, {
  id: "aprendizaje-experiencial",
  name: "Centro de Aprendizaje Experiencial",
  desc: "Metodologías vivenciales e interactivas para una formación corporativa práctica y memorable.",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
}];
const PROGRAMAS = [{
  id: 1,
  title: "Diplomado en Gestión del Clima y Cultura",
  category: "Escuela de Psicología Org.",
  duration: "6 meses",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80"
}, {
  id: 2,
  title: "Especialización en People Analytics",
  category: "Escuela de Liderazgo y CH",
  duration: "4 meses",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
}, {
  id: 3,
  title: "Curso de Liderazgo Ágil y Scrum",
  category: "Escuela de Liderazgo y CH",
  duration: "2 meses",
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80"
}, {
  id: 4,
  title: "Programa en Prevención de Riesgos",
  category: "Escuela de Psicología Ocupacional",
  duration: "5 meses",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
}, {
  id: 5,
  title: "Taller de Team Building Dinámico",
  category: "Centro de Aprendizaje",
  duration: "2 semanas",
  image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80"
}, {
  id: 6,
  title: "Gestión de Recursos Humanos Básico",
  category: "Escuela de Liderazgo y CH",
  duration: "1 mes",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
}];
const TESTIMONIOS = [{
  id: 1,
  name: "María Fernández",
  role: "Gerente de RRHH en TechLatam",
  quote: "Los programas de ADPH me dieron las herramientas prácticas que necesitaba para reestructurar todo nuestro departamento. Excelente nivel.",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80"
}, {
  id: 2,
  name: "Carlos Ramírez",
  role: "Director de Operaciones",
  quote: "La metodología de casos de la Escuela de Liderazgo superó mis expectativas. Pude aplicar lo aprendido desde la primera semana.",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80"
}, {
  id: 3,
  name: "Lucía Vargas",
  role: "Analista de Cultura Org.",
  quote: "Destaco la calidad de los docentes. Profesionales con trayectoria real que comparten su experiencia y te guían paso a paso.",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80"
}];
const BLOGS = [{
  id: 1,
  title: "El futuro del liderazgo en la era digital y remota",
  date: "15 Oct, 2023",
  image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80"
}, {
  id: 2,
  title: "Salud Mental y Prevención en el Entorno Laboral",
  date: "02 Nov, 2023",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"
}, {
  id: 3,
  title: "Gamificación: El secreto del aprendizaje corporativo",
  date: "20 Nov, 2023",
  image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80"
}];
function Index() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(HeroForm, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Desarrolla tu potencial ",
      /* @__PURE__ */ jsx("br", {}),
      "con ADPH Group"
    ] }), subtitle: "Educación ejecutiva especializada para líderes que buscan transformar la cultura y productividad de sus organizaciones.", backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80", formTitle: "REGÍSTRATE A NUESTRO VIVE DPA" }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-widest block mb-4", children: "Nuestra Oferta Académica" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Escuelas Especializadas" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mt-6" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: ESCUELAS.map((escuela) => /* @__PURE__ */ jsxs("div", { className: "group cursor-pointer bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-48 overflow-hidden relative", children: [
          /* @__PURE__ */ jsx("img", { src: escuela.image, alt: escuela.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-900 mb-2 leading-tight", children: escuela.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 font-semibold line-clamp-3 mb-6 flex-grow", children: escuela.desc }),
          /* @__PURE__ */ jsxs(Link, { to: `/escuelas/${escuela.id}`, className: "inline-flex items-center gap-1.5 text-xs font-bold text-teal uppercase tracking-widest group-hover:text-[#0083B0] transition-colors mt-auto", children: [
            "Conocer más ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] })
      ] }, escuela.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-[#FBFCFD] border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Programas Recientes" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: PROGRAMAS.map((prog) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden group flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-56 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: prog.image, alt: prog.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider rounded-none", children: prog.category })
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
      ] }, prog.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/programas", className: "inline-flex items-center justify-center bg-slate-900 hover:bg-teal text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg", children: "Ver más Programas" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 bg-slate-50 border-b border-slate-200 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: {
        backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
        backgroundSize: "40px 40px"
      } }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-widest block mb-4", children: "Empresas B2B" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-5xl tracking-tight mb-8", children: "Soluciones Corporativas" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto h-48 border border-dashed border-slate-300 bg-white/60 flex items-center justify-center text-slate-400 font-semibold text-sm rounded-none shadow-sm", children: "[ Contenido de Soluciones Corporativas próximamente ]" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-b border-slate-100 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-widest block", children: "Sobre Nosotros" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Expertos en formación ejecutiva" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base md:text-lg font-semibold leading-relaxed", children: "ADPH Group es una institución líder dedicada a transformar el talento de los profesionales de Latinoamérica. Mediante programas de alta exigencia, una plana docente de primer nivel y metodologías centradas en la acción, garantizamos un aprendizaje orientado a resultados corporativos tangibles." }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Link, { to: "/nosotros", className: "inline-flex items-center gap-2 text-teal font-extrabold uppercase text-xs tracking-widest hover:text-[#0083B0] transition-colors", children: [
          "Conoce nuestra historia ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full overflow-hidden border border-slate-100 shadow-xl rounded-none", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", alt: "Nosotros ADPH Group", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -left-6 w-32 h-32 bg-teal/10 z-0 rounded-none border border-teal/20 -rotate-6" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Lo que dicen nuestros alumnos" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: TESTIMONIOS.map((testimonio) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 border border-slate-200 rounded-none relative flex flex-col shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx(Quote, { className: "absolute top-6 right-6 w-10 h-10 text-slate-100" }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-600 font-semibold text-sm leading-relaxed mb-8 flex-grow relative z-10 italic", children: [
          '"',
          testimonio.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-auto", children: [
          /* @__PURE__ */ jsx("img", { src: testimonio.image, alt: testimonio.name, className: "w-12 h-12 rounded-full object-cover border border-slate-200" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-900 font-bold text-sm leading-tight", children: testimonio.name }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-xs font-semibold", children: testimonio.role })
          ] })
        ] })
      ] }, testimonio.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-widest block mb-4", children: "Actualidad" }),
          /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl tracking-tight", children: "Nuestro Blog" }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mt-4" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex text-xs font-extrabold uppercase tracking-widest text-teal hover:text-[#0083B0] items-center gap-2 transition-colors", children: [
          "Ver todos los artículos ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: BLOGS.map((blog) => /* @__PURE__ */ jsxs("div", { className: "group cursor-pointer flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "h-56 overflow-hidden rounded-none mb-6 border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: blog.image, alt: blog.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2", children: blog.date }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-900 group-hover:text-teal transition-colors leading-tight", children: blog.title })
      ] }, blog.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 bg-slate-950 overflow-hidden text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80", className: "w-full h-full object-cover opacity-30", alt: "CTA BG" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/80" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6 space-y-8", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Proceso de Admisión" }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-3xl md:text-5xl tracking-tight leading-tight", children: "¿Listo para llevar tu carrera al siguiente nivel?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg md:text-xl font-semibold max-w-2xl mx-auto", children: "Únete a nuestra exclusiva red de profesionales e inscríbete hoy mismo." }),
        /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "inline-flex items-center gap-2 bg-teal hover:bg-[#0083B0] shadow-xl text-white font-extrabold px-10 py-5 text-sm uppercase tracking-widest transition-colors rounded-none", children: [
          "Iniciar proceso de Admisión ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  Index as component
};
