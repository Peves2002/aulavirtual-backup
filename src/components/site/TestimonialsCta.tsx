"use client";

import Link from "next/link";

import { Star } from "lucide-react";

const testimonialImg = "/assets/CLASESPRESENCIALES/image6.webp";

export function TestimonialsCta() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0A1A04" }}>
      {/* Background decorations */}
      <div 
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" 
        style={{ background: "#A8E060" }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Image */}
        <div className="reveal relative order-2 lg:order-1">
          <div 
            className="absolute -inset-4 rounded-[40px] border-2 border-[#A8E060]/30 -rotate-2"
            aria-hidden="true"
          />
          <div 
            className="absolute -inset-4 rounded-[40px] border-2 border-[#A8E060]/10 rotate-3"
            aria-hidden="true"
          />
          <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px] shadow-2xl">
            <img 
              src={testimonialImg} 
              alt="Clases presenciales en Incuba Cocina"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A04] via-transparent to-transparent opacity-60" />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5">
              <p className="text-white font-display text-xl italic mb-1">
                &quot;Mi meta era independizarme y lo logré&quot;
              </p>
              <p className="text-[#A8E060] text-sm font-semibold tracking-wider">
                CASO REAL #142
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Text & CTA */}
        <div className="reveal order-1 lg:order-2">
          <div className="flex gap-1.5 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} fill="#A8E060" color="#A8E060" />
            ))}
          </div>
          
          <blockquote className="font-display italic text-2xl lg:text-3xl leading-tight text-white mb-8 border-l-4 border-[#A8E060] pl-6">
            &quot;Gracias a Incuba Cocina pude costear mis recetas correctamente. Hoy tengo mi propio delivery de makis y es un éxito total en mi distrito.&quot;
          </blockquote>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-[#1A3A0A] border-2 border-[#A8E060] flex items-center justify-center text-[#A8E060] font-bold text-lg">
              M
            </div>
            <div>
              <p className="font-bold text-[#A8E060] text-base tracking-wide">María Fernanda</p>
              <p className="text-[#95B573] text-sm">Alumna de Maki Sushi Profesional</p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10">
            <h3 className="font-display font-bold text-3xl lg:text-4xl text-white mb-6 leading-tight">
              ¿Listo para ser nuestro próximo <span style={{ color: "#A8E060" }}>caso de éxito</span>?
            </h3>
            <p className="text-[#95B573] mb-10 text-lg leading-relaxed max-w-xl">
              Únete a nuestra comunidad de más de 500 alumnos que ya están generando ingresos desde su cocina. No necesitas experiencia previa, solo las ganas de emprender.
            </p>
            <Link href="/cursos"
              className="inline-flex items-center justify-center font-bold rounded-full px-10 py-4 transition-all duration-300 shadow-[0_8px_24px_rgba(168,224,96,0.25)] hover:shadow-[0_12px_32px_rgba(168,224,96,0.4)]"
              style={{ background: "#A8E060", color: "#0A1A04", fontSize: "16px" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Ver Cursos Disponibles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

