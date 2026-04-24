'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Maximize2, Filter, Layers, Box, Globe, X } from "lucide-react";
import { Button } from "./ui/button";
import { getAssetPath } from "@/lib/assets";

const categories = [
    { id: "all", label: "Todos", icon: Filter },
    { id: "bim", label: "BIM", icon: Layers },
    { id: "3d", label: "Modelado 3D", icon: Box },
    { id: "vr", label: "VR / 360°", icon: Globe },
];

const projects = [
    {
        id: 1,
        title: "Implementación BIM en Entidades Públicas",
        subtitle: "Cajamarca - Gestión Pública",
        category: "bim",
        image: getAssetPath("trayectoria/municajamarca.jpeg"),
        type: "image",
        description: "Asesoría y formación en metodologías BIM para la mejora de la gestión de proyectos de inversión pública.",
    },
    {
        id: 2,
        title: "Supervicion de Proyectos BIM con Realidad Virtual y Aumentada",
        subtitle: "Viviendas y Edificaciones",
        category: "bim",
        image: getAssetPath("trayectoria/implementaciondeempresas.jpeg"),
        type: "image",
        description: "Desarrollo de modelos detallados para coordinación de especialidades y optimización de recursos.",
    },
    {
        id: 3,
        title: "Realidad Virtual Inmersiva",
        subtitle: "Simulación de Proyectos",
        category: "vr",
        image: getAssetPath("trayectoria/vizualizacionrealidadvirtual.mp4"),
        type: "video",
        description: "Recorridos virtuales interactivos que permiten a los clientes experimentar sus proyectos antes de la construcción.",
    },
    {
        id: 4,
        title: "Levantamiento con Drones",
        subtitle: "Fotogrametría y Topografía",
        category: "3d",
        image: getAssetPath("trayectoria/Vueloscondrones.jpeg"),
        type: "image",
        description: "Captura de datos precisos en campo para la creación de gemelos digitales y modelos de terreno.",
    },
    {
        id: 5,
        title: "Capacitación Certificada",
        subtitle: "Metodologías BIM",
        category: "bim",
        image: getAssetPath("trayectoria/Capacitacionbim.jpeg"),
        type: "image",
        description: "Entrenamiento especializado para profesionales y estudiantes en el uso de herramientas de diseño y gestión.",
    },
    {
        id: 6,
        title: "Comprometidos con el Desarrollo de Estudiantes",
        subtitle: "Alianza Académica",
        category: "bim",
        image: getAssetPath("trayectoria/universidadcajamarca.jpeg"),
        type: "image",
        description: "Colaboración estratégica con la Universidad Nacional de Cajamarca para el fomento de la innovación.",
    },
    {
        id: 7,
        title: "Gestión Entidades Públicas",
        subtitle: "Transformación Digital",
        category: "bim",
        image: getAssetPath("trayectoria/entidadespublicas.jpeg"),
        type: "image",
        description: "Apoyo técnico en la adopción de flujos de trabajo colaborativos y estándares internacionales.",
    },
    {
        id: 8,
        title: "Certificados y Trabajos con Licencias Originales",
        subtitle: "Cálculo y Detallado",
        category: "3d",
        image: getAssetPath("trayectoria/cype.jpeg"),
        type: "image",
        description: "Uso de software avanzado para el cálculo estructural y generación de planos técnicos precisos.",
    },
    {
        id: 9,
        title: "Conferencias de Ingeniería",
        subtitle: "Difusión de Conocimiento",
        category: "bim",
        image: getAssetPath("trayectoria/charlasenapoyo.jpeg"),
        type: "image",
        description: "Participación activa en foros y seminarios compartiendo experiencias reales de implementación.",
    },
    {
        id: 10,
        title: "Formación Universitaria",
        subtitle: "Alcance Nacional",
        category: "bim",
        image: getAssetPath("trayectoria/capacitaciondiferentesuniversidades.jpeg"),
        type: "image",
        description: "Programas de capacitación técnica en diversas regiones para el cierre de brechas tecnológicas.",
    },
];

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedMedia, setSelectedMedia] = useState<{url: string, type: string} | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const filteredProjects = projects.filter(
        (project) => activeCategory === "all" || project.category === activeCategory
    );

    return (
        <section id="portafolio" ref={ref} className="relative py-20 lg:py-32 overflow-hidden bg-secondary/20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                        Nuestra Trayectoria
                    </motion.div>

                    <h2 className="font-display text-3xl md:text-5xl font-black text-primary mb-8 tracking-tighter">
                        Ingeniería en <span className="text-gradient-orange">Acción</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                        Un vistazo a los desafíos que hemos superado y las visiones que hemos materializado a lo largo del país.
                    </p>
                </motion.div>

                {/* Modern Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-24">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${activeCategory === category.id
                                ? "bg-primary text-white shadow-2xl scale-105"
                                : "bg-white/50 text-slate-400 hover:text-primary border border-slate-100"
                                }`}
                        >
                            <category.icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-primary' : ''}`} />
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                className="break-inside-avoid"
                            >
                                <div 
                                    className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-primary cursor-pointer"
                                    onClick={() => setSelectedMedia({ url: project.image, type: project.type })}
                                >
                                    {/* Media Container */}
                                    <div className="relative overflow-hidden">
                                        {project.type === "video" ? (
                                            <video
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                suppressHydrationWarning
                                                src={project.image}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-40"
                                            />
                                        ) : (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-40"
                                            />
                                        )}

                                        {/* Floating Content Overlay */}
                                        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="space-y-4">
                                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                    {categories.find(c => c.id === project.category)?.label}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-white/60 text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {project.description}
                                                </p>
                                                <div className="pt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                    <Button 
                                                        className="rounded-2xl bg-white text-primary font-black hover:bg-accent hover:text-white transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Detalles
                                                    </Button>
                                                    <div className="w-12 h-12 rounded-2xl glass-frost flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors cursor-pointer">
                                                        <Maximize2 className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] transition-all duration-500" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal para agrandar imagen/video */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMedia(null)}
                                className="absolute -top-16 right-0 md:-right-16 md:-top-0 text-white/70 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            {selectedMedia.type === "video" ? (
                                <video
                                    autoPlay
                                    controls
                                    className="max-w-full max-h-[85vh] rounded-[2rem] shadow-2xl"
                                    src={selectedMedia.url}
                                />
                            ) : (
                                <img
                                    src={selectedMedia.url}
                                    alt="Vista ampliada"
                                    className="max-w-full max-h-[85vh] object-contain rounded-[2rem] shadow-2xl"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
