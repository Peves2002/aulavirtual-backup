import { jsx, jsxs } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { Sparkles, Clock, BookOpen, ArrowUpRight, Calendar, FlaskConical, Globe2, Telescope, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { S as SERVICES_DATA } from "./services-data-DqzbMK4h.js";
import { C as Carousel, a as CarouselContent, b as CarouselItem, c as CarouselPrevious, d as CarouselNext } from "./carousel-B1uhQ5sF.js";
import "react";
import "embla-carousel-react";
import "./button-Cz8PAkJh.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const getCategory = (id) => {
  if (id.includes("diplomado")) return { label: "Diplomado", bg: "bg-[#00B4DB]/10 text-[#00B4DB] border-[#00B4DB]/20" };
  if (id.includes("certificacion")) return { label: "Certificación", bg: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20" };
  if (id.includes("especializacion")) return { label: "Especialización", bg: "bg-[#FF8C00]/10 text-[#FF8C00] border-[#FF8C00]/20" };
  return { label: "Curso", bg: "bg-teal/10 text-teal border-teal/20" };
};
function About() {
  const courses = SERVICES_DATA.educacion;
  return /* @__PURE__ */ jsx("section", { id: "nosotros", className: "py-24 lg:py-32 bg-background overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.8 },
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-teal/10 text-teal text-xs font-semibold uppercase tracking-wider px-4 py-1.5 mb-4", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "size-3.5" }),
            " Programas de Formación"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl lg:text-4xl font-bold text-navy", children: "Nuestros Cursos y Especializaciones" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-500 max-w-2xl text-base", children: "Programas ejecutivos diseñados bajo metodologías innovadoras y experienciales. Elige tu próximo paso en el desarrollo del talento humano." })
        ] }) }),
        /* @__PURE__ */ jsxs(
          Carousel,
          {
            opts: {
              align: "start",
              loop: true
            },
            className: "w-full relative",
            children: [
              /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-6", children: courses.map((curso) => {
                const cat = getCategory(curso.id);
                return /* @__PURE__ */ jsx(
                  CarouselItem,
                  {
                    className: "pl-6 basis-full sm:basis-1/2 lg:basis-1/4",
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        whileHover: { y: -8 },
                        transition: { duration: 0.3 },
                        className: "group flex flex-col h-full rounded-2xl border border-slate-100 bg-card overflow-hidden hover:border-teal/50 hover:shadow-elegant transition-all duration-300",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-slate-100", children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: curso.image,
                                alt: curso.title,
                                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                                loading: "lazy"
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" }),
                            /* @__PURE__ */ jsx("span", { className: `absolute top-4 left-4 border backdrop-blur-md rounded-full px-3 py-1 text-2xs font-semibold tracking-wide shadow-sm ${cat.bg}`, children: cat.label })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6 flex flex-col justify-between", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-400 text-xs mb-3 font-medium", children: [
                                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                                  /* @__PURE__ */ jsx(Clock, { className: "size-3.5 text-teal" }),
                                  curso.duration
                                ] }),
                                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                                  /* @__PURE__ */ jsx(BookOpen, { className: "size-3.5 text-teal" }),
                                  curso.modality
                                ] })
                              ] }),
                              /* @__PURE__ */ jsx("h4", { className: "text-base lg:text-lg font-bold text-navy line-clamp-2 group-hover:text-teal transition-colors duration-300 min-h-[3.2rem] leading-snug", children: curso.title }),
                              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-500 line-clamp-3 leading-relaxed", children: curso.desc })
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-slate-50 flex items-center justify-between", children: /* @__PURE__ */ jsxs(
                              Link,
                              {
                                to: "/programas/$serviceId",
                                params: { serviceId: curso.id },
                                className: "inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:gap-2.5 transition-all duration-300",
                                children: [
                                  "Ver detalles",
                                  /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4 group-hover:rotate-45 transition-transform duration-300" })
                                ]
                              }
                            ) })
                          ] })
                        ]
                      }
                    )
                  },
                  curso.id
                );
              }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-8", children: [
                /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-navy hover:text-teal transition-all duration-300 shadow-sm" }),
                /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-navy hover:text-teal transition-all duration-300 shadow-sm" })
              ] })
            ]
          }
        )
      ]
    }
  ) }) });
}
const MILESTONES = [
  {
    icon: Calendar,
    year: "2012",
    title: "Fundación de ADPH Group",
    text: "El 15 de junio nace ADPH Group, iniciando operaciones el 2 de julio con la visión de redefinir cómo las organizaciones desarrollan y gestionan su talento, integrando psicología organizacional, gestión del talento y psicología ocupacional."
  },
  {
    icon: Sparkles,
    year: "Modelo experiencial",
    title: "Educación basada en el método del caso",
    text: "Diseñamos programas centrados en el impacto real, donde el conocimiento se aplica, se experimenta y se traduce en resultados tangibles. Hoy contamos con 72 programas educativos, 2 diplomados y 4 certificaciones únicas en el mercado."
  },
  {
    icon: FlaskConical,
    year: "Pioneros",
    title: "Innovación con metodología LEGO® y psicología ocupacional",
    text: "Fuimos pioneros en certificaciones basadas en LEGO® aplicadas a evaluación y desarrollo del talento. Impulsamos el primer programa especializado en psicología ocupacional del Perú, además de iniciativas en seguridad minera y factores de riesgo psicosocial."
  },
  {
    icon: Globe2,
    year: "LATAM",
    title: "Expansión regional e investigación aplicada",
    text: "Hemos formado ejecutivos en México, Ecuador, Bolivia, Colombia, Chile, Costa Rica y República Dominicana. Nuestra área de investigación desarrolla nuevas metodologías, herramientas y enfoques que fortalecen la evaluación, desarrollo y gestión del talento humano."
  }
];
function Historia() {
  return /* @__PURE__ */ jsx("section", { id: "historia", className: "py-24 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6 },
        className: "text-center max-w-3xl mx-auto mb-16",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent text-xs font-bold tracking-[0.2em] uppercase", children: "Nuestra Historia" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-primary mt-3 mb-5", children: "Más de una década transformando el talento en Latinoamérica" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Desde nuestro origen, hemos cuestionado los modelos tradicionales de formación y consultoría, apostando por un enfoque centrado en el impacto real." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: MILESTONES.map((m, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: i * 0.08 },
          className: `relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: `pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2", children: m.year }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-primary mb-3", children: m.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: m.text })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden md:block" }),
            /* @__PURE__ */ jsx("div", { className: "absolute left-6 md:left-1/2 top-1 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-teal text-white flex items-center justify-center shadow-glow ring-4 ring-secondary", children: /* @__PURE__ */ jsx(m.icon, { className: "w-5 h-5" }) })
          ]
        },
        m.title
      )) })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "mt-20 text-center",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5", children: "Presencia en Latinoamérica" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3", children: [
            "Perú",
            "México",
            "Ecuador",
            "Bolivia",
            "Colombia",
            "Chile",
            "Costa Rica",
            "República Dominicana"
          ].map((c) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-primary",
              children: c
            },
            c
          )) })
        ]
      }
    )
  ] }) });
}
const ITEMS = [
  {
    icon: Telescope,
    tag: "Visión",
    text: "Convertirnos en una escuela global que lidere la transformación de la gestión del talento y el bienestar laboral, formando líderes que generen impacto sostenible en organizaciones de todo el mundo."
  },
  {
    icon: Target,
    tag: "Misión",
    text: "Inspiramos y formamos líderes que transforman organizaciones desde las personas, a través de una educación ejecutiva innovadora que integra talento, salud ocupacional y herramientas estratégicas orientadas a resultados reales."
  }
];
function VisionMision() {
  return /* @__PURE__ */ jsx("section", { id: "vision-mision", className: "py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "text-center max-w-2xl mx-auto mb-14",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent text-xs font-bold tracking-[0.2em] uppercase", children: "Propósito" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-primary mt-3", children: "Visión & Misión" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: ITEMS.map((it, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, delay: i * 0.12 },
        className: "relative bg-card border border-border rounded-3xl p-10 hover:shadow-elegant transition-all overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-teal text-white flex items-center justify-center shadow-glow mb-6", children: /* @__PURE__ */ jsx(it.icon, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-accent text-xs font-bold tracking-[0.25em] uppercase", children: it.tag }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-lg md:text-xl text-primary leading-relaxed font-medium", children: [
              "“",
              it.text,
              "”"
            ] })
          ] })
        ]
      },
      it.tag
    )) })
  ] }) });
}
function NosotrosPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "pt-20 lg:pt-24", children: [
      " ",
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Historia, {}),
      /* @__PURE__ */ jsx(VisionMision, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  NosotrosPage as component
};
