import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CertificateBanner() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-600 via-gray-400 to-gray-100 flex items-center min-h-[300px]">
        {/* Overlay texture if needed */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-2xl text-white">
          <div className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-200">
            Valida tu aprendizaje
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Nuevo Modelo de Certificado 2026
          </h2>
          <p className="text-gray-100 text-lg mb-8 max-w-lg">
            Nuestros certificados cuentan con tecnología QR de validación en tiempo real para garantizar su autenticidad y respaldar tu aprendizaje.
          </p>
          <Link 
            href="/verificar-certificado"
            className="inline-flex items-center gap-2 bg-[#e60000] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            Ver más <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
