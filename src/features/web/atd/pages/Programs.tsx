'use client'

import { useState } from "react";

import Link from "next/link";

import { Clock, Users, Award, Play } from "lucide-react";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";

const promptDocentesImg = "/atd-assets/multimedia/imagenes/programa-prompt-docentes.png";
const mentorVideo = "/atd-assets/multimedia/videos/mentoria.mp4";
const abogadosImg = "/atd-assets/multimedia/imagenes/otros-2.png";
const finanzasImg = "/atd-assets/multimedia/imagenes/otros-3.png";
const gptsImg = "/atd-assets/multimedia/imagenes/gpts.png";
const autoImg = "/atd-assets/multimedia/imagenes/otros-4.png";
const medicosImg = "/atd-assets/multimedia/imagenes/otros-5.png";
const educacionImg = "/atd-assets/multimedia/imagenes/estudiantes-universitarios.png";
const otros6Img = "/atd-assets/multimedia/imagenes/otros-6.png";
const otros7Img = "/atd-assets/multimedia/imagenes/otros-7.png";

const categories = ["Todos", "Jurídico", "Educación", "Finanzas", "Salud", "Emprendimiento", "Productividad"];

const programs = [
  { title: "IA para Abogados", cat: "Jurídico", duration: "8 semanas", students: 1240, price: "USD 297", level: "Intermedio", image: abogadosImg },
  { title: "MentorIA Docentes", cat: "Educación", duration: "6 semanas", students: 890, price: "USD 247", level: "Inicial", image: promptDocentesImg },
  { title: "FinanzasPRO con IA", cat: "Finanzas", duration: "10 semanas", students: 670, price: "USD 347", level: "Avanzado", image: finanzasImg },
  { title: "ChatGPT Avanzado", cat: "Emprendimiento", duration: "4 semanas", students: 2100, price: "USD 247", level: "Inicial", image: gptsImg },
  { title: "Make & Zapier", cat: "Productividad", duration: "5 semanas", students: 980, price: "USD 197", level: "Intermedio", image: autoImg },
  { title: "IA para Médicos", cat: "Salud", duration: "8 semanas", students: 540, price: "USD 347", level: "Avanzado", image: medicosImg },
  { title: "Prompt Engineering Pro", cat: "Productividad", duration: "3 semanas", students: 3200, price: "USD 147", level: "Inicial", image: otros6Img },
  { title: "IA en Política Pública", cat: "Jurídico", duration: "6 semanas", students: 320, price: "USD 297", level: "Intermedio", image: otros7Img },
  { title: "Educación Emocional + IA", cat: "Educación", duration: "5 semanas", students: 480, price: "USD 197", level: "Inicial", image: educacionImg },
];

const Programs = () => {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? programs : programs.filter((p) => p.cat === active);

  
return (
    <>
      <PageHeader
        eyebrow="Programas de Formación"
        title={<>Encuentra tu <span className="text-gradient-primary">programa ideal</span></>}
        subtitle="Cursos especializados, prácticos y aplicables desde el primer día."
      />
      <section className="container py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.title} className="overflow-hidden bg-card/50 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group">
              <div className="h-44 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">{p.cat}</div>
                <div className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">{p.level}</div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.duration}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {p.students}</span>
                  <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Cert.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{p.price}</span>
                  <Button size="sm" variant="outline">Ver curso</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center bg-card/30 rounded-3xl p-8 md:p-12 border border-white/5">
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={mentorVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play className="h-12 w-12 text-white fill-white opacity-80" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">¿Buscas algo más personalizado?</h2>
            <p className="text-muted-foreground mb-6">
              Nuestra <strong>Mentoría Elite</strong> ofrece un camino 1-a-1 para líderes que necesitan dominar la IA en tiempo récord con un plan de estudios adaptado 100% a sus objetivos.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ maxHeight: '60vh' }}>
              <img src={promptDocentesImg} alt="Mentoría" className="rounded-xl border border-white/10 shadow-lg w-full h-full object-cover" />
            </div>
            <div className="mt-8">
              <Button variant="hero" asChild><Link href="/contacto">Consultar por Mentoría</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
