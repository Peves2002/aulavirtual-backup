import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Target, Heart, Globe, Zap } from "lucide-react";
import StatsSection from "@/features/web/atd/components/StatsSection";
import VideoTestimonialsSection from "@/features/web/atd/components/VideoTestimonialsSection";
const principalImg = "/atd-assets/multimedia/equipo-humano/1-principal.png";
const historiaImg = "/atd-assets/multimedia/equipo-humano/2-historia-atd.png";
const otros1Img = "/atd-assets/multimedia/equipo-humano/3-otros.png";
const otros2Img = "/atd-assets/multimedia/equipo-humano/4-otros.png";
const otros3Img = "/atd-assets/multimedia/equipo-humano/5-otros.png";
const otros4Img = "/atd-assets/multimedia/equipo-humano/6-otros.png";

const About = () => (
  <>
    <PageHeader
      eyebrow="Quiénes Somos"
      title={<>La academia que <span className="text-gradient-primary">transforma profesiones</span> con IA</>}
      subtitle="Nacimos en Lima con una misión global: democratizar el dominio de la IA en español."
    />
    <section className="container py-20 grid gap-12 md:grid-cols-2 items-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img src={historiaImg} alt="Historia ATD" className="relative rounded-2xl border border-white/10" />
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra historia</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          ATD nació en 2024 frente a una realidad innegable: el mundo hispanohablante estaba quedando rezagado en la adopción de IA. Mientras EE.UU. y Asia avanzaban a velocidad récord, los profesionales latinoamericanos no encontraban formación seria, contextualizada y aplicable.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Hoy somos la academia #1 en IA aplicada en español, con más de 10.000 alumnos en 15 países y un ecosistema de programas, GPTs y consultoría que está cambiando carreras todos los días.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">El equipo humano tras la IA</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
            Creemos que la IA no reemplaza a los humanos, sino que los potencia. Nuestro equipo combina expertos técnicos en LLMs con especialistas en pedagogía y consultoría estratégica.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-card/50 border-white/5">
              <div className="text-3xl font-display font-bold text-gradient-primary">10K+</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Alumnos</div>
            </Card>
            <Card className="p-6 bg-card/50 border-white/5">
              <div className="text-3xl font-display font-bold text-gradient-primary">15</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Países</div>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={principalImg} alt="Equipo" className="rounded-xl border border-white/10 col-span-2 shadow-2xl" />
          <img src={otros1Img} alt="Equipo" className="rounded-xl border border-white/10" />
          <img src={otros2Img} alt="Equipo" className="rounded-xl border border-white/10" />
        </div>
      </div>
    </section>

    <StatsSection />

    <section className="container py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros valores</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { icon: Target, title: "Excelencia", desc: "Estándar global, ejecución impecable." },
          { icon: Heart, title: "Cercanía", desc: "Conocemos LatAm porque somos LatAm." },
          { icon: Globe, title: "Impacto", desc: "Transformar miles de carreras." },
          { icon: Zap, title: "Velocidad", desc: "Aplicación inmediata, no teoría." },
        ].map((v) => (
          <Card key={v.title} className="p-6 bg-card/50 border-white/5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <v.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </Card>
        ))}
      </div>
    </section>

    <VideoTestimonialsSection />
  </>
);

export default About;
