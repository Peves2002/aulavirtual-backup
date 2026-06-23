'use client'

import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="bg-gc-blue-corp py-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gc-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="gc-container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-gc-display font-extrabold text-white mb-6"
            >
              ¿Listo para especializarte con los mejores?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-lg md:text-xl font-medium"
            >
              Únete a más de 500 profesionales que ya están transformando su carrera técnica.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a
              href="#contacto"
              className="bg-white text-gc-blue-corp font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Empieza ahora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
