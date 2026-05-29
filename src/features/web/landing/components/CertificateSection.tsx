'use client'

import { motion } from "framer-motion"

import { CheckCircle, ShieldCheck, Zap } from "lucide-react"

import { getAssetPath } from "@/lib/assets"

import { Button } from "./ui/button"

export function CertificateSection() {
    return (
        <section className="relative py-10 lg:py-14 overflow-hidden bg-white border-none">
            {/* Immersive Background Decor */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[180px] rounded-full pointer-events-none -mr-40" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -ml-20" />

            {/* Floating Nano-particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -60, 0],
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Right Column - Immersive Device/Asset */}
                    <div className="order-2 lg:order-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            {/* Anti-Gravity Certificate Card */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [-1, 1, -1],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative z-10"
                            >
                                <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-100 p-3">
                                    <img
                                        src={getAssetPath("img/certificado.png")}
                                        alt="Elite Professional Certification"
                                        className="w-full h-auto rounded-xl shadow-lg"
                                    />
                                    {/* Glassmorphism Flare */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-white/10 pointer-events-none" />
                                </div>

                                {/* Verification Badge */}
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-4 -right-3 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 rounded-full glass-modern border-none p-3 shadow-2xl flex items-center justify-center group z-20"
                                >
                                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-xl">
                                        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Aura Background */}
                            <div className="absolute -inset-20 bg-primary/5 blur-[100px] rounded-full -z-10" />
                        </motion.div>
                    </div>

                    {/* Left Column - Content */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-black text-xs uppercase tracking-[0.5em] mb-3"
                            >
                                Respaldo de Élite
                            </motion.div>

                            <h2 className="font-display text-2xl md:text-4xl font-black text-primary mb-4 leading-tight tracking-tighter">
                                Certificación <span className="text-gradient-orange">Verified</span>
                            </h2>

                            <p className="text-slate-500 text-base font-medium leading-relaxed mb-6">
                                Valida tu maestría técnica con un título respaldado por las instituciones de ingeniería más prestigiosas de la región.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Validez Global", desc: "Aceptado en las constructoras líderes del mercado internacional." },
                                    { title: "Smart-QR Verification", desc: "Validación digital instantánea con trazabilidad total." },
                                    { title: "Standard BIM ISO Foundation", desc: "Garantía de cumplimiento con normativas internacionales." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-500">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-primary mb-0.5">{item.title}</h4>
                                            <p className="text-slate-500 font-bold">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button size="lg" className="h-12 px-8 rounded-xl bg-primary hover:bg-orange-600 text-white font-black text-sm shadow-2xl glow-orange-strong group">
                                    <Zap className="w-4 h-4 mr-2 group-hover:fill-white transition-all" />
                                    Descargar Brochure Corporativo
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
