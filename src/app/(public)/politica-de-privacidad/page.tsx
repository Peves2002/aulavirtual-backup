import React from 'react'

export const metadata = {
  title: 'Política de Privacidad | IFSEC Group',
  description: 'Política de Privacidad de IFSEC Group.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[var(--web-dark)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Política de Privacidad
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Última actualización: Noviembre de 2024
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            En <strong>IFSEC Group</strong> valoramos su privacidad y nos comprometemos a proteger sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios.
          </p>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">1. Información que Recopilamos</h2>
            <p>
              Podemos recopilar información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono y detalles de pago al registrarse en nuestros cursos, solicitar información o suscribirse a nuestros boletines. También podemos recopilar información de forma automática sobre su interacción con nuestro sitio web mediante el uso de cookies y tecnologías similares.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para proporcionarle y mejorar nuestros servicios, procesar sus transacciones, comunicarnos con usted, enviarle actualizaciones y ofertas promocionales, y cumplir con nuestras obligaciones legales.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">3. Compartir la Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos su información personal con terceros no afiliados para sus propios fines de marketing. Podemos compartir su información con proveedores de servicios de confianza que nos asisten en la operación de nuestro sitio web y la prestación de nuestros servicios, siempre y cuando se comprometan a mantener la confidencialidad de su información.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">4. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, ningún método de transmisión por Internet o sistema de almacenamiento electrónico es completamente seguro.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">5. Sus Derechos</h2>
            <p>
              Usted tiene el derecho de acceder, corregir, actualizar o solicitar la eliminación de su información personal. Si desea ejercer alguno de estos derechos, comuníquese con nosotros a través de los canales de contacto proporcionados en esta política.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">6. Contacto</h2>
            <p>
              Si tiene alguna pregunta o inquietud sobre nuestra Política de Privacidad o el tratamiento de sus datos personales, no dude en contactarnos a través de <strong>comercial@ifsec.pe</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
