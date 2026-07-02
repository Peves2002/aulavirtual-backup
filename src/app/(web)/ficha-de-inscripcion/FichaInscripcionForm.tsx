'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
  ClipboardCheck,
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  MapPin,
  AlertCircle,
  RefreshCw,
  Landmark,
  Globe,
  Coins,
  Calendar,
  Lock
} from 'lucide-react'

import { ESCUELAS } from '@/features/web/adph/data/escuelas'

interface FormState {
  nombres: string
  apellidos: string
  documento: string
  email: string
  celular: string
  pais: string
  profesion: string
  aceptaReglamento: boolean
  gradoObtenido: string
  escuela: string
  modalidadEstudios: string
  costo: string
  moneda: string
  modalidadPago: string
  fechaPago: string
  facturaDatos: string
  autorizaDatos: string
}

const initialState: FormState = {
  nombres: '',
  apellidos: '',
  documento: '',
  email: '',
  celular: '',
  pais: '',
  profesion: '',
  aceptaReglamento: false,
  gradoObtenido: '',
  escuela: '',
  modalidadEstudios: '',
  costo: '',
  moneda: '',
  modalidadPago: 'Contado',
  fechaPago: '',
  facturaDatos: '',
  autorizaDatos: ''
}

const MODALIDADES_ESTUDIO = [
  { id: 'sincronico', val: 'Online (Sincrónico)', desc: 'Clases en vivo y videoconferencias interactivas.' },
  { id: 'asincronico', val: 'Virtual (Asincrónico)', desc: 'Estudio autónomo a tu propio ritmo en el Campus Virtual.' },
  { id: 'presencial', val: 'Presencial', desc: 'Clases físicas presenciales en nuestras salas ejecutivas.' }
]

const inputClass =
  'w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3.5 focus:outline-none focus:border-[#3BA8C5] focus:ring-1 focus:ring-[#3BA8C5] transition-colors font-medium'

const errorInputClass =
  'w-full bg-slate-50 border border-red-400 text-slate-900 text-sm px-4 py-3.5 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors font-medium'

const labelClass = 'text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5'
const sectionTitleClass = 'text-[10px] font-extrabold text-[#3BA8C5] uppercase tracking-[0.2em] block border-b border-slate-100 pb-2'

