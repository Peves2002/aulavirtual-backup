'use client'

import { useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import type { CursoPublico } from "@/marketing/lib/getCursosPublicos";

const TODOS = "Todos" as const;

interface CoursesProps {
  cursos: CursoPublico[];
}

function buildFeatures(curso: CursoPublico): string[] {
  const features = [
    curso.duracion ? `${curso.duracion} de duración` : "Acceso inmediato",
    `${curso.modulos} módulo${curso.modulos !== 1 ? "s" : ""}`,
    "Certificación incluida"
  ];

  return features;
}

export const Courses = ({ cursos }: CoursesProps) => {
  const [activeTab, setActiveTab] = useState<string>(TODOS);

  const tabs = useMemo(() => {
    const categorias = Array.from(new Set(cursos.map((c) => c.categoria)));

    return [TODOS, ...categorias];
  }, [cursos]);

  const filtered = (activeTab === TODOS ? cursos : cursos.filter((c) => c.categoria === activeTab)).slice(0, 3);

  return (
    <section id="cursos" className="gc-section-padding bg-white">
      <div className="gc-container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4"
          >
            Nuestros Programas
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6"
          >
            Cursos de <span className="text-gc-blue-corp">especialización técnica</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gc-gray-medium"
          >
            Capacítate con los mejores softwares de la industria y destaca en el mercado laboral.
          </motion.p>
        </div>

        {cursos.length === 0 ? (
          <div className="py-12 text-center text-gc-gray-medium">
            Estamos preparando nuevos cursos. Vuelve pronto.
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gc-blue-corp text-white shadow-lg shadow-gc-blue-corp/30"
                      : "bg-gc-gray-light text-gc-gray-dark hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filtered.map((curso, i) => (
                  <motion.div
                    key={curso.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white border border-gc-gray-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden bg-gc-black">
                      {curso.image && (
                        <img
                          src={curso.image}
                          alt={curso.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {curso.esGratis && (
                        <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-lg">
                          GRATIS
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gc-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="text-gc-blue-corp font-bold text-xs uppercase tracking-widest mb-3">
                        {curso.categoria}
                      </div>
                      <h3 className="text-2xl font-gc-display font-bold text-gc-black mb-4 leading-tight line-clamp-2">
                        {curso.title}
                      </h3>
                      <p className="text-gc-gray-medium mb-6 text-sm flex-1 line-clamp-3">
                        {curso.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {buildFeatures(curso).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-gc-gray-dark font-medium">
                            <div className="w-5 h-5 rounded-full bg-gc-blue-corp/10 text-gc-blue-corp flex items-center justify-center flex-shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-gc-gray-light flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gc-gray-medium font-semibold mb-1 uppercase tracking-wider">Inversión</div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-gc-display font-black text-gc-blue-corp">
                              {curso.esGratis ? "Gratis" : `S/ ${Math.round(curso.price)}`}
                            </span>
                            {!curso.esGratis && curso.oldPrice && (
                              <span className="text-sm text-gc-gray-medium line-through">S/ {Math.round(curso.oldPrice)}</span>
                            )}
                          </div>
                        </div>
                        {!curso.esGratis && curso.oldPrice && (
                          <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                            -{Math.round(((curso.oldPrice - curso.price) / curso.oldPrice) * 100)}%
                          </div>
                        )}
                      </div>

                      <a
                        href={`/cursos/${curso.slug}`}
                        className="gc-btn-primary w-full mt-8 py-4"
                      >
                        Ver Curso
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="text-center mt-12">
              <a href="/campus-virtual" className="gc-btn-primary px-10 py-4 inline-flex">
                Ver todos los cursos
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
