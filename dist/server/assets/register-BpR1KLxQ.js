import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("Todos los campos marcados son obligatorios.");
      return;
    }
    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("¡Cuenta creada y simulada con éxito!");
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col justify-between", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "flex-1 flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-[#00B4DB]/5 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "w-full max-w-[480px] text-center z-10 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-black tracking-tight text-slate-900", children: [
            "AGENDA ",
            /* @__PURE__ */ jsx("span", { className: "text-teal font-black", children: "2050" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Crea tu cuenta" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs font-semibold leading-relaxed", children: "Únete a la comunidad de aprendizaje tecnológico" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-md", children: [
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider", children: "Nombre" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Juan", className: "w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all placeholder:text-slate-400", required: true })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider", children: "Apellido" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Pérez", className: "w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all placeholder:text-slate-400", required: true })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider", children: "Correo electrónico" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "tu@correo.com", className: "w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all placeholder:text-slate-400", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider", children: "Contraseña" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Mínimo 8 caracteres", className: "w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all placeholder:text-slate-400", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", id: "terms", checked: acceptTerms, onChange: (e) => setAcceptTerms(e.target.checked), className: "mt-1 w-4 h-4 accent-teal rounded border-slate-300 focus:ring-teal/30 transition-all cursor-pointer", required: true }),
              /* @__PURE__ */ jsxs("label", { htmlFor: "terms", className: "text-[10px] text-slate-500 font-semibold leading-relaxed cursor-pointer select-none", children: [
                "Acepto los ",
                /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold hover:underline", children: "Términos y Condiciones" }),
                " y la ",
                /* @__PURE__ */ jsx("span", { className: "text-teal font-extrabold hover:underline", children: "Política de Privacidad" }),
                "."
              ] })
            ] }),
            error && /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-red-500 block", children: error }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "w-full py-3.5 rounded-full bg-teal hover:bg-teal-glow text-white text-xs font-extrabold uppercase tracking-widest transition-all hover:shadow-glow active:scale-95 flex items-center justify-center gap-1.5", children: loading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Crear cuenta ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E6F4F8] border border-teal/15 text-teal text-[9px] font-black uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
            "Registro Seguro"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 font-semibold", children: [
          "¿Ya tienes una cuenta?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-teal font-extrabold hover:underline", children: "Inicia sesión" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  RegisterPage as component
};
