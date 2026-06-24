'use client'

import { useEffect } from "react";

import { motion } from "framer-motion";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";
import { PublicCourseCard } from "@/marketing/components/site/PublicCourseCard";
import type { CursoPublico } from "@/marketing/lib/getCursosPublicos";

const heroBannerImg = "/images/grupo-corpus/hero_banner_cursos.png";
const WHATSAPP_NUMBER = "51956266147";

interface CursosEnVivoProps {
  courses: CursoPublico[];
}

const CursosEnVivo = ({ courses }: CursosEnVivoProps) => {
  useEffect(() => {
    document.title = "Cursos en Vivo | Grupo Corpus";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans text-gray-900">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="w-full bg-[#031754] overflow-hidden shadow-xl flex justify-center">
        <img
          src={heroBannerImg}
          alt="Cursos en Vivo"
          className="w-full h-auto object-cover max-h-[460px] md:max-h-[500px] lg:max-h-[560px] select-none"
        />
      </section>

      {/* Small Intro text block below Hero */}
      <section className="w-full py-10 bg-white border-b border-gray-100 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-sm md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto select-none">
            Capacitación en vivo, con interacción directa con el docente y horarios programados.
          </p>
        </div>
      </section>

      {/* Grid of Cursos en Vivo Cards */}
      <section className="gc-container-custom px-4 py-16 flex-grow w-full">
        {courses.length === 0 ? (
          <div className="py-20 text-center text-gray-500 max-w-md mx-auto select-none">
            <h3 className="font-bold text-lg text-gray-700">Próximamente nuevos cursos en vivo</h3>
            <p className="text-sm text-gray-400 mt-2">
              Estamos programando nuevas fechas de capacitación en vivo. Vuelve pronto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {courses.map((c) => (
              <motion.div
                key={c.id}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PublicCourseCard curso={c} enVivo />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Floating Green WhatsApp Button on Bottom-Left */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
