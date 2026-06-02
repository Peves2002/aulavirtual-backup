'use client'

import { useEffect, useRef, useState } from "react";
import { Users, Globe, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Alumnos capacitados",
    description: "Profesionales que ya transformaron su carrera con IA",
  },
  {
    icon: Globe,
    value: 15,
    suffix: "",
    label: "Países",
    description: "Presencia en toda Latinoamérica y España",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Satisfacción",
    description: "De nuestros alumnos recomiendan ATD Academy",
  },
];

const bars = [
  { year: "2020", value: 800,  max: 10000 },
  { year: "2021", value: 2100, max: 10000 },
  { year: "2022", value: 4300, max: 10000 },
  { year: "2023", value: 6500, max: 10000 },
  { year: "2024", value: 8700, max: 10000 },
  { year: "2025", value: 10000, max: 10000 },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ icon: Icon, value, suffix, label, description, active, delay }: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 1800, active);

  return (
    <div
      className="flex items-start gap-4 transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="text-3xl font-bold font-display">
          {count.toLocaleString("es-PE")}
          <span className="text-primary">{suffix}</span>
        </div>
        <div className="font-semibold text-sm mt-0.5">{label}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setBarsVisible(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-card/30">
      <div className="container">
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Nuestro impacto</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display max-w-2xl mx-auto leading-tight">
            Somos la academia de IA en español con{" "}
            <span className="text-gradient-primary">mayor crecimiento</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            En poco tiempo hemos construido la comunidad hispanohablante de IA más comprometida del mundo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Bar chart */}
          <div className="space-y-3">
            {bars.map((bar, i) => {
              const pct = (bar.value / bar.max) * 100;
              return (
                <div key={bar.year} className="flex items-center gap-3">
                  <span className="w-10 text-xs text-muted-foreground text-right flex-shrink-0">{bar.year}</span>
                  <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden relative">
                    <div
                      className="h-full rounded-md bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                      style={{
                        width: barsVisible ? `${pct}%` : "0%",
                        transitionDelay: `${i * 120}ms`,
                      }}
                    >
                      {barsVisible && (
                        <span className="text-[10px] font-bold text-white/90 whitespace-nowrap">
                          {bar.value.toLocaleString("es-PE")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="text-center text-xs text-primary font-semibold mt-4 tracking-wide uppercase">
              Alumnos capacitados por año
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} active={visible} delay={300 + i * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
