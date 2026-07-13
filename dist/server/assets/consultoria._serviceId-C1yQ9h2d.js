import { jsx, jsxs } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { S as SERVICES_DATA } from "./services-data-DqzbMK4h.js";
import { motion } from "framer-motion";
import { Users, Target, BarChart3, ShieldCheck, MessageSquare, ArrowRight } from "lucide-react";
import { c as Route } from "./router-B-h-GLFE.js";
import "react";
import "@tanstack/react-router";
import "@tanstack/react-query";
const consultoriaImg = "/assets/consultoria-aYEugtWx.png";
function ConsultDetail() {
  const {
    serviceId
  } = Route.useParams();
  const service = SERVICES_DATA.consultoria.find((s) => s.id === serviceId);
  if (!service) return /* @__PURE__ */ jsx("div", { children: "Servicio no encontrado" });
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-20 lg:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative py-32 bg-navy-deep text-white overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-30", children: /* @__PURE__ */ jsx("img", { src: consultoriaImg, className: "w-full h-full object-cover", alt: "Background" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -30
        }, animate: {
          opacity: 1,
          x: 0
        }, className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-teal font-bold mb-6", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsx("span", { className: "uppercase tracking-widest text-sm", children: "Consultoría Estratégica" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-8xl font-bold mb-8 tracking-tight", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-white/70 leading-relaxed font-light", children: service.desc })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-primary", children: "Nuestra Propuesta de Valor" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "No solo entregamos reportes, entregamos soluciones accionables. Nuestro equipo de consultores senior trabaja mano a mano con tu organización para asegurar una implementación exitosa." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-8", children: [{
            icon: Target,
            t: "Enfoque Estratégico",
            d: "Alineado a tus objetivos de negocio"
          }, {
            icon: BarChart3,
            t: "Basado en Datos",
            d: "Decisiones con respaldo analítico"
          }, {
            icon: ShieldCheck,
            t: "Confidencialidad",
            d: "Seguridad total en el manejo de info"
          }, {
            icon: MessageSquare,
            t: "Feedback Constante",
            d: "Comunicación fluida y transparente"
          }].map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal", children: /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-primary", children: item.t }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.d })
          ] }, item.t)) }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs("button", { className: "bg-teal text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-teal-glow transition-all flex items-center gap-3 shadow-glow", children: [
            "Solicitar Diagnóstico Gratuito ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          scale: 0.95
        }, whileInView: {
          opacity: 1,
          scale: 1
        }, viewport: {
          once: true
        }, className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-navy/5 rounded-[3rem] rotate-3" }),
          /* @__PURE__ */ jsx("img", { src: consultoriaImg, alt: service.title, className: "relative z-10 rounded-[2.5rem] shadow-2xl" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ConsultDetail as component
};
