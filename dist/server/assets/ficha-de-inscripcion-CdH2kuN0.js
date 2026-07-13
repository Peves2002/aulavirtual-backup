import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, MapPin, Mail, Phone, AlertCircle, User, FileText, Globe, Briefcase, GraduationCap, Coins, Calendar, Landmark, RefreshCw, CheckCircle2, Lock, ArrowRight } from "lucide-react";
const PROGRAMAS_OPCIONES = ["Diplomado en Gestión del Talento Humano", "Certificación en Psicología Ocupacional", "Especialización en Evaluación por Competencias", "Certificación LEGO® Serious Play aplicado a RRHH", "Curso: Factores de Riesgo Psicosocial", "Diplomado en Seguridad y Salud en el Trabajo", "Capacitación In house / Personalizada"];
function FichaInscripcionPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    documento: "",
    email: "",
    celular: "",
    pais: "",
    profesion: "",
    laAviso: false,
    // la aviso *
    grado: "",
    programa: "",
    modalidadEstudios: "",
    costo: "",
    moneda: "",
    modalidadPago: "Contado",
    fechaPago: "",
    facturaDatos: "",
    autorizoDatos: ""
    // 'Si' or 'No'
  });
  const [errors, setErrors] = useState({});
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
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
  const simulateCaptcha = () => {
    if (captchaChecked) return;
    setCaptchaLoading(true);
    setCaptchaError("");
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Este campo es obligatorio.";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Este campo es obligatorio.";
    if (!formData.documento.trim()) newErrors.documento = "Este campo es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "Este campo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de correo electrónico inválido.";
    }
    if (!formData.celular.trim()) {
      newErrors.celular = "Este campo es obligatorio.";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.celular)) {
      newErrors.celular = "Número de celular inválido.";
    }
    if (!formData.pais.trim()) newErrors.pais = "Este campo es obligatorio.";
    if (!formData.profesion.trim()) newErrors.profesion = "Este campo es obligatorio.";
    if (!formData.laAviso) newErrors.laAviso = "Este campo es obligatorio.";
    if (!formData.grado.trim()) newErrors.grado = "Este campo es obligatorio.";
    if (!formData.programa) newErrors.programa = "Este campo es obligatorio.";
    if (!formData.modalidadEstudios) newErrors.modalidadEstudios = "Este campo es obligatorio.";
    if (!formData.costo.trim()) newErrors.costo = "Este campo es obligatorio.";
    if (!formData.moneda) newErrors.moneda = "Este campo es obligatorio.";
    if (!formData.fechaPago) newErrors.fechaPago = "Este campo es obligatorio.";
    if (!formData.autorizoDatos) {
      newErrors.autorizoDatos = "Este campo es obligatorio.";
    }
    if (!captchaChecked) {
      setCaptchaError("Debe completar la verificación de seguridad (Captcha).");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && captchaChecked;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00B4DB]/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "pt-24 lg:pt-28 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100 relative z-10", children: /* @__PURE__ */ jsxs("section", { className: "py-16 max-w-7xl mx-auto px-6 lg:px-10 text-center space-y-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-extrabold uppercase tracking-widest", children: [
        /* @__PURE__ */ jsx(ClipboardCheck, { className: "w-3.5 h-3.5" }),
        "Ficha Oficial de Matrícula"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-slate-900 font-black text-3xl md:text-5xl tracking-tight leading-tight", children: [
        "Ficha de",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Inscripción Académica" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto", children: "Por favor, rellene el formulario oficial detallando su información para proceder con la certificación académica y los registros correspondientes." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !submitted ? /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-8 lg:sticky lg:top-28", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -20
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, className: "bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 md:p-8 space-y-6 text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-slate-900 font-black text-lg uppercase tracking-wider border-b border-slate-100 pb-3", children: "Información de Contacto" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center text-teal flex-shrink-0", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5", children: "Address" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-700 text-xs md:text-sm font-bold leading-normal", children: "Av. Javier Prado Este 560, Oficina 2302 San Isidro" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center text-teal flex-shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5", children: "E-mail" }),
                /* @__PURE__ */ jsx("a", { href: "mailto:informes@adphgroup.com", className: "text-teal hover:underline text-xs md:text-sm font-bold block", children: "informes@adphgroup.com" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center text-teal flex-shrink-0", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5", children: "Phone" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+51017073571", className: "text-slate-700 hover:text-teal font-bold text-xs md:text-sm block", children: "(01) 7073571" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -20
        }, whileInView: {
          opacity: 1,
          x: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.1
        }, className: "bg-amber-50/40 border border-amber-100 rounded-[2rem] p-6 md:p-8 space-y-4 text-left", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-amber-800 font-black text-lg uppercase tracking-wider flex items-center gap-2 border-b border-amber-100 pb-3", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-amber-600" }),
            " Importante:"
          ] }),
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-4 space-y-3.5 text-xs text-amber-900/80 font-semibold leading-relaxed", children: [
            /* @__PURE__ */ jsx("li", { children: "La información consignada en su ficha de inscripción y demás documentación presentada en este proceso tendrá la naturaleza de declaración jurada, siendo responsabilidad del participante cualquier error o modificación que no se comunique oportunamente al área ventas o Coordinador Académico." }),
            /* @__PURE__ */ jsx("li", { children: "Los datos consignados serán utilizados para la certificación académica registrada en la presente ficha de inscripción." }),
            /* @__PURE__ */ jsx("li", { children: "ADPH Group – EXECUTIVE EDUCATION se reserva el derecho de las devoluciones de pagos por reserva de vacante, matrículas, cuotas entre otros y/o aplicar las penalidades o sanciones que considere pertinentes por los servicios prestados ante el incumplimiento de compromisos de pagos o por retiro voluntario por parte del participante." }),
            /* @__PURE__ */ jsx("li", { children: "ADPH Group se reserva el derecho de reprogramar las fechas de inicio en caso no se complete el cupo requerido para iniciar el programa." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-6 md:p-10 text-left space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-2xl tracking-tight mb-2", children: "Ficha de Inscripción" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs font-semibold uppercase tracking-wider", children: "Rellena tus datos en los siguientes campos:" })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.2em] block border-b border-slate-100 pb-2", children: "Sección 1: Datos Personales" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-teal" }),
                " Nombre Completo (para certificado) *"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 pl-0 md:pl-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block", children: "Nombre" }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "nombre", value: formData.nombre, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.nombre ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "Nombres" }),
                  errors.nombre && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.nombre })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block", children: "Apellidos" }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "apellidos", value: formData.apellidos, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.apellidos ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "Apellidos" }),
                  errors.apellidos && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.apellidos })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-teal" }),
                " N° DNI (De ser de otro país coloque el N° de Cédula o Pasaporte) *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "documento", value: formData.documento, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.documento ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "N° de identificación oficial" }),
              errors.documento && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.documento })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-teal" }),
                  " Email *"
                ] }),
                /* @__PURE__ */ jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.email ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "correo@ejemplo.com" }),
                errors.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 text-teal" }),
                  " Celular *"
                ] }),
                /* @__PURE__ */ jsx("input", { type: "tel", name: "celular", value: formData.celular, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.celular ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "N° de WhatsApp / Celular" }),
                errors.celular && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.celular })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-teal" }),
                " País *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "pais", value: formData.pais, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.pais ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "País de residencia" }),
              errors.pais && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.pais })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.2em] block border-b border-slate-100 pb-2", children: "Sección 2: Perfil Profesional & Académico" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "w-3.5 h-3.5 text-teal" }),
                " Profesión u ocupación *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "profesion", value: formData.profesion, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.profesion ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "Ej: Psicólogo Organizacional / Analista de RRHH" }),
              errors.profesion && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.profesion })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-3.5 h-3.5 text-teal" }),
                " la aviso *"
              ] }),
              /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${formData.laAviso ? "bg-teal/5 border-teal/40" : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", name: "laAviso", checked: formData.laAviso, onChange: (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    laAviso: e.target.checked
                  }));
                  if (errors.laAviso) {
                    setErrors((prev) => ({
                      ...prev,
                      laAviso: ""
                    }));
                  }
                }, className: "mt-1 accent-teal h-4 w-4 rounded" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-700 block", children: "Confirmo que he leído y acepto el reglamento general de matrícula y el aviso de privacidad" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-semibold mt-0.5 block", children: "Este campo es obligatorio." })
                ] })
              ] }),
              errors.laAviso && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.laAviso })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "w-3.5 h-3.5 text-teal" }),
                " Grado Obtenido *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "grado", value: formData.grado, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.grado ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "Ej: Bachiller, Licenciado, Magíster" }),
              errors.grado && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.grado })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "w-3.5 h-3.5 text-teal" }),
                " Nombre del programa al que se matricula *"
              ] }),
              /* @__PURE__ */ jsxs("select", { name: "programa", value: formData.programa, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.programa ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-semibold text-slate-700`, children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- Selecciona el programa académico --" }),
                PROGRAMAS_OPCIONES.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
              ] }),
              errors.programa && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.programa })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1", children: "Seleccione la modalidad de estudios *" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: [{
                id: "sincronico",
                val: "Online (Sincrónico)",
                desc: "Clases en vivo y videoconferencias interactivas."
              }, {
                id: "asincronico",
                val: "Virtual (Asincrónico)",
                desc: "Estudio autónomo a tu propio ritmo en el Campus Virtual."
              }, {
                id: "presencial",
                val: "Presencial",
                desc: "Clases físicas presenciales en nuestras salas ejecutivas."
              }].map((mod) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${formData.modalidadEstudios === mod.val ? "bg-teal/5 border-teal/40" : "bg-slate-50/50 border-slate-200/60 hover:bg-slate-50"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "modalidadEstudios", value: mod.val, checked: formData.modalidadEstudios === mod.val, onChange: handleInputChange, className: "mt-1 accent-teal" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-slate-800 block", children: mod.val }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-semibold mt-0.5 block", children: mod.desc })
                ] })
              ] }, mod.id)) }),
              errors.modalidadEstudios && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1.5", children: errors.modalidadEstudios })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.2em] block border-b border-slate-100 pb-2", children: "Sección 3: Registro de Pago & Facturación" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Coins, { className: "w-3.5 h-3.5 text-teal" }),
                " Costo del programa *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "text", name: "costo", value: formData.costo, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.costo ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium`, placeholder: "Monto acordado de la matrícula / cuota" }),
              errors.costo && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.costo })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1", children: "Seleccione la moneda de pago *" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [{
                val: "S/ Soles",
                label: "S/ Soles"
              }, {
                val: "$ USD Dólares",
                label: "$ USD Dólares"
              }].map((mon) => /* @__PURE__ */ jsxs("label", { className: `flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border cursor-pointer font-bold text-xs uppercase tracking-wider transition-colors ${formData.moneda === mon.val ? "bg-teal/5 border-teal/40 text-teal" : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "moneda", value: mon.val, checked: formData.moneda === mon.val, onChange: handleInputChange, className: "accent-teal" }),
                mon.label
              ] }, mon.val)) }),
              errors.moneda && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.moneda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1", children: "Modalidad de pago:" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: ["Contado", "En cuotas", "Otro"].map((met) => /* @__PURE__ */ jsxs("label", { className: `flex-1 min-w-[80px] flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer font-bold text-[10px] uppercase tracking-wider transition-colors ${formData.modalidadPago === met ? "bg-teal/5 border-teal/40 text-teal" : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "modalidadPago", value: met, checked: formData.modalidadPago === met, onChange: handleInputChange, className: "accent-teal" }),
                met
              ] }, met)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-teal" }),
                " Fecha de pago *"
              ] }),
              /* @__PURE__ */ jsx("input", { type: "date", name: "fechaPago", value: formData.fechaPago, onChange: handleInputChange, className: `w-full bg-slate-50/50 border ${errors.fechaPago ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium text-slate-700` }),
              errors.fechaPago && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.fechaPago })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Landmark, { className: "w-3.5 h-3.5 text-teal" }),
                " Si desea factura, dejenos en este campo los datos de la empresa a facturar: RUC, Razon Social, Dirección"
              ] }),
              /* @__PURE__ */ jsx("textarea", { name: "facturaDatos", value: formData.facturaDatos, onChange: handleInputChange, rows: 3, className: "w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors font-medium", placeholder: "RUC: XXXXXXXXXXX\nRazón Social: ...\nDirección Fiscal: ..." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-teal uppercase tracking-[0.2em] block border-b border-slate-100 pb-2", children: "Sección 4: Autorización & Seguridad" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-600 leading-relaxed mb-3", children: "Autorizo expresamente de manera informada y voluntaria a ADPH Group Executive Education, el tratamiento de mis datos personales, conforme a las finalidades establecidas en el aviso de privacidad integral, el cual me fue puesto a disposición." }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [{
                val: "Si",
                label: "Si"
              }, {
                val: "No",
                label: "No"
              }].map((auth) => /* @__PURE__ */ jsxs("label", { className: `flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border cursor-pointer font-bold text-xs uppercase tracking-wider transition-all duration-300 ${formData.autorizoDatos === auth.val ? "bg-teal/5 border-teal/40 text-teal" : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "autorizoDatos", value: auth.val, checked: formData.autorizoDatos === auth.val, onChange: handleInputChange, className: "accent-teal" }),
                auth.label
              ] }, auth.val)) }),
              errors.autorizoDatos && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold mt-1", children: errors.autorizoDatos })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-150 rounded-2xl p-4 flex items-center justify-between max-w-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxs("button", { type: "button", onClick: simulateCaptcha, disabled: captchaLoading || captchaChecked, className: `w-6 h-6 rounded border flex items-center justify-center transition-all ${captchaChecked ? "bg-teal border-teal text-white" : "bg-white border-slate-300 hover:border-slate-400 active:scale-95"}`, children: [
                    captchaLoading && /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin text-teal" }),
                    captchaChecked && /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-600", children: captchaChecked ? "Verificación Completada" : "No soy un robot" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-slate-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[7px] font-extrabold text-slate-400 uppercase tracking-widest mt-1", children: "reCAPTCHA" })
                ] })
              ] }),
              captchaError && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-bold", children: captchaError })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full bg-teal hover:bg-teal-glow text-white font-extrabold py-4 rounded-xl uppercase text-xs tracking-widest shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2", children: [
            "Enviar Inscripción Oficial ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] })
      ] }) })
    ] }) : (
      // SUCCESS SCREEN
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, className: "bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mx-auto text-teal", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-10 h-10 animate-bounce" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-slate-900 font-black text-2xl md:text-3xl tracking-tight leading-tight", children: "¡Inscripción Declarada y Enviada!" }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium", children: [
          "Excelente, ",
          /* @__PURE__ */ jsxs("strong", { className: "text-slate-800 font-bold", children: [
            formData.nombre,
            " ",
            formData.apellidos
          ] }),
          ". Su ficha oficial de matrícula para el programa ",
          /* @__PURE__ */ jsx("strong", { children: formData.programa }),
          " (",
          formData.modalidadEstudios,
          ") ha sido registrada oficialmente en los sistemas de ADPH Group."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left text-xs font-semibold text-slate-600 max-w-md mx-auto space-y-2.5", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "N° de Registro Oficial:" }),
            " ADPH-",
            Math.floor(1e5 + Math.random() * 9e5)
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Nombres y Apellidos:" }),
            " ",
            formData.nombre,
            " ",
            formData.apellidos
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Programa Matriculado:" }),
            " ",
            formData.programa
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Fecha Declarada:" }),
            " ",
            formData.fechaPago
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "pt-2 text-slate-500 font-medium leading-relaxed border-t border-slate-200/60", children: [
            /* @__PURE__ */ jsx("strong", { children: "Siguiente Paso:" }),
            " Un Coordinador Académico del programa y el área de Facturación/Ventas validarán la transacción. En breve recibirá la confirmación oficial junto con sus credenciales de acceso al campus virtual por Email (",
            /* @__PURE__ */ jsx("strong", { children: formData.email }),
            ") o vía WhatsApp (",
            /* @__PURE__ */ jsx("strong", { children: formData.celular }),
            ")."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:text-teal-glow transition-colors uppercase tracking-wider group/btn", children: [
          "Volver al inicio ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" })
        ] }) })
      ] })
    ) }) }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  FichaInscripcionPage as component
};
