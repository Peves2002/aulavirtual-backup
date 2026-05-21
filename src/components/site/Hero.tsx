"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden w-full -mt-[5rem] min-h-[100vh] lg:min-h-0 flex items-center"
    >
      {/* Desktop: Image dictates height. Mobile: absolute image */}
      <img 
        src="/assets/hero.png" 
        alt="Hero Background" 
        className="hidden lg:block w-full h-auto"
      />
      <img 
        src="/assets/hero.png" 
        alt="Hero Background" 
        className="lg:hidden absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* CONTENT (Absolute over image) */}
      <div className="absolute inset-0 z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center pt-[5rem]">
        <div className="max-w-xl animate-fade-up">
          <h1 className="font-display font-bold leading-[1.15] mb-6 lg:mb-8 text-white"
              style={{ fontSize: "clamp(28px, 4.5vw, 48px)", textShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
            Aprende a Cocinar. <br/>
            <span style={{ color: "#A8E060" }}>Deja de improvisar y empieza a ganar dinero.</span>
          </h1>

          <p className="text-white/90 text-sm lg:text-lg leading-snug lg:leading-relaxed mb-4 lg:mb-6"
             style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            Cursos intensivos de 2 a 4 días para personas que quieren emprender de verdad, vender más y convertir su pasión por la cocina en ingresos reales.
          </p>
          
          <p className="text-white/90 font-medium text-sm lg:text-base leading-snug lg:leading-relaxed mb-8 lg:mb-10"
             style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            Sin recetas complicadas. Sin teoría que no sirve. Aprende paso a paso cómo cocinar, producir y vender.
          </p>
          
          <p className="font-display italic text-[#A8E060] text-base lg:text-xl opacity-90 leading-snug lg:leading-normal"
             style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            Tu talento puede darte ingresos. Solo necesitas la guía correcta.
          </p>

          <div className="mt-8 lg:mt-12">
            <Link href="/cursos"
              className="inline-flex items-center gap-2 font-bold text-[16px] rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              style={{ 
                background: "linear-gradient(135deg, #A8E060 0%, #5A9020 100%)", 
                color: "#1A3A0A" 
              }}
            >
              Quiero Aprender
              <ArrowRight size={20} className="text-[#1A3A0A]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
