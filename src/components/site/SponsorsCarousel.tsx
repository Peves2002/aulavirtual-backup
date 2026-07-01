const sponsors = [
  { src: "/assets/respaldo/cel-logo.png", alt: "CEL" },
  { src: "/assets/respaldo/florida-global.png", alt: "Florida Global" },
  { src: "/assets/respaldo/incubagraria.png", alt: "Incubagraria" },
  { src: "/assets/respaldo/logo-proinnovate.png", alt: "ProInnóvate" },
  { src: "/assets/respaldo/mesa-trabajo.png", alt: "Mesa de Trabajo" },
  { src: "/assets/respaldo/ministerio-produccion.png", alt: "Ministerio de la Producción" },
];

export function SponsorsCarousel() {
  const marqueeLogos = [...sponsors, ...sponsors];

  return (
    <section
      className="pt-8 pb-8 lg:pt-20 lg:pb-14 relative overflow-hidden"
      style={{ backgroundColor: "#F7FBF0", backgroundImage: "radial-gradient(#d9f99d 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8E060] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5A9020] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-[#F7FBF0] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-[#F7FBF0] to-transparent z-10" />

        <div className="flex w-max animate-marquee">
          {marqueeLogos.map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="flex items-center justify-center shrink-0 px-8 lg:px-12">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-14 lg:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
