'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function EnterpriseContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simular envío
    setTimeout(() => {
      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en breve.')
      setLoading(false)
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div 
      style={{ 
        backgroundColor: '#ffffff', 
        padding: '2.5rem', 
        borderRadius: '24px', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}
    >
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
        Solicita una propuesta
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Nombre completo</label>
          <input 
            type="text" 
            required 
            placeholder="Ej. Juan Pérez"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'}
            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Empresa</label>
          <input 
            type="text" 
            required 
            placeholder="Nombre de tu empresa"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9375rem', outline: 'none' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'}
            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Teléfono / WhatsApp</label>
          <input 
            type="tel" 
            required 
            placeholder="+51 ..."
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9375rem', outline: 'none' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'}
            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>¿En qué podemos ayudarte?</label>
          <textarea 
            required 
            placeholder="Cuéntanos tus necesidades de capacitación..."
            rows={3}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9375rem', outline: 'none', resize: 'none' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--web-primary, #25927F)'}
            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            backgroundColor: 'var(--web-dark, #025E44)', 
            color: '#ffffff', 
            padding: '1rem', 
            borderRadius: '12px', 
            border: 'none', 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: 700, 
            fontSize: '1rem', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s ease',
            marginTop: '0.5rem'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#014d37'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--web-dark, #025E44)'}
        >
          {loading ? 'Enviando...' : (
            <>
              Solicitar propuesta <Send size={18} />
            </>
          )}
        </button>
        
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>
          Respuesta garantizada en menos de 10 minutos.
        </p>
      </form>
    </div>
  )
}
