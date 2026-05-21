export function Story() {
  return (
    <section id="nosotros" className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="relative reveal">
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 w-full h-full rounded-[20px]"
            style={{ background: "#EAF7D0" }}
          />
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{ border: "2px solid #A8E060" }}
          >
            <div
              className="aspect-[4/5]"
              role="img"
              aria-label="Equipo de Incuba Cocina enseñando"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=1000&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 p-6 pt-24"
              style={{
                background:
                  "linear-gradient(to top, #FFFFFF 10%, rgba(255,255,255,0.85) 60%, transparent)",
              }}
            >
              <p
                className="font-display italic"
                style={{ color: "#2D5010", fontSize: "20px", lineHeight: 1.4 }}
              >
                &quot;¿Por qué tantas personas saben cocinar bien, pero no logran
                vivir de ello?&quot;
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="reveal">
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-wider"
            style={{ background: "#EAF7D0", color: "#2D5010" }}
          >
            NUESTRA HISTORIA
          </span>
          <h2
            className="font-display font-bold mt-5"
            style={{ color: "#1A3A0A", fontSize: "clamp(28px, 3.6vw, 38px)", lineHeight: 1.2 }}
          >
            Nacimos para transformar el talento en ingresos reales
          </h2>

          <div className="mt-6 space-y-4" style={{ color: "#4A7018", fontSize: "15px", lineHeight: 1.8 }}>
            <p>
              Incuba Cocina nace en Los Olivos como respuesta a una realidad
              que vimos repetirse: cocineros con un talento enorme atrapados en
              empleos mal pagados o sin saber cómo monetizar su pasión.
            </p>
            <p>
              Diseñamos un método que combina recetas probadas, costeo,
              marketing y mentoría — todo condensado en cursos cortos y
              prácticos que puedes aplicar al día siguiente.
            </p>
            <p>
              Hoy, cientos de alumnos venden makis, postres, brasas y platos
              caseros desde sus propias cocinas, generando ingresos reales y
              construyendo marcas con identidad propia.
            </p>
          </div>

          <ol
            className="mt-10 relative space-y-6"
            style={{ borderLeft: "2px solid #A8E060", paddingLeft: "24px" }}
          >
            {[
              { y: "2019", t: "Nace la primera escuela en Los Olivos." },
              { y: "2022", t: "Más de 250 alumnos emprenden su negocio." },
              { y: "2025", t: "Comunidad activa con +500 cocineros." },
            ].map((m) => (
              <li key={m.y} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full"
                  style={{ background: "#A8E060", boxShadow: "0 0 0 4px #EAF7D0" }}
                />
                <div style={{ color: "#1A3A0A", fontSize: "13px" }}>
                  <span className="font-bold">{m.y}</span> — {m.t}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
