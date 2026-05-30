'use client'

import { useState } from 'react'

import Image from 'next/image'

import { ShieldCheck, Download, Eye, X } from 'lucide-react'

const ISOS = [
  {
    nombre: 'ISO 9001',
    subtitulo: 'Sistema de Gestión de Calidad',
    descripcion: 'Garantiza que nuestros procesos educativos cumplen con los más altos estándares internacionales de calidad.',
    imagen: '/images/isos/iso9001.webp',
    pdf: '/images/isos/iso9001.pdf',
    nombreArchivo: 'ISO-9001-Grupo-Ollarves.pdf',
  },
  {
    nombre: 'ISO 21001',
    subtitulo: 'Sistema de Gestión para Org. Educativas',
    descripcion: 'Asegura una formación centrada en el estudiante, con procesos orientados a la mejora continua.',
    imagen: '/images/isos/iso21001.webp',
    pdf: '/images/isos/iso21001.pdf',
    nombreArchivo: 'ISO-21001-Grupo-Ollarves.pdf',
  },
]

export default function IsosSection() {
  const [modalPdf, setModalPdf] = useState<string | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [modalNombre, setModalNombre] = useState('')
  const [loading, setLoading] = useState(false)

  const openModal = async (pdfPath: string, nombre: string) => {
    setModalNombre(nombre)
    setModalPdf(pdfPath)
    setLoading(true)

    try {
      const res = await fetch(pdfPath)
      const blob = await res.blob()

      setBlobUrl(URL.createObjectURL(blob))
    } catch {
      setBlobUrl(null)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl)
    setBlobUrl(null)
    setModalPdf(null)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderTop: '1px solid hsl(214,20%,92%)' }}>

      {/* Modal PDF */}
      {modalPdf && (
        <>
          <div
            onClick={closeModal}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1200, backdropFilter: 'blur(4px)' }}
          />
          <div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(900px, 92vw)',
            height: '85vh',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 1201,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          }}>
            {/* Header del modal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid hsl(214,20%,92%)', background: 'linear-gradient(135deg,#012d22,#025E44)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="#BDD962" />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                  {modalNombre}
                </span>
              </div>
              <button
                onClick={closeModal}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', color: '#ffffff' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* PDF embebido via blob URL */}
            {loading ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', color: '#64748b', fontSize: '0.9rem' }}>Cargando documento...</div>
              </div>
            ) : blobUrl ? (
              <iframe
                src={blobUrl}
                style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
                title={`Certificado ${modalNombre}`}
              />
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', color: '#64748b', textAlign: 'center', margin: 0 }}>
                  No se pudo cargar la vista previa.
                </p>
                <a href={modalPdf ?? ''} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '10px', background: '#025E44', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                  <Download size={16} /> Abrir PDF
                </a>
              </div>
            )}
          </div>
        </>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(2,94,68,0.08)', border: '1px solid rgba(2,94,68,0.2)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1rem' }}>
            <ShieldCheck size={14} color="#025E44" />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#025E44', fontWeight: 600 }}>Certificaciones Internacionales</span>
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '0.75rem' }}>
            Calidad <span style={{ color: '#025E44' }}>certificada</span> a nivel internacional
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.7 }}>
            Contamos con certificaciones que respaldan nuestro compromiso con la excelencia educativa.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {ISOS.map(iso => (
            <div
              key={iso.nombre}
              style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid hsl(214,20%,91%)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', background: '#ffffff', display: 'flex', flexDirection: 'column' }}
            >
              {/* Portada — imagen del certificado */}
              <div style={{ background: 'linear-gradient(135deg, #012d22 0%, #025E44 100%)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', position: 'relative', minHeight: '260px' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div style={{ position: 'relative', width: '150px', height: '150px', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}>
                  <Image
                    src={iso.imagen}
                    alt={`Certificado ${iso.nombre}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#BDD962', margin: 0 }}>{iso.nombre}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: '0.25rem 0 0' }}>{iso.subtitulo}</p>
                </div>
              </div>

              {/* Contenido */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1.25rem' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                  {iso.descripcion}
                </p>

                {/* Botones */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  {/* Ver en modal */}
                  <button
                    onClick={() => openModal(iso.pdf, iso.nombre)}
                    style={{
                      flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.75rem', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #012d22, #025E44)',
                      color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8125rem',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    <Eye size={15} /> Ver certificado
                  </button>

                  {/* Descargar */}
                  <a
                    href={iso.pdf}
                    download={iso.nombreArchivo}
                    style={{
                      flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.75rem', borderRadius: '10px',
                      background: 'transparent', border: '1.5px solid #025E44',
                      color: '#025E44', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8125rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Download size={15} /> Descargar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
