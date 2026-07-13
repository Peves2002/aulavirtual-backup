export const dynamic = 'force-dynamic'

import { Box, Typography } from '@mui/material'
import { Calendar } from 'lucide-react'

import prisma from '@/utils/libs/prisma'
import PageHero from '@/features/web/ace/PageHero'
import { getYouTubeVideoId } from '@/features/admin/videos/utils/video'

export const metadata = {
  title: 'Videos | Aula Virtual',
  description: 'Explora nuestra colección de videos, conferencias y lecciones en video.',
}

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: { creado_en: 'desc' },
  })

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <PageHero
        badge="VIDEOS"
        title="Catálogo de Videos"
        description="Aprende y capacítate visualmente con nuestras lecciones gratuitas, seminarios y tutoriales."
        image="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-border">
            <i className="tabler-video-off text-5xl text-muted-foreground mb-4 block" />
            <Typography variant="h6" fontWeight={600} className="text-foreground">
              No hay videos disponibles por el momento
            </Typography>
            <Typography variant="body2" className="text-muted-foreground mt-1">
              Pronto subiremos nuevo contenido multimedia. ¡Mantente atento!
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {videos.map((video) => {
              const videoId = getYouTubeVideoId(video.url)

              if (!videoId) return null

              return (
                <div
                  key={video.id}
                  className="flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Video Player */}
                  <div className="relative w-full pb-[56.25%] bg-black">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.titulo || 'Video de YouTube'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col flex-grow p-5 justify-between">
                    <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-2 leading-snug mb-3">
                      {video.titulo || 'Video de YouTube'}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      <span>
                        {new Date(video.creado_en).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Box>
  )
}
