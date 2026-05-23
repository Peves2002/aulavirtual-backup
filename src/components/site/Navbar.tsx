"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { ArrowRight, Menu, X } from "lucide-react";

import { useAuthModal } from "@/contexts/AuthModalContext";
import CartIcon from "@/features/web/cart/components/CartIcon";
import { useReveal } from "@/hooks/use-reveal";
import UserDropdown from "@/utils/components/layout/shared/UserDropdown";

import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/cursos", label: "Cursos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { openLogin, openRegister } = useAuthModal();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const showBackground = scrolled;
  const showElements = !isHome || scrolled;
  const isWhiteTheme = !isHome || scrolled;

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${
          showBackground 
            ? 'bg-[#0A1A04]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b border-white/5 py-3' 
            : 'bg-transparent shadow-none border-b border-transparent py-3 lg:py-4'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo Desktop */}
          <div className="hidden lg:block">
            <Logo white={isWhiteTheme} />
          </div>
          
          {/* Logo Mobile */}
          <div className="block lg:hidden">
            <Logo white={true} />
          </div>
          <ul className={`hidden lg:flex items-center gap-8 list-none m-0 p-0 transition-all duration-300 ${showElements ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  className="relative font-bold text-[14px] uppercase tracking-wide transition-colors duration-300 group"
                  style={{ color: isWhiteTheme ? "rgba(255,255,255,0.9)" : "#1A3A0A" }}
                >
                  <span className="group-hover:text-[#A8E060] transition-colors duration-300">
                    {l.label}
                  </span>
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-[#A8E060] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className={`hidden lg:flex items-center gap-4 transition-all duration-300 ${showElements ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <CartIcon white={isWhiteTheme} />
            {session ? (
              <UserDropdown />
            ) : (
              <>
                <button
                  onClick={() => openLogin()}
                  className={`bg-transparent border-none font-bold text-[14px] hover:text-[#5A9020] transition-colors ${isWhiteTheme ? 'text-white' : 'text-[#1A3A0A]'}`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => openRegister()}
                  className="inline-flex items-center gap-2 font-bold text-[14px] rounded-full px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{ 
                    background: isWhiteTheme ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #A8E060 0%, #5A9020 100%)", 
                    color: isWhiteTheme ? "#FFFFFF" : "#1A3A0A",
                    border: isWhiteTheme ? "1px solid rgba(255,255,255,0.2)" : "none"
                  }}
                >
                  Registrarse
                  <ArrowRight size={16} className={isWhiteTheme ? "text-[#A8E060]" : "text-[#1A3A0A]"} />
                </button>
              </>
            )}
          </div>

          <button
            aria-label="Menu"
            className="lg:hidden p-3 rounded-2xl transition-all duration-300 bg-white/10 text-white hover:bg-white/20"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-[#0A1A04]/40 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-4 top-4 bottom-4 w-[90%] max-w-[360px] bg-white rounded-[40px] flex flex-col shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-[110%]"}`}
        >
          <div className="flex items-center justify-between p-8 border-b border-[#F7FBF0]">
            <Logo />
            <button 
              onClick={() => setOpen(false)}
              className="w-12 h-12 flex items-center justify-center bg-[#F7FBF0] rounded-2xl text-[#1A3A0A]"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-10 px-8">
            <ul className="flex flex-col gap-8 list-none m-0 p-0">
              {links.map((l, i) => (
                <li key={l.href} style={{ transitionDelay: `${i * 50}ms` }} className={`${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} transition-all duration-500`}>
                  <Link href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-3xl font-display font-bold text-[#1A3A0A] group-hover:text-[#5A9020] transition-colors">
                      {l.label}
                    </span>
                    <ArrowRight className="text-[#A8E060] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8">
            <Link href="/cursos"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full font-bold text-[16px] rounded-[24px] py-5 transition-all duration-300 shadow-xl"
              style={{ background: "#A8E060", color: "#0A1A04" }}
            >
              Inscribirme ahora
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
