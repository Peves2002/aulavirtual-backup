'use client'

import { useState, useEffect } from 'react'

interface AdphHeroFormProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  backgroundImage: string
  defaultSchool?: string
  formTitle?: string
}

export default function AdphHeroForm({
  title,
  subtitle,
  backgroundImage,
  defaultSchool = '',
  formTitle = 'REGÍSTRATE A NUESTRO VIVE DPA',
}: AdphHeroFormProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    email: '',
    escuela: defaultSchool,
    modalidad: '',
    estudios: '',
    aceptaDatos: false,
    autorizaPublicidad: false,
  })

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (defaultSchool) {
      setFormData(prev => ({ ...prev, escuela: defaultSchool }))
    }
  }, [defaultSchool])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value

    setFormData(prev => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: conectar a la API de contacto/lead del proyecto
    console.log('Formulario enviado', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass =
    'w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 focus:outline-none focus:border-[#3BA8C5] focus:ring-1 focus:ring-[#3BA8C5] transition-colors'

  const labelClass = 'text-xs font-bold text-slate-700 uppercase tracking-wide'

  return (
    <section className="relative w-full overflow-hidden bg-slate-900" style={{ borderRadius: 0 }}>
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(2,8,25,0.9) 0%, rgba(2,8,25,0.8) 50%, rgba(2,8,25,0.4) 100%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left Texts */}
        <div className="flex-1 text-left space-y-6">
          <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-semibold max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Right Form Box */}
        <div
          className="w-full lg:w-[480px] bg-white shadow-2xl p-8 lg:p-10 relative"
          style={{ borderRadius: 0 }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(to right, #3BA8C5, #00B4DB)' }} />

          <div className="mb-6">
            <h3 className="text-slate-900 font-black text-xl lg:text-2xl tracking-tight uppercase">{formTitle}</h3>
            <p className="text-slate-500 text-sm font-semibold mt-1">Completa tus datos y un asesor se comunicará contigo.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#3BA8C5] flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-900 font-bold text-lg">¡Registro recibido!</p>
              <p className="text-slate-500 text-sm font-semibold">Un asesor se pondrá en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Nombres</label>
                  <input
                    type="text"
                    name="nombres"
                    required
                    value={formData.nombres}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Tus nombres"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    required
                    value={formData.apellidos}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Tus apellidos"
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>DNI</label>
                  <input
                    type="text"
                    name="dni"
                    required
                    value={formData.dni}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Nro. de documento"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Celular</label>
                  <input
                    type="tel"
                    name="celular"
                    required
                    value={formData.celular}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Tu celular"
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="correo@ejemplo.com"
                  style={{ borderRadius: 0 }}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Escuela de interés</label>
                <select
                  name="escuela"
                  required
                  value={formData.escuela}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none`}
                  style={{ borderRadius: 0 }}
                >
                  <option value="" disabled>Selecciona una escuela</option>
                  <option value="Escuela de Psicología Organizacional">Escuela de Psicología Organizacional</option>
                  <option value="Escuela de Liderazgo y Capital Humano">Escuela de Liderazgo y Capital Humano</option>
                  <option value="Escuela de Psicología Ocupacional y SST">Escuela de Psicología Ocupacional y SST</option>
                  <option value="Centro de Aprendizaje Experiencial">Centro de Aprendizaje Experiencial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Modalidad</label>
                  <select
                    name="modalidad"
                    required
                    value={formData.modalidad}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                    style={{ borderRadius: 0 }}
                  >
                    <option value="" disabled>Seleccione</option>
                    <option value="Online">Online</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Estudios</label>
                  <select
                    name="estudios"
                    required
                    value={formData.estudios}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                    style={{ borderRadius: 0 }}
                  >
                    <option value="" disabled>Seleccione</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Universitario">Universitario</option>
                    <option value="Postgrado">Postgrado</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="aceptaDatos"
                    required
                    checked={formData.aceptaDatos}
                    onChange={handleChange}
                    className="w-4 h-4 border-slate-300 text-[#3BA8C5] focus:ring-[#3BA8C5] cursor-pointer mt-0.5 flex-shrink-0"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="text-xs text-slate-600 font-semibold leading-snug group-hover:text-slate-800 transition-colors">
                    Acepto las{' '}
                    <a href="/terminos-y-condiciones" className="text-[#3BA8C5] hover:underline">
                      condiciones de tratamiento de datos personales
                    </a>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="autorizaPublicidad"
                    checked={formData.autorizaPublicidad}
                    onChange={handleChange}
                    className="w-4 h-4 border-slate-300 text-[#3BA8C5] focus:ring-[#3BA8C5] cursor-pointer mt-0.5 flex-shrink-0"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="text-xs text-slate-600 font-semibold leading-snug group-hover:text-slate-800 transition-colors">
                    Autorizo el uso de mis datos para fines publicitarios e informativos.
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full text-white font-extrabold text-sm uppercase tracking-widest py-4 transition-colors hover:opacity-90"
                  style={{ background: 'linear-gradient(to right, #3BA8C5, #00B4DB)', borderRadius: 0 }}
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
