"use client";

import Link from "next/link";

import {
  ChefHat,
  Coins,
  BookOpen,
  Monitor,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    Icon: ChefHat,
    title: "1. Cursos Especializados Cortos",
    desc: "¿Quieres empezar a vender, pero no sabes por dónde comenzar? Aprende paso a paso recetas rentables y técnicas profesionales en cursos intensivos diseñados para que puedas emprender, vender y recuperar tu inversión rápidamente.",
    to: "/cursos",
  },
  {
    Icon: Coins,
    title: "2. Formación en Emprendimiento",
    desc: "¿Sabes cocinar, pero no sabes cómo convertirlo en negocio? No solo aprenderás a cocinar. También descubrirás cómo costear correctamente, diferenciar tu negocio y atraer clientes usando redes sociales y estrategias reales de venta.",
    to: "/cursos",
  },
  {
    Icon: BookOpen,
    title: "3. Recetarios Profesionales",
    desc: "¿Tus recetas no siempre te salen igual o pierdes dinero en insumos? Accede a fichas técnicas detalladas con medidas exactas, procesos claros y recetas probadas para lograr productos consistentes, profesionales y listos para vender.",
    to: "/cursos",
  },
  {
    Icon: Monitor,
    title: "4. Clases Grabadas 24/7",
    desc: "¿Tienes poco tiempo o necesitas repetir las clases para aprender mejor? Accede a grabaciones y tutoriales prácticos para avanzar a tu ritmo y reforzar cada técnica cuando lo necesites.",
    to: "/cursos",
  },
  {
    Icon: Users,
    title: "5. Comunidad y Acompañamiento",
    desc: "¿Te preocupa sentirte solo después de terminar el curso? Forma parte de una comunidad privada con soporte, seguimiento y networking para seguir creciendo junto a otros emprendedores.",
    to: "/cursos",
  },
  {
    Icon: BarChart3,
    title: "6. Consultoría Gastronómica",
    desc: "¿Sientes que tu negocio vende, pero no genera ganancias? Te ayudamos de forma personalizada a detectar errores, optimizar procesos y mejorar costos para hacer tu emprendimiento más rentable.",
    to: "/contacto",
  },
];

export function Services() {
  return (
    <section id="cursos" className="py-24 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F7FBF0] blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#EAF7D0] blur-[100px] -z-10 opacity-40" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#EAF7D0] border border-[#A8E060]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A9020]" />
            <p
              className="text-[11px] font-bold uppercase tracking-[2px]"
              style={{ color: "#2D5010" }}
            >
              Nuestros Servicios
            </p>
          </div>
          <h2
            className="font-display font-bold"
            style={{ color: "#1A3A0A", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1 }}
          >
            Todo lo que necesitas para
            <br />
            <span style={{ color: "#5A9020" }}>emprender desde la cocina</span>
          </h2>
          <p
            className="mt-6 max-w-2xl"
            style={{ color: "#4A7018", fontSize: "18px", lineHeight: 1.7 }}
          >
            6 pilares estratégicos diseñados para que aprendas rápido, apliques de inmediato
            y generes ingresos reales con tu talento.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map(({ Icon, title, desc, to }, i) => (
            <article
              key={title}
              className="reveal group relative bg-white rounded-[32px] p-8 lg:p-10 transition-all duration-500 border border-[#C8E890]/40 hover:border-[#A8E060]"
              style={{
                boxShadow: "0 4px 20px rgba(45,80,16,0.02)",
                transitionDelay: `${i * 50}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(168, 224, 96, 0.12)";
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(45,80,16,0.02)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: "linear-gradient(135deg, #F7FBF0 0%, #EAF7D0 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(168, 224, 96, 0.2)"
                }}
              >
                <Icon size={30} color="#2D5010" strokeWidth={1.5} />
              </div>
              
              <h3
                className="font-display font-bold mt-8"
                style={{ color: "#1A3A0A", fontSize: "22px", letterSpacing: "-0.01em" }}
              >
                {title}
              </h3>
              
              <p
                className="mt-4"
                style={{ color: "#4A7018", fontSize: "15px", lineHeight: 1.6 }}
              >
                {desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-[#F7FBF0]">
                <Link href={to}
                  className="inline-flex items-center gap-2 font-bold group/link"
                  style={{ color: "#5A9020", fontSize: "14px" }}
                >
                  <span className="relative">
                    Saber más
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A8E060] transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F7FBF0] flex items-center justify-center transition-all duration-300 group-hover/link:bg-[#A8E060] group-hover/link:text-white">
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

