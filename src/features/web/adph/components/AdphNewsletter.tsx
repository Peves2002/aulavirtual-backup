'use client'

import { useState } from 'react'

import { Mail, Sparkles, Send } from 'lucide-react'

export default function AdphNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    setMessage('')

    try {
      const res = await fetch('/api/web/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setMessage('¡Gracias por suscribirte! Recibirás nuestras novedades en tu correo.')
      } else {
        const data = await res.json()

        setStatus('error')
        setMessage(data.error || 'Hubo un problema al procesar tu registro. Por favor, intenta de nuevo.')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      setStatus('error')
      setMessage('Error de conexión. Inténtalo más tarde.')
    }
  }

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08479b]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06316b]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '45px 45px' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 bg-[#08479b]/20 text-[#5993e3] border border-[#08479b]/30 px-4 py-1.5 rounded-md font-bold text-xs uppercase tracking-widest font-manrope">
            <Sparkles className="w-3.5 h-3.5" /> Boletín Informativo
          </span>

          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight leading-tight font-manrope">
            Mantente al día con las mejores prácticas en Gestión Humana
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold max-w-xl mx-auto">
            Suscríbete para recibir mensualmente nuestros últimos artículos del blog, tendencias de salud ocupacional y herramientas prácticas organizacionales.
          </p>

          <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Ingresa tu correo profesional"
                  value={email}
                  disabled={status === 'submitting' || status === 'success'}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 pl-11 pr-5 py-4 text-sm rounded-md focus:outline-none focus:border-[#08479b] focus:ring-1 focus:ring-[#08479b] transition-colors disabled:opacity-50 font-manrope font-semibold"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="inline-flex items-center justify-center gap-2 bg-[#08479b] hover:bg-[#06316b] text-white font-extrabold px-6 py-4 transition-all duration-300 text-xs uppercase tracking-widest rounded-md disabled:opacity-50 font-manrope shadow-[0_4px_15px_rgba(8,71,155,0.3)] shrink-0"
              >
                {status === 'submitting' ? 'Procesando...' : (
                  <>
                    Suscribirme
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Response Messages */}
            {message && (
              <div className={`mt-4 text-xs font-bold font-manrope text-center ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
