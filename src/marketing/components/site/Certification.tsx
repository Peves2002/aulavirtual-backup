'use client'

import { motion } from "framer-motion";

const CERTIFICATE_IMAGE = "/images/imagenes/certificado-corpus-page/certificado-corpus-1.png";

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
          <img
            src={CERTIFICATE_IMAGE}
            alt="Certificado de especialización Grupo Corpus"
            className="block w-full h-auto rounded-2xl bg-white transition-transform duration-700 group-hover:scale-[1.01]"
          />
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
