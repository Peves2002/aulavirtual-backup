import { 
  Gavel, 
  Landmark, 
  Scale, 
  Briefcase, 
  FileCheck, 
  HeartHandshake, 
  Calculator, 
  ShieldCheck 
} from 'lucide-react'
import Link from 'next/link'

const areas = [
  { id: 1, title: 'Derecho Penal', icon: Gavel, href: '/cursos?categoria=derecho-penal' },
  { id: 2, title: 'Gestión Pública', icon: Landmark, href: '/cursos?categoria=gestion-publica' },
  { id: 3, title: 'Derecho Civil', icon: Scale, href: '/cursos?categoria=derecho-civil' },
  { id: 4, title: 'Derecho Laboral', icon: Briefcase, href: '/cursos?categoria=derecho-laboral' },
  { id: 5, title: 'Contrataciones del Estado', icon: FileCheck, href: '/cursos?categoria=contrataciones' },
  { id: 6, title: 'Derecho de Familia', icon: HeartHandshake, href: '/cursos?categoria=derecho-familia' },
  { id: 7, title: 'Derecho Tributario', icon: Calculator, href: '/cursos?categoria=derecho-tributario' },
  { id: 8, title: 'Derecho Constitucional', icon: ShieldCheck, href: '/cursos?categoria=derecho-constitucional' },
]

export default function SpecializationAreas() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Áreas de Especialización
        </h2>
        <div className="w-16 h-1 bg-[#e60000] mx-auto mb-4" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encuentra el programa ideal para ti. Ofrecemos una amplia variedad de especializaciones para potenciar tu carrera.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {areas.map((area) => {
          const Icon = area.icon
          return (
            <Link 
              key={area.id} 
              href={area.href}
              className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-red-100 transition-all group"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#e60000] transition-colors">
                <Icon className="w-8 h-8 text-[#e60000] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-[#e60000] transition-colors">
                {area.title}
              </h3>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
