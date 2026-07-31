'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export default function AdvancedSpecializationsTabs() {
  const [activeTab, setActiveTab] = useState<'transversales' | 'especialidad'>('transversales')

  return (
    <>
      <div className="flex border-b border-gray-300">
        <button 
          onClick={() => setActiveTab('transversales')}
          className={`px-6 py-4 font-bold text-[14px] transition-colors ${
            activeTab === 'transversales' 
              ? 'bg-white text-gray-900 border-t-[3px] border-[#08479b]' 
              : 'bg-gray-200 text-gray-500 border-t-[3px] border-transparent hover:bg-gray-100'
          }`}
        >
          Habilidades Transversales
        </button>
        <button 
          onClick={() => setActiveTab('especialidad')}
          className={`px-6 py-4 font-bold text-[14px] transition-colors ${
            activeTab === 'especialidad' 
              ? 'bg-white text-gray-900 border-t-[3px] border-[#08479b]' 
              : 'bg-gray-200 text-gray-500 border-t-[3px] border-transparent hover:bg-gray-100'
          }`}
        >
          Habilidades de Especialidad
        </button>
      </div>

      <div className="bg-white p-8 md:p-12 border border-t-0 border-gray-200 min-h-[300px]">
        {activeTab === 'transversales' && (
           <div className="animate-in fade-in duration-300">
              <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                 <strong className="text-gray-900">Desarrolla el liderazgo que el mundo digital exige:</strong> aquel que integra la agilidad tecnológica, diseña estrategias con visión de futuro y toma decisiones con un impacto positivo. Más que habilidades, adoptarás la mentalidad que te permite dirigir la transformación, no solo participar en ella. Es el complemento que transita de profesional a líder de referencia.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                 <ul className="space-y-5">
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">IA & Machine Learning</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Project Management & Agile</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Emprendimiento</span></li>
                 </ul>
                 <ul className="space-y-5">
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Innovation Strategy</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Data-Driven Business Analytics</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">ESG & Sustainability</span></li>
                 </ul>
              </div>
           </div>
        )}

        {activeTab === 'especialidad' && (
           <div className="animate-in fade-in duration-300">
              <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                 Pensadas para profundizar en áreas estratégicas y potenciar tu perfil técnico. Conviértete en el profesional de referencia que resuelve los desafíos más complejos de la industria y marca la diferencia en proyectos de alto impacto.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                 <ul className="space-y-5">
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Digital Business Transformation</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Product Management</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Big Data Tools & Applications</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">DEI Strategy</span></li>
                 </ul>
                 <ul className="space-y-5">
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">International Markets</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Fintech</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Business Analytics & Data Science</span></li>
                    <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#08479b] shrink-0" strokeWidth={2.5}/><span className="text-[14px] text-gray-600">Marketing Digital Avanzado</span></li>
                 </ul>
              </div>
           </div>
        )}
      </div>
    </>
  )
}
