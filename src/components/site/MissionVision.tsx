import { Target, Eye } from "lucide-react";

const items = [
  {
    Icon: Target,
    title: "Misión",
    text: "Formar emprendedores gastronómicos capaces de transformar su talento en negocios rentables, mediante cursos prácticos, herramientas reales y acompañamiento cercano.",
  },
  {
    Icon: Eye,
    title: "Visión",
    text: "Ser la escuela de cocina emprendedora referente del Perú, reconocida por impulsar a miles de personas a vivir dignamente de su pasión por la cocina.",
  },
];

export function MissionVision() {
  return (
    <section className="py-24" style={{ background: "#F7FBF0" }}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <h2
          className="font-display font-bold text-center reveal"
          style={{ color: "#1A3A0A", fontSize: "clamp(28px, 3.8vw, 40px)" }}
        >
          Nuestro propósito
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {items.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="reveal p-9"
              style={{
                background: "#FFFFFF",
                borderLeft: "4px solid #A8E060",
                borderRadius: "0 16px 16px 0",
                boxShadow: "0 8px 32px rgba(90,144,32,0.10)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "#EAF7D0" }}
              >
                <Icon size={22} color="#2D5010" />
              </div>
              <h3
                className="font-display font-bold mt-5"
                style={{ color: "#2D5010", fontSize: "22px" }}
              >
                {title}
              </h3>
              <p
                className="mt-3"
                style={{ color: "#4A7018", fontSize: "15px", lineHeight: 1.8 }}
              >
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
