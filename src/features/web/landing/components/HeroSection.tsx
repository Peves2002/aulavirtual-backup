'use client'

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, ChevronDown, Building2, Sparkles, GraduationCap, BookOpen, Clock, Users, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useCallback } from "react";
import { getAssetPath } from "@/lib/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import AutoplayPlugin from "embla-carousel-autoplay";

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
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

// 3D Grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(4 82% 56% / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(4 82% 56% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-primary z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        >
          <source src={getAssetPath("home3d.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/60 to-primary" />
      </div>

      <FloatingParticles />

      {/* Hero Content Wrapper */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[AutoplayPlugin({ delay: 8000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {/* Slide 1: Primary Value Proposition */}
            <CarouselItem>
              <div className="grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frost text-white font-bold text-xs uppercase tracking-[0.4em] mb-8"
                  >
                    <Building2 className="w-4 h-4 text-primary" />
                    Líderes en Implementación BIM
                  </motion.div>

                  <h1 className="hero-heading text-white mb-6 md:mb-8 leading-[0.85] md:leading-[0.9]">
                    Ingeniería de <br />
                    <span className="text-gradient-orange">Elite</span>
                    <span className="text-primary">.</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-slate-200/90 mb-12 max-w-xl leading-relaxed font-light">
                    Transformamos la construcción con <span className="text-white font-bold">precisión extrema</span> y <span className="text-white font-bold">tecnología BIM</span> de vanguardia.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <a href="https://wa.me/51955833613" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-primary hover:bg-orange-600 text-white font-black px-10 py-8 text-xl rounded-2xl glow-orange-strong hover:scale-105 transition-all duration-300 group"
                      >
                        ¡Conversemos!
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </a>
                    <a href="#servicios" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto glass-modern hover:bg-white/20 text-white font-bold px-10 py-8 text-xl rounded-2xl transition-all duration-300"
                      >
                        Ver Servicios
                      </Button>
                    </a>
                  </div>

                  {/* High Impact Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/10">
                    {[
                      { value: "50+", label: "Proyectos" },
                      { value: "50+", label: "Cursos" },
                      { value: "3+", label: "Años" },
                      { value: "98%", label: "Éxito" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex flex-col"
                      >
                        <span className="text-3xl md:text-4xl font-black text-gradient-orange">{stat.value}</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="hidden lg:flex justify-center lg:-mt-48"
                >
                  <div className="relative group">
                    <div className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
                    <img
                      src={getAssetPath("carrousel/carrousel.png")}
                      alt="Elite BIM Visualization"
                      className="relative z-10 w-full max-w-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </div>
            </CarouselItem>

            {/* Slide 2: Aula Virtual / Education */}
            <CarouselItem>
              <div className="grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
                <div className="text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frost text-white font-bold text-xs uppercase tracking-[0.4em] mb-8"
                  >
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Elite Academy
                  </motion.div>
                  <h2 className="hero-heading text-white mb-8">
                    Aula <br />
                    <span className="text-gradient-orange">Virtual</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-200/90 mb-12 max-w-xl leading-relaxed">
                    Capacitación élite para profesionales que buscan liderar el cambio tecnológico en la ingeniería.
                  </p>
                  <div className="flex gap-6">
                    <Link href="/cursos">
                      <Button className="bg-primary hover:bg-orange-600 text-white font-black px-10 py-8 text-xl rounded-2xl glow-orange-strong shadow-xl">
                        Explorar Cursos
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block relative h-[500px] w-full max-w-2xl mx-auto">
                  {/* Background Aura */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full animate-pulse" />

                  {/* Main Image (carrousel_2.png) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 w-[70%] mx-auto"
                  >
                    <img
                      src={getAssetPath("carrousel/carrousel_2.png")}
                      alt="Academy Platform"
                      className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] border border-white/10"
                    />
                  </motion.div>

                  {/* Upper-Left (carrousel_3.png) */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: -30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      opacity: { duration: 1, delay: 0.3 },
                      x: { duration: 1, delay: 0.3 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-16 -left-12 w-[40%] z-20"
                  >
                    <img
                      src={getAssetPath("carrousel/carrousel_3.png")}
                      alt="BIM Course"
                      className="w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] rounded-2xl border border-white/20 glass-modern p-1"
                    />
                  </motion.div>

                  {/* Middle-Right (carrousel_4.png) */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ y: [0, 15, 0] }}
                    transition={{
                      opacity: { duration: 1, delay: 0.5 },
                      x: { duration: 1, delay: 0.5 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    className="absolute top-1/4 -right-4 w-[45%] z-20"
                  >
                    <img
                      src={getAssetPath("carrousel/carrousel_4.png")}
                      alt="Infrastructure"
                      className="w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] rounded-2xl border border-white/20 glass-modern p-1"
                    />
                  </motion.div>

                  {/* Bottom-Left (carrousel.png) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      opacity: { duration: 1, delay: 0.7 },
                      x: { duration: 1, delay: 0.7 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                    className="absolute bottom-32 left-4 w-[35%] z-20"
                  >
                    <img
                      src={getAssetPath("carrousel/carrousel.png")}
                      alt="Visualization"
                      className="w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] rounded-2xl border border-white/20 glass-modern p-1"
                    />
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-30">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${current === idx ? "bg-primary" : "bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Scroll Indicator */}
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