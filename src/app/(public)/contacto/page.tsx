import React from 'react'
import { MapPin, Phone, Mail, FileText } from 'lucide-react'

export const metadata = {
  title: 'Contacto | IFSEC Group',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto pt-28">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Contáctanos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nuestro equipo de expertos está listo para asesorarte. Escríbenos y un especialista se pondrá en contacto contigo a la brevedad.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-2 md:p-4">
        
        {/* Información de Contacto */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Información Corporativa</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[var(--web-primary)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <strong className="block text-gray-900 text-lg mb-1">Ubicación Principal</strong>
                  <span className="text-gray-600 leading-relaxed block">Callao, Callao, Bellavista.<br/>Francisco Pizarro 312</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[var(--web-primary)]">
                  <Phone size={24} />
                </div>
                <div>
                  <strong className="block text-gray-900 text-lg mb-1">Teléfono / WhatsApp</strong>
                  <a href="https://wa.me/51965052858" target="_blank" rel="noreferrer" className="text-[var(--web-primary)] font-semibold hover:underline">
                    965 052 858
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[var(--web-primary)]">
                  <Mail size={24} />
                </div>
                <div>
                  <strong className="block text-gray-900 text-lg mb-1">Correo Electrónico</strong>
                  <a href="mailto:comercial@ifsec.pe" className="text-[var(--web-primary)] font-semibold hover:underline">
                    comercial@ifsec.pe
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[var(--web-primary)]">
                  <FileText size={24} />
                </div>
                <div>
                  <strong className="block text-gray-900 text-lg mb-1">RUC</strong>
                  <span className="text-gray-600">20514508179</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
             <div className="w-full h-48 bg-gray-200 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
              <img src="/images/servicios/simulacros/simulacro-antamina/1-p1083125.jpg" alt="Sede IFSEC Group" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Formulario */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Envíanos un Mensaje</h2>
          <form className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Nombre completo *</label>
                <input type="text" placeholder="Ej. Juan Pérez" className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--web-primary)] focus:bg-white transition-all" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Correo electrónico *</label>
                <input type="email" placeholder="Ej. juan@empresa.com" className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--web-primary)] focus:bg-white transition-all" required />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Asunto</label>
              <input type="text" placeholder="¿En qué podemos ayudarte?" className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--web-primary)] focus:bg-white transition-all" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Mensaje *</label>
              <textarea placeholder="Cuéntanos más sobre tus requerimientos..." rows={5} className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--web-primary)] focus:bg-white transition-all resize-none" required></textarea>
            </div>
            
            <button type="submit" className="mt-4 bg-[var(--web-primary)] text-white font-bold py-4 px-8 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-[0_4px_14px_rgba(37,146,127,0.4)]">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
