"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

const items = [
  {
    title: "Cursos Especializados Cortos",
    subtitle: "¿Quieres empezar a vender, pero no sabes por dónde comenzar?",
    desc: "Aprende paso a paso recetas rentables y técnicas profesionales en cursos intensivos diseñados para que puedas emprender, vender y recuperar tu inversión rápidamente.",
    to: "/cursos",
    image: "/assets/CLASESPRESENCIALES/image.webp"
  },
  {
    title: "Formación en Emprendimiento",
    subtitle: "¿Sabes cocinar, pero no sabes cómo convertirlo en negocio?",
    desc: "No solo aprenderás a cocinar. También descubrirás cómo costear correctamente, diferenciar tu negocio y atraer clientes usando redes sociales y estrategias reales de venta.",
    to: "/cursos",
    image: "/assets/CLASESPRESENCIALES/image2.webp"
  },
  {
    title: "Recetarios Profesionales",
    subtitle: "¿Tus recetas no siempre te salen igual o pierdes dinero en insumos?",
    desc: "Accede a fichas técnicas detalladas con medidas exactas, procesos claros y recetas probadas para lograr productos consistentes, profesionales y listos para vender.",
    to: "/cursos",
    image: "/assets/CLASESPRESENCIALES/image3.webp"
  },
  {
    title: "Clases Grabadas 24/7",
    subtitle: "¿Tienes poco tiempo o necesitas repetir las clases para aprender mejor?",
    desc: "Accede a grabaciones y tutoriales prácticos para avanzar a tu ritmo y reforzar cada técnica cuando lo necesites.",
    to: "/cursos",
    image: "/assets/CLASESPRESENCIALES/image4.webp"
  },
  {
    title: "Comunidad y Acompañamiento",
    subtitle: "¿Te preocupa sentirte solo después de terminar el curso?",
    desc: "Forma parte de una comunidad privada con soporte, seguimiento y networking para seguir creciendo junto a otros emprendedores.",
    to: "/cursos",
    image: "/assets/CLASESPRESENCIALES/image5.webp"
  },
  {
    title: "Consultoría Gastronómica",
    subtitle: "¿Sientes que tu negocio vende, pero no genera ganancias?",
    desc: "Te ayudamos de forma personalizada a detectar errores, optimizar procesos y mejorar costos para hacer tu emprendimiento más rentable.",
    to: "/contacto",
    image: "/assets/CLASESPRESENCIALES/image6.webp"
  },
];

export function Services() {
  return (
    <section id="cursos" className="py-24 relative overflow-hidden bg-black lg:bg-transparent">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#5A9020] lg:bg-[#F7FBF0] blur-[150px] lg:blur-[120px] -z-10 opacity-20 lg:opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#A8E060] lg:bg-[#EAF7D0] blur-[120px] lg:blur-[100px] -z-10 opacity-10 lg:opacity-40" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mx-auto max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 lg:bg-[#EAF7D0] border border-white/10 lg:border-[#A8E060]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E060] lg:bg-[#5A9020]" />
            <p
              className="text-[11px] font-bold uppercase tracking-[2px] text-[#A8E060] lg:text-[#2D5010]"
            >
              Nuestros Servicios
            </p>
          </div>
          <h2
            className="font-display font-bold text-white lg:text-[#1A3A0A]"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1 }}
          >
            Todo lo que necesitas para
            <br />
            <span className="text-[#A8E060] lg:text-[#5A9020]">emprender desde la cocina</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl text-[#95B573] lg:text-[#4A7018]"
            style={{ fontSize: "18px", lineHeight: 1.7 }}
          >
            6 pilares estratégicos diseñados para que aprendas rápido, apliques de inmediato
            y generes ingresos reales con tu talento.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map(({ title, subtitle, desc, to, image }, i) => (
            <article
              key={title}
              className="reveal group relative overflow-hidden rounded-[32px] h-[360px] lg:h-[420px] transition-all duration-500 shadow-md hover:shadow-2xl"
              style={{
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A04] via-[#0A1A04]/40 to-transparent transition-colors duration-500 group-hover:from-[#0A1A04]/90 group-hover:via-[#0A1A04]/80 group-hover:to-[#0A1A04]/60" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Title is always visible */}
                <h3 className="font-display font-bold text-white text-[24px] leading-tight mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {title}
                </h3>
                
                {/* Expandable Content using max-height */}
                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[250px] group-hover:opacity-100 group-hover:mt-2">
                  <div className="flex flex-col gap-3 pb-2 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <h4 className="font-bold text-[#A8E060] text-[15px] leading-snug">
                      {subtitle}
                    </h4>
                    <p className="text-white/80 text-[14px] leading-relaxed">
                      {desc}
                    </p>
                    
                    <Link href={to} className="cursor-pointer inline-flex items-center justify-center gap-2 font-bold text-white bg-[#5A9020] hover:bg-[#A8E060] hover:text-[#0A1A04] text-[13px] uppercase tracking-wider px-6 py-2.5 rounded-full mt-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full group/link">
                      Saber más
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
