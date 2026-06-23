'use client'

import { useEffect, useRef, useState } from "react";

import { useInView } from "framer-motion";

const stats = [
  { value: 500,  suffix: "+",  label: "Alumnos Certificados" },
  { value: 12,   suffix: "",   label: "Módulos de Aprendizaje" },
  { value: 4.9,  suffix: "/5", label: "Calificación Promedio", decimal: true },
  { value: 100,  suffix: "%",  label: "Garantía de Satisfacción" },
];

const Counter = ({ end, decimal }: { end: number; decimal?: boolean }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);

      setVal(end * eased);
      if (t < 1) requestAnimationFrame(tick);
    };


    requestAnimationFrame(tick);
  }, [inView, end]);

  return <span ref={ref}>{decimal ? val.toFixed(1) : Math.floor(val)}</span>;
};

export const StatsBar = () => (
  <section className="bg-gc-gray-dark py-16">
    <div className="gc-container-custom grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y divide-white/5 lg:divide-y-0 lg:divide-x lg:divide-white/10">
      {stats.map((s, i) => (
        <div key={i} className="pt-8 lg:pt-0 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl font-gc-display font-black text-white mb-2">
            <Counter end={s.value} decimal={s.decimal} />{s.suffix}
          </div>
          <div className="text-white font-semibold tracking-wide uppercase text-xs sm:text-sm">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);
