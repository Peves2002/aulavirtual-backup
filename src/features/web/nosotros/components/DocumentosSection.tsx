'use client'

import { useState } from 'react'

import { FileText, Download, Maximize2, X } from 'lucide-react'

const documentos = [
  {
    key: 'presentacion',
    title: 'Presentación Institucional',
    desc: 'Conoce nuestra propuesta académica, metodología y trayectoria formando especialistas en el sector público.',
    file: '/archivos/presentacion.pdf',
  },
  {
    key: 'brochure',
    title: 'Brochure de Cursos',
    desc: 'Catálogo completo de cursos especializados en control gubernamental, contratación estatal y derecho administrativo.',
    file: '/archivos/brochure.pdf',
  },
]

export default function DocumentosSection() {
  const [modalFile, setModalFile] = useState<string | null>(null)
  const [modalTitle, setModalTitle] = useState('')

  const openModal = (file: string, title: string) => {
    setModalFile(file)
    setModalTitle(title)
  }

  const closeModal = () => setModalFile(null)

  return (
    <>
      <section style={{ backgroundColor: '#f8f8f8', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--web-primary, #D4AF37)', marginBottom: '0.75rem', display: 'block',
            }}>
              Documentos
            </p>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0,
            }}>
              Material Institucional
            </h2>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {documentos.map((doc) => (
              <div
                key={doc.key}
                style={{
                  backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden',
                  border: '1.5px solid #e5e5e5', boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Miniatura PDF real */}
                <div
                  style={{ position: 'relative', height: '280px', overflow: 'hidden', backgroundColor: '#f1f1f1', cursor: 'pointer' }}
                  onClick={() => openModal(doc.file, doc.title)}
                >
                  {/* iframe escalado como thumbnail */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '200%', height: '200%',
                    transform: 'scale(0.5)', transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}>
                    <iframe
                      src={doc.file}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title={`Miniatura: ${doc.title}`}
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay con botón "Ver completo" */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%)',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    paddingBottom: '1rem',
                    opacity: 0,
                    transition: 'opacity 0.25s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '10px', padding: '7px 14px',
                    }}>
                      <Maximize2 size={14} color="#0A0A0A" />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#0A0A0A' }}>Ver completo</span>
                    </div>
                  </div>

                  {/* Badge PDF fijo */}
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '4px 10px',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}>
                    <FileText size={12} color="#D4AF37" />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.05em' }}>PDF</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                      backgroundColor: 'rgba(var(--web-primary-rgb, 212, 175, 55),0.1)',
                      border: '1px solid rgba(var(--web-primary-rgb, 212, 175, 55),0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileText size={18} color="var(--web-primary, #D4AF37)" />
                    </div>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', margin: 0 }}>
                      {doc.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                    {doc.desc}
                  </p>

                  {/* Botones */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => openModal(doc.file, doc.title)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                        backgroundColor: 'var(--web-primary, #D4AF37)', color: '#ffffff',
                        border: 'none', borderRadius: '10px', padding: '0.625rem 1rem',
                        cursor: 'pointer', transition: 'filter 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.88)')}
                      onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
                    >
                      <Maximize2 size={15} />
                      Ver documento
                    </button>
                    <a
                      href={doc.file}
                      download
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        fontFamily: 'Montserrat, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                        backgroundColor: 'transparent', color: '#0A0A0A',
                        border: '1.5px solid #d1d5db', borderRadius: '10px', padding: '0.625rem 1rem',
                        textDecoration: 'none', flexShrink: 0, transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--web-primary, #D4AF37)'; e.currentTarget.style.color = 'var(--web-primary, #D4AF37)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#0A0A0A' }}
                    >
                      <Download size={15} />
                      Descargar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalFile && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, zIndex: 1300,
            backgroundColor: 'rgba(0,0,0,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '900px', height: '90vh',
              backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header modal */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem', borderBottom: '1px solid #e5e5e5', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <FileText size={20} color="var(--web-primary, #D4AF37)" />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A' }}>
                  {modalTitle}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a
                  href={modalFile}
                  download
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
                    color: '#0A0A0A', textDecoration: 'none',
                    backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '0.5rem 0.875rem',
                    border: '1px solid #e5e5e5', transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                >
                  <Download size={14} />
                  Descargar
                </a>
                <button
                  onClick={closeModal}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '8px',
                    backgroundColor: '#f3f4f6', border: '1px solid #e5e5e5',
                    cursor: 'pointer', color: '#0A0A0A', transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Visor PDF */}
            <iframe
              src={modalFile}
              style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
              title={modalTitle}
            />
          </div>
        </div>
      )}
    </>
  )
}
