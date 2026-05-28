'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "955 833 613 / 942 015 745",
    href: "https://wa.me/51955833613",
  },
  {
    icon: Mail,
    label: "Email",
    value: "gerencia@ingenierodeelite.com",
    href: "mailto:gerencia@ingenierodeelite.com",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Jirón El Inca 537, Cajamarca",
    href: "https://maps.google.com/?q=Jiron+El+Inca+537+Cajamarca",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/p/Elite-Engineering-100048414673399/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/103097936/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/igenierosdeelite",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const serviceOptions = [
    "Implementación BIM",
    "Modelamiento BIM",
    "Diseño de Viviendas",
    "Transformación Digital",
    "Capacitaciones BIM",
    "Vistas 360°",
    "Realidad Virtual (VR)",
    "Realidad Aumentada (AR)",
  ];

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSelectedService(customEvent.detail);
    };
    window.addEventListener('selectService', handleSelectService);
    return () => window.removeEventListener('selectService', handleSelectService);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const empresa = formData.get('empresa') as string;
    const email = formData.get('email') as string;
    const servicio = selectedService;
    const mensaje = formData.get('mensaje') as string;

    const waMessage = `Hola Elite Engineering, deseo hacer una consulta:
*Nombre:* ${nombre}
${empresa ? `*Empresa:* ${empresa}\n` : ''}${email ? `*Email:* ${email}\n` : ''}${servicio ? `*Servicio de Interés:* ${servicio}\n` : ''}
*Mensaje:*
${mensaje}`;

    const waUrl = `https://wa.me/51955833613?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contacto" ref={ref} className="relative py-10 lg:py-14 overflow-hidden bg-secondary">
      {/* Immersive Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-6 translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Contact Info & Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-3"
            >
              Conecta con Élite
            </motion.div>

            <h2 className="font-display text-2xl md:text-4xl font-black text-primary mb-3 leading-tight tracking-tighter">
              ¿Listo para el <span className="text-gradient-orange">Siguiente Nivel?</span>
            </h2>

            <p className="text-slate-500 max-w-xl text-base font-medium leading-relaxed mb-6">
              Llevamos la precisión técnica a tu puerta. Nuestro equipo está listo para integrar metodologías de vanguardia en tu organización.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="group flex flex-col md:flex-row items-center gap-3 p-4 glass-modern rounded-xl bg-white/70 hover:shadow-xl transition-all duration-700 text-center md:text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-xl shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</span>
                    <span className="block text-base font-black text-primary group-hover:text-accent transition-colors">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Premium Neumorphic Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-6 rounded-2xl shadow-2xl relative z-10">
              <h3 className="text-xl font-black text-primary mb-2">Consulta Directa</h3>
              <p className="text-slate-500 font-bold text-sm mb-6">Cuéntanos sobre tu visión técnica.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Nombre</label>
                    <Input
                      name="nombre"
                      required
                      className="h-12 rounded-xl bg-secondary/30 border-none px-5 font-bold text-sm text-primary focus:shadow-inner-nm transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Empresa</label>
                    <Input
                      name="empresa"
                      className="h-12 rounded-xl bg-secondary/30 border-none px-5 font-bold text-sm text-primary focus:shadow-inner-nm transition-all"
                      placeholder="Tu organización"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">Email Corporativo</label>
                  <Input
                    name="email"
                    type="email"
                    className="h-12 rounded-xl bg-secondary/30 border-none px-5 font-bold text-sm text-primary focus:shadow-inner-nm transition-all"
                    placeholder="email@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">Servicio de Interés</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full h-12 rounded-xl bg-secondary/30 border-none px-5 font-bold text-sm text-primary focus:shadow-inner-nm transition-all appearance-none cursor-pointer outline-none"
                  >
                    <option value="">Selecciona un servicio</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">Mensaje</label>
                  <Textarea
                    name="mensaje"
                    className="min-h-[100px] rounded-2xl bg-secondary/30 border-none p-4 font-bold text-sm text-primary focus:shadow-inner-nm transition-all resize-none"
                    placeholder="Descríbenos brevemente el alcance de tu proyecto..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-orange-600 text-white font-black text-sm shadow-2xl glow-orange-strong group"
                >
                  {isSubmitted ? (
                    <span className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6" /> ¡ENVIADO!</span>
                  ) : (
                    <span className="flex items-center gap-3">ENVIAR<Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" /></span>
                  )}
                </Button>
              </form>
            </div>

            {/* Background elements for the form */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
