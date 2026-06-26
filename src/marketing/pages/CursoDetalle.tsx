'use client'

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Calendar, Clock, BookOpen, BadgeCheck, ChevronDown, ChevronRight,
  Play, CheckCircle2, XCircle, Download, GraduationCap
} from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";
import AppModal from "@/utils/components/AppModal";
import VideoPlayer from "@/features/estudiante/player/components/VideoPlayer";
import { AuthModalProvider, useAuthModal } from "@/contexts/AuthModalContext";
import { formatFechaLarga, formatHora } from "@/marketing/lib/formatFecha";

const WHATSAPP_NUMBER = "51956266147";

interface Leccion {
  id: string;
  titulo: string;
  duracion?: number | null;
  es_vista_previa?: boolean;
  video_url?: string | null;
}

interface Modulo {
  id: string;
  titulo: string;
  lecciones: Leccion[];
}

export interface CursoDetalleData {
  id: string;
  titulo: string;
  slug: string;
  descripcion?: string | null;
  miniatura?: string | null;
  duracion?: string | null;
  precio: number | string;
  precio_falso: number | string;
  moneda: string;
  es_gratis: boolean;
  es_comprado?: boolean;
  nivel?: string | null;
  tipo_emision: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  brochure?: string | null;
  objetivos?: string[];
  metodologia?: { title: string; icon?: string }[];
  beneficios?: { title: string; desc?: string; icon?: string }[];
  incluye?: { text: string; active: boolean }[];
  profesor: {
    nombre: string;
    apellido: string;
    avatar?: string | null;
    cargo?: string | null;
    biografia?: string | null;
  };
  categoria?: { nombre: string } | null;
  modulos: Modulo[];
}

interface CursoDetalleProps {
  course: CursoDetalleData;
}

const NIVEL_LABEL: Record<string, string> = {
  BASICO: "Básico",
  INTERMEDIO: "Intermedio",
  AVANZADO: "Avanzado"
};

const TIPO_EMISION_LABEL: Record<string, string> = {
  SINCRONO: "En vivo",
  MIXTO: "Mixto",
  ASINCRONO: "Grabado"
};

export default function CursoDetalle(props: CursoDetalleProps) {
  return (
    <AuthModalProvider>
      <CursoDetalleContent {...props} />
    </AuthModalProvider>
  );
}

