"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import { ArrowRight, Play, X, ChefHat, Coins, BookOpen, Users } from "lucide-react";

const mobileImages = ["/assets/mobil/1.png", "/assets/mobil/2.png"];

export function Hero() {
  const [showSubscription, setShowSubscription] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section
        id="inicio"
        className="relative overflow-hidden w-full -mt-[5rem] min-h-[100vh] flex flex-col lg:flex-row lg:items-center bg-black lg:bg-transparent"
      >
        {/* Desktop: Image dictates height */}
        <img 
          src="/assets/hero.png" 
          alt="Hero Background" 
          className="hidden lg:block w-full h-auto"
        />

        {/* Mobile Carousel Image Container */}
        <div className="lg:hidden relative w-full bg-black">
          <div className="relative w-full">
            {mobileImages.map((src, idx) => (
              <img 
                key={src}
                src={src} 
                alt={`Hero Mobile ${idx + 1}`} 
                className={`w-full h-auto object-contain transition-opacity duration-1000 ${
                  idx === 0 ? "relative" : "absolute top-0 left-0"
                } ${
                  idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
            {/* Smooth gradient fade to black at the bottom to blend with content */}
            <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
            {/* Subtle gradient at top to ensure navbar visibility */}
            <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
          </div>
        </div>

        {/* Floating Video Button (Desktop Only) */}
        <div className="hidden lg:block absolute top-[7rem] right-10 z-30 animate-fade-up origin-top-right">
          <div className="relative flex items-center justify-center">
            {/* Ping effect (eco vibrante) */}
            <div className="absolute inset-0 rounded-full bg-[#A8E060] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }}></div>
            <div className="absolute inset-0 rounded-full bg-[#5A9020] opacity-20 animate-pulse"></div>
            
            <button 
              onClick={() => setShowVideo(true)}
              className="relative inline-flex items-center gap-2 font-bold text-[13px] uppercase tracking-wider rounded-full px-5 py-2.5 transition-all duration-300 bg-[#0A1A04]/60 backdrop-blur-md border border-[#A8E060]/50 hover:bg-[#0A1A04]/80 text-white shadow-[0_0_15px_rgba(168,224,96,0.2)]"
            >
              <Play size={16} className="text-[#A8E060]" fill="currentColor" />
              <span>Ver más</span>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative lg:absolute lg:inset-0 z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center flex-1 py-8 lg:py-0 bg-transparent -mt-[6rem] lg:mt-0 pt-0 lg:pt-[5rem]">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="font-display font-bold leading-[1.05] lg:leading-[1.15] mb-1 lg:mb-2 text-white lg:text-[#1A3A0A]"
                style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
              Aprende a <br className="hidden lg:block"/>
              <span style={{ color: "#5A9020" }}>Cocinar</span>
            </h1>

            <p className="text-white lg:text-[#1A3A0A] font-bold whitespace-nowrap leading-snug lg:leading-relaxed mb-8 lg:mb-12"
               style={{ fontSize: "clamp(13px, 3.5vw, 28px)" }}>
              Deja de improvisar y <span style={{ color: "#5A9020" }}>empieza a ganar dinero.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => setShowSubscription(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-[14px] rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ 
                  background: "linear-gradient(135deg, #5A9020 0%, #3A6010 100%)", 
                  color: "#FFFFFF" 
                }}
              >
                SUSCRIBIRSE AHORA
                <ArrowRight size={18} className="text-[#A8E060]" />
              </button>

              <Link 
                href="/cursos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-[14px] rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 lg:bg-transparent bg-black"
                style={{ 
                  border: "2px solid #5A9020"
                }}
              >
                <span className="text-[#5A9020] lg:text-[#1A3A0A]">VER CURSOS</span>
                <ArrowRight size={18} className="text-[#5A9020]" />
              </Link>
            </div>

            {/* Social Proof Desktop Only */}
            <div className="hidden lg:flex mt-8 lg:mt-10 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl sm:rounded-full p-4 sm:pr-8 flex-col sm:flex-row items-center gap-4 sm:gap-6 w-fit mx-auto sm:mx-0">
              <div className="flex -space-x-3">
                {[11, 32, 12, 44, 15].map((id) => (
                  <img 
                    key={id}
                    src={`https://i.pravatar.cc/100?img=${id}`} 
                    alt="Emprendedor" 
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-[#5A9020] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[#1A3A0A] font-bold text-[15px] leading-tight mt-1">
                  +500 emprendedores
                </p>
                <p className="text-gray-600 text-[13px]">
                  ya están transformando su negocio
                </p>
              </div>
            </div>

            {/* Icons Mobile Only */}
            <div className="flex lg:hidden justify-between mt-12 w-full max-w-[320px] mx-auto opacity-90">
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border border-[#5A9020] flex items-center justify-center mb-2">
                  <ChefHat size={22} className="text-[#5A9020]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] text-white/90 font-bold text-center leading-tight">CURSOS<br/>100% PRÁCTICOS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border border-[#5A9020] flex items-center justify-center mb-2">
                  <Coins size={22} className="text-[#5A9020]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] text-white/90 font-bold text-center leading-tight">NEGOCIOS<br/>RENTABLES</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border border-[#5A9020] flex items-center justify-center mb-2">
                  <BookOpen size={22} className="text-[#5A9020]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] text-white/90 font-bold text-center leading-tight">RECETAS<br/>PROBADAS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border border-[#5A9020] flex items-center justify-center mb-2">
                  <Users size={22} className="text-[#5A9020]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] text-white/90 font-bold text-center leading-tight">MENTORÍA<br/>PERSONALIZADA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Modal */}
      {showSubscription && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSubscription(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-fade-up">
            <button 
              onClick={() => setShowSubscription(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="font-display font-bold text-3xl text-[#1A3A0A] mb-2">Suscripción Premium</h2>
            <p className="text-gray-600 mb-6">Accede a todo nuestro contenido exclusivo.</p>
            
            <div className="bg-[#F7FBF0] border border-[#A8E060] rounded-2xl p-6 mb-6 text-center">
              <div className="text-sm font-bold text-[#5A9020] uppercase tracking-wider mb-2">Pago Único</div>
              <div className="flex items-start justify-center gap-1">
                <span className="text-2xl font-bold text-[#1A3A0A] mt-1">S/</span>
                <span className="text-6xl font-display font-bold text-[#1A3A0A]">99</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Acceso al curso mensualmente",
                "Clases en vivo",
                "Clases grabadas",
                "Materiales descargables"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EAF7D0] flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={14} className="text-[#5A9020]" />
                  </div>
                  <span className="text-[#1A3A0A] font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <a href="https://wa.me/51953822677" target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center w-full font-bold text-[16px] rounded-full py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
               style={{ background: "#5A9020", color: "#FFFFFF" }}>
              Adquirir Suscripción
            </a>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowVideo(false)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-fade-up">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/fsOnC1Rt4D8?autoplay=1&rel=0" 
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
