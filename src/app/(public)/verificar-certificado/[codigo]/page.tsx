import React from 'react'

import Link from 'next/link'

import type { Metadata } from 'next'
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  History,
  Search,
  ShieldCheck,
  User,
} from 'lucide-react'

import { getConfigs } from '@/utils/libs/config'
import prisma from '@/utils/libs/prisma'

interface Props {
  params: {
    codigo: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codigo } = params
  
  return {
    title: `Verificación de Certificado: ${codigo} | IFSEC Group`,
    description: `Consulta oficial de validez y autenticidad del certificado emitido con código ${codigo}.`
  }
}

export default async function VerificarCertificadoDetallePage({ params }: Props) {
  const { codigo } = params

  const [certificado, configs] = await Promise.all([
    prisma.certificado.findUnique({
      where: { codigo_verificacion: codigo },
      include: {
        curso: {
          select: {
            titulo: true,
            slug: true,
            miniatura: true
          }
        },
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            correo: true
          }
        }
      }
    }),
    getConfigs()
  ])

  const templateName = configs.TEMPLATE_NAME || 'IFSEC Group'

  if (!certificado) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-lg w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={44} className="text-red-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            Certificado No Válido
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
            No se encontró ningún certificado registrado con el código <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{codigo}</strong> en nuestro sistema oficial.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/verificar-certificado"
              className="inline-flex items-center justify-center gap-2 bg-[var(--web-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#1f7d6d] transition-colors no-underline"
            >
              <Search size={18} />
              Buscar otro código
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white/5 text-gray-300 font-semibold py-3 px-6 rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-colors no-underline"
            >
              <ArrowLeft size={18} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const snapshot = (certificado.datos as any) || {}

  const nombreCompleto =
    (snapshot?.usuario?.nombre && snapshot?.usuario?.apellido)
      ? `${snapshot.usuario.nombre} ${snapshot.usuario.apellido}`
      : `${certificado.usuario?.nombre || ''} ${certificado.usuario?.apellido || ''}`.trim() || 'Estudiante'

  const cursoTitulo = snapshot?.curso?.titulo || certificado.curso?.titulo || 'Programa de Capacitación'
  const fechaEmisionVal = snapshot?.fechas?.emision || certificado.emitido_en

  const fechaEmision = new Date(fechaEmisionVal).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#020817] pt-28 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        
        {/* Card Principal */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          
          {/* Header Superior */}
          <div className="bg-gradient-to-r from-[var(--web-dark)] to-[#0f4438] p-8 sm:p-10 text-center text-white relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full font-semibold text-xs mb-4">
              <ShieldCheck size={16} />
              Certificación Oficial Verificada
            </div>

            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={46} className="text-emerald-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-md">
                <Award size={18} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Certificado Auténtico
            </h1>

            <div className="inline-flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-emerald-200">
              <History size={14} />
              Código: {codigo}
            </div>
          </div>

          {/* Cuerpo de Detalles */}
          <div className="p-6 sm:p-10 space-y-8">
            
            <div className="grid sm:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
              {/* Estudiante */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <User size={14} /> Estudiante Acreditado
                </span>
                <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {nombreCompleto}
                </p>
              </div>

              {/* Fecha de Emisión */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Calendar size={14} /> Fecha de Emisión
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {fechaEmision}
                </p>
              </div>
            </div>

            {/* Curso */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--web-primary)] flex items-center gap-1.5 mb-2">
                <BookOpen size={14} /> Programa Académico
              </span>
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 leading-snug">
                {cursoTitulo}
              </h2>

              {certificado.curso?.slug && (
                <Link
                  href={`/cursos/${certificado.curso.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--web-primary)] hover:underline"
                >
                  Ver detalles del programa &rarr;
                </Link>
              )}
            </div>

            {/* Nota Informativa */}
            <p className="text-xs text-gray-500 text-center leading-relaxed italic bg-gray-50/60 p-4 rounded-xl border border-gray-100">
              Este certificado digital ha sido emitido conforme a los registros académicos de <strong>{templateName}</strong>. Su autenticidad y vigencia se encuentran debidamente validadas en esta plataforma.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/verificar-certificado"
                className="inline-flex items-center justify-center gap-2 bg-[var(--web-primary)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#1f7d6d] transition-colors no-underline text-sm"
              >
                <Search size={16} />
                Consultar otro certificado
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors no-underline text-sm"
              >
                <ArrowLeft size={16} />
                Volver al inicio
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