function CursoDetalleContent({ course }: CursoDetalleProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLogin } = useAuthModal();
  const [enrolling, setEnrolling] = useState(false);
  const [openModuloId, setOpenModuloId] = useState<string | null>(course.modulos[0]?.id ?? null);
  const [previewLesson, setPreviewLesson] = useState<Leccion | null>(null);

  const precio = Number(course.precio);
  const precioFalso = Number(course.precio_falso);
  const tieneDescuento = !course.es_gratis && precioFalso > precio;

  const isLive = course.tipo_emision === "SINCRONO" || course.tipo_emision === "MIXTO";
  const fecha = isLive ? formatFechaLarga(course.fecha_inicio) : "";
  const hora = isLive ? formatHora(course.fecha_inicio) : "";

  const modulosConContenido = course.modulos.filter((m) => m.lecciones.length > 0);

  const handleEnroll = () => {
    if (!session) {
      openLogin(undefined, () => router.push(`/checkout/${course.slug}`));

      return;
    }

    router.push(`/checkout/${course.slug}`);
  };

  const handleFreeEnroll = async () => {
    if (!session) {
      openLogin(undefined, handleFreeEnroll);

      return;
    }

    setEnrolling(true);

    try {
      const res = await fetch("/api/estudiante/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cursoId: course.id })
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/estudiante/aprender/${course.slug}`);
      } else if (res.status === 400 && data.message?.includes("Ya estás inscrito")) {
        router.push(`/estudiante/aprender/${course.slug}`);
      } else {
        toast.error(data.message || "No se pudo completar la inscripción");
      }
    } catch {
      toast.error("No se pudo completar la inscripción. Intenta nuevamente.");
    } finally {
      setEnrolling(false);
    }
  };

  const ctaLabel = course.es_comprado
    ? "Seguir aprendiendo"
    : course.es_gratis
    ? (enrolling ? "Inscribiendo..." : "Inscribirme gratis")
    : "Matricúlate ahora";

  const handleCtaClick = () => {
    if (course.es_comprado) {
      router.push(`/estudiante/aprender/${course.slug}`);

      return;
    }

    if (course.es_gratis) {
      handleFreeEnroll();

      return;
    }

    handleEnroll();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] font-gc-sans text-[#0f172a]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-br from-[#0c1938] via-[#040a1b] to-[#02050f] text-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="gc-container-custom relative z-10 px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-6 flex-wrap select-none">
            <a href="/" className="hover:text-[#cca353] transition-colors">Inicio</a>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <a href="/cursos" className="hover:text-[#cca353] transition-colors">Cursos</a>
            {course.categoria && (
              <>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <span className="text-gray-300">{course.categoria.nombre}</span>
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {course.nivel && (
                <span className="bg-[#cca353]/15 text-[#cca353] text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-[#cca353]/30">
                  {NIVEL_LABEL[course.nivel] || course.nivel}
                </span>
              )}
              <span className="bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/15">
                {TIPO_EMISION_LABEL[course.tipo_emision] || course.tipo_emision}
              </span>
            </div>

            <h1 className="font-gc-sans font-black text-2xl md:text-4xl tracking-wide leading-tight mb-6">
              {course.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#1b43a9] flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0">
                  {course.profesor.avatar ? (
                    <img src={course.profesor.avatar} alt={course.profesor.nombre} className="w-full h-full object-cover" />
                  ) : (
                    course.profesor.nombre.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">Docente</div>
                  <div className="text-sm font-bold text-[#cca353]">{course.profesor.nombre} {course.profesor.apellido}</div>
                </div>
              </div>

              {isLive ? (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-[#cca353]" />
                  <span className="font-medium">{fecha || "Próximamente"}{hora ? ` · ${hora}` : ""}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-[#cca353]" />
                  <span className="font-medium">{course.duracion || "Acceso inmediato"}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <BookOpen className="w-4 h-4 text-[#cca353]" />
                <span className="font-medium">{modulosConContenido.length} módulo{modulosConContenido.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="gc-container-custom px-4 py-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-10">
            {course.descripcion && (
              <section>
                <h2 className="font-gc-sans font-black text-lg text-[#0c1938] uppercase tracking-wide mb-3">
                  Acerca del curso
                </h2>
                <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {course.descripcion}
                </p>
              </section>
            )}

            {!!course.objetivos?.length && (
              <section>
                <h2 className="font-gc-sans font-black text-lg text-[#0c1938] uppercase tracking-wide mb-4">
                  Lo que aprenderás
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.objetivos.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1a56e8] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!!course.metodologia?.length && (
              <section>
                <h2 className="font-gc-sans font-black text-lg text-[#0c1938] uppercase tracking-wide mb-4">
                  Metodología
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {course.metodologia.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-[#1a56e8]/10 flex items-center justify-center mb-3">
                        <i className={item.icon?.startsWith("tabler-") ? item.icon : `tabler-${item.icon || "circle"}`} style={{ color: "#1a56e8", fontSize: "1.1rem" }} />
                      </div>
                      <p className="text-sm font-semibold text-[#0c1938]">{item.title}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!!course.beneficios?.length && (
              <section>
                <h2 className="font-gc-sans font-black text-lg text-[#0c1938] uppercase tracking-wide mb-4">
                  Beneficios
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.beneficios.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-[#cca353]/15 flex items-center justify-center flex-shrink-0">
                        <i className={item.icon?.startsWith("tabler-") ? item.icon : `tabler-${item.icon || "star"}`} style={{ color: "#cca353", fontSize: "1.1rem" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0c1938]">{item.title}</p>
                        {item.desc && <p className="text-[13px] text-gray-500 mt-0.5">{item.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contenido del curso */}
            <section>
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <h2 className="font-gc-sans font-black text-lg text-[#0c1938] uppercase tracking-wide">
                  Contenido del curso
                </h2>
                {course.brochure && (
                  <a
                    href={course.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a56e8] hover:text-[#0c1938] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Descargar brochure
                  </a>
                )}
              </div>

              {modulosConContenido.length > 0 ? (
                <div className="space-y-2">
                  {modulosConContenido.map((modulo, idx) => {
                    const isOpen = openModuloId === modulo.id;

                    return (
                      <div key={modulo.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenModuloId(isOpen ? null : modulo.id)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#1a56e8]/10 text-[#1a56e8] text-xs font-black flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-sm font-bold text-[#0c1938]">{modulo.titulo}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isOpen && (
                          <div className="border-t border-gray-100">
                            {modulo.lecciones.map((leccion) => (
                              <div
                                key={leccion.id}
                                onClick={() => leccion.es_vista_previa && leccion.video_url && setPreviewLesson(leccion)}
                                className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0 ${leccion.es_vista_previa && leccion.video_url ? "cursor-pointer hover:bg-gray-50" : ""}`}
                              >
                                <Play className={`w-4 h-4 flex-shrink-0 ${leccion.es_vista_previa ? "text-[#1a56e8]" : "text-gray-300"}`} />
                                <span className="text-sm text-gray-700 flex-grow">{leccion.titulo}</span>
                                {leccion.es_vista_previa && (
                                  <span className="text-[10px] font-bold uppercase text-[#1a56e8] bg-[#1a56e8]/10 px-2 py-1 rounded-full flex-shrink-0">
                                    Vista previa
                                  </span>
                                )}
                                {leccion.duracion && (
                                  <span className="text-xs text-gray-400 flex-shrink-0">{leccion.duracion} min</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400 italic">
                  Aún no hay módulos publicados.
                </div>
              )}
            </section>

            {/* Profesor */}
            <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-gc-sans font-black text-base text-[#0c1938] uppercase tracking-wide mb-4">
                Tu docente
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1b43a9] flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
                  {course.profesor.avatar ? (
                    <img src={course.profesor.avatar} alt={course.profesor.nombre} className="w-full h-full object-cover" />
                  ) : (
                    course.profesor.nombre.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#0c1938]">{course.profesor.nombre} {course.profesor.apellido}</p>
                  {course.profesor.cargo && <p className="text-xs text-gray-500 mb-1.5">{course.profesor.cargo}</p>}
                  {course.profesor.biografia && (
                    <p className="text-sm text-gray-600 leading-relaxed">{course.profesor.biografia}</p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                <div className="relative aspect-[16/9] bg-slate-900">
                  {course.miniatura && (
                    <img src={course.miniatura} alt={course.titulo} className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-[#0c1938]">
                      {course.es_comprado ? "Adquirido" : course.es_gratis ? "Gratis" : `${course.moneda} ${precio.toFixed(2)}`}
                    </span>
                    {tieneDescuento && (
                      <span className="text-sm text-gray-400 line-through">{course.moneda} {precioFalso.toFixed(2)}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCtaClick}
                    disabled={enrolling}
                    className="w-full bg-[#1a56e8] hover:bg-[#0c1938] disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
                  >
                    {ctaLabel}
                  </button>

                  {!!course.incluye?.length && (
                    <div className="mt-5 space-y-2.5">
                      {course.incluye.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {item.active ? (
                            <CheckCircle2 className="w-4 h-4 text-[#1a56e8] flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          )}
                          <span className={`text-[13px] ${item.active ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-[12px] font-semibold text-[#00866b]">
                    <BadgeCheck className="w-4 h-4 flex-shrink-0" />
                    Certificado incluido
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-400">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    Acceso inmediato tras confirmar el pago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de vista previa */}
      <AppModal
        open={!!previewLesson}
        handleClose={() => setPreviewLesson(null)}
        sx={{ p: 0, maxWidth: 800, bgcolor: "black", overflow: "hidden" }}
      >
        {previewLesson?.video_url && <VideoPlayer url={previewLesson.video_url} tipo="VIDEO" />}
      </AppModal>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 text-white"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.734-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.45.993c-5.439 0-9.859 4.37-9.863 9.8-.001 1.73.457 3.424 1.326 4.917L1.87 20.84l5.35-1.395c-1.42.776-2.58.55-2.58.55zM17.43 14.93c-.302-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.777.98-.95 1.18-.178.2-.355.22-.658.07-1.485-.75-2.56-1.3-3.585-3.08-.27-.47.27-.43.77-.93.18-.18.15-.3.07-.45-.07-.15-.678-1.63-.93-2.23-.244-.59-.49-.51-.678-.52-.178-.01-.383-.01-.588-.01-.205 0-.538.08-.82.38-.282.3-1.077 1.05-1.077 2.57s1.1 2.98 1.25 3.18c.15.2 2.163 3.303 5.242 4.63 1.243.535 2.193.85 2.946 1.09 1.246.395 2.382.34 3.278.206.996-.15 2.062-.84 2.352-1.62.29-.78.29-1.45.2-1.58c-.09-.13-.33-.2-.635-.35z" />
        </svg>
      </a>
    </div>
  );
}
