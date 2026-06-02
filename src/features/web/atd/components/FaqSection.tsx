'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#08080e", padding: "6rem 0" }}>
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(343,84%,52%)", marginBottom: "0.75rem" }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,2.25rem)", fontWeight: 800, color: "rgba(255,255,255,0.95)", margin: 0 }}>
            Preguntas frecuentes
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
            Resuelve tus dudas en 30 segundos.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: "0.75rem",
                  border: `1px solid ${isOpen ? "rgba(220,38,38,0.35)" : "rgba(255,255,255,0.08)"}`,
                  background: isOpen ? "rgba(220,38,38,0.06)" : "rgba(255,255,255,0.04)",
                  overflow: "hidden",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "1rem",
                    color: isOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{
                    flexShrink: 0,
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    border: `1px solid ${isOpen ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.12)"}`,
                    background: isOpen ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                  }}>
                    <ChevronDown
                      size={14}
                      style={{
                        color: isOpen ? "hsl(343,84%,62%)" : "rgba(255,255,255,0.4)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s, color 0.2s",
                      }}
                    />
                  </span>
                </button>

                <div style={{
                  maxHeight: isOpen ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <p style={{
                    margin: 0,
                    padding: "0 1.25rem 1.1rem",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "0.85rem",
                  }}>
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
