'use client'

import { useState } from 'react'

interface EventRegisterFormProps {
  eventTitle: string
}

export default function EventRegisterForm({ eventTitle }: EventRegisterFormProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    celular: '',
    email: '',
    lugarTrabajo: '',
    posicion: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Validations
    if (!formData.nombres || !formData.apellidoPaterno || !formData.apellidoMaterno || !formData.email || !formData.celular || !formData.numeroDocumento) {
      setError('Por favor completa todos los campos obligatorios.')
      setLoading(false)
      
return
    }

    try {
      const payload = {
        nombres: formData.nombres,
        apellidos: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim(),
        email: formData.email,
        celular: formData.celular,
        dni: formData.numeroDocumento,
        profesion: formData.posicion || 'No especificado',
        detalle: `Lugar de trabajo: ${formData.lugarTrabajo || 'No especificado'} | Registro al evento: ${eventTitle}`,
        escuela: 'Registro de Evento'
      }

      const res = await fetch('/api/web/leads-portada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al registrar tus datos.')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-black text-white p-8 md:p-12 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#08479b] rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black mb-4">¡Registro Exitoso!</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          Te hemos registrado correctamente para el evento <strong>{eventTitle}</strong>. Te enviaremos los detalles de acceso a tu correo.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-black text-white p-8 md:p-10 h-full flex flex-col justify-center">
      <h3 className="text-3xl font-bold mb-8">Regístrate</h3>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-800 pb-1">
          <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Nombre(s)*</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Apellido Paterno*</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>

          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Apellido Materno*</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Tipo de Documento*</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm appearance-none"
            >
              <option value="DNI" className="bg-black text-white">DNI</option>
              <option value="CE" className="bg-black text-white">Carnet de Extranjería</option>
              <option value="PASAPORTE" className="bg-black text-white">Pasaporte</option>
            </select>
          </div>

          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Número de documento*</label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Celular*</label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>

          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Correo electrónico*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Lugar de trabajo*</label>
            <input
              type="text"
              name="lugarTrabajo"
              value={formData.lugarTrabajo}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-700 text-sm"
            />
          </div>

          <div className="border-b border-gray-800 pb-1">
            <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Posición en la empresa*</label>
            <input
              type="text"
              name="posicion"
              value={formData.posicion}
              onChange={handleChange}
              required
              placeholder="Ej. Gerente de RRHH"
              className="w-full bg-transparent text-white border-0 p-0 focus:ring-0 focus:outline-none placeholder-gray-800 text-sm"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#08479b] hover:bg-[#06316b] text-white font-bold py-4 px-6 rounded-none tracking-widest text-xs uppercase transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Enviar Registro'}
          </button>
        </div>
      </form>
    </div>
  )
}
