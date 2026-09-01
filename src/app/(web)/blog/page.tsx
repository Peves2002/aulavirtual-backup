import { Metadata } from 'next'
import BlogLayout from '@/features/web/blog/components/BlogLayout'

export const metadata: Metadata = {
  title: 'Noticias EGEC PERÚ | Blog',
  description: 'Entérate de las últimas noticias, artículos y novedades de EGEC PERÚ.',
}

export default function BlogPage() {
  return <BlogLayout />
}
