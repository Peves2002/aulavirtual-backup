"use client";
import { useState } from "react";

import Link from "next/link";

import { Clock, Users, ArrowRight } from "lucide-react";





export function Catalog({ courses = [], categories = [] }: { courses?: any[], categories?: any[] }) {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos" ? courses : courses.filter((c) => c.category === active);

  return (
    <section id="catalogo" className="py-24" style={{ background: "#F7FBF0" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p
            className="text-[11px] font-semibold mb-4"
            style={{ color: "#5A9020", letterSpacing: "3px" }}
          >
            CATÁLOGO DE CURSOS
          </p>
          <h2
            className="font-display font-bold"
            style={{ color: "#1A3A0A", fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.15 }}
          >
            Elige tu especialidad
          </h2>
          <p className="mt-4" style={{ color: "#4A7018", fontSize: "16px", lineHeight: 1.7 }}>
            Cursos intensivos de 2 a 4 días. Aprendes, practicas y empiezas a vender.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 lg:justify-center scrollbar-none">
          {categories.map((c) => {
            const isActive = c === active;

            
return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="whitespace-nowrap rounded-full px-5 py-2 text-[13px] transition-colors"
                style={{
                  background: isActive ? "#A8E060" : "#FFFFFF",
                  border: isActive ? "1px solid #A8E060" : "1px solid #C8E890",
                  color: isActive ? "#1A3A0A" : "#4A7018",
                  fontWeight: isActive ? 700 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#EAF7D0";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#FFFFFF";
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((c, i) => (
            <article
              key={c.title}
              className="reveal overflow-hidden rounded-[20px] transition-all duration-300"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #C8E890",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#A8E060";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(168,224,96,0.18)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#C8E890";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div className="relative h-[200px]" style={{ background: "#F0F5E8" }}>
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16"
                  style={{ background: "linear-gradient(to top, #EAF7D0, transparent)" }}
                />
                <span
                  className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold"
                  style={{ background: "#A8E060", color: "#1A3A0A" }}
                >
                  {c.duration.toUpperCase()}
                </span>
                <span
                  className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-semibold"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #5A9020",
                    color: "#5A9020",
                  }}
                >
                  {c.level}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold" style={{ color: "#1A3A0A", fontSize: "19px" }}>
                  {c.title}
                </h3>
                <p
                  className="mt-2 line-clamp-2"
                  style={{ color: "#4A7018", fontSize: "13px", lineHeight: 1.6 }}
                >
                  {c.desc}
                </p>
                <div
                  className="mt-3 flex items-center gap-4"
                  style={{ color: "#7AAA40", fontSize: "12px" }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {c.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={12} /> Grupos reducidos
                  </span>
                </div>
                <div className="my-4 h-px" style={{ background: "#EAF7D0" }} />
                <div className="flex items-baseline gap-2">
                  <span className="line-through" style={{ color: "#7AAA40", fontSize: "13px" }}>
                    S/. {c.oldPrice}
                  </span>
                  <span className="font-bold font-display" style={{ color: "#2D5010", fontSize: "22px" }}>
                    S/. {c.price}
                  </span>
                </div>
                <Link href={`/cursos/${c.slug}`}
                  className="mt-4 w-full flex items-center justify-center rounded-full py-3 font-semibold text-[14px] transition-colors"
                  style={{
                    border: "1.5px solid #2D5010",
                    color: "#2D5010",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2D5010";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#2D5010";
                  }}
                >
                  Ver Detalles
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-colors"
            style={{ border: "2px solid #2D5010", color: "#2D5010", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EAF7D0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Ver todos los cursos disponibles <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

