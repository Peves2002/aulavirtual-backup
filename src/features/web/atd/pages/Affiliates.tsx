import { DollarSign, Users, TrendingUp, Award, Check } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

const Affiliates = () => (
  <>
    <PageHeader
      eyebrow="Programa de Afiliados ATD"
      title={<>Recomienda ATD. <span className="text-gradient-primary">Gana hasta 40%</span> de comisión.</>}
      subtitle="El programa de afiliados con la mejor recompensa del mercado de educación IA en español."
    />
    <section className="container py-12 grid gap-6 md:grid-cols-4">
      {[
        { icon: DollarSign, title: "30-40% comisión", desc: "Por cada venta realizada." },
        { icon: Users, title: "Cookie 60 días", desc: "Tracking generoso." },
        { icon: TrendingUp, title: "Pagos mensuales", desc: "Sin mínimos absurdos." },
        { icon: Award, title: "Niveles y bonus", desc: "Standard, Gold, Platinum." },
      ].map((b) => (
        <Card key={b.title} className="p-6 bg-card/50 border-white/5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
            <b.icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold mb-1">{b.title}</h3>
          <p className="text-sm text-muted-foreground">{b.desc}</p>
        </Card>
      ))}
    </section>

    <section className="container py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Niveles de afiliados</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "Standard", color: "from-slate-500 to-slate-700", commission: "30%", reqs: ["Al registrarte", "Material de marketing", "Dashboard básico"] },
          { name: "Gold", color: "from-yellow-500 to-orange-600", commission: "35%", reqs: ["10 ventas o USD 500 generados", "Acceso a webinars privados", "Soporte prioritario"] },
          { name: "Platinum", color: "from-primary to-secondary", commission: "40%", reqs: ["50 ventas o USD 2.500", "Eventos exclusivos", "Co-creación de contenido"] },
        ].map((n) => (
          <Card key={n.name} className="p-8 bg-card/50 border-white/5 hover:border-primary/40 transition-all">
            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${n.color} flex items-center justify-center mb-5`}>
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{n.name}</h3>
            <div className="text-3xl font-display font-bold text-gradient-primary mb-5">{n.commission}</div>
            <ul className="space-y-2">
              {n.reqs.map((r) => (
                <li key={r} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> {r}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button variant="hero" size="lg">Unirme al programa</Button>
      </div>
    </section>
  </>
);

export default Affiliates;
