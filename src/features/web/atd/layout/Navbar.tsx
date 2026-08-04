'use client'

import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, X, ChevronDown, Globe, LogOut, User, BookOpen, Bot, ShoppingBag, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/features/web/atd/ui/button";
import { cn } from "@/features/web/atd/lib/utils";
import { useAuthModal } from "@/contexts/AuthModalContext";
import CartIcon from "@/features/web/cart/components/CartIcon";
import NavSearch from "@/features/web/atd/layout/NavSearch";

const logo = "/atd-assets/general/logo.png";

const LANGS = [
  { code: "ES", label: "Español" }
];

function LangSelector() {
  const [active, setActive] = useState("ES");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        {active}
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-32 rounded-lg border border-white/10 overflow-hidden z-50" style={{ background: "rgba(15,15,20,0.95)", backdropFilter: "blur(12px)" }}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setActive(l.code); setOpen(false); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-xs transition-colors",
                active === l.code ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <span>{l.label}</span>
              <span className="font-bold">{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── User menu dropdown ───────────────────────────────────────────────────────
function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!session?.user) return null;

  const user = session.user as any;
  const nombre = user.nombre || user.name || user.email || "Usuario";
  const initials = nombre.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatar = user.avatar || user.image;
  const isAdmin = user.rol === "ADMIN";
  const isProfesor = user.rol === "PROFESOR";

  const menuLinks = [
    { href: "/perfil", label: "Mi perfil", icon: User },
    { href: "/estudiante/mis-cursos", label: "Mis cursos", icon: BookOpen },
    { href: "/estudiante/mis-gpts", label: "Mis GPTs", icon: Bot },
    { href: "/estudiante/pedidos", label: "Mis pedidos", icon: ShoppingBag },
  ];

  if (isAdmin) menuLinks.push({ href: "/admin", label: "Panel Admin", icon: LayoutDashboard });
  if (isProfesor) menuLinks.push({ href: "/profesor", label: "Panel Profesor", icon: LayoutDashboard });

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-white/10 bg-black/30 hover:border-white/20 hover:bg-white/8 transition-all group"
      >
        {/* Avatar */}
        {avatar ? (
          <img src={avatar} alt={nombre} className="h-7 w-7 rounded-full object-cover ring-1 ring-primary/30" />
        ) : (
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-xs font-bold text-white ring-1 ring-primary/30">
            {initials}
          </div>
        )}
        <span className="text-sm font-medium text-white/90 group-hover:text-white max-w-[100px] truncate hidden xl:block">
          {nombre.split(" ")[0]}
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl"
          style={{ background: "rgba(12,12,18,0.97)", backdropFilter: "blur(16px)" }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/8">
            <p className="text-sm font-semibold text-foreground truncate">{nombre}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            {isAdmin && (
              <span className="mt-1 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-wide">
                Admin
              </span>
            )}
            {isProfesor && (
              <span className="mt-1 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 uppercase tracking-wide">
                Profesor
              </span>
            )}
          </div>

          {/* Links */}
          <div className="py-1">
            {menuLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </Link>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t border-white/8 py-1">
            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const links = [
  { to: "/programas", label: "Programas" },
  { to: "/marketplace", label: "Marketplace IA" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/suscripciones", label: "Suscripciones" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openLogin, openRegister } = useAuthModal();
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src={logo} alt="ATD Academy" className="h-10 w-auto" />
          <div className="font-display font-bold tracking-tight text-lg">
            ATD <span className="text-muted-foreground font-medium">Academy</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavSearch />
          {/* <LangSelector /> */}
          <div className="w-px h-4 bg-white/10 mx-1" />
          {links.map((l) => {
            const isActive = pathname === l.to;


            return (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  isActive ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <CartIcon />
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-white/5 animate-pulse" />
          ) : isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => openLogin()}>
                Iniciar sesión
              </Button>
              <Button variant="hero" size="sm" onClick={() => openRegister()}>
                Empieza gratis →
              </Button>
            </>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => {
              const isActive = pathname === l.to;


              return (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-md text-sm",
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <MobileUserSection onClose={() => setOpen(false)} />
            ) : (
              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { openLogin(); setOpen(false); }}>
                  Iniciar sesión
                </Button>
                <Button variant="hero" size="sm" className="flex-1" onClick={() => { openRegister(); setOpen(false); }}>
                  Empieza gratis
                </Button>
              </div>
            )}

            <div className="pt-2 pb-1">
              <LangSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ─── Mobile user section ──────────────────────────────────────────────────────
function MobileUserSection({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const user = session.user as any;
  const nombre = user.nombre || user.name || user.email || "Usuario";
  const avatar = user.avatar || user.image;
  const initials = nombre.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const isAdmin = user.rol === "ADMIN";
  const isProfesor = user.rol === "PROFESOR";

  const mobileLinks = [
    { href: "/perfil", label: "Mi perfil", icon: User },
    { href: "/estudiante/mis-cursos", label: "Mis cursos", icon: BookOpen },
    { href: "/estudiante/mis-gpts", label: "Mis GPTs", icon: Bot },
    { href: "/estudiante/pedidos", label: "Mis pedidos", icon: ShoppingBag },
    ...(isAdmin ? [{ href: "/admin", label: "Panel Admin", icon: LayoutDashboard }] : []),
    ...(isProfesor ? [{ href: "/profesor", label: "Panel Profesor", icon: LayoutDashboard }] : []),
  ];

  return (
    <div className="mt-3 border-t border-white/8 pt-3">
      {/* User info */}
      <div className="flex items-center gap-3 px-3 py-2 mb-2">
        {avatar ? (
          <img src={avatar} alt={nombre} className="h-9 w-9 rounded-full object-cover ring-1 ring-primary/30" />
        ) : (
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-sm font-bold text-white">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{nombre}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      {/* Links */}
      {mobileLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          {label}
        </Link>
      ))}

      {/* Sign out */}
      <button
        onClick={() => { onClose(); signOut({ callbackUrl: "/" }); }}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors mt-1"
      >
        <LogOut className="h-4 w-4 flex-shrink-0" />
        Cerrar sesión
      </button>
    </div>
  );
}

export default Navbar;
