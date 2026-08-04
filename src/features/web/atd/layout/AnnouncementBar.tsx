'use client'

import { useEffect, useState } from "react";

import { Sparkles } from "lucide-react";

const messages = [
  "🚀 Lanzamiento: 50% OFF en todos los programas — por tiempo limitado",
  "🎁 Acceso GRATIS por 7 días al Plan PRO — Sin tarjeta requerida",
  "💎 Los primeros 500 alumnos reciben ATD Complete Suite de regalo",
];

const AnnouncementBar = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 5000);

    
return () => clearInterval(t);
  }, []);
  
return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-glow to-secondary text-primary-foreground">
      <div className="container flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium">
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <span key={i} className="animate-fade-up">{messages[i]}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
