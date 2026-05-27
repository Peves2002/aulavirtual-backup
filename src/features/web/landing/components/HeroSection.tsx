'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Building2, GraduationCap, Shield, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getAssetPath } from "@/lib/assets";
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
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
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

const courseImages = [
  { src: getAssetPath("carrousel/carrousel_2.png"), label: "Modelamiento BIM" },
  { src: getAssetPath("carrousel/carrousel_3.png"), label: "Capacitaciones" },
  { src: getAssetPath("carrousel/carrousel_4.png"), label: "Infraestructura" },
  { src: getAssetPath("carrousel/carrousel.png"), label: "Visualización 3D" },
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
      {/* Background */}
      <div className="absolute inset-0 bg-primary z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          src={getAssetPath("home3d.mp4")}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
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
                    <span className="text-gradient-orange">Elite</span>
                    <span className="text-primary">.</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-200/90 mb-10 max-w-lg leading-relaxed font-light">
                    Transformamos la construcción con{" "}
                    <span className="text-white font-bold">precisión extrema</span> y{" "}
                    <span className="text-white font-bold">tecnología BIM</span> de vanguardia.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href="https://wa.me/51955833613" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-primary hover:bg-orange-600 text-white font-black px-8 py-6 text-base rounded-2xl glow-orange-strong hover:scale-105 transition-all group">
                        ¡Conversemos!
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    <a href="#servicios" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto glass-modern hover:bg-white/20 text-white font-bold px-8 py-6 text-base rounded-2xl transition-all">
                        Ver Servicios
                      </Button>
                    </a>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
                    {[
                      { value: "50+", label: "Proyectos" },
                      { value: "50+", label: "Cursos" },
                      { value: "3+", label: "Años" },
                      { value: "98%", label: "Éxito" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex flex-col"
                      >
                        <span className="text-2xl md:text-3xl font-black text-gradient-orange">{stat.value}</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right: impactful visual */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="hidden lg:block relative"
                >
                  {/* Glow aura */}
                  <div className="absolute inset-0 scale-110 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                  {/* Main image card */}
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10">
                    <img
                      src={getAssetPath("carrousel/carrousel.png")}
                      alt="Elite BIM Visualization"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  </div>

                  {/* Floating badge — top right */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-5 -right-5 glass-modern bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/60">Estándar</span>
                        <span className="block text-sm font-black text-white">ISO 19650</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating stat — bottom left */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute -bottom-5 -left-5 glass-modern bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest text-white/60">Proyectos</span>
                        <span className="block text-sm font-black text-gradient-orange">50+ Completados</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
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

                  <h2 className="hero-heading text-white mb-6 leading-[1.1]">
                    Aula <br />
                    <span className="text-gradient-orange">Virtual</span>
                  </h2>

                  <p className="text-lg md:text-xl text-slate-200/90 mb-10 max-w-lg leading-relaxed">
                    Capacitación élite para profesionales que buscan liderar el cambio tecnológico en la ingeniería.
                  </p>

                  <div className="flex gap-4">
                    <Link href="/cursos">
                      <Button className="bg-primary hover:bg-orange-600 text-white font-black px-8 py-6 text-base rounded-2xl glow-orange-strong shadow-xl hover:scale-105 transition-all">
                        Explorar Cursos
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Right: 2×2 image grid */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="hidden lg:grid grid-cols-2 gap-3 relative"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 scale-110 bg-primary/15 blur-[70px] rounded-full pointer-events-none" />

                  {courseImages.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10 group"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-white font-black text-[10px] uppercase tracking-widest">{item.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
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
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold">Explorar</span>
        <ChevronDown className="w-6 h-6 text-primary" />
      </motion.div>
    </section>
  );
}
