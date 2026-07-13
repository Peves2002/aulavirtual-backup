import { jsx, jsxs } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { S as SERVICES_DATA } from "./services-data-DqzbMK4h.js";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { a as Route } from "./router-B-h-GLFE.js";
import "react";
import "@tanstack/react-router";
import "@tanstack/react-query";
const hrcorexImg = "/assets/hrcorex-DhuPdosp.png";
function ProductDetail() {
  const {
    serviceId
  } = Route.useParams();
  const service = SERVICES_DATA.hrcorex.find((s) => s.id === serviceId);
  if (!service) return /* @__PURE__ */ jsx("div", { children: "Producto no encontrado" });
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-20 lg:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative py-32 bg-[#0A1629] text-white overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-15", children: /* @__PURE__ */ jsx("img", { src: hrcorexImg, className: "w-full h-full object-cover", alt: "Background" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[120px] -mr-48 -mt-48" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-teal font-bold mb-6", children: [
              /* @__PURE__ */ jsx(Cpu, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.2em] text-xs", children: "HR CoreX Tech Solutions" })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60", children: service.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-10", children: service.desc }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("button", { className: "bg-teal text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-glow transition-all flex items-center gap-2", children: [
                "Solicitar Demo ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] }),
              /* @__PURE__ */ jsx("button", { className: "bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all", children: "Ver Características" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.9
          }, animate: {
            opacity: 1,
            scale: 1
          }, transition: {
            duration: 0.8
          }, className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-teal/30 rounded-3xl blur-[100px] opacity-20" }),
            /* @__PURE__ */ jsx("div", { className: "relative bg-navy-deep p-4 rounded-[2.5rem] border border-white/10 shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: hrcorexImg, alt: "Platform Preview", className: "rounded-[2rem] w-full h-auto" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-primary mb-6", children: "Potencia tus procesos con IA" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "HR CoreX no es solo una plataforma, es el motor que impulsa la eficiencia de tu departamento de Recursos Humanos mediante tecnología de vanguardia." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [{
          icon: Zap,
          t: "Ultra Rápido",
          d: "Procesa grandes volúmenes de datos en milisegundos."
        }, {
          icon: Shield,
          t: "Máxima Seguridad",
          d: "Cumplimiento con normativas internacionales de privacidad."
        }, {
          icon: Sparkles,
          t: "Experiencia Premium",
          d: "Diseño centrado en el usuario para máxima adopción."
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[2rem] bg-secondary/30 border border-border/40 hover:border-teal/30 transition-all group text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(item.icon, { className: "w-7 h-7 text-teal" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary mb-3", children: item.t }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: item.d })
        ] }, item.t)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ProductDetail as component
};
