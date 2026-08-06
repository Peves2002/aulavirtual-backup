'use client'

import { useEffect, useState } from 'react'

import { Facebook, Linkedin, Twitter } from 'lucide-react'

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) return null

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
      <span className="text-sm font-bold text-gray-600">Compartir:</span>
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 text-[#08479b] flex items-center justify-center hover:bg-[#08479b] hover:text-white transition-colors"
      >
        <Facebook className="w-4 h-4" />
      </a>
    </div>
  )
}
