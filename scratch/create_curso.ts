import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const profe = await prisma.usuario.findFirst({ where: { rol: 'ADMIN' } });
  
  if (!profe) {
    console.log("No se encontró un usuario ADMIN");
    return;
  }

  const cat = await prisma.categoria.findFirst();

  const curso = await prisma.curso.create({
    data: {
      titulo: 'Masterclass Completo de Demostración 2026',
      slug: 'masterclass-completo-demostracion-' + Date.now(),
      codigo: 'MC-2026',
      descripcion: 'Este es un curso generado automáticamente con todos los campos disponibles para verificar el correcto funcionamiento de la plataforma. Cubre desde lo más básico hasta los temas más avanzados, con recursos adicionales y certificaciones.',
      miniatura: '/images/portada-general.webp',
      video_presentacion: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duracion: '40 horas',
      numero_asesor: '987654321',
      landing_active: true,
      landing_bg_image: '/images/portada-general.webp',
      landing_timer: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      tipo_emision: 'ASINCRONO',
      estado: 'PUBLICADO',
      es_gratis: false,
      es_privado: false,
      completar_automatico: false,
      precio_certificado: 50.00,
      precio: 299.99,
      precio_falso: 599.99,
      precio_oferta: 199.99,
      moneda: 'PEN',
      profesor_id: profe.id,
      categoria_id: cat?.id || null,
      tipo: 'CURSO',
      beneficios: JSON.stringify(['Acceso vitalicio', 'Certificado validado internacionalmente', 'Comunidad exclusiva']),
      incluye: JSON.stringify(['10 horas de video bajo demanda', '5 recursos descargables', 'Acceso en dispositivos móviles y TV', 'Certificado de finalización']),
      metodologia: JSON.stringify(['Clases teóricas y prácticas', 'Proyectos reales', 'Evaluaciones por módulo']),
      objetivos: JSON.stringify(['Dominar completamente la materia', 'Aplicar lo aprendido en un entorno laboral real']),
      fecha_inicio: new Date(),
      fecha_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      vigencia_meses: 12,
      brochure: '/docs/brochure.pdf',
      documento_adicional: '/docs/extra.pdf',
      documento_adicional_titulo: 'Material Complementario',
      orden: 1,
      modulos: {
        create: [
          {
            titulo: 'Módulo 1: Introducción',
            orden: 1,
            lecciones: {
              create: [
                {
                  titulo: 'Lección 1.1: ¿Qué aprenderemos?',
                  contenido: 'Visión general',
                  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  duracion: 15,
                  orden: 1
                },
                {
                  titulo: 'Lección 1.2: Configuración del entorno',
                  contenido: 'Aquí configuramos todo lo necesario...',
                  duracion: 30,
                  orden: 2
                }
              ]
            }
          }
        ]
      }
    },
    include: {
      modulos: {
        include: {
          lecciones: true
        }
      }
    }
  });

  console.log('Curso creado exitosamente. ID:', curso.id, 'Título:', curso.titulo);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
