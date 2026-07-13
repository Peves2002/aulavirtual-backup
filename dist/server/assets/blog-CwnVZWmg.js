import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import "react";
const ARTICLES = [{
  id: "tendencias-seleccion-2026",
  title: "Tendencias en Selección y Reclutamiento de Personal para el 2026",
  category: "Reclutamiento & ATS",
  readTime: "5 min lectura",
  date: "15 de Mayo, 2026",
  desc: "Descubre cómo la inteligencia artificial predictiva y los embudos automatizados están redefiniendo la captación del talento idóneo.",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  author: "Mag. Roberto Castillo",
  role: "Director de Gestión Humana"
}, {
  id: "importancia-clima-laboral",
  title: "El Impacto Real del Clima Laboral en la Retención del Talento",
  category: "Clima Organizacional",
  readTime: "7 min lectura",
  date: "28 de Abril, 2026",
  desc: "Métricas y estrategias clave para medir la satisfacción de tus colaboradores y reducir la rotación no deseada de forma medible.",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  author: "Mag. Sofía Luna",
  role: "Consultora de Clima & Cultura"
}, {
  id: "evaluacion-psicosocial-sunafil",
  title: "Guía Completa para el Monitoreo de Factores de Riesgo Psicosocial",
  category: "Salud Ocupacional",
  readTime: "10 min lectura",
  date: "10 de Abril, 2026",
  desc: "Cumplimiento legal y metodología paso a paso para la evaluación psicosocial según las normativas vigentes de fiscalización en la región.",
  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  author: "Dr. Alberto Varela",
  role: "Auditor ISO 45001"
}];
function BlogPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-24 lg:pt-28 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden border-b border-slate-100", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("section", { className: "py-20 max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 15
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: false,
          amount: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-extrabold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
          "Conocimiento y Aprendizaje"
        ] }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: false,
          amount: 0
        }, transition: {
          duration: 0.6,
          delay: 0.1
        }, className: "text-slate-900 font-black text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto leading-tight", children: [
          "Nuestro",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Blog Organizacional" })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: false,
          amount: 0
        }, transition: {
          duration: 0.6,
          delay: 0.2
        }, className: "text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium", children: "Tendencias, herramientas estratégicas e investigación en Gestión de Personas, Seguridad & Salud en el Trabajo y Soluciones Tecnológicas de RRHH." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: ARTICLES.map((art, idx) => /* @__PURE__ */ jsxs(motion.article, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: false,
      amount: 0.15
    }, transition: {
      duration: 0.6,
      delay: idx * 0.1
    }, whileHover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 128, 128, 0.06)"
    }, className: "bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col justify-between text-left transition-all duration-300 relative group overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal to-teal-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-t-[2rem]" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-sm group-hover:shadow-md transition-all duration-500", children: [
          /* @__PURE__ */ jsx("img", { src: art.image, alt: art.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm", children: art.category })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 text-teal" }),
            " ",
            art.date
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-teal" }),
            " ",
            art.readTime
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-slate-900 text-lg md:text-xl font-bold mb-3 group-hover:text-teal transition-colors leading-tight", children: art.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-medium", children: art.desc })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 pt-5 mt-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-800 text-[11px] font-extrabold block leading-tight", children: art.author }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[9px] font-bold uppercase tracking-wider block mt-0.5", children: art.role })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "inline-flex items-center gap-1 text-[11px] font-extrabold text-teal hover:text-teal-glow transition-all uppercase tracking-wider group/btn", children: [
          "Leer ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" })
        ] })
      ] })
    ] }, art.id)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-50 py-20 border-t border-slate-100 text-center relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
      /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Newsletter Informativa" }),
      /* @__PURE__ */ jsx("h2", { className: "text-slate-950 font-black text-3xl tracking-tight", children: "Mantente al día con las mejores prácticas" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed", children: "Suscríbete para recibir mensualmente nuestras últimas publicaciones, tendencias del sector y herramientas prácticas de gestión." }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap gap-3 justify-center max-w-md mx-auto", children: [
        /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Ingresa tu correo profesional", className: "flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors shadow-sm font-medium" }),
        /* @__PURE__ */ jsx(Link, { to: "/contacto", className: "rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold px-6 py-3.5 transition-all text-xs uppercase tracking-wider shadow-sm", children: "Suscribirme" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  BlogPage as component
};
