'use client'

import { useMemo, useState, useEffect } from "react";

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

import { motion, AnimatePresence } from "framer-motion";
import {
  Search, User, Calendar, ArrowLeft, Clock, Eye, Share2,
  Facebook, Twitter, Linkedin, BookOpen, ChevronRight,
  Tag, MessageSquare, Send, ThumbsUp,
} from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  views: string;
  author: string;
  authorRole: string;
  image: string;
  content: string; // HTML string
  tags: string[];
  tableOfContents: { id: string; label: string }[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

const baseArticles: Article[] = [
  {
    id: 1,
    slug: "autocad-electrical-para-diseno-de-tableros-guia-completa",
    category: "Diseño Eléctrico",
    title: "AutoCAD Electrical para Diseño de Tableros: Guía Completa",
    excerpt: "Aprenda a optimizar el diseño de tableros eléctricos y esquemas de control utilizando las herramientas automatizadas de AutoCAD Electrical.",
    date: "20 marzo 2026",
    readTime: "8 min",
    views: "3.2k",
    author: "Ing. Carlos Ramírez",
    authorRole: "Especialista en Diseño Eléctrico",
    image: "",
    tags: ["AutoCAD", "Tableros", "Automatización", "Planos"],
    tableOfContents: [
      { id: "que-es", label: "¿Qué es AutoCAD Electrical?" },
      { id: "ventajas", label: "Ventajas de la automatización" },
      { id: "normas", label: "Normativa aplicable en planos" },
      { id: "flujo", label: "Flujo de trabajo recomendado" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="que-es">¿Qué es AutoCAD Electrical?</h2>
      <p>AutoCAD Electrical es una herramienta especializada de la familia Autodesk diseñada específicamente para la creación y modificación de sistemas de control eléctrico. A diferencia de la versión clásica de AutoCAD, incluye herramientas específicas para automatizar tareas de ingeniería eléctrica.</p>
      <p>En el mercado peruano e internacional, el dominio de AutoCAD Electrical es un requisito fundamental para ingenieros, proyectistas y técnicos que se dedican al diseño de tableros de control y distribución.</p>

      <h2 id="ventajas">Ventajas de la automatización en diseño</h2>
      <p>El uso de herramientas dedicadas permite reducir significativamente los errores de diseño y mejorar la productividad:</p>
      <ul>
        <li>Generación automática de números de cable y etiquetas de componentes.</li>
        <li>Numeración y referenciación cruzada en tiempo real entre bobinas y contactos.</li>
        <li>Creación automática de reportes de materiales (BOM) y listas de conexiones.</li>
        <li>Biblioteca de símbolos normalizados bajo estándares IEC e IEEE.</li>
      </ul>

      <h2 id="normas">Normativa aplicable en planos eléctricos</h2>
      <p>El diseño de planos eléctricos en el Perú debe respetar los lineamientos del Código Nacional de Electricidad (CNE) y normas internacionales como:</p>
      <ul>
        <li><strong>IEC 60617:</strong> Estándar internacional para símbolos gráficos en diagramas.</li>
        <li><strong>IEEE Std 315:</strong> Símbolos gráficos para diagramas eléctricos y electrónicos (común en proyectos con influencia americana).</li>
        <li><strong>IEC 61439:</strong> Normas sobre conjuntos de aparamenta de baja tensión (tableros eléctricos).</li>
      </ul>

      <h2 id="flujo">Flujo de trabajo recomendado</h2>
      <p>Para un diseño eficiente en AutoCAD Electrical, se aconseja seguir este flujo de trabajo:</p>
      <ol>
        <li><strong>Configuración del Proyecto:</strong> Definir las propiedades del proyecto, normas de dibujo y rutas de bibliotecas.</li>
        <li><strong>Dibujo de Esquemas:</strong> Utilizar herramientas de inserción de componentes inteligentes y direccionamiento de cables.</li>
        <li><strong>Diseño del Panel (Layout):</strong> Crear la disposición física del tablero en 2D vinculando los componentes lógicos del esquema.</li>
        <li><strong>Auditoría del Proyecto:</strong> Ejecutar la comprobación de errores para detectar duplicidad de nombres o cables sueltos.</li>
        <li><strong>Generación de Reportes:</strong> Exportar las listas de materiales y borneras de forma automática.</li>
      </ol>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>AutoCAD Electrical no es solo un programa de dibujo, es un entorno de base de datos que garantiza la consistencia del proyecto técnico. La formación en esta herramienta abre grandes oportunidades en los sectores industrial, minero y energético.</p>
      <p>En Grupo Corpus ofrecemos capacitación especializada en AutoCAD Electrical enfocada en proyectos reales para garantizar una rápida inserción laboral.</p>
    `,
  },
  {
    id: 2,
    slug: "diseno-de-iluminacion-profesional-con-dialux-evo",
    category: "Iluminación",
    title: "Diseño de Iluminación Profesional con DIALux evo",
    excerpt: "Guía paso a paso para realizar cálculos lumínicos interiores y exteriores cumpliendo con el Reglamento Nacional de Edificaciones (RNE).",
    date: "18 marzo 2026",
    readTime: "7 min",
    views: "2.8k",
    author: "Ing. Fernando Gómez",
    authorRole: "Especialista en Luminotecnia",
    image: "https://images.unsplash.com/photo-1565538810844-1e1194116c07?w=1200&q=80",
    tags: ["DIALux", "Iluminación", "Luminotecnia", "RNE"],
    tableOfContents: [
      { id: "importancia", label: "Importancia del diseño lumínico" },
      { id: "normativa", label: "Normativa EM.010 del RNE" },
      { id: "dialux", label: "¿Por qué usar DIALux evo?" },
      { id: "proceso", label: "Proceso de diseño en software" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="importancia">Importancia del diseño lumínico profesional</h2>
      <p>El diseño de iluminación va más allá de colocar lámparas en un techo. Requiere un análisis cualitativo y cuantitativo para garantizar el confort visual, la productividad laboral y la eficiencia energética. Un mal cálculo lumínico puede provocar deslumbramiento, fatiga visual o un consumo innecesario de energía.</p>

      <h2 id="normativa">Normativa EM.010 del RNE en el Perú</h2>
      <p>En el Perú, la norma EM.010 "Instalaciones Eléctricas Interiores" del Reglamento Nacional de Edificaciones (RNE) establece los niveles mínimos de iluminancia (expresados en Lux) para cada tipo de ambiente:</p>
      <ul>
        <li>Oficinas generales: mínimo 500 Lux.</li>
        <li>Aulas de estudio: mínimo 300 Lux.</li>
        <li>Pasadizos y zonas de tránsito: mínimo 100 Lux.</li>
        <li>Industrias y talleres mecánicos: de 300 a 750 Lux según la precisión de la tarea.</li>
      </ul>
      <p>Adicionalmente, se deben cumplir criterios de uniformidad y control de deslumbramiento (UGR).</p>

      <h2 id="dialux">¿Por qué usar DIALux evo?</h2>
      <p>DIALux evo es el software estándar a nivel mundial para el diseño y cálculo de iluminación. Permite importar planos CAD o modelos IFC en 3D, configurar materiales con sus respectivos coeficientes de reflexión y descargar catálogos fotométricos de los principales fabricantes de luminarias del mercado.</p>

      <h2 id="proceso">Proceso de diseño en DIALux evo</h2>
      <p>Un flujo típico de modelado y cálculo lumínico incluye:</p>
      <ol>
        <li><strong>Modelado del Espacio:</strong> Construcción de la geometría interior o exterior.</li>
        <li><strong>Definición de Áreas de Trabajo:</strong> Configurar los planos útiles de cálculo según la norma.</li>
        <li><strong>Selección y Colocación de Luminarias:</strong> Importar archivos IES o LDT y distribuirlos estratégicamente.</li>
        <li><strong>Cálculo Lumínico:</strong> Procesar el modelo mediante el motor de trazado de rayos del software.</li>
        <li><strong>Análisis y Reporte:</strong> Verificar el cumplimiento de luxes, uniformidad y generar el reporte fotométrico oficial para el expediente técnico.</li>
      </ol>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>Dominar DIALux evo permite sustentar técnicamente los proyectos de iluminación ante la supervisión o las municipalidades, garantizando un resultado real idéntico al simulado.</p>
    `,
  },
  {
    id: 3,
    slug: "modelado-bim-de-instalaciones-electricas-con-revit-mep",
    category: "BIM Eléctrico",
    title: "Modelado BIM de Instalaciones Eléctricas con Revit MEP",
    excerpt: "El modelado BIM revoluciona el diseño de canalizaciones, bandejas y cableado en edificaciones modernas.",
    date: "16 marzo 2026",
    readTime: "6 min",
    views: "2.1k",
    author: "Ing. Patricia Loli",
    authorRole: "Coordinadora BIM MEP",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&q=80",
    tags: ["Revit", "MEP", "BIM", "Instalaciones"],
    tableOfContents: [
      { id: "que-es", label: "¿Qué es Revit MEP?" },
      { id: "ventajas", label: "Ventajas en la ingeniería eléctrica" },
      { id: "colisiones", label: "Detección de interferencias" },
      { id: "circuitos", label: "Circuitos y cuadros de cargas" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="que-es">¿Qué es Revit MEP?</h2>
      <p>Revit MEP es el módulo de la plataforma Revit de Autodesk especializado en el diseño de sistemas de Mecánica, Electricidad y Plomería (MEP). Trabaja bajo la metodología BIM, lo que significa que cada elemento modelado posee información técnica asociada y está interconectado con el resto del proyecto.</p>

      <h2 id="ventajas">Ventajas en la ingeniería eléctrica</h2>
      <p>Modelar instalaciones eléctricas en BIM ofrece múltiples ventajas sobre el dibujo 2D tradicional:</p>
      <ul>
        <li>Visualización espacial real de canalizaciones y bandejas porta-cables.</li>
        <li>Cálculo automático de longitudes de cableado y cantidad de materiales.</li>
        <li>Actualización dinámica de las vistas de planta, cortes e informes cuando se hace un cambio.</li>
      </ul>

      <h2 id="colisiones">Detección de interferencias (Clash Detection)</h2>
      <p>Uno de los mayores problemas en obra es encontrar que una bandeja eléctrica choca con una tubería de agua o una viga estructural. Revit MEP permite detectar estas colisiones en la etapa de diseño, evitando retrasos y sobrecostos significativos en la fase de construcción.</p>

      <h2 id="circuitos">Circuitos eléctricos y cuadros de cargas</h2>
      <p>En Revit MEP se pueden agrupar los tomacorrientes y luminarias en circuitos lógicos vinculados a un tablero eléctrico. El software calcula automáticamente la carga total conectada, la corriente de diseño y genera un cuadro de cargas preliminar que agiliza el cálculo del alimentador principal.</p>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>El uso de Revit MEP ya no es una opción del futuro, sino un estándar requerido por la normativa de contrataciones del Estado peruano (Plan BIM Perú). Capacitarse en esta área es vital para mantenerse vigente en la industria de la construcción.</p>
    `,
  },
  {
    id: 4,
    slug: "normas-del-codigo-nacional-de-electricidad-cne-en-peru",
    category: "Normativa",
    title: "Normas Clave del Código Nacional de Electricidad (CNE) en Perú",
    excerpt: "Conceptos esenciales del Código Nacional de Electricidad de Utilización y Suministro aplicados a proyectos seguros.",
    date: "14 marzo 2026",
    readTime: "10 min",
    views: "4.5k",
    author: "Ing. Luis Mendoza",
    authorRole: "Especialista en Normativa Eléctrica",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    tags: ["CNE", "Normativa", "Seguridad", "Perú"],
    tableOfContents: [
      { id: "introduccion", label: "Introducción al CNE" },
      { id: "utilizacion", label: "CNE Utilización" },
      { id: "puesta-tierra", label: "Reglas de Puesta a Tierra" },
      { id: "protecciones", label: "Dispositivos de protección" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="introduccion">Introducción al Código Nacional de Electricidad (CNE)</h2>
      <p>El Código Nacional de Electricidad (CNE) es el documento normativo supremo en el Perú que regula el diseño, construcción, operación y mantenimiento de las instalaciones eléctricas. Su objetivo principal es salvaguardar la vida de las personas y la integridad de los bienes frente a los riesgos eléctricos.</p>

      <h2 id="utilizacion">CNE Utilización: Instalaciones Interiores</h2>
      <p>El CNE - Utilización rige las instalaciones eléctricas desde el punto de entrega de la empresa concesionaria hasta el último punto de consumo. Algunas reglas críticas establecen:</p>
      <ul>
        <li>Uso obligatorio de conductores con aislamiento libre de halógenos en lugares de pública concurrencia para evitar gases tóxicos en incendios.</li>
        <li>Cálculo de la demanda máxima aplicando factores de diversidad y simultaneidad normados.</li>
        <li>Obligatoriedad de planos firmados por un Ingeniero Electricista o Mecánico Electricista colegiado.</li>
      </ul>

      <h2 id="puesta-tierra">Reglas obligatorias de Puesta a Tierra</h2>
      <p>El CNE exige que toda instalación eléctrica disponga de un sistema de puesta a tierra (SPAT). Los tomacorrientes deben contar con un borne para conexión de tierra para derivar corrientes de fuga y evitar descargas sobre los usuarios al tocar equipos con fallas de aislamiento.</p>

      <h2 id="protecciones">Dispositivos de protección indispensables</h2>
      <p>Los tableros eléctricos residenciales y comerciales deben contar obligatoriamente con:</p>
      <ul>
        <li><strong>Interruptores termomagnéticos:</strong> Para proteger los cables contra sobrecargas y cortocircuitos.</li>
        <li><strong>Interruptores diferenciales:</strong> Para la protección de la vida humana contra contactos directos e indirectos, actuando ante fugas de corriente mínimas (30mA).</li>
      </ul>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>Cumplir con el CNE es una obligación legal y ética. Los profesionales del sector eléctrico deben actualizarse constantemente con las modificaciones de la norma para garantizar proyectos conformes y seguros.</p>
    `,
  },
  {
    id: 5,
    slug: "calculo-de-caida-de-tension-en-alimentadores-electricos",
    category: "Diseño Eléctrico",
    title: "Cálculo de Caída de Tensión en Alimentadores Eléctricos",
    excerpt: "Métodos prácticos para calcular la caída de tensión en instalaciones industriales y comerciales según el CNE.",
    date: "14 marzo 2026",
    readTime: "9 min",
    views: "3.7k",
    author: "Ing. Pedro Saldaña",
    authorRole: "Ingeniero de Proyectos Eléctricos",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
    tags: ["Cálculos", "CNE", "Conductores", "Tensión"],
    tableOfContents: [
      { id: "conceptos", label: "Conceptos fundamentales" },
      { id: "limites", label: "Límites permitidos" },
      { id: "formulas", label: "Fórmulas de cálculo" },
      { id: "factores", label: "Factores de corrección" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="conceptos">Conceptos de caída de tensión</h2>
      <p>La caída de tensión es la disminución del voltaje a lo largo de un conductor eléctrico debido a la resistencia y reactancia del propio cable al paso de la corriente. Si la caída de tensión es excesiva, los equipos finales pueden funcionar mal, calentarse o sufrir daños permanentes.</p>

      <h2 id="limites">Límites permitidos por el CNE en Perú</h2>
      <p>El Código Nacional de Electricidad establece límites muy claros para la caída de tensión máxima permitida en las instalaciones:</p>
      <ul>
        <li>Alimentador principal: máximo 2.5%</li>
        <li>Circuitos derivados: máximo 2.5%</li>
        <li>Caída total acumulada desde el punto de entrega hasta el punto más lejano: máximo 4.0%</li>
      </ul>

      <h2 id="formulas">Fórmulas para el cálculo de caída de tensión</h2>
      <p>Para sistemas trifásicos en baja tensión, la fórmula general aproximada es:</p>
      <p><strong>ΔV = √3 * I * L * (R * cosφ + X * senφ)</strong></p>
      <p>Donde:
      <ul>
        <li>I es la corriente de diseño (Amperios).</li>
        <li>L es la longitud del circuito (kilómetros).</li>
        <li>R y X son la resistencia y reactancia del conductor por unidad de longitud (Ohm/km).</li>
        <li>cosφ es el factor de potencia de la carga.</li>
      </ul>

      <h2 id="factores">Factores de corrección de capacidad de corriente</h2>
      <p>Además de la caída de tensión, se debe verificar que el conductor soporte la corriente del circuito, aplicando factores de corrección por temperatura ambiente y por agrupamiento de conductores dentro de una misma canalización.</p>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>El dimensionamiento correcto de un conductor debe cumplir siempre con dos criterios: capacidad térmica (soporte de corriente) y límite de caída de tensión. Omitir este último es uno de los errores más comunes en proyectos de gran longitud.</p>
    `,
  },
  {
    id: 6,
    slug: "diseno-de-subestaciones-electricas-de-distribucion",
    category: "Media Tensión",
    title: "Diseño de Subestaciones Eléctricas de Distribución",
    excerpt: "Criterios técnicos para la selección de transformadores, celdas de protección y dimensionamiento de subestaciones.",
    date: "12 marzo 2026",
    readTime: "7 min",
    views: "1.9k",
    author: "Ing. Alejandro Rivas",
    authorRole: "Consultor en Media Tensión",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    tags: ["Subestaciones", "Transformador", "Media Tensión", "Distribución"],
    tableOfContents: [
      { id: "tipos", label: "Tipos de subestaciones" },
      { id: "transformador", label: "Selección del transformador" },
      { id: "celdas", label: "Celdas de Media Tensión" },
      { id: "seguridad", label: "Sistemas de seguridad" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="tipos">Tipos de subestaciones de distribución</h2>
      <p>Las subestaciones eléctricas reducen los niveles de media tensión (comúnmente 10kV, 13.2kV o 22.9kV en Perú) a baja tensión (380/220V) para su uso comercial o residencial. Pueden ser:</p>
      <ul>
        <li>Subestaciones aéreas biposte: Montadas sobre postes, típicas en zonas urbanas y rurales de baja potencia.</li>
        <li>Subestaciones de pedestal (Pad-mounted): Unidades compactas para exteriores, muy usadas en centros comerciales y urbanizaciones modernas.</li>
        <li>Subestaciones en caseta (interior): Ubicadas dentro de salas técnicas de concreto en edificios, industrias o minas.</li>
      </ul>

      <h2 id="transformador">Selección del transformador de potencia</h2>
      <p>El transformador es el corazón de la subestación. Los parámetros clave para su selección son:</p>
      <ul>
        <li>Potencia nominal (kVA) basada en la demanda máxima del proyecto más reserva.</li>
        <li>Tipo de aislamiento: En aceite (para exteriores o bóvedas) o seco encapsulado en resina (para interiores por su bajo riesgo de incendio).</li>
        <li>Grupo de conexión: Habitualmente Dyn5 para subestaciones de distribución en Perú.</li>
      </ul>

      <h2 id="celdas">Celdas de Media Tensión</h2>
      <p>Las celdas alojan los equipos de maniobra y protección. Incluyen interruptores en vacío o hexafluoruro de azufre (SF6), seccionadores de línea y de puesta a tierra, y fusibles de protección asociados.</p>

      <h2 id="seguridad">Sistemas de seguridad indispensables</h2>
      <p>Toda subestación debe contar con una malla de puesta a tierra dimensionada para evitar tensiones de paso y de toque peligrosas, extintores de CO2, sistemas de ventilación adecuados y señalización de peligro de muerte.</p>
    `,
  },
  {
    id: 7,
    slug: "seguridad-y-prevencion-de-riesgos-electricos-en-baja-tension",
    category: "Seguridad",
    title: "Seguridad y Prevención de Riesgos Eléctricos en Baja Tensión",
    excerpt: "Las reglas de oro de la de la electricidad y las mejores prácticas para evitar accidentes de origen eléctrico en campo.",
    date: "12 marzo 2026",
    readTime: "11 min",
    views: "5.1k",
    author: "Ing. Ana Torres",
    authorRole: "Coordinadora de Seguridad Eléctrica",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&q=80",
    tags: ["Seguridad", "Riesgos", "EPP", "5 Reglas de Oro"],
    tableOfContents: [
      { id: "introduccion", label: "El peligro eléctrico" },
      { id: "cinco-reglas", label: "Las 5 Reglas de Oro" },
      { id: "epp", label: "Equipo de Protección Personal" },
      { id: "loto", label: "Bloqueo y etiquetado (LOTO)" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="introduccion">El peligro eléctrico en baja tensión</h2>
      <p>La corriente eléctrica es invisible y silenciosa. En baja tensión (tensiones menores a 1000V), los accidentes suelen ocurrir por exceso de confianza. El paso de la corriente a través del cuerpo humano puede producir fibrilación ventricular, paro respiratorio, quemaduras graves o muerte.</p>

      <h2 id="cinco-reglas">Las 5 Reglas de Oro de la Electricidad</h2>
      <p>Para realizar trabajos en instalaciones eléctricas sin tensión, se deben seguir estrictamente estas cinco reglas:</p>
      <ol>
        <li><strong>Desconectar:</strong> Aislar todas las fuentes de tensión del circuito.</li>
        <li><strong>Bloquear:</strong> Prevenir cualquier reconexión accidental mediante candados o dispositivos físicos.</li>
        <li><strong>Verificar:</strong> Comprobar la ausencia de tensión con un multímetro o revelador de tensión calibrado.</li>
        <li><strong>Poner a tierra y en cortocircuito:</strong> Conectar a tierra todos los conductores activos en el área de trabajo.</li>
        <li><strong>Proteger y Señalizar:</strong> Delimitar la zona de trabajo con pantallas protectoras y carteles de advertencia.</li>
      </ol>

      <h2 id="epp">Equipo de Protección Personal (EPP) Dieléctrico</h2>
      <p>El electricista debe vestir siempre:</p>
      <ul>
        <li>Casco dieléctrico de seguridad (Clase E).</li>
        <li>Lentes de seguridad con protección UV.</li>
        <li>Guantes dieléctricos de la clase apropiada para la tensión de trabajo.</li>
        <li>Zapatos dieléctricos sin puntera metálica.</li>
        <li>Ropa de trabajo de algodón o resistente al arco eléctrico (NFPA 70E).</li>
      </ul>

      <h2 id="loto">Bloqueo y etiquetado (LOTO - Lockout/Tagout)</h2>
      <p>Es el procedimiento de seguridad industrial que consiste en bloquear y etiquetar físicamente los interruptores antes de realizar mantenimiento técnico. Garantiza que ningún otro operador reenergice la máquina o circuito mientras haya personal laborando.</p>
    `,
  },
  {
    id: 8,
    slug: "auditorias-de-eficiencia-energetica-e-iluminacion-led",
    category: "Iluminación",
    title: "Auditorías de Eficiencia Energética e Iluminación LED",
    excerpt: "Cómo auditar una instalación industrial para reducir el consumo y optimizar los niveles de iluminancia requeridos.",
    date: "10 marzo 2026",
    readTime: "8 min",
    views: "2.6k",
    author: "Ing. Marcos Cárdenas",
    authorRole: "Auditor Energético Registrado",
    image: "https://images.unsplash.com/photo-1513828760659-d1d88c7793ec?w=1200&q=80",
    tags: ["Eficiencia", "LED", "Auditoría", "Ahorro"],
    tableOfContents: [
      { id: "que-es", label: "¿Qué es una auditoría energética?" },
      { id: "tecnologia-led", label: "Ventajas de la tecnología LED" },
      { id: "pasos", label: "Pasos de una auditoría lumínica" },
      { id: "ahorro", label: "Cálculo de retorno de inversión" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="que-es">¿Qué es una auditoría de eficiencia energética?</h2>
      <p>Una auditoría energética es un estudio sistemático que evalúa cómo se consume la energía en una instalación comercial o industrial. Su fin es identificar oportunidades de mejora para reducir el consumo y los costos operativos sin afectar la productividad.</p>

      <h2 id="tecnologia-led">Reemplazo tecnológico por luminarias LED</h2>
      <p>El sistema de iluminación suele representar entre el 20% y el 50% de la facturación eléctrica de un comercio u oficina. La migración a tecnología LED ofrece:</p>
      <ul>
        <li>Ahorro de energía de hasta un 60% respecto a lámparas fluorescentes o de descarga.</li>
        <li>Mayor vida útil (hasta 50,000 horas), reduciendo costos de mantenimiento por reemplazos.</li>
        <li>Encendido instantáneo y nulo parpadeo, mejorando el confort visual.</li>
      </ul>

      <h2 id="pasos">Pasos para realizar una auditoría lumínica</h2>
      <ol>
        <li><strong>Inventario de Equipos:</strong> Listar todas las luminarias existentes, potencias y horas de funcionamiento.</li>
        <li><strong>Medición en Campo:</strong> Medir los luxes reales con un luxómetro en los puestos de trabajo.</li>
        <li><strong>Diseño de Propuesta:</strong> Modelar la nueva iluminación en DIALux evo para garantizar que cumple el RNE con menos lámparas y menor consumo.</li>
        <li><strong>Cálculo Económico:</strong> Determinar el ahorro en kWh y la reducción en la factura de la concesionaria.</li>
        <li><strong>Cálculo de Retorno de Inversión:</strong> Estimar cuándo se recupera el capital invertido.</li>
      </ol>

      <h2 id="ahorro">Retorno de la inversión (ROI)</h2>
      <p>El costo de sustitución por luminarias LED se amortiza habitualmente en periodos de 6 a 18 meses, dependiendo de las horas de operación diarias. Es uno de los proyectos de eficiencia con el retorno más rápido y seguro.</p>
    `,
  },
  {
    id: 9,
    slug: "sistemas-de-puesta-a-tierra-diseno-y-medicion-en-peru",
    category: "Normativa",
    title: "Sistemas de Puesta a Tierra: Diseño y Mediciones Clave",
    excerpt: "Metodologías de diseño de SPAT y medición de resistividad de terreno con el telurómetro.",
    date: "9 marzo 2026",
    readTime: "9 min",
    views: "1.7k",
    author: "Ing. Julio Espinoza",
    authorRole: "Consultor en Protecciones Eléctricas",
    image: "https://images.unsplash.com/photo-1581093057726-442ba0bec3b1?w=1200&q=80",
    tags: ["SPAT", "Telurómetro", "Resistividad", "CNE"],
    tableOfContents: [
      { id: "conceptos", label: "Conceptos fundamentales" },
      { id: "resistividad", label: "Resistividad del terreno" },
      { id: "metodos-medida", label: "Medición con telurómetro" },
      { id: "diseno", label: "Diseño del pozo a tierra" },
      { id: "conclusiones", label: "Conclusiones" },
    ],
    content: `
      <h2 id="conceptos">Conceptos fundamentales de Puesta a Tierra (SPAT)</h2>
      <p>Un Sistema de Puesta a Tierra (SPAT) conecta las partes metálicas no activas de una instalación directamente al suelo mediante electrodos y conductores. Su propósito es limitar la tensión de los chasis metálicos respecto a tierra y drenar corrientes de cortocircuito o descargas atmosféricas (rayos).</p>

      <h2 id="resistividad">Resistividad eléctrica del terreno</h2>
      <p>Antes de diseñar un pozo a tierra, es indispensable conocer la resistividad del suelo (expresada en Ohm-metro). Esta se mide usando el método de Wenner (4 electrodos en línea). La resistividad varía según el tipo de suelo (arena, arcilla, roca), la humedad y el contenido de sales.</p>

      <h2 id="metodos-medida">Medición de la resistencia de tierra con telurómetro</h2>
      <p>Para comprobar que un pozo a tierra cumple con el valor de resistencia requerido por la norma, se utiliza un telurómetro aplicando el método de la caída de potencial (método del 62%). Los límites típicos en el Perú son:</p>
      <ul>
        <li>Instalaciones de baja tensión generales: menor a 25 Ohmios.</li>
        <li>Sistemas informáticos y salas de servidores (tierra de cómputo): menor a 5 Ohmios.</li>
        <li>Subestaciones eléctricas de distribución: menor a 15 Ohmios.</li>
      </ul>

      <h2 id="diseno">Diseño básico de un pozo a tierra vertical</h2>
      <p>Un pozo a tierra típico se compone de una varilla de cobre puro de 3/4" de diámetro y 2.40 metros de longitud, colocada verticalmente dentro de un excavación rellena de tierra de cultivo mezclada con dosis de gel de conductividad para mejorar la conductividad del terreno.</p>
    `,
  },
];

const categories = [
  { key: "all", label: "Todos" },
  { key: "Diseño Eléctrico", label: "Diseño Eléctrico" },
  { key: "Iluminación", label: "Iluminación" },
  { key: "BIM Eléctrico", label: "BIM Eléctrico" },
  { key: "Normativa", label: "Normativa" },
  { key: "Media Tensión", label: "Media Tensión" },
  { key: "Seguridad", label: "Seguridad" },
];

// ─── Footer (shared) ─────────────────────────────────────────────────────────
const SiteFooter = () => <Footer />;

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
const WhatsAppFAB = () => (
  <a href="https://wa.me/51956266147" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 text-white">
    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.734-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.45.993c-5.439 0-9.859 4.37-9.863 9.8-.001 1.73.457 3.424 1.326 4.917L1.87 20.84l5.35-1.395c-1.42.776-2.58.55-2.58.55zM17.43 14.93c-.302-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.777.98-.95 1.18-.178.2-.355.22-.658.07-1.485-.75-2.56-1.3-3.585-3.08-.27-.47.27-.43.77-.93.18-.18.15-.3.07-.45-.07-.15-.678-1.63-.93-2.23-.244-.59-.49-.51-.678-.52-.178-.01-.383-.01-.588-.01-.205 0-.538.08-.82.38-.282.3-1.077 1.05-1.077 2.57s1.1 2.98 1.25 3.18c.15.2 2.163 3.303 5.242 4.63 1.243.535 2.193.85 2.946 1.09 1.246.395 2.382.34 3.278.206.996-.15 2.062-.84 2.352-1.62.29-.78.29-1.45.2-1.58c-.09-.13-.33-.2-.635-.35z" />
    </svg>
  </a>
);

// ─── Placeholder thumbnail ────────────────────────────────────────────────────
const PlaceholderThumb = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#101e42] to-[#0a1128] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" className="stroke-current text-white">
        <line x1="0" y1="20%" x2="100%" y2="80%" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="80%" x2="100%" y2="20%" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50%" cy="50%" r="40" fill="none" strokeWidth="1" />
      </svg>
    </div>
    <span className="text-[#cca353]/25 font-black text-xl tracking-widest select-none">GRUPO CORPUS</span>
  </div>
);

// ─── Article Detail Page ──────────────────────────────────────────────────────
const ArticleDetail = ({ article, onBack }: { article: Article; onBack: () => void }) => {
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  const related = useMemo(() =>
    baseArticles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3),
    [article]
  );

  useEffect(() => {
    document.title = `${article.title} | Grupo Corpus`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
    alert("¡Comentario enviado! Será revisado antes de publicarse.");
  };

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-gc-sans text-[#1e293b]">
      <Navbar />

      {/* ── Sticky breadcrumb bar ── */}
      <div className="bg-[#0c1938] text-white px-4 py-3 flex items-center gap-3 sticky top-[68px] z-40 shadow border-t border-white/5">
        <button onClick={onBack}
          className="flex items-center gap-2 text-[#cca353] hover:text-white transition-colors text-sm font-black uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Volver a Recursos
        </button>
        <span className="text-white/20">|</span>
        <span className="text-gray-300 text-xs font-semibold truncate hidden sm:block">
          {article.category} / {article.title}
        </span>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-[#0b1528] to-[#0f1e42] text-white overflow-hidden">
        {article.image ? (
          <div className="absolute inset-0">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1528]/80 via-[#0b1528]/60 to-[#0b1528]" />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-20">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-[#cca353] text-gc-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>

          <h1 className="font-black text-2xl md:text-4xl lg:text-5xl leading-tight text-white mb-6 max-w-3xl">
            {article.title}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#cca353]/20 border border-[#cca353]/30 flex items-center justify-center">
                <User className="w-4 h-4 text-[#cca353]" />
              </div>
              <div>
                <p className="text-white font-bold text-xs">{article.author}</p>
                <p className="text-gray-500 text-[10px]">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#cca353]" /><span>{article.date}</span></div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#cca353]" /><span>{article.readTime} de lectura</span></div>
            <div className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-[#cca353]" /><span>{article.views} vistas</span></div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase tracking-wider">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content + sidebar ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

        {/* Content */}
        <main>
          {/* Featured image */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden mb-10 shadow-xl">
              <img src={article.image} alt={article.title} className="w-full object-cover max-h-[420px]" />
            </div>
          )}

          {/* Article body */}
          <article
            className="prose prose-slate max-w-none
              prose-h2:font-black prose-h2:text-[#0f172a] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
              prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-gray-600
              prose-ul:text-[15px] prose-ul:text-gray-600 prose-li:my-1
              prose-ol:text-[15px] prose-ol:text-gray-600
              prose-strong:text-[#0f172a] prose-strong:font-bold
              prose-a:text-[#cca353] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#cca353]" /> Compartir artículo
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: <Facebook className="w-4 h-4" />, label: "Facebook", color: "bg-[#1877F2]", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter / X", color: "bg-gc-black", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}` },
                { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", color: "bg-[#0A66C2]", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${s.color} text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity`}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-black text-[#0f172a] mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#cca353]" /> Artículos relacionados
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {related.map(rel => (
                  <Link key={rel.id} href={`/recursos/${rel.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#cca353]/40 hover:shadow-lg transition-all duration-300">
                    <div className="h-36 relative overflow-hidden">
                      {rel.image ? (
                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <PlaceholderThumb />
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-black text-[#cca353] uppercase tracking-wider">{rel.category}</span>
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#cca353] transition-colors leading-snug mt-1 line-clamp-2">{rel.title}</h4>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rel.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comment form */}
          <div className="mt-14 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-xl font-black text-[#0f172a] mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#cca353]" /> Deja un comentario
            </h3>
            <p className="text-sm text-gray-400 mb-6">Tu dirección de correo no será publicada. Los campos obligatorios están marcados con *</p>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nombre *</label>
                  <input required value={commentName} onChange={e => setCommentName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#cca353] focus:ring-2 focus:ring-[#cca353]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                  <input required type="email" value={commentEmail} onChange={e => setCommentEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#cca353] focus:ring-2 focus:ring-[#cca353]/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Comentario *</label>
                <textarea required rows={5} value={commentText} onChange={e => setCommentText(e.target.value)}
                  placeholder="Escribe tu comentario aquí..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#cca353] focus:ring-2 focus:ring-[#cca353]/10 transition-all resize-none" />
              </div>
              <button type="submit"
                className="inline-flex items-center gap-2 bg-[#cca353] hover:bg-[#b89244] text-gc-black font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02]">
                <Send className="w-4 h-4" /> Publicar comentario
              </button>
            </form>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-[120px] lg:self-start">

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-black text-sm text-[#0f172a] uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#cca353]" /> Contenido
            </h4>
            <nav className="space-y-1">
              {article.tableOfContents.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}
                  className="flex items-start gap-2.5 py-2 px-2 rounded-lg text-sm text-gray-600 hover:text-[#cca353] hover:bg-[#cca353]/5 transition-all group">
                  <span className="w-5 h-5 rounded-full bg-[#cca353]/10 text-[#cca353] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#cca353] group-hover:text-white transition-all">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Author card */}
          <div className="bg-gradient-to-br from-[#0b1528] to-[#0f1e42] rounded-2xl p-6 text-white shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[#cca353]/20 border-2 border-[#cca353]/40 flex items-center justify-center mb-4">
              <User className="w-7 h-7 text-[#cca353]" />
            </div>
            <p className="font-black text-sm text-white mb-0.5">{article.author}</p>
            <p className="text-xs text-[#cca353] font-bold mb-3">{article.authorRole}</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Especialista en ingeniería civil con amplia experiencia en proyectos de infraestructura en Perú y Latinoamérica.
            </p>
          </div>

          {/* CTA box */}
          <div className="bg-[#cca353] rounded-2xl p-6 text-gc-black shadow-lg">
            <p className="font-black text-sm uppercase tracking-wider mb-2">¿Te interesa especializarte?</p>
            <p className="text-xs leading-relaxed text-gc-black/70 mb-4">
              Descubre nuestros cursos especializados en ingeniería civil y construcción.
            </p>
            <Link href="/cursos"
              className="inline-flex items-center gap-2 bg-[#0b1528] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-[#1a2f5a] transition-colors w-full justify-center">
              Ver cursos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {[
                { icon: <Clock className="w-4 h-4" />, val: article.readTime, label: "Lectura" },
                { icon: <Eye className="w-4 h-4" />, val: article.views, label: "Vistas" },
                { icon: <ThumbsUp className="w-4 h-4" />, val: "98%", label: "Útil" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className="text-[#cca353]">{stat.icon}</span>
                  <span className="font-black text-sm text-[#0f172a]">{stat.val}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <SiteFooter />
      <WhatsAppFAB />
    </div>
  );
};

// ─── Main Catalog ─────────────────────────────────────────────────────────────

const Recursos = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const { articleSlug } = useParams();
  const router = useRouter()

  // Find article from slug
  const selectedArticle = useMemo(() => {
    if (!articleSlug) return null;
    
return baseArticles.find(a => a.slug === articleSlug) ?? null;
  }, [articleSlug]);

  useEffect(() => {
    if (!selectedArticle) {
      document.title = "Artículos y Recursos del Sector Eléctrico | Grupo Corpus";
      window.scrollTo(0, 0);
    }
  }, [selectedArticle]);

  const articles = useMemo(() => {
    return baseArticles.filter(a => {
      const matchCat = activeCat === "all" || a.category.toLowerCase() === activeCat.toLowerCase();
      const q = query.trim().toLowerCase();
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);

      
return matchCat && matchQ;
    });
  }, [query, activeCat]);

  // If an article slug is in URL → show article detail
  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => router.push("/recursos")}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-white font-gc-sans text-gray-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-[#101e42] to-[#0a1128] text-center text-white">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#cca353]/5 blur-[120px] pointer-events-none" />
        <div className="gc-container-custom relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-gc-display font-extrabold text-4xl md:text-5xl tracking-tight text-[#5d8fe6] mb-4">
              Artículos y Recursos del Sector Eléctrico
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-normal">
              Recursos y conocimientos sobre diseño eléctrico, iluminación, Revit MEP y normativa
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex justify-center items-stretch max-w-md mx-auto w-full gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="flex-grow bg-white border border-white/10 rounded-lg px-4 py-3 text-gc-black placeholder-gray-400 outline-none text-[15px] shadow-lg font-medium" />
            <button className="bg-[#cca353] hover:bg-[#b89244] text-gc-black px-5 rounded-lg transition-colors flex items-center justify-center shadow-lg">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="gc-container-custom px-4 pt-10">
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-5xl mx-auto">
          {categories.map(c => {
            const active = activeCat === c.key;

            
return (
              <button key={c.key} onClick={() => setActiveCat(c.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 tracking-wide ${active ? "bg-[#cca353] text-white shadow-md scale-105" : "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200"}`}>
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="gc-container-custom px-4 pb-16 flex-grow">
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((a, i) => (
              <motion.article
                layout key={a.id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                onClick={() => router.push(`/recursos/${a.slug}`)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Category badge */}
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md text-[10px] font-extrabold tracking-wider bg-[#cca353] text-white shadow-md uppercase">
                  {a.category}
                </span>

                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {a.image ? (
                    <>
                      <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gc-black/10 group-hover:bg-gc-black/5 transition-colors" />
                    </>
                  ) : (
                    <PlaceholderThumb />
                  )}
                  {/* Read time badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gc-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {a.readTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-gc-display font-bold text-lg text-slate-800 group-hover:text-[#cca353] transition-colors leading-snug line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-3 flex-1 leading-relaxed">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mt-4 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-[#cca353]">
                      <User size={13} strokeWidth={2.5} />
                      <span className="text-gray-600 font-bold text-[11px]">{a.author}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#4e86db]">
                      <Calendar size={13} strokeWidth={2.5} />
                      <span className="text-gray-500 text-[11px]">{a.date}</span>
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-gray-400">
                      <Eye size={13} strokeWidth={2.5} />
                      <span className="text-[11px]">{a.views}</span>
                    </span>
                  </div>
                  <span className="text-[#cca353] font-bold text-xs uppercase tracking-wider block mt-4 hover:text-[#b58c42] transition-colors flex items-center gap-1">
                    Leer artículo <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {articles.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12 mb-8">
            {[1, 2, 3].map((n) => (
              <button key={n} className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center transition-all duration-300 ${n === 1 ? "bg-[#cca353] text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-[#cca353] hover:text-[#cca353]"}`}>
                {n}
              </button>
            ))}
            <span className="px-2 text-gray-400 font-bold text-sm">...</span>
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#cca353] hover:text-[#cca353] font-bold text-sm transition-all duration-300 flex items-center justify-center">5</button>
            <button className="px-4 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#cca353] hover:text-[#cca353] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1">
              Siguiente →
            </button>
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-bold">No se encontraron artículos</p>
            <p className="text-sm mt-1">Prueba con otros términos de búsqueda.</p>
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppFAB />
    </div>
  );
};

export default Recursos;
