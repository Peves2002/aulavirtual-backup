import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Eye, Clock, Volume2, Share2, Sparkles, User, Tag, Search, Play, ChevronRight, BookOpen } from "lucide-react";
const CATEGORIES = ["Todos", "Salud y Estrés", "Cambio y Liderazgo", "Atracción de Talento", "Desarrollo y Bienestar"];
const VIDEOS = [{
  id: "xESDwun6IV4",
  title: "Webinar: Gestión del Cambio Organizacional",
  speaker: "Mg. Fernando Castillo",
  category: "Cambio y Liderazgo",
  views: "1.4k vistas",
  duration: "45 min",
  desc: "Aprende a estructurar un plan estratégico para guiar a tus colaboradores a través de procesos complejos de transformación corporativa, mitigando riesgos de rechazo y reforzando la cultura organizacional."
}, {
  id: "67egtjiYLck",
  title: "Actualización CENSOPAS COPSOQ Corto 2 - ISTAS",
  speaker: "Psic. Javier Saenz",
  category: "Salud y Estrés",
  views: "2.1k vistas",
  duration: "58 min",
  desc: "Análisis profundo y metodológico de la aplicación práctica del cuestionario oficial COPSOQ ISTAS 21, indispensable para las auditorías de vigilancia de la salud psicosocial."
}, {
  id: "R1iBKf0LMbw",
  title: "Workshop: Selección por Competencias",
  speaker: "MBA. Elmer Requejo P.",
  category: "Atracción de Talento",
  views: "980 vistas",
  duration: "1h 15m",
  desc: "Claves y técnicas prácticas para guiar tus entrevistas laborales bajo el enfoque por competencias, permitiéndote predecir con exactitud el rendimiento óptimo de tus candidatos."
}, {
  id: "eGUmvnJtG28",
  title: "Inbound Recruiting y su Aplicación",
  speaker: "Mg. Lisbeth Suarez",
  category: "Atracción de Talento",
  views: "750 vistas",
  duration: "52 min",
  desc: "Cómo aplicar técnicas de marketing digital y Employer Branding para crear embudos de reclutamiento magnéticos que atraigan de forma automática al talento altamente calificado."
}, {
  id: "osHaYBkCqN4",
  title: "Plan de Desarrollo Individual PDI",
  speaker: "Mg. Jose Guevara",
  category: "Desarrollo y Bienestar",
  views: "1.1k vistas",
  duration: "38 min",
  desc: "Metodología detallada para elaborar Planes de Desarrollo Individual efectivos que retengan a tus talentos clave y los preparen para futuras promociones organizacionales."
}, {
  id: "CSNxK2j4cq0",
  title: "Teletrabajo en las Organizaciones",
  speaker: "Dr. Franklin Rios",
  category: "Desarrollo y Bienestar",
  views: "1.2k vistas",
  duration: "48 min",
  desc: "Aspectos clave de la implementación legal, ergonómica y metodológica del trabajo remoto en Latinoamérica, asegurando compliance y productividad del equipo."
}, {
  id: "rvsSHPYgxqk",
  title: "Inteligencia Emocional en tiempos de crisis",
  speaker: "Mg. Alvaro Romero",
  category: "Desarrollo y Bienestar",
  views: "1.8k vistas",
  duration: "50 min",
  desc: "Cómo desarrollar resiliencia emocional e interpersonal a nivel gerencial para mantener a los equipos motivados y cohesionados en entornos de alta incertidumbre laboral."
}, {
  id: "jkFze2dwlec",
  title: "Gestión del Estrés en las Organizaciones - Edición 1",
  speaker: "Mg. Javier Saenz",
  category: "Salud y Estrés",
  views: "1.5k vistas",
  duration: "1h 05m",
  desc: "Diagnósticos iniciales y herramientas preventivas para reducir el índice de estrés laboral y síndrome de burnout en empresas de alta exigencia."
}, {
  id: "zIwhFFyArgc",
  title: "Herramientas para el Liderazgo Femenino",
  speaker: "Mg. Jessica Delfino",
  category: "Cambio y Liderazgo",
  views: "920 vistas",
  duration: "42 min",
  desc: "Desarrollo de competencias de alto impacto directivo, negociación estratégica e inteligencia relacional para potenciar el rol de la mujer líder en las organizaciones."
}, {
  id: "R7UCCc5k8qg",
  title: "Diseño de Juegos: Gamificación Empresarial",
  speaker: "Dr. Seikei Cámara Yoshimoto",
  category: "Desarrollo y Bienestar",
  views: "810 vistas",
  duration: "1h 10m",
  desc: "Uso estratégico de Serious Play y dinámicas de juego aplicadas a la inducción (onboarding), aprendizaje interno y fidelización de colaboradores corporativos."
}, {
  id: "ARjWMsaXhOM",
  title: "Selección de Personal centrado en las Personas",
  speaker: "MBA. Elmer Requejo",
  category: "Atracción de Talento",
  views: "1.3k vistas",
  duration: "55 min",
  desc: "Cómo rediseñar el viaje del postulante (Candidate Journey) bajo un enfoque empático, brindando retroalimentación de valor y fortaleciendo la imagen de marca."
}, {
  id: "04TfqCyxb1M",
  title: "Gestión del Estrés en las Organizaciones - Edición 2",
  speaker: "Mg. Javier Saenz",
  category: "Salud y Estrés",
  views: "1.1k vistas",
  duration: "57 min",
  desc: "Segunda sesión con planes de acción colectivos y dinámicas de bienestar para implantar climas laborales óptimos centrados en la salud integral."
}, {
  id: "cFTAngxAgEg",
  title: "Diseña una Organización Eficiente",
  speaker: "Mg. Pedro de la Fuente",
  category: "Cambio y Liderazgo",
  views: "1.6k vistas",
  duration: "1h 02m",
  desc: "Análisis técnico de estructuras organizativas, redefinición de jerarquías óptimas y alineación de funciones corporativas para reducir cuellos de botella."
}];
function EntrenamientoDigitalPage() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const playerRef = useRef(null);
  const filteredVideos = VIDEOS.filter((vid) => {
    const matchesCategory = selectedCategory === "Todos" || vid.category === selectedCategory;
    const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase()) || vid.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleVideoSelect = (video) => {
    setActiveVideo(video);
    playerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + `/entrenamiento-digital?v=${activeVideo.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#FBFCFD] text-slate-800 overflow-x-hidden font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00B4DB]/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "pt-24 lg:pt-28 bg-gradient-to-b from-slate-50 via-[#FBFCFD] to-[#FBFCFD] border-b border-slate-100 relative z-10", children: /* @__PURE__ */ jsxs("section", { className: "py-12 max-w-7xl mx-auto px-6 lg:px-10 text-center space-y-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-extrabold uppercase tracking-widest", children: [
        /* @__PURE__ */ jsx(Tv, { className: "w-3.5 h-3.5 animate-pulse" }),
        "Entrenamiento Digital & ADPH TV"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-slate-900 font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none", children: [
        "Aula de",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#0083B0]", children: "Capacitación Ejecutiva" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto", children: "Accede a nuestra exclusiva videoteca de masterclasses y seminarios web grabados, diseñados para formar a los mejores líderes en Talento y Seguridad Ocupacional." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 max-w-7xl mx-auto px-6 lg:px-10 relative z-10", ref: playerRef, children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "relative aspect-video w-full rounded-[1.8rem] overflow-hidden border border-white/5 shadow-2xl bg-black group", children: /* @__PURE__ */ jsx("iframe", { src: `https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0&modestbranding=1`, title: activeVideo.title, frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true, className: "absolute inset-0 w-full h-full" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-slate-400 text-xs px-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-teal" }),
              " ",
              activeVideo.views
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-teal" }),
              " ",
              activeVideo.duration
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Volume2, { className: "w-3.5 h-3.5 text-teal" }),
              " Audio HD"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handleShare, className: "flex items-center gap-1 hover:text-white transition-colors font-bold text-xs", children: [
            /* @__PURE__ */ jsx(Share2, { className: "w-3.5 h-3.5 text-teal" }),
            copiedLink ? "¡Copiado!" : "Compartir"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[380px] flex flex-col justify-between text-left space-y-6 lg:py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal/20 border border-teal/30 text-teal text-[9px] font-extrabold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 fill-current" }),
            " Reproduciendo ahora"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-2xl lg:text-3xl tracking-tight leading-tight", children: activeVideo.title }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 bg-white/5 rounded-2xl p-4 border border-white/5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-[9px] font-extrabold uppercase tracking-wider block", children: "Expositor / Facilitador" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-extrabold block leading-none", children: activeVideo.speaker }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[10px] font-bold block mt-0.5", children: "Consultor Asociado - ADPH Group" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs md:text-sm leading-relaxed font-semibold", children: activeVideo.desc })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/5 space-y-3.5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block", children: "Categoría del entrenamiento" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-teal" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-200 text-xs font-bold", children: activeVideo.category })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-[#FBFCFD] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-150 pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2.5 w-full md:w-auto", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedCategory(cat), className: `px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${selectedCategory === cat ? "bg-teal text-white border-teal shadow-md" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800"}`, children: cat }, cat)) }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-80", children: [
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Buscar webinar o facilitador...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-teal/50 transition-colors font-semibold" }),
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredVideos.length > 0 ? /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredVideos.map((vid, idx) => {
        const isActive = vid.id === activeVideo.id;
        return /* @__PURE__ */ jsxs(motion.div, { layout: true, initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          scale: 0.95
        }, transition: {
          duration: 0.4,
          delay: idx * 0.05
        }, whileHover: {
          y: -6,
          boxShadow: "0 15px 30px rgba(0, 180, 219, 0.04)"
        }, className: `bg-white rounded-[2rem] border p-5 flex flex-col justify-between text-left transition-all duration-300 relative group overflow-hidden ${isActive ? "border-teal shadow-lg bg-teal/[0.01]" : "border-slate-100 shadow-sm"}`, children: [
          isActive && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-teal text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-sm", children: "En pantalla" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { onClick: () => handleVideoSelect(vid), className: "relative aspect-video w-full rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-sm cursor-pointer", children: [
              /* @__PURE__ */ jsx("img", { src: `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`, alt: vid.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/45 transition-colors duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-teal group-hover:scale-110 active:scale-95 transition-all duration-300", children: /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 fill-current ml-0.5" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-2.5 right-2.5 bg-slate-950/70 text-white text-[9px] font-black px-2 py-0.5 rounded", children: vid.duration })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-teal mb-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-2.5 h-2.5" }),
              " ",
              vid.category
            ] }),
            /* @__PURE__ */ jsx("h3", { onClick: () => handleVideoSelect(vid), className: "text-slate-900 font-bold text-base md:text-lg mb-2 line-clamp-2 hover:text-teal transition-colors cursor-pointer leading-snug", children: vid.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-slate-500 mb-4 text-xs font-bold", children: [
              /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5 text-teal" }),
              /* @__PURE__ */ jsx("span", { children: vid.speaker })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-slate-100 pt-4 mt-3", children: /* @__PURE__ */ jsxs("button", { onClick: () => handleVideoSelect(vid), className: `w-full font-extrabold py-3.5 rounded-xl uppercase text-[9px] tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 ${isActive ? "bg-teal text-white shadow-glow" : "bg-slate-50 text-slate-700 hover:bg-teal hover:text-white"}`, children: [
            "Ver Entrenamiento ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
          ] }) })
        ] }, vid.id);
      }) }) : (
        // Empty State
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "bg-white rounded-[2rem] border border-slate-100 p-12 text-center max-w-lg mx-auto space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400", children: /* @__PURE__ */ jsx(Tv, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-slate-900 font-black text-lg", children: "No se encontraron webinars" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs font-medium leading-relaxed", children: "Prueba cambiando de categoría o utilizando otro término en la barra de búsqueda. Tenemos más de 10 webinars oficiales listos para tu capacitación." }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx("button", { onClick: () => {
            setSelectedCategory("Todos");
            setSearchQuery("");
          }, className: "px-4 py-2 bg-teal text-white rounded-xl text-xs font-bold uppercase tracking-wider", children: "Restablecer Filtros" }) })
        ] })
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-slate-950 py-20 text-center relative overflow-hidden border-t border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[160px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, whileInView: {
          opacity: 1,
          y: 0
        }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/20 border border-teal/30 text-teal text-[10px] font-extrabold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
          " Capacitación Completa & Campus"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-3xl md:text-4xl tracking-tight leading-tight", children: "¿Buscas certificar tus conocimientos en gestión humana?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed", children: "Nuestros webinars de Entrenamiento Digital son excelentes introducciones. Llévate el aprendizaje al siguiente nivel matriculándote en nuestros Diplomados y Programas con Certificación Oficial avalada por ADPH Group." }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-wrap items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/programas", className: "rounded-xl bg-gradient-to-r from-teal to-[#0083B0] hover:shadow-glow text-white font-extrabold px-7 py-4 text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all", children: [
            "Explorar Programas ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/ficha-de-inscripcion", className: "rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-7 py-4 text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all", children: [
            "Ficha de Inscripción ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  EntrenamientoDigitalPage as component
};
