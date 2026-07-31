'use client'

import { useState, useEffect } from 'react'

import { ESCUELAS } from '@/features/web/adph/data/escuelas'

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
  formTitle = 'SOLICITA INFORMACIÓN',
}: AdphHeroFormProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    celular: '',
    email: '',
    escuela: defaultSchool,
    pais: '',
    ciudad: '',
    profesion: '',
    detalle: '',
  })

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (defaultSchool) {
      setFormData(prev => ({ ...prev, escuela: defaultSchool }))
    }
  }, [defaultSchool])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value

    if ((name === 'nombres' || name === 'apellidos') && typeof value === 'string') {
      if (value !== '' && !/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/.test(value)) return
    }

    if (name === 'celular' && typeof value === 'string') {
      if (value !== '' && !/^\d+$/.test(value)) return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/web/leads-portada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Error enviando el formulario')
      
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 30000)
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Hubo un problema enviando tus datos. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-white/90 border border-white/20 text-slate-800 placeholder-slate-500 text-[15px] px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3BA8C5] transition-all'

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center">
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

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
        <div className="w-full max-w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 lg:p-10 rounded-[2rem] relative">
          <div className="mb-6 text-center">
            <h3 className="text-white font-black text-xl lg:text-2xl tracking-tight uppercase mb-2 drop-shadow-md">{formTitle}</h3>
            <p className="text-slate-200 text-sm font-semibold mt-1 leading-snug">Completa tus datos y un asesor se comunicará contigo.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#3BA8C5] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(59,168,197,0.5)]">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bold text-lg">¡Registro recibido!</p>
              <p className="text-slate-200 text-sm font-semibold">Un asesor se pondrá en contacto contigo pronto.</p>
              
              {formData.escuela && (
                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="text-sm text-slate-300 mb-3 font-medium">Mientras tanto, puedes descargar nuestro brochure:</p>
                  <a
                    href={`/brochures/${ESCUELAS.find(e => e.name === formData.escuela)?.id || formData.escuela
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[\s_]+/g, '-')
                      .replace(/[^\w-]+/g, '')}.pdf`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full text-white font-extrabold text-[14px] uppercase tracking-wider py-3 rounded-full transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(to right, #0F4438, #186b58)' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar Brochure
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="nombres"
                  required
                  value={formData.nombres}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Nombres"
                />
                <input
                  type="text"
                  name="apellidos"
                  required
                  value={formData.apellidos}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Apellidos"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="celular"
                  required
                  value={formData.celular}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="WhatsApp"
                />
              </div>

              <select
                name="escuela"
                required
                value={formData.escuela}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>Escuela de interés</option>
                {ESCUELAS.map((esc) => (
                  <option key={esc.id} value={esc.name}>
                    {esc.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="pais"
                  required
                  value={formData.pais}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="País"
                />
                <input
                  type="text"
                  name="ciudad"
                  required
                  value={formData.ciudad}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Ciudad"
                />
              </div>

              <input
                type="text"
                name="profesion"
                required
                value={formData.profesion}
                onChange={handleChange}
                className={inputClass}
                placeholder="Profesión"
              />

              <textarea
                name="detalle"
                required
                value={formData.detalle}
                onChange={handleChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
                className={`${inputClass.replace('rounded-full', 'rounded-2xl')} resize-none h-24`}
                placeholder="Detalla tu solicitud"
              ></textarea>

              <div className="pt-4">
                {submitError && (
                  <p className="text-red-400 text-sm mb-3 font-semibold text-center">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-extrabold text-[15px] uppercase tracking-widest py-3.5 rounded-full transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(to right, #3BA8C5, #00B4DB)' }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
