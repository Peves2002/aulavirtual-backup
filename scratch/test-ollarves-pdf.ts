import { writeFileSync } from 'fs'

import QRCode from 'qrcode'

import { generarOllarves } from '../src/app/api/_shared/certificados/generators/ollarves'

async function main() {
  const qr = await QRCode.toDataURL('https://example.com/verify/CER-TEST', { width: 200, margin: 1 })
  const buf = await generarOllarves({
    colorPrimario: '#FFD700',
    pr: 255,
    pg: 215,
    pb: 0,
    logoBuffer: null,
    logoUrl: '',
    base64Logo: null,
    nombreInstitucion: 'Aula Virtual',
    slogan: 'Formación profesional',
    disclaimer: 'Este certificado es válido según normativa vigente.',
    institutionUrl: 'www.aulavirtual.com',
    nombreCompleto: 'JOSE SD',
    avatarBuffer: null,
    cursoTitulo: 'Curso de Prueba — Evaluaciones',
    cursoDuracion: '1 hora',
    cursoModalidad: 'VIRTUAL',
    modulos: [{ id: 'm1', titulo: 'Módulo 1', orden: 0, lecciones: [] }],
    fechaEmisionVal: '2026-06-23',
    fechaInicioVal: '2026-06-14',
    fechaFinVal: '2026-06-23',
    vigenciaHastaVal: null,
    gerenteGeneral: { nombre: 'Juan', apellido: 'García', cargo: 'Gerente General', firma: null },
    profesorSnapshot: { nombre: 'Admin', apellido: 'Sistema', cargo: 'Administrador Sistema', firma: null },
    mostrarFirmaDocente: true,
    codigoVerificacion: 'CER-2026-CURS - 0001',
    qrDataUrl: qr,
    notaFinal: 18,
    notasPorModulo: { m1: { puntaje: 18, count: 1 } },
    intentosExamen: [],
    notaInscripcion: 18,
    previewFlag: false,
  })

  writeFileSync('scratch/test-ollarves.pdf', Buffer.from(buf))
  console.log('PDF written:', buf.byteLength, 'bytes')
}

main().catch(console.error)
