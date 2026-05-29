'use client'

import { useState, useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useSession } from "next-auth/react"

import { motion, AnimatePresence } from "framer-motion"

import {
  Menu,
  X,
  ArrowRight,
  ShoppingCart,
  User,
  LogIn,
  UserPlus
} from "lucide-react"

import { Button } from "@/features/web/landing/components/ui/button"
import { useCart } from "@/features/web/cart/context/CartContext"
import { useAuthModal } from "@/contexts/AuthModalContext"

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Cursos", href: "/cursos" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(pathname !== "/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openLogin, openRegister } = useAuthModal();

  useEffect(() => {
    setIsScrolled(window.scrollY > 50 || pathname !== "/");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || pathname !== "/");
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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
            href="/"
            className="flex items-center group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/images/logo-elite.png"
              alt="Elite Engineering"
              className="h-16 w-auto transition-all duration-500 drop-shadow-lg"
            />
          </motion.a>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const content = (
                <>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </>
              );

              const className = `text-sm font-bold tracking-wide transition-all duration-500 relative group cursor-pointer ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'}`;

              return (
                <Link key={link.name} href={link.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className={`relative p-3 rounded-2xl transition-all duration-500 group cursor-pointer ${isScrolled ? 'bg-slate-100 text-primary hover:bg-accent hover:text-white' : 'bg-white/10 text-white hover:bg-accent hover:text-white'
                }`}
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {session ? (
              <Link href="/dashboard">
                <Button className="bg-accent hover:bg-orange-600 text-white font-black px-6 py-5 rounded-2xl glow-orange transition-all hover:scale-105 cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  MI AULA
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  onClick={() => openLogin()}
                  className={`text-sm font-bold transition-all cursor-pointer ${isScrolled ? 'text-primary hover:text-accent' : 'text-white hover:text-white/70'}`}
                >
                  Iniciar Sesión
                </span>
                <Button
                  onClick={() => openRegister()}
                  className="bg-accent hover:bg-orange-600 text-white font-black px-6 py-5 rounded-2xl shadow-xl shadow-accent/20 transition-all hover:scale-105 cursor-pointer"
                >
                  Registrarse
                </Button>
              </div>
            )}
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
            className="fixed inset-0 z-40 lg:hidden bg-primary/95 pt-24 px-6 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-black text-white hover:text-primary transition-colors flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartDrawerOpen(true);
                  }}
                  className="flex items-center justify-between w-full p-6 rounded-2xl bg-white/5 text-white font-black text-xl"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6" /> Carrito
                  </span>
                  <span className="bg-accent px-3 py-1 rounded-full text-sm">{itemCount}</span>
                </button>

                {session ? (
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-accent text-white font-black py-8 text-xl rounded-2xl">
                      Mi Aula Virtual
                    </Button>
                  </Link>
                ) : (
                  <>
                    <button onClick={() => { setIsMobileMenuOpen(false); openLogin(); }} className="w-full">
                      <Button variant="outline" className="w-full border-2 border-white/20 text-white font-black py-8 text-xl rounded-2xl hover:bg-white hover:text-primary">
                        <LogIn className="w-6 h-6 mr-3" /> Iniciar Sesión
                      </Button>
                    </button>
                    <button onClick={() => { setIsMobileMenuOpen(false); openRegister(); }} className="w-full">
                      <Button className="w-full bg-primary text-white font-black py-8 text-xl rounded-2xl glow-orange">
                        <UserPlus className="w-6 h-6 mr-3" /> Registrarse
                      </Button>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
