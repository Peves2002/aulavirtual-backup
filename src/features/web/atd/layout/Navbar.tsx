'use client'

'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

import { Button } from "@/features/web/atd/ui/button";
import { cn } from "@/features/web/atd/lib/utils";
import { useAuthModal } from "@/contexts/AuthModalContext";
import CartIcon from "@/features/web/cart/components/CartIcon";
import NavSearch from "@/features/web/atd/layout/NavSearch";

const logo = "/atd-assets/general/logo.png";

const LANGS = [
  { code: "ES", label: "Español" },
  { code: "EN", label: "English" },
  { code: "PT", label: "Português" },
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

const links = [
  { to: "/programas", label: "Programas" },
  { to: "/marketplace", label: "Marketplace IA" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/empresas", label: "Empresas" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openLogin, openRegister } = useAuthModal();
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
          <LangSelector />
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
          <Button variant="ghost" size="sm" onClick={() => openLogin()}>
            Iniciar sesión
          </Button>
          <Button variant="hero" size="sm" onClick={() => openRegister()}>
            Empieza gratis →
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

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
            <div className="flex gap-2 pt-3">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { openLogin(); setOpen(false); }}>
                Iniciar sesión
              </Button>
              <Button variant="hero" size="sm" className="flex-1" onClick={() => { openRegister(); setOpen(false); }}>
                Empieza gratis
              </Button>
            </div>
            <div className="pt-2 pb-1">
              <LangSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
