export interface Escuela {
  id: string
  name: string
  desc: string
  image: string
  heroBg: string
}

export const ESCUELAS: Escuela[] = [
  {
    id: 'psicologia-organizacional',
    name: 'Escuela de Psicología Organizacional',
    desc: 'Formación de vanguardia para potenciar el talento y el comportamiento humano en el trabajo.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    heroBg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80'
  },
  {
    id: 'liderazgo-capital-humano',
    name: 'Escuela de Liderazgo y Capital Humano',
    desc: 'Desarrolla habilidades directivas y estratégicas para liderar equipos de alto rendimiento.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    heroBg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80'
  },
  {
    id: 'psicologia-ocupacional-sst',
    name: 'Escuela de Psicología Ocupacional y Seguridad y Salud en el Trabajo',
    desc: 'Especialización enfocada en el bienestar laboral y prevención de riesgos psicosociales.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    heroBg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80'
  },
  {
    id: 'aprendizaje-experiencial',
    name: 'Centro de Aprendizaje Experiencial',
    desc: 'Metodologías vivenciales e interactivas para una formación corporativa práctica y memorable.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    heroBg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80'
  }
]

export const getEscuela = (id: string) => ESCUELAS.find(e => e.id === id) ?? ESCUELAS[1]
