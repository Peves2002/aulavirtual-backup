'use client'

import { motion } from "framer-motion";

export const Pricing = () => (
  <section id="pricing" className="gc-section-padding bg-white relative overflow-hidden">
    <div className="gc-container-custom">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Planes y Precios</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gc-black mb-6">
          Invierte en tu <span className="text-orange">futuro profesional</span>
        </h2>
        <p className="text-lg text-gc-gray-medium">
          Elige el programa que mejor se adapte a tu nivel y necesidades de especialización.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Individual Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gc-gray-perla border border-gc-gray-light rounded-2xl p-8 md:p-12 flex flex-col group hover:border-gray-300 transition-all duration-300"
        >
          <div className="text-orange font-bold text-xs uppercase tracking-widest mb-4">Individual</div>
          <h3 className="text-2xl font-bold text-gc-black mb-4">Cursos por separado</h3>
          <p className="text-gc-gray-medium mb-8">Ideal si buscas especializarte en una herramienta específica de diseño.</p>
          
          <div className="mt-auto">
            <div className="text-sm text-gc-gray-medium mb-1 font-semibold uppercase tracking-wider">Desde</div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-gc-black">S/ 347</span>
              <span className="text-gc-gray-medium font-medium">/ curso</span>
            </div>
            <a href="#cursos" className="gc-btn-secondary w-full py-4 text-center block">
              Ver Cursos Disponibles
            </a>
          </div>
        </motion.div>

        {/* Full Package */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative bg-gc-black text-white rounded-2xl p-8 md:p-12 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 blur-3xl -mr-16 -mt-16" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-orange font-bold text-xs uppercase tracking-widest">Paquete Integral</div>
            <div className="bg-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Ahorras S/ 402</div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">Dominio Total (AC + DX)</h3>
          <p className="text-gray-400 mb-8">Formación completa con mentoría personalizada y doble certificación.</p>
          
          <div className="mt-auto">
            <div className="text-sm text-gray-400 mb-1 font-semibold uppercase tracking-wider">Inversión única</div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-5xl font-bold text-orange">S/ 597</span>
              <span className="text-gray-400 line-through font-medium">S/ 999</span>
            </div>
            <a href="#contacto" className="gc-btn-primary w-full py-4 text-center block border-none">
              Inscribirme al Paquete Integral
            </a>
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-12 text-gc-gray-dark font-medium">
        ¿Necesitas asesoría personalizada?{" "}
        <a href="https://wa.me/51956266147" target="_blank" rel="noopener noreferrer" className="text-orange font-bold hover:underline ml-2 flex items-center justify-center gap-2 mt-2 sm:mt-0 sm:inline-flex">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Habla con un asesor por WhatsApp
        </a>
      </div>
    </div>
  </section>
);
