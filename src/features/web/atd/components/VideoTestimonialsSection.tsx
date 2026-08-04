'use client'

import { useEffect, useRef, useState } from "react";

import { Play } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Abogada",
    location: "Lima, Perú",
    quote: "Reduje en 70% el tiempo de redacción de demandas.",
  },
  {
    name: "Carlos Ramírez",
    role: "Docente",
    location: "Bogotá, Colombia",
    quote: "MentorIA transformó mi forma de enseñar por completo.",
  },
  {
    name: "Ana Torres",
    role: "Emprendedora",
    location: "Ciudad de México",
    quote: "En 30 días lancé mi negocio con IA. Increíble.",
  },
];

export default function VideoTestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    
return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="container py-12">
      <div
        className="text-center mb-8 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">Testimonios</p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">
          Lo que dicen nuestros <span className="text-gradient-primary">alumnos</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
          Historias reales de profesionales que transformaron su carrera con ATD Academy.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="transition-all duration-700 group/card"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: `${200 + i * 120}ms`,
            }}
          >
            {/* Video placeholder */}
            <div
              className="relative w-full rounded-xl border border-white/10 overflow-hidden group mb-3 transition-all duration-300 ease-out group-hover/card:-translate-y-1 group-hover/card:shadow-lg group-hover/card:shadow-primary/10 group-hover/card:border-white/20"
              style={{ height: "min(38vh, 300px)", background: "rgba(255,255,255,0.04)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/80 group-hover:border-primary transition-all duration-300">
                  <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Próximamente badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[9px] font-semibold uppercase tracking-widest bg-black/50 border border-white/10 text-white/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Próximamente
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="px-1">
              <p className="text-xs text-muted-foreground italic mb-2">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
