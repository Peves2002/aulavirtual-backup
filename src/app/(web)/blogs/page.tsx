import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import prisma from '@/utils/libs/prisma'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | MS&M CONSULTING',
  description: 'Mantente al día con las últimas noticias y artículos.',
}

export default async function BlogsPage() {
  // Obtener los blogs publicados desde la DB
  const blogs = await prisma.blog.findMany({
    where: { estado: 'PUBLICADO' },
    orderBy: { creado_en: 'desc' },
    include: {
      categoria: true
    }
  })

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      {/* Header del Blog */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 md:px-8 lg:px-10 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Blog</h1>
        <div className="text-sm font-medium text-gray-500 mt-2 sm:mt-0">
          <Link href="/" className="hover:text-[var(--web-primary)]">Inicio</Link> &gt; <span className="text-black">Blog</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8">

        {/* Columna Principal: Noticias */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#000000] mb-6 border-b-2 border-[#FFB600] inline-block pb-1">
            Noticias
          </h2>

          <div className="flex flex-col gap-6">
            {blogs.length === 0 ? (
              <p className="text-gray-500">Aún no hay artículos publicados.</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row rounded-md overflow-hidden">
                  <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-100 flex-shrink-0">
                    {blog.miniatura ? (
                      <Image
                        src={blog.miniatura}
                        alt={blog.titulo}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <Link href={`/blogs/${blog.slug}`}>
                        <h3 className="text-xl font-bold text-black mb-2 hover:text-[#FFB600] transition-colors line-clamp-2">
                          {blog.titulo}
                        </h3>
                      </Link>
                      <p className="text-[#4D4D4D] text-sm line-clamp-3 mb-4">
                        {blog.extracto || 'Haz clic para leer más sobre este artículo.'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Fecha de publicación: {new Date(blog.fecha_publicacion || blog.creado_en).toLocaleDateString('es-PE', { day: '2-digit', month: 'long' })}
                      </p>
                      <Link href={`/blogs/${blog.slug}`} className="text-[#FFB600] font-semibold text-sm hover:underline">
                        Leer más
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Te puede interesar */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-xl font-bold text-[#000000] mb-6 border-b-2 border-[#FFB600] inline-block pb-1">
            Te puede interesar
          </h2>
          <div className="flex flex-col gap-6">
            {/* Elemento estático 1 */}
            <div className="bg-white shadow-sm rounded-md overflow-hidden">
              <div className="h-40 bg-[#000000] relative flex items-center justify-center">
                <span className="text-[#FFB600] font-bold text-2xl">MS&M CONSULTING</span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-black mb-2">Centro de Formación Autorizado</h4>
                <Link href="/cursos" className="text-[#FFB600] text-sm font-semibold hover:underline">
                  Ver Cursos
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
