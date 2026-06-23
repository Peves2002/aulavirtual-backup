'use client'

import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Award, Users, Laptop, FileText } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle2 size={32} />,
    title: "Enfoque 100% Práctico",
    desc: "Desde el primer día trabajas con archivos reales de obra. Nuestros proyectos integradores simulan entornos laborales reales.",
  },
  {
    icon: <Cpu size={32} />,
    title: "Software Líder",
    desc: "Aprende a usar las mismas herramientas que utilizan las ingenierías más grandes del país: AutoCAD Electrical y DIALux.",
  },
  {
    icon: <Award size={32} />,
    title: "Certificación Real",
    desc: "Obtén un certificado con código QR verificable y alto valor curricular para potenciar tu perfil profesional.",
  },
  {
    icon: <Users size={32} />,
    title: "Docentes Expertos",
    desc: "Aprende de ingenieros colegiados con amplia experiencia en diseño y ejecución de proyectos eléctricos.",
  },
  {
    icon: <Laptop size={32} />,
    title: "Modalidad Flexible",
    desc: "Cursos 100% virtuales que se adaptan a tu ritmo y horario, con acceso ilimitado a nuestra plataforma.",
  },
  {
    icon: <FileText size={32} />,
    title: "Proyectos Reales",
    desc: "No solo teoría. Desarrollarás planos y cálculos lumínicos basados en normativas vigentes.",
  },
];

export const WhyUs = () => {
  return (
    <section id="nosotros" className="gc-section-padding bg-gc-gray-light overflow-hidden">
      <div className="gc-container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4"
          >
            ¿Por qué elegirnos?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6"
          >
            Formación técnica de <span className="text-gc-blue-corp">clase mundial</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gc-gray-medium"
          >
            Nos enfocamos en brindar herramientas prácticas y reales para los desafíos de la ingeniería moderna.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md gc-card-hover border border-gc-gray-perla group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gc-gray-perla text-gc-blue-corp group-hover:bg-gc-blue-corp group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-gc-display font-bold text-gc-black mb-4 group-hover:text-gc-blue-corp transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gc-gray-medium leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
