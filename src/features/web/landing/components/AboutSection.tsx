'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getAssetPath } from "@/lib/assets";
import { Target, Eye, History, Rocket, CheckCircle2 } from "lucide-react";

const timelineEvents = [
  { year: "2023", title: "Fundación", description: "Nace Elite Engineering con visión de excelencia" },
  { year: "2023", title: "Liderazgo Regional", description: "Referentes en capacitación BIM" },
  { year: "2024", title: "Expansión BIM", description: "Adopción de metodologías BIM avanzadas" },
  { year: "2024", title: "Innovación Digital", description: "Integración de VR, AR y vistas 360°" },

];

const values = [
  { icon: Target, title: "Misión", text: "Brindar soluciones de ingeniería de alta calidad mediante la implementación BIM, el modelamiento especializado, el diseño de viviendas y las tecnologías digitales avanzadas." },
  { icon: Eye, title: "Visión", text: "Ser una empresa referente en ingeniería y metodología BIM, reconocida por la excelencia técnica, el cumplimiento de compromisos y la capacidad de innovación." },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative py-10 lg:py-14 overflow-hidden bg-white"
    >
      {/* Structural Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-primary">
              <video
                autoPlay
                muted
                loop
                playsInline
                suppressHydrationWarning
                src={getAssetPath("home3d.mp4")}
                className="w-full h-[450px] object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-base font-black italic leading-tight">
                  "La ingeniería no es solo construir; es rediseñar el futuro con precisión."
                </p>
              </div>
            </div>
            {/* Absolute Stats Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-3 md:-bottom-6 md:-right-6 glass-modern p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="block text-3xl font-black text-primary">Elite</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Engineering E.I.R.L</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-3"
            >
              Historia y Compromiso
            </motion.div>

            <h2 className="font-display text-2xl md:text-4xl font-black text-primary mb-4 leading-tight tracking-tighter">
              Pasión por la <span className="text-gradient-orange">Excelencia Real</span>
            </h2>

            <div className="space-y-4 text-slate-500 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Desde 2023, <span className="text-primary font-black underline decoration-primary/30">Elite Engineering</span> ha sido el aliado estratégico para proyectos que exigen resultados impecables.
              </p>
              <p>
                No solo implementamos BIM; creamos flujos de trabajo inteligentes impulsados por la pasión de compartir y enseñar, eliminando la incertidumbre y multiplicando la rentabilidad de cada inversión.
              </p>
            </div>

            {/* Mission/Vision Mini-Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {values.map((val) => (
                <div key={val.title} className="p-5 glass-modern rounded-2xl hover:-translate-y-1 transition-transform duration-500 bg-slate-50/50">
                  <val.icon className="w-6 h-6 text-primary mb-3" />
                  <h4 className="text-base font-black text-primary mb-1">{val.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{val.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline Overhaul */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <span className="text-4xl font-black text-primary mb-2">
                  {event.year}
                </span>
                <h5 className="text-sm font-black text-primary mb-1 uppercase tracking-wide">{event.title}</h5>
                <p className="text-sm text-slate-400 font-bold">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
