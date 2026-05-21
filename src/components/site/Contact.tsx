"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Music2 } from "lucide-react";

const courseOptions = [
  "Makis & Rolls Profesionales",
  "Pollo a la Brasa: Negocio Completo",
  "Postres que Venden",
  "Cocina Marina Peruana",
  "Emprendimiento Gastronómico",
  "Cevichería desde Cero",
];

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre es muy corto").max(100),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresa un teléfono válido")
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, "Solo dígitos y +()- permitidos"),
  email: z.string().trim().email("Email inválido").max(255),
  course: z.string().min(1, "Elige un curso"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  course: "",
  message: "",
};

const inputBase: React.CSSProperties = {
  background: "#F7FBF0",
  border: "1.5px solid #C8E890",
  borderRadius: "12px",
  padding: "14px",
  color: "#1A3A0A",
  width: "100%",
  fontSize: "14px",
  outline: "none",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const fieldErrors: typeof errors = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Revisa los campos del formulario");
      return;
    }
    setErrors({});
    toast.success("¡Mensaje enviado! Te contactamos pronto 🌿");
    setForm(initial);
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.borderColor = "#5A9020";
  };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.borderColor = "#C8E890";
  };

  return (
    <section id="contacto" className="pt-10 flex flex-col" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14">
        {/* FORM */}
        <div className="reveal">
          <h2
            className="font-display font-bold"
            style={{ color: "#1A3A0A", fontSize: "clamp(28px, 3.6vw, 38px)" }}
          >
            ¿Listo para empezar?
          </h2>
          <p className="mt-3" style={{ color: "#4A7018", fontSize: "15px", lineHeight: 1.7 }}>
            Cuéntanos qué curso te interesa y te contactamos en menos de 24 horas.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                style={inputBase}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={100}
                aria-label="Nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-[12px]" style={{ color: "#9b3030" }}>{errors.name}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  placeholder="WhatsApp / Teléfono"
                  style={inputBase}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  maxLength={20}
                  aria-label="Teléfono"
                />
                {errors.phone && (
                  <p className="mt-1 text-[12px]" style={{ color: "#9b3030" }}>{errors.phone}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  style={inputBase}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  maxLength={255}
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="mt-1 text-[12px]" style={{ color: "#9b3030" }}>{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <select
                style={inputBase}
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
                aria-label="Curso de interés"
              >
                <option value="">¿Qué curso te interesa?</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="mt-1 text-[12px]" style={{ color: "#9b3030" }}>{errors.course}</p>
              )}
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="¿Alguna pregunta?"
                style={{ ...inputBase, resize: "vertical" }}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={1000}
                aria-label="Mensaje"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full font-bold transition-all"
              style={{
                height: 54,
                background: "#A8E060",
                color: "#1A3A0A",
                fontSize: "16px",
                boxShadow: "0 8px 24px rgba(168,224,96,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5A9020";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#A8E060";
                e.currentTarget.style.color = "#1A3A0A";
                e.currentTarget.style.transform = "none";
              }}
            >
              Quiero que me contacten →
            </button>
            <p className="text-center" style={{ color: "#7AAA40", fontSize: "12px" }}>
              📱 También escríbenos directo al WhatsApp 953 822 677
            </p>
          </form>
        </div>

        {/* INFO */}
        <div className="reveal">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { Icon: MapPin, label: "DIRECCIÓN", value: "Jr. Neptuno 102, Los Olivos, Lima" },
              { Icon: Phone, label: "TELÉFONO", value: "953 822 677" },
              { Icon: Mail, label: "EMAIL", value: "incubacocina@gmail.com" },
              { Icon: Clock, label: "HORARIO", value: "Lun–Sáb, 9am a 7pm" },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="p-5"
                style={{
                  background: "#F7FBF0",
                  border: "1px solid #C8E890",
                  borderRadius: "14px",
                }}
              >
                <Icon size={24} color="#A8E060" />
                <div
                  className="mt-3"
                  style={{ color: "#7AAA40", fontSize: "12px", letterSpacing: "1.5px" }}
                >
                  {label}
                </div>
                <div className="mt-1 font-bold" style={{ color: "#1A3A0A", fontSize: "15px" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div
              className="font-bold mb-3"
              style={{ color: "#2D5010", fontSize: "13px", letterSpacing: "1.5px" }}
            >
              SÍGUENOS
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { Icon: Facebook, label: "/IncubaCocina", href: "#" },
                { Icon: Instagram, label: "@incubacocinaescuela", href: "#" },
                { Icon: Music2, label: "@incubacocinaescuela", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
                  style={{
                    background: "#EAF7D0",
                    border: "1px solid #A8E060",
                    color: "#2D5010",
                    fontSize: "13px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#A8E060";
                    e.currentTarget.style.color = "#1A3A0A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#EAF7D0";
                    e.currentTarget.style.color = "#2D5010";
                  }}
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL WIDTH MAP */}
      <div className="w-full h-[400px] lg:h-[450px] reveal mt-16 lg:mt-20">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.936573887019!2d-77.06730392501607!3d-11.979051888251642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce3f2023a9a3%3A0xc3f9547d2f9d14fc!2sJr.%20Neptuno%20102%2C%20Los%20Olivos%2015301!5e0!3m2!1ses-419!2spe!4v1715456208940!5m2!1ses-419!2spe" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Incuba Cocina"
        />
      </div>
    </section>
  );
}
