import React from 'react'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import prisma from '@/utils/libs/prisma'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } })

  if (!blog || blog.estado !== 'PUBLICADO') return { title: 'No encontrado' }

return {
    title: `${blog.titulo} | MS&M CONSULTING`,
    description: blog.extracto || blog.titulo,
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      categoria: true,
    }
  })

  if (!blog || blog.estado !== 'PUBLICADO') {
    notFound()
  }

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      {/* Header del Blog */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 md:px-8 lg:px-10 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl font-bold text-black truncate max-w-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {blog.titulo}
        </h1>
        <div className="text-sm font-medium text-gray-500 mt-2 sm:mt-0 flex-shrink-0">
          <Link href="/" className="hover:text-[var(--web-primary)]">Inicio</Link> &gt;{' '}
          <Link href="/blogs" className="hover:text-[var(--web-primary)]">Blog</Link> &gt;{' '}
          <span className="text-black hidden sm:inline">Artículo</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {blog.miniatura && (
            <div className="w-full h-64 sm:h-96 relative">
              <Image
                src={blog.miniatura}
                alt={blog.titulo}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {blog.titulo}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
              <span className="font-semibold text-[#FFB600]">
                {blog.autor}
              </span>
              <span>•</span>
              <span>{new Date(blog.fecha_publicacion || blog.creado_en).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              {blog.categoria && (
                <>
                  <span>•</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{blog.categoria.nombre}</span>
                </>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-black prose-a:text-[#FFB600]"
              dangerouslySetInnerHTML={{ __html: blog.contenido }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
