'use client'

import { useState } from "react";

import { Mail, MessageSquare, MapPin } from "lucide-react";

import { toast } from "sonner";

import PageHeader from "@/features/web/atd/PageHeader";
import { Card } from "@/features/web/atd/ui/card";
import { Button } from "@/features/web/atd/ui/button";
import { Input } from "@/features/web/atd/ui/input";
import { Textarea } from "@/features/web/atd/ui/textarea";
import { Label } from "@/features/web/atd/ui/label";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("¡Mensaje enviado! Te contactaremos en menos de 24h.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  
return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title={<>Hablemos de tu <span className="text-gradient-primary">transformación IA</span></>}
        subtitle="Responde nuestro equipo, no un bot. Te contactamos en menos de 24 horas."
      />
      <section className="container py-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", value: "contacto@academiatd.com" },
            { icon: MessageSquare, title: "WhatsApp", value: "+51 926 242 351" },
            { icon: MapPin, title: "Sede", value: "Lima, Perú · L–V 9am–6pm" },
          ].map((c) => (
            <Card key={c.title} className="p-5 bg-card/50 border-white/5">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{c.title}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="lg:col-span-2 p-8 bg-card/50 border-white/5">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" required placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="tu@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" required placeholder="¿En qué te ayudamos?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg">Mensaje</Label>
              <Textarea id="msg" rows={6} required placeholder="Cuéntanos más..." />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={sending}>
              {sending ? "Enviando…" : "Enviar mensaje"}
            </Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Contact;
