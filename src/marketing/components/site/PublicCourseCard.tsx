'use client'

import { useRouter } from "next/navigation";

import { Calendar, Clock, BookOpen, BadgeCheck } from "lucide-react";

import type { CursoPublico } from "@/marketing/lib/getCursosPublicos";
import { formatFechaLarga, formatHora } from "@/marketing/lib/formatFecha";

const DEFAULT_DESCRIPTION = "Capacitación práctica y actualizada, con certificación incluida al finalizar.";

interface PublicCourseCardProps {
  curso: CursoPublico;
  enVivo?: boolean;
}

export function PublicCourseCard({ curso, enVivo = false }: PublicCourseCardProps) {
  const router = useRouter();
  const fecha = formatFechaLarga(curso.fechaInicio);
  const hora = formatHora(curso.fechaInicio);
  const detalleHref = `/cursos/${curso.slug}`;

  return (
    <div
      className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => router.push(detalleHref)}
    >
      {/* Imagen */}
      <div className="relative aspect-[16/8.2] overflow-hidden bg-slate-900 flex-shrink-0">
        {curso.image && (
          <img
            src={curso.image}
            alt={curso.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {enVivo && (
          <span className="absolute top-3 left-3 bg-[#e8453c] text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            En Vivo
          </span>
        )}
        {!enVivo && curso.esGratis && (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-full shadow-md tracking-wide">
            Gratis
          </span>
        )}
      </div>

      {/* Barra de acento */}
      <div className="h-[3px] w-full bg-[#1e3a8a]" />

      {/* Cuerpo: estructura idéntica en todas las tarjetas para que compartan la misma altura */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-[#0c1938] text-[17px] leading-snug line-clamp-2 min-h-[48px] mb-2">
          {curso.title}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 min-h-[40px] mb-4">
          {curso.description || DEFAULT_DESCRIPTION}
        </p>

        {/* Caja de información: siempre presente, con contenido distinto según el tipo de curso */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4 space-y-2">
          {fecha ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-[#0c1938] flex-shrink-0" />
                <span className="font-medium">{fecha}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-[#0c1938] flex-shrink-0" />
                <span className="font-medium">{hora}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-[#0c1938] flex-shrink-0" />
                <span className="font-medium">{curso.duracion || "Acceso inmediato"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-[#0c1938] flex-shrink-0" />
                <span className="font-medium">{curso.modulos} módulo{curso.modulos !== 1 ? "s" : ""}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#00866b] mb-4">
          <BadgeCheck className="w-4 h-4 flex-shrink-0" />
          Certificado incluido
        </div>

        <div className="mt-auto">
          <div className="text-2xl font-bold text-[#0c1938] mb-4">
            {curso.esGratis ? "Gratis" : `S/${Math.round(curso.price)}`}
          </div>

          <a
            href={detalleHref}
            onClick={(e) => e.stopPropagation()}
            className="block text-center bg-[#e8453c] hover:bg-[#d23a31] text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
          >
            Inscribirme ahora
          </a>
        </div>
      </div>
    </div>
  );
}
