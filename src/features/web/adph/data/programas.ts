export interface ProgramaMock {
  id: number
  title: string
  category: string
  duration: string
  image: string
}

export const PROGRAMAS: ProgramaMock[] = [
  { id: 1, title: 'Diplomado en Gestión del Clima y Cultura', category: 'Psicología Organizacional', duration: '6 meses', image: '/images/cursos/evaluacion-y-gestion-del-clima-laboral.png' },
  { id: 2, title: 'Especialización en People Analytics', category: 'Capital Humano', duration: '4 meses', image: '/images/especializaciones/curso-especializado-diseno-de-tableros-de-mando-para-la-gestion-de-recursos-humanos.png' },
  { id: 3, title: 'Curso de Liderazgo Ágil y Scrum', category: 'Capital Humano', duration: '2 meses', image: '/images/cursos/creacion-de-equipos-de-alto-rendimiento-con-scrum.jpg' },
  { id: 4, title: 'Programa en Prevención de Riesgos', category: 'Psicología Ocupacional y Seguridad y Salud en el Trabajo', duration: '5 meses', image: '/images/especializaciones/especializacion-en-psicologia-ocupacional.png' },
  { id: 5, title: 'Taller de Team Building Dinámico', category: 'Aprendizaje Experiencial e Innovación Metodológica', duration: '2 semanas', image: '/images/talleres/taller-investigacion-del-clima-laboral-con-bloques-de-lego.jpeg' },
  { id: 6, title: 'Gestión de Recursos Humanos Básico', category: 'Capital Humano', duration: '1 mes', image: '/images/cursos/planes-de-desarrollo-y-capacitacion-del-talento-humano.jpg' }
]