export default function FichaInscripcionForm() {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaError, setCaptchaError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setFormData(prev => ({ ...prev, [name]: checked }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const simulateCaptcha = () => {
    if (captchaChecked) return
    setCaptchaLoading(true)
    setCaptchaError('')
    setTimeout(() => {
      setCaptchaLoading(false)
      setCaptchaChecked(true)
    }, 1200)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombres.trim()) newErrors.nombres = 'Este campo es obligatorio.'
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Este campo es obligatorio.'
    if (!formData.documento.trim()) newErrors.documento = 'Este campo es obligatorio.'

    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es obligatorio.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido.'
    }

    if (!formData.celular.trim()) {
      newErrors.celular = 'Este campo es obligatorio.'
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.celular)) {
      newErrors.celular = 'Número de celular inválido.'
    }

    if (!formData.pais.trim()) newErrors.pais = 'Este campo es obligatorio.'
    if (!formData.profesion.trim()) newErrors.profesion = 'Este campo es obligatorio.'
    if (!formData.aceptaReglamento) newErrors.aceptaReglamento = 'Este campo es obligatorio.'
    if (!formData.gradoObtenido.trim()) newErrors.gradoObtenido = 'Este campo es obligatorio.'
    if (!formData.escuela) newErrors.escuela = 'Este campo es obligatorio.'
    if (!formData.modalidadEstudios) newErrors.modalidadEstudios = 'Este campo es obligatorio.'
    if (!formData.costo.trim()) newErrors.costo = 'Este campo es obligatorio.'
    if (!formData.moneda) newErrors.moneda = 'Este campo es obligatorio.'
    if (!formData.fechaPago) newErrors.fechaPago = 'Este campo es obligatorio.'
    if (!formData.autorizaDatos) newErrors.autorizaDatos = 'Este campo es obligatorio.'

    if (!captchaChecked) {
      setCaptchaError('Debe completar la verificación de seguridad (Captcha).')
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0 && captchaChecked
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // TODO: conectar a la API de leads/inscripciones del proyecto
      console.log('Ficha de inscripción enviada', formData)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hero Title */}
      <section className="pt-16 pb-16 lg:pt-20 bg-slate-900 relative overflow-hidden" style={{ borderRadius: 0 }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #020819 0%, #0B1E3D 60%, #0B1E3D 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 text-center space-y-5">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#3BA8C5]/30 bg-[#3BA8C5]/10 text-[#3BA8C5] text-[11px] font-extrabold uppercase tracking-widest"
            style={{ borderRadius: 0 }}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            Ficha Oficial de Matrícula
          </div>

          <h1 className="text-white font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Ficha de <span className="text-[#3BA8C5]">Inscripción Académica</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
            Por favor, completa el formulario oficial detallando tu información para proceder con la matrícula
            académica y los registros correspondientes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {!submitted ? (
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* LEFT SIDEBAR */}
              <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                {/* Contact Info Card */}
                <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 space-y-6 text-left" style={{ borderRadius: 0 }}>
                  <h3 className="text-slate-900 font-black text-lg uppercase tracking-wider border-b border-slate-200 pb-3">
                    Información de Contacto
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5] flex-shrink-0"
                        style={{ borderRadius: 0 }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">
                          Dirección
                        </span>
                        <span className="text-slate-700 text-xs md:text-sm font-bold leading-normal">
                          Av. Javier Prado Este 560, Oficina 2302 San Isidro
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5] flex-shrink-0"
                        style={{ borderRadius: 0 }}
                      >
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">
                          E-mail
                        </span>
                        <a href="mailto:informes@adphgroup.com" className="text-[#3BA8C5] hover:underline text-xs md:text-sm font-bold block">
                          informes@adphgroup.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 bg-[#3BA8C5]/10 flex items-center justify-center text-[#3BA8C5] flex-shrink-0"
                        style={{ borderRadius: 0 }}
                      >
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">
                          Teléfono
                        </span>
                        <a href="tel:+51017073571" className="text-slate-700 hover:text-[#3BA8C5] font-bold text-xs md:text-sm block">
                          (01) 7073571
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Warnings Card */}
                <div className="bg-amber-50 border border-amber-200 p-6 md:p-8 space-y-4 text-left" style={{ borderRadius: 0 }}>
                  <h3 className="text-amber-800 font-black text-lg uppercase tracking-wider flex items-center gap-2 border-b border-amber-200 pb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" /> Importante:
                  </h3>

                  <ol className="list-decimal pl-4 space-y-3.5 text-xs text-amber-900/80 font-semibold leading-relaxed">
                    <li>
                      La información consignada en su ficha de inscripción y demás documentación presentada en este
                      proceso tendrá la naturaleza de declaración jurada, siendo responsabilidad del participante
                      cualquier error o modificación que no se comunique oportunamente al área de ventas o al
                      Coordinador Académico.
                    </li>
                    <li>
                      Los datos consignados serán utilizados para la certificación académica registrada en la
                      presente ficha de inscripción.
                    </li>
                    <li>
                      ADPH Group – Executive Education se reserva el derecho de las devoluciones de pagos por reserva
                      de vacante, matrículas, cuotas entre otros y/o aplicar las penalidades o sanciones que
                      considere pertinentes ante el incumplimiento de compromisos de pago o retiro voluntario por
                      parte del participante.
                    </li>
                    <li>
                      ADPH Group se reserva el derecho de reprogramar las fechas de inicio en caso no se complete el
                      cupo requerido para iniciar el programa.
                    </li>
                  </ol>
                </div>
              </div>

              {/* RIGHT: FORM */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-slate-200 shadow-xl p-6 md:p-10 text-left space-y-8 relative" style={{ borderRadius: 0 }}>
                  <div className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(to right, #3BA8C5, #00B4DB)' }} />

                  <div>
                    <h2 className="text-slate-900 font-black text-2xl tracking-tight mb-2 uppercase">Ficha de Inscripción</h2>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      Completa tus datos en los siguientes campos:
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECCIÓN 1: DATOS PERSONALES */}
                    <div className="space-y-4">
                      <span className={sectionTitleClass}>Sección 1: Datos Personales</span>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={labelClass}>
                            <User className="w-3.5 h-3.5 text-[#3BA8C5]" /> Nombres *
                          </label>
                          <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleInputChange}
                            className={errors.nombres ? errorInputClass : inputClass}
                            placeholder="Tus nombres"
                            style={{ borderRadius: 0 }}
                          />
                          {errors.nombres && <p className="text-xs text-red-500 font-bold mt-1">{errors.nombres}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className={labelClass}>
                            <User className="w-3.5 h-3.5 text-[#3BA8C5]" /> Apellidos *
                          </label>
                          <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleInputChange}
                            className={errors.apellidos ? errorInputClass : inputClass}
                            placeholder="Tus apellidos"
                            style={{ borderRadius: 0 }}
                          />
                          {errors.apellidos && <p className="text-xs text-red-500 font-bold mt-1">{errors.apellidos}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <FileText className="w-3.5 h-3.5 text-[#3BA8C5]" /> N.° DNI (extranjeros: Cédula o Pasaporte) *
                        </label>
                        <input
                          type="text"
                          name="documento"
                          value={formData.documento}
                          onChange={handleInputChange}
                          className={errors.documento ? errorInputClass : inputClass}
                          placeholder="N.° de identificación oficial"
                          style={{ borderRadius: 0 }}
                        />
                        {errors.documento && <p className="text-xs text-red-500 font-bold mt-1">{errors.documento}</p>}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={labelClass}>
                            <Mail className="w-3.5 h-3.5 text-[#3BA8C5]" /> Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? errorInputClass : inputClass}
                            placeholder="correo@ejemplo.com"
                            style={{ borderRadius: 0 }}
                          />
                          {errors.email && <p className="text-xs text-red-500 font-bold mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className={labelClass}>
                            <Phone className="w-3.5 h-3.5 text-[#3BA8C5]" /> Celular *
                          </label>
                          <input
                            type="tel"
                            name="celular"
                            value={formData.celular}
                            onChange={handleInputChange}
                            className={errors.celular ? errorInputClass : inputClass}
                            placeholder="N.° de WhatsApp / Celular"
                            style={{ borderRadius: 0 }}
                          />
                          {errors.celular && <p className="text-xs text-red-500 font-bold mt-1">{errors.celular}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <Globe className="w-3.5 h-3.5 text-[#3BA8C5]" /> País *
                        </label>
                        <input
                          type="text"
                          name="pais"
                          value={formData.pais}
                          onChange={handleInputChange}
                          className={errors.pais ? errorInputClass : inputClass}
                          placeholder="País de residencia"
                          style={{ borderRadius: 0 }}
                        />
                        {errors.pais && <p className="text-xs text-red-500 font-bold mt-1">{errors.pais}</p>}
                      </div>
                    </div>

                    {/* SECCIÓN 2: PERFIL PROFESIONAL Y ACADÉMICO */}
                    <div className="space-y-4 pt-4">
                      <span className={sectionTitleClass}>Sección 2: Perfil Profesional &amp; Académico</span>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <Briefcase className="w-3.5 h-3.5 text-[#3BA8C5]" /> Profesión u ocupación *
                        </label>
                        <input
                          type="text"
                          name="profesion"
                          value={formData.profesion}
                          onChange={handleInputChange}
                          className={errors.profesion ? errorInputClass : inputClass}
                          placeholder="Ej: Psicólogo Organizacional / Analista de RR.HH."
                          style={{ borderRadius: 0 }}
                        />
                        {errors.profesion && <p className="text-xs text-red-500 font-bold mt-1">{errors.profesion}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <GraduationCap className="w-3.5 h-3.5 text-[#3BA8C5]" /> Grado obtenido *
                        </label>
                        <input
                          type="text"
                          name="gradoObtenido"
                          value={formData.gradoObtenido}
                          onChange={handleInputChange}
                          className={errors.gradoObtenido ? errorInputClass : inputClass}
                          placeholder="Ej: Bachiller, Licenciado, Magíster"
                          style={{ borderRadius: 0 }}
                        />
                        {errors.gradoObtenido && <p className="text-xs text-red-500 font-bold mt-1">{errors.gradoObtenido}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <GraduationCap className="w-3.5 h-3.5 text-[#3BA8C5]" /> Escuela de interés *
                        </label>
                        <select
                          name="escuela"
                          value={formData.escuela}
                          onChange={handleInputChange}
                          className={`${errors.escuela ? errorInputClass : inputClass} appearance-none`}
                          style={{ borderRadius: 0 }}
                        >
                          <option value="">-- Selecciona la escuela académica --</option>
                          {ESCUELAS.map(escuela => (
                            <option key={escuela.id} value={escuela.name}>
                              {escuela.name}
                            </option>
                          ))}
                        </select>
                        {errors.escuela && <p className="text-xs text-red-500 font-bold mt-1">{errors.escuela}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1">
                          Selecciona la modalidad de estudios *
                        </label>
                        <div className="space-y-2.5">
                          {MODALIDADES_ESTUDIO.map(mod => (
                            <label
                              key={mod.id}
                              className="flex items-start gap-3 p-3 border cursor-pointer transition-colors"
                              style={{
                                borderRadius: 0,
                                backgroundColor: formData.modalidadEstudios === mod.val ? 'rgba(59,168,197,0.06)' : '#F8FAFC',
                                borderColor: formData.modalidadEstudios === mod.val ? 'rgba(59,168,197,0.4)' : '#E2E8F0'
                              }}
                            >
                              <input
                                type="radio"
                                name="modalidadEstudios"
                                value={mod.val}
                                checked={formData.modalidadEstudios === mod.val}
                                onChange={handleInputChange}
                                className="mt-1 accent-[#3BA8C5]"
                              />
                              <div>
                                <span className="text-xs font-black text-slate-800 block">{mod.val}</span>
                                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">{mod.desc}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.modalidadEstudios && (
                          <p className="text-xs text-red-500 font-bold mt-1.5">{errors.modalidadEstudios}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="flex items-start gap-3 p-3.5 border cursor-pointer transition-colors"
                          style={{
                            borderRadius: 0,
                            backgroundColor: formData.aceptaReglamento ? 'rgba(59,168,197,0.06)' : '#F8FAFC',
                            borderColor: formData.aceptaReglamento ? 'rgba(59,168,197,0.4)' : '#E2E8F0'
                          }}
                        >
                          <input
                            type="checkbox"
                            name="aceptaReglamento"
                            checked={formData.aceptaReglamento}
                            onChange={handleCheckbox}
                            className="mt-1 w-4 h-4 border-slate-300 text-[#3BA8C5] focus:ring-[#3BA8C5] cursor-pointer flex-shrink-0"
                            style={{ borderRadius: 0 }}
                          />
                          <span className="text-xs font-bold text-slate-700 leading-snug">
                            Confirmo que he leído y acepto el reglamento general de matrícula y el aviso de privacidad. *
                          </span>
                        </label>
                        {errors.aceptaReglamento && <p className="text-xs text-red-500 font-bold mt-1">{errors.aceptaReglamento}</p>}
                      </div>
                    </div>

                    {/* SECCIÓN 3: PAGO Y FACTURACIÓN */}
                    <div className="space-y-4 pt-4">
                      <span className={sectionTitleClass}>Sección 3: Registro de Pago &amp; Facturación</span>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <Coins className="w-3.5 h-3.5 text-[#3BA8C5]" /> Costo del programa *
                        </label>
                        <input
                          type="text"
                          name="costo"
                          value={formData.costo}
                          onChange={handleInputChange}
                          className={errors.costo ? errorInputClass : inputClass}
                          placeholder="Monto acordado de la matrícula / cuota"
                          style={{ borderRadius: 0 }}
                        />
                        {errors.costo && <p className="text-xs text-red-500 font-bold mt-1">{errors.costo}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1">
                          Selecciona la moneda de pago *
                        </label>
                        <div className="flex gap-4">
                          {[
                            { val: 'S/ Soles', label: 'S/ Soles' },
                            { val: '$ USD Dólares', label: '$ USD Dólares' }
                          ].map(mon => (
                            <label
                              key={mon.val}
                              className="flex-1 flex items-center justify-center gap-2 p-3.5 border cursor-pointer font-bold text-xs uppercase tracking-wider transition-colors"
                              style={{
                                borderRadius: 0,
                                backgroundColor: formData.moneda === mon.val ? 'rgba(59,168,197,0.06)' : '#F8FAFC',
                                borderColor: formData.moneda === mon.val ? 'rgba(59,168,197,0.4)' : '#E2E8F0',
                                color: formData.moneda === mon.val ? '#3BA8C5' : '#64748B'
                              }}
                            >
                              <input
                                type="radio"
                                name="moneda"
                                value={mon.val}
                                checked={formData.moneda === mon.val}
                                onChange={handleInputChange}
                                className="accent-[#3BA8C5]"
                              />
                              {mon.label}
                            </label>
                          ))}
                        </div>
                        {errors.moneda && <p className="text-xs text-red-500 font-bold mt-1">{errors.moneda}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-1">
                          Modalidad de pago:
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['Contado', 'En cuotas', 'Otro'].map(met => (
                            <label
                              key={met}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-2 p-3 border cursor-pointer font-bold text-[10px] uppercase tracking-wider transition-colors"
                              style={{
                                borderRadius: 0,
                                backgroundColor: formData.modalidadPago === met ? 'rgba(59,168,197,0.06)' : '#F8FAFC',
                                borderColor: formData.modalidadPago === met ? 'rgba(59,168,197,0.4)' : '#E2E8F0',
                                color: formData.modalidadPago === met ? '#3BA8C5' : '#64748B'
                              }}
                            >
                              <input
                                type="radio"
                                name="modalidadPago"
                                value={met}
                                checked={formData.modalidadPago === met}
                                onChange={handleInputChange}
                                className="accent-[#3BA8C5]"
                              />
                              {met}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <Calendar className="w-3.5 h-3.5 text-[#3BA8C5]" /> Fecha de pago *
                        </label>
                        <input
                          type="date"
                          name="fechaPago"
                          value={formData.fechaPago}
                          onChange={handleInputChange}
                          className={errors.fechaPago ? errorInputClass : inputClass}
                          style={{ borderRadius: 0 }}
                        />
                        {errors.fechaPago && <p className="text-xs text-red-500 font-bold mt-1">{errors.fechaPago}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className={labelClass}>
                          <Landmark className="w-3.5 h-3.5 text-[#3BA8C5]" /> Si deseas factura, indica los datos de la empresa: RUC,
                          Razón Social, Dirección
                        </label>
                        <textarea
                          name="facturaDatos"
                          value={formData.facturaDatos}
                          onChange={handleInputChange}
                          rows={3}
                          className={inputClass}
                          placeholder={'RUC: XXXXXXXXXXX\nRazón Social: ...\nDirección Fiscal: ...'}
                          style={{ borderRadius: 0 }}
                        />
                      </div>
                    </div>

                    {/* SECCIÓN 4: VERIFICACIÓN Y AUTORIZACIÓN */}
                    <div className="space-y-4 pt-4">
                      <span className={sectionTitleClass}>Sección 4: Autorización &amp; Seguridad</span>

                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-3">
                          Autorizo expresamente, de manera informada y voluntaria, a ADPH Group Executive Education el
                          tratamiento de mis datos personales conforme a las finalidades establecidas en el aviso de
                          privacidad integral, el cual me fue puesto a disposición.
                        </p>
                        <div className="flex gap-4">
                          {[
                            { val: 'Si', label: 'Sí' },
                            { val: 'No', label: 'No' }
                          ].map(auth => (
                            <label
                              key={auth.val}
                              className="flex-1 flex items-center justify-center gap-2 p-3.5 border cursor-pointer font-bold text-xs uppercase tracking-wider transition-colors"
                              style={{
                                borderRadius: 0,
                                backgroundColor: formData.autorizaDatos === auth.val ? 'rgba(59,168,197,0.06)' : '#F8FAFC',
                                borderColor: formData.autorizaDatos === auth.val ? 'rgba(59,168,197,0.4)' : '#E2E8F0',
                                color: formData.autorizaDatos === auth.val ? '#3BA8C5' : '#64748B'
                              }}
                            >
                              <input
                                type="radio"
                                name="autorizaDatos"
                                value={auth.val}
                                checked={formData.autorizaDatos === auth.val}
                                onChange={handleInputChange}
                                className="accent-[#3BA8C5]"
                              />
                              {auth.label}
                            </label>
                          ))}
                        </div>
                        {errors.autorizaDatos && <p className="text-xs text-red-500 font-bold mt-1">{errors.autorizaDatos}</p>}
                      </div>

                      {/* Captcha simulado */}
                      <div className="space-y-2 pt-2">
                        <div
                          className="bg-slate-50 border border-slate-200 p-4 flex items-center justify-between max-w-sm"
                          style={{ borderRadius: 0 }}
                        >
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={simulateCaptcha}
                              disabled={captchaLoading || captchaChecked}
                              className="w-6 h-6 border flex items-center justify-center transition-all"
                              style={{
                                borderRadius: 0,
                                backgroundColor: captchaChecked ? '#3BA8C5' : '#FFFFFF',
                                borderColor: captchaChecked ? '#3BA8C5' : '#CBD5E1',
                                color: '#FFFFFF'
                              }}
                            >
                              {captchaLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#3BA8C5]" />}
                              {captchaChecked && <CheckCircle2 className="w-4 h-4" />}
                            </button>
                            <span className="text-xs font-bold text-slate-600">
                              {captchaChecked ? 'Verificación completada' : 'No soy un robot'}
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">
                              reCAPTCHA
                            </span>
                          </div>
                        </div>
                        {captchaError && <p className="text-xs text-red-500 font-bold">{captchaError}</p>}
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full text-white font-extrabold text-xs uppercase tracking-widest py-4 transition-colors hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(to right, #3BA8C5, #00B4DB)', borderRadius: 0 }}
                      >
                        Enviar Inscripción Oficial <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (

            /* SUCCESS SCREEN */
            <div
              className="bg-white border border-slate-200 shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6"
              style={{ borderRadius: 0 }}
            >
              <div
                className="w-20 h-20 bg-[#3BA8C5]/10 border border-[#3BA8C5]/20 flex items-center justify-center mx-auto text-[#3BA8C5]"
                style={{ borderRadius: '9999px' }}
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-slate-900 font-black text-2xl md:text-3xl tracking-tight leading-tight uppercase">
                ¡Inscripción Declarada y Enviada!
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-semibold">
                Excelente, <strong className="text-slate-800 font-bold">{formData.nombres} {formData.apellidos}</strong>. Tu
                ficha oficial de matrícula para <strong>{formData.escuela}</strong> ({formData.modalidadEstudios}) ha sido
                registrada en los sistemas de ADPH Group.
              </p>

              <div
                className="bg-slate-50 border border-slate-200 p-6 text-left text-xs font-semibold text-slate-600 max-w-md mx-auto space-y-2.5"
                style={{ borderRadius: 0 }}
              >
                <p>
                  <strong>N.° de Registro Oficial:</strong> ADPH-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p>
                  <strong>Nombres y Apellidos:</strong> {formData.nombres} {formData.apellidos}
                </p>
                <p>
                  <strong>Escuela de interés:</strong> {formData.escuela}
                </p>
                <p>
                  <strong>Fecha declarada de pago:</strong> {formData.fechaPago}
                </p>
                <p className="pt-2 text-slate-500 font-medium leading-relaxed border-t border-slate-200">
                  <strong>Siguiente paso:</strong> Un Coordinador Académico y el área de Facturación/Ventas validarán la
                  transacción. En breve recibirás la confirmación oficial junto con tus credenciales de acceso al Campus
                  Virtual por email (<strong>{formData.email}</strong>) o vía WhatsApp (<strong>{formData.celular}</strong>).
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#3BA8C5] hover:opacity-80 transition-colors uppercase tracking-widest group/btn"
                >
                  Volver al inicio{' '}
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
