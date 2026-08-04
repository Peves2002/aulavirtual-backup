import { Check } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

const plansData = [
  { name: "Free", price: "0", desc: "Explora ATD por 7 días.", features: ["3 cursos intro", "1 GPT demo", "Comunidad básica"], cta: "Empezar gratis" },
  { name: "ATD PRO", price: "97", desc: "Acceso total de por vida.", popular: true, features: ["Acceso a TODOS los cursos", "Todos los GPTs profesionales", "Eventos en vivo mensuales", "Comunidad PRO", "Certificados verificables", "Soporte prioritario"], cta: "Adquirir ahora" },
  { name: "Business", price: "497", desc: "Para equipos y empresas.", features: ["Todo lo de PRO", "Hasta 10 usuarios", "Dashboard de equipo", "Onboarding 1:1", "Soporte dedicado", "Account manager"], cta: "Hablar con ventas" },
  { name: "Enterprise", price: "Custom", desc: "Para corporativos.", features: ["Usuarios ilimitados", "Consultoría dedicada", "GPTs custom", "SSO + SLA", "Integraciones a medida"], cta: "Solicitar demo" },
];

const Pricing = () => {
  return (
    <>
      <PageHeader
        eyebrow="Planes de Acceso"
        title={<>Un plan para <span className="text-gradient-primary">cada etapa</span></>}
        subtitle="Un solo pago. Acceso de por vida. Sin mensualidades."
      />
      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {plansData.map((p: any) => (
            <Card key={p.name} className={`p-7 relative flex flex-col ${p.popular ? "border-primary/50 bg-card glow-primary" : "bg-card/50 border-white/5"}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold whitespace-nowrap">
                  Más popular
                </div>
              )}
              <div className="text-sm text-muted-foreground mb-2">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                {p.price === "Custom" ? (
                  <span className="text-3xl font-display font-bold">A medida</span>
                ) : (
                  <>
                    <span className="text-xs text-muted-foreground">USD</span>
                    <span className="text-4xl font-display font-bold">{p.price}</span>
                    <span className="text-muted-foreground text-xs font-medium ml-1 bg-white/5 px-2 py-0.5 rounded">Un solo pago</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f: string) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.popular ? "hero" : "outline"} className="w-full">{p.cta}</Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Pricing;
