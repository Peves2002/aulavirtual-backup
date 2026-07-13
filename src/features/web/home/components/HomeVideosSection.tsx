'use client'

import Link from 'next/link'

import { Grid, Typography, Box } from '@mui/material'
import { ArrowRight } from 'lucide-react'

import { getYouTubeVideoId } from '@/features/admin/videos/utils/video'

interface Video {
  id: string
  url: string
  titulo?: string | null
}

interface Props {
  videos: Video[]
}

export default function HomeVideosSection({ videos }: Props) {
  if (!videos.length) return null

  // latest video
  const latestVideo = videos[0]
  const latestVideoId = latestVideo ? getYouTubeVideoId(latestVideo.url) : null

  // secondary videos
  const secondaryVideos = videos.slice(1, 3)

  return (
    <section className="py-24" style={{ backgroundColor: '#ffffff', borderTop: '1px solid hsl(214, 20%, 92%)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-3"
              style={{
                backgroundColor: 'rgba(37, 146, 127, 0.1)',
                border: '1px solid rgba(37, 146, 127, 0.25)',
                color: 'var(--web-primary, #25927F)',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Canal oficial
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Aprende con nuestros videos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contenido ejecutivo gratuito directo de nuestro fundador.
            </p>
          </div>
        </div>

        {/* Grid: video principal + 2 secundarios */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video principal */}
          {latestVideo && latestVideoId && (
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${latestVideoId}`}
                title={latestVideo.titulo || 'Video principal'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          )}

          {/* Videos secundarios */}
          <div className="flex flex-col gap-6">
            {secondaryVideos.map((video) => {
              const id = getYouTubeVideoId(video.url)

              return id ? (
                <div key={video.id} className="rounded-2xl overflow-hidden shadow-xl flex-1 bg-black" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={video.titulo || 'Video secundario'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : null
            })}
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/videos"
            className="no-underline inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: 'var(--web-primary, #25927F)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 146, 127, 0.2)',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
            }}
          >
            Ver más <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
