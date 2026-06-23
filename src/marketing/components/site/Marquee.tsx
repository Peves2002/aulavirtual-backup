'use client'

const row1 = ["AutoCAD Electrical", "DIALux evo", "AutoCAD", "Revit MEP", "MS Project", "S10 Costos"];
const row2 = ["Norma CNE", "Norma NEC", "IEC Standards", "NFPA 70", "IEEE Standards", "RNE Perú"];

const Pill = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-3.5 bg-white border border-gc-gray-light rounded-full px-8 py-4 font-gc-sans font-bold text-xl md:text-2xl whitespace-nowrap hover:border-gc-blue-corp hover:text-gc-blue-corp transition-all duration-300 shadow-md">
    <span className="w-3.5 h-3.5 rounded-full bg-gc-blue-corp shrink-0" />
    {text}
  </div>
);

export const Marquee = () => (
  <section className="py-20 overflow-hidden bg-gc-gray-perla">
    <div className="gc-container-custom mb-10">
      <p className="text-center font-bold text-xs text-gc-gray-medium uppercase tracking-[0.2em]">Normativas y Herramientas Especializadas</p>
    </div>
    <div className="space-y-8">
      <div className="flex overflow-hidden py-3">
        <div className="flex gap-8 animate-marquee shrink-0 pr-8">
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => <Pill key={i} text={t} />)}
        </div>
      </div>
      <div className="flex overflow-hidden py-3">
        <div className="flex gap-8 animate-marquee-reverse shrink-0 pr-8">
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => <Pill key={i} text={t} />)}
        </div>
      </div>
    </div>
  </section>
);
