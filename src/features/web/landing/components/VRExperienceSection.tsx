'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Glasses, Smartphone, Eye, Sparkles } from "lucide-react";
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

    return (
        <section id="experiencias" ref={ref} className="relative py-20 lg:py-32 overflow-hidden bg-secondary">
            {/* Immersive Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8"
                    >
                        <Glasses className="w-4 h-4" />
                        Experiencia Inmersiva
                    </motion.div>

                    <h2 className="font-display text-3xl md:text-5xl font-black text-primary mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
                        Supervisa en <br />
                        <span className="text-gradient-orange">Realidad Digital</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Escanea los códigos QR para acceder a vistas 360° y experiencias de realidad virtual directamente en tu dispositivo.
                    </p>
                </motion.div>

                {/* Experience Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="group relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl bg-primary"
                        >
                            {/* Background Image */}
                            <img
                                src={exp.bg}
                                alt={exp.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

                            {/* QR Overlay (Default State) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 group-hover:opacity-0">
                                <div className="w-48 h-48 bg-white p-4 rounded-[2rem] shadow-2xl mb-6 relative overflow-hidden">
                                    <img src={exp.qr} alt="QR Code" className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem]" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Smartphone className="w-3 h-3" />
                                    Escanéame y Supervisa
                                </div>
                                <h3 className="text-2xl font-black text-white text-center leading-tight">
                                    {exp.title}
                                </h3>
                            </div>

                            {/* Info Overlay (Hover State) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 text-white">
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit mb-4">
                                    {exp.category}
                                </span>
                                <h3 className="text-3xl font-black mb-4 leading-tight">
                                    {exp.title}
                                </h3>
                                <p className="text-white/60 font-medium leading-relaxed mb-6">
                                    {exp.description}
                                </p>
                                <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-2xl">
                                    <Eye className="w-7 h-7" />
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/20 rounded-[3rem] transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
