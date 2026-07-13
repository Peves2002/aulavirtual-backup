import { jsx, jsxs } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { c as cn, B as Button } from "./button-Cz8PAkJh.js";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
function ContactoPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado con éxito!");
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-20 lg:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "bg-navy py-24 text-white overflow-hidden relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-96 h-96 bg-teal rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -right-24 w-96 h-96 bg-teal rounded-full blur-3xl" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10 text-center", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsx("span", { className: "text-teal text-xs font-bold tracking-[0.2em] uppercase mb-4 block", children: "Contáctanos" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-6 tracking-tight", children: [
            "Hablemos",
            /* @__PURE__ */ jsx("span", { className: "text-teal", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-white/70 leading-relaxed max-w-2xl mx-auto", children: "Estamos aquí para responder tus dudas y ayudarte a transformar la gestión del talento en tu organización." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-background -mt-12 relative z-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.6
        }, className: "bg-white p-8 md:p-12 rounded-[2.5rem] shadow-elegant border border-border", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-primary mb-3", children: "Envíanos un mensaje" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Completa el formulario y un especialista te contactará pronto." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-sm font-semibold text-primary ml-1", children: "Nombre Completo" }),
                /* @__PURE__ */ jsx(Input, { id: "name", placeholder: "Ej. Juan Pérez", required: true, className: "h-12 rounded-2xl border-border/60 bg-secondary/20 focus:bg-white transition-all" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-sm font-semibold text-primary ml-1", children: "Correo Electrónico" }),
                /* @__PURE__ */ jsx(Input, { id: "email", type: "email", placeholder: "juan@empresa.com", required: true, className: "h-12 rounded-2xl border-border/60 bg-secondary/20 focus:bg-white transition-all" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-sm font-semibold text-primary ml-1", children: "Empresa" }),
              /* @__PURE__ */ jsx(Input, { id: "company", placeholder: "Nombre de tu organización", className: "h-12 rounded-2xl border-border/60 bg-secondary/20 focus:bg-white transition-all" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-sm font-semibold text-primary ml-1", children: "Mensaje" }),
              /* @__PURE__ */ jsx(Textarea, { id: "message", placeholder: "¿En qué podemos ayudarte?", className: "min-h-[160px] rounded-2xl border-border/60 bg-secondary/20 focus:bg-white transition-all resize-none p-4", required: true })
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full h-14 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold text-lg gap-2 shadow-glow transition-all active:scale-[0.98]", children: [
              "Enviar Mensaje ",
              /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            x: 30
          }, whileInView: {
            opacity: 1,
            x: 0
          }, viewport: {
            once: true
          }, transition: {
            duration: 0.6,
            delay: 0.2
          }, className: "grid sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "group bg-white p-8 rounded-3xl border border-border/60 hover:border-accent/40 transition-all duration-300 hover:shadow-elegant", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-accent" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-primary mb-2", children: "Llámanos" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Atención inmediata para tus consultas." }),
              /* @__PURE__ */ jsx("a", { href: "tel:+51924943982", className: "text-accent font-bold hover:underline transition-all", children: "+51 924 943 982" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group bg-white p-8 rounded-3xl border border-border/60 hover:border-accent/40 transition-all duration-300 hover:shadow-elegant", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-accent" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-primary mb-2", children: "Escríbenos" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Envíanos tus requerimientos detallados." }),
              /* @__PURE__ */ jsx("a", { href: "mailto:informes@adphgroup.com", className: "text-accent font-bold hover:underline transition-all", children: "informes@adphgroup.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 30
          }, whileInView: {
            opacity: 1,
            y: 0
          }, viewport: {
            once: true
          }, transition: {
            duration: 0.6,
            delay: 0.4
          }, className: "bg-white p-3 rounded-[2.5rem] border border-border shadow-elegant h-[450px] relative overflow-hidden group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-elegant border border-border/40 max-w-[240px] transition-transform group-hover:-translate-y-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-accent" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-primary", children: "Sede Principal" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-tight mt-1", children: "Av. Javier Prado Este 560 Of. 2302, San Isidro, Lima" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.442944747209!2d-77.03126782415177!3d-12.081827442145325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8668502573f%3A0xc3f8373b7e776e!2sAv.%20Javier%20Prado%20Este%20560%2C%20San%20Isidro%2015046!5e0!3m2!1ses-419!2spe!4v1715200000000!5m2!1ses-419!2spe", width: "100%", height: "100%", style: {
              border: 0
            }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", className: "rounded-[2rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700" })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ContactoPage as component
};
