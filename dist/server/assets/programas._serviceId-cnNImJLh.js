import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { S as SERVICES_DATA } from "./services-data-DqzbMK4h.js";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Clock, MapPin, Award, BookOpen, CheckCircle2, FileText, Users, ArrowRight, Download } from "lucide-react";
import { R as Route } from "./router-B-h-GLFE.js";
import "@tanstack/react-query";
const educacionImg = "/assets/educacion-9yNxwqwJ.png";
function ProgramDetail() {
  const {
    serviceId
  } = Route.useParams();
  const service = SERVICES_DATA.educacion.find((s) => s.id === serviceId);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!service) return /* @__PURE__ */ jsx("div", { className: "p-20 text-center font-bold text-slate-800", children: "Servicio no encontrado" });
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Nombres completos es obligatorio";
    }
    if (!form.email.trim()) {
      newErrors.email = "Correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de correo electrónico inválido";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Número de celular es obligatorio";
    } else if (!/^[0-9\s-+\(\)]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Número de celular inválido";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const link = document.createElement("a");
      link.href = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      link.download = `Brochure_${serviceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#F8FAFC]", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-20 bg-navy text-white overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20", children: /* @__PURE__ */ jsx("img", { src: service.image || educacionImg, className: "w-full h-full object-cover", alt: "Background" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal/20 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-teal text-sm font-bold uppercase tracking-[0.2em] mb-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/programas", className: "hover:text-white transition-colors", children: "Oferta Académica" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 opacity-50" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/60", children: service.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8", children: [
            /* @__PURE__ */ jsx(motion.h1, { initial: {
              opacity: 0,
              y: 20
            }, animate: {
              opacity: 1,
              y: 0
            }, className: "text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tight animate-fade-in", children: service.title }),
            /* @__PURE__ */ jsxs(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, transition: {
              delay: 0.2
            }, className: "flex flex-wrap gap-8 items-center text-white/80", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-teal" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase font-bold text-teal/80", children: "Duración" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold", children: service.duration })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-teal" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase font-bold text-teal/80", children: "Modalidad" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold", children: service.modality })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-teal" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase font-bold text-teal/80", children: "Certificación" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Oficial ADPH" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 hidden lg:block", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-4 leading-relaxed", children: '"Este programa está diseñado para profesionales que buscan liderar el cambio en sus organizaciones."' }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-teal" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "Dirección Académica" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-teal uppercase font-bold tracking-widest", children: "ADPH Group" })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-[2.5rem] shadow-sm border border-border/40", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-primary mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-7 h-7 text-teal" }),
            " Sobre el programa"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-8", children: service.desc }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: ["Acceso a plataforma virtual 24/7", "Networking con líderes regionales", "Sesiones grabadas para repaso", "Soporte académico personalizado"].map((it) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-teal" }),
            " ",
            it
          ] }, it)) })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.95
        }, whileInView: {
          opacity: 1,
          scale: 1
        }, viewport: {
          once: true
        }, className: "relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/40", children: [
          /* @__PURE__ */ jsx("img", { src: service.image || educacionImg, alt: service.title, className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full bg-teal/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx(Award, { className: "w-4 h-4" }),
            " Programa de Excelencia Académica"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-primary mb-8 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-7 h-7 text-teal" }),
            " Estructura Curricular"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: service.modules.map((m, i) => /* @__PURE__ */ jsxs("div", { className: "group bg-white p-6 rounded-2xl border border-border/60 flex items-center justify-between hover:border-teal transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-4xl font-bold text-secondary group-hover:text-teal/20 transition-colors", children: [
                "0",
                i + 1
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-primary", children: m })
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-teal transition-colors" })
          ] }, m)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-primary mb-8 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-7 h-7 text-teal" }),
            " Docentes Expertos"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-8", children: service.instructors.map((ins) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-border flex items-center gap-6 group hover:shadow-elegant transition-all", children: [
            /* @__PURE__ */ jsx("img", { src: ins.image, className: "w-20 h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all", alt: ins.name }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-primary", children: ins.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-teal font-medium uppercase tracking-wider", children: ins.role })
            ] })
          ] }, ins.name)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "lg:col-span-1 sticky top-32 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-[2.5rem] shadow-elegant border border-border/60 text-center relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal to-[#0083B0]" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-primary mb-2", children: "Inversión y Matrícula" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Únete a nuestra próxima cohorte y potencia tu carrera." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3.5 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2.5 border-b border-border text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-500 font-semibold", children: "Próximo inicio" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-primary", children: "Próximamente" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2.5 border-b border-border text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-500 font-semibold", children: "Horario" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-primary", children: "Sábados (AM)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "w-full bg-primary hover:bg-primary-glow text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-glow flex items-center justify-center gap-2 mb-2", children: [
            "Inscríbete Ahora ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-[2.5rem] shadow-elegant border border-border/60 text-left relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal to-[#00B4DB]" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-slate-900 mb-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-teal" }),
            " Descargar Brochure"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs font-semibold mb-6 leading-relaxed", children: "Rellena tus datos para Descargar el Brochure completo del programa en formato PDF." }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !submitted ? /* @__PURE__ */ jsxs(motion.form, { initial: {
            opacity: 0
          }, animate: {
            opacity: 1
          }, exit: {
            opacity: 0
          }, onSubmit: handleFormSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5", children: [
                "Nombres Completos ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "name", value: form.name, onChange: handleInputChange, placeholder: "Ej: Juan Pérez Díaz", className: `w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs font-semibold focus:outline-none focus:bg-white transition-all ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30" : "border-slate-200 focus:border-teal focus:ring-1 focus:ring-teal/30"}` }),
              errors.name && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-red-500 mt-1 block", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5", children: [
                "Correo Electrónico ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "email", name: "email", value: form.email, onChange: handleInputChange, placeholder: "juan.perez@email.com", className: `w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs font-semibold focus:outline-none focus:bg-white transition-all ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30" : "border-slate-200 focus:border-teal focus:ring-1 focus:ring-teal/30"}` }),
              errors.email && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-red-500 mt-1 block", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5", children: [
                "Número de Celular ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "tel", name: "phone", value: form.phone, onChange: handleInputChange, placeholder: "Ej: +51 987 654 321", className: `w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 text-xs font-semibold focus:outline-none focus:bg-white transition-all ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30" : "border-slate-200 focus:border-teal focus:ring-1 focus:ring-teal/30"}` }),
              errors.phone && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-red-500 mt-1 block", children: errors.phone })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-[#00B4DB] hover:bg-teal-glow text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-75", children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 justify-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
              "Generando Enlace..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
              " Descargar Brochure"
            ] }) })
          ] }) : /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, className: "p-5 bg-teal/5 border border-teal/20 rounded-2xl text-center space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-teal mx-auto shadow-inner", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-slate-800 text-xs font-black uppercase tracking-wider", children: "¡Brochure Descargado!" }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-600 text-[11px] font-medium leading-relaxed", children: [
              "Hemos iniciado la descarga de tu brochure y enviado una copia del plan de estudios al correo: ",
              /* @__PURE__ */ jsx("strong", { className: "text-teal", children: form.email }),
              "."
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setSubmitted(false);
              setForm({
                name: "",
                email: "",
                phone: ""
              });
            }, className: "text-[10px] font-extrabold text-teal hover:underline uppercase tracking-widest pt-1 block mx-auto", children: "Descargar de nuevo" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 p-8 bg-gradient-to-br from-teal to-teal-glow rounded-[2rem] text-white shadow-glow relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" }),
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-3 relative z-10", children: "¿Tienes dudas?" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm mb-6 relative z-10 leading-relaxed", children: "Conversa con un asesor académico por WhatsApp para resolver todas tus preguntas de forma inmediata." }),
          /* @__PURE__ */ jsx("a", { href: "https://wa.me/51924943982", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 bg-white text-teal px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all relative z-10", children: "Contactar Asesor" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProgramDetail as component
};
