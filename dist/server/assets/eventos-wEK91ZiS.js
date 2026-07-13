import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import "react";
const EVENTS = [{
  id: "webinar-automatizacion-ats",
  title: "Masterclass: Automatización Inteligente en Selección y Reclutamiento",
  category: "Webinar Gratuito",
  date: "12 de Junio, 2026",
  time: "4:00 PM (GMT-5)",
  modality: "Online en Vivo",
  desc: "Aprende a estructurar un embudo de selección digital (ATS) y aplicar test predictivos reduciendo tiempos operativos en un 70% sin perder la calidez humana.",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  speaker: "Mag. Roberto Castillo",
  role: "Director de ADPH Group & Consultor de Software RRHH"
}, {
  id: "taller-riesgo-psicosocial",
  title: "Taller: Gestión y Cumplimiento de Vigilancia Médica y Riesgo Psicosocial",
  category: "Taller Exclusivo",
  date: "25 de Junio, 2026",
  time: "9:00 AM (GMT-5)",
  modality: "Online en Vivo (Cupos Limitados)",
  desc: "Cómo afrontar exitosamente las auditorías de SUNAFIL mediante la implementación práctica del monitoreo psicosocial e historial de aptitudes médicas.",
  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  speaker: "Dr. Alberto Varela",
  role: "Médico Ocupacional y Auditor Líder en SST"
}, {
  id: "conferencia-futuro-rrhh",
  title: "Conferencia: El Futuro del Talento y Bienestar Ocupacional en Latam",
  category: "Conferencia Anual",
  date: "15 de Julio, 2026",
  time: "6:00 PM (GMT-5)",
  modality: "Presencial / Auditorio Corporativo",
  desc: "Tendencias globales en retención estratégica, flexibilidad laboral y la irrupción del bienestar digital en las organizaciones más exigentes de la región.",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  speaker: "Mag. Sofía Luna",
  role: "Facilitadora Serious Play & Consultora Senior de Clima"
}];
function EventosPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-24 lg:pt-28 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden border-b border-slate-100", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00B4DB]/5 rounded-full blur-[120px] pointer-events-none" }),
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
        }, className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B4DB]/10 border border-[#00B4DB]/20 text-[#0083B0] text-[11px] font-extrabold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx(Trophy, { className: "w-3.5 h-3.5" }),
          "Educación y Networking Ejecutivo"
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
          "Eventos &",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Webinars Exclusivos" })
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
        }, className: "text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium", children: "Únete a nuestras masterclasses en vivo, conversatorios de valor y talleres prácticos guiados por consultores senior y líderes de la industria en Latinoamérica." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 md:grid-cols-2 gap-8", children: EVENTS.map((evt, idx) => /* @__PURE__ */ jsxs(motion.div, { initial: {
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
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00B4DB] to-[#0083B0] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-t-[2rem]" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-sm group-hover:shadow-md transition-all duration-500", children: [
          /* @__PURE__ */ jsx("img", { src: evt.image, alt: evt.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-teal text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 fill-current" }),
            " ",
            evt.category
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-b border-slate-100 pb-5 mb-5 text-[11px] font-bold text-slate-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-teal flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: evt.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-teal flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: evt.time })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-800", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-teal flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: evt.modality })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-slate-900 text-lg md:text-xl font-bold mb-3 group-hover:text-teal transition-colors leading-tight", children: evt.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-medium", children: evt.desc })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 pt-5 mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[9px] font-bold uppercase tracking-wider block", children: "Facilitador / Expositor" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800 text-[12px] font-extrabold block mt-0.5 leading-tight", children: evt.speaker }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[9px] font-bold block mt-0.5 leading-tight", children: evt.role })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "block text-center w-full bg-slate-100 group-hover:bg-teal group-hover:text-white text-slate-800 font-extrabold py-3.5 rounded-xl uppercase text-[10px] tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5", children: [
          "Registrarme Gratis ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" })
        ] })
      ] })
    ] }, evt.id)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-50 py-20 border-t border-slate-100 text-center relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
      /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold text-xs uppercase tracking-[0.2em] block", children: "Talleres Corporativos Cerrados" }),
      /* @__PURE__ */ jsx("h2", { className: "text-slate-950 font-black text-3xl md:text-4xl tracking-tight", children: "¿Deseas este evento exclusivo para tu empresa?" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed", children: "Diseñamos y facilitamos conferencias, capacitaciones In-house y talleres especializados adaptados 100% a la realidad de tu equipo de trabajo." }),
      /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Link, { to: "/contacto", className: "rounded-xl bg-teal hover:bg-teal-glow text-white font-extrabold px-8 py-4 transition-all hover:shadow-glow hover:-translate-y-0.5 text-xs uppercase tracking-wider inline-flex items-center gap-2", children: [
        "Solicitar Taller In-house ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  EventosPage as component
};
