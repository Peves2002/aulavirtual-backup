'use client'

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

const whatsappIcon = "/images/grupo-corpus/logos/whatsapp.svg"
const logoImg = "/images/grupo-corpus/grupo-corpus-logo.png"

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  
return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-cyan-magenta z-[100]"
    />
  );
};

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/51956266147"
    target="_blank"
    rel="noopener"
    aria-label="Escríbenos por WhatsApp"
    className="group fixed bottom-6 right-6 z-50 flex items-center"
  >
    <span className="absolute right-14 mr-2 glass rounded-full px-4 py-2 text-sm font-sub font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition whitespace-nowrap pointer-events-none">
      ¿Tienes dudas? Escríbenos →
    </span>
    <span className="relative">
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring [animation-delay:1.5s]" />
      <span className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_10px_40px_rgba(16,185,129,0.5)]">
        <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8 brightness-0 invert" />
      </span>
    </span>
  </a>
);

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);

    window.addEventListener("scroll", onScroll, { passive: true });
    
return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-gc-blue-corp flex items-center justify-center text-white hover:scale-110 hover:bg-gc-blue-hover transition shadow-[0_10px_30px_rgba(26,67,169,0.5)]"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("gc-cookie-ok")) {
      const t = setTimeout(() => setShow(true), 1200);

      
return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("gc-cookie-ok", "1");
    setShow(false);
  };

  
return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-2xl glass-strong rounded-2xl p-4 z-40 flex flex-col sm:flex-row items-center gap-4"
        >
          <p className="text-sm text-gc-foreground/85 flex-1 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 text-electric" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><circle cx="11" cy="15" r="1" fill="currentColor"/>
            </svg>
            Usamos cookies para mejorar tu experiencia.
          </p>
          <div className="flex gap-2">
            <button onClick={accept} className="px-4 py-2 rounded-full text-sm border border-electric/40 hover:bg-electric/10 transition">Configurar</button>
            <button onClick={accept} className="btn-gradient text-white px-5 py-2 rounded-full text-sm font-semibold">Aceptar</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LoadingScreen = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 15);

    const timeout = setTimeout(() => setDone(true), 1800);

    
return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-gradient-to-tr from-white via-slate-50 to-slate-100 flex items-center justify-center flex-col"
        >
          <div className="relative">
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 bg-gc-blue-corp/5 blur-[120px] -z-10 rounded-full" />
            <div className="absolute inset-0 bg-[#cca353]/5 blur-[120px] -z-10 rounded-full translate-x-12 translate-y-12" />
            
            {/* Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 45 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 90, 
                damping: 14, 
                mass: 0.8,
                delay: 0.1 
              }}
              className="flex flex-col items-center"
            >
              <motion.img 
                src={logoImg} 
                alt="Grupo Corpus" 
                className="h-28 md:h-36 object-contain"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 2.8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Modern Light Loading Indicator */}
              <div className="mt-12 w-64 h-1.5 bg-slate-200/60 rounded-full overflow-hidden relative border border-slate-200/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-gc-blue-corp shadow-[0_2px_10px_rgba(26,35,126,0.25)]"
                />
              </div>
              
              <div className="mt-4 flex flex-col items-center gap-1.5">
                <span className="text-[9px] font-bold text-slate-400 tracking-[0.4em] uppercase">Iniciando Experiencia</span>
                <span className="text-xs font-black text-gc-blue-corp tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
