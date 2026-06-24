'use client'

import { useState, useMemo } from "react";

import { motion } from "framer-motion";
import { FolderClosed, Search } from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";
import { PublicCourseCard } from "@/marketing/components/site/PublicCourseCard";
import type { CursoPublico } from "@/marketing/lib/getCursosPublicos";

const WHATSAPP_NUMBER = "51956266147";

type CategorySection = {
  id: string;
  title: string;
  colorClass: string;
  iconColor: string;
  courses: CursoPublico[];
};

const CATEGORY_STYLES = [
  { colorClass: "text-[#f97316] bg-orange-50", iconColor: "#f97316" },
  { colorClass: "text-[#00d8b4] bg-[#00d8b4]/10", iconColor: "#00d8b4" },
  { colorClass: "text-[#3b82f6] bg-blue-50", iconColor: "#3b82f6" },
  { colorClass: "text-[#a855f7] bg-purple-50", iconColor: "#a855f7" },
];

interface CursosCatalogoProps {
  cursos: CursoPublico[];
}

const CursosCatalogo = ({ cursos }: CursosCatalogoProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = useMemo<CategorySection[]>(() => {
    const grouped = new Map<string, CursoPublico[]>();

    cursos.forEach((curso) => {
      const key = curso.categoria || "Otros Cursos";

      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(curso);
    });

    return Array.from(grouped.entries()).map(([title, courses], idx) => ({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title: title.toUpperCase(),
      courses,
      ...CATEGORY_STYLES[idx % CATEGORY_STYLES.length],
    }));
  }, [cursos]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    return sections
      .map((sec) => ({
        ...sec,
        courses: sec.courses.filter(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((sec) => sec.courses.length > 0);
  }, [sections, searchQuery]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] font-gc-sans text-[#0f172a]">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-20 pb-20 bg-gradient-to-br from-[#0c1938] via-[#040a1b] to-[#02050f] text-white text-center shadow-xl">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute inset-0 bg-[#cca353]/5 blur-[120px] rounded-full -top-40 -left-40 w-[500px] h-[500px]" />

        <div className="gc-container-custom relative z-10 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#cca353]/15 text-[#cca353] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 border border-[#cca353]/30">
              PLATAFORMA VIRTUAL 24/7
            </span>
            <h1 className="font-gc-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-tight select-none">
              NUESTROS <span className="text-[#cca353]">CURSOS GRABADOS</span>
            </h1>
            <p className="mt-4 text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed select-none">
              Estudia a tu propio ritmo con las mejores capacitaciones especializadas, con certificación incluida.
            </p>

            {/* Premium Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto bg-white rounded-full p-1.5 flex shadow-2xl shadow-gc-black/45 border border-white/10">
              <div className="flex-grow flex items-center px-4">
                <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="¿Qué especialidad deseas aprender hoy?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-800 focus:outline-none focus:ring-0 placeholder-gray-400 text-sm pl-2 font-medium"
                />
              </div>
              <button className="bg-[#cca353] hover:bg-[#b89244] text-gc-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Buscar
              </button>
            </div>

            {/* Quick Badges row */}
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-wider select-none">
              <span className="flex items-center gap-1">✅ ACCESO DE POR VIDA</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">🎓 CERTIFICACIÓN CON QR</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">💼 100% PRÁCTICO</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Course Categories listing */}
      <main className="gc-container-custom px-4 py-16 flex-grow max-w-7xl mx-auto w-full space-y-16">
        {cursos.length === 0 ? (
          <div className="py-20 text-center text-gray-500 max-w-md mx-auto select-none">
            <FolderClosed className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-700">Próximamente nuevos cursos</h3>
            <p className="text-sm text-gray-400 mt-2">
              Estamos preparando nuevas capacitaciones grabadas. Vuelve pronto.
            </p>
          </div>
        ) : filteredSections.length > 0 ? (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sec.colorClass} shadow-md`}>
                    <FolderClosed className="w-5 h-5" style={{ color: sec.iconColor }} />
                  </div>
                  <h2 className="font-gc-sans font-black text-sm md:text-base lg:text-lg tracking-wider text-[#0c1938] uppercase">
                    {sec.title}
                  </h2>
                </div>
                <div className="text-[10px] font-black text-[#cca353] tracking-widest uppercase bg-[#cca353]/10 px-3 py-1 rounded-md border border-[#cca353]/20">
                  {sec.courses.length} CURSOS
                </div>
              </div>

              {/* Grid: 4 columnas en pantallas grandes, alineado a la izquierda */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sec.courses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <PublicCourseCard curso={course} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500 max-w-md mx-auto select-none">
            <FolderClosed className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-700">No se encontraron cursos</h3>
            <p className="text-sm text-gray-400 mt-2">
              No encontramos resultados para su búsqueda &quot;{searchQuery}&quot;. Intente buscar con otras palabras clave.
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
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

export default CursosCatalogo;
