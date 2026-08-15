import React from 'react'

export const metadata = {
  title: 'Política de Cambios y Devoluciones | IFSEC Group',
  description: 'Política de Cambios y Devoluciones de IFSEC Group.',
}

export default function PoliticaCambiosYDevolucionesPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[var(--web-dark)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Política de Cambios y Devoluciones
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Última actualización: Noviembre de 2024
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            La presente política regula las condiciones de reembolso y cambios aplicables a los
            servicios educativos ofrecidos por <strong>IFSEC Group</strong> a través de su plataforma. Al adquirir cualquier curso o servicio,
            el usuario declara haber leído y aceptado los términos aquí descritos.
          </p>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">1. Naturaleza del Servicio</h2>
            <p>
              Los cursos y materiales ofrecidos en nuestra plataforma constituyen <strong>contenido digital de ejecución inmediata</strong>.
              Esto implica que el servicio educativo se activa y se considera prestado desde el momento en que el
              usuario realiza su primer acceso a la plataforma, visualiza la primera lección o descarga cualquier
              material complementario del curso adquirido.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">2. Excepción por Contenido Digital — Cláusula de Ejecución Inmediata</h2>
            <p>
              De conformidad con el <strong>Código de Protección y Defensa del Consumidor (Ley N° 29571)</strong> y
              las disposiciones de <strong>INDECOPI</strong> sobre contratos a distancia y servicios de ejecución inmediata:
            </p>
            <p className="mt-4">
              El usuario reconoce expresamente que, al realizar el primer inicio de sesión, visualizar la primera
              lección o descargar cualquier material del curso, otorga su <strong>consentimiento expreso para el inicio
              inmediato de la prestación del servicio</strong>, renunciando con ello a su derecho de arrepentimiento
              o solicitud de reembolso, dado que el servicio se considera consumido desde el inicio de su ejecución.
            </p>
            <p className="mt-4">
              Esta condición es aplicable a todos los cursos, rutas de aprendizaje, paquetes y materiales
              digitales disponibles en la plataforma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">3. Condiciones para Solicitar Reembolso</h2>
            <p>
              El usuario podrá solicitar el reembolso total de su compra únicamente bajo las siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Antes del primer acceso:</strong> Que el usuario no haya ingresado a la plataforma ni
                visualizado contenido alguno tras la compra. El plazo máximo para esta solicitud es de <strong>7 días calendario</strong> desde la fecha de pago confirmado.
              </li>
              <li>
                <strong>Falla técnica insubsanable:</strong> Si existe un error técnico atribuible a nuestra
                plataforma que impida el acceso al contenido, y que el equipo de soporte no pueda resolver en un plazo
                de <strong>72 horas hábiles</strong> desde la notificación formal del incidente.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">4. Proceso de Solicitud de Reembolso</h2>
            <p>
              Para iniciar un proceso de devolución (si aplica), el usuario debe:
            </p>
            <ol className="list-decimal pl-6 mt-4 space-y-2">
              <li>
                Enviar un correo a <strong>comercial@ifsec.pe</strong> con el asunto:{' '}
                <em>&quot;Solicitud de Reembolso — [Nombre del Curso/Servicio]&quot;</em>.
              </li>
              <li>Adjuntar el comprobante de pago y número de pedido correspondiente.</li>
              <li>
                Nuestro equipo auditará los registros de acceso (logs de IP y actividad) para verificar que el
                contenido no haya sido consumido antes de proceder con la evaluación de la solicitud.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">5. Modalidad de Reembolso</h2>
            <p>
              Si la solicitud es aprobada, el reembolso se gestionará a través de nuestras pasarelas de pago.
              El tiempo de acreditación en la cuenta del cliente dependerá de su entidad bancaria, generalmente
              entre <strong>15 y 30 días hábiles</strong>.
            </p>
            <p className="mt-4">
              IFSEC Group se reserva el derecho de descontar las comisiones operativas
              cobradas por la pasarela de pago que no sean reembolsables por la misma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--web-dark)] mb-4 mt-8">6. Contacto y Atención al Cliente</h2>
            <p>
              Para consultas relacionadas con esta política, comuníquese con nosotros a través de{' '}
              <strong>comercial@ifsec.pe</strong>. De acuerdo con la legislación de protección
              al consumidor vigente, también ponemos a su disposición nuestro{' '}
              <a href="/libro-de-reclamaciones" className="text-[var(--web-primary)] underline hover:text-[#1f7d6d] transition-colors">
                Libro de Reclamaciones
              </a>{' '}
              en la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
