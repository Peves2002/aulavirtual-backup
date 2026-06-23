'use client'

import { useState } from "react";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { Mail, Phone, MapPin, Send, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";

import { SubpageLayout, SectionBadge, HexBg } from "@/marketing/components/site/SubpageLayout";

const socials = [
  { label: "WhatsApp", icon: <MessageCircle size={24} />, href: "https://wa.me/51956266147", color: "bg-[#25D366]" },
  { label: "Facebook", icon: <Facebook size={24} />, href: "https://facebook.com", color: "bg-[#1877F2]" },
  { label: "Instagram", icon: <Instagram size={24} />, href: "https://instagram.com", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
  { label: "LinkedIn", icon: <Linkedin size={24} />, href: "https://linkedin.com", color: "bg-[#0A66C2]" },
];

const Contacto = () => {
  const [form, setForm] = useState({ name: "", email: "", interest: "Información general", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Mensaje recibido! Te contactaremos pronto.");
    setForm({ name: "", email: "", interest: "Información general", message: "" });
  };

  return (
    <SubpageLayout title="Contacto | Grupo Corpus" breadcrumb="Contacto">
      <section className="relative overflow-hidden pt-16 pb-20 bg-gc-gray-perla">
        <HexBg />
        <div className="gc-container-custom relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionBadge>
              <Phone size={12} className="mr-2" /> Atención Personalizada
            </SectionBadge>
            <h1 className="mt-5 font-gc-display font-extrabold text-4xl md:text-6xl leading-tight max-w-4xl text-gc-black">
              Estamos aquí para <span className="text-gc-blue-corp">ayudarte a crecer</span>
            </h1>
            <p className="mt-5 text-lg text-gc-gray-medium max-w-3xl">
              ¿Tienes dudas sobre un curso o necesitas asesoría personalizada? Escríbenos y un especialista técnico te responderá en breve.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="gc-section-padding bg-white">
        <div className="gc-container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-gc-display font-extrabold text-gc-black mb-8">Información de contacto</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-gc-gray-perla border border-gc-gray-light hover:border-gc-blue-corp transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-gc-blue-corp flex items-center justify-center text-white shadow-lg shadow-gc-blue-corp/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gc-gray-medium uppercase tracking-[0.2em] mb-1">Email Corporativo</div>
                    <div className="text-gc-black font-bold text-lg group-hover:text-gc-blue-corp transition-colors">grupocorpuscapacitaciones@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-3xl bg-gc-gray-perla border border-gc-gray-light hover:border-gc-blue-corp transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-gc-black flex items-center justify-center text-white shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gc-gray-medium uppercase tracking-[0.2em] mb-1">Ubicación</div>
                    <div className="text-gc-black font-bold text-lg group-hover:text-gc-blue-corp transition-colors">Lima, Perú (Atención Virtual)</div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm font-bold text-gc-black uppercase tracking-widest mb-6">Síguenos en redes</p>
                <div className="flex flex-wrap gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-300 text-white`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gc-gray-perla p-8 md:p-10 rounded-[40px] border border-gc-gray-light shadow-2xl"
            >
              <form onSubmit={submit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gc-black ml-1">Nombre</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border border-gc-gray-light rounded-2xl px-5 py-4 outline-none focus:border-gc-blue-corp focus:ring-4 focus:ring-gc-blue-corp/5 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gc-black ml-1">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border border-gc-gray-light rounded-2xl px-5 py-4 outline-none focus:border-gc-blue-corp focus:ring-4 focus:ring-gc-blue-corp/5 transition-all"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gc-black ml-1">Programa de interés</label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-white border border-gc-gray-light rounded-2xl px-5 py-4 outline-none focus:border-gc-blue-corp focus:ring-4 focus:ring-gc-blue-corp/5 transition-all appearance-none"
                  >
                    <option>AutoCAD Electrical</option>
                    <option>DIALux para Iluminación</option>
                    <option>Paquete Integral</option>
                    <option>Información general</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gc-black ml-1">Mensaje</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border border-gc-gray-light rounded-2xl px-5 py-4 outline-none focus:border-gc-blue-corp focus:ring-4 focus:ring-gc-blue-corp/5 transition-all resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gc-btn-primary py-5 text-lg shadow-xl shadow-gc-blue-corp/20 flex items-center justify-center gap-3"
                >
                  Enviar Mensaje <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or location mock */}
      <section className="gc-container-custom pb-24">
        <div className="h-[400px] bg-gc-gray-light rounded-[40px] overflow-hidden relative border border-gc-gray-light">
          <div className="absolute inset-0 flex items-center justify-center bg-gc-gray-perla">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp mb-4">
                <MapPin size={40} />
              </div>
              <h3 className="text-xl font-gc-display font-bold text-gc-black">Ubicación Estratégica</h3>
              <p className="text-gc-gray-medium max-w-xs mx-auto">Atención personalizada y capacitaciones virtuales para todo el Perú y Latinoamérica.</p>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
};

export default Contacto;
