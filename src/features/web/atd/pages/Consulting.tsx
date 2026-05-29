import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";
import { Building2, Briefcase, Rocket, Check, ArrowRight, Play } from "lucide-react";
import Link from "next/link";
const consultoriaVideo = "/atd-assets/multimedia/videos/1-consultoria-ia.mp4";

const empresasImg = "/atd-assets/multimedia/imagenes/expancion-para-empresas.png";
const serviciosImg = "/atd-assets/multimedia/imagenes/atd-servicios.png";

const services = [
  {
    icon: Rocket,
    title: "AI Strategy Sprint",
    desc: "Diagnóstico de IA en 2 semanas. Roadmap accionable para tu organización.",
    features: ["Auditoría de procesos", "Identificación de quick wins", "Roadmap a 12 meses", "Workshop ejecutivo"],
    price: "Desde USD 4.900",
  },
  {
    icon: Briefcase,
    title: "Implementación IA por Áreas",
    desc: "Despliegue de IA en áreas críticas: ventas, operaciones, soporte, RRHH.",
    features: ["GPTs custom para tu empresa", "Integración con tus sistemas", "Capacitación al equipo", "Soporte 90 días"],
    price: "Desde USD 14.900",
  },
  {
    icon: Building2,
    title: "Programa Enterprise",
    desc: "Transformación IA integral. Consultoría continua + plataforma ATD para todo el equipo.",
    features: ["Hasta 100 colaboradores", "Sesiones estratégicas mensuales", "Reportes ejecutivos", "Account manager dedicado"],
    price: "A medida",
  },
];

const Consulting = () => (
  <>
    <PageHeader
      eyebrow="Consultoría IA Empresarial"
      title={<>Transformamos tu empresa con <span className="text-gradient-primary">IA aplicada</span></>}
      subtitle="Acompañamiento estratégico para que tu organización adopte IA con resultados medibles en semanas, no años."
    />
    <section className="container py-12">
      <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group">
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Play className="h-12 w-12 text-white fill-white" />
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={consultoriaVideo} type="video/mp4" />
          </video>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Metodología ATD: De la idea a la ejecución</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            No vendemos software. Vendemos soluciones. Nuestra consultoría se enfoca en resolver cuellos de botella específicos mediante IA, integrando herramientas que tu equipo realmente usará.
          </p>
          <img src={serviciosImg} alt="Servicios ATD" className="rounded-xl border border-white/5 shadow-xl" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="p-8 bg-card/50 border-white/5 hover:border-primary/40 transition-all flex flex-col">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5">
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
            <p className="text-muted-foreground mb-5">{s.desc}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {s.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <div className="text-lg font-semibold text-primary mb-4">{s.price}</div>
            <Button variant="outline" asChild>
              <Link href="/contacto">Solicitar propuesta <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
    <section className="container py-12">
      <Card className="p-12 text-center glass-strong overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={empresasImg} alt="Empresas" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-medium">Agenda una llamada gratuita de 30 minutos con nuestro equipo. Sin compromiso.</p>
          <Button variant="hero" size="lg" asChild><Link href="/contacto">Agendar llamada</Link></Button>
        </div>
      </Card>
    </section>
  </>
);

export default Consulting;
