'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/features/web/atd/ui/button";
import { cn } from "@/features/web/atd/lib/utils";

const logo = "/atd-assets/general/logo.png";

const links = [
  { to: "/programas", label: "Programas" },
  { to: "/marketplace", label: "Marketplace IA" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
          <Button variant="ghost" size="sm" asChild>
            <Link href="#">Iniciar sesión</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link href="#">Empieza gratis →</Link>
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
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="#" onClick={() => setOpen(false)}>Iniciar sesión</Link>
              </Button>
              <Button variant="hero" size="sm" className="flex-1" asChild>
                <Link href="#" onClick={() => setOpen(false)}>Empieza gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
