import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight, Clock, Globe, Award, CheckCircle2 } from "lucide-react";
import "react";
const ESPECIALIZACIONES_DATA = [{
  id: "especializacion-competencias",
  title: "Especialización en Evaluación por Competencias",
  desc: "Metodologías avanzadas para diseñar y aplicar procesos de evaluación de talento efectivos, objetivos y alineados con la estrategia del negocio moderno.",
  duration: "12 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Especialista en Evaluación por Competencias",
  image: "https://images.unsplash.com/photo-1454165833762-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  modules: ["Modelos de Competencias Organizacionales y Diccionarios", "Entrevistas por Incidentes Críticos (BEI) y Metodología STAR", "Diseño y Facilitación de Assessment Center Moderno", "Gestión Integral de Desempeño y Retroalimentación de Impacto"],
  instructor: {
    name: "Mag. Sofía Luna",
    role: "Directora Regional de Gestión del Talento & HR Business Partner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
}, {
  id: "especializacion-clima",
  title: "Especialización Avanzada en Clima Laboral y D.O.",
  desc: "Aprende a medir, diagnosticar e intervenir estratégicamente en la cultura y ambiente de trabajo para disparar la productividad y retener el talento clave.",
  duration: "10 semanas",
  modality: "Online en vivo (Sincrónico)",
  certification: "Especialista en Clima y Cultura Organizacional",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  modules: ["Metodologías de Medición de Clima y Diseño de Instrumentos", "Análisis Estadístico e Interpretación Diagnóstica", "Planes de Acción e Intervención en Ambientes Conflictivos", "Liderazgo Transformacional, Cultura y Liderazgo Exponencial"],
  instructor: {
    name: "MBA. Elmer Requejo P.",
    role: "Ex-Director de DO en corporativos multinacionales & Consultor Senior",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  }
}];
function ProgramasEspecializacionesPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00B4DB]/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative pt-28 lg:pt-32 bg-gradient-to-b from-slate-50 via-[#FBFCFD] to-[#FBFCFD] border-b border-slate-100 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] z-0", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", className: "w-full h-full object-cover", alt: "Hero BG" }) }),
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
            "Especialización Ejecutiva"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-slate-900 font-black text-4xl md:text-6xl tracking-tight leading-none", children: [
            "Programas de",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Especialización" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base md:text-lg leading-relaxed font-semibold max-w-2xl", children: "Lleva tus competencias técnicas al siguiente nivel. Programas de mediana duración orientados a consolidar habilidades específicas de alto valor profesional en el mercado de la Gestión Humana." }),
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
            /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80", alt: "Especializaciones ADPH", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-[3rem] border-2 border-teal/10 -rotate-3 z-0" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16 space-y-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Desarrollo Profesional" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight", children: "Especializaciones Disponibles" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-semibold", children: "Adquiere un dominio metodológico absoluto en procesos estratégicos organizacionales liderado por la facultad más experimentada de la región." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: ESPECIALIZACIONES_DATA.map((programa, idx) => {
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
            /* @__PURE__ */ jsx("img", { src: programa.image, alt: programa.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2.5", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.duration
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.modality
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-3.5 h-3.5 text-teal" }),
                " ",
                programa.certification
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-slate-950 font-black text-2xl tracking-tight leading-tight", children: programa.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed font-semibold", children: programa.desc }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 pt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.25em] block mb-1", children: "Currícula Académica" }),
              /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700", children: programa.modules.map((mod) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-teal flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: mod })
              ] }, mod)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 max-w-md", children: [
              /* @__PURE__ */ jsx("img", { src: programa.instructor.image, alt: programa.instructor.name, className: "w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block", children: "Docente Expositor" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-800 text-xs font-extrabold block leading-tight", children: programa.instructor.name }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-[10px] font-bold block mt-0.5 leading-tight", children: programa.instructor.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxs(Link, { to: `/programas/${programa.id}`, className: "px-5 py-3 rounded-xl bg-slate-100 hover:bg-teal hover:text-white text-slate-700 font-extrabold uppercase text-[10px] tracking-wider transition-all inline-flex items-center gap-1.5", children: [
                "Ver Detalles ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "px-5 py-3 rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-sm hover:shadow-md inline-flex items-center gap-1.5", children: [
                "Matricularme ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ] })
            ] })
          ] })
        ] }, programa.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50/50 border-t border-b border-slate-100 relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 text-left space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Experiencia de Aprendizaje" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "Una experiencia de aprendizaje altamente visual e interactiva" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm md:text-base font-semibold leading-relaxed", children: "Nuestra propuesta educativa sustituye la enseñanza pasiva tradicional por dinámicas inmersivas y un ecosistema tecnológico diseñado para el éxito académico." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 pt-4", children: [{
          title: "Casos Reales Aplicados",
          desc: "Análisis estratégico enfocado en resolver conflictos de negocio reales.",
          img: "https://images.unsplash.com/photo-1454165833762-d5d88e9218df?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Campus Multidispositivo",
          desc: "Materiales educativos y clases grabadas disponibles 24/7 en alta definición.",
          img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Mentoría Directa",
          desc: "Sesiones de feedback uno-a-uno con directores de Gestión Humana de Latam.",
          img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80"
        }, {
          title: "Networking Regional",
          desc: "Interactúa y comparte con profesionales líderes de toda América Latina.",
          img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=120&h=120&q=80"
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
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-[4/5] shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1552581230-c0137413876e?auto=format&fit=crop&w=500&q=80", alt: "Team Workshop", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80", alt: "Online Class", className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80", alt: "Class Interaction", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden aspect-[4/5] shadow-md border border-slate-100", children: /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=500&q=80", alt: "Networking break", className: "w-full h-full object-cover" }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-slate-950 py-20 text-center relative overflow-hidden border-t border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[160px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Programas In House / A la Medida" }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "Especializa a tus equipos en competencias clave" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed", children: "Personalizamos nuestras currículas de especialización de acuerdo a las herramientas, cultura e industria de tu corporación, impulsando resultados organizacionales extraordinarios." }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold px-8 py-4 transition-all hover:shadow-glow hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center gap-2", children: [
          "Contactar con un Consultor Académico ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProgramasEspecializacionesPage as component
};
