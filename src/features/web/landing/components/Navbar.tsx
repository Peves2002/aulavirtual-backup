'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Building2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Servicios", href: "#servicios" },
  { name: "Portafolio", href: "#portafolio" },
  { name: "Logros", href: "#logros" },
  { name: "Galería", href: "#galeria" },
  { name: "Experiencias", href: "#experiencias" },
  { name: "Aula Virtual", href: "/cursos" },
  { name: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "py-3 bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/40"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Elite Logo */}
          <motion.a
            href="#inicio"
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-12 h-12 rounded-2xl bg-primary flex items-center justify-center overflow-hidden shadow-2xl group-hover:glow-orange transition-all duration-500">
              <Building2 className="w-6 h-6 text-white animate-reveal" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black tracking-tighter text-xl transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                ELITE<span className="text-primary">.</span>
              </span>
              <span className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isScrolled ? 'text-slate-500 opacity-60' : 'text-white opacity-80'}`}>
                Engineering
              </span>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => {
              const isInternal = link.href.startsWith('/');
              const content = (
                <>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </>
              );
              const className = `text-sm font-bold tracking-wide transition-all duration-500 relative group ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'}`;

              if (isInternal) {
                return (
                  <Link key={link.name} href={link.href} className={className}>
                    {content}
                  </Link>
                );
              }

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={className}
                >
                  {content}
                </motion.a>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://wa.me/51955833613"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-orange-600 text-white font-black px-8 py-6 rounded-2xl glow-orange-strong hover:scale-105 transition-all duration-300 group">
                <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                CONTÁCTANOS
              </Button>
            </a>
          </div>

          {/* Menu Toggle */}
          <button
            className={`lg:hidden p-3 rounded-2xl transition-all duration-500 ${isScrolled ? 'bg-slate-100 text-primary' : 'bg-white/10 text-white'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Modern Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 lg:hidden bg-primary/95 pt-24 px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col gap-6"
            >
              {navLinks.map((link, i) => {
                const isInternal = link.href.startsWith('/');
                const className = "text-3xl font-black text-white hover:text-primary transition-colors flex items-center justify-between group";
                const content = (
                  <>
                    {link.name}
                    <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </>
                );

                if (isInternal) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={className}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={className}
                  >
                    {content}
                  </motion.a>
                );
              })}

              <div className="mt-8 pt-8 border-t border-white/10">
                <a href="https://wa.me/51955833613" className="block">
                  <Button className="w-full bg-primary text-white font-black py-8 text-xl rounded-2xl glow-orange">
                    ¡Hablemos Hoy!
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
