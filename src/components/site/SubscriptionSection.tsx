"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { CheckCircle2, MessageCircle, Star } from "lucide-react";

import { useAuthModal } from "@/contexts/AuthModalContext";
import type { PlanPublico } from "@/features/estudiante/suscripciones/entity/Suscripcion";
import { INTERVALO_LABELS } from "@/features/estudiante/suscripciones/entity/Suscripcion";

export function SubscriptionSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const { openLogin } = useAuthModal();
  
  const [planes, setPlanes] = useState<PlanPublico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/planes-suscripcion")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");

        return res.json();
      })
      .then((data) => {
        setPlanes(data?.result?.planes ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading plans:", err);
        setLoading(false);
      });
  }, []);

  const handleSuscribirse = (plan: PlanPublico) => {
    if (!session?.user) {
      openLogin(`/suscripciones/checkout/${plan.id}`);

      return;
    }

    router.push(`/suscripciones/checkout/${plan.id}`);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#5A9020] blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#A8E060] blur-[120px] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7D0] text-[#2D5010] text-[11px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A9020] animate-pulse"></span>
            Acceso Premium Total
          </div>

          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1A3A0A] mb-6 leading-[1.15]">
            Eleva tu negocio al <span className="text-[#5A9020]">siguiente nivel</span>
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            La suscripción Premium te da las herramientas definitivas para emprender con éxito. Olvídate de buscar recetas al azar y obtén una formación completa, probada y lista para aplicar.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-[#F7FBF0]/60 border border-gray-100 rounded-[32px] p-8 h-[400px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-12 bg-gray-200 rounded w-2/3 mt-6"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : planes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {planes.map((plan) => {
              const esTrimestral = plan.intervalo === "TRIMESTRAL";
              const esPopular = esTrimestral;
              const beneficios: string[] = Array.isArray(plan.beneficios) ? plan.beneficios : [];

              return (
                <div
                  key={plan.id}
                  className="relative flex flex-col justify-between bg-white border border-[#A8E060]/30 rounded-[32px] p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                >

                  <div>
                    <div className="text-sm font-bold text-[#5A9020] uppercase tracking-[0.15em] mb-2">
                      {INTERVALO_LABELS[plan.intervalo]}
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl text-[#1A3A0A] mb-3">
                      {plan.nombre}
                    </h3>

                    {plan.descripcion && (
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        {plan.descripcion}
                      </p>
                    )}

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-2xl font-bold text-[#1A3A0A]">S/</span>
                      <span className="text-5xl font-display font-black text-[#1A3A0A] tracking-tight">
                        {Number(plan.precio).toFixed(0)}
                      </span>
                      <span className="text-sm font-bold text-gray-400">
                        /{INTERVALO_LABELS[plan.intervalo]?.toLowerCase()}
                      </span>
                    </div>

                    <div className="h-px w-full bg-gray-100 mb-6"></div>

                    <ul className="space-y-3 mb-8">
                      {beneficios.map((beneficio, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#5A9020] mt-0.5 flex-shrink-0" />
                          <span className="text-[#1A3A0A] text-[14px] leading-snug">{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSuscribirse(plan)}
                    className="cursor-pointer w-full font-bold text-[15px] rounded-full py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center bg-[#0A1A04] text-white hover:bg-black"
                  >
                    Suscribirse ahora
                  </button>
                </div>
              );
            })}
          </div>
        ) : (

          /* Fallback a WhatsApp si no hay planes creados */
          <div className="w-full max-w-md mx-auto reveal" style={{ transitionDelay: "200ms" }}>
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
        )}

        {/* Footer WhatsApp Callout */}
        <div className="mt-16 text-center reveal">
          <p className="text-sm text-gray-500 font-medium mb-2">
            ¿Prefieres pagar por transferencia bancaria o tienes dudas personalizadas?
          </p>
          <a
            href="https://wa.me/51953822677"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-[15px] text-[#5A9020] hover:text-[#4A7018] transition-colors"
          >
            <MessageCircle size={18} />
            Hablemos por WhatsApp para ayudarte
          </a>
        </div>

      </div>
    </section>
  );
}
