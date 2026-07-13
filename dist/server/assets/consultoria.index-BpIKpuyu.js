import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer, W as WhatsAppFloat } from "./WhatsAppFloat-DPBGHJnq.js";
import { motion } from "framer-motion";
import { Quote, Users, BarChart3, Target, MessageSquare, ShieldCheck, GraduationCap, ArrowRight, Laptop, Brain, Monitor } from "lucide-react";
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
const TESTIMONIALS = [
  {
    quote: "El diplomado de ADPH transformó mi forma de liderar. La metodología del caso y el nivel de los facilitadores son de clase mundial.",
    name: "María Fernanda Ríos",
    role: "Gerente de Talento",
    company: "Banco Continental",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    quote: "Implementamos HR CoreX en toda la organización y redujimos en 60% los tiempos de selección. Una solución verdaderamente disruptiva.",
    name: "Carlos Eduardo Villanueva",
    role: "Director de RRHH",
    company: "Grupo Romero",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    quote: "La consultoría de clima laboral nos dio claridad estratégica. ADPH no solo capacita, acompaña la transformación cultural.",
    name: "Ana Lucía Paredes",
    role: "CHRO",
    company: "Alicorp",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    quote: "La metodología LEGO® SERIOUS PLAY® aplicada en las certificaciones superó mis expectativas. Clases 100% dinámicas y aplicables al trabajo real.",
    name: "Sofia Rodriguez",
    role: "Especialista en Evaluación",
    company: "Sodexo",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    quote: "El diplomado de Seguridad y Salud en el Trabajo cuenta con un nivel de exigencia y rigor legal impecable. La mejor inversión académica.",
    name: "Ing. Martín Wagner",
    role: "Especialista en SST",
    company: "Minera Antamina",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  }
];
function Testimonios() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6 },
        className: "text-center max-w-3xl mx-auto mb-16 space-y-4",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-teal/10 text-teal text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5", children: [
            /* @__PURE__ */ jsx(Quote, { className: "size-3" }),
            " Testimonios de Alumnos"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight", children: "Lo que dicen nuestros participantes" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto", children: "Conoce la experiencia de líderes y estudiantes que han impulsado sus carreras y transformado sus organizaciones junto a ADPH Group." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: {
          align: "start",
          loop: true
        },
        className: "w-full relative",
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsx(
            CarouselItem,
            {
              className: "pl-6 basis-full md:basis-1/2 lg:basis-1/3",
              children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  whileHover: { y: -6 },
                  transition: { duration: 0.3 },
                  className: "group relative bg-white border border-slate-100 rounded-3xl p-8 hover:border-teal/30 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between h-full shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-2xl bg-teal/10 flex items-center justify-center text-teal", children: /* @__PURE__ */ jsx(Quote, { className: "size-4.5 fill-teal/20" }) }),
                        /* @__PURE__ */ jsx("div", { className: "flex gap-1 text-amber-400", children: [...Array(t.rating)].map((_, i2) => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "★" }, i2)) })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "italic text-slate-600 text-sm lg:text-base leading-relaxed mb-8 font-medium", children: [
                        '"',
                        t.quote,
                        '"'
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-6 border-t border-slate-50", children: [
                      /* @__PURE__ */ jsx("div", { className: "relative size-12 rounded-full overflow-hidden border border-slate-100 bg-slate-50", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: t.image,
                          alt: t.name,
                          className: "w-full h-full object-cover",
                          loading: "lazy"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "font-extrabold text-slate-900 text-sm lg:text-base leading-none mb-1", children: t.name }),
                        /* @__PURE__ */ jsxs("div", { className: "text-3xs lg:text-2xs font-bold text-slate-400", children: [
                          t.role,
                          " ",
                          /* @__PURE__ */ jsxs("span", { className: "text-teal font-extrabold", children: [
                            "@ ",
                            t.company
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3 mt-10", children: [
            /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-navy hover:text-teal transition-all duration-300 shadow-sm" }),
            /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0 h-10 w-10 rounded-full border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-navy hover:text-teal transition-all duration-300 shadow-sm" })
          ] })
        ]
      }
    )
  ] });
}
const CONSULTORIA_IMAGES = {
  "in-house": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "evaluaciones": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
  "clima": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "desempeno": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "asesoria": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
};
const CONSULTORIA_ICONS = {
  "in-house": GraduationCap,
  "evaluaciones": ShieldCheck,
  "clima": MessageSquare,
  "desempeno": Target,
  "asesoria": BarChart3
};
const HRCOREX_IMAGES = {
  "seleccion": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
  "evaluacion-online": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "tests": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=600&q=80"
};
const HRCOREX_ICONS = {
  "seleccion": Users,
  "evaluacion-online": Monitor,
  "tests": Brain
};
function Servicios() {
  const consultoriaServices = SERVICES_DATA.consultoria;
  const hrcorexServices = SERVICES_DATA.hrcorex;
  return /* @__PURE__ */ jsxs("section", { id: "servicios", className: "pt-24 pb-0 bg-[#FBFCFD] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo/5 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6 },
          className: "text-center max-w-3xl mx-auto mb-16 space-y-4",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-teal/10 text-teal text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5", children: [
              /* @__PURE__ */ jsx(Users, { className: "size-3.5" }),
              " Consultoría Estratégica"
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight", children: "Soluciones Corporativas a Medida" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto", children: "Fortalecemos la gestión del talento humano y la salud ocupacional en tu organización a través de metodologías de alto impacto regional." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6", children: consultoriaServices.map((s, i) => {
        const imgUrl = CONSULTORIA_IMAGES[s.id] || CONSULTORIA_IMAGES["in-house"];
        const IconComponent = CONSULTORIA_ICONS[s.id] || CONSULTORIA_ICONS["in-house"];
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.5, delay: i * 0.1 },
            className: "group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-teal/30 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-slate-50", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: imgUrl,
                      alt: s.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-3 size-9 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center text-teal group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(IconComponent, { className: "size-4.5" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm lg:text-base font-extrabold text-slate-900 group-hover:text-teal transition-colors duration-300 line-clamp-2 min-h-[2.4rem] leading-snug", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500 text-2xs lg:text-xs leading-relaxed line-clamp-3 font-medium", children: s.desc })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-5 pb-5", children: /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-50", children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/consultoria/$serviceId",
                  params: { serviceId: s.id },
                  className: "inline-flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-teal group-hover:gap-2.5 transition-all duration-300",
                  children: [
                    "Ver servicio",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "size-3.5 group-hover:translate-x-0.5 transition-transform" })
                  ]
                }
              ) }) })
            ]
          },
          s.id
        );
      }) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6 },
          className: "text-center max-w-3xl mx-auto mt-32 mb-16 space-y-4",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-indigo/10 text-indigo-600 text-xs font-extrabold uppercase tracking-[0.2em] px-4 py-1.5", children: [
              /* @__PURE__ */ jsx(Laptop, { className: "size-3.5" }),
              " HR CoreX (Tech Suite)"
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight", children: "Tecnología Inteligente para RRHH" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-base md:text-lg font-semibold max-w-2xl mx-auto", children: "Digitaliza y optimiza tus procesos de selección, evaluación y psicometría con nuestra suite SaaS avanzada de nivel corporativo." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: hrcorexServices.map((s, i) => {
        const imgUrl = HRCOREX_IMAGES[s.id] || HRCOREX_IMAGES["seleccion"];
        const IconComponent = HRCOREX_ICONS[s.id] || HRCOREX_ICONS["seleccion"];
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.5, delay: i * 0.12 },
            className: "group relative bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-slate-50", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: imgUrl,
                      alt: s.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-750",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 size-10 rounded-2xl bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(IconComponent, { className: "size-5" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3 font-semibold", children: s.desc })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-50", children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/hrcorex/$serviceId",
                  params: { serviceId: s.id },
                  className: "inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 group-hover:gap-2.5 transition-all duration-300 uppercase tracking-wider",
                  children: [
                    "Conocer solución",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 group-hover:translate-x-0.5 transition-transform" })
                  ]
                }
              ) }) })
            ]
          },
          s.id
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-32 pt-24 border-t border-slate-100", children: /* @__PURE__ */ jsx(Testimonios, {}) })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 1 },
        className: "mt-32 relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden z-20",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
                alt: "Estudiantes y profesionales en capacitación ejecutiva",
                className: "w-full h-full object-cover scale-105"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#070D19]/85 mix-blend-multiply" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#0A1629]/95 via-[#0A1629]/80 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-48 -left-48 w-96 h-96 bg-teal/15 rounded-full blur-[100px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-48 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-teal/20 border border-teal/40 backdrop-blur-md text-teal-light text-xs font-extrabold uppercase tracking-[0.25em] px-4 py-1.5", children: "¡Da el siguiente paso!" }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm", children: "¿Listo para impulsar tu carrera y transformar tu organización?" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold", children: "Únete a nuestra comunidad de más de 5,000 profesionales y líderes corporativos en Latinoamérica. Accede a metodologías experienciales de clase mundial y certificaciones oficiales con validez regional." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-[#00B4DB] font-extrabold pt-2 pb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2", children: "✔ Certificación Oficial Regional" }),
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2", children: "✔ Metodología Experiencial LEGO®" }),
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2", children: "✔ Red de Contactos Internacional" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center pt-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/contacto",
                  className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#00B4DB] text-white font-extrabold hover:bg-[#00B4DB]/90 hover:scale-105 transition-all duration-300 shadow-glow",
                  children: "Solicitar Información Personalizada"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://wa.me/51924943982",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-extrabold hover:bg-white hover:text-navy hover:scale-105 transition-all duration-300",
                  children: "Hablar con un Asesor Académico"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function ConsultoriaPage() {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-20 lg:pt-24", children: /* @__PURE__ */ jsxs("section", { className: "py-24 bg-background", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary mb-4", children: "Consultoría Estratégica" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Acompañamos a las organizaciones en el fortalecimiento de su capital humano con soluciones personalizadas." })
      ] }),
      /* @__PURE__ */ jsx(Servicios, {})
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppFloat, {})
  ] });
}
export {
  ConsultoriaPage as component
};
