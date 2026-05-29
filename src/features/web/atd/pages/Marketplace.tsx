import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";
import { Bot, Star, Download } from "lucide-react";

const gpts = [
  { name: "LeyPERÚ", cat: "Jurídico", desc: "Asistente legal experto en legislación peruana, jurisprudencia y redacción.", price: "USD 97", rating: 4.9 },
  { name: "MentorIA", cat: "Educación", desc: "Crea exámenes, planes de clase y materiales educativos en minutos.", price: "USD 79", rating: 4.8 },
  { name: "FinanzasPRO", cat: "Finanzas", desc: "Análisis financiero, proyecciones y modelos en segundos.", price: "USD 127", rating: 4.9 },
  { name: "MediBot", cat: "Salud", desc: "Apoyo clínico, gestión de historias y educación al paciente.", price: "USD 147", rating: 4.7 },
  { name: "VentasGPT", cat: "Comercial", desc: "Scripts de ventas, follow-ups y propuestas comerciales ganadoras.", price: "USD 79", rating: 4.8 },
  { name: "MarketingIA", cat: "Marketing", desc: "Copy, anuncios y campañas optimizadas con IA.", price: "USD 97", rating: 4.9 },
  { name: "RRHH Asistente", cat: "RRHH", desc: "Selección, evaluación y desarrollo de talento con IA.", price: "USD 97", rating: 4.6 },
  { name: "PolíticaIA", cat: "Pública", desc: "Análisis de políticas públicas y redacción legislativa.", price: "USD 127", rating: 4.7 },
];

const Marketplace = () => (
  <>
    <PageHeader
      eyebrow="Marketplace de Productos IA"
      title={<>GPTs <span className="text-gradient-primary">profesionales</span> listos para usar</>}
      subtitle="Asistentes IA pre-entrenados por expertos. Acceso permanente. Resultados inmediatos."
    />
    <section className="container py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {gpts.map((g) => (
          <Card key={g.name} className="p-6 bg-card/50 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 glow-primary">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">{g.cat}</div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{g.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{g.desc}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="inline-flex items-center gap-1 text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-yellow-400" /> {g.rating}
              </span>
              <span className="font-bold text-primary">{g.price}</span>
            </div>
            <Button size="sm" className="w-full" variant="outline"><Download className="h-3.5 w-3.5" /> Obtener</Button>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default Marketplace;
