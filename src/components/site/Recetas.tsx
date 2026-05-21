"use client";

import { useMemo } from "react";
import Image from "next/image";

const rawImages = [
  "arroz-con-pato.webp",
  "bebida.webp",
  "broster.webp",
  "c-ctel-rojo-1.webp",
  "carnes.webp",
  "ceviche.webp",
  "comida-china.webp",
  "especiales.webp",
  "hamburguesa.webp",
  "hamburguesa1.webp",
  "hamburguesa2.webp",
  "parrillas.webp",
  "plato-especial.webp",
  "platos-a-la-carta-1.webp",
  "platos-a-la-carta.webp",
  "pollo-a-la-brasa.webp",
  "pollo-broaster.webp",
  "pollo.webp",
  "pye-de-manzana.webp",
  "reposteria.webp",
  "sandwich.webp",
  "tacu-tacu.webp",
  "tomahawk.webp",
  "tortas.webp"
];

function formatName(filename: string) {
  let name = filename.replace(/\.[^/.]+$/, ""); // remove extension
  
  // Replace dashes with spaces
  name = name.replace(/-/g, " ").trim();
  
  // Custom manual fixes for specific ugly filenames
  if (name === "c ctel rojo 1") name = "Cóctel Rojo";
  if (name === "hamburguesa1" || name === "hamburguesa2") name = "Hamburguesa";
  if (name === "platos a la carta 1") name = "Platos a la carta";
  
  if (!name) return "Receta Deliciosa";
  
  // Capitalize first letter of string
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function Recetas() {
  const images = useMemo(() => {
    return rawImages.map(img => ({
      src: `/assets/recetas/${img}`,
      name: formatName(img)
    }));
  }, []);

  return (
    <section className="py-20" style={{ background: "#FFFFFF" }}>
      {/* Full width container but header centered */}
      <div className="w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-5 lg:px-8 reveal">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#EAF7D0] border border-[#A8E060]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A9020]" />
            <p className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: "#2D5010" }}>
              Nuestras Recetas
            </p>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-[#1A3A0A] mb-6">
            Conoce nuestras <span className="text-[#5A9020]">Creaciones</span>
          </h2>
          <p className="text-[#4A7018] text-lg">
            Descubre los platos y técnicas que aprenderás a dominar. Resultados profesionales listos para tu negocio.
          </p>
        </div>

        {/* Grid 5 columns full width */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
          {images.map(({ src, name }, i) => (
            <div 
              key={i} 
              className="group relative aspect-square overflow-hidden bg-[#F7FBF0]"
            >
              {/* Optimized Next.js Image */}
              <Image 
                src={src} 
                alt={name} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6"
                style={{ background: "rgba(10,26,4,0.7)" }}
              >
                <h3 className="text-white font-display font-bold text-2xl text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                  {name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
