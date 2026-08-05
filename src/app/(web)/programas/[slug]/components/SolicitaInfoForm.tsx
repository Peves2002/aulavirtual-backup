'use client'
/* eslint-disable padding-line-between-statements, newline-before-return, import/order */

import { useState } from 'react'

import Swal from 'sweetalert2'

export default function SolicitaInfoForm({ cursoTitulo, categoriaNombre }: { cursoTitulo: string, categoriaNombre: string }) {
  const [formData, setFormData] = useState({
    especialidad: categoriaNombre || 'Especialización',
    nombres: '',
    email: '',
    edad: '',
    pais: '',
    telefono: '',
    nivel_estudios: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombres || !formData.email || !formData.telefono || !formData.edad || !formData.pais) {
      Swal.fire('Error', 'Por favor completa los campos obligatorios (*)', 'error')
      return
    }

    setIsLoading(true)
    
    const nameParts = formData.nombres.trim().split(' ')
    const firstName = nameParts[0] || '-'
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '-'
    
    try {
      const response = await fetch('/api/web/leads-portada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: firstName,
          apellidos: lastName,
          email: formData.email,
          celular: formData.telefono,
          pais: formData.pais,
          ciudad: '',
          profesion: formData.nivel_estudios,
          detalle: `Edad: ${formData.edad}`,
          escuela: `Programa: ${cursoTitulo}`,
          dni: '' // No está en el form
        }),
      })

      if (response.ok) {
        Swal.fire({
          title: '¡Solicitud enviada!',
          text: 'Un asesor académico contactará contigo en breve.',
          icon: 'success',
          confirmButtonColor: '#08479b'
        })
        setFormData({
          especialidad: categoriaNombre || 'Especialización',
          nombres: '',
          email: '',
          edad: '',
          pais: '',
          telefono: '',
          nivel_estudios: ''
        })
      } else {
        const errorData = await response.json()

        Swal.fire('Error', errorData.error || 'Ocurrió un error al enviar la solicitud', 'error')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', 'Ocurrió un error de conexión', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <input 
          type="text" 
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          placeholder="Nombre y apellidos *" 
          className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" 
        />
      </div>

      <div>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *" 
          className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-300 relative">
          <select 
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>Edad *</option>
            <option value="18 - 25">18 - 25</option>
            <option value="26 - 35">26 - 35</option>
            <option value="36+">36+</option>
          </select>
          <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
        <div className="bg-white border border-gray-300 relative">
          <select 
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>País *</option>
            <option value="Perú">Perú</option>
            <option value="Colombia">Colombia</option>
            <option value="México">México</option>
            <option value="Chile">Chile</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Bolivia">Bolivia</option>
            <option value="España">España</option>
            <option value="Argentina">Argentina</option>
            <option value="Otro">Otro</option>
          </select>
          <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pb-2">
        <div>
          <input 
            type="text" 
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono *" 
            className="w-full bg-white border border-gray-300 p-3 text-[14px] text-gray-600 focus:outline-none placeholder-gray-400" 
          />
        </div>
        <div className="bg-white border border-gray-300 relative">
          <select 
            name="nivel_estudios"
            value={formData.nivel_estudios}
            onChange={handleChange}
            className="w-full p-3 text-[14px] text-gray-600 bg-transparent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>Nivel de estudios</option>
            <option value="Bachiller">Bachiller</option>
            <option value="Titulado">Titulado</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Técnico">Técnico</option>
          </select>
          <div className="absolute right-3 top-4 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
      </div>

      <div className="text-[10px] text-gray-400 text-justify leading-tight mb-4 h-12 overflow-y-auto pr-2">
         ADPH Institución Superior tratará sus datos personales para contactarle e informarle del programa seleccionado de cara a las próximas convocatorias del mismo, pudiendo ejercer sus derechos de privacidad en cualquier momento.
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#fcd116] hover:bg-yellow-400 disabled:bg-gray-300 disabled:text-gray-500 text-slate-900 font-bold py-4 text-[13px] tracking-wide uppercase transition-colors flex justify-center items-center shadow-md"
      >
        {isLoading ? 'Enviando...' : 'Solicitar Información'}
      </button>
    </form>
  )
}
