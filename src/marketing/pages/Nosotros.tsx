'use client'

import Link from "next/link"

import { motion } from "framer-motion";

import { Trophy, Target, Rocket, Diamond, Zap, Users, BookOpen, ArrowRight } from "lucide-react";

import { SubpageLayout, SectionBadge, HexBg } from "@/marketing/components/site/SubpageLayout";

const Nosotros = () => {
  return (
    <SubpageLayout title="Nosotros | Grupo Corpus" breadcrumb="Nosotros">
      <section className="relative overflow-hidden pt-16 pb-20 bg-gc-gray-perla">
        <HexBg />
        <div className="gc-container-custom relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionBadge>
              <BookOpen size={12} className="mr-2" /> Nuestra Historia
            </SectionBadge>
            <h1 className="mt-5 font-gc-display font-extrabold text-4xl md:text-6xl leading-tight max-w-4xl text-gc-black">
              Liderando la formación <span className="text-gc-blue-corp">técnica eléctrica</span> en el Perú
            </h1>
            <p className="mt-5 text-lg text-gc-gray-medium max-w-3xl">
              Nacimos con la misión de transformar la educación técnica, combinando la experiencia de ingenieros en campo con las herramientas digitales más potentes de la industria.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="gc-section-padding bg-white">
        <div className="gc-container-custom grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=90"
                alt="Nosotros - Grupo Corpus"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gc-black/60 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gc-gray-light flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp">
                <Trophy size={20} />
              </div>
              <div>
                <div className="font-bold text-gc-black text-sm">Líder Regional</div>
                <div className="text-[10px] text-gc-gray-medium font-bold uppercase tracking-wider">Lima, Perú</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-gc-display font-extrabold text-gc-black mb-6">Un enfoque práctico para desafíos reales</h2>
            <p className="text-lg text-gc-gray-medium mb-8 leading-relaxed">
              En Grupo Corpus, entendemos que la ingeniería no se aprende solo con teoría. Por eso, todos nuestros programas están diseñados por profesionales que enfrentan desafíos reales en el sector industrial y minero.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-gc-gray-perla p-6 rounded-2xl border border-gray-200 group hover:border-gc-blue-corp transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp mb-4">
                  <Target size={24} />
                </div>
                <h4 className="font-gc-display font-bold text-gc-black mb-2">Visión</h4>
                <p className="text-sm text-gc-gray-medium">Ser el referente latinoamericano en capacitación de software especializado para ingeniería eléctrica.</p>
              </div>
              <div className="bg-gc-gray-perla p-6 rounded-2xl border border-gray-200 group hover:border-gc-blue-corp transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gc-blue-corp/10 flex items-center justify-center text-gc-blue-corp mb-4">
                  <Rocket size={24} />
                </div>
                <h4 className="font-gc-display font-bold text-gc-black mb-2">Misión</h4>
                <p className="text-sm text-gc-gray-medium">Empoderar a técnicos e ingenieros con habilidades digitales que aceleren su crecimiento profesional.</p>
              </div>
            </div>

            <Link href="/cursos" className="gc-btn-primary inline-flex items-center gap-2 px-8 py-4">
              Ver programas académicos <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section className="gc-section-padding bg-gc-gray-perla">
        <div className="gc-container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Nuestros Valores</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-gc-display font-extrabold text-gc-black mt-4">Lo que nos define</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Excelencia Técnica", desc: "Buscamos la máxima precisión en cada plano y cálculo enseñado.", icon: <Diamond size={32} /> },
              { title: "Innovación Constante", desc: "Actualizamos nuestro temario con las últimas versiones de software.", icon: <Zap size={32} /> },
              { title: "Compromiso", desc: "Acompañamos al alumno hasta que domine las herramientas por completo.", icon: <Users size={32} /> },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gc-gray-light hover:shadow-xl transition-all text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gc-gray-perla text-gc-blue-corp flex items-center justify-center mb-6 group-hover:bg-gc-blue-corp group-hover:text-white transition-colors duration-300">
                  {v.icon}
                </div>
                <h3 className="text-xl font-gc-display font-bold text-gc-black mb-3">{v.title}</h3>
                <p className="text-gc-gray-medium text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
};

export default Nosotros;
