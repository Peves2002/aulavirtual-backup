'use client'

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "51956266147";

const blocks = [
  {
    tag: "Herramienta #1 en la industria",
    title: "AutoCAD Electrical",
    features: [
      "Diseño de diagramas unifilares y multifilares",
      "Simbología normalizada IEC y ANSI",
      "Numeración automática de cables y componentes",
      "Generación de reportes y listas de materiales",
      "Compatibilidad total con proyectos de ingeniería real",
    ],
    image: "/images/imagenes/electrical.jpg",
    stats: [
      { label: "Archivos", value: ".dwg" },
      { label: "Normas", value: "IEC/ANSI" },
      { label: "Uso", value: "Industrial" },
    ],
  },
  {
    tag: "Precisión en iluminación",
    title: "DIALux para Ingeniería",
    features: [
      "Cálculo fotométrico profesional para interiores y exteriores",
      "Simulación 3D avanzada de espacios y texturas",
      "Cumplimiento de normativas internacionales de iluminación",
      "Reportes técnicos listos para entrega a clientes",
      "Integración eficiente con planos de AutoCAD",
    ],
    image: "/images/imagenes/dialux.jpg",
    gridClassName: "lg:grid-cols-[0.88fr_1.12fr]",
    imageClassName:
      "w-full h-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[560px] xl:max-h-[620px] object-contain transition-transform duration-700 group-hover:scale-[1.02]",
    stats: [
      { label: "Cálculos", value: "Lux/fc" },
      { label: "Norma", value: "EN 12464" },
      { label: "Simulación", value: "Realista" },
    ],
  },
];

export const SoftwareShowcase = () => (
  <section className="gc-section-padding bg-white overflow-hidden">
    <div className="gc-container-custom space-y-32">
      {blocks.map((b, i) => (
        <div
          key={b.title}
          className={`grid gap-16 items-center ${b.gridClassName ?? "lg:grid-cols-2"} ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-gc-gray-light group bg-gc-gray-perla">
              <img
                src={b.image}
                alt={b.title}
                className={`block h-auto object-contain ${b.imageClassName ?? "w-full transition-transform duration-700 group-hover:scale-[1.02]"}`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gc-black/50 via-transparent to-transparent" />
              
              {/* Stats Panel */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 grid grid-cols-3 gap-4 border border-white/20">
                  {b.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-gc-display font-black text-gc-blue-corp text-lg leading-none mb-1">{s.value}</div>
                      <div className="text-[10px] text-gc-gray-medium font-bold uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4">{b.tag}</div>
            <h3 className="text-3xl sm:text-4xl font-gc-display font-bold text-gc-black mb-6">{b.title}</h3>
            <ul className="space-y-4 mb-8">
              {b.features.map(f => (
                <li key={f} className="flex items-start gap-4 text-gc-gray-dark font-medium">
                  <div className="w-6 h-6 rounded-full bg-gc-blue-corp/10 text-gc-blue-corp flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me gustaría conocer más sobre ${b.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gc-black font-bold hover:text-gc-blue-corp transition-colors duration-300"
            >
              Conocer más del software
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);
