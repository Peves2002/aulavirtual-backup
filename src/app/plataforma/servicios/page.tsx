import React from 'react'

export const metadata = {
  title: 'Servicios | Aula Virtual',
  description: 'Conoce nuestros servicios corporativos y especializados.',
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Nuestros Servicios
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
        Ofrecemos soluciones integrales y personalizadas para potenciar el desarrollo de tu empresa y equipo de trabajo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder para servicios que se detallarán en el futuro */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-[var(--web-primary)]/10 text-[var(--web-primary)] rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--web-dark)]" style={{ fontFamily: 'Poppins, sans-serif' }}>Servicio {item}</h3>
            <p className="text-gray-600 mb-6">Descripción breve del servicio corporativo o especializado que se ofrece para las empresas.</p>
            <a href="/contacto" className="text-[var(--web-primary)] font-semibold flex items-center gap-2 hover:underline">
              Más información
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
