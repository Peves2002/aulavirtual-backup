'use client'

import { motion } from "framer-motion";
import { BarChart3, CheckCircle2 } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[calc(100vh-116px)] flex items-center pt-6 pb-10 overflow-hidden bg-white">
      {/* Background patterns & Animated Stripes */}
      <div className="absolute inset-0 -z-10 gc-bg-grid-pattern opacity-100" aria-hidden />
      
      {/* Surprise: High-end Animated Stripes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ rotate: -45, x: "-100%", y: "100%" }}
            animate={{ x: "200%", y: "-200%" }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className="absolute h-32 md:h-64 w-[300%] bg-gradient-to-r from-transparent via-gc-blue-corp/[0.03] to-transparent"
            style={{ 
              top: `${-20 + i * 25}%`,
              left: "-100%"
            }}
          />
        ))}
        
        {/* Surprise Layer 2: Fast tech lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`fast-${i}`}
            initial={{ rotate: -45, x: "-100%", y: "100%" }}
            animate={{ x: "200%", y: "-200%" }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5
            }}
            className="absolute h-[1px] w-[300%] bg-gradient-to-r from-transparent via-gc-blue-corp/20 to-transparent"
            style={{ 
              top: `${10 + i * 30}%`,
              left: "-100%"
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full -z-10 bg-gc-gray-perla rounded-l-[100px] hidden lg:block" aria-hidden />

      <div className="gc-container-custom grid lg:grid-cols-12 gap-16 items-center relative">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gc-blue-corp/10 border border-gc-blue-corp/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gc-blue-corp animate-pulse" />
            <span className="font-gc-sans text-xs font-bold text-gc-blue-corp tracking-wider uppercase">Liderazgo en formación técnica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-gc-display font-extrabold text-gc-black leading-[1.1] tracking-tight"
          >
            Domina <span className="text-gc-blue-corp">AutoCAD Electrical</span> y DIALux como un profesional
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-lg sm:text-xl text-gc-gray-medium leading-relaxed max-w-2xl"
          >
            Especialízate con los softwares líderes del sector eléctrico e iluminación. Formación 100% práctica con certificación de alto valor curricular.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a href="#cursos" className="gc-btn-primary px-10 py-4 text-lg">
              Ver Cursos
            </a>
            <a href="#nosotros" className="gc-btn-secondary px-10 py-4 text-lg">
              Conoce más
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-gc-display font-black text-gc-blue-corp text-xl">+500</span>
              <span className="font-semibold text-gc-black">Alumnos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-semibold text-gc-black">Certificación Oficial</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE/MOCKUP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-6 xl:col-span-5 relative max-w-[360px] mx-auto lg:max-w-none lg:mx-0 lg:ml-auto lg:w-[85%]"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="/images/grupo-corpus/hero_engineer_autocad.png"
              alt="Ingeniero experto utilizando software AutoCAD Electrical"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gc-black/40 to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 left-2 sm:-left-10 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-gc-gray-light max-w-[240px]"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gc-blue-corp flex items-center justify-center text-white shadow-lg shadow-gc-blue-corp/30">
                <BarChart3 size={24} />
              </div>
              <div>
                <div className="text-2xl font-gc-display font-black text-gc-blue-corp leading-tight">100%</div>
                <div className="text-xs text-gc-gray-medium font-bold uppercase tracking-wider">Práctico</div>
              </div>
            </div>
            <p className="text-sm text-gc-gray-dark leading-snug">Metodología basada en proyectos reales de ingeniería.</p>
          </motion.div>

          {/* Software Badge */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-6 z-20 bg-gc-black text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gc-blue-corp/20 flex items-center justify-center">
                <img src="/images/grupo-corpus/software_badge.png" alt="Software" className="w-full h-full object-cover" />
              </div>
              <div className="font-gc-sans font-bold text-sm tracking-wide">SOFTWARE PROFESIONAL</div>
            </div>
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gc-blue-corp/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gc-black/5 rounded-full blur-3xl -z-10" />

          {/* New: Elegant Blue Flowing Stripes (Right Side) */}
          <div className="absolute -right-32 -bottom-32 w-[150%] h-[150%] -z-20 pointer-events-none opacity-40">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {[...Array(4)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${400 - i * 40} 400 Q ${300 - i * 30} 200 ${400} ${50 - i * 20}`}
                  fill="none"
                  stroke="hsl(var(--gc-blue-corp))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 + i * 0.1 }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
