'use client'

import { useState, useMemo } from "react";

import Link from "next/link";

import { Bot, ShoppingCart, CheckCircle, Search, X } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

export interface GptProducto {
  id: string
  titulo: string
  slug: string
  descripcion?: string | null
  miniatura?: string | null
  precio: number
  precio_falso?: number | null
  moneda: string
  es_gratis: boolean
  categoria?: string | null
  yaAdquirido: boolean
}

interface Props {
  productos: GptProducto[]
}

const Marketplace = ({ productos }: Props) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(productos.map(p => p.categoria).filter(Boolean))) as string[]

    
return ["Todas", ...cats]
  }, [productos])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    
return productos.filter((g) => {
      const matchCat = activeCategory === "Todas" || g.categoria === activeCategory;
      const matchSearch = !q || g.titulo.toLowerCase().includes(q) || (g.descripcion || "").toLowerCase().includes(q) || (g.categoria || "").toLowerCase().includes(q);

      
return matchCat && matchSearch;
    });
  }, [search, activeCategory, productos]);

  return (
    <>
      <PageHeader
        eyebrow="Marketplace de Productos IA"
        title={<>GPTs <span className="text-gradient-primary">profesionales</span> listos para usar</>}
        subtitle="Asistentes IA pre-entrenados por expertos. Acceso permanente. Resultados inmediatos."
      />

      <section className="container pb-4">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar GPT por nombre, categoría o descripción..."
            className="w-full rounded-xl border border-white/10 bg-card/60 backdrop-blur-sm py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                  : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container py-4 pb-12">
        {productos.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bot className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-semibold text-lg mb-1">Próximamente</p>
            <p className="text-sm">Los GPTs profesionales estarán disponibles muy pronto.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bot className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No se encontraron GPTs con ese criterio.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("Todas"); }} className="mt-3 text-xs text-primary hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((g) => (
              <Card key={g.id} className="flex flex-col p-0 overflow-hidden bg-card/50 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group">
                {/* Miniatura */}
                <Link href={`/marketplace/${g.slug}`} className="block">
                  {g.miniatura ? (
                    <div className="h-36 overflow-hidden">
                      <img src={g.miniatura} alt={g.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-36 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Bot className="h-12 w-12 text-primary/60" />
                    </div>
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  {g.categoria && (
                    <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{g.categoria}</div>
                  )}
                  <Link href={`/marketplace/${g.slug}`}>
                    <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors leading-snug">{g.titulo}</h3>
                  </Link>
                  {g.descripcion && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{g.descripcion}</p>
                  )}

                  {/* Precio */}
                  <div className="flex items-center gap-2 mb-4">
                    {g.es_gratis ? (
                      <span className="text-sm font-bold text-green-400">GRATIS</span>
                    ) : (
                      <>
                        <span className="font-bold text-primary">{g.moneda} {g.precio.toFixed(2)}</span>
                        {g.precio_falso && g.precio_falso > g.precio && (
                          <span className="text-xs text-muted-foreground line-through">{g.moneda} {g.precio_falso.toFixed(2)}</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Botón */}
                  {g.yaAdquirido ? (
                    <Button size="sm" className="w-full text-white bg-green-600 hover:bg-green-700 border-green-600" variant="outline" asChild>
                      <Link href={`/marketplace/${g.slug}`}>
                        <CheckCircle className="h-3.5 w-3.5" /> Ya adquirido
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" className="w-full text-white" asChild>
                      <Link href={`/marketplace/${g.slug}`}>
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {g.es_gratis ? "Obtener gratis" : "Comprar"}
                      </Link>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {filtered.length > 0 && productos.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-8">
            {filtered.length} de {productos.length} GPTs
          </p>
        )}
      </section>
    </>
  );
};

export default Marketplace;
