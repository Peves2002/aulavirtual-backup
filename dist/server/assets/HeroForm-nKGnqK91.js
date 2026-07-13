import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
function HeroForm({
  title,
  subtitle,
  backgroundImage,
  defaultSchool = "",
  formTitle = "REGÍSTRATE A NUESTRO VIVE DPA"
}) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    celular: "",
    email: "",
    escuela: defaultSchool,
    modalidad: "",
    estudios: "",
    aceptaDatos: false,
    autorizaPublicidad: false
  });
  useEffect(() => {
    if (defaultSchool) {
      setFormData((prev) => ({ ...prev, escuela: defaultSchool }));
    }
  }, [defaultSchool]);
  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", formData);
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full overflow-hidden bg-slate-900 border-none rounded-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: backgroundImage,
          alt: "Hero Background",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/70 lg:bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/40" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left space-y-6", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight",
            children: title
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-slate-300 text-lg md:text-xl font-semibold max-w-2xl leading-relaxed",
            children: subtitle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.2 },
          className: "w-full lg:w-[480px] bg-white rounded-none shadow-2xl p-8 lg:p-10 relative",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal to-[#00B4DB]" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-slate-900 font-black text-xl lg:text-2xl tracking-tight uppercase", children: formTitle }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-semibold mt-1", children: "Completa tus datos y un asesor se comunicará contigo." })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Nombres" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      name: "nombres",
                      required: true,
                      value: formData.nombres,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors",
                      placeholder: "Tus nombres"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Apellidos" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      name: "apellidos",
                      required: true,
                      value: formData.apellidos,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors",
                      placeholder: "Tus apellidos"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "DNI" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      name: "dni",
                      required: true,
                      value: formData.dni,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors",
                      placeholder: "Nro. de documento"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Celular" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      name: "celular",
                      required: true,
                      value: formData.celular,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors",
                      placeholder: "Tu celular"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Email" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    required: true,
                    value: formData.email,
                    onChange: handleChange,
                    className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors",
                    placeholder: "correo@ejemplo.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Escuela de interés" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "escuela",
                    required: true,
                    value: formData.escuela,
                    onChange: handleChange,
                    className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors appearance-none",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Selecciona una escuela" }),
                      /* @__PURE__ */ jsx("option", { value: "Escuela de Psicología Organizacional", children: "Escuela de Psicología Organizacional" }),
                      /* @__PURE__ */ jsx("option", { value: "Escuela de Liderazgo y Capital Humano", children: "Escuela de Liderazgo y Capital Humano" }),
                      /* @__PURE__ */ jsx("option", { value: "Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo", children: "Escuela de Psicología Ocupacional y SST" }),
                      /* @__PURE__ */ jsx("option", { value: "Centro de Aprendizaje Experiencial", children: "Centro de Aprendizaje Experiencial" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Modalidad" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      name: "modalidad",
                      required: true,
                      value: formData.modalidad,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Seleccione" }),
                        /* @__PURE__ */ jsx("option", { value: "Online", children: "Online" }),
                        /* @__PURE__ */ jsx("option", { value: "Presencial", children: "Presencial" }),
                        /* @__PURE__ */ jsx("option", { value: "Híbrido", children: "Híbrido" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wide", children: "Estudios" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      name: "estudios",
                      required: true,
                      value: formData.estudios,
                      onChange: handleChange,
                      className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-none px-4 py-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors appearance-none",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Seleccione" }),
                        /* @__PURE__ */ jsx("option", { value: "Secundaria", children: "Secundaria" }),
                        /* @__PURE__ */ jsx("option", { value: "Técnico", children: "Técnico" }),
                        /* @__PURE__ */ jsx("option", { value: "Universitario", children: "Universitario" }),
                        /* @__PURE__ */ jsx("option", { value: "Postgrado", children: "Postgrado" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      name: "aceptaDatos",
                      required: true,
                      checked: formData.aceptaDatos,
                      onChange: handleChange,
                      className: "w-4 h-4 border-slate-300 rounded-none text-teal focus:ring-teal cursor-pointer"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-600 font-semibold leading-snug group-hover:text-slate-800 transition-colors", children: [
                    "Acepto las ",
                    /* @__PURE__ */ jsx("a", { href: "#", className: "text-teal hover:underline", children: "condiciones de tratamiento de datos personales" }),
                    "."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      name: "autorizaPublicidad",
                      checked: formData.autorizaPublicidad,
                      onChange: handleChange,
                      className: "w-4 h-4 border-slate-300 rounded-none text-teal focus:ring-teal cursor-pointer"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600 font-semibold leading-snug group-hover:text-slate-800 transition-colors", children: "Autorizo el uso de mis datos para fines publicitarios e informativos." })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full bg-teal hover:bg-[#0083B0] text-white font-extrabold text-sm uppercase tracking-widest py-4 rounded-none transition-colors",
                  children: "Enviar Solicitud"
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  HeroForm as H
};
