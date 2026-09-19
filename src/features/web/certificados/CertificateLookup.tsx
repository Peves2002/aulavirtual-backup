'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import Link from 'next/link'

import { ArrowRight, Award, CheckCircle2, Download, FileSearch, Fingerprint, Loader2, Search, ShieldCheck, UserRound } from 'lucide-react'

import styles from './CertificateLookup.module.css'

type Certificate = { codigo: string; estudiante: string; curso: string; duracion: string | null; emision: string }
type CertificateLookupProps = { brandName?: string; logoUrl?: string }
const dateFormat = new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Lima' })

function formatDate(value: string) {
  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? 'No registrada' : dateFormat.format(date)
}

function formatExpirationDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No registrada'
  
  date.setFullYear(date.getFullYear() + 1)
  return dateFormat.format(date)
}

export default function CertificateLookup({ brandName = 'MS&M CONSULTING', logoUrl }: CertificateLookupProps) {
  const [dni, setDni] = useState('')
  const [searchedDni, setSearchedDni] = useState('')
  const [certificates, setCertificates] = useState<Certificate[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initialDni = new URLSearchParams(window.location.search).get('dni') || ''

    if (/^\d{8}$/.test(initialDni)) setDni(initialDni)
  }, [])

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    if (!/^\d{8}$/.test(dni.trim())) {
      setError('Ingresa los 8 dígitos de tu DNI, sin espacios ni guiones.')

      return
    }

    setLoading(true)

    setError('')
    setCertificates(null)

    try {
      const response = await fetch('/api/public/certificados', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dni: dni.trim() })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'No pudimos realizar la consulta.')
      setCertificates(data.certificados)
      setSearchedDni(dni.trim())
      requestAnimationFrame(() => resultsRef.current?.focus())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Revisa tu conexión e inténtalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="Ruta de navegación" className={styles.breadcrumb}><Link href="/">Inicio</Link><span>/</span><span>Verificar certificado</span></nav>
          <div className={styles.heroContent}>
            <div>
              <span className={styles.eyebrow}><ShieldCheck size={16} aria-hidden="true" /> VERIFICACIÓN DE CERTIFICADOS</span>
              <h1>Tu aprendizaje merece<br /><span>ser reconocido.</span></h1>
              <p>Consulta tus cursos certificados y descarga el respaldo de tus logros. Solo necesitas tu DNI.</p>
            </div>
            <div className={styles.seal} aria-label={`Identidad de ${brandName}`}>
              {logoUrl ? <img src={logoUrl} alt={brandName} /> : <Award size={72} strokeWidth={1.2} aria-hidden="true" />}
              <span>{brandName}</span>
            </div>
          </div>
        </div>
      </section>

      <div className={`${styles.container} ${styles.body}`}>
        <section className={styles.searchCard} aria-labelledby="search-title">
          <div className={styles.searchHeading}><span className={styles.icon}><Fingerprint size={27} /></span><div><h2 id="search-title">Encuentra tus certificados</h2><p>Ingresa el DNI de la persona que realizó el curso.</p></div></div>
          <form onSubmit={search} noValidate>
            <label htmlFor="certificate-dni">Documento Nacional de Identidad (DNI)</label>
            <div className={styles.formRow}>
              <div className={styles.inputWrap}><UserRound size={20} aria-hidden="true" /><input id="certificate-dni" name="dni" type="text" inputMode="numeric" autoComplete="off" maxLength={8} placeholder="Ingresa 8 dígitos" value={dni} disabled={loading} aria-invalid={!!error} aria-describedby={error ? 'dni-error' : 'dni-help'} onChange={event => { setDni(event.target.value); setError('') }} /></div>
              <button className={styles.primaryButton} type="submit" disabled={loading}>{loading ? <Loader2 size={19} className={styles.spinner} /> : <Search size={19} />}{loading ? 'Consultando…' : 'Buscar certificados'}</button>
            </div>
            {error ? <p id="dni-error" role="alert" className={styles.error}>{error}</p> : <p id="dni-help" className={styles.help}><ShieldCheck size={15} /> Consulta los certificados emitidos en nuestra plataforma.</p>}
          </form>
        </section>

        <div aria-live="polite" role="status" className={styles.status}>{loading ? 'Buscando certificados…' : certificates ? `${certificates.length} certificados encontrados.` : ''}</div>
        {certificates !== null ? (
          <section ref={resultsRef} tabIndex={-1} className={styles.results} aria-label="Resultados de la consulta">
            {certificates.length ? <>
              <div className={styles.person}><span className={styles.avatar}><UserRound size={28} /></span><div><span className={styles.overline}>TITULAR DE LOS CERTIFICADOS</span><h2>{certificates[0].estudiante}</h2><p>DNI {searchedDni}</p></div><span className={styles.count}>{certificates.length} {certificates.length === 1 ? 'certificado' : 'certificados'}</span></div>
              <div className={styles.tableHeading}><h3>Cursos certificados</h3><p>Consulta la autenticidad de tus certificados.</p></div>
              
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <caption className={styles.srOnly}>Cursos y certificados de {certificates[0].estudiante}</caption>
                  <thead><tr><th scope="col">Curso</th><th scope="col">Duración</th><th scope="col">Fecha de emisión</th><th scope="col">Fecha de expiración</th><th scope="col">Código de certificado</th></tr></thead>
                  <tbody>{certificates.map(certificate => <tr key={certificate.codigo}>
                    <td data-label="Curso"><strong>{certificate.curso}</strong><span className={styles.issued}><CheckCircle2 size={14} /> Certificado emitido</span></td>
                    <td data-label="Duración">{certificate.duracion || 'No registrada'}</td>
                    <td data-label="Emisión">{formatDate(certificate.emision)}</td>
                    <td data-label="Expiración">{formatExpirationDate(certificate.emision)}</td>
                    <td data-label="Código"><Link className={styles.code} href={`/verificar-certificado/${encodeURIComponent(certificate.codigo)}`}>{certificate.codigo}<ArrowRight size={14} /></Link></td>
                  </tr>)}</tbody>
                </table>
              </div>
            </> : <div className={styles.empty}><FileSearch size={42} /><h2>No encontramos certificados</h2><p>No hay certificados emitidos para el DNI <strong>{searchedDni}</strong>. Revisa el número e intenta nuevamente.</p><Link href="/contacto">¿Completaste un curso? Contáctanos <ArrowRight size={16} /></Link></div>}
          </section>
        ) : !loading ? <section className={styles.steps} aria-label="Cómo consultar tus certificados">
          {[{ icon: Fingerprint, title: '01. Ingresa tu DNI', text: 'Utiliza el documento con el que te registraste.' }, { icon: FileSearch, title: '02. Consulta tus cursos', text: 'Encuentra tus certificados en un solo lugar.' }, { icon: Download, title: '03. Descarga tu certificado', text: 'Obtén el PDF para guardarlo o compartirlo.' }].map(step => <div key={step.title}><step.icon size={24} /><h3>{step.title}</h3><p>{step.text}</p></div>)}
        </section> : null}
        <p className={styles.support}>¿Necesitas ayuda con tu certificado? <Link href="/contacto">Estamos para ayudarte <ArrowRight size={14} /></Link></p>
      </div>
    </div>
  )
}
