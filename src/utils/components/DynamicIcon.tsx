import React from 'react'

import * as LucideIcons from 'lucide-react'

export interface DynamicIconProps {
  name?: string
  className?: string
  size?: number | string
  color?: string
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  if (!name) return null

  // Capitalizamos y quitamos espacios/guiones para que "map-pin", "map_pin", "Map pin" 
  // coincidan con "MapPin" (PascalCase utilizado por lucide-react)
  const formattedName = name
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  const IconComponent = (LucideIcons as any)[formattedName]

  if (!IconComponent) {
    // Retornamos un icono de check por defecto o nada si preferimos
    const Fallback = LucideIcons.CheckCircle

    
return <Fallback {...props} />
  }

  return <IconComponent {...props} />
}
