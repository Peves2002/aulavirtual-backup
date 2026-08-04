'use client'

import { useState } from 'react'

import { Check } from 'lucide-react'

export default function AdvancedSpecializationsTabs({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')

  const tab1Label = data?.tab1_label || 'Habilidades Transversales'
  const tab1Desc = data?.tab1_descripcion || 'Desarrolla el liderazgo que el mundo digital exige: aquel que integra la agilidad tecnológica, diseña estrategias con visión de futuro y toma decisiones con un impacto positivo. Más que habilidades, adoptarás la mentalidad que te permite dirigir la transformación, no solo participar en ella. Es el complemento que transita de profesional a líder de referencia.'
  const tab1Items = (data?.tab1_items && data.tab1_items.length > 0) ? data.tab1_items : ['IA & Machine Learning', 'Project Management & Agile', 'Emprendimiento', 'Innovation Strategy', 'Data-Driven Business Analytics', 'ESG & Sustainability']

  const tab2Label = data?.tab2_label || 'Habilidades de Especialidad'
  const tab2Desc = data?.tab2_descripcion || 'Pensadas para profundizar en áreas estratégicas y potenciar tu perfil técnico. Conviértete en el profesional de referencia que resuelve los desafíos más complejos de la industria y marca la diferencia en proyectos de alto impacto.'
  const tab2Items = (data?.tab2_items && data.tab2_items.length > 0) ? data.tab2_items : ['Digital Business Transformation', 'Product Management', 'Big Data Tools & Applications', 'DEI Strategy', 'International Markets', 'Fintech', 'Business Analytics & Data Science', 'Marketing Digital Avanzado']

  return (
    <>
      <div className="flex border-b border-gray-300">
        <button 
          onClick={() => setActiveTab('tab1')}
          className={`px-6 py-4 font-bold text-[14px] transition-colors ${
            activeTab === 'tab1' 
              ? 'bg-white text-gray-900 border-t-[3px] border-[#08479b]' 
              : 'bg-gray-200 text-gray-500 border-t-[3px] border-transparent hover:bg-gray-100'
          }`}
        >
          {tab1Label}
        </button>
        <button 
          onClick={() => setActiveTab('tab2')}
          className={`px-6 py-4 font-bold text-[14px] transition-colors ${
            activeTab === 'tab2' 
              ? 'bg-white text-gray-900 border-t-[3px] border-[#08479b]' 
              : 'bg-gray-200 text-gray-500 border-t-[3px] border-transparent hover:bg-gray-100'
          }`}
        >
          {tab2Label}
        </button>
      </div>

      <div className="bg-white p-8 md:p-12 border border-t-0 border-gray-200 min-h-[300px]">
        {activeTab === 'tab1' && (
           <div className="animate-in fade-in duration-300">
              {tab1Desc && (
                <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                  {tab1Desc}
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                 <ul className="space-y-5">
                    {tab1Items.slice(0, Math.ceil(tab1Items.length / 2)).map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-center">
                        <Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/>
                        <span className="text-[14px] text-gray-600">{item}</span>
                      </li>
                    ))}
                 </ul>
                 <ul className="space-y-5">
                    {tab1Items.slice(Math.ceil(tab1Items.length / 2)).map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-center">
                        <Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/>
                        <span className="text-[14px] text-gray-600">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        )}

        {activeTab === 'tab2' && (
           <div className="animate-in fade-in duration-300">
              {tab2Desc && (
                <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                  {tab2Desc}
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                 <ul className="space-y-5">
                    {tab2Items.slice(0, Math.ceil(tab2Items.length / 2)).map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-center">
                        <Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/>
                        <span className="text-[14px] text-gray-600">{item}</span>
                      </li>
                    ))}
                 </ul>
                 <ul className="space-y-5">
                    {tab2Items.slice(Math.ceil(tab2Items.length / 2)).map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-center">
                        <Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/>
                        <span className="text-[14px] text-gray-600">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        )}
      </div>
    </>
  )
}
