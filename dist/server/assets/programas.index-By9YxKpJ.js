import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { H as HeroForm } from "./HeroForm-nKGnqK91.js";
import { Clock, DollarSign, User, ArrowRight } from "lucide-react";
const PROGRAMS = [{
  id: "diplomado-talento",
  name: "Diplomado en Gestión del Talento Humano",
  cat: "Diplomados",
  desc: "Estrategias modernas para liderar y desarrollar el capital humano.",
  duration: "16 semanas",
  price: "S/ 2,500",
  instructor: "Mg. Lisbeth Suarez",
  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
}, {
  id: "certificacion-psicologia",
  name: "Certificación en Psicología Ocupacional",
  cat: "Certificaciones",
  desc: "Herramientas clínicas aplicadas al entorno laboral peruano.",
  duration: "10 semanas",
  price: "S/ 1,800",
  instructor: "Dr. Carlos Ruiz",
  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
}, {
  id: "especializacion-competencias",
  name: "Especialización en Evaluación por Competencias",
  cat: "Especializaciones",
  desc: "Metodologías para diseñar y aplicar evaluaciones efectivas.",
  duration: "12 semanas",
  price: "S/ 2,100",
  instructor: "MBA. Elmer Requejo",
  image: "https://images.unsplash.com/photo-1454165833762-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
}, {
  id: "certificacion-lego",
  name: "Certificación LEGO® Serious Play",
  cat: "Certificaciones",
  desc: "Facilitación experiencial para equipos de alto desempeño.",
  duration: "6 semanas",
  price: "S/ 1,500",
  instructor: "Ing. Pedro Mendoza",
  image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
}, {
  id: "programa-riesgo-psicosocial",
  name: "Programa: Factores de Riesgo Psicosocial",
  cat: "Programas",
  desc: "Identifica y gestiona los riesgos psicosociales en el trabajo.",
  duration: "4 semanas",
  price: "S/ 800",
  instructor: "Mg. Ana Torres",
  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
}, {
  id: "diplomado-seguridad",
  name: "Diplomado en Seguridad y Salud en el Trabajo",
  cat: "Diplomados",
  desc: "Cumple la Ley 29783 y construye cultura preventiva sólida.",
  duration: "14 semanas",
  price: "S/ 2,200",
  instructor: "Ing. Carlos Ruiz",
  image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
}];
const FILTERS = ["Todos", "Diplomados", "Certificaciones", "Programas", "Especializaciones"];
function ProgramasPage() {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? PROGRAMS : PROGRAMS.filter((p) => p.cat === active);
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(HeroForm, { title: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Catálogo de ",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Programas" })
    ] }), subtitle: "Especializaciones y diplomados diseñados para potenciar tus competencias profesionales y resolver retos del entorno laboral.", backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80", formTitle: "REGÍSTRATE A NUESTRO VIVE DPA" }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-[#FBFCFD]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-widest block mb-4", children: "Nuestra Oferta Académica" }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-3xl md:text-4xl tracking-tight mb-4", children: "Encuentra tu próximo Programa" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-teal mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-16", children: FILTERS.map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(f), className: `px-6 py-2.5 rounded-none text-[11px] font-extrabold uppercase tracking-widest transition-all ${active === f ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`, children: f }, f)) }),
      /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((p, i) => /* @__PURE__ */ jsxs(motion.article, { layout: true, initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, exit: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        duration: 0.4,
        delay: i * 0.05
      }, className: "group bg-white rounded-none border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: p.image, alt: p.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider rounded-none", children: p.cat })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-extrabold text-teal uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
              " ",
              p.duration
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "w-3.5 h-3.5" }),
              " ",
              p.price
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-teal transition-colors", children: p.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 font-semibold mb-6 flex-1 leading-relaxed", children: p.desc }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-slate-100 flex items-center justify-between mt-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-slate-500", children: [
              /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-slate-400" }),
              p.instructor
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: `/programas`, className: "inline-flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-widest group-hover:text-teal transition-colors", children: [
              "Detalles ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] })
      ] }, p.id)) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProgramasPage as component
};
