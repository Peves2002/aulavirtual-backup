import React from 'react'

export const metadata = {
  title: 'Términos y Condiciones | IFSEC Group',
  description: 'Términos y Condiciones de IFSEC Group.',
}

export default function TerminosYCondicionesPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[var(--web-dark)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Términos y Condiciones
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Última actualización: 15 de agosto de 2026
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            Bienvenido a <strong>IFSEC Group</strong>, marca comercial de <strong>Ifsec Perú S.A.C.</strong>,
            identificada con RUC <strong>20514508179</strong> y domicilio en Callao, Callao, Bellavista
            (&quot;Nosotros&quot;). Al acceder a nuestro sitio web y utilizar nuestros servicios,
            usted (&quot;el Usuario&quot;) acepta estar sujeto a los presentes Términos y Condiciones.
            Le sugerimos leer esta página cuidadosamente antes de proceder con cualquier compra o inscripción.
          </p>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">1. Generalidades de los Servicios</h2>
            <p>
              IFSEC Group brinda servicios de capacitación, Consultoría en Sistemas de Gestión - ISO, Capacitaciones y entrenamiento, Eventos, activaciones BTL y campañas en SST y Respuesta ante emergencias, Actividades de Trabajos de Alto Riesgo.
              Nuestra plataforma contiene cursos y certificaciones dirigidos a profesionales de las diferentes especialidades y sectores económicos.
              Al adquirir un curso, está comprando una licencia de acceso individual e intransferible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">2. Pagos, Precios e Impuestos</h2>
            <p>
              Todos los pagos procesados en nuestro sitio web se gestionan a través de pasarelas de pago seguras.
              Los precios expuestos pueden estar sujetos a cambios; no obstante, una vez procesada una orden y validado el pago,
              el precio se mantendrá respetado. En caso de aplicar cupones de descuento, estos deben validarse antes del check-out final.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">3. Políticas de Devolución</h2>
            <p>
              Debido a la naturaleza de los bienes digitales y servicios de capacitación, 
              <strong>las devoluciones o reembolsos no están permitidos</strong> una vez que el usuario ingresa a la plataforma
              o se comprueba la descarga del material. Ante cualquier incidencia inusual o fallo técnico,
              puede escribir a nuestro equipo de soporte que evaluará excepciones únicamente ante defectos probados del sistema.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">4. Propiedad Intelectual e Industrial</h2>
            <p>
              Todo el material expuesto en la plataforma web (textos, gráficos, videos, diagramas y recursos)
              pertenece originariamente a IFSEC Group o a sus instructores afiliados.
              Queda estrictamente prohibida su copia, distribución sin autorización comercial y cualquier modalidad de piratería.
              Cualquier violación directa implicará el bloqueo irrevocable de la cuenta y potenciales acciones civiles correspondientes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">5. Certificaciones</h2>
            <p>
              La emisión de certificados dentro de nuestra plataforma se somete a los requisitos técnicos
              indicados en cada curso (visualización, aprobación de evaluaciones, etc.). IFSEC Group se reserva
              el derecho de verificar y cruzar la identidad de los estudiantes y de no emitir certificaciones si constata fraude o suplantación.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">6. Privacidad y Datos Personales</h2>
            <p>
              Nos comprometemos a mantener la confidencialidad de la información proporcionada por los usuarios en el momento
              del registro (Ley de Protección de Datos Personales o norma correspondiente en territorio Peruano).
              Los datos se utilizan estrictamente para el servicio comercial del curso y fines facturativos,
              nunca serán expendidos a bases de datos de terceros.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">7. Contacto y Libro de Reclamaciones</h2>
            <p>
              Para consultas de soporte, envíe sus requerimientos a <strong>comercial@ifsec.pe</strong> o
              comuníquese al <strong>965 052 858</strong>.
              De acuerdo a la legislación vigente de protección al consumidor peruano, mantenemos un{' '}
              <a href="/libro-de-reclamaciones" className="text-[var(--web-primary)] underline hover:text-[#1f7d6d] transition-colors">Libro de Reclamaciones a disposición pública</a>{' '}
              en nuestra plataforma web.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
