'use client'

import { useState } from 'react'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif"

interface FAQItem {
  question: string
  answer: string
}

interface CourseFAQProps {
  faqs?: FAQItem[]
  title?: string
}

const defaultFaqs: FAQItem[] = [
  {
    question: '¿Qué opciones de financiación hay disponibles?',
    answer: 'Nuestros programas de posgrado cuentan con la posibilidad de financiarse a través de un pago fraccionado a lo largo del año académico.'
  },
  {
    question: '¿Las certificaciones oficiales tienen un coste adicional?',
    answer: 'Sí, la presentación a los exámenes de certificaciones oficiales (ej. Scrum Master, Google Analytics, AWS) es opcional y sus tasas no están incluidas en el precio de matrícula del programa.'
  },
  {
    question: '¿Puedo compatibilizar el programa con mi trabajo?',
    answer: 'Sí, nuestros programas están diseñados específicamente para profesionales en activo. La metodología asíncrona o mixta te permite adaptar el estudio a tus horarios.'
  }
]

export default function CourseFAQ({
  title = 'Preguntas frecuentes',
  faqs
}: CourseFAQProps) {
  const [expanded, setExpanded] = useState<string | false>(false)
  const data = faqs && faqs.length > 0 ? faqs : defaultFaqs

  return (
    <Box sx={{ my: 8 }}>
      <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: '#111111', mb: 5, letterSpacing: '-0.02em' }}>
        {title}
      </Typography>

      <Box sx={{ 
        borderTop: '1px solid #e2e8f0',
        '& .MuiAccordion-root': {
          boxShadow: 'none',
          bgcolor: 'transparent',
          borderBottom: '1px solid #e2e8f0',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 }
        }
      }}>
        {data.map((faq, i) => (
          <Accordion 
            key={i} 
            disableGutters 
            square
            expanded={expanded === `panel${i}`}
            onChange={() => setExpanded(expanded === `panel${i}` ? false : `panel${i}`)}
          >
            <AccordionSummary 
              expandIcon={<Typography sx={{ color: '#d92c2c', fontSize: '1.5rem', fontWeight: 400 }}>{expanded === `panel${i}` ? '−' : '+'}</Typography>}
              sx={{ px: 0, py: 1 }}
            >
              <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1rem', color: '#333333' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 3, pt: 0 }}>
              <Typography sx={{ fontFamily: FONT, fontSize: '1rem', color: '#475569', lineHeight: 1.6 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
