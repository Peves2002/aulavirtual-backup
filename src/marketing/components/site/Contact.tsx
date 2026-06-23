'use client'

import { useState } from "react";

import { motion } from "framer-motion";
import { toast } from "sonner";

const whatsappIcon = "/images/grupo-corpus/logos/whatsapp.svg"
const facebookIcon = "/images/grupo-corpus/logos/facebook.svg"
const instagramIcon = "/images/grupo-corpus/logos/instagram.svg"
const youtubeIcon = "/images/grupo-corpus/logos/youtube.svg"
const linkedinIcon = "/images/grupo-corpus/logos/linkedin.svg"
const tiktokIcon = "/images/grupo-corpus/logos/tiktok.svg"

const socials = [
  { label: "WhatsApp", icon: whatsappIcon, href: "https://wa.me/51956266147", color: "bg-[#25D366]" },
  { label: "Facebook", icon: facebookIcon, href: "https://facebook.com", color: "bg-[#1877F2]" },
  { label: "Instagram", icon: instagramIcon, href: "https://instagram.com", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" },
  { label: "YouTube", icon: youtubeIcon, href: "https://youtube.com", color: "bg-[#FF0000]" },
  { label: "LinkedIn", icon: linkedinIcon, href: "https://linkedin.com", color: "bg-[#0A66C2]" },
  { label: "TikTok", icon: tiktokIcon, href: "https://tiktok.com", color: "bg-gc-black" },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", interest: "Información general" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Mensaje recibido! Te contactaremos pronto.");
    setForm({ name: "", email: "", interest: "Información general" });
  };

  return (
    <section id="contacto" className="gc-section-padding bg-gc-gray-perla">
      <div className="gc-container-custom">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-gc-gray-light grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Contacto</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gc-black mb-6">Ponte en contacto <span className="text-orange">con nosotros</span></h3>
            <p className="text-gc-gray-medium text-lg mb-10">
              Estamos aquí para resolver tus dudas y ayudarte a elegir el programa que mejor se adapte a tus objetivos profesionales.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-gc-gray-light border border-gray-200 group hover:border-orange transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center text-white text-xl shadow-lg shadow-orange/20">
                  ✉️
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gc-gray-medium uppercase tracking-[0.2em] mb-1">Email</div>
                  <div className="text-gc-black font-bold group-hover:text-orange transition-colors">grupocorpuscapacitaciones@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-gc-gray-light border border-gray-200 group hover:border-orange transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-gc-black flex items-center justify-center text-white text-xl shadow-lg">
                  📍
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gc-gray-medium uppercase tracking-[0.2em] mb-1">Dirección</div>
                  <div className="text-gc-black font-bold group-hover:text-orange transition-colors">Los Olivos, Lima, Perú</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gc-gray-light">
              <p className="text-sm font-bold text-gc-black uppercase tracking-widest mb-6">Nuestras redes sociales</p>
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full ${s.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
                    title={s.label}
                  >
                    <img src={s.icon} alt={s.label} className="w-6 h-6 brightness-0 invert" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={submit} className="space-y-6 bg-gc-gray-perla p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div>
                <label className="text-sm font-bold text-gc-black mb-2 block">Nombre completo</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gc-black mb-2 block">Correo electrónico</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gc-black mb-2 block">Programa de interés</label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all appearance-none"
                >
                  <option>AutoCAD Electrical</option>
                  <option>DIALux para Iluminación</option>
                  <option>Paquete Integral</option>
                  <option>Información general</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full gc-btn-primary py-4 text-lg shadow-xl shadow-orange/30"
              >
                Enviar Solicitud
              </button>
              <p className="text-center text-xs text-gc-gray-medium pt-4">
                Al enviar este formulario, aceptas nuestra <a href="#" className="text-orange font-bold hover:underline">política de privacidad</a>.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
