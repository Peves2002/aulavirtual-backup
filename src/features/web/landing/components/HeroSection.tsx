'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Building2, GraduationCap, Shield, TrendingUp, BookOpen, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import AutoplayPlugin from "embla-carousel-autoplay";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const heroImages = [
  "/assets/elite/hero/servicios.webp",
  "/assets/elite/hero/aula.webp",
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image — switches per slide */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, idx) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            aria-hidden
            animate={{ opacity: current === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center"
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <FloatingParticles />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[AutoplayPlugin({ delay: 5000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>

            {/* ── Slide 1: Ingeniería de Elite ── */}
            <CarouselItem>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8">
                {/* Left: copy */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frost text-white font-bold text-xs uppercase tracking-[0.4em] mb-6"
                  >
                    <Building2 className="w-4 h-4 text-primary" />
                    Líderes en Implementación BIM
                  </motion.div>

                  <h1 className="hero-heading text-white mb-6 leading-[1.1]">
                    Ingeniería de <br />
                    <span className="text-gradient-orange" style={{ filter: "drop-shadow(0 0 30px rgba(234,88,12,0.5))" }}>Elite</span>
                    <span className="text-primary">.</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-200/90 mb-10 max-w-lg leading-relaxed font-light">
                    Transformamos la construcción con{" "}
                    <span className="text-white font-bold">precisión extrema</span> y{" "}
                    <span className="text-white font-bold">tecnología BIM</span> de vanguardia.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href="https://wa.me/51955833613" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-accent hover:bg-orange-600 text-white font-black px-8 py-6 text-base rounded-2xl glow-orange-strong hover:scale-105 transition-all group">
                        ¡Conversemos!
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    <a href="#servicios" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-6 text-base rounded-2xl backdrop-blur-sm transition-all">
                        Ver Servicios
                      </Button>
                    </a>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
                    {[
                      { value: "50+", line1: "Proyectos", line2: "Completados" },
                      { value: "50+", line1: "Cursos", line2: "Especializados" },
                      { value: "3+", line1: "Años de", line2: "Experiencia" },
                      { value: "98%", line1: "Éxito en", line2: "Implementación" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex flex-col"
                      >
                        <span className="text-2xl md:text-3xl font-black text-gradient-orange">{stat.value}</span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold leading-tight">{stat.line1}</span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold leading-tight">{stat.line2}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right: floating badges over the background image */}
                <div className="hidden lg:block relative h-full min-h-[420px]">
                  {/* ISO 19650 badge — top right */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-0 z-20 glass-modern bg-black/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Estándar</span>
                        <span className="block text-sm font-black text-white">ISO 19650</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Projects completed badge — bottom right */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute bottom-16 right-0 z-20 glass-modern bg-black/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Proyectos</span>
                        <span className="block text-sm font-black text-gradient-orange">50+ Completados</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>

            {/* ── Slide 2: Aula Virtual ── */}
            <CarouselItem>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8">
                {/* Left: copy */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frost text-white font-bold text-xs uppercase tracking-[0.4em] mb-6"
                  >
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Elite Academy
                  </motion.div>

                  <h1 className="hero-heading text-white mb-6 leading-[1.1]">
                    Aula <br />
                    <span className="text-gradient-orange" style={{ filter: "drop-shadow(0 0 30px rgba(234,88,12,0.5))" }}>Virtual</span>
                    <span className="text-primary">.</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-200/90 mb-6 max-w-lg leading-relaxed font-light">
                    Capacitación élite para profesionales que buscan liderar el{" "}
                    <span className="text-white font-bold">cambio tecnológico</span> en la ingeniería.
                  </p>

                  <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center gap-2 text-white/70">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold">50+ Cursos</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-2 text-white/70">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold">Instructores Certificados</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/cursos">
                      <Button className="w-full sm:w-auto bg-accent hover:bg-orange-600 text-white font-black px-8 py-6 text-base rounded-2xl glow-orange-strong hover:scale-105 transition-all group">
                        Explorar Cursos
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/cursos">
                      <Button className="w-full sm:w-auto border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-6 text-base rounded-2xl backdrop-blur-sm transition-all">
                        Ver Catálogo
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Right: floating badges */}
                <div className="hidden lg:block relative h-full min-h-[420px]">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-0 z-20 glass-modern bg-black/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Certificación</span>
                        <span className="block text-sm font-black text-white">Verified Digital</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-16 right-0 z-20 glass-modern bg-black/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Cursos</span>
                        <span className="block text-sm font-black text-gradient-orange">50+ Especializados</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>

          </CarouselContent>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-30">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? "w-12 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Explora Más</span>
        <ChevronDown className="w-6 h-6 text-primary" />
      </motion.div>
    </section>
  );
}
