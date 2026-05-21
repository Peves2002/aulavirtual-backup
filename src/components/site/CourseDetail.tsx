"use client";
import Link from "next/link";


import { useParams } from "next/navigation"; 
import { CheckCircle, Clock, Award, Phone, ArrowLeft } from "lucide-react";

import { courses } from "@/data/courses";
import { FinalCta } from "./FinalCta";

export function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#1A3A0A] mb-4">Curso no encontrado</h2>
        <Link href="/cursos" className="text-[#5A9020] underline font-semibold">
          Volver a todos los cursos
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hola, vengo de la web. Quiero información para matricularme en el curso: ${course.title}.`;
  const whatsappUrl = `https://wa.me/51953822677?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#F7FBF0] min-h-screen pb-20">
      {/* Course Hero */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A04]/90 via-[#0A1A04]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl reveal">
            <Link href="/cursos" 
              className="inline-flex items-center gap-2 text-[#C8E890] hover:text-white transition-colors mb-6 text-[14px] font-semibold"
            >
              <ArrowLeft size={16} /> Volver a cursos
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#A8E060] text-[#1A3A0A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {course.category}
              </span>
              <span className="bg-transparent border border-[#A8E060] text-[#A8E060] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Nivel {course.level}
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-5xl lg:leading-[1.1] mb-6 text-white drop-shadow-lg">
              {course.title}
            </h1>
            <p className="text-lg lg:text-xl text-[#E8F5D0] drop-shadow-md mb-8 leading-relaxed">
              {course.desc}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-[#A8E060]">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span className="font-semibold">{course.duration} de clases</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span className="font-semibold">Certificado incluido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 grid lg:grid-cols-3 gap-12">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-12">
          
          <div className="reveal">
            <h2 className="font-display text-3xl font-bold text-[#1A3A0A] mb-4">Acerca de este curso</h2>
            <p className="text-[#4A7018] text-lg leading-relaxed">
              {course.longDesc}
            </p>
          </div>

          <div className="reveal">
            <h3 className="font-display text-2xl font-bold text-[#1A3A0A] mb-6">¿Qué vas a lograr?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {course.benefits?.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#C8E890] shadow-sm">
                  <CheckCircle className="text-[#5A9020] shrink-0 mt-0.5" size={20} />
                  <span className="text-[#2D5010] font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h3 className="font-display text-2xl font-bold text-[#1A3A0A] mb-6">Módulos de aprendizaje</h3>
            <div className="space-y-4">
              {course.modules?.map((m, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-xl border-l-4 border-l-[#A8E060] shadow-sm">
                  <div className="bg-[#F7FBF0] text-[#5A9020] w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[#2D5010] font-medium text-lg">{m}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sticky Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] p-8 border-2 border-[#C8E890] shadow-[0_20px_40px_rgba(10,26,4,0.06)] sticky top-32 reveal">
            <h3 className="font-display font-bold text-2xl text-[#1A3A0A] mb-2">Inversión</h3>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[#7AAA40] line-through text-lg">S/. {course.oldPrice}</span>
              <span className="text-4xl font-display font-bold text-[#2D5010]">S/. {course.price}</span>
            </div>
            
            <ul className="space-y-4 mb-8 text-[#4A7018] text-sm">
              <li className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#A8E060]" />
                Insumos 100% incluidos
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#A8E060]" />
                Recetario profesional impreso
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#A8E060]" />
                Degustación de lo preparado
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={16} className="text-[#A8E060]" />
                Soporte post-curso
              </li>
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-full py-4 font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_rgba(168,224,96,0.3)] hover:shadow-[0_12px_24px_rgba(168,224,96,0.4)]"
              style={{ background: "#A8E060", color: "#0A1A04" }}
            >
              <Phone size={20} />
              Quiero Matricularme
            </a>
            
            <p className="text-center text-xs text-[#7AAA40] mt-4 font-medium">
              Cupos limitados. ¡Asegura tu lugar hoy!
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <FinalCta />
      </div>
    </div>
  );
}
