'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { getAssetPath } from "@/lib/assets";
import CourseCard from "@/features/web/cursos/components/CourseCard";

const socialMedia = [
  { icon: getAssetPath("iconos/facebook.svg"), link: "#", name: "Facebook", color: "bg-[#1877F2]", shadow: "shadow-[#1877F2]/20" },
  { icon: getAssetPath("iconos/instagram.svg"), link: "#", name: "Instagram", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", shadow: "shadow-[#ee2a7b]/20" },
  { icon: getAssetPath("iconos/youtube.svg"), link: "#", name: "YouTube", color: "bg-[#FF0000]", shadow: "shadow-[#FF0000]/20" },
  { icon: getAssetPath("iconos/tiktok.svg"), link: "#", name: "TikTok", color: "bg-black", shadow: "shadow-black/20" },
];

type Category = { id: string; nombre: string; slug: string }
type Course = {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  moneda: string
  es_gratis: boolean
  duracion?: string | null
  video_presentacion?: string | null
  nivel?: string
  tipo_emision?: string
  fecha_inicio?: string | null
  creado_en?: string
  es_comprado?: boolean
  categoria?: { nombre: string }
  profesor: { id?: string; slug?: string; nombre: string; apellido: string; avatar?: string }
}

export function AulaVirtualSection() {
  const [activeCategory, setActiveCategory] = useState("__all__");
  const [api, setApi] = useState<CarouselApi>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/web/catalogo')
      .then(r => r.json())
      .then(data => {
        const payload = data?.result ?? data;
        setCourses(payload?.courses ?? []);
        setCategories(payload?.categories ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = (activeCategory === "__all__"
    ? courses
    : courses.filter(c => c.categoria?.nombre === activeCategory)
  ).slice(0, 6);

  return (
    <section id="aula-virtual" className="relative py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header compacto en una fila */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-3">
              Elite Academy
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary leading-tight tracking-tighter">
              Lidera la <span className="text-gradient-orange">Construcción 4.0</span>
            </h2>
            <p className="text-slate-500 text-base font-medium mt-2 max-w-lg">
              Capacitaciones de alto nivel diseñadas por expertos para el mercado global.
            </p>
          </motion.div>

          <div className="flex items-center gap-6 shrink-0">
            {/* Mini stat */}
            <div className="hidden lg:flex items-center gap-3 glass-modern bg-white/70 px-6 py-3 rounded-2xl shadow">
              <span className="text-3xl font-black text-primary leading-none">500+</span>
              <div className="flex flex-col">
                <span className="text-xs font-black text-primary uppercase tracking-widest">Graduados</span>
                <div className="flex -space-x-2 mt-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-[8px] font-black">+</div>
                </div>
              </div>
            </div>
            <Link href="/cursos">
              <Button className="bg-primary hover:bg-orange-600 text-white font-black px-7 py-5 text-sm rounded-2xl glow-orange shadow-xl group">
                Explorar Cursos
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveCategory("__all__")}
              className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${activeCategory === "__all__"
                ? "bg-primary text-white shadow-xl scale-105"
                : "bg-white text-slate-400 hover:text-primary border border-slate-100"
                }`}
            >
              Todas las categorías
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.nombre)}
                className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${activeCategory === cat.nombre
                  ? "bg-primary text-white shadow-xl scale-105"
                  : "bg-white text-slate-400 hover:text-primary border border-slate-100"
                  }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        )}

        {/* Course Carousel */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-slate-400 font-bold py-16">No hay cursos disponibles en esta categoría.</p>
        ) : (
          <div className="relative">
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
                        className="h-full"
                      >
                        <CourseCard
                          id={course.id}
                          titulo={course.titulo}
                          slug={course.slug}
                          miniatura={course.miniatura}
                          precio={course.precio}
                          moneda={course.moneda}
                          es_gratis={course.es_gratis}
                          profesor={course.profesor}
                          categoria={course.categoria}
                          nivel={course.nivel}
                          tipo_emision={course.tipo_emision}
                          fecha_inicio={course.fecha_inicio}
                          creado_en={course.creado_en}
                          duracion={course.duracion}
                          es_comprado={course.es_comprado}
                          video_presentacion={course.video_presentacion}
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Notify Me / Upcoming Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 glass-dark p-8 md:p-12 rounded-[2rem] relative overflow-hidden text-center text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
              Próximos lanzamientos <span className="text-gradient-orange">exclusivos</span>.
            </h3>
            <p className="text-slate-300 text-base font-medium mb-6">
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
        className="absolute bottom-8 right-4 lg:right-12 flex flex-col items-end gap-3 z-20 pointer-events-auto"
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
              whileHover={{ scale: 1.1, y: -8 }}
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
