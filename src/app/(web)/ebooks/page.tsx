import { BookOpen, Download } from 'lucide-react'

import PageHero from '@/features/web/ace/PageHero'

export const metadata = {
  title: 'eBooks — ACE Consulting PERÚ',
  description: 'Biblioteca digital de eBooks ejecutivos en emprendimiento, mundo corporativo y ventas.',
}

const ebooks = [
  { cat: 'Emprendimiento', title: 'El Manual del Emprendedor Digital', pages: 120 },
  { cat: 'Emprendimiento', title: 'Modelo de Negocio en una Página', pages: 64 },
  { cat: 'Corporativo', title: 'Liderazgo en Tiempos de Cambio', pages: 98 },
  { cat: 'Corporativo', title: 'Productividad Ejecutiva', pages: 75 },
  { cat: 'Ventas', title: 'Cierre de Ventas Consultivas', pages: 110 },
  { cat: 'Ventas', title: 'Prospección Inteligente B2B', pages: 80 },
  { cat: 'Emprendimiento', title: 'Marketing para Pymes', pages: 92 },
  { cat: 'Corporativo', title: 'Reuniones Efectivas', pages: 48 },
]

export default function EbooksPage() {
  return (
    <>
      <PageHero
        badge="EBOOKS"
        title="Biblioteca digital ejecutiva"
        description="Lecturas prácticas y al grano, listas para aplicar en tu negocio o carrera."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fit=crop&w=1920&h=640&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ebooks.map((b) => (
            <article key={b.title} className="rounded-2xl bg-card border border-border overflow-hidden hover:border-secondary/60 transition-all flex flex-col">
              <div
                className="aspect-[3/4] relative flex items-center justify-center p-6"
                style={{ background: 'linear-gradient(160deg, var(--secondary), var(--primary))' }}
              >
                <BookOpen className="text-primary-foreground" size={48} />
                <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full bg-background/90 text-foreground">{b.cat}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.pages} páginas · PDF</p>
                <a
                  href="https://wa.me/51920184072"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
                >
                  <Download size={14} /> Obtener
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
