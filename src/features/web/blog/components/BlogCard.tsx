import Link from 'next/link'

interface BlogCardProps {
  image?: string
  title: string
  date: string
  excerpt: string
  slug: string
}

export default function BlogCard({ image, title, date, excerpt, slug }: BlogCardProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-100 overflow-hidden break-inside-avoid mb-6 shadow-sm hover:shadow-md transition-shadow">
      {image && (
        <div className="w-full">
          <img 
            src={image} 
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[17px] font-medium text-gray-800 leading-snug mb-3">
          {title}
        </h3>
        
        <p className="text-[11px] font-bold text-gray-800 mb-4 tracking-wide uppercase">
          Noticias EGEC PERÚ / {date}
        </p>
        
        <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={`/blog/${slug}`}
            className="text-[13px] text-gray-900 font-medium hover:text-[#e60000] transition-colors"
          >
            Leer más »
          </Link>
        </div>
      </div>
    </div>
  )
}
