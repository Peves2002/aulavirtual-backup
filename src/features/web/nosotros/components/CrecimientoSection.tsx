'use client'

import { useEffect, useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'

import { BookOpen, LayoutGrid, Users } from 'lucide-react'

const yearData = [
  { year: '2025', value: 1240 },
  { year: '2024', value: 890 },
  { year: '2023', value: 640 },
  { year: '2022', value: 410 },
  { year: '2021', value: 195 },
  { year: '2020', value: 80 },
]

const MAX_VALUE = 1240

const stats = [
  { icon: BookOpen, value: '48', label: 'Programas desarrollados' },
  { icon: LayoutGrid, value: '6', label: 'Áreas especializadas' },
  { icon: Users, value: '+2 800', label: 'Estudiantes capacitados' },
]

function CountUp({ target, started }: { target: number; started: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 2800
    const steps = 80
    const increment = target / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setCurrent(Math.min(Math.round(increment * step), target))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [started, target])

  return <>{current.toLocaleString('es-PE')}</>
}

export default function CrecimientoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#f8fafc', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}
        >
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--web-primary, #25927F)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
          }}>
            Nuestro crecimiento
          </p>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}>
            Crecemos cada año junto a{' '}
            <span style={{ color: 'var(--web-dark, #025E44)' }}>nuestros estudiantes</span>{' '}
            y estos son los resultados que hemos{' '}
            <span style={{ color: 'var(--web-dark, #025E44)' }}>logrado juntos</span>
          </h2>
        </motion.div>

        {/* Contenido: gráfico + stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>

          {/* Gráfico de barras horizontales */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {yearData.map((row, i) => {
                const pct = (row.value / MAX_VALUE) * 100

                return (
                  <div key={row.year} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Año */}
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#64748b',
                      width: '38px',
                      flexShrink: 0,
                      textAlign: 'right',
                    }}>
                      {row.year}
                    </span>

                    {/* Barra */}
                    <div style={{
                      flex: 1,
                      height: '36px',
                      backgroundColor: 'hsl(214,20%,90%)',
                      borderRadius: '8px',
                      overflow: 'visible',
                      position: 'relative',
                      marginRight: '52px',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${pct}%` } : { width: 0 }}
                        transition={{ duration: 2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          height: '100%',
                          background: i === 0
                            ? 'linear-gradient(90deg, var(--web-dark, #025E44), var(--web-primary, #25927F))'
                            : 'var(--web-dark, #025E44)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '10px',
                          position: 'relative',
                        }}
                      >
                        {/* Tooltip con valor */}
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.15 + 1.6 }}
                          style={{
                            position: 'absolute',
                            right: '-2px',
                            top: '50%',
                            transform: 'translateY(-50%) translateX(100%)',
                            backgroundColor: i === 0
                              ? 'var(--web-light, #BDD962)'
                              : 'var(--web-dark, #025E44)',
                            color: i === 0 ? '#0A0A0A' : '#ffffff',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            whiteSpace: 'nowrap',
                            zIndex: 2,
                          }}
                        >
                          {inView ? <CountUp target={row.value} started={inView} /> : '0'}
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                )
              })}

              {/* Eje X */}
              <div style={{ marginLeft: '50px', marginTop: '4px' }}>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--web-dark, #025E44)',
                  textAlign: 'center',
                }}>
                  Alumnos capacitados por año
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats verticales */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: '1.5px solid hsl(214,20%,92%)',
                }}
              >
                {/* Icono */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(var(--web-primary-rgb,37,146,127),0.1)',
                  border: '1.5px solid rgba(var(--web-primary-rgb,37,146,127),0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <s.icon size={24} color="var(--web-dark, #025E44)" />
                </div>

                {/* Texto */}
                <div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 800,
                    color: 'var(--web-dark, #025E44)',
                    lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginTop: '4px',
                    fontWeight: 500,
                  }}>
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
