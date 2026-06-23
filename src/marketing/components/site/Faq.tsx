'use client'

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "¿Necesito experiencia previa para inscribirme?", a: "No. Nuestros programas están diseñados para técnicos y profesionales de todos los niveles. Comenzamos desde los fundamentos y avanzamos hasta proyectos complejos de ingeniería real." },
  { q: "¿Los cursos son en vivo o grabados?", a: "Ofrecemos modalidad virtual flexible con acceso a clases grabadas de alta calidad. Puedes estudiar a tu propio ritmo con el material disponible 24/7 en nuestra plataforma." },
  { q: "¿Cómo obtengo mi certificado?", a: "Al completar el programa y aprobar las evaluaciones prácticas, recibes automáticamente tu certificado digital con código QR verificable de forma inmediata." },
  { q: "¿Qué software necesito instalar?", a: "AutoCAD Electrical (puedes usar la versión trial de Autodesk) y DIALux (que es totalmente gratuito). Te brindamos guías paso a paso para la instalación correcta." },
  { q: "¿Puedo estudiar desde cualquier país?", a: "Absolutamente. Somos una institución 100% virtual con alumnos en toda Latinoamérica: Perú, Colombia, Ecuador, Chile, Bolivia y más." },
  { q: "¿Cuánto tiempo debo dedicar por semana?", a: "Recomendamos dedicar entre 4 a 6 horas semanales para asegurar un aprendizaje sólido, aunque al ser flexible puedes avanzar según tu disponibilidad." },
  { q: "¿Tienen soporte si tengo dudas técnicas?", a: "Sí, contamos con un canal de WhatsApp exclusivo para soporte técnico y académico, además de tutorías periódicas con los ingenieros docentes." },
  { q: "¿El certificado tiene validez oficial?", a: "Nuestros certificados son emitidos por Grupo Corpus, empresa debidamente registrada, e incluyen un código QR único que valida tu especialización ante cualquier empleador." },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="gc-section-padding bg-gc-gray-perla">
      <div className="gc-container-custom max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4">FAQ</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6">Preguntas <span className="text-gc-blue-corp">frecuentes</span></h2>
          <p className="text-lg text-gc-gray-medium">Despeja tus dudas y comienza hoy mismo tu formación.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gc-gray-light overflow-hidden hover:border-gc-blue-corp transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-gc-display font-bold text-gc-black text-lg">{f.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? "bg-gc-blue-corp text-white rotate-45" : "bg-gc-gray-perla text-gc-gray-dark"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gc-gray-medium leading-relaxed border-t border-gc-gray-light pt-4">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
