'use client'

import { useState, useEffect } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  PlayCircle,
  BookOpen,
  LogOut,
} from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";
import { DASHBOARD_POR_ROL, ETIQUETA_ROL } from "@/marketing/lib/dashboard-roles";

// ─── Course data (20 items) ───────────────────────────────────────────────────
const courses = [
  {
    id: 1,
    title: "AutoCAD Electrical - Diseño de Esquemas y Circuitos de Control",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 2,
    title: "DIALux evo - Diseño de Iluminación de Interiores y Oficinas",
    image: "https://images.unsplash.com/photo-1565538810844-1e1194116c07?w=600&q=80",
    category: "Iluminación",
  },
  {
    id: 3,
    title: "DIALux evo - Iluminación de Vías Públicas y Alumbrado Urbano",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    category: "Iluminación",
  },
  {
    id: 4,
    title: "Revit MEP - Modelamiento BIM de Canalizaciones y Bandejas",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&q=80",
    category: "BIM Eléctrico",
  },
  {
    id: 5,
    title: "Diseño de Sistemas de Puesta a Tierra (SPAT) y Pozos a Tierra",
    image: "https://images.unsplash.com/photo-1581093057726-442ba0bec3b1?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 6,
    title: "Diagrama Unifilar y Cuadro de Cargas según CNE",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 7,
    title: "Cálculo de Corriente de Cortocircuito y Coordinación con ETAP",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 8,
    title: "Subestaciones Eléctricas de Distribución y Celdas de Media Tensión",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 9,
    title: "Auditorías de Eficiencia Energética e Iluminación LED",
    image: "https://images.unsplash.com/photo-1513828760659-d1d88c7793ec?w=600&q=80",
    category: "Iluminación",
  },
  {
    id: 10,
    title: "Seguridad y Prevención de Riesgos Eléctricos (NFPA 70E)",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&q=80",
    category: "Seguridad",
  },
  {
    id: 11,
    title: "Memorias de Cálculo de Instalaciones Eléctricas Industriales",
    image: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=600&q=80",
    category: "Eléctrica",
  },
  {
    id: 12,
    title: "Revit MEP - Diseño y Coordinación de Tableros Eléctricos",
    image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=600&q=80",
    category: "BIM Eléctrico",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function CampusVirtual() {
  const { data: session, status } = useSession();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Campus Virtual | Grupo Corpus";
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", { redirect: false, correo, contrasena });

      if (result?.error) {
        setLoginError(
          result.error === "CredentialsSignin"
            ? "Correo o contraseña incorrectos"
            : "Error al iniciar sesión. Intenta nuevamente."
        );

        return;
      }

      setContrasena("");
    } finally {
      setIsLoading(false);
    }
  };

  const rol = (session?.user as any)?.rol as string | undefined;
  const dashboardUrl = (rol && DASHBOARD_POR_ROL[rol]) || "/estudiante/dashboard";
  const avatar = (session?.user as any)?.avatar || session?.user?.image;

  return (
    <div className="min-h-screen flex flex-col bg-white font-gc-sans text-[#0f172a]">

      <Navbar />

      {/* ── HERO: split layout ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 lg:py-20 select-none bg-gradient-to-r from-[#0250d5] via-[#0562f1] to-[#013fa8]"
      >
        {/* Honeycomb decorative pattern overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%">
            <pattern id="honeycomb" width="56" height="97" patternUnits="userSpaceOnUse">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z M28 97 L56 80.84 L56 48.5 L28 32.34 L0 48.5 L0 80.84 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#honeycomb)" />
          </svg>
        </div>

        {/* Decorative ambient glowing lights */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-350/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
          
          {/* Left Column — Overlapping Welcome Visuals */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-12 w-full justify-center lg:justify-start">
            
            {/* Circular Image frame */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-4 rounded-full border border-white/25 pointer-events-none" />
              <div className="absolute -inset-8 rounded-full border border-white/10 pointer-events-none hidden md:block" />
              
              <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-[6px] border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] relative">
                <img
                  src="/images/grupo-corpus/campus_virtual_engineers.png"
                  alt="Estudiantes e ingenieros"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Welcome Text Overlays & Badges */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-20">
              <div className="relative mb-6">
                
                {/* "Bienvenido" white badge */}
                <div className="absolute -top-4 left-6 bg-white px-4 py-1.5 rounded-md shadow-lg border border-gray-200 z-30">
                  <span className="text-gc-black font-extrabold text-sm uppercase tracking-wider font-gc-sans">
                    Bienvenido
                  </span>
                </div>

                {/* Speech Bubble Black Container */}
                <div className="bg-[#0b0c16] text-white rounded-[22px] px-8 py-6 pr-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative mt-2">
                  <div className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-0.5 leading-none">
                    A nuestro
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-none font-gc-sans">
                    campus virtual
                  </h1>
                  
                  {/* Floating clicker mouse arrow pointer */}
                  <div className="absolute -bottom-5 -right-3 text-white z-40 transform hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 3 L20 11.5 L12.5 13 L9.5 20.5 Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="12.5" cy="13" r="1.5" fill="black" />
                      <path d="M21 7 A 3 3 0 0 1 23 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="animate-ping" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Centered Description Text underneath */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-semibold max-w-sm mt-2 text-center md:text-left px-4 md:px-0">
                Accede a todos los cursos,<br />
                materiales y herramientas que<br />
                tenemos para ti.
              </p>

              {/* Badge Button */}
              <div className="mt-6 flex justify-center md:justify-start w-full">
                <div className="inline-flex bg-[#0b0d19]/90 border border-white/10 text-white text-xs font-bold px-6 py-2.5 rounded-full tracking-wider shadow-lg hover:bg-gc-black transition-colors duration-300">
                  #AprendeConGrupoCorpus
                </div>
              </div>
            </div>

          </div>

          {/* Right Column — Login Card / User Menu */}
          {status === "authenticated" && session?.user ? (
            <div className="w-full max-w-[420px] bg-[#f1f5f9] border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#1b43a9] flex items-center justify-center text-white text-2xl font-black mb-4">
                {avatar ? (
                  <img src={avatar} alt={session.user.name || "Usuario"} className="w-full h-full object-cover" />
                ) : (
                  (session.user.name || "U").charAt(0).toUpperCase()
                )}
              </div>
              <h2 className="text-[#0d1f4d] font-bold text-xl font-gc-sans">
                {session.user.name}
              </h2>
              <span className="mt-1 inline-flex items-center px-3 py-1 rounded-full bg-[#1b43a9]/10 text-[#1b43a9] text-xs font-bold uppercase tracking-wide">
                {(rol && ETIQUETA_ROL[rol]) || "Estudiante"}
              </span>

              <a
                href={dashboardUrl}
                className="mt-6 w-full bg-[#0b0c16] hover:bg-[#1b43a9] text-white font-extrabold px-8 py-3 rounded text-sm tracking-wide transition-all duration-300 shadow hover:shadow-lg text-center"
              >
                Ir a mi panel
              </a>

              <button
                type="button"
                onClick={() => signOut({ redirect: false })}
                className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#1b43a9] transition"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="w-full max-w-[420px] bg-[#f1f5f9] border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 flex flex-col">
              <h2 className="text-[#0d1f4d] font-bold text-xl md:text-2xl mb-6 font-gc-sans">
                Accede a la plataforma
              </h2>

              {loginError && (
                <div className="mb-4 px-3 py-2 rounded bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Correo electrónico
                  </label>
                  <div className="flex border border-gray-300 rounded overflow-hidden bg-white focus-within:border-[#1b43a9] focus-within:ring-2 focus-within:ring-[#1b43a9]/10 transition-all">
                    <div className="bg-[#eef2f6] border-r border-gray-300 px-3.5 flex items-center justify-center text-gray-500 w-12 flex-shrink-0">
                      <Mail size={16} className="stroke-[2.5]" />
                    </div>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Contraseña
                  </label>
                  <div className="flex border border-gray-350 rounded overflow-hidden bg-white focus-within:border-[#1b43a9] focus-within:ring-2 focus-within:ring-[#1b43a9]/10 transition-all">
                    <div className="bg-[#eef2f6] border-r border-gray-300 px-3.5 flex items-center justify-center text-gray-500 w-12 flex-shrink-0">
                      <Lock size={16} className="stroke-[2.5]" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Left-aligned rectangular login button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#0b0c16] hover:bg-[#1b43a9] text-white font-extrabold px-8 py-3 rounded text-sm tracking-wide transition-all duration-300 shadow hover:shadow-lg disabled:opacity-60"
                  >
                    {isLoading ? "Ingresando..." : "Acceder"}
                  </button>
                </div>
              </form>

              {/* Left-aligned recovery link */}
              <div className="mt-4">
                <a
                  href="/forgot-password"
                  className="text-xs font-semibold text-gray-600 hover:text-[#1b43a9] transition"
                >
                  ¿Olvidó su nombre de usuario o contraseña?
                </a>
              </div>

              {/* Centered guest access link */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
                <a
                  href="#cursos"
                  className="text-xs font-bold text-gray-600 hover:text-[#1b43a9] transition hover:underline"
                >
                  Entrar como invitado
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── DARK BAR ────────────────────────────────────────────── */}
      <div className="bg-[#0b0c16] text-gray-305 text-xs py-3.5 px-6 border-y border-white/5 select-none shadow-inner">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#cca353] animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">grupocorpus.edu.pe</span>
          <span className="text-gray-500 hidden sm:inline">— Plataforma de capacitación virtual especializada</span>
        </div>
      </div>

      {/* ── CURSOS DISPONIBLES ──────────────────────────────────── */}
      <section id="cursos" className="py-12 px-4 bg-[#f8fafc] flex-grow">
        <div className="max-w-7xl mx-auto">

          {/* Section title */}
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="flex-1 max-w-[120px] h-px bg-gray-300" />
            <h2 className="text-xl md:text-2xl font-black text-[#0c1938] tracking-wide flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1a56e8]" />
              Cursos disponibles
            </h2>
            <div className="flex-1 max-w-[120px] h-px bg-gray-300" />
          </div>

          {/* Grid 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (idx % 4) * 0.07 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#1a56e8]/30 hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  {/* Grupo Corpus badge top-left */}
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-[#1a56e8] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-md tracking-wide">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
                    </svg>
                    Grupo Corpus
                  </div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 bg-[#0e2a82]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayCircle className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Blue accent bar */}
                <div className="h-[3px] bg-gradient-to-r from-[#0e2a82] to-[#1a56e8]" />

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Category tag */}
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#1a56e8] mb-1.5">
                    {course.category}
                  </span>
                  {/* Title */}
                  <h3 className="font-black text-[11px] text-[#0c1938] leading-snug uppercase line-clamp-3 group-hover:text-[#1a56e8] transition-colors duration-300 flex-grow">
                    {course.title}
                  </h3>

                  {/* Button */}
                  <button
                    onClick={() => alert(`Accediendo al curso: ${course.title}`)}
                    className="mt-4 w-full bg-[#0e2a82] hover:bg-[#1a56e8] text-white font-bold text-[10px] uppercase tracking-wider py-2.5 rounded flex items-center justify-center gap-1.5 transition-colors duration-300"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    Ver Curso
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp float */}
      <a
        href="https://wa.me/51956266147"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 text-white"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.734-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.45.993c-5.439 0-9.859 4.37-9.863 9.8-.001 1.73.457 3.424 1.326 4.917L1.87 20.84l5.35-1.395c-1.42.776-2.58.55-2.58.55zM17.43 14.93c-.302-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.777.98-.95 1.18-.178.2-.355.22-.658.07-1.485-.75-2.56-1.3-3.585-3.08-.27-.47.27-.43.77-.93.18-.18.15-.3.07-.45-.07-.15-.678-1.63-.93-2.23-.244-.59-.49-.51-.678-.52-.178-.01-.383-.01-.588-.01-.205 0-.538.08-.82.38-.282.3-1.077 1.05-1.077 2.57s1.1 2.98 1.25 3.18c.15.2 2.163 3.303 5.242 4.63 1.243.535 2.193.85 2.946 1.09 1.246.395 2.382.34 3.278.206.996-.15 2.062-.84 2.352-1.62.29-.78.29-1.45.2-1.58c-.09-.13-.33-.2-.635-.35z" />
        </svg>
      </a>
    </div>
  );
}
