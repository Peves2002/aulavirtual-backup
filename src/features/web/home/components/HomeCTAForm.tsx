'use client'

import { useState } from 'react'

import { User, Phone, BookOpen, ChevronDown } from 'lucide-react'

const INTERESES = [
  'Cursos ejecutivos',
  'eBooks',
  'Consultoría empresarial',
  'Rutas de aprendizaje',
  'Otro',
]

function IllustrationCTA() {
  return (
    <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      {/* Desk */}
      <rect x="60" y="270" width="300" height="14" rx="7" fill="rgba(255,255,255,0.18)" />
      {/* Monitor base */}
      <rect x="195" y="270" width="30" height="24" rx="4" fill="rgba(255,255,255,0.22)" />
      <rect x="175" y="290" width="70" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
      {/* Monitor screen */}
      <rect x="110" y="150" width="200" height="130" rx="14" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      {/* Screen content bars */}
      <rect x="130" y="172" width="80" height="8" rx="4" fill="rgba(255,255,255,0.50)" />
      <rect x="130" y="188" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
      <rect x="130" y="200" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.20)" />
      {/* Chart bars on screen */}
      <rect x="130" y="235" width="18" height="28" rx="4" fill="rgba(255,255,255,0.55)" />
      <rect x="154" y="222" width="18" height="41" rx="4" fill="rgba(255,255,255,0.40)" />
      <rect x="178" y="215" width="18" height="48" rx="4" fill="rgba(255,255,255,0.65)" />
      <rect x="202" y="228" width="18" height="35" rx="4" fill="rgba(255,255,255,0.35)" />
      <rect x="226" y="218" width="18" height="45" rx="4" fill="rgba(255,255,255,0.50)" />
      <rect x="250" y="208" width="18" height="55" rx="4" fill="rgba(255,255,255,0.70)" />
      {/* Person body */}
      <ellipse cx="210" cy="110" rx="28" ry="30" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" />
      {/* Person head */}
      <circle cx="210" cy="72" r="22" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      {/* Graduation cap */}
      <rect x="192" y="55" width="36" height="7" rx="3" fill="rgba(255,255,255,0.55)" />
      <polygon points="210,46 228,55 192,55" fill="rgba(255,255,255,0.45)" />
      <line x1="228" y1="55" x2="231" y2="67" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="231" cy="69" r="3" fill="rgba(255,255,255,0.55)" />
      {/* Arms */}
      <path d="M182 120 Q165 140 170 160" stroke="rgba(255,255,255,0.35)" strokeWidth="10" strokeLinecap="round" />
      <path d="M238 120 Q255 140 250 160" stroke="rgba(255,255,255,0.35)" strokeWidth="10" strokeLinecap="round" />
      {/* Floating elements */}
      <rect x="42" y="100" width="52" height="52" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="68" y="132" textAnchor="middle" fontSize="22" fill="rgba(255,255,255,0.70)">📘</text>
      <rect x="326" y="80" width="52" height="52" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="352" y="112" textAnchor="middle" fontSize="22" fill="rgba(255,255,255,0.70)">🏆</text>
      <rect x="50" y="190" width="52" height="52" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="76" y="222" textAnchor="middle" fontSize="22" fill="rgba(255,255,255,0.70)">💼</text>
      <rect x="318" y="170" width="52" height="52" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="344" y="202" textAnchor="middle" fontSize="22" fill="rgba(255,255,255,0.70)">📈</text>
      {/* Dotted orbit */}
      <circle cx="210" cy="180" r="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 6" />
    </svg>
  )
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem 0.75rem 2.75rem',
  borderRadius: '9999px',
  border: '1.5px solid #e2e8f0',
  backgroundColor: '#f8fafc',
  color: '#1e293b',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function HomeCTAForm() {
  const [form, setForm] = useState({ name: '', phone: '', interes: '' })
  const [focused, setFocused] = useState<string | null>(null)

  const focusStyle: React.CSSProperties = {
    borderColor: 'var(--primary, #25927F)',
    boxShadow: '0 0 0 3px rgba(37,146,127,0.15)',
    backgroundColor: '#fff',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hola ACE Consulting 👋, soy *${form.name}*${form.phone ? `, mi celular es ${form.phone}` : ''}. Estoy interesado/a en: *${form.interes || 'información general'}*.`

    window.open(`https://wa.me/51920184072?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl grid lg:grid-cols-2">

        {/* Panel izquierdo — verde oscuro con ilustración */}
        <div className="relative flex flex-col justify-between p-10 md:p-14 overflow-hidden"
          style={{ background: 'var(--gradient-brand)' }}>
          {/* Blob decorativo */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.30)', color: '#fff' }}>
              Empieza hoy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              ¿Listo para dar<br />el siguiente paso?
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Cuéntanos en qué podemos ayudarte y un asesor se pondrá en contacto contigo por WhatsApp.
            </p>
            <ul className="mt-5 space-y-2.5">
              {['Respuesta en menos de 24 h', 'Asesoría sin compromiso', 'Programas a tu medida'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}>
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ilustración */}
          <div className="relative z-10 mt-8 hidden lg:block">
            <IllustrationCTA />
          </div>
        </div>

        {/* Panel derecho — formulario blanco */}
        <div className="bg-white flex items-center justify-center p-10 md:p-14">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            <div>
              <p className="text-2xl font-bold text-slate-800 mb-1">Contáctanos</p>
              <p className="text-sm text-slate-500">Completa el formulario y te escribimos al instante.</p>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  required
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputBase, ...(focused === 'name' ? focusStyle : {}) }}
                />
              </div>
            </div>

            {/* Celular */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Celular / WhatsApp
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="+51 999 999 999"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputBase, ...(focused === 'phone' ? focusStyle : {}) }}
                />
              </div>
            </div>

            {/* Interés */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Me interesa
              </label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={form.interes}
                  onChange={(e) => setForm({ ...form, interes: e.target.value })}
                  onFocus={() => setFocused('interes')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputBase,
                    paddingRight: '2.5rem',
                    appearance: 'none',
                    cursor: 'pointer',
                    color: form.interes ? '#1e293b' : '#94a3b8',
                    ...(focused === 'interes' ? focusStyle : {}),
                  }}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {INTERESES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: 'var(--gradient-brand)', boxShadow: '0 4px 20px rgba(37,146,127,0.35)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.658 1.438 5.168L2.046 22l4.932-1.369A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 1 1 0-16.364 8.182 8.182 0 0 1 0 16.364z" />
              </svg>
              Enviar por WhatsApp
            </button>

            <p className="text-center text-xs text-slate-400">
              Sin spam · Solo te contactaremos para asesorarte
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
