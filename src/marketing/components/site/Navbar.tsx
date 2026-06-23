'use client'

import { useEffect, useRef, useState } from "react";

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { signOut, useSession } from "next-auth/react";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";

import { DASHBOARD_POR_ROL, ETIQUETA_ROL } from "@/marketing/lib/dashboard-roles";

const logoImg = "/images/grupo-corpus/grupo-corpus-logo.png"

type NavItem =
  | { kind: "anchor"; href: string; label: string }
  | { kind: "route"; to: string; label: string };

const items: NavItem[] = [
  { kind: "anchor", href: "#inicio", label: "Inicio" },
  { kind: "route", to: "/recursos", label: "Artículos" },
  { kind: "route", to: "/cursos-en-vivo", label: "Cursos en Vivo" },
  { kind: "route", to: "/cursos", label: "Cursos offline" },
  { kind: "route", to: "/campus-virtual", label: "Campus Virtual" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()
  const router = useRouter()
  const onHome = pathname === "/";

  const { data: session, status } = useSession();
  const rol = (session?.user as any)?.rol as string | undefined;
  const dashboardUrl = (rol && DASHBOARD_POR_ROL[rol]) || "/estudiante/dashboard";
  const avatar = (session?.user as any)?.avatar || session?.user?.image;
  const nombreUsuario = session?.user?.name || "Usuario";

  useEffect(() => {
    if (!userMenuOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [userMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(prev => {
        if (window.scrollY > 40) return true;

        if (window.scrollY < 10) return false;

        return prev;
      });
      if (!onHome) return;
      const anchors = items.filter((i): i is Extract<NavItem, { kind: "anchor" }> => i.kind === "anchor");

      anchors.forEach(a => {
        const sec = document.querySelector(a.href);

        if (sec) {
          const r = (sec as HTMLElement).getBoundingClientRect();

          if (r.top <= 120 && r.bottom >= 120) setActive(a.href);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const goAnchor = (href: string) => {
    if (onHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  const isActive = (item: NavItem) => {
    if (item.kind === "anchor") {
      return onHome && active === item.href;
    }

    if (item.kind === "route") {
      return pathname === item.to;
    }

    
return false;
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full py-4 transition-colors duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="gc-container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Grupo Corpus"
            className="object-contain"
            style={{ height: "84px" }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          <ul className="flex items-center gap-8 xl:gap-10 font-gc-sans text-[15px]">
            {items.map((it, idx) => {
              const active = isActive(it);

              if (it.kind === "anchor") {
                return (
                  <li key={idx}>
                    <button
                      onClick={() => goAnchor(it.href)}
                      className={`transition-all duration-300 font-gc-sans tracking-wide px-4 py-1.5 rounded-full ${
                        active
                          ? "bg-gc-blue-corp text-white font-bold"
                          : "text-[#5e6b7e] hover:text-[#cca353] font-medium"
                      }`}
                    >
                      {it.label}
                    </button>
                  </li>
                );
              }

              if (it.kind === "route") {
                return (
                  <li key={idx}>
                    <Link
                      href={it.to}
                      className={`transition-all duration-300 font-gc-sans tracking-wide px-4 py-1.5 rounded-full ${
                        active
                          ? "bg-gc-blue-corp text-white font-bold"
                          : "text-[#5e6b7e] hover:text-[#cca353] font-medium"
                      }`}
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              }

              
return null;
            })}
          </ul>

          {/* Cuenta de usuario */}
          <div className="border-l border-gc-gray-light pl-6 py-1 relative" ref={userMenuRef}>
            {status === "authenticated" && session?.user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 text-gc-gray-medium hover:scale-105 transition duration-300"
                  aria-label="Cuenta"
                >
                  <span className="w-8 h-8 rounded-full bg-gc-blue-corp text-white text-xs font-black flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt={nombreUsuario} className="w-full h-full object-cover" />
                    ) : (
                      nombreUsuario.charAt(0).toUpperCase()
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gc-gray-light overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gc-gray-light">
                        <p className="text-sm font-bold text-gc-black truncate">{nombreUsuario}</p>
                        <p className="text-xs text-gc-gray-medium">{(rol && ETIQUETA_ROL[rol]) || "Estudiante"}</p>
                      </div>
                      <Link
                        href={dashboardUrl}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gc-gray-dark hover:bg-gc-gray-light transition"
                      >
                        <LayoutDashboard size={16} />
                        Ir a mi panel
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gc-gray-light transition"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href="/campus-virtual"
                className="text-gc-gray-medium transition relative p-1 hover:scale-105 duration-300 flex items-center justify-center"
                aria-label="Iniciar sesión"
              >
                <svg width="28" height="32" viewBox="0 0 28 32" fill="none" className="text-gc-blue-corp stroke-current">
                  <rect x="3" y="9" width="22" height="21" rx="4" strokeWidth="2" />
                  <path d="M8 9V8C8 4.686 10.686 2 14 2C17.314 2 20 4.686 20 8V9" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-4">
          {status === "authenticated" && session?.user ? (
            <Link href={dashboardUrl} className="flex items-center" aria-label="Mi panel">
              <span className="w-8 h-8 rounded-full bg-gc-blue-corp text-white text-xs font-black flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt={nombreUsuario} className="w-full h-full object-cover" />
                ) : (
                  nombreUsuario.charAt(0).toUpperCase()
                )}
              </span>
            </Link>
          ) : (
            <Link href="/campus-virtual" className="text-gc-gray-medium transition relative p-1 hover:scale-105 duration-300" aria-label="Iniciar sesión">
              <svg width="26" height="30" viewBox="0 0 28 32" fill="none" className="text-gc-blue-corp stroke-current">
                <rect x="3" y="9" width="22" height="21" rx="4" strokeWidth="2" />
                <path d="M8 9V8C8 4.686 10.686 2 14 2C17.314 2 20 4.686 20 8V9" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          )}
          <button
            aria-label="Abrir menú"
            className="text-gc-black p-2 hover:bg-gc-gray-light rounded-lg transition"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gc-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden p-6 flex flex-col overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                  <img src={logoImg} alt="Grupo Corpus" className="h-14 object-contain" />
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-gc-gray-medium hover:text-gc-black p-2 rounded-lg transition">✕</button>
              </div>

              <ul className="flex flex-col gap-2 text-lg mb-8">
                {items.map((it, idx) => {
                  const active = isActive(it);

                  if (it.kind === "anchor") {
                    return (
                      <li key={idx}>
                        <button
                          onClick={() => { setOpen(false); goAnchor(it.href); }}
                          className={`w-full text-left block py-3 px-4 rounded-xl transition-all duration-200 ${
                            active 
                              ? "bg-[#cca353]/10 text-[#cca353] font-bold" 
                              : "text-[#5e6b7e] hover:bg-gc-gray-light hover:text-[#cca353] font-medium"
                          }`}
                        >
                          {it.label}
                        </button>
                      </li>
                    );
                  }

                  if (it.kind === "route") {
                    return (
                      <li key={idx}>
                        <Link
                          href={it.to}
                          onClick={() => setOpen(false)}
                          className={`w-full block py-3 px-4 rounded-xl transition-all duration-200 ${
                            active 
                              ? "bg-[#cca353]/10 text-[#cca353] font-bold" 
                              : "text-[#5e6b7e] hover:bg-gc-gray-light hover:text-[#cca353] font-medium"
                          }`}
                        >
                          {it.label}
                        </Link>
                      </li>
                    );
                  }

                  
return null;
                })}
              </ul>

              {status === "authenticated" && session?.user && (
                <button
                  onClick={() => { setOpen(false); signOut(); }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-red-600 hover:bg-gc-gray-light transition mb-4"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              )}

              <div className="mt-auto pt-8 border-t border-gc-gray-light text-center text-xs text-[#5e6b7e]">
                <p>© {new Date().getFullYear()} Grupo Corpus</p>
                <p className="mt-1">Capacitaciones Especializadas</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
