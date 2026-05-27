'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Glasses, Smartphone, Eye, Sparkles, X } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

const experiences = [
    {
        title: "Inmersión Educativa",
        description: "Visualiza proyectos educativos en 360° con precisión milimétrica.",
        bg: getAssetPath("galeria/MODELAMIENTOCOLEGIOSUNIVERSIDADES.jpeg"),
        qr: getAssetPath("qr/qr1.jpeg"),
        category: "Realidad Virtual"
    },
    {
        title: "Gemelos Digitales",
        description: "Supervisa el avance de obra real mediante gemelos digitales interactivos.",
        bg: getAssetPath("galeria/ImplementaciongemelosdigitalesBIMobrareal.jpeg"),
        qr: getAssetPath("qr/qr2.jpeg"),
        category: "Realidad Aumentada"
    },
    {
        title: "Diseño Moderno",
        description: "Recorre espacios diseñados bajo estándares BIM de alta eficiencia.",
        bg: getAssetPath("galeria/modernointegrajuegocirculacionconfort.jpeg"),
        qr: getAssetPath("qr/qr3.jpeg"),
        category: "360° View"
    },
    {
        title: "Supervisión Técnica",
        description: "Validación de sistemas pre-instalación mediante visualización avanzada.",
        bg: getAssetPath("galeria/Supervisioncampopreinstalacionsistemas.jpeg"),
        qr: getAssetPath("qr/qr4.jpeg"),
        category: "VR Proyectada"
    }
];

export function VRExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedQR, setSelectedQR] = useState<{ qr: string; title: string } | null>(null);

    return (
        <section id="experiencias" ref={ref} className="relative py-10 lg:py-14 overflow-hidden bg-secondary">
            {/* Immersive Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-3"
                    >
                        <Glasses className="w-3 h-3" />
                        Experiencia Inmersiva
                    </motion.div>

                    <h2 className="font-display text-2xl md:text-4xl font-black text-primary mb-3 leading-tight tracking-tighter">
                        Supervisa en <span className="text-gradient-orange">Realidad Digital</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto text-base font-medium leading-relaxed">
                        Escanea los códigos QR para acceder a vistas 360° y experiencias de realidad virtual directamente en tu dispositivo.
                    </p>
                </motion.div>

                {/* Experience Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.08 }}
                            className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-primary cursor-pointer"
                            onClick={() => setSelectedQR({ qr: exp.qr, title: exp.title })}
                        >
                            {/* Background Image */}
                            <img
                                src={exp.bg}
                                alt={exp.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

                            {/* QR Overlay (Default State) */}
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0"
                            >
                                <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-2xl mb-4 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                                    <img src={exp.qr} alt="QR Code" className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem]" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-3">
                                    <Smartphone className="w-3 h-3" />
                                    Escanéame y Supervisa
                                </div>
                                <h3 className="text-lg font-black text-white text-center leading-tight">
                                    {exp.title}
                                </h3>
                            </div>

                            {/* Info Overlay (Hover State) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 text-white">
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit mb-3">
                                    {exp.category}
                                </span>
                                <h3 className="text-xl font-black mb-3 leading-tight">
                                    {exp.title}
                                </h3>
                                <p className="text-white/60 font-medium leading-relaxed mb-4 text-sm">
                                    {exp.description}
                                </p>
                                <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-2xl">
                                    <Eye className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/20 rounded-2xl transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal para QR ampliado */}
            <AnimatePresence>
                {selectedQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedQR(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative flex flex-col items-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedQR(null)}
                                className="absolute -top-14 right-0 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="bg-white p-6 rounded-[2rem] shadow-2xl">
                                <img
                                    src={selectedQR.qr}
                                    alt={`QR - ${selectedQR.title}`}
                                    className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-xl"
                                />
                            </div>
                            <p className="text-white text-xl font-black text-center">
                                {selectedQR.title}
                            </p>
                            <p className="text-white/50 text-sm font-medium">
                                Escanea el código QR con tu dispositivo
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
