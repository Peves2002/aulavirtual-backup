'use client'

import { motion } from "framer-motion";

export const About = () => (
  <section id="nosotros" className="gc-section-padding bg-gc-gray-perla relative overflow-hidden">
    <div className="gc-container-custom grid lg:grid-cols-2 gap-16 items-center">
      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative order-2 lg:order-1"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=90"
            alt="Ingeniería Aplicada – Grupo Corpus"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gc-black/60 via-transparent to-transparent" />
        </div>

        {/* Floating Badges */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gc-gray-light flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">🏆</div>
          <div>
            <div className="font-bold text-gc-black text-sm">Líder Regional</div>
            <div className="text-[10px] text-gc-gray-medium font-bold uppercase tracking-wider">Lima, Perú</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-6 bg-gc-black text-white p-6 rounded-2xl shadow-xl max-w-[200px]"
        >
          <div className="text-orange text-2xl font-bold mb-1">+500</div>
          <div className="text-xs text-gray-400 font-medium">Profesionales capacitados con éxito en todo el país.</div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="order-1 lg:order-2"
      >
        <div className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Nuestra Historia</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gc-black mb-6 leading-tight">
          Nacimos para transformar la <span className="text-orange">formación técnica eléctrica</span>
        </h2>
        <p className="text-lg text-gc-gray-medium mb-8 leading-relaxed">
          Grupo Corpus surge para cerrar la brecha entre el conocimiento teórico y la alta demanda de diseño técnico digital en el sector eléctrico.
          No solo enseñamos a usar herramientas, formamos profesionales capaces de proyectar instalaciones seguras y eficientes bajo normativas internacionales.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gc-gray-light">
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-bold text-gc-black mb-2">Visión</h4>
            <p className="text-sm text-gc-gray-medium">Convertirnos en el principal referente de capacitación técnica digital para el sector ingeniería en Latinoamérica.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gc-gray-light">
            <div className="text-2xl mb-3">🚀</div>
            <h4 className="font-bold text-gc-black mb-2">Misión</h4>
            <p className="text-sm text-gc-gray-medium">Formar expertos con habilidades prácticas y certificación de valor curricular que potencien su crecimiento profesional.</p>
          </div>
        </div>

        <a href="#cursos" className="inline-flex items-center gap-2 text-orange font-bold hover:gap-4 transition-all duration-300">
          Explora nuestros cursos
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </motion.div>
    </div>
  </section>
);
