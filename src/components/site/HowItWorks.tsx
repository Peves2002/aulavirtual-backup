const steps = [
  {
    n: "01",
    t: "Elige tu curso",
    d: "Selecciona la especialidad que más te apasiona o que tiene más demanda en tu zona.",
  },
  {
    n: "02",
    t: "Aprende en vivo",
    d: "Clases prácticas con chef instructor, recetario profesional incluido y dudas resueltas en tiempo real.",
  },
  {
    n: "03",
    t: "Accede al material",
    d: "Descarga recetarios, fichas técnicas y grabaciones para repasar cuando quieras.",
  },
  {
    n: "04",
    t: "Empieza a vender",
    d: "Aplica todo desde el primer día. Nuestra comunidad y consultoría te acompañan.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h2
          className="font-display font-bold text-center reveal"
          style={{ color: "#1A3A0A", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15 }}
        >
          De cero a negocio{" "}
          <span style={{ color: "#5A9020" }}>en 4 pasos</span>
        </h2>

        <div className="relative mt-16">
          {/* Horizontal connector (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-6 left-[12%] right-[12%] border-t-2 border-dashed"
            style={{ borderColor: "#C8E890" }}
          />

          <div className="grid gap-8 lg:gap-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "#EAF7D0",
                    border: "2px solid #A8E060",
                  }}
                >
                  <span className="font-display font-bold text-[14px]" style={{ color: "#A8E060" }}>
                    {s.n}
                  </span>
                </div>
                <div
                  className="mt-6 w-full p-6 rounded-2xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #C8E890",
                    borderTop: "3px solid #A8E060",
                  }}
                >
                  <h3
                    className="font-display font-bold"
                    style={{ color: "#1A3A0A", fontSize: "18px" }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="mt-2"
                    style={{ color: "#4A7018", fontSize: "14px", lineHeight: 1.7 }}
                  >
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
