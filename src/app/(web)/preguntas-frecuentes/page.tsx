'use client'

import React, { useState } from 'react'

import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, TextField, InputAdornment } from '@mui/material'

import { ChevronDown, Search, BookOpen, Award, CreditCard, Briefcase, Users, RefreshCcw, Monitor, Building2, GraduationCap } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'

const FONT = 'Poppins, sans-serif'

const faqCategories = [
  {
    id: 'cursos',
    title: 'Sobre los cursos',
    icon: BookOpen,
    questions: [
      { q: '¿Qué tipo de cursos ofrece CEPAV?', a: 'Ofrecemos cursos y especializaciones online, grabados, en vivo y presenciales, de diferentes temas que ayudaran a los agentes de viaje a profesionalizarse y elevar el nivel de sus agencias de viaje.' },
      { q: '¿Los cursos son 100% online o también hay clases en vivo?', a: 'También tenemos clases en vivo y presenciales, o ambas modalidades en uno. El calendario de cursos y eventos los podrás ver en nuestras redes sociales.' },
      { q: '¿Necesito experiencia previa para llevar un curso?', a: 'En algunos cursos y especializaciones si, el tipo y nivel de experiencia que necesitas, lo podrás ver en el detalle del curso o especialización que desees llevar.' },
      { q: '¿Qué nivel tienen los cursos (básico, intermedio, avanzado)?', a: 'Contamos con los 3 niveles. Podrás verificar que nivel tiene el curso en el detalle del mismo.' },
      { q: '¿Quiénes son los docentes y qué experiencia tienen?', a: 'Todos nuestros docentes son agentes de viaje con amplia experiencia en el mercado, que han sido preparados y filtrados por nosotros antes de dictar un curso.' },
      { q: '¿Los cursos están enfocados en la realidad del mercado turístico actual?', a: 'Si, junto a los docentes, hemos elaborado cursos y especializaciones acorde al mercado y las nuevas tendencias que el turismo necesita.' },
      { q: '¿Cuánto dura cada curso?', a: 'Contamos con cursos desde 1 hora hasta las especializaciones que pueden ir de 6 a 10 horas.' },
      { q: '¿Los cursos incluyen material descargable o recursos adicionales?', a: 'Si, todos nuestros cursos cuentan con material descargable y recursos adicionales, elaborados por nuestros docentes y nuestro equipo académico.' }
    ]
  },
  {
    id: 'acceso',
    title: 'Acceso y experiencia de aprendizaje',
    icon: Monitor,
    questions: [
      { q: '¿Por cuánto tiempo tengo acceso a los cursos?', a: 'Los cursos cortos tienen acceso por 1 año y las especializaciones hasta 6 meses.' },
      { q: '¿Puedo ver las clases desde mi celular o tablet?', a: 'Si, todos nuestros cursos están desarrollados en una plataforma que te permitirá verlos desde cualquier dispositivo.' },
      { q: '¿Puedo avanzar a mi propio ritmo?', a: 'Todos nuestros cursos están diseñados para que los veas a tu ritmo, desde donde tu desees.' },
      { q: '¿Qué pasa si no termino el curso a tiempo?', a: 'Puedes comunicarte con nosotros para ayudarte y de ser necesario extenderte el tiempo.' },
      { q: '¿Hay evaluaciones o proyectos prácticos?', a: 'Algunos cursos y especializaciones si cuentan con evaluaciones y proyectos prácticos que deberás desarrollar para obtener la certificación o constancia de haber llevado el curso.' },
      { q: '¿Recibiré acompañamiento o soporte durante el curso?', a: 'Algunos cursos y especializaciones si cuentan con acompañamiento, tanto del docente o de nuestro equipo académico.' }
    ]
  },
  {
    id: 'certificacion',
    title: 'Certificación y valor profesional',
    icon: Award,
    questions: [
      { q: '¿Recibiré un certificado al finalizar el curso?', a: 'Si, todos los cursos tienen certificado y/o constancia de participación, según el tipo de curso o especialización.' },
      { q: '¿Los certificados tienen validez?', a: 'Si, están respaldados por asociaciones de turismo e instituciones educativas privadas, las cuales están indicadas en el curso o especialización que elijas.' },
      { q: '¿Qué debo hacer para obtener mi certificación?', a: 'Debes de completar el curso y/o haber finalizado con éxito las evaluaciones y tareas que el docente te haya indicado.' },
      { q: '¿En cuánto tiempo recibiré mi certificado?', a: 'Si es un curso corto lo recibes inmediatamente lo hayas finalizado con éxito, las especializaciones toman de 3 a 5 días hábiles, dependiendo el tipo de evaluación que tengas que pasar.' }
    ]
  },
  {
    id: 'pagos',
    title: 'Pagos y acceso comercial',
    icon: CreditCard,
    questions: [
      { q: '¿Cuáles son las formas de pago disponibles?', a: 'Al adquirir un curso online puedes pagarlo con cualquier tarjeta de debido o crédito y diferentes billeteras digitales. Si tuvieses algún problema con el pago nos puedes escribir para ayudarte y darte otras alternativas.' },
      { q: '¿Puedo pagar en cuotas?', a: 'Solo si tu tarjeta de crédito te lo permite.' },
      { q: '¿Hay descuentos por comprar varios cursos?', a: 'Si, puedes obtener descuentos si realizas compras de 2 a más cursos o especializaciones.' },
      { q: '¿Existen descuentos para grupos o empresas?', a: 'Si, tenemos precios especiales y códigos de descuento para grupos y empresas. Puedes solicitarlos poniéndote en contacto con nosotros.' },
      { q: '¿Qué incluye el precio del curso?', a: 'El precio incluye el acceso al curso durante el tiempo indicado en la descripción del mismo, así mismo material y recursos descargables, constancia o certificado y acompañamiento durante todo el proceso.' }
    ]
  },
  {
    id: 'bolsa',
    title: 'Bolsa de trabajo',
    icon: Briefcase,
    questions: [
      { q: '¿CEPAV me ayuda a conseguir trabajo?', a: 'Si, contamos con una bolsa de trabajo en nuestra web y en los demás canales. Además, los alumnos con más cursos y especializaciones, pueden pasar más rápido los filtros de las agencias de viaje afiliadas a CEPAV.' },
      { q: '¿Cómo funciona la bolsa de trabajo?', a: 'Contamos con agencias de viaje afiliadas que nos envían sus solicitudes de personal. Al terminar un curso, agrega tu certificado a tu CV para destacar en nuestras convocatorias.' },
      { q: '¿Qué debo hacer para acceder a oportunidades laborales?', a: 'Llevar la mayor cantidad de cursos posible, capacitarte con nuestros video tutoriales y actualizar tu currículo con los certificados obtenidos.' },
      { q: '¿Las empresas están verificadas?', a: 'Si, todas las agencias de viaje que solicitan personal son formales, están verificadas y han sido capacitadas para brindar un ambiente laboral profesional.' },
      { q: '¿CEPAV garantiza empleo después de estudiar?', a: 'Garantizamos la relación entre el postulante y la empresa. La capacitación constante te da una ventaja competitiva sobre otros postulantes.' }
    ]
  },
  {
    id: 'comunidad',
    title: 'Comunidad y beneficios',
    icon: Users,
    questions: [
      { q: '¿Al estudiar en CEPAV paso a formar parte de una comunidad?', a: 'Si, desde tu primer curso formas parte de una comunidad de profesionales y agentes de viaje que buscan mejorar constantemente.' },
      { q: '¿Qué beneficios adicionales obtengo como estudiante?', a: 'Accedes a descuentos, networking, bolsas de trabajo y asesoría profesional.' },
      { q: '¿Tengo acceso a biblioteca digital o recursos exclusivos?', a: 'Si, los alumnos que llevan especializaciones y más de 4 cursos acceden a nuestra biblioteca digital con recursos exclusivos.' }
    ]
  },
  {
    id: 'reembolsos',
    title: 'Reembolsos y cambios',
    icon: RefreshCcw,
    questions: [
      { q: '¿Puedo solicitar un reembolso si ya pagué?', a: 'Solo es posible solicitarlo en los primeros 10 minutos de la compra, dentro del horario laboral (Lun-Vie 9am-6pm). Se aplican descuentos por gastos administrativos de hasta el 15%.' },
      { q: '¿Qué pasa si no puedo llevar el curso?', a: 'Comunícate con nosotros para evaluar tu caso y ver cómo podemos ayudarte.' },
      { q: '¿Qué sucede si no se completa el mínimo de alumnos?', a: 'Se reprograma el curso o se realiza la devolución del 100% del pago.' }
    ]
  },
  {
    id: 'empresas',
    title: 'Para empresas',
    icon: Building2,
    questions: [
      { q: '¿CEPAV ofrece capacitación para agencias de viaje?', a: 'Si, realizamos capacitaciones privadas e in-house adaptadas a las necesidades de tu agencia.' },
      { q: '¿Puedo publicar ofertas laborales en la plataforma?', a: 'Si, contamos con una pestaña específica donde puedes llenar un formulario para realizar tu solicitud de personal.' }
    ]
  },
  {
    id: 'docentes',
    title: 'Para docentes',
    icon: GraduationCap,
    questions: [
      { q: '¿Cómo puedo convertirme en docente de CEPAV?', a: 'Buscamos profesionales activos en el sector. Puedes postular a través de nuestra web o contactarnos directamente por correo o teléfono.' },
      { q: '¿Qué requisitos necesito para dictar un curso?', a: 'Mínimo 3 años de experiencia, experiencia laboral real actualizada, habilidad de comunicación y disponibilidad para grabaciones.' }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0)

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      {/* Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 100%)',
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '2.25rem', md: '3.5rem' },
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              mb: 3,
            }}
          >
            Preguntas Frecuentes
          </Typography>
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Busca tu duda aquí..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="rgba(255,255,255,0.6)" size={20} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  color: '#ffffff',
                  fontFamily: FONT,
                  '& fieldset': { border: '1px solid rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'var(--web-light, #BDD962) !important' },
                }
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 6 }}>
        {filteredFaqs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontFamily: FONT, color: '#64748b' }}>No encontramos preguntas que coincidan con tu búsqueda.</Typography>
          </Box>
        ) : (
          <Stack spacing={6}>
            {filteredFaqs.map((cat, idx) => (
              <ScrollReveal key={cat.id} direction="up" delay={idx * 0.05}>
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <cat.icon size={20} color="var(--web-primary, #25927F)" />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: FONT, fontWeight: 800, color: '#1e293b' }}>
                      {cat.title}
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5}>
                    {cat.questions.map((q, qIdx) => (
                      <Accordion 
                        key={qIdx}
                        elevation={0}
                        sx={{
                          borderRadius: '16px !important',
                          border: '1px solid #e2e8f0',
                          '&:before': { display: 'none' },
                          '&.Mui-expanded': { boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderColor: 'var(--web-primary, #25927F)' }
                        }}
                      >
                        <AccordionSummary expandIcon={<ChevronDown size={20} color="var(--web-primary, #25927F)" />}>
                          <Typography sx={{ fontFamily: FONT, fontWeight: 600, color: '#334155' }}>
                            {q.q}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography sx={{ fontFamily: FONT, color: '#64748b', lineHeight: 1.7 }}>
                            {q.a}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </Box>
              </ScrollReveal>
            ))}
          </Stack>
        )}
      </Container>

      {/* Footer CTA */}
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', p: 5, borderRadius: '32px', bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
          <Typography sx={{ fontFamily: FONT, fontWeight: 700, mb: 1 }}>¿Aún tienes dudas?</Typography>
          <Typography sx={{ fontFamily: FONT, color: '#64748b', mb: 3 }}>Nuestro equipo está listo para ayudarte en tiempo real.</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Box component="a" href="https://wa.me/51928510125" sx={{ px: 4, py: 1.5, bgcolor: '#25D366', color: '#fff', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
              Hablar por WhatsApp
            </Box>
            <Box component="a" href="mailto:informes@crececoncepav.com" sx={{ px: 4, py: 1.5, bgcolor: 'var(--web-dark, #025E44)', color: '#fff', borderRadius: '12px', fontWeight: 700, textDecoration: 'none' }}>
              Enviar Correo
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
