'use client'

import { useState, useEffect, useMemo } from "react";

import { useParams, useRouter } from "next/navigation"

import { motion, AnimatePresence } from "framer-motion";
import {
  FolderClosed,
  Search,
  Star,
  Clock,
  BookOpen,
  ShoppingCart,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Award,
  Play,
  MessageCircle,
  Download,
  Zap,
  Trophy,
  Shield,
} from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

type SyllabusItem = {
  title: string;
  lessons: string[];
};

type Course = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  badge: string;
  hours: number;
  sessions: number;
  description: string;
  syllabus: SyllabusItem[];
  objectives: string[];
  includes: string[];
};

type CategorySection = {
  id: string;
  title: string;
  colorClass: string;
  iconColor: string;
  courses: Course[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

const categoryData: CategorySection[] = [
  {
    id: "vial",
    title: "INGENIERÍA VIAL Y CARRETERAS",
    colorClass: "text-[#f97316] bg-orange-50",
    iconColor: "#f97316",
    courses: [
      {
        id: "vial-1",
        title: "DISEÑO DE PISTAS Y VEREDAS EN CIVIL 3D",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        price: 199,
        oldPrice: 399,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Dominio total de alineamientos, perfiles y secciones transversales para infraestructura urbana.",
        objectives: [
          "Crear alineamientos horizontales y verticales con precisión",
          "Generar perfiles longitudinales y secciones transversales",
          "Diseñar pistas y veredas según normativa vigente",
          "Elaborar planos de planimetría y altimetría automatizados",
          "Calcular movimientos de tierra y volúmenes de obra",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Archivos de proyecto descargables",
          "Soporte técnico vía WhatsApp",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Introducción a Civil 3D",
            lessons: ["Interfaz y configuración del entorno", "Configuración de estilos de objetos", "Importación de topografía y puntos de levantamiento", "Creación de superficies TIN"],
          },
          {
            title: "Módulo 2: Diseño de Alineamientos",
            lessons: ["Trazado de alineamiento horizontal", "Perfil longitudinal del terreno", "Diseño del rasante y alineamiento vertical", "Criterios técnicos del DG-2018"],
          },
          {
            title: "Módulo 3: Secciones y Volúmenes",
            lessons: ["Generación de secciones transversales", "Cálculo de volúmenes de corte y relleno", "Tabla de cubicación y resumen de movimiento", "Exportación a AutoCAD y Excel"],
          },
        ],
      },
      {
        id: "vial-2",
        title: "SEÑALIZACIÓN HORIZONTAL Y VERTICAL EN CARRETERAS",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
        price: 149,
        oldPrice: 299,
        badge: "-50%",
        hours: 36,
        sessions: 10,
        description: "Normativa oficial del MTC y diseño detallado de señalética para la seguridad vial.",
        objectives: [
          "Aplicar la normativa MTC en señalización vial",
          "Diseñar señales verticales reglamentarias y preventivas",
          "Elaborar marcas en el pavimento según estándares",
          "Calcular la ubicación óptima de señales",
          "Generar memorias descriptivas de señalización",
        ],
        includes: [
          "36 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Manual MTC completo en PDF",
          "Plantillas AutoCAD de señales",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Normativa y Marco Legal",
            lessons: ["Manual de Dispositivos de Control del Tránsito", "Clasificación de señales verticales", "Colores y retroreflectividad según norma", "Criterios de visibilidad y distancias de lectura"],
          },
          {
            title: "Módulo 2: Señalización Vertical",
            lessons: ["Señales reglamentarias: tipos y dimensiones", "Señales preventivas en curvas y pendientes", "Señales informativas y de servicios", "Ubicación y alturas de instalación"],
          },
          {
            title: "Módulo 3: Marcas en el Pavimento",
            lessons: ["Líneas de carril y demarcación de bordes", "Zonas de adelantamiento y prohibición", "Cruceros peatonales y zonas escolares", "Pintura termoplástica y materiales"],
          },
        ],
      },
      {
        id: "vial-3",
        title: "DISEÑO GEOMÉTRICO DE CARRETERAS CON DG-2018",
        image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&q=80",
        price: 249,
        oldPrice: 499,
        badge: "-50%",
        hours: 48,
        sessions: 15,
        description: "Aplicación práctica y diseño bajo los lineamientos y normativas vigentes del DG-2018.",
        objectives: [
          "Dominar el Manual de Carreteras DG-2018 del MTC",
          "Diseñar curvas horizontales y verticales",
          "Calcular distancias de visibilidad y parada",
          "Determinar velocidades de diseño por terreno",
          "Elaborar el expediente técnico de carreteras",
        ],
        includes: [
          "48 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "DG-2018 completo en formato digital",
          "Hojas de cálculo especializadas Excel",
          "Certificado digital con código QR",
          "5 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fundamentos del DG-2018",
            lessons: ["Clasificación de carreteras y caminos", "Velocidades de diseño y factores de terreno", "Sección transversal típica y componentes", "Bermas, cunetas y taludes"],
          },
          {
            title: "Módulo 2: Diseño Horizontal",
            lessons: ["Tangentes y curvas circulares simples", "Curvas de transición tipo clotoide", "Peralte y sobreancho en curvas", "Distancia de visibilidad de adelantamiento"],
          },
          {
            title: "Módulo 3: Diseño Vertical y Aplicaciones",
            lessons: ["Gradientes máximas y mínimas por clase", "Curvas verticales convexas y cóncavas", "Longitudes mínimas de curvas verticales", "Caso práctico: carretera completa en Civil 3D"],
          },
        ],
      },
      {
        id: "vial-4",
        title: "HIDROLOGÍA Y DRENAJE EN INFRAESTRUCTURA VIAL",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        price: 179,
        oldPrice: 359,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Cálculo preciso de cunetas, alcantarillas y puentes para la protección vial.",
        objectives: [
          "Aplicar métodos hidrológicos para infraestructura vial",
          "Calcular caudales de diseño con métodos racionales",
          "Diseñar cunetas y alcantarillas de paso y alivio",
          "Determinar periodos de retorno adecuados",
          "Evaluar la necesidad de estructuras de control",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Hojas de cálculo hidrológicas en Excel",
          "Mapas de intensidades de lluvia del Perú",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Hidrología Básica",
            lessons: ["Ciclo hidrológico y cuencas hidrográficas", "Precipitación y curvas IDF", "Método Racional y tiempo de concentración", "Software HidroEsta 2 aplicado"],
          },
          {
            title: "Módulo 2: Drenaje Superficial",
            lessons: ["Diseño de cunetas triangulares y trapezoidales", "Velocidades máximas permisibles", "Cunetas revestidas vs sin revestir", "Cálculo de pendiente longitudinal óptima"],
          },
          {
            title: "Módulo 3: Alcantarillas y Obras de Arte",
            lessons: ["Tipos de alcantarillas: marco, tubería, bóveda", "Dimensionamiento hidráulico de alcantarillas", "Badenes y pasajes de agua", "Diseño de muros de encauzamiento"],
          },
        ],
      },
      {
        id: "vial-5",
        title: "ASFALTOS Y PAVIMENTOS FLEXIBLES",
        image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=800&q=80",
        price: 189,
        oldPrice: 379,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Análisis estructural y diseño de mezclas asfálticas empleando metodologías AASHTO.",
        objectives: [
          "Comprender la composición y propiedades del asfalto",
          "Aplicar el método AASHTO 93 en diseño de pavimentos",
          "Diseñar mezclas asfálticas por método Marshall",
          "Determinar espesores de capas de pavimento flexible",
          "Interpretar resultados de ensayos de laboratorio",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Manual AASHTO 93 en español",
          "Hoja de cálculo de diseño estructural",
          "Certificado digital con código QR",
          "4 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Materiales Asfálticos",
            lessons: ["Cementos asfálticos y emulsiones", "Ensayos de penetración, viscosidad y punto de ablandamiento", "Áridos y sus características granulométricas", "Control de calidad en planta y obra"],
          },
          {
            title: "Módulo 2: Diseño de Mezclas",
            lessons: ["Método Marshall: equipo y procedimiento", "Determinación del óptimo contenido de asfalto", "Verificación de vacíos y estabilidad", "Dosificación y ajuste de mezcla"],
          },
          {
            title: "Módulo 3: Diseño Estructural",
            lessons: ["Número Estructural y coeficientes de capa", "Cálculo de ESALs y tráfico de diseño", "Método AASHTO 93 paso a paso", "Software HDM-4 aplicaciones prácticas"],
          },
        ],
      },
    ],
  },
  {
    id: "estructuras",
    title: "INGENIERÍA ESTRUCTURAL Y CONCRETO",
    colorClass: "text-[#00d8b4] bg-[#00d8b4]/10",
    iconColor: "#00d8b4",
    courses: [
      {
        id: "est-1",
        title: "DISEÑO DE MEZCLAS BOMBEABLES EN OBRA",
        image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=800&q=80",
        price: 189,
        oldPrice: 379,
        badge: "-50%",
        hours: 32,
        sessions: 8,
        description: "Técnicas avanzadas para evitar la segregación y las paradas críticas de bombeo.",
        objectives: [
          "Comprender los principios de bombeo del concreto",
          "Diseñar mezclas con alta trabajabilidad y fluidez",
          "Prevenir segregación y exudación en mezclas bombeables",
          "Seleccionar aditivos plastificantes adecuados",
          "Supervisar el proceso de bombeo en obra",
        ],
        includes: [
          "32 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Fichas técnicas de aditivos",
          "Hoja de cálculo de diseño de mezclas",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Concreto Bombeable",
            lessons: ["Principios de flujo de concreto en tuberías", "Selección de agregados para bombeo", "Relación agua/cemento y asentamiento", "Equipos de bombeo: tipos y capacidades"],
          },
          {
            title: "Módulo 2: Diseño de Mezcla",
            lessons: ["Método ACI 211 adaptado para bombeo", "Uso de aditivos superplastificantes", "Concreto autocompactante (CAC)", "Control de temperatura en climas extremos"],
          },
          {
            title: "Módulo 3: Casos Prácticos en Obra",
            lessons: ["Resolución de paradas de bomba en campo", "Ensayos de asentamiento y flujo", "Dosificación en condiciones de altura", "Registro y control de calidad del vaciado"],
          },
        ],
      },
      {
        id: "est-2",
        title: "EVALUACIÓN DEL CONCRETO ENDURECIDO EN CAMPO",
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
        price: 159,
        oldPrice: 319,
        badge: "-50%",
        hours: 30,
        sessions: 8,
        description: "Ensayos no destructivos aplicados: esclerómetro, ultrasonido y diamantinas.",
        objectives: [
          "Aplicar técnicas de evaluación no destructiva",
          "Utilizar el esclerómetro para estimar resistencia",
          "Realizar ensayos de ultrasonido pulso-velocidad",
          "Extraer y ensayar diamantinas en estructuras existentes",
          "Interpretar resultados y emitir informes técnicos",
        ],
        includes: [
          "30 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Fichas de ensayos y formatos NTP",
          "Casos reales de patología estructural",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Ensayos No Destructivos",
            lessons: ["Fundamentos de evaluación de estructuras", "Esclerómetro Schmidt: calibración y uso", "Correlación rebote-resistencia según NTP", "Limitaciones y errores comunes"],
          },
          {
            title: "Módulo 2: Ultrasonido y Diamantinas",
            lessons: ["Método de pulso-velocidad ultrasónico", "Interpretación de velocidades en concreto", "Extracción de diamantinas: equipos y procedimiento", "Ensayo a compresión de testigos cilíndricos"],
          },
          {
            title: "Módulo 3: Informe y Diagnóstico",
            lessons: ["Clasificación del concreto por resistencia obtenida", "Redacción de informe técnico de evaluación", "Recomendaciones de refuerzo o demolición", "Casos reales de edificaciones en Lima"],
          },
        ],
      },
      {
        id: "est-3",
        title: "DISEÑO SISMORRESISTENTE DE EDIFICACIONES CON ETABS",
        image: "https://images.unsplash.com/photo-1503387762-592dee58c460?w=800&q=80",
        price: 299,
        oldPrice: 599,
        badge: "-50%",
        hours: 60,
        sessions: 18,
        description: "Modelamiento sísmico tridimensional y análisis dinámico de edificios multifamiliares.",
        objectives: [
          "Modelar edificaciones en ETABS con criterio estructural",
          "Aplicar la Norma E.030 Diseño Sismorresistente",
          "Realizar análisis estático y dinámico espectral",
          "Verificar derivas de entrepiso y cortantes mínimas",
          "Diseñar elementos de concreto armado en ETABS",
        ],
        includes: [
          "60 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Licencia temporal de ETABS",
          "Plantillas de modelado y verificación E.030",
          "Certificado digital con código QR",
          "6 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Introducción a ETABS",
            lessons: ["Interfaz, grillas y unidades de trabajo", "Definición de materiales y secciones", "Modelado de vigas, columnas y placas", "Losas macizas y aligeradas en ETABS"],
          },
          {
            title: "Módulo 2: Análisis Sísmico E.030",
            lessons: ["Parámetros sísmicos: Z, U, C, S, R", "Análisis estático equivalente", "Espectro de diseño y análisis dinámico modal", "Verificación de derivas máximas permitidas"],
          },
          {
            title: "Módulo 3: Diseño y Revisión",
            lessons: ["Diseño de vigas y columnas en ETABS", "Diseño de muros de concreto armado (placas)", "Verificación de la cortante basal mínima", "Generación de reportes y planos estructurales"],
          },
        ],
      },
      {
        id: "est-4",
        title: "DISEÑO DE ELEMENTOS DE CONCRETO ARMADO",
        image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80",
        price: 219,
        oldPrice: 439,
        badge: "-50%",
        hours: 45,
        sessions: 14,
        description: "Diseño riguroso de vigas, columnas, placas y zapatas bajo la norma E.060.",
        objectives: [
          "Dominar la Norma E.060 Concreto Armado del RNE",
          "Diseñar vigas a flexión, corte y torsión",
          "Dimensionar columnas con cargas combinadas",
          "Diseñar zapatas aisladas y combinadas",
          "Elaborar planos de armado completos",
        ],
        includes: [
          "45 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Libro de diseño en concreto armado PDF",
          "Hojas de cálculo de diseño de elementos",
          "Certificado digital con código QR",
          "4 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fundamentos E.060",
            lessons: ["Filosofía de diseño por resistencia última", "Materiales: acero y concreto propiedades", "Cargas y combinaciones de diseño ACI-318", "Cuantías mínimas y máximas de refuerzo"],
          },
          {
            title: "Módulo 2: Vigas y Columnas",
            lessons: ["Diseño a flexión: sección simplemente armada y doblemente armada", "Diseño a corte y detallado de estribos", "Columnas: diagramas de interacción P-M", "Longitudes de anclaje y empalme"],
          },
          {
            title: "Módulo 3: Cimentaciones",
            lessons: ["Zapata aislada: presiones al suelo y diseño", "Zapata combinada y viga de cimentación", "Dimensionamiento por capacidad portante del suelo", "Planos de armado y memoria de cálculo"],
          },
        ],
      },
      {
        id: "est-5",
        title: "MODELAMIENTO ESTRUCTURAL EN TEKLA STRUCTURES",
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&q=80",
        price: 269,
        oldPrice: 539,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Detallado BIM de estructuras metálicas avanzadas y generación automática de planos.",
        objectives: [
          "Modelar estructuras metálicas en entorno BIM 3D",
          "Crear conexiones y nodos estructurales en Tekla",
          "Generar planos de taller y montaje automatizados",
          "Gestionar el modelo como gemelo digital de obra",
          "Exportar información a IFC y software de análisis",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Licencia temporal de Tekla Structures",
          "Biblioteca de perfiles metálicos peruanos",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Entorno Tekla Structures",
            lessons: ["Configuración del entorno y sistema de grillas", "Creación de columnas, vigas y arriostres", "Biblioteca de perfiles ASTM y NTP", "Materiales y propiedades de acero"],
          },
          {
            title: "Módulo 2: Conexiones y Nodos",
            lessons: ["Conexiones soldadas y atornilladas", "Nodo base de columna: placa y pernos de anclaje", "Conexión viga-columna con cartelas", "Correas de techo y cobertura metálica"],
          },
          {
            title: "Módulo 3: Planos y Exportación",
            lessons: ["Generación automática de planos de taller", "Listas de materiales y pesos automáticos", "Exportación IFC para coordinación BIM", "Interfaz con SAP2000 para análisis"],
          },
        ],
      },
    ],
  },
  {
    id: "electrica",
    title: "INSTALACIONES Y SISTEMAS ELÉCTRICOS",
    colorClass: "text-[#3b82f6] bg-blue-50",
    iconColor: "#3b82f6",
    courses: [
      {
        id: "elec-1",
        title: "DIAGRAMA UNIFILAR Y CUADRO DE CARGAS",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        price: 149,
        oldPrice: 299,
        badge: "-50%",
        hours: 32,
        sessions: 8,
        description: "Cálculo y balanceo de circuitos para instalaciones residenciales y comerciales de alta demanda.",
        objectives: [
          "Elaborar diagramas unifilares conforme al CNE",
          "Calcular cuadros de cargas residenciales y comerciales",
          "Balancear fases en sistemas trifásicos",
          "Seleccionar interruptores termomagnéticos y diferenciales",
          "Diseñar tableros eléctricos generales y de distribución",
        ],
        includes: [
          "32 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "CNE Utilización y Suministro en PDF",
          "Plantillas AutoCAD de diagrama unifilar",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fundamentos CNE",
            lessons: ["Normativa CNE y NTP aplicable", "Simbología eléctrica normalizada", "Clasificación de cargas: iluminación, tomacorrientes, fuerza", "Demanda máxima y factor de demanda"],
          },
          {
            title: "Módulo 2: Cuadro de Cargas",
            lessons: ["Cálculo de cargas por circuito", "Balanceo de fases trifásicas", "Selección de conductores por capacidad", "Caída de tensión máxima permitida CNE"],
          },
          {
            title: "Módulo 3: Diagrama Unifilar",
            lessons: ["Diagrama general de la instalación", "Representación de tableros y sub-tableros", "Selección de interruptores de protección", "Dibujo en AutoCAD Electrical y planos finales"],
          },
        ],
      },
      {
        id: "elec-2",
        title: "CÁLCULO DE CORRIENTE DE CORTOCIRCUITO CON ETAP",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
        price: 219,
        oldPrice: 439,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Análisis de fallas simétricas y asimétricas en redes de baja y media tensión con ETAP.",
        objectives: [
          "Modelar redes eléctricas industriales en ETAP",
          "Calcular corrientes de cortocircuito trifásico y monofásico",
          "Analizar fallas simétricas y asimétricas",
          "Seleccionar protecciones con capacidad de ruptura adecuada",
          "Generar reportes técnicos de cortocircuito",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Licencia temporal de ETAP Student",
          "Manuales de uso ETAP en español",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Introducción a ETAP",
            lessons: ["Interfaz y configuración del proyecto", "Modelado de bus, transformadores y cables", "Generadores y motores en el modelo", "Parámetros de la red de utilidad"],
          },
          {
            title: "Módulo 2: Análisis de Cortocircuito",
            lessons: ["Falla trifásica simétrica: cálculo y resultados", "Fallas asimétricas: monofásica, bifásica y bifásica a tierra", "Contribución de motores síncronos y asíncronos", "Norma IEC 60909 vs IEEE 141"],
          },
          {
            title: "Módulo 3: Selección de Protecciones",
            lessons: ["Interruptores de alta capacidad de ruptura (ACR)", "Coordinación de protecciones en cascada", "Fusibles de alta tensión HH y NH", "Reporte de cortocircuito y documentación"],
          },
        ],
      },
      {
        id: "elec-3",
        title: "MEMORIAS DE CÁLCULO DE INSTALACIONES ELÉCTRICAS",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        price: 169,
        oldPrice: 339,
        badge: "-50%",
        hours: 36,
        sessions: 10,
        description: "Sustento analítico y cumplimiento de normativas vigentes en base al CNE de Perú.",
        objectives: [
          "Elaborar memorias de cálculo conforme al CNE",
          "Calcular luminancia y flujo lumínico por ambientes",
          "Determinar secciones de conductores y protecciones",
          "Calcular y verificar la caída de tensión",
          "Presentar expedientes eléctricos ante OSINERGMIN",
        ],
        includes: [
          "36 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Plantilla de memoria de cálculo eléctrico",
          "Catálogos de conductores y protecciones",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Estructura de la Memoria",
            lessons: ["Secciones de una memoria de cálculo eléctrico", "Normativa CNE Utilización: reglas aplicables", "Datos generales del proyecto y descripción", "Memoria descriptiva y especificaciones técnicas"],
          },
          {
            title: "Módulo 2: Cálculos Técnicos",
            lessons: ["Cálculo de máxima demanda residencial y comercial", "Selección de conductores por ampacidad", "Verificación de caída de tensión en circuitos", "Cálculo de puesta a tierra (SPAT)"],
          },
          {
            title: "Módulo 3: Expediente Eléctrico",
            lessons: ["Planos eléctricos requeridos por norma", "Especificaciones técnicas de materiales", "Certificaciones y sellos de revisión", "Presentación ante entidades reguladoras"],
          },
        ],
      },
      {
        id: "elec-4",
        title: "DISEÑO DE SISTEMAS DE PUESTA A TIERRA (SPAT)",
        image: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=800&q=80",
        price: 159,
        oldPrice: 319,
        badge: "-50%",
        hours: 30,
        sessions: 8,
        description: "Cálculo de malla a tierra, medición de resistividad de terreno y control de tensiones.",
        objectives: [
          "Aplicar normas IEEE 80 y CNE en diseño de SPAT",
          "Medir resistividad del suelo con método Wenner",
          "Diseñar mallas de puesta a tierra industriales",
          "Calcular tensiones de paso y contacto",
          "Seleccionar electrodos y conductores de tierra",
        ],
        includes: [
          "30 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Norma IEEE 80 en español",
          "Software de cálculo SPAT",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fundamentos SPAT",
            lessons: ["Propósito y importancia de la puesta a tierra", "Tipos de sistemas de puesta a tierra", "Resistividad del suelo: medición Wenner", "Factores que afectan la resistividad"],
          },
          {
            title: "Módulo 2: Diseño de Malla",
            lessons: ["Diseño de malla de tierra según IEEE 80", "Cálculo de resistencia de la malla", "Tensiones de paso y contacto máximas", "Mejoramiento de suelos con bentonita y sal"],
          },
          {
            title: "Módulo 3: Instalación y Verificación",
            lessons: ["Materiales: cobre desnudo, electrodos tipo Copperweld", "Conexiones exotérmicas Cadweld", "Medición de la resistencia de puesta a tierra (telurómetro)", "Mantenimiento y protocolo de medición periódica"],
          },
        ],
      },
      {
        id: "elec-5",
        title: "SUBESTACIONES ELÉCTRICAS DE DISTRIBUCIÓN",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
        price: 249,
        oldPrice: 499,
        badge: "-50%",
        hours: 44,
        sessions: 12,
        description: "Criterios técnicos para el diseño, cálculo de protecciones y celdas de distribución.",
        objectives: [
          "Clasificar y caracterizar subestaciones eléctricas",
          "Diseñar subestaciones de distribución en media tensión",
          "Seleccionar transformadores de distribución",
          "Calcular protecciones de entrada y salida",
          "Elaborar planos unilineales de subestación",
        ],
        includes: [
          "44 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Catálogos de transformadores y protecciones",
          "Norma DGE y NTP eléctrica completa",
          "Certificado digital con código QR",
          "4 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Tipos de Subestaciones",
            lessons: ["Clasificación: interior, exterior, convencional", "Subestaciones tipo caseta y pedestal", "Componentes principales: transformador, celdas, medidores", "Criterios de selección según nivel de tensión"],
          },
          {
            title: "Módulo 2: Cálculo y Selección",
            lessons: ["Cálculo de potencia del transformador", "Selección de celdas de media tensión (SF6 y vacío)", "Protecciones: relés de sobrecorriente y tierra", "Interruptores de potencia y seccionadores"],
          },
          {
            title: "Módulo 3: Diseño y Documentación",
            lessons: ["Plano unilíneal de la subestación", "Diagrama de protecciones y coordinación", "Especificaciones técnicas de equipos principales", "Tramitación ante OSINERGMIN y concesionaria"],
          },
        ],
      },
    ],
  },
  {
    id: "geotecnia",
    title: "GEOTECNIA Y TOPOGRAFÍA DE PRECISIÓN",
    colorClass: "text-[#a855f7] bg-purple-50",
    iconColor: "#a855f7",
    courses: [
      {
        id: "geo-1",
        title: "TOPOGRAFÍA APLICADA A MOVIMIENTO DE TIERRAS",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        price: 179,
        oldPrice: 359,
        badge: "-50%",
        hours: 36,
        sessions: 10,
        description: "Cálculo preciso de volúmenes de excavación y relleno, perfiles longitudinales y campo.",
        objectives: [
          "Realizar levantamientos topográficos con estación total",
          "Calcular volúmenes de corte y relleno por secciones",
          "Elaborar perfiles longitudinales de obras de movimiento",
          "Controlar plataformas y taludes en obra",
          "Integrar datos al software Civil 3D y AutoCAD",
        ],
        includes: [
          "36 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Guía de uso de estación total Leica",
          "Hoja de cálculo de movimiento de tierras",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Levantamiento Topográfico",
            lessons: ["Estación total: configuración y uso en campo", "Radiación, intersección y poligonal cerrada", "GPS diferencial RTK para control de obra", "Descarga y procesamiento de datos"],
          },
          {
            title: "Módulo 2: Modelado del Terreno",
            lessons: ["Creación de superficies TIN en Civil 3D", "Curvas de nivel y modelado 3D del terreno", "Comparación de superficies: natural vs proyectada", "Cálculo de volúmenes método cuadrícula y sección"],
          },
          {
            title: "Módulo 3: Control de Obra",
            lessons: ["Replanteo de plataformas y taludes", "Control de niveles y rasantes en campo", "Supervisión de compactación de relleno", "Informe topográfico de avance de obra"],
          },
        ],
      },
      {
        id: "geo-2",
        title: "CONSOLIDACIÓN Y ASENTAMIENTOS DE SUELOS",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        price: 189,
        oldPrice: 379,
        badge: "-50%",
        hours: 32,
        sessions: 8,
        description: "Ensayos geotécnicos y modelado analítico para cimentaciones estables y seguras.",
        objectives: [
          "Comprender la consolidación primaria y secundaria",
          "Interpretar ensayos edométricos de laboratorio",
          "Calcular asentamientos de cimentaciones superficiales",
          "Predecir la evolución temporal de los asentamientos",
          "Diseñar soluciones de mejoramiento de suelos",
        ],
        includes: [
          "32 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Ensayos de laboratorio en formato PDF",
          "Hoja de cálculo de asentamientos",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Teoría de Consolidación",
            lessons: ["Comportamiento de suelos arcillosos bajo carga", "Teoría de Terzaghi para consolidación unidimensional", "Índice de compresión Cc y Cs", "Relación vacíos-presión y curva e-log p"],
          },
          {
            title: "Módulo 2: Cálculo de Asentamientos",
            lessons: ["Asentamiento inmediato por teoría elástica", "Asentamiento por consolidación primaria", "Tiempo para alcanzar un grado de consolidación U%", "Software GEO5 aplicado a consolidación"],
          },
          {
            title: "Módulo 3: Mejoramiento de Suelos",
            lessons: ["Preconsolidación artificial y drenajes verticales (PVD)", "Inyecciones de lechada de cemento", "Vibrocompactación y sustitución de suelo", "Monitoreo de asentamientos en obra con hitos"],
          },
        ],
      },
      {
        id: "geo-3",
        title: "AJUSTE DE POLIGONALES TOPOGRÁFICAS",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        price: 139,
        oldPrice: 279,
        badge: "-50%",
        hours: 24,
        sessions: 6,
        description: "Compensación de errores angulares y de cierre en campo para levantamientos confiables.",
        objectives: [
          "Planificar y ejecutar poligonales topográficas",
          "Calcular el error de cierre angular y lineal",
          "Ajustar poligonales por el método de la brújula",
          "Calcular coordenadas definitivas de los vértices",
          "Evaluar la precisión del levantamiento",
        ],
        includes: [
          "24 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Hoja de cálculo de ajuste de poligonal",
          "Ejercicios resueltos paso a paso",
          "Certificado digital con código QR",
          "2 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fundamentos de Poligonales",
            lessons: ["Tipos de poligonales: cerrada, abierta, encuadrada", "Medición de ángulos con teodolito y estación total", "Medición de distancias con distanciómetro electrónico", "Error de cierre angular: cálculo y tolerancias"],
          },
          {
            title: "Módulo 2: Ajuste y Compensación",
            lessons: ["Método de compensación de Bowditch (Brújula)", "Compensación angular proporcional", "Cálculo de latitudes y departures", "Error de cierre lineal y precisión relativa"],
          },
          {
            title: "Módulo 3: Aplicaciones Prácticas",
            lessons: ["Cálculo de área por coordenadas (método de Gauss)", "Vinculación a la red geodésica nacional", "Uso de LibreCAD y AutoCAD para graficar", "Informe final de levantamiento poligonal"],
          },
        ],
      },
      {
        id: "geo-4",
        title: "FOTOGRAMETRÍA CON AGISOFT METASHAPE",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
        price: 199,
        oldPrice: 399,
        badge: "-50%",
        hours: 40,
        sessions: 12,
        description: "Modelado 3D del terreno, curvas de nivel y ortomosaicos a partir de fotografías de dron.",
        objectives: [
          "Planificar vuelos fotogramétricos con drones",
          "Procesar imágenes aéreas en Agisoft Metashape",
          "Generar nubes de puntos densas y modelos 3D",
          "Producir ortomosaicos de alta resolución",
          "Exportar MDT y curvas de nivel para topografía",
        ],
        includes: [
          "40 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Licencia educativa Agisoft Metashape",
          "Dataset de imágenes de dron para práctica",
          "Certificado digital con código QR",
          "3 evaluaciones de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Fotogrametría Aérea",
            lessons: ["Principios de fotogrametría digital", "Planificación de vuelo con DJI GS Pro y DroneDeploy", "Parámetros de vuelo: GSD, traslape y altitud", "Puntos de control terrestres (GCPs) con GPS"],
          },
          {
            title: "Módulo 2: Procesamiento en Metashape",
            lessons: ["Importación y alineación de imágenes", "Construcción de nube de puntos densa", "Generación de malla 3D y textura fotorrealista", "Exportación de ortomosaico y MDT"],
          },
          {
            title: "Módulo 3: Integración con Topografía",
            lessons: ["Importación de MDT en Civil 3D y QGIS", "Generación de curvas de nivel desde MDT", "Cálculo de volúmenes en ArcGIS y QGIS", "Control de calidad: comparación con estación total"],
          },
        ],
      },
      {
        id: "geo-5",
        title: "GOOGLE EARTH PRO EN LA TOPOGRAFÍA",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        price: 129,
        oldPrice: 259,
        badge: "-50%",
        hours: 20,
        sessions: 5,
        description: "Georreferenciación de planos catastrales e integración con AutoCAD Civil 3D y QGIS.",
        objectives: [
          "Utilizar Google Earth Pro para análisis topográfico",
          "Georreferenciar planos en AutoCAD con coordenadas reales",
          "Extraer perfiles de terreno y curvas de nivel de GEP",
          "Integrar imágenes satelitales a proyectos de ingeniería",
          "Exportar e importar formatos KMZ, DXF y SHP",
        ],
        includes: [
          "20 horas de video clases HD",
          "Acceso de por vida a la plataforma",
          "Guía rápida de Google Earth Pro",
          "Ejercicios de georreferenciación aplicados",
          "Certificado digital con código QR",
          "1 evaluación de conocimiento",
        ],
        syllabus: [
          {
            title: "Módulo 1: Google Earth Pro",
            lessons: ["Navegación y herramientas de medición", "Extracción de perfil de terreno longitudinal", "Exportación de imágenes georreferenciadas (TIFF)", "Capas KML/KMZ: creación y gestión"],
          },
          {
            title: "Módulo 2: Georreferenciación en AutoCAD",
            lessons: ["Inserción de imagen satelital en AutoCAD", "Ajuste por puntos de control (GCPs)", "Escala real y trabajo con coordenadas UTM", "Trazado de límites y áreas sobre imagen"],
          },
          {
            title: "Módulo 3: QGIS Básico para Ingenieros",
            lessons: ["Carga de capas vectoriales y ráster", "Geoprocesamiento: buffer, clip e intersección", "Curvas de nivel desde MDE SRTM/ALOS", "Exportación final a DXF y AutoCAD Civil 3D"],
          },
        ],
      },
    ],
  },
];

