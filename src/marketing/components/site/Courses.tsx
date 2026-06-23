'use client'

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

type Course = {
  id: string;
  category: "AutoCAD Electrical" | "DIALux" | "Paquete Integral";
  title: string;
  description: string;
  badge?: string;
  price: number;
  oldPrice: number;
  image: string;
  features: string[];
};

const courses: Course[] = [
  {
    id: "ace",
    category: "AutoCAD Electrical",
    title: "AutoCAD Electrical para Instalaciones",
    description: "Diseña y modela planos eléctricos profesionales. Desde simbología hasta planos ejecutivos listos para obra.",
    badge: "MÁS POPULAR",
    price: 397,
    oldPrice: 599,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    features: ["8 semanas de duración", "100% práctico y virtual", "Certificación incluida"],
  },
  {
    id: "dialux",
    category: "DIALux",
    title: "DIALux para Cálculo de Iluminación",
    description: "Calcula y simula proyectos de iluminación profesional. Normativas internacionales aplicadas a proyectos reales.",
    price: 347,
    oldPrice: 549,
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&q=80",
    features: ["6 semanas de duración", "Cálculo lumínico normativo", "Reportes técnicos"],
  },
  {
    id: "paquete",
    category: "Paquete Integral",
    title: "Dominio Total: AutoCAD + DIALux",
    description: "La formación completa. El perfil técnico más demandado del mercado. Incluye mentoría 1-a-1.",
    badge: "MEJOR VALOR",
    price: 597,
    oldPrice: 999,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    features: ["14 semanas de formación", "Mentoría personalizada", "Doble certificación"],
  },
];

const tabs = ["Todos", "AutoCAD Electrical", "DIALux", "Paquete Integral"] as const;

export const Courses = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Todos");
  const filtered = activeTab === "Todos" ? courses : courses.filter(c => c.category === activeTab);

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
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white border border-gc-gray-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {course.badge && (
                    <div className="absolute top-4 left-4 bg-gc-blue-corp text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-lg">
                      {course.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gc-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="text-gc-blue-corp font-bold text-xs uppercase tracking-widest mb-3">
                    {course.category}
                  </div>
                  <h3 className="text-2xl font-gc-display font-bold text-gc-black mb-4 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gc-gray-medium mb-6 text-sm flex-1">
                    {course.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, idx) => (
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
                        <span className="text-3xl font-gc-display font-black text-gc-blue-corp">S/ {course.price}</span>
                        <span className="text-sm text-gc-gray-medium line-through">S/ {course.oldPrice}</span>
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                      -{Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)}%
                    </div>
                  </div>

                  <a
                    href="#contacto"
                    className="gc-btn-primary w-full mt-8 py-4"
                  >
                    Ver Curso
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
