'use client'

import { motion } from "framer-motion";

export const Certification = () => (
  <section id="certificacion" className="gc-section-padding bg-white overflow-hidden">
    <div className="gc-container-custom grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative rounded-2xl p-0.5 bg-gradient-to-br from-gc-blue-corp to-gc-black shadow-2xl overflow-hidden group">
          <div className="relative rounded-2xl bg-white p-8 md:p-12">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            
            <div className="relative">
              <div className="text-gc-blue-corp font-bold text-[10px] tracking-[0.3em] uppercase mb-4">Certificado de Especialización</div>
              <div className="font-gc-display font-black text-3xl mb-1 text-gc-black">GRUPO CORPUS</div>
              <div className="text-xs text-gc-gray-medium font-medium">Liderazgo en Formación Técnica Eléctrica</div>

              <div className="mt-12 mb-8">
                <div className="text-[10px] text-gc-gray-medium uppercase tracking-widest mb-2 font-bold">Otorgado a:</div>
                <div className="font-gc-display font-bold text-3xl text-gc-black border-b-2 border-gc-gray-light pb-3">[ Tu nombre aquí ]</div>
              </div>

              <div className="mb-10">
                <div className="text-[10px] text-gc-gray-medium uppercase tracking-widest mb-2 font-bold">Por haber completado satisfactoriamente el programa de:</div>
                <div className="font-bold text-xl text-gc-blue-corp">Especialista en AutoCAD Electrical & DIALux</div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="w-32 h-0.5 bg-gc-black/20 mb-2" />
                  <div className="text-[10px] text-gc-gray-medium font-bold uppercase tracking-widest">Director Académico</div>
                </div>
                <div className="w-20 h-20 bg-gc-gray-light rounded-lg flex items-center justify-center border border-gray-200">
                  {/* Mock QR Code */}
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-sm ${[0, 2, 3, 5, 6, 9, 10, 12, 14, 15].includes(i) ? "bg-gc-black" : "bg-transparent"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4">Certificación Oficial</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6 leading-tight">
          Un certificado que <span className="text-gc-blue-corp">potencia tu carrera</span>
        </h2>
        <p className="text-lg text-gc-gray-medium mb-8 leading-relaxed">
          Nuestras certificaciones están diseñadas para ser reconocidas por las principales empresas del sector. Cada documento incluye un sistema de verificación digital.
        </p>
        
        <ul className="space-y-4 mb-10">
          {[
            "Valor curricular reconocido en el sector ingeniería",
            "Código QR único para verificación en línea 24/7",
            "Firma digital y sellos de seguridad oficiales",
            "Respaldo de Grupo Corpus como referente técnico",
            "Fácil de compartir en LinkedIn, CV y redes profesionales",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-gc-black font-medium">
              <div className="w-6 h-6 rounded-full bg-gc-blue-corp/10 text-gc-blue-corp flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <a href="#cursos" className="gc-btn-primary px-8 py-4">
          Obtener certificación →
        </a>
      </motion.div>
    </div>
  </section>
);
