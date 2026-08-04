import { MessageCircle, Calendar, Users, Trophy } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

const Community = () => (
  <>
    <PageHeader
      eyebrow="Comunidad ATD"
      title={<>El club privado de los <span className="text-gradient-primary">profesionales IA</span> en español</>}
      subtitle="Conecta con miles de alumnos, comparte casos reales, recibe feedback y crece más rápido."
    />
    <section className="container py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: MessageCircle, title: "Foros por industria", desc: "Discusiones segmentadas por profesión." },
        { icon: Calendar, title: "Eventos mensuales", desc: "Masterclasses y AMAs con expertos." },
        { icon: Users, title: "+10.000 miembros", desc: "Red activa en 15 países." },
        { icon: Trophy, title: "Retos y hackathons", desc: "Compite, aprende y gana premios." },
      ].map((f) => (
        <Card key={f.title} className="p-6 bg-card/50 border-white/5">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            <f.icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold mb-1">{f.title}</h3>
          <p className="text-sm text-muted-foreground">{f.desc}</p>
        </Card>
      ))}
    </section>
    <section className="container py-12">
      <Card className="p-12 text-center glass-strong">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Únete a la comunidad</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Acceso incluido en cualquier plan PRO o Business.</p>
        <Button variant="hero" size="lg">Ver planes</Button>
      </Card>
    </section>
  </>
);

export default Community;
