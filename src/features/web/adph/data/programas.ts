export interface ProgramaMock {
  id: number
  title: string
  category: string
  duration: string
  image: string
}

export const PROGRAMAS: ProgramaMock[] = [
  { id: 1, title: 'Diplomado en Gestión del Clima y Cultura', category: 'Escuela de Psicología Organizacional', duration: '6 meses', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80' },
  { id: 2, title: 'Especialización en People Analytics', category: 'Escuela de Liderazgo y Capital Humano', duration: '4 meses', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
  { id: 3, title: 'Curso de Liderazgo Ágil y Scrum', category: 'Escuela de Liderazgo y Capital Humano', duration: '2 meses', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' },
  { id: 4, title: 'Programa en Prevención de Riesgos', category: 'Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo', duration: '5 meses', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80' },
  { id: 5, title: 'Taller de Team Building Dinámico', category: 'Centro de Aprendizaje Experiencial', duration: '2 semanas', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=400&q=80' },
  { id: 6, title: 'Gestión de Recursos Humanos Básico', category: 'Escuela de Liderazgo y Capital Humano', duration: '1 mes', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' }
]
