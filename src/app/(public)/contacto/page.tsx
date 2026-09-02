import React from 'react'

import { MapPin, Phone, Mail, FileText, Send, Clock, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Contacto | IFSEC Group',
  description: 'Comunícate con nuestro equipo corporativo para consultas, capacitaciones y servicios especializados.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-14 md:py-20 px-4 sm:px-6 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-3.5 py-1.5 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-full font-semibold text-xs mb-3 uppercase tracking-wider">
            Atención Especializada
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ponte en Contacto con Nosotros
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Nuestro equipo de ingenieros y especialistas está listo para asesorar tus requerimientos de seguridad, entrenamiento y operaciones.
          </p>
        </div>

        {/* Card Principal Contenedor */}
        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Información Corporativa (Columna Izquierda) */}
          <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-2 text-[var(--web-primary)] font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck size={16} /> Canal Directo
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Información Corporativa
              </h2>

              <div className="space-y-4">
                
                {/* Dirección */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-200/80 flex items-start gap-4 shadow-sm hover:border-[var(--web-primary)] transition-colors">
                  <div className="w-11 h-11 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--web-primary)]/20">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Ubicación Principal</span>
                    <span className="text-sm font-semibold text-slate-800 leading-snug block">
                      Callao, Bellavista. <br />Francisco Pizarro 312
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-200/80 flex items-start gap-4 shadow-sm hover:border-[var(--web-primary)] transition-colors">
                  <div className="w-11 h-11 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">WhatsApp / Central</span>
                    <a
                      href="https://wa.me/51965052858"
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-emerald-600 hover:text-emerald-700 transition-colors no-underline block"
                    >
                      +51 965 052 858
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-200/80 flex items-start gap-4 shadow-sm hover:border-[var(--web-primary)] transition-colors">
                  <div className="w-11 h-11 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--web-primary)]/20">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Correo Electrónico</span>
                    <a
                      href="mailto:comercial@ifsec.pe"
                      className="text-sm font-bold text-[var(--web-primary)] hover:underline no-underline block"
                    >
                      comercial@ifsec.pe
                    </a>
                  </div>
                </div>

                {/* RUC */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-200/80 flex items-start gap-4 shadow-sm hover:border-[var(--web-primary)] transition-colors">
                  <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200">
                    <FileText size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">RUC Institucional</span>
                    <span className="text-sm font-bold text-slate-800 block">20514508179</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock size={15} className="text-[var(--web-primary)]" />
              Horario: Lunes a Viernes de 8:30 AM a 6:00 PM
            </div>
          </div>

          {/* Formulario (Columna Derecha) */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Envíanos un Mensaje
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Completa el siguiente formulario y nos comunicaremos contigo a la mayor brevedad.
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Nombre completo *</label>
                  <input
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-[var(--web-primary)] focus:ring-4 focus:ring-[var(--web-primary)]/15 focus:outline-none transition-all shadow-sm font-medium text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Correo electrónico *</label>
                  <input
                    type="email"
                    placeholder="Ej. juan@empresa.com"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-[var(--web-primary)] focus:ring-4 focus:ring-[var(--web-primary)]/15 focus:outline-none transition-all shadow-sm font-medium text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Asunto o Servicio de Interés</label>
                <input
                  type="text"
                  placeholder="Ej. Cotización de capacitación / Consultoría"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-[var(--web-primary)] focus:ring-4 focus:ring-[var(--web-primary)]/15 focus:outline-none transition-all shadow-sm font-medium text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Mensaje / Detalle de Requerimiento *</label>
                <textarea
                  placeholder="Escribe aquí los detalles de tu consulta o necesidad operativa..."
                  rows={5}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-[var(--web-primary)] focus:ring-4 focus:ring-[var(--web-primary)]/15 focus:outline-none transition-all shadow-sm font-medium text-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--web-primary)] hover:bg-[#1f7d6d] text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_6px_20px_rgba(37,146,127,0.35)] hover:-translate-y-0.5 transition-all text-sm cursor-pointer border-none"
              >
                <Send size={18} />
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>

        {/* Mapa de Ubicación */}
        <div className="mt-12 md:mt-16 w-full rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200/90 h-[400px] md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.7346473026973!2d-77.13512390789616!3d-12.061769625260231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cb9137d697bb%3A0x31f3897fd77458d1!2sFrancisco%20Pizarro%20312%2C%20Bellavista%2007016!5e0!3m2!1ses-419!2spe!4v1788296548615!5m2!1ses-419!2spe"
            width="100%"
            height="100%"
            style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Ubicación IFSEC PERÚ S.A.C."
          />
        </div>

      </div>
    </div>
  )
}

