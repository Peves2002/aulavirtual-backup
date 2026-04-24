'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "./ui/button";

const clientProfiles = [
  {
    icon: Building2,
    title: "Empresas Constructoras",
    description: "Optimiza proyectos con modelamiento BIM y coordinación 3D.",
  },
  {
    icon: Users,
    title: "Profesionales Independientes",
    description: "Eleva la calidad de expedientes técnicos y presentaciones.",
  },
  {
    icon: Target,
    title: "Entidades Públicas",
    description: "Modernización y cumplimiento de estándares BIM gubernamentales.",
  },
  {
    icon: TrendingUp,
    title: "Desarrolladores Inmobiliarios",
    description: "Visualización VR/AR para ventas más efectivas.",
  },
];

const benefits = [
  "Reducción de errores en un 40%",
  "Ahorro significativo en costos",
  "Mejor coordinación de equipos",
  "Visualización pre-construcción",
  "Cumplimiento normativas BIM",
  "Decisiones basadas en datos",
  "Automatización de flujos de trabajo",
];

export function ClientFocusSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 lg:py-24 overflow-hidden bg-secondary">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-8 lg:mb-10"
        >
          <motion.span
            className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.5em] mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Foco de Impacto
          </motion.span>
          <h2 className="font-display text-4xl md:text-6xl font-black text-primary mb-4 leading-[0.9] tracking-tighter">
            Ecosistema de <br />
            <span className="text-gradient-orange">Soluciones</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            Diseñamos estrategias de transformación digital para los pilares más exigentes de la industria de la construcción.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Elite Profiles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-8"
          >
            {clientProfiles.map((profile, index) => (
              <motion.div
                key={profile.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group glass-modern bg-white/80 p-6 md:p-8 rounded-3xl border-none shadow-xl hover:shadow-2xl transition-all duration-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:bg-accent group-hover:glow-orange-strong transition-all duration-500 shadow-xl">
                  <profile.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary mb-3 group-hover:text-accent transition-colors">
                  {profile.title}
                </h3>
                <p className="text-slate-500 font-bold leading-relaxed">
                  {profile.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Strategic Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="bg-primary p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />

              <h3 className="text-2xl md:text-3xl font-black text-white mb-8">La Ventaja <span className="text-gradient-orange">Elite</span></h3>

              <div className="grid gap-5 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                    className="flex items-center gap-5 group/item"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/item:bg-primary transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary group-hover/item:text-white" />
                    </div>
                    <span className="text-slate-300 font-bold group-hover/item:text-white transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full py-8 rounded-2xl bg-primary hover:bg-orange-600 text-white font-black text-lg shadow-xl glow-orange-strong">
                Únete a la Vanguardia <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>

            {/* Premium Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-modern bg-white/70 p-8 md:p-10 rounded-[2.5rem] border-l-[12px] border-primary shadow-2xl relative"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/5" />
              <p className="text-xl md:text-2xl font-bold text-primary italic mb-6 md:mb-8 leading-[1.4]">
                "Elite Engineering no solo entrega modelos; entrega <span className="text-primary">certeza técnica</span>."
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-black text-lg md:text-xl">JC</span>
                </div>
                <div>
                  <p className="text-xl font-black text-primary">Juan Carlos M.</p>
                  <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Director de Infraestructura</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}