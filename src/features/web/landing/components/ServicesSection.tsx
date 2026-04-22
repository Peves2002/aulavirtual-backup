'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Layers,
  Home,
  Cpu,
  GraduationCap,
  View,
  Glasses,
  Smartphone,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Implementación BIM",
    description:
      "Guiamos la adopción de metodología BIM en tu organización, alineadas con estándares nacionales e internacionales.",
    features: ["ISO 19650", "Flujos colaborativos", "Digitalización"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Modelamiento BIM",
    description:
      "Desarrollo de modelos inteligentes para expedientes técnicos con información paramétrica y detección de interferencias. \n BIM 4D y 5D",
    features: ["LOD 300-400", "Clash Detection", "Quantificación"],
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Home,
    title: "Diseño de Viviendas",
    description:
      "Diseño arquitectónico y estructural de viviendas con enfoque en funcionalidad, estética y normativa. \nmemorias descriptivas",
    features: ["Arquitectura", "Estructuras", "Instalaciones"],
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    icon: Cpu,
    title: "Transformación Digital",
    description:
      "Impulsamos la digitalización de procesos de ingeniería y construcción para mejorar eficiencia.",
    features: ["Automatización", "Integración", "Datos en tiempo real"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones BIM",
    description:
      "Programas de formación en metodologías y herramientas BIM para profesionales y empresas.",
    features: ["Cursos especializados", "Certificaciones", "In-house"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: View,
    title: "Vistas 360°",
    description:
      "Recorridos virtuales inmersivos que permiten visualizar proyectos desde cualquier ángulo.",
    features: ["Recorridos virtuales", "Alta resolución", "Interactivo"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Glasses,
    title: "Realidad Virtual (VR)",
    description:
      "Experiencias inmersivas que transportan a los usuarios al interior de los proyectos.",
    features: ["Inmersión total", "Toma de decisiones", "Presentaciones"],
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Realidad Aumentada (AR)",
    description:
      "Superposición de modelos digitales sobre el entorno físico para revisión en obra.",
    features: ["On-site review", "Visualización mixta", "Móvil"],
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden bg-secondary"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Excelencia Técnica
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-8 leading-tight">
            Soluciones de <br />
            <span className="text-gradient-orange">Vanguardia Digital</span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Fusionamos ingeniería de precisión con herramientas digitales de élite para redefinir el futuro de la construcción en el Perú.
          </p>
        </motion.div>

        {/* High-Impact Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative h-full glass-modern rounded-[2.5rem] p-8 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:border-primary/20 bg-white/70">
                {/* Tactical Icon Container */}
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <service.icon className="w-10 h-10 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-500 leading-relaxed mb-8 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>

                {/* Micro-Features */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.features.slice(0, 2).map((feat) => (
                    <span key={feat} className="text-[9px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary/60 transition-colors">
                      • {feat}
                    </span>
                  ))}
                </div>

                {/* Invisible Hover Depth */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/0 group-hover:border-primary/5 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-32 flex flex-col items-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mb-12" />
          <p className="text-primary/60 font-bold tracking-widest uppercase text-xs mb-8">
            ¿Listo para elevar tus estándares?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-4 text-primary hover:text-accent font-black text-2xl transition-all group"
          >
            Inicia tu proyecto hoy
            <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center group-hover:border-primary transition-colors group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
