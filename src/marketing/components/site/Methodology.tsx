'use client'

import { motion } from "framer-motion";
import { Zap, Monitor, Building2, GraduationCap } from "lucide-react";

const steps = [
  { 
    title: "Fundamentos Técnicos",  
    desc: "Domina la teoría con normativas vigentes (CNE, NEC, IEC) para asegurar instalaciones seguras.",
    icon: <Zap size={40} />
  },
  { 
    title: "Software en Acción",     
    desc: "Aprende AutoCAD Electrical y DIALux aplicados a casos reales de ingeniería.",
    icon: <Monitor size={40} />
  },
  { 
    title: "Proyecto Integrador",    
    desc: "Desarrolla un proyecto completo que incluye planos, cálculos y memoria descriptiva.",
    icon: <Building2 size={40} />
  },
  { 
    title: "Certificación",          
    desc: "Obtén tu certificación oficial de Grupo Corpus con código QR de validación.",
    icon: <GraduationCap size={40} />
  },
];

export const Methodology = () => (
  <section id="metodologia" className="gc-section-padding bg-white overflow-hidden">
    <div className="gc-container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4">Metodología</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6 leading-tight">
          Un proceso diseñado para <span className="text-gc-blue-corp">proyectos reales</span>
        </h2>
        <p className="text-lg text-gc-gray-medium">Aprende haciendo con nuestro enfoque 100% práctico basado en el sector eléctrico.</p>
      </div>

      <div className="relative">
        {/* Connecting line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-[5%] right-[5%] h-1 bg-gc-gray-light -translate-y-12" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center group"
            >
              <div className="relative z-10 w-24 h-24 mx-auto mb-8 bg-white border-4 border-gc-gray-light rounded-full flex items-center justify-center text-gc-blue-corp shadow-xl group-hover:border-gc-blue-corp transition-colors duration-300">
                {step.icon}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gc-blue-corp text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-gc-display font-bold text-gc-black mb-4 group-hover:text-gc-blue-corp transition-colors">{step.title}</h3>
              <p className="text-gc-gray-medium leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
