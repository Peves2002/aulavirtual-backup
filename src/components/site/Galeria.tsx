import { useState } from "react";
import { Image } from "lucide-react";

// Vite glob import to dynamically load all webp images
const courseModules = import.meta.glob<{ default: string }>("../../assets/CursodeGestionrestaurantes/*.webp", { eager: true });
const photoModules = import.meta.glob<{ default: string }>("../../assets/FOTOGRAFiASDECLASES/*.webp", { eager: true });
const presencialModules = import.meta.glob<{ default: string }>("../../assets/CLASESPRESENCIALES/*.webp", { eager: true });

const categories = [
  {
    id: "presenciales",
    title: "Clases Presenciales",
    desc: "Aprende 100% práctico en nuestras modernas instalaciones.",
    images: Object.values(presencialModules).map((m) => m.default),
  },
  {
    id: "platos",
    title: "Nuestros Platos & Clases",
    desc: "Conoce los resultados que lograrás con nuestras recetas exactas.",
    images: Object.values(photoModules).map((m) => m.default),
  },
  {
    id: "gestion",
    title: "Gestión de Restaurantes",
    desc: "Estrategia, costos y administración para tu negocio.",
    images: Object.values(courseModules).map((m) => m.default),
  },
];

export function Galeria() {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Categories / Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 reveal">
          {categories.map((c) => {
            const isActive = activeTab === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className="px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2"
                style={{
                  background: isActive ? "#A8E060" : "#F7FBF0",
                  color: isActive ? "#0A1A04" : "#4A7018",
                  border: isActive ? "2px solid #A8E060" : "2px solid #C8E890",
                  transform: isActive ? "translateY(-2px)" : "none",
                  boxShadow: isActive ? "0 8px 24px rgba(168,224,96,0.25)" : "none",
                }}
              >
                <Image size={18} />
                {c.title}
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#1A3A0A] mb-4">
            {activeCategory.title}
          </h2>
          <p className="text-[#4A7018] text-lg">
            {activeCategory.desc}
          </p>
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {activeCategory.images.map((src, i) => (
            <div 
              key={`${activeTab}-${i}`} 
              className="break-inside-avoid rounded-2xl overflow-hidden group relative animate-fade-up"
              style={{ animationDelay: `${(i % 10) * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <img 
                src={src} 
                alt={`${activeCategory.title} ${i + 1}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                style={{ background: "linear-gradient(to top, rgba(10,26,4,0.8) 0%, transparent 50%)" }}
              >
                <p className="text-white font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Incuba Cocina
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
