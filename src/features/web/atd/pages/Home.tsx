'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Users, Globe, ShieldCheck, Clock, TrendingUp, AlertTriangle, Target, Zap, Languages, Bot, Play, Check, Sparkles, Brain } from "lucide-react";
import { Button } from "@/features/web/atd/ui/button";
import { Card } from "@/features/web/atd/ui/card";
import VideoTestimonialsSection from "@/features/web/atd/components/VideoTestimonialsSection";
import FaqSection from "@/features/web/atd/components/FaqSection";
const heroVideo = "/atd-assets/multimedia/videos/video-de-portada.mp4";

const portadaImg = "/atd-assets/multimedia/imagenes/1-atd-portada.png";
const mentorImg = "/atd-assets/multimedia/imagenes/1-atd-mentor.png";
const antesDespuesImg = "/atd-assets/multimedia/imagenes/antes-y-despues-1.png";
const comunidadImg = "/atd-assets/multimedia/imagenes/comunidad-atd-networking.png";
const gptsImg = "/atd-assets/multimedia/imagenes/gpts.png";
const docentesImg = "/atd-assets/multimedia/imagenes/programa-prompt-docentes.png";
const abogadosImg = "/atd-assets/multimedia/imagenes/otros-2.png";
const finanzasImg = "/atd-assets/multimedia/imagenes/otros-3.png";
const autoImg = "/atd-assets/multimedia/imagenes/otros-4.png";
const medicosImg = "/atd-assets/multimedia/imagenes/otros-5.png";
const logoImg = "/atd-assets/general/logo.png";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {/* LOADER */}
      {!videoLoaded && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
          <div className="relative">
            {/* Spinner perimétrico */}
            <div className="absolute -inset-8 rounded-full border-2 border-primary/10"></div>
            <div className="absolute -inset-8 rounded-full border-t-2 border-primary animate-spin"></div>

            {/* Logo Central */}
            <div className="relative h-20 w-auto animate-pulse flex items-center justify-center">
              <img src={logoImg} alt="ATD Logo" className="h-full object-contain" />
            </div>
          </div>
          <div className="mt-16 text-xs font-bold tracking-[0.3em] uppercase text-primary/60 animate-pulse">
            Academia Tecnológica Digital
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Overlay más ligero para que el video no tape el texto */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        {/* Gradiente radial que ilumina el centro donde está el texto */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_100%)]" />
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="container relative z-20 pt-20 pb-24 md:pt-28 md:pb-32 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary mb-8 animate-fade-up backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> La academia #1 en IA aplicada en español
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
            Domina la <span className="text-gradient-primary">Inteligencia Artificial</span>.
            <br className="hidden sm:inline" /> Multiplica tus ingresos.
            <br className="hidden sm:inline" /> Transforma tu profesión.
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-white/80 max-w-3xl mx-auto animate-fade-up drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Únete a más de <span className="text-white font-semibold">10.000 profesionales hispanohablantes</span> que ya usan IA para trabajar menos, ganar más y liderar su industria. Aprende en español, aplica desde el primer día.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up">
            <Button variant="hero" size="xl" asChild>
              <Link href="#">Empieza Gratis 7 Días <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link href="/programas"><Play className="h-4 w-4" /> Ver Programas</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <Badge icon={<Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}>4.9/5 valoración</Badge>
            <Badge icon={<Users className="h-4 w-4 text-white/80" />}>+10.000 alumnos</Badge>
            <Badge icon={<Globe className="h-4 w-4 text-white/80" />}>15 países</Badge>
            <Badge icon={<ShieldCheck className="h-4 w-4 text-white/80" />}>Pago 100% seguro</Badge>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-white/5 py-10 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Profesionales de estas organizaciones se transforman con ATD
        </p>
        <div className="relative">
          <div className="flex marquee gap-16 w-max items-center">
            {[...Array(2)].flatMap((_, k) =>
              ["Universidad Lima", "Colegio Médico", "Bar Asociación", "Forbes", "El Comercio", "Microsoft", "OpenAI", "Notion", "Stripe", "Linear"].map((n) => (
                <div key={`${k}-${n}`} className="text-2xl font-display font-bold text-muted-foreground/40 hover:text-foreground transition-colors whitespace-nowrap">
                  {n}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="container py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-medium mb-4">
            <AlertTriangle className="h-3.5 w-3.5" /> El problema
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">¿Sientes que la IA avanza más rápido que tú?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            El 95% de los profesionales hispanohablantes aún no usa IA. Mientras tanto, tu competencia la domina en silencio.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Clock, title: "Tiempo perdido", desc: "Gastas horas en tareas que la IA hace en minutos." },
            { icon: TrendingUp, title: "Ingresos estancados", desc: "Tus competidores cobran más ofreciendo lo mismo, pero más rápido." },
            { icon: AlertTriangle, title: "Miedo a quedarte atrás", desc: "Sin guía, te ahogas en información inútil cada semana." },
          ].map((p) => (
            <Card key={p.title} className="p-8 bg-card/50 border-white/5 hover:border-primary/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-radial-primary opacity-40" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" /> La solución
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              ATD es el <span className="text-gradient-accent">atajo</span>. IA aplicada a TU profesión, en español, con resultados medibles.
            </h2>
          </div>
          <div className="grid gap-12 items-center md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden" style={{ maxHeight: '70vh' }}>
                <img src={portadaImg} alt="ATD Portada" className="rounded-2xl shadow-2xl border border-white/10 glow-primary w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { icon: Target, title: "Especialización", desc: "Programas y GPTs para abogados, médicos, docentes y más." },
                { icon: Zap, title: "Aplicación", desc: "Desde la primera clase generas resultados reales." },
                { icon: Languages, title: "100% Español", desc: "Contenido pensado para la realidad de LatAm." },
                { icon: Bot, title: "GPTs PRO", desc: "Asistentes IA pre-entrenados listos para usar." },
              ].map((p) => (
                <Card key={p.title} className="p-5 glass hover:bg-card/60 transition-all">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                    <p.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS DESTACADOS */}
      <section className="container py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold">Programas que <span className="text-gradient-primary">transforman carreras</span></h2>
            <p className="mt-3 text-muted-foreground text-lg">Elige el camino exacto para tu profesión.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/programas">Ver todos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Card key={p.title} className="overflow-hidden bg-card/50 border-white/5 hover:border-primary/40 transition-all group hover:-translate-y-1">
              <div className="h-48 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4 text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.duration}</span>
                  <span className="font-semibold text-primary">{p.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="container py-16">
        <Card className="p-10 md:p-16 glass-strong relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <div className="relative grid gap-8 md:grid-cols-4 text-center">
            {[
              { n: "10K+", l: "Alumnos activos" },
              { n: "150+", l: "Cursos y GPTs" },
              { n: "15", l: "Países" },
              { n: "4.9/5", l: "Valoración" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient-primary">{s.n}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* TESTIMONIOS */}
      <section className="container py-24">
        <div className="grid gap-12 items-center md:grid-cols-2 mb-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Resultados reales, en semanas</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Nuestros alumnos están transformando sus procesos diarios. Mira el cambio real antes y después de implementar IA.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl overflow-hidden" style={{ maxHeight: '40vh' }}>
                <img src={antesDespuesImg} alt="Antes y después" className="rounded-xl border border-white/10 w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ maxHeight: '40vh' }}>
                <img src={comunidadImg} alt="Comunidad ATD" className="rounded-xl border border-white/10 w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 bg-card/50 border-white/5">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-foreground/90 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${mentorImg})` }} />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <FaqSection />

      {/* TESTIMONIOS EN VIDEO */}
      <VideoTestimonialsSection />

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-32">
        {/* Fondo agresivo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary)/0.25),transparent)]" />
        {/* Líneas decorativas */}
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        {/* Orbes */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Plazas limitadas — cierra pronto
          </div>

          <h2 className="text-4xl md:text-6xl font-black font-display leading-[1.05] tracking-tight">
            O te adaptas a la IA<br />
            <span className="text-gradient-primary">o te quedas atrás.</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Cada semana que esperas, otros profesionales te adelantan. <strong className="text-foreground">Empieza hoy</strong> y domina la herramienta que está redefiniendo todas las industrias.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild className="text-base font-bold shadow-lg shadow-primary/30">
              <Link href="/planes">Empieza gratis ahora <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="glass" size="xl" asChild className="text-base">
              <Link href="/contacto">Hablar con un asesor</Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground/60">
            Sin tarjeta de crédito · Cancela cuando quieras · 7 días de garantía
          </p>
        </div>
      </section>
    </>
  );
};

const Badge = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5">{icon} {children}</span>
);

const programs = [
  { title: "IA para Abogados", desc: "Domina LeyPERÚ, redacta demandas y analiza jurisprudencia con IA.", duration: "8 semanas", price: "USD 297", tag: "Bestseller", image: abogadosImg },
  { title: "MentorIA para Docentes", desc: "Crea exámenes, planes de clase y materiales en minutos.", duration: "6 semanas", price: "USD 247", tag: "Nuevo", image: docentesImg },
  { title: "FinanzasPRO con IA", desc: "Analiza estados financieros y proyecciones automáticamente.", duration: "10 semanas", price: "USD 347", tag: "Popular", image: finanzasImg },
  { title: "ChatGPT Avanzado para Emprendedores", desc: "De idea a negocio funcional con IA en 30 días.", duration: "4 semanas", price: "USD 247", tag: "Top ventas", image: gptsImg },
  { title: "Automatización con Make & Zapier", desc: "Conecta tus apps y elimina el trabajo repetitivo.", duration: "5 semanas", price: "USD 197", tag: "Práctico", image: autoImg },
  { title: "IA para Médicos", desc: "Diagnóstico asistido y gestión clínica con IA aplicada.", duration: "8 semanas", price: "USD 347", tag: "Premium", image: medicosImg },
];

const testimonials = [
  { name: "María González", role: "Abogada · Lima", quote: "Reduje en 70% el tiempo de redacción de demandas. Ahora atiendo el doble de casos." },
  { name: "Carlos Ramírez", role: "Docente · Bogotá", quote: "MentorIA transformó mi forma de enseñar. Mis alumnos están más comprometidos que nunca." },
  { name: "Ana Torres", role: "Emprendedora · CDMX", quote: "En 30 días lancé mi negocio con IA. Lo que antes me tomaba meses, ahora son días." },
];


const faqs = [
  { q: "¿Necesito conocimientos previos de IA?", a: "No. Nuestros programas empiezan desde cero y avanzan progresivamente." },
  { q: "¿Los cursos son en vivo o grabados?", a: "La mayoría son bajo demanda con masterclasses en vivo mensuales para miembros PRO." },
  { q: "¿Qué pasa si no me convence?", a: "Tienes 7 días de garantía total. Si no te convence, te devolvemos el 100%." },
  { q: "¿Recibo certificado al finalizar?", a: "Sí. Cada programa entrega certificado digital verificable y descargable." },
  { q: "¿Cómo funciona el Marketplace de GPTs?", a: "Compras acceso permanente a GPTs profesionales pre-entrenados para tu industria." },
  { q: "¿Hay descuentos para estudiantes?", a: "Sí, ofrecemos 30% de descuento con verificación de matrícula vigente." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Por supuesto. Sin permanencia, sin letra pequeña. Cancela desde tu cuenta." },
  { q: "¿Aceptan pagos en moneda local?", a: "Sí: Stripe, PayPal, Culqi, Yape, PLIN, Mercado Pago, PIX y más." },
  { q: "¿Cuánto tiempo toma ver resultados?", a: "La mayoría de alumnos aplica lo aprendido desde la primera semana." },
  { q: "¿Tienen soporte humano?", a: "Sí, soporte por WhatsApp y email de lunes a viernes 9am–6pm (GMT-5)." },
];

export default Home;
