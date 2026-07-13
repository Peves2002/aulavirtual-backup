import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("¡Inicio de sesión simulado con éxito!");
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
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Bienvenido de nuevo" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs font-semibold leading-relaxed", children: "Ingresa tus credenciales para acceder al aula virtual" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-md", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 text-left", children: [
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
              /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: ".........", className: "w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all placeholder:text-slate-400", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/login",
              className: "text-[10px] font-extrabold text-teal hover:underline uppercase tracking-wider",
              children: "¿Olvidaste tu contraseña?"
            }
          ) }),
          error && /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-red-500 block", children: error }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "w-full py-3.5 rounded-full bg-teal hover:bg-teal-glow text-white text-xs font-extrabold uppercase tracking-widest transition-all hover:shadow-glow active:scale-95 flex items-center justify-center gap-1.5", children: loading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Iniciar Sesión ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 font-semibold", children: [
          "¿No tienes una cuenta?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-teal font-extrabold hover:underline", children: "Regístrate aquí" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  LoginPage as component
};
