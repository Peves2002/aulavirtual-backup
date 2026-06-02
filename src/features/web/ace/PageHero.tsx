import Image from 'next/image'

interface PageHeroProps {
  badge: string
  title: string
  description: string
  image: string
}

export default function PageHero({ badge, title, description, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border" style={{ height: '320px' }}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)' }}
      />
      <div className="relative h-full flex items-end pb-10" style={{ zIndex: 10 }}>
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-widest rounded-full mb-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }}
          >
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
