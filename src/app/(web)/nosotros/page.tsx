'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Target, Eye, Users, Lightbulb, Heart, ShieldCheck, Globe, Zap, Handshake, Briefcase } from 'lucide-react'

import ScrollReveal from '@/features/web/home/components/ScrollReveal'
import { eyebrow, sectionH2, sectionDesc, cardTitle, cardBody } from '@/features/web/home/components/typography'
import BeTeacherSection from '@/features/web/nosotros/components/BeTeacherSection'
import StaffRequestModal from '@/features/web/nosotros/components/StaffRequestModal'

import carmen from '@/utils/assets/personal/carmen.png'
import jhonatan from '@/utils/assets/personal/jhonatan.png'

export const metadata = {
  title: 'Nosotros - Aula Virtual',
  description: 'Conoce quiénes somos, nuestra misión, visión y la filosofía que guía a CEPAV.',
}

export default function NosotrosPage() {
  return (
    <>
      {/* ── 1. HERO / QUIÉNES SOMOS ─────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--web-dark-deep, #012d22) 0%, var(--web-dark, #025E44) 45%, var(--web-dark-mid, #0f4438) 100%)',
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-primary-rgb, 37, 146, 127),0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(var(--web-light-rgb, 189, 217, 98),0.12)', border: '1px solid rgba(var(--web-light-rgb, 189, 217, 98),0.25)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--web-light, #BDD962)', boxShadow: '0 0 6px var(--web-light, #BDD962)' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: 'var(--web-light, #BDD962)', fontWeight: 600 }}>Sobre nosotros</span>
                </div>

                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                  ¿Quiénes <span style={{ color: 'var(--web-light, #BDD962)' }}>somos?</span>
                </h1>
                <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  CEPAV es el primer centro especializado para entrenar agentes de viaje en el Perú. Fundado por Jhonatan Ponte Guerrero y la Lic. Carmen Perez-Palma Llano.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '12px', backgroundColor: 'var(--web-light, #BDD962)', color: '#0A0A0A', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(var(--web-light-rgb, 189, 217, 98),0.35)' }}>
                    Explorar formación <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <p style={{ ...cardBody, color: '#ffffff', fontSize: '1rem', lineHeight: 1.7 }}>
                  Ambos, a través de sus conocimientos y experiencia, buscan aportar a los agentes de viaje herramientas que les permitan ser más competitivos, innovadores y eficientes, contando con una plana docente con amplia experiencia y conocimientos teóricos y prácticos en sus campos de especialidad.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. FUNDADORES ─────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {/* Founder 1: Jhonatan */}
            <ScrollReveal direction="up">
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', height: '420px', backgroundColor: 'transparent', border: '1px solid #f1f5f9', borderRadius: '24px', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Image 
                    src={jhonatan} 
                    alt="Jhonatan Ponte Guerrero" 
                    width={400} 
                    height={420} 
                    style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ ...cardTitle, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Jhonatan Ponte Guerrero</h3>
                <p style={{ ...cardBody, color: 'var(--web-primary, #25927F)', fontWeight: 600, marginBottom: '1rem' }}>Fundador & CEO</p>
                <p style={{ ...cardBody }}>CEO de Futurismo Group & Travel, conferencista en marketing turístico, innovación y experiencia del cliente.</p>
              </div>
            </ScrollReveal>

            {/* Founder 2: Carmen */}
            <ScrollReveal direction="up" delay={0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', height: '420px', backgroundColor: 'transparent', border: '1px solid #f1f5f9', borderRadius: '24px', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Image 
                    src={carmen} 
                    alt="Lic. Carmen Perez-Palma Llano" 
                    width={400} 
                    height={420} 
                    style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ ...cardTitle, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Lic. Carmen Perez-Palma Llano</h3>
                <p style={{ ...cardBody, color: 'var(--web-primary, #25927F)', fontWeight: 600, marginBottom: '1rem' }}>Fundadora & Directora Académica</p>
                <p style={{ ...cardBody }}>Guía oficial de turismo y docente con más de 15 años de experiencia en instituciones como INTECI, Columbia y UCV.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. MISIÓN / VISIÓN ────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'hsl(167, 30%, 96%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Misión */}
            <ScrollReveal direction="left">
              <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(37, 146, 127, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Target size={28} color="var(--web-primary, #25927F)" />
                </div>
                <h2 style={{ ...sectionH2, fontSize: '1.75rem', marginBottom: '1rem' }}>Misión</h2>
                <p style={{ ...sectionDesc, fontSize: '1rem', color: '#475569' }}>
                  Entrenar a los agentes de viaje con conocimientos y herramientas vanguardistas, alineados al contexto actual del turismo, para que inicien sus emprendimientos o fortalezcan las empresas donde laboran.
                </p>
              </div>
            </ScrollReveal>

            {/* Visión */}
            <ScrollReveal direction="right" delay={0.2}>
              <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(189, 217, 98, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Eye size={28} color="var(--web-dark, #025E44)" />
                </div>
                <h2 style={{ ...sectionH2, fontSize: '1.75rem', marginBottom: '1rem' }}>Visión</h2>
                <p style={{ ...sectionDesc, fontSize: '1rem', color: '#475569' }}>
                  Ser la fuente líder en educación y desarrollo profesional para agentes de viaje en la industria turística peruana y latinoamericana, con proyección a ser un instituto formal de formación técnica en el mediano plazo.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 4. FILOSOFÍA ─────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={eyebrow}>NUESTRA FILOSOFÍA</p>
            <h2 style={sectionH2}>En CEPAV creemos que el turismo <br /> se enseña desde la práctica</h2>
            <p style={{ ...sectionDesc, maxWidth: '700px', margin: '0.75rem auto 0' }}>Nuestra filosofía se basa en tres pilares fundamentales que conectan la educación con el mundo real.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { 
                icon: Lightbulb, 
                title: '1. Aprendizaje con sentido real y aplicable', 
                desc: 'Formamos agentes de viaje con conocimientos útiles desde el primer día, conectados con los desafíos reales de una agencia.',
                quote: '“El conocimiento que no se puede aplicar, no transforma.”'
              },
              { 
                icon: Users, 
                title: '2. Docentes que inspiran desde la experiencia', 
                desc: 'Valoramos la formación impartida por profesionales en ejercicio activo, que enseñan desde lo que hacen.',
                quote: '“Quien enseña debe seguir aprendiendo. Quien inspira, deja huella.”'
              },
              { 
                icon: Globe, 
                title: '3. Crecimiento profesional con propósito social', 
                desc: 'Promovemos la formación como vía para generar empleabilidad, emprendimiento y transformación en regiones.',
                quote: '“Cuando formamos a un agente de viajes, fortalecemos el turismo y el país.”'
              }
            ].map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'hsl(167, 30%, 96%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <p.icon size={24} color="var(--web-primary, #25927F)" />
                  </div>
                  <h3 style={{ ...cardTitle, fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ ...cardBody, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>{p.desc}</p>
                  <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'hsl(167, 30%, 98%)', borderRadius: '12px', borderLeft: '4px solid var(--web-primary, #25927F)' }}>
                    <p style={{ ...cardBody, fontStyle: 'italic', color: 'var(--web-dark, #025E44)', fontWeight: 600, fontSize: '0.875rem' }}>{p.quote}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VALORES ───────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={sectionH2}>Valores que fundamentan nuestra filosofía</h2>
          </div>

          <ScrollReveal direction="up">
            <div style={{ overflowX: 'auto', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', backgroundColor: '#ffffff' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--web-dark, #025E44)', color: '#ffffff' }}>
                    <th style={{ padding: '1.25rem 2rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>VALOR</th>
                    <th style={{ padding: '1.25rem 2rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CÓMO LO VIVIMOS EN CEPAV</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { v: 'Excelencia', d: 'Nos exigimos entregar cursos de alta calidad y relevancia', icon: Heart },
                    { v: 'Innovación', d: 'Usamos tecnología, iA y metodologías activas', icon: Zap },
                    { v: 'Integridad', d: 'Actuamos con ética, transparencia y coherencia', icon: ShieldCheck },
                    { v: 'Responsabilidad social', d: 'Becamos, apoyamos y llevamos conocimiento a donde no llega', icon: Handshake },
                    { v: 'Adaptabilidad', d: 'Evolucionamos al ritmo de la industria y del estudiante', icon: Globe },
                    { v: 'Diversidad e inclusión', d: 'Respetamos los distintos orígenes, trayectorias y contextos', icon: Users },
                  ].map((val, idx) => (
                    <tr key={idx} style={{ borderBottom: idx === 5 ? 'none' : '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <val.icon size={18} color="var(--web-primary, #25927F)" />
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#0f172a' }}>{val.v}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#64748b' }}>
                        {val.d}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. SOLICITUD DE PERSONAL (PARA EMPRESARIOS) ── */}
      <StaffRequestSection />

      {/* ── 7. CONVOCATORIA DOCENTE ─────────────────── */}
      <BeTeacherSection />
    </>
  )
}

function StaffRequestSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--web-dark, #025E44)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--web-light-rgb, 189, 217, 98),0.2) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <ScrollReveal direction="left">
            <div>
              <p style={{ ...eyebrow, color: 'var(--web-light, #BDD962)' }}>PARA EMPRESARIOS</p>
              <h2 style={{ ...sectionH2, color: '#ffffff', marginBottom: '1.5rem' }}>¿Buscas talento calificado para tu empresa?</h2>
              <p style={{ ...sectionDesc, color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
                Nuestros egresados cuentan con la formación técnica y práctica necesaria para integrarse de inmediato a los retos del sector turismo. 
                Solicita personal especializado y potencia tu equipo comercial u operativo.
              </p>
              
              <Button 
                variant="contained" 
                onClick={() => setIsModalOpen(true)}
                startIcon={<Briefcase size={20} />}
                sx={{ 
                  bgcolor: 'var(--web-light, #BDD962)', 
                  color: 'var(--web-dark, #025E44)', 
                  borderRadius: '16px', 
                  px: 4, 
                  py: 2, 
                  fontWeight: 800, 
                  fontSize: '1rem',
                  fontFamily: 'Poppins, sans-serif',
                  '&:hover': { bgcolor: '#acc55a', transform: 'scale(1.02)' },
                  transition: 'all 0.3s'
                }}
              >
                SOLICITUD DE PERSONAL
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ ...cardTitle, color: '#ffffff', fontSize: '1.375rem', marginBottom: '1.25rem' }}>Nuestro Compromiso B2B</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Perfiles evaluados y validados académicamente.',
                  'Ahorro en tiempos de reclutamiento.',
                  'Conexión directa con los mejores talentos del sector.',
                  'Soporte continuo en la selección de candidatos.'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={20} color="var(--web-light, #BDD962)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <StaffRequestModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
