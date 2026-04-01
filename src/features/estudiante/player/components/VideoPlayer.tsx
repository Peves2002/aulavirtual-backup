import { Box, Paper } from '@mui/material'

import CustomPlayer from './CustomPlayer'

interface VideoPlayerProps {
  url?: string
  tipo?: 'VIDEO' | 'INCRUSTADO'
  initialProgress?: number
  onProgressUpdate?: (seconds: number) => void
  onEnded?: () => void
}

const VideoPlayer = ({
  url,
  tipo = 'VIDEO',
  onEnded,
  initialProgress = 0,
  onProgressUpdate
}: VideoPlayerProps) => {
  if (!url) {
    return (
      <Paper
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          bgcolor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: { xs: 0, md: '12px' },
          overflow: 'hidden'
        }}
      >
        <Box sx={{ color: 'white', textAlign: 'center' }}>
          <i className="tabler-video-off" style={{ fontSize: '3rem', opacity: 0.5 }} />
          <Box sx={{ mt: 1, opacity: 0.7 }}>No hay video disponible para esta lección</Box>
        </Box>
      </Paper>
    )
  }

  // Si es YouTube o Vimeo incrustado
  const isEmbedded = url.includes('youtube.com') || url.includes('vimeo.com') || tipo === 'INCRUSTADO'

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16/9',
        bgcolor: 'black',
        borderRadius: { xs: 0, md: '12px' },
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}
    >
      {isEmbedded ? (
        <CustomPlayer
          url={url}
          initialProgress={initialProgress}
          onProgressUpdate={onProgressUpdate}
          onEnded={onEnded}
        />
      ) : (
        <video
          controls
          onEnded={onEnded}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        >
          <source src={url} />
          Tu navegador no soporta el elemento de video.
        </video>
      )}
    </Box>
  )
}

export default VideoPlayer

