'use client'

import { useState } from 'react'

import { MapPin, Mail, Phone, MessageCircle, Send } from 'lucide-react'

import PageHero from '@/features/web/ace/PageHero'

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const text = `Hola ACE Consulting, soy ${form.name} (${form.email}${form.phone ? `, cel: ${form.phone}` : ''}). ${form.message}`

    window.open(`https://wa.me/51920184072?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <PageHero
        badge="CONTACTO"
        title="Conversemos"
        description="Cuéntanos qué necesitas y te responderemos a la brevedad."
        image="/others/contacto.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: 'Oficina', value: 'Calle Lino Alarco 212, Miraflores, Lima, Perú', href: undefined },
            { icon: Phone, title: 'Teléfono', value: '+51 920 184 072', href: 'tel:+51920184072' },
            { icon: MessageCircle, title: 'WhatsApp', value: 'Escríbenos al instante', href: 'https://wa.me/51920184072' },
            { icon: Mail, title: 'Correo', value: 'aceconsultingperu@gmail.com', href: 'mailto:aceconsultingperu@gmail.com' },
          ].map((c) => (
            <a key={c.title} href={c.href || '#'} className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-brand)' }}>
                <c.icon className="text-white" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </a>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps?q=Calle+Lino+Alarco+212,+Miraflores,+Lima,+Peru&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-5 h-fit">
          <h2 className="text-2xl font-bold">Envíanos un mensaje</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Correo</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Celular</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+51 999 999 999"
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 shadow-[var(--shadow-glow)]"
          >
            <Send size={18} /> Enviar por WhatsApp
          </button>
        </form>
      </section>
    </>
  )
}
