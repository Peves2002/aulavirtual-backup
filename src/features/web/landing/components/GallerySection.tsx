'use client'

import { useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { X, Maximize2, Camera, Sparkles } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

const galleryImages = [
    {
        src: getAssetPath("galeria/10COLELGIOSDISENADOSBAJOESTANDARESBIM.jpeg"),
        title: "Estándares BIM en Colegios",
        category: "Educación"
    },
    {
        src: getAssetPath("galeria/DISENOPROYECTOSBIM.jpeg"),
        title: "Diseño de Proyectos BIM",
        category: "Diseño"
    },
    {
        src: getAssetPath("galeria/DisenoEficienteEntornosEducativos.jpeg"),
        title: "Entornos Educativos Eficientes",
        category: "Arquitectura"
    },
    {
        src: getAssetPath("galeria/ImplementaciongemelosdigitalesBIMobrareal.jpeg"),
        title: "Gemelos Digitales en Obra",
        category: "Construcción"
    },
    {
        src: getAssetPath("galeria/MODELAMIENTOCOLEGIOSUNIVERSIDADES.jpeg"),
        title: "Modelamiento Universitario",
        category: "Educación"
    },
    {
        src: getAssetPath("galeria/PresentacionBIMmedianteRVprivada.jpeg"),
        title: "Presentación BIM en VR",
        category: "Tecnología"
    },
    {
        src: getAssetPath("galeria/Prevencionmedianterevisioninterferencias.jpeg"),
        title: "Prevención de Interferencias",
        category: "Ingeniería"
    },
    {
        src: getAssetPath("galeria/ProcesosBIMauditablestrazablesalineados.jpeg"),
        title: "Procesos BIM Auditables",
        category: "Gestión"
    },
    {
        src: getAssetPath("galeria/Reconocimientodigitabasadoencondicionesreales..jpeg"),
        title: "Reconocimiento Digital Real",
        category: "Tecnología"
    },
    {
        src: getAssetPath("galeria/Supervisioncampopreinstalacionsistemas.jpeg"),
        title: "Supervisión de Campo",
        category: "Inspección"
    },
    {
        src: getAssetPath("galeria/VERIFICACIONACABADOSGEMELODIGITAL.jpeg"),
        title: "Verificación de Acabados",
        category: "Calidad"
    },
    {
        src: getAssetPath("galeria/masquemodelosestandaresBIM.jpeg"),
        title: "Estándares de Excelencia",
        category: "BIM"
    },
    {
        src: getAssetPath("galeria/modernointegrajuegocirculacionconfort.jpeg"),
        title: "Diseño Moderno e Integrado",
        category: "Arquitectura"
    }
];

export function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="galeria" ref={ref} className="relative py-20 lg:py-32 overflow-hidden bg-white">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />

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
                        <Camera className="w-4 h-4" />
                        Galería de Excelencia
                    </motion.div>

                    <h2 className="font-display text-3xl md:text-5xl font-black text-primary mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
                        Nuestra <br />
                        <span className="text-gradient-orange">Evidencia Técnica</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                        Una inmersión visual en los procesos y resultados que definen el estándar de Elite Engineering.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {galleryImages.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: idx * 0.05 }}
                            className="break-inside-avoid"
                        >
                            <div
                                className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-primary shadow-xl"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                                    loading="lazy"
                                />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">
                                        {image.category}
                                    </span>
                                    <h3 className="text-xl font-black text-white leading-tight mb-4">
                                        {image.title}
                                    </h3>
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                        <Maximize2 className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Hover Border Glow */}
                                <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full h-auto max-h-[85vh] overflow-hidden rounded-[3rem] shadow-2xl bg-white p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-[2.5rem]"
                            />
                            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-1 bg-primary/80 backdrop-blur-md p-6 rounded-[1.5rem] text-white">
                                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60">
                                    {selectedImage.category}
                                </span>
                                <h4 className="text-xl font-black tracking-tighter leading-none">
                                    {selectedImage.title}
                                </h4>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