const useCountdown = (targetDate: Date) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

const CourseDetail = ({
  course,
  onBack,
}: {
  course: Course;
  onBack: () => void;
}) => {
  const promoEnd = useMemo(() => {
    const d = new Date();

    d.setDate(d.getDate() + 3);
    
return d;
  }, []);

  const countdown = useCountdown(promoEnd);

  // Accordion multiple expand state
  const [openSyllabusIndices, setOpenSyllabusIndices] = useState<number[]>([0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleSyllabus = (idx: number) => {
    if (openSyllabusIndices.includes(idx)) {
      setOpenSyllabusIndices(openSyllabusIndices.filter((i) => i !== idx));
    } else {
      setOpenSyllabusIndices([...openSyllabusIndices, idx]);
    }
  };

  const isAllExpanded = openSyllabusIndices.length === course.syllabus.length;

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenSyllabusIndices([]);
    } else {
      setOpenSyllabusIndices(course.syllabus.map((_, i) => i));
    }
  };

  const faqs = [
    {
      q: "¿Al terminar el curso obtengo un certificado?",
      a: "Sí. Al completar el 100% del contenido recibes un Certificado Digital con código QR de verificación, emitido por Grupo Corpus, con valor curricular reconocido.",
    },
    {
      q: "¿Por cuánto tiempo tengo acceso al curso?",
      a: "Tienes acceso de por vida al curso. Puedes ver el contenido cuantas veces quieras, a tu propio ritmo, desde cualquier dispositivo.",
    },
    {
      q: "¿Qué necesito para llevar el curso?",
      a: "Solo necesitas una computadora con conexión a internet. El software necesario te lo indicamos en el primer módulo, con guías de instalación y licencias de evaluación incluidas.",
    },
    {
      q: "¿Puedo pagar en cuotas?",
      a: "Sí. Aceptamos pago en cuotas mediante tarjeta de crédito a través de nuestra plataforma segura. Contáctanos por WhatsApp para coordinar la forma de pago más cómoda para ti.",
    },
    {
      q: "¿Tienen soporte técnico durante el curso?",
      a: "Sí. Contamos con soporte directo vía WhatsApp para resolver tus dudas técnicas y académicas durante todo el proceso de aprendizaje.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-gc-sans text-[#0f172a]">
      {/* ── Sticky Back bar ── */}
      <div className="bg-[#0c1938] text-white px-4 py-3.5 flex items-center gap-3 sticky top-[68px] z-40 shadow-xl border-t border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#cca353] hover:text-white transition-colors text-sm font-black uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Cursos
        </button>
        <span className="text-gray-600 text-xs">|</span>
        <span className="text-gray-300 text-xs font-semibold truncate hidden sm:block uppercase tracking-wider">{course.title}</span>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-[#0b1528] text-white overflow-hidden py-16">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#cca353]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-[#00d8b4] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5 text-[#00d8b4]" />
            CURSO DE ESPECIALIZACIÓN EN INGENIERÍA
          </div>

          {/* Title */}
          <h1 className="font-gc-sans font-black text-2xl md:text-4xl lg:text-5xl leading-tight uppercase tracking-wide mb-8 max-w-4xl mx-auto text-white select-none">
            {course.title}
          </h1>

          {/* Pricing block */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-400 line-through text-base font-bold">
              S/ {course.oldPrice}.00
            </span>
            <span className="text-[#f5c842] font-black text-4xl md:text-5xl tracking-tight select-none">
              S/ {course.price}.00
            </span>
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              {course.badge}
            </span>
          </div>

          {/* Countdown */}
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-4">
            LA PROMO SE TERMINA EN
          </p>
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { v: String(countdown.days).padStart(2, "0"), l: "días" },
              { v: String(countdown.hours).padStart(2, "0"), l: "hrs" },
              { v: String(countdown.minutes).padStart(2, "0"), l: "min" },
              { v: String(countdown.seconds).padStart(2, "0"), l: "seg" },
            ].map(({ v, l }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[#0e1931] border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl tabular-nums">
                    {v}
                  </span>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-1.5 lowercase">
                  {l}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="https://wa.me/51956266147"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eab308] hover:bg-[#ca8a04] text-gc-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-[#eab308]/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              Inscribirse Ahora
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("syllabus");

                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-white/20 hover:border-white/50 bg-[#0e1931] hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto flex items-center gap-2 justify-center"
            >
              <BookOpen className="w-4 h-4" />
              Ver Temario
            </button>
          </div>
        </div>

        {/* ── Floating Stats Cards ── */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pb-0 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mb-[110px]">
            {[
              { icon: <Play className="w-5 h-5 text-purple-600" />, value: `${course.hours}h`, label: "Video Clases" },
              { icon: <Clock className="w-5 h-5 text-indigo-600" />, value: "24/7", label: "Acceso Total" },
              { icon: <Download className="w-5 h-5 text-blue-600" />, value: "15+", label: "Recursos" },
              { icon: <Award className="w-5 h-5 text-emerald-600" />, value: "Online", label: "Curso Virtual" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl shadow-gc-black/5 border border-gray-100 px-4 py-6 flex flex-col items-center text-center hover:scale-102 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                  {s.icon}
                </div>
                <div className="font-gc-sans font-black text-[#0c1938] text-lg leading-none">{s.value}</div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust features row ── */}
      <div className="bg-[#f8fafc] border-b border-gray-100 pt-28 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-gray-500 font-black uppercase tracking-wider">
            {[
              { icon: <Shield className="w-4 h-4 text-emerald-500" />, text: "Pago 100% seguro" },
              { icon: <Zap className="w-4 h-4 text-amber-500" />, text: "Acceso inmediato" },
              { icon: <Download className="w-4 h-4 text-blue-500" />, text: "Materiales de descarga" },
              { icon: <Award className="w-4 h-4 text-indigo-500" />, text: "Certificado verificado" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                {f.icon}
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WhatsApp CTA ── */}
      <div className="bg-[#10b981] py-8 px-4 text-center">
        <a
          href="https://wa.me/51956266147"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#10b981] hover:bg-gray-50 font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:scale-103 transition-transform"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          ¿Tienes dudas? Consúltanos por WhatsApp
        </a>
        <p className="text-white text-xs mt-2.5 font-bold uppercase tracking-wider">Respuestas inmediatas</p>
      </div>

      {/* ── ¿Qué obtienes? ── */}
      <section className="bg-[#0b1528] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white font-black text-2xl md:text-3xl uppercase tracking-wide">
              ¿Qué obtienes con este <span className="text-[#cca353]">curso?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Play className="w-8 h-8 text-[#cca353]" />,
                title: "Clases Grabadas",
                desc: "Acceso ilimitado a todas las videoclases para estudiar a tu ritmo, en el horario que prefieras, desde cualquier dispositivo.",
              },
              {
                icon: <Download className="w-8 h-8 text-[#00d8b4]" />,
                title: "Material Descargable",
                desc: "Archivos de apoyo, plantillas profesionales, hojas de cálculo y recursos técnicos para cada módulo del curso.",
              },
              {
                icon: <Award className="w-8 h-8 text-[#3b82f6]" />,
                title: "Certificado Digital",
                desc: "Certificado con código QR de verificación y valor curricular, emitido por Grupo Corpus al completar el 100% del curso.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#0e1931] border border-white/5 rounded-2xl p-8 text-center hover:border-[#cca353]/30 transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-white font-black text-base mb-3 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objectives & Includes ── */}
      <section className="py-20 px-4 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Objectives */}
          <div className="bg-[#0c1938] rounded-2xl p-8 border border-white/5 shadow-xl text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#cca353]" />
              </div>
              <h3 className="text-white font-black text-base uppercase tracking-wide">
                Objetivos del Curso
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
              Capacitarte mediante ejercicios prácticos y casos de estudio reales para dominar las herramientas y flujos de trabajo de la especialidad, aplicándolos directamente en proyectos de ingeniería.
            </p>
            <ul className="space-y-4">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#cca353]/15 border border-[#cca353]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#cca353]" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed font-medium">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#f5c842] fill-[#f5c842]" />
              </div>
              <h3 className="text-[#0c1938] font-black text-base uppercase tracking-wide">
                Este Curso Incluye
              </h3>
            </div>
            <ul className="space-y-4">
              {course.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed font-medium">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Syllabus Accordion ── */}
      <section id="syllabus" className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="font-gc-sans font-black text-2xl md:text-4xl text-[#0c1938] uppercase tracking-wide">
              Contenido del <span className="text-[#10b981]">Curso</span>
            </h2>
          </div>
          
          {/* Meta row & Expand Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-black text-gray-500 uppercase tracking-wider">
              {[
                { icon: <BookOpen className="w-3.5 h-3.5" />, text: `${course.syllabus.length} Módulos` },
                { icon: <Clock className="w-3.5 h-3.5" />, text: `${course.hours} Horas` },
                { icon: <Download className="w-3.5 h-3.5" />, text: "03 Recursos" },
                { icon: <FileText className="w-3.5 h-3.5" />, text: "05 Evaluaciones" },
              ].map((m, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  {m.icon} {m.text}
                </span>
              ))}
            </div>
            
            <button
              onClick={toggleExpandAll}
              className="text-xs font-black text-[#10b981] hover:text-[#0b9063] transition-colors bg-[#10b981]/5 hover:bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/15"
            >
              {isAllExpanded ? "Colapsar todo" : "+ Expandir todo"}
            </button>
          </div>

          {/* Accordion modules */}
          <div className="space-y-4">
            {course.syllabus.map((mod, idx) => {
              const isOpen = openSyllabusIndices.includes(idx);

              
return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm text-left"
                >
                  <button
                    onClick={() => toggleSyllabus(idx)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white text-[#0c1938] font-bold text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[#0c1938] font-black tracking-wide text-xs md:text-sm uppercase">{mod.title}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0 text-[#1e40af]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ul className="px-6 py-4 space-y-3 bg-white border-t border-gray-100">
                          {mod.lessons.map((lesson, li) => (
                            <li key={li} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Full syllabus CTA */}
          <div className="text-center mt-10">
            <a
              href="https://wa.me/51956266147"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0b9063] text-white font-black text-xs uppercase tracking-wider transition-colors rounded-full px-8 py-3.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              ¿Quieres conocer el temario completo? Escríbenos
            </a>
          </div>
        </div>
      </section>

      {/* ── Orange CTA ── */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-500 py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="text-white">
            <p className="font-black text-2xl leading-tight mb-2">
              🔥 ¡No dejes pasar esta oportunidad!
            </p>
            <p className="text-orange-50 text-sm leading-relaxed max-w-lg font-medium">
              Inscríbete hoy con un {course.badge} de descuento y accede de inmediato al campus virtual con todo el contenido disponible.
            </p>
          </div>
          <a
            href="https://wa.me/51956266147"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#0c1938] text-white hover:bg-gc-black font-black text-xs uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all shadow-xl flex items-center gap-2 justify-center w-full sm:w-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Inscribirme por S/ {course.price}
          </a>
        </div>
      </section>

      {/* ── Key Metrics ── */}
      <section className="py-16 px-4 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: "+5,000", label: "Alumnos capacitados" },
            { value: "+170", label: "Cursos dictados" },
            { value: "98%", label: "Satisfacción general" },
          ].map((m, i) => (
            <div key={i}>
              <div className="font-black text-3xl md:text-4xl text-[#0c1938] leading-none">{m.value}</div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-2.5">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certification ── */}
      <section className="py-20 px-4 bg-white text-left">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-[#cca353]" />
            </div>
            <h2 className="font-black text-xl md:text-2xl text-[#0c1938] uppercase tracking-wide">
              Certificación
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
            Al completar el {course.title} recibirás un Certificado Digital emitido por Grupo Corpus, con código QR de verificación auténtica, reconocido para tu hoja de vida y portafolio profesional.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
            El certificado cuenta con sello institucional, fecha de emisión y datos del participante verificables en línea. Es válido en procesos de selección, concursos públicos y postulaciones profesionales.
          </p>
          
          {/* Warning card */}
          <div className="bg-[#fefce8] border-l-4 border-[#cca353] rounded-r-xl px-5 py-4.5 flex items-start gap-3 shadow-sm border border-gray-100">
            <Trophy className="w-5 h-5 text-[#b45309] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-[#92400e] text-sm mb-1 uppercase tracking-wide">Sello de Transparencia Académica</p>
              <p className="text-[#78350f] text-xs leading-relaxed font-medium">
                Nuestros certificados incluyen el sello institucional, número de horas académicas oficiales y código QR único verificable en línea. Perfecto para tu CV y LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 px-4 bg-[#091124]">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-white font-black text-2xl md:text-3xl uppercase tracking-wide text-center mb-12">
            Preguntas <span className="text-[#cca353]">Frecuentes</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, fi) => (
              <div key={fi} className="bg-[#0e1931] border border-white/5 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === fi ? null : fi)}
                  className="w-full flex items-center justify-between px-5 py-4 text-white font-bold text-sm hover:bg-[#122345] transition-colors"
                >
                  <span className="tracking-wide">{faq.q}</span>
                  {openFaq === fi ? (
                    <ChevronUp className="w-4 h-4 flex-shrink-0 text-[#cca353] ml-3" />
                  ) : (
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-500 ml-3" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === fi && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#0c1938] py-8 px-4 text-center">
        <p className="text-gray-400 text-sm mb-4 font-semibold uppercase tracking-wider">¿Listo para comenzar tu especialización?</p>
        <a
          href="https://wa.me/51956266147"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#cca353] hover:bg-[#b89244] text-gc-black font-black text-xs uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-lg transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          Inscribirme Ahora — S/ {course.price}
        </a>
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* WhatsApp float */}
      <a
        href="https://wa.me/51956266147"
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
};

// ─── CursosCatalogo (Main Page) ───────────────────────────────────────────────

const CursosCatalogo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { courseTitle } = useParams();
  const router = useRouter()

  // Find the course based on courseTitle in URL
  const selectedCourse = useMemo(() => {
    if (!courseTitle) return null;
    
    // Decode the title from the URL
    const decodedTitle = decodeURIComponent(Array.isArray(courseTitle) ? courseTitle[0] : courseTitle).trim();
    
    const normalizeStr = (str: string) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/ñ/g, "n") // Replace ñ with n
        .replace(/Ñ/g, "N")
        .toLowerCase()
        .trim();
    };

    const normalizedDecoded = normalizeStr(decodedTitle);

    // Search in all categories
    for (const category of categoryData) {
      const match = category.courses.find(
        (c) => normalizeStr(c.title) === normalizedDecoded
      );

      if (match) return match;
    }

    
return null;
  }, [courseTitle]);

  useEffect(() => {
    if (selectedCourse) {
      document.title = `${selectedCourse.title} | Grupo Corpus`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.title = "Cursos Offline Grabados | Grupo Corpus";
      window.scrollTo(0, 0);
    }
  }, [selectedCourse]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return categoryData;
    
return categoryData
      .map((sec) => {
        const matching = sec.courses.filter(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        
return { ...sec, courses: matching };
      })
      .filter((sec) => sec.courses.length > 0);
  }, [searchQuery]);

  // ── If a course is selected, show its detail page ──
  if (selectedCourse) {
    return (
      <>
        <Navbar />
        <div className="pt-[68px]">
          <CourseDetail
            course={selectedCourse}
            onBack={() => router.push("/cursos")}
          />
        </div>
      </>
    );
  }

  // ── Otherwise show the catalog ──
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] font-gc-sans text-[#0f172a]">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-20 pb-20 bg-gradient-to-br from-[#0c1938] via-[#040a1b] to-[#02050f] text-white text-center shadow-xl">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute inset-0 bg-[#cca353]/5 blur-[120px] rounded-full -top-40 -left-40 w-[500px] h-[500px]" />

        <div className="gc-container-custom relative z-10 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#cca353]/15 text-[#cca353] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 border border-[#cca353]/30">
              PLATAFORMA VIRTUAL 24/7
            </span>
            <h1 className="font-gc-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-tight select-none">
              NUESTROS <span className="text-[#cca353]">CURSOS GRABADOS</span>
            </h1>
            <p className="mt-4 text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed select-none">
              Estudia a tu propio ritmo con las mejores capacitaciones especializadas en Ingeniería Civil, Eléctrica, Vial y Arquitectura con certificación internacional.
            </p>

            {/* Premium Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto bg-white rounded-full p-1.5 flex shadow-2xl shadow-gc-black/45 border border-white/10">
              <div className="flex-grow flex items-center px-4">
                <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="¿Qué especialidad deseas aprender hoy? Ej. Civil 3D..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-800 focus:outline-none focus:ring-0 placeholder-gray-400 text-sm pl-2 font-medium"
                />
              </div>
              <button className="bg-[#cca353] hover:bg-[#b89244] text-gc-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Buscar
              </button>
            </div>

            {/* Quick Badges row */}
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-wider select-none">
              <span className="flex items-center gap-1">✅ ACCESO DE POR VIDA</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">🎓 CERTIFICACIÓN CON QR</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">💼 100% PRÁCTICO</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Course Categories listing */}
      <main className="gc-container-custom px-4 py-16 flex-grow max-w-7xl mx-auto space-y-16">
        {filteredSections.length > 0 ? (
          filteredSections.map((sec) => (
            <section key={sec.id} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sec.colorClass} shadow-md`}>
                    <FolderClosed className="w-5 h-5" style={{ color: sec.iconColor }} />
                  </div>
                  <h2 className="font-gc-sans font-black text-sm md:text-base lg:text-lg tracking-wider text-[#0c1938] uppercase">
                    {sec.title}
                  </h2>
                </div>
                <div className="text-[10px] font-black text-[#cca353] tracking-widest uppercase bg-[#cca353]/10 px-3 py-1 rounded-md border border-[#cca353]/20">
                  {sec.courses.length} CURSOS
                </div>
              </div>

              {/* Responsive 5-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {sec.courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#cca353] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                    onClick={() => router.push(`/cursos/${encodeURIComponent(course.title)}`)}
                  >
                    {/* Thumbnail area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Red Discount badge top-right */}
                      <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded shadow-md tracking-wider">
                        {course.badge}
                      </span>
                    </div>

                    {/* Thin color accent bar */}
                    <div className="h-[4px] w-full" style={{ backgroundColor: sec.iconColor }} />

                    {/* Course card info body */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-gc-sans font-black text-xs text-[#0c1938] tracking-wide leading-snug uppercase line-clamp-2 min-h-[36px] select-none group-hover:text-[#cca353] transition-colors duration-300">
                          {course.title}
                        </h3>
                        <p className="text-[10px] text-gray-500 leading-relaxed mt-2 line-clamp-2 min-h-[30px] select-none">
                          {course.description}
                        </p>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mt-3">
                          <div className="flex text-yellow-500 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-[9px] font-bold text-gray-700">5.0</span>
                          <span className="text-[8px] text-gray-400 font-medium">(180)</span>
                        </div>

                        {/* Technical features row */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-[9px] text-gray-500 font-bold uppercase select-none">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{course.hours} horas lectivas</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <span>{course.sessions} sesiones prácticas</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#00d8b4]">
                            <CheckCircle2 className="w-3 h-3 text-[#00d8b4]" />
                            <span>Certificado QR Incluido</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-baseline justify-between">
                          <span className="font-gc-sans font-black text-[#0c1938] text-base">S/ {course.price}</span>
                          <span className="text-[10px] text-gray-400 line-through font-bold">S/ {course.oldPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="p-4 pt-0 flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/cursos/${encodeURIComponent(course.title)}`); }}
                        className="flex-1 border border-[#0c1938] text-[#0c1938] hover:bg-gray-50 font-bold text-[10px] uppercase py-2 rounded-lg text-center tracking-wider transition-all"
                      >
                        Temario
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/cursos/${encodeURIComponent(course.title)}`); }}
                        className="flex-1 bg-[#f97316] hover:bg-orange-600 text-white font-extrabold text-[10px] uppercase py-2 rounded-lg text-center tracking-wider transition-all flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-2.5 h-2.5" /> Comprar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500 max-w-md mx-auto select-none">
            <FolderClosed className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-gray-700">No se encontraron cursos</h3>
            <p className="text-sm text-gray-400 mt-2">
              No encontramos resultados para su búsqueda &quot;{searchQuery}&quot;. Intente buscar con otras palabras clave.
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/51956266147"
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
};

export default CursosCatalogo;
