import { Calendar, ArrowRight } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

const blog1 = "/atd-assets/multimedia/imagenes/1-blog-recursos-educativos.png";
const blog2 = "/atd-assets/multimedia/imagenes/2-blog-recursos-educativos.png";
const blog3 = "/atd-assets/multimedia/imagenes/otros-11.png";
const blog4 = "/atd-assets/multimedia/imagenes/otros-12.png";
const blog5 = "/atd-assets/multimedia/imagenes/otros-13.png";
const blog6 = "/atd-assets/multimedia/imagenes/otros-14.png";

const posts = [
  { title: "10 prompts que todo abogado debe usar en 2026", cat: "Jurídico", date: "12 abr 2026", read: "6 min", image: blog1 },
  { title: "Cómo MentorIA me ahorra 10 horas a la semana como docente", cat: "Educación", date: "8 abr 2026", read: "5 min", image: blog2 },
  { title: "FinanzasPRO vs Excel: el cambio que multiplicó mi productividad", cat: "Finanzas", date: "1 abr 2026", read: "7 min", image: blog3 },
  { title: "Guía completa: tu primer GPT en 30 minutos", cat: "Productividad", date: "25 mar 2026", read: "10 min", image: blog4 },
  { title: "El estado de la IA en LatAm en 2026", cat: "Tendencias", date: "20 mar 2026", read: "12 min", image: blog5 },
  { title: "Cómo automatizar tu marketing con IA y Make", cat: "Marketing", date: "15 mar 2026", read: "8 min", image: blog6 },
];

const Blog = () => (
  <>
    <PageHeader
      eyebrow="Blog & Recursos"
      title={<>El centro del <span className="text-gradient-primary">conocimiento IA</span> en español</>}
      subtitle="Artículos, guías, plantillas y herramientas gratuitas para acelerar tu dominio de IA."
    />
    <section className="container py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.title} className="overflow-hidden bg-card/50 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group">
            <div className="h-48 relative overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">{p.cat}</div>
            </div>
            <div className="p-6">
              <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                <span>· {p.read} lectura</span>
              </div>
              <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
              <Button size="sm" variant="ghost" className="px-0 text-primary">Leer artículo <ArrowRight className="h-3.5 w-3.5" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
