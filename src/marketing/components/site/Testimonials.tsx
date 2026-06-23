'use client'

import { useState } from "react";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "Antes de Grupo Corpus no sabía usar AutoCAD Electrical. Hoy diseño planos para proyectos industriales. La metodología práctica es lo que me hizo elegirlos.", name: "Carlos Mendoza", role: "Técnico Electricista", avatar: "https://i.pravatar.cc/150?u=carlos" },
  { quote: "El módulo de DIALux cambió completamente cómo presento mis proyectos. Ahora entrego reportes fotométricos profesionales que mis clientes valoran.", name: "Stefany Ramos", role: "Ingeniera de Proyectos", avatar: "https://i.pravatar.cc/150?u=stefany" },
  { quote: "Lo que más valoro es que los profesores trabajan en campo. No es teoría vacía — es experiencia real transferida directamente a nosotros.", name: "Miguel Angel", role: "Electricista Industrial", avatar: "https://i.pravatar.cc/150?u=miguel" },
  { quote: "Me certifiqué en 8 semanas. Ya actualicé mi LinkedIn y recibí 3 propuestas laborales de empresas importantes del sector.", name: "Rosa Torres", role: "Técnica en Instalaciones", avatar: "https://i.pravatar.cc/150?u=rosa" },
  { quote: "La plataforma es muy intuitiva y el contenido está muy bien estructurado. Aprendí más aquí que en 2 años de formación teórica previa.", name: "Diego Flores", role: "Bachiller en Ingeniería", avatar: "https://i.pravatar.cc/150?u=diego" },
  { quote: "El paquete integral vale cada sol. AutoCAD + DIALux en un solo programa con acompañamiento real y mentoría personalizada.", name: "Patricia Vera", role: "Consultora Eléctrica", avatar: "https://i.pravatar.cc/150?u=patricia" },
];

export const Testimonials = () => {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);

  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="gc-section-padding bg-white overflow-hidden">
      <div className="gc-container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gc-blue-corp font-bold uppercase tracking-widest text-sm mb-4"
          >
            Testimonios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-gc-display font-extrabold text-gc-black mb-6"
          >
            Lo que dicen <span className="text-gc-blue-corp">nuestros graduados</span>
          </motion.h2>
          <div className="flex justify-center items-center gap-1 text-gc-blue-corp mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 font-gc-display font-black text-gc-blue-corp text-xl">4.9/5</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md border-l-4 border-gc-blue-corp hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="absolute top-6 right-8 text-gray-100">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.01704 21L6.01704 18C6.01704 16.8954 6.91253 16 8.01704 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.01704C7.46476 8 7.01704 8.44772 7.01704 9V12C7.01704 12.5523 6.56933 13 6.01704 13H5.01704V21H6.01704Z" />
                </svg>
              </div>
              
              <p className="text-gc-gray-dark italic leading-relaxed mb-8 relative z-10">
                &quot;{t.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gc-gray-light"
                />
                <div>
                  <div className="font-bold text-gc-black">{t.name}</div>
                  <div className="text-xs text-gc-blue-corp font-semibold uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                page === i ? "bg-gc-blue-corp w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
