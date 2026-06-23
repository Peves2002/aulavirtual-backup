'use client'

import { useEffect } from "react";

import { motion } from "framer-motion";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";

const heroBannerImg = "/images/grupo-corpus/hero_banner_cursos.png"


type Course = {
  id: number;
  date: string;
  title: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    date: "02 MAYO",
    title: "TOPOGRAFÍA APLICADA A MOVIMIENTO DE TIERRAS",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 2,
    date: "04 MAYO",
    title: "DIAGRAMA UNIFILAR Y CUADRO DE CARGAS",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
  },
  {
    id: 3,
    date: "07 MAYO",
    title: "DISEÑO DE MEZCLAS BOMBEABLES: EVITA TAPONES, SEGREGACIÓN Y PARADAS EN OBRA",
    image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=600&q=80",
  },
  {
    id: 4,
    date: "09 MAYO",
    title: "DISEÑO DE PISTAS Y VEREDAS EN CIVIL 3D",
    image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&q=80",
  },
  {
    id: 5,
    date: "09 MAYO",
    title: "AJUSTE DE POLIGONALES TOPOGRÁFICAS",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: 6,
    date: "11 MAYO",
    title: "MODELADO DE ARQUITECTURA CON BIM - REVIT (BÁSICO - AVANZADO)",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80",
  },
  {
    id: 7,
    date: "12 MAYO",
    title: "CÁLCULO DE CORRIENTE DE CORTOCIRCUITO BAJA Y MEDIA TENSIÓN",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
  },
  {
    id: 8,
    date: "12 MAYO",
    title: "CONSOLIDACIÓN Y ASENTAMIENTOS DE SUELOS",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 9,
    date: "16 MAYO",
    title: "FOTOGRAMETRÍA CON AGISOFT METASHAPE",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80",
  },
  {
    id: 10,
    date: "18 MAYO",
    title: "MEMORIAS DE CÁLCULO DE INSTALACIONES ELÉCTRICAS EN EDIFICACIONES",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    id: 11,
    date: "21 MAYO",
    title: "EVALUACIÓN DEL CONCRETO ENDURECIDO: ESCLERÓMETRO, ULTRASONIDO Y DIAMANTINAS",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
  },
  {
    id: 12,
    date: "23 MAYO",
    title: "REAJUSTE DE PRECIOS POR FÓRMULA POLINÓMICA",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    id: 13,
    date: "27 MAYO",
    title: "SEÑALIZACIÓN HORIZONTAL Y VERTICAL EN CARRETERAS",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
  },
  {
    id: 14,
    date: "27 MAYO",
    title: "RESISTENCIA AL CORTE DE SUELOS APLICADA",
    image: "https://images.unsplash.com/photo-1581093057726-442ba0bec3b1?w=600&q=80",
  },
  {
    id: 15,
    date: "29 MAYO",
    title: "GOOGLE EARTH PRO EN LA TOPOGRAFÍA",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
];


const CursosEnVivo = () => {
  useEffect(() => {
    document.title = "Cursos en Vivo del Mes | Grupo Corpus";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans text-gray-900">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="w-full bg-[#031754] overflow-hidden shadow-xl flex justify-center">
        <img
          src={heroBannerImg}
          alt="Cursos en Vivo Mayo"
          className="w-full h-auto object-cover max-h-[460px] md:max-h-[500px] lg:max-h-[560px] select-none"
        />
      </section>

      {/* Small Intro text block below Hero */}
      <section className="w-full py-10 bg-white border-b border-gray-100 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-sm md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto select-none">
            Te brindamos capacitación en las ramas vinculadas a la Ingeniería Civil, Industrial, Arquitectura, Ingeniería de Sistemas y Gestión de Riesgos, Salud y Epistemología.
          </p>
        </div>
      </section>

      {/* Grid of Cursos Mayo Cards */}
      <section className="gc-container-custom px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[4/3.8] rounded-xl overflow-hidden border-2 border-blue-900/10 hover:border-[#cca353] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col bg-white"
            >
              {/* Card Image Area */}
              <div className="relative flex-grow overflow-hidden bg-slate-900">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Cyan tag top-left */}
                <span className="absolute top-3.5 left-3.5 bg-[#00d8b4] text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-md uppercase shadow-md shadow-[#00d8b4]/25 select-none">
                  {c.date}
                </span>

                {/* Clock icon top-right */}
                <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-[#0a1128]/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white select-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              </div>

              {/* Blue bottom block title */}
              <div className="bg-[#031754] text-white p-4 text-center flex items-center justify-center min-h-[68px]">
                <h3 className="font-gc-sans font-black text-xs md:text-[13px] tracking-wide leading-snug uppercase line-clamp-2 select-none group-hover:text-[#cca353] transition-colors duration-300">
                  {c.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      
      {/* Floating Green WhatsApp Button on Bottom-Left */}
      <a
        href="https://wa.me/51956266147"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 text-white"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.734-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.45.993c-5.439 0-9.859 4.37-9.863 9.8-.001 1.73.457 3.424 1.326 4.917L1.87 20.84l5.35-1.395c-1.42.776-2.58.55-2.58.55zM17.43 14.93c-.302-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.777.98-.95 1.18-.178.2-.355.22-.658.07-1.485-.75-2.56-1.3-3.585-3.08-.27-.47.27-.43.77-.93.18-.18.15-.3.07-.45-.07-.15-.678-1.63-.93-2.23-.244-.59-.49-.51-.678-.52-.178-.01-.383-.01-.588-.01-.205 0-.538.08-.82.38-.282.3-1.077 1.05-1.077 2.57s1.1 2.98 1.25 3.18c.15.2 2.163 3.303 5.242 4.63 1.243.535 2.193.85 2.946 1.09 1.246.395 2.382.34 3.278.206.996-.15 2.062-.84 2.352-1.62.29-.78.29-1.45.2-1.58c-.09-.13-.33-.2-.635-.35z" />
        </svg>
      </a>
    </div>
  );
};

export default CursosEnVivo;
