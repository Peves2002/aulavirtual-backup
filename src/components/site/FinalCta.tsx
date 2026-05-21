"use client";

export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        background: "linear-gradient(135deg, #EAF7D0 0%, #F7FBF0 100%)",
        padding: "100px 20px",
      }}
    >
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "#A8E060", opacity: 0.15 }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: "#A8E060", opacity: 0.15 }}
      />

      <div className="relative max-w-3xl mx-auto reveal">
        <p
          className="text-[11px] font-semibold mb-4"
          style={{ color: "#5A9020", letterSpacing: "3px" }}
        >
          TRANSFORMA TU PASIÓN EN INGRESOS
        </p>
        <h2
          className="font-display font-bold"
          style={{ color: "#1A3A0A", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.1 }}
        >
          Tu negocio gastronómico
          <br />
          <span style={{ color: "#5A9020" }}>empieza aquí.</span>
        </h2>
        <p
          className="font-display italic mt-4"
          style={{ color: "#A8E060", fontSize: "22px" }}
        >
          Aprende y Emprende
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center rounded-full font-bold transition-all"
            style={{
              background: "#A8E060",
              color: "#1A3A0A",
              padding: "16px 36px",
              boxShadow: "0 8px 24px rgba(168,224,96,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5A9020";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#A8E060";
              e.currentTarget.style.color = "#1A3A0A";
              e.currentTarget.style.transform = "none";
            }}
          >
            Ver Cursos Ahora
          </a>
          <a
            href="https://wa.me/51953822677"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-semibold transition-colors"
            style={{
              border: "2px solid #2D5010",
              color: "#2D5010",
              padding: "14px 32px",
              background: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EAF7D0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
