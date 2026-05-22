"use client";

import React from "react";

import { CheckCircle2, MessageCircle } from "lucide-react";

export function SubscriptionSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#5A9020] blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#A8E060] blur-[120px] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Content Left */}
          <div className="flex-1 max-w-2xl text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7D0] text-[#2D5010] text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A9020] animate-pulse"></span>
              Acceso Premium Total
            </div>

            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1A3A0A] mb-6 leading-[1.15]">
              Eleva tu negocio al <br className="hidden lg:block"/>
              <span className="text-[#5A9020]">siguiente nivel</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              La suscripción Premium te da las herramientas definitivas para emprender con éxito. Olvídate de buscar recetas al azar y obtén una formación completa, probada y lista para aplicar.
            </p>

            <div className="space-y-4 mb-10 text-left mx-auto max-w-md lg:mx-0">
              {[
                "Acceso ilimitado a todos los cursos y beneficios",
                "Certificados digitales de participación",
                "Recetarios completos paso a paso descargables",
                "Asesoría y soporte directo y personalizado",
                "Actualizaciones gratuitas garantizadas"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#EAF7D0] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} className="text-[#5A9020]" />
                  </div>
                  <span className="text-[#1A3A0A] font-medium text-[16px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card Right */}
          <div className="w-full max-w-md lg:w-[450px] reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative bg-gradient-to-br from-[#F7FBF0] to-white border border-[#A8E060]/40 rounded-[32px] p-8 sm:p-10 text-center shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              
              <div className="text-sm font-bold text-[#5A9020] uppercase tracking-[0.2em] mb-2">Suscripción Mensual</div>
              
              <div className="flex items-start justify-center gap-1 mb-8">
                <span className="text-3xl font-bold text-[#1A3A0A] mt-2">S/</span>
                <span className="text-7xl font-display font-black text-[#1A3A0A] tracking-tight">99</span>
                <span className="text-xl font-bold text-gray-500 mt-auto mb-2">/mes</span>
              </div>
              
              <div className="h-px w-full bg-gray-200 mb-8"></div>
              
              <p className="text-sm text-gray-500 font-medium mb-8">
                Cancela cuando quieras, sin contratos ni cobros ocultos. Transforma tu inversión en ganancias hoy mismo.
              </p>

              <a href="https://wa.me/51953822677" target="_blank" rel="noopener noreferrer"
                 className="group/btn relative flex items-center justify-center w-full font-bold text-[16px] rounded-full py-5 transition-all duration-300 shadow-[0_8px_25px_rgba(90,144,32,0.3)] hover:shadow-[0_12px_35px_rgba(90,144,32,0.4)] hover:-translate-y-1 overflow-hidden"
                 style={{ background: "linear-gradient(135deg, #5A9020 0%, #3A6010 100%)", color: "#FFFFFF" }}>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2">
                  <MessageCircle size={20} />
                  Adquirir por WhatsApp
                </span>
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-5 font-bold uppercase tracking-wider">
                Atención rápida y segura
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
