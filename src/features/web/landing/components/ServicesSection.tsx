'use client'

import { useRef } from "react"

import { motion, useInView } from "framer-motion"

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
} from "lucide-react"

import { Button } from "./ui/button"

const services = [
  {
    icon: Building2,
    title: "Implementación BIM",
    description:
      "Guiamos la adopción de metodología BIM en tu organización, alineadas con estándares nacionales e internacionales.",
    features: ["ISO 19650", "Flujos colaborativos", "Digitalización"],
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/servicios/metodologia-bim.jpg",
  },
  {
    icon: Layers,
    title: "Modelamiento BIM",
    description:
      "Desarrollo de modelos inteligentes para expedientes técnicos con información paramétrica y detección de interferencias. \n BIM 4D y 5D",
    features: ["LOD 300-400", "Clash Detection", "Quantificación"],
    gradient: "from-cyan-500 to-teal-500",
    image: "/images/servicios/Modelamiento-BIM.jpg",
  },
  {
    icon: Home,
    title: "Diseño de Viviendas",
    description:
      "Diseño arquitectónico y estructural de viviendas con enfoque en funcionalidad, estética y normativa. \nmemorias descriptivas",
    features: ["Arquitectura", "Estructuras", "Instalaciones"],
    gradient: "from-teal-500 to-emerald-500",
    image: "/images/servicios/diseño-viviendas.jpg",
  },
  {
    icon: Cpu,
    title: "Transformación Digital",
    description:
      "Impulsamos la digitalización de procesos de ingeniería y construcción para mejorar eficiencia.",
    features: ["Automatización", "Integración", "Datos en tiempo real"],
    gradient: "from-violet-500 to-purple-500",
    image: "/images/servicios/transformacion-digital.jpg",
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones BIM",
    description:
      "Programas de formación en metodologías y herramientas BIM para profesionales y empresas.",
    features: ["Cursos especializados", "Certificaciones", "In-house"],
    gradient: "from-orange-500 to-amber-500",
    image: "/images/servicios/capacitacion.jpg",
  },
  {
    icon: View,
    title: "Vistas 360°",
    description:
      "Recorridos virtuales inmersivos que permiten visualizar proyectos desde cualquier ángulo.",
    features: ["Recorridos virtuales", "Alta resolución", "Interactivo"],
    gradient: "from-pink-500 to-rose-500",
    image: "/images/servicios/vista-360.png",
  },
  {
    icon: Glasses,
    title: "Realidad Virtual (VR)",
    description:
      "Experiencias inmersivas que transportan a los usuarios al interior de los proyectos.",
    features: ["Inmersión total", "Toma de decisiones", "Presentaciones"],
    gradient: "from-indigo-500 to-blue-500",
    image: "/images/servicios/realidad-virtual.jpg",
  },
  {
    icon: Smartphone,
    title: "Realidad Aumentada (AR)",
    description:
      "Superposición de modelos digitales sobre el entorno físico para revisión en obra.",
    features: ["On-site review", "Visualización mixta", "Móvil"],
    gradient: "from-fuchsia-500 to-pink-500",
    image: "/images/servicios/realidad aumentada.jpg",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-10 lg:py-14 overflow-hidden bg-secondary"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            <Sparkles className="w-3 h-3" />
            Excelencia Técnica
          </motion.div>

          <h2 className="font-display text-2xl md:text-4xl font-black text-primary mb-3 leading-tight">
            Soluciones de <span className="text-gradient-orange">Vanguardia Digital</span>
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto text-base font-medium leading-relaxed">
            Fusionamos ingeniería de precisión con herramientas digitales de élite para redefinir el futuro de la construcción en el Perú.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="group h-full"
            >
              <div className="relative h-full flex flex-col glass-modern rounded-2xl p-0 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 bg-white/70">
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-black text-primary mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed mb-4 text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity flex-1">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.features.slice(0, 2).map((feat) => (
                      <span key={feat} className="text-[9px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary/60 transition-colors">
                        • {feat}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Hola Elite Engineering, estoy interesado en su servicio de ${service.title}`;
                      const waUrl = `https://wa.me/51955833613?text=${encodeURIComponent(message)}`;

                      window.open(waUrl, '_blank');
                    }}
                    className="w-full cursor-pointer mt-auto rounded-xl bg-primary hover:bg-accent text-white font-black text-xs py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Cotizar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent mb-6" />
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 text-primary hover:text-accent font-black text-lg transition-all group"
          >
            Inicia tu proyecto hoy
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors group-hover:scale-110">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
