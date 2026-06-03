import { Sparkles, MessageCircle } from 'lucide-react'

import { PlanesPublicos } from '@/features/web/suscripciones/components/PlanesPublicos'
import type { PlanPublico } from '@/features/estudiante/suscripciones/entity/Suscripcion'

export const metadata = {
  title: 'Planes de Suscripción | Aula Virtual',
  description: 'Accede a todos nuestros cursos con un plan de suscripción mensual, trimestral, semestral o anual.'
}

async function getPlanes(): Promise<PlanPublico[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/planes-suscripcion`, { cache: 'no-store' })

    if (!res.ok) return []
    const data = await res.json()

    return data?.result?.planes ?? []
  } catch {
    return []
  }
}

export default async function SuscripcionesPage() {
  const planes = await getPlanes()

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0A1A04] via-[#0E2807] to-[#0A1A04] -mt-[5rem] pt-[11rem] pb-[7rem] px-6 text-center">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#5A9020] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#A8E060] rounded-full blur-[180px] opacity-15 pointer-events-none"></div>
        
        <div className="relative max-w-3xl mx-auto z-10">
          <div className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/5">
            <Sparkles size={12} className="text-[#A8E060]" />
            <span className="text-[#A8E060]">Suscripción Ilimitada</span>
          </div>

          <h1 className="font-display font-bold text-white mb-6 leading-tight tracking-tight" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            Aprende sin límites con <br className="hidden md:block"/>
            <span className="text-[#A8E060]">Acceso Premium Total</span>
          </h1>

          <p className="text-gray-300 text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed">
            Elige el plan ideal para ti y obtén acceso ilimitado a toda nuestra biblioteca de cursos, clases virtuales en vivo, recetas certificadas y asesoría directa por WhatsApp.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative -mt-12 px-6 z-20">
        <PlanesPublicos planes={planes} />
      </div>

      {/* FAQ Section */}
      {planes.length > 0 && (
        <div className="max-w-4xl mx-auto mt-24 px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-[#1A3A0A] mb-3">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Todo lo que necesitas saber sobre nuestras membresías y el acceso a la plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: '¿Puedo cancelar mi suscripción en cualquier momento?', r: 'Sí, por supuesto. Puedes cancelar tu suscripción de manera inmediata desde tu panel de estudiante. Mantendrás el acceso hasta el final de tu periodo de facturación actual.' },
              { q: '¿Cómo funciona el periodo de prueba gratis?', r: 'Si eliges un plan con días de prueba, tu tarjeta no recibirá ningún cargo hasta que finalice dicho periodo. Puedes cancelar antes del cobro sin costo alguno.' },
              { q: '¿Tengo acceso a todos los cursos y recetarios?', r: 'Sí. Todos los planes activos te dan un pase de acceso total a nuestra biblioteca de cursos, recetarios completos y mentoría grupal.' },
              { q: '¿Ofrecen certificados al finalizar?', r: '¡Sí! Al completar el 100% de cualquier curso en vivo o grabado, recibirás automáticamente tu certificado digital firmado a tu nombre.' }
            ].map(({ q, r }, idx) => (
              <div key={idx} className="bg-white border border-[#A8E060]/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-display font-semibold text-[15px] text-[#1A3A0A] mb-2 flex items-start gap-2">
                  <span className="text-[#5A9020] font-bold">¿</span>
                  <span>{q}</span>
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed pl-3 border-l-2 border-[#EAF7D0]">
                  {r}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Help Callout */}
      <div className="mt-20 text-center px-6">
        <div className="inline-flex flex-col items-center p-8 bg-[#F7FBF0] border border-[#EAF7D0] rounded-[32px] max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-4 text-[#5A9020]">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-display font-bold text-lg text-[#1A3A0A] mb-1">¿Necesitas ayuda personalizada?</h3>
          <p className="text-gray-500 text-[13px] mb-6 leading-relaxed">
            ¿Tienes dudas sobre los métodos de pago, facturación corporativa o deseas pagar por transferencia directa?
          </p>
          <a
            href="https://wa.me/51953822677"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold text-[14px] bg-[#5A9020] hover:bg-[#4A7018] text-white px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <MessageCircle size={18} />
            Hablemos por WhatsApp
          </a>
        </div>
      </div>

    </main>
  )
}
