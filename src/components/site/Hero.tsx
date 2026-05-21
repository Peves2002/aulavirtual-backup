"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Check, ArrowRightCircle, Flame } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";


const mobileImages = [
  "/assets/mobil/1.png",
  "/assets/mobil/2.png"
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3500);

      
return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden min-h-screen flex flex-col lg:flex-row lg:items-center bg-white pt-0 lg:pt-[100px]"
    >
      {/* MOBILE IMAGE CAROUSEL (Appears first on small screens) */}
      <div className="block lg:hidden w-full h-[80vh] min-h-[550px] animate-fade-up relative">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex w-full h-full">
            {mobileImages.map((src, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img 
                  src={src} 
                  alt={`Hero Mobile ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                {/* Stronger gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A04]/90 via-[#0A1A04]/30 to-[#0A1A04]/10" />
              </div>
            ))}
          </div>
        </div>
          
        {/* Mobile Heading */}
        <div className="absolute bottom-10 left-5 right-5 z-10 flex flex-col items-center justify-end">
          <h1 className="font-display font-bold leading-[1.1] text-center"
              style={{ color: "#FFFFFF", fontSize: "clamp(26px, 7vw, 40px)", textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
            Domina la Cocina, <br/><span style={{ color: "#A8E060" }}>deja de improvisar y comienza a facturar.</span>
          </h1>
        </div>
      </div>

      {/* LEFT CONTENT COLUMN */}
      <div className="relative z-30 w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-20 lg:pr-12 pb-20 pt-8 lg:py-0">
        <div className="max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="hidden lg:block font-display font-bold leading-[1.15] mb-8"
              style={{ color: "#1A3A0A", fontSize: "clamp(36px, 5vw, 56px)" }}>
            Domina la Cocina, <span style={{ color: "#5A9020" }}>deja de improvisar y comienza a facturar.</span>
          </h1>

          <p className="text-[#4A7018] text-base lg:text-xl leading-snug lg:leading-relaxed mb-4 lg:mb-6">
            Cursos intensivos y 100% prácticos de 2 a 4 días, diseñados especialmente para futuros empresarios gastronómicos que buscan optimizar su producción, escalar sus ventas y transformar su pasión en un negocio altamente rentable.
          </p>
          
          <p className="text-[#4A7018] font-medium text-sm lg:text-lg leading-snug lg:leading-relaxed mb-8 lg:mb-12">
            Sin metodologías confusas ni teoría de relleno. Aprende bajo nuestro método paso a paso: desde las técnicas de cocina y estandarización, hasta la estrategia de costos y venta directa.
          </p>

          <Link href="/cursos"
            className="flex lg:inline-flex items-center justify-center gap-2 lg:gap-3 font-bold rounded-full transition-all duration-300 group shadow-xl hover:shadow-[#A8E060]/30 w-full sm:w-auto py-4 px-8 text-[#0A1A04] lg:text-white"
            style={{ 
              background: "#A8E060", 
            }}
          >
            <span className="block lg:hidden text-[18px]">Quiero Aprender</span>
            <span className="hidden lg:block text-[16px]">Explorar Programas de Emprendimiento</span>
            <ArrowRightCircle size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="font-display italic mt-8 lg:mt-12 text-[#A8E060] text-lg lg:text-2xl opacity-80 leading-snug lg:leading-normal">
            Tu talento culinario puede generar grandes ingresos. Solo necesitas el método y la mentoría correcta.
          </p>
        </div>
      </div>

      {/* RIGHT VIDEO CONTAINER COLUMN */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 left-[28%] z-10 bg-[#0A1A04] overflow-hidden">
        {/* FULL BLEED YOUTUBE VIDEO EMBED */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto aspect-video">
            <iframe
              src="https://www.youtube.com/embed/fsOnC1Rt4D8?autoplay=1&mute=1&loop=1&playlist=fsOnC1Rt4D8&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
              title="Escuela Gastronómica de Emprendimiento"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
          {/* Ambient gradient overlays to blend the video beautifully */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/5 via-transparent to-[#0A1A04]/20 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-[#0A1A04]/10 pointer-events-none z-20" />
        </div>

        {/* PATTERN BACKGROUND */}
        <div 
          className="absolute inset-0 opacity-[0.04] z-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* FLOATING BADGE */}
        <div className="absolute bottom-10 right-8 bg-white/90 backdrop-blur-md rounded-[28px] p-6 shadow-2xl border border-white/20 max-w-[260px] z-40 animate-float">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#EAF7D0] flex items-center justify-center shadow-inner flex-shrink-0">
              <Check size={18} className="text-[#5A9020]" />
            </div>
            <span className="font-bold text-[#1A3A0A] text-base">Método Probado</span>
          </div>
          <p className="text-[#4A7018] text-[13px] leading-relaxed">
            Más de <span className="font-bold text-[#1A3A0A]">500 emprendedores</span> ya están facturando con nuestras técnicas exclusivas.
          </p>
        </div>
      </div>

      {/* WAVY DIVIDER (THE "FLAME" EDGE) - Placed outside parent to prevent overflow-hidden clipping and bring to front */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-[calc(50%-4rem)] w-48 -translate-x-1/2 z-20 pointer-events-none overflow-visible">
        <svg 
          viewBox="0 0 160 1000" 
          preserveAspectRatio="none" 
          className="h-full w-full overflow-visible"
        >
          <defs>
            {/* Premium Green Gradient for the border */}
            <linearGradient id="flame-border-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5A9020" />
              <stop offset="25%" stopColor="#A8E060" />
              <stop offset="50%" stopColor="#5A9020" />
              <stop offset="75%" stopColor="#A8E060" />
              <stop offset="100%" stopColor="#2D5010" />
            </linearGradient>
          </defs>

          {/* Left-side white mask to clip video to the wave shape */}
          <path 
            d="M -2000,0 L 110,0 C 110,120 110,220 110,300 C 110,370 95,430 20,500 C -55,570 110,630 110,700 C 110,780 110,880 110,1000 L -2000,1000 Z" 
            fill="#FFFFFF"
          />
          {/* Secondary subtle wave (parallel outline effect) */}
          <path 
            d="M 95,0 C 95,120 95,220 95,300 C 95,370 80,430 5,500 C -70,570 95,630 95,700 C 95,780 95,880 95,1000" 
            fill="none"
            stroke="#A8E060"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          {/* Main Thick Wavy Line (The "Flame" Brush) */}
          <path 
            d="M 110,0 C 110,120 110,220 110,300 C 110,370 95,430 20,500 C -55,570 110,630 110,700 C 110,780 110,880 110,1000" 
            fill="none"
            stroke="url(#flame-border-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
        </svg>
        
        {/* Flame Icon Badge — large, centered, glowing, professional */}
        <div className="absolute top-[50%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute w-24 h-24 rounded-full bg-[#A8E060]/20 animate-ping" style={{ animationDuration: '2.5s' }} />
          {/* Mid ring */}
          <div className="absolute w-20 h-20 rounded-full bg-[#5A9020]/30 animate-pulse" style={{ animationDuration: '2s' }} />
          {/* Core badge */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#A8E060] via-[#5A9020] to-[#2D5010] flex items-center justify-center shadow-[0_0_32px_rgba(168,224,96,0.6),0_8px_24px_rgba(90,144,32,0.5)] border-2 border-white/40">
            <Flame size={30} className="text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
