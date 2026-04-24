'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { getAssetPath } from "@/lib/assets";

// Icons are now served from public/assets via getAssetPath

const socialMedia = [
  { icon: getAssetPath("iconos/facebook.svg"), link: "#", name: "Facebook", color: "bg-[#1877F2]", shadow: "shadow-[#1877F2]/20" },
  { icon: getAssetPath("iconos/instagram.svg"), link: "#", name: "Instagram", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", shadow: "shadow-[#ee2a7b]/20" },
  { icon: getAssetPath("iconos/youtube.svg"), link: "#", name: "YouTube", color: "bg-[#FF0000]", shadow: "shadow-[#FF0000]/20" },
  { icon: getAssetPath("iconos/tiktok.svg"), link: "#", name: "TikTok", color: "bg-black", shadow: "shadow-black/20" },
];

const categories = [
  "Todas las categorías",
  "BIM",
  "Contratos NEC",
  "Estructuras",
  "Gestión 4.0",
];

const courses = [
  {
    id: 1,
    title: "Civil 3D aplicado a proyectos viales",
    instructor: "Luis Fernando Godoy Tejeda",
    duration: "07:31 Hrs",
    level: "Introductorio",
    rating: 5.0,
    price: 39.0,
    oldPrice: 49.99,
    image: getAssetPath("curso/curso1.png"),
    category: "BIM",
  },
  {
    id: 2,
    title: "Navisworks Manage",
    instructor: "Maycol Guerra Walde",
    duration: "07:59 Hrs",
    level: "Intermedio",
    rating: 5.0,
    price: 39.0,
    oldPrice: 49.99,
    image: getAssetPath("curso/curso2.png"),
    category: "BIM",
  },
  {
    id: 3,
    title: "Modelado BIM con Tekla Structures: Concreto Armado",
    instructor: "Diego Cáceres Araya",
    duration: "10:46 Hrs",
    level: "Avanzado",
    rating: 5.0,
    price: 49.0,
    oldPrice: 59.99,
    image: getAssetPath("carrousel/carrousel_3.png"),
    category: "Estructuras",
  },
  {
    id: 4,
    title: "Análisis y diseño de estructuras metálicas con CYPE3D",
    instructor: "María Belén Arizaga Pino",
    duration: "03:08 Hrs",
    level: "Intermedio",
    rating: 5.0,
    price: 49.0,
    oldPrice: 59.99,
    image: getAssetPath("carrousel/carrousel_4.png"),
    category: "Estructuras",
  },
  {
    id: 5,
    title: "Implementación ISO 19650",
    instructor: "Ing. Carlos Mendoza",
    duration: "12:15 Hrs",
    level: "Intermedio",
    rating: 4.9,
    price: 45.0,
    oldPrice: 55.0,
    image: getAssetPath("carrousel/carrousel.png"),
    category: "BIM",
  },
];

export function AulaVirtualSection() {
  const [activeCategory, setActiveCategory] = useState("Todas las categorías");
  const [api, setApi] = useState<CarouselApi>();

  const filteredCourses = activeCategory === "Todas las categorías"
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <section id="aula-virtual" className="relative py-20 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Immersive background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          {/* Header Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-10"
            >
              Elite Academy
            </motion.div>

            <h2 className="font-display text-3xl md:text-6xl font-black text-primary mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
              Lidera la <br />
              <span className="text-gradient-orange">Construcción 4.0</span>
            </h2>

            <p className="text-slate-500 max-w-xl text-xl font-medium leading-relaxed mb-12">
              Transforma tu carrera con capacitaciones de alto nivel diseñadas por expertos para el mercado global.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/cursos">
                <Button className="bg-primary hover:bg-orange-600 text-white font-black px-10 py-8 text-xl rounded-2xl glow-orange-strong shadow-xl group">
                  Explorar Cursos
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Platform Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="glass-modern p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative z-10 bg-white/70 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full" />
              <div className="relative z-10">
                <span className="block text-6xl md:text-8xl font-black text-primary leading-none mb-4">500+</span>
                <span className="block text-xl md:text-2xl font-black text-primary uppercase tracking-widest mb-8">Graduados Élite</span>
                <p className="text-slate-500 font-bold leading-relaxed mb-10">
                  Nuestra plataforma ha formado a los líderes técnicos de las constructoras más grandes del Perú.
                </p>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-black">
                    +495
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 ${activeCategory === cat
                ? "bg-primary text-white shadow-xl scale-105"
                : "bg-white text-slate-400 hover:text-primary border border-slate-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Carousel Overhaul */}
        <div className="relative group/carousel">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-8">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course, idx) => (
                  <CarouselItem key={course.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="h-full glass-modern rounded-[2.5rem] overflow-hidden group/card bg-white/70 hover:-translate-y-4 hover:shadow-2xl transition-all duration-700"
                    >
                      {/* Course Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000" />
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-xl glass-frost border border-white/20">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{course.category}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                          <User className="w-4 h-4 text-primary" />
                          {course.instructor}
                        </div>
                        <h3 className="text-2xl font-black text-primary mb-6 line-clamp-2 h-16 group-hover/card:text-accent transition-colors">
                          {course.title}
                        </h3>

                        <div className="flex justify-between items-center mb-8">
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-primary" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {course.rating.toFixed(1)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 line-through">USD {course.oldPrice.toFixed(2)}</span>
                            <span className="text-2xl font-black text-primary">USD {course.price.toFixed(2)}</span>
                          </div>
                          <Link href="/cursos">
                            <Button className="cursor-pointer bg-primary hover:bg-accent text-white font-black px-6 py-6 rounded-2xl group/buy">
                              INSCRIBIRSE
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Notify Me / Upcoming Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 lg:mt-48 glass-dark p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden text-center text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Próximos lanzamientos <br />
              <span className="text-gradient-orange">exclusivos</span>.
            </h3>
            <p className="text-slate-300 text-lg font-medium mb-12">
              Suscríbete para ser el primero en recibir acceso anticipado y descuentos VIP en nuestros nuevos cursos certificados.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 p-2 glass-frost rounded-3xl">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="bg-transparent border-none text-white px-6 py-4 outline-none flex-1 font-bold placeholder:text-white/40"
              />
              <Button className="bg-primary hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl">
                NOTIFICARME
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Social Media - Bottom Right Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="absolute bottom-24 right-4 lg:right-12 flex flex-col items-end gap-5 z-20 pointer-events-auto"
      >
        <span className="text-primary/40 font-black text-[10px] uppercase tracking-[0.4em] mr-2">
          Redes Sociales
        </span>
        <div className="flex flex-row gap-4">
          {socialMedia.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                y: -8,
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-300 group ${social.shadow}`}
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-6 h-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
