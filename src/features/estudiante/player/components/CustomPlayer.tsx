'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'

import ReactPlayer from 'react-player'

import { motion } from 'framer-motion'
import screenfull from 'screenfull'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw
} from 'lucide-react'

import '../styles/video-player.css'

const getYouTubeId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)

  return (match && match[7].length === 11) ? match[7] : ''
}

interface CustomPlayerProps {
  url: string
  initialProgress?: number
  onProgressUpdate?: (seconds: number) => void
  onEnded?: () => void
}

const CustomPlayer: React.FC<CustomPlayerProps> = ({
  url,
  initialProgress = 0,
  onProgressUpdate,
  onEnded
}) => {
  // Client-side mounting check
  const [isMounted, setIsMounted] = useState(false)

  // States
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Thumbnails y Plataforma
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
  const isVimeo = url.includes('vimeo.com')

  // Refs
  const playerRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Normalizar la URL para que ReactPlayer la reconozca siempre como YouTube
  const getNormalizedUrl = (rawUrl: string) => {
    if (!rawUrl) return ''

    let normalized = rawUrl.trim()

    // Si empieza con // añadir protocolo
    if (normalized.startsWith('//')) {
      normalized = `https:${normalized}`
    }

    // Convertir embed a watch si es necesario para asegurar reconocimiento del motor de YT
    if (normalized.includes('youtube.com/embed/')) {
      const videoId = normalized.split('/embed/')[1]?.split('?')[0]

      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`
      }
    }

    return normalized
  }

  const normalizedUrl = useMemo(() => getNormalizedUrl(url), [url])

  // Obtener miniatura dinámicamente según la plataforma
  useEffect(() => {
    if (!normalizedUrl) return

    if (isYouTube) {
      setThumbnailUrl(`https://img.youtube.com/vi/${getYouTubeId(normalizedUrl)}/maxresdefault.jpg`)
    } else if (isVimeo) {
      // Usar la oEmbed API de Vimeo para obtener la miniatura en alta resolución
      fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(normalizedUrl)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.thumbnail_url) {
            // Vimeo devuelve URLs de baja resolución a veces, forzamos un ancho mayor (ej. 1280)
            const highResThumb = data.thumbnail_url.replace(/_[0-9x]+\./, '_1280x720.')

            setThumbnailUrl(highResThumb)
          }
        })
        .catch(err => console.error('Error fetching Vimeo thumbnail:', err))
    }
  }, [normalizedUrl, isYouTube, isVimeo])

  // Initial Seek
  useEffect(() => {
    if (isReady && initialProgress > 0) {
      const timer = setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.currentTime = initialProgress
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isReady, initialProgress])

  // Handlers
  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true)
      setPlaying(true)
    } else {
      setPlaying(!playing)
    }
  }

  const handleOnPlay = () => {
    setPlaying(true)
  }

  const handleOnPause = () => {
    setPlaying(false)
  }

  const handleToggleMute = () => setMuted(!muted)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)

    setVolume(val)
    if (val > 0) setMuted(false)
  }

  const handleToggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current)
    }
  }

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handler = () => setIsFullscreen(screenfull.isFullscreen)

      screenfull.on('change', handler)

      return () => screenfull.off('change', handler)
    }
  }, [])

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (isDragging) return
    const { currentTime, duration: videoDuration } = e.currentTarget

    setPlayedSeconds(currentTime)

    if (videoDuration > 0) {
      setPlayed(currentTime / videoDuration)
    }

    if (Math.abs(currentTime - lastSavedTime) >= 10) {
      onProgressUpdate?.(Math.floor(currentTime))
      setLastSavedTime(currentTime)
    }
  }

  const handleProgressMouseDown = () => {
    setIsDragging(true)
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const newPlayed = x / rect.width

    setPlayed(newPlayed)
    setPlayedSeconds(newPlayed * duration)
  }

  const handleProgressMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const newPlayed = x / rect.width

    if (playerRef.current) {
      playerRef.current.currentTime = newPlayed * duration
    }

    setIsDragging(false)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const newPlayed = x / rect.width

    if (playerRef.current) {
      playerRef.current.currentTime = newPlayed * duration
    }
  }

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')


    return hh ? `${hh}:${mm.toString().padStart(2, '0')}:${ss}` : `${mm}:${ss}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing && !showSpeedMenu) setShowControls(false)
    }, 3000)
  }

  const handleSkip = (seconds: number) => {
    if (playerRef.current) {
      const current = playerRef.current.currentTime

      playerRef.current.currentTime = current + seconds
    }
  }

  if (!isMounted) return null

  return (
    <div
      ref={containerRef}
      className={`custom-video-player-container ${isFullscreen ? 'fullscreen' : ''}`}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        height: 'auto',
        maxHeight: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#000',
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div
        className="player-wrapper"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',

          // Aplicamos zoom agresivo SOLO a YouTube para tapar la UI incrustada que no logramos sacar con parámetros.
          // Vimeo, por su parte, obedece a los bool "title=false, controls=false" por lo que no hace falta hacerle zoom.
          transform: isYouTube ? 'scale(1.35) translateY(-8%)' : 'none',
          transformOrigin: 'top center'
        }}
      >
        <ReactPlayer
          ref={playerRef}
          src={normalizedUrl}
          playing={playing}
          volume={volume}
          muted={!hasStarted || muted}
          playbackRate={playbackRate}
          width="100%"
          height="100%"
          onPlay={handleOnPlay}
          onPause={handleOnPause}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => onEnded?.()}
          onCanPlay={() => setIsReady(true)}
          controls={false}
          playsInline={true}
          config={{
            youtube: {
              // @ts-expect-error modestbranding fue obsoleto en la API pero aún se usa a veces
              modestbranding: 1,
              rel: 0,
              iv_load_policy: 3,
              cc_load_policy: 0,
              disablekb: 1,
              origin: typeof window !== 'undefined' ? window.location.origin : ''
            },
            vimeo: {
              title: false,
              byline: false,
              portrait: false,
              controls: false,
              dnt: true
            }
          }}
        />
      </div>

      {/* CUSTOM PLAY OVERLAY (Initial Thumbnail or Paused State) */}
      {!playing && (
        <div
          className="custom-thumbnail-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 70,
            cursor: 'pointer',
            background: !hasStarted 
              ? (thumbnailUrl ? `url(${thumbnailUrl}) center/cover no-repeat` : '#111') 
              : 'rgba(0, 0, 0, 0.4)', // Oscurecer el video al pausar
            backgroundColor: !hasStarted ? '#000' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handlePlayPause}
        >
          <motion.div
            style={{
              zIndex: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 shadow-2xl flex items-center justify-center">
              <Play size={48} fill="white" stroke="none" />
            </div>
          </motion.div>
        </div>
      )}

      {playing && (
        <div
          className="video-click-layer"
          onClick={handlePlayPause}
          onDoubleClick={handleToggleFullscreen}
        />
      )}

      <div className={`player-controls-wrapper ${showControls || isDragging ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="progress-container"
          onMouseDown={handleProgressMouseDown}
          onMouseMove={isDragging ? handleProgressChange : undefined}
          onMouseUp={handleProgressMouseUp}
          onClick={handleProgressClick}
        >
          <div
            className="progress-filled"
            style={{ width: `${played * 100}%` }}
          >
            <div className="progress-handle" />
          </div>
        </div>

        <div className="controls-bar">
          <div className="controls-left">
            <button className="control-button" onClick={handlePlayPause}>
              {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            <button className="control-button" onClick={() => handleSkip(-10)}>
              <RotateCcw size={18} />
            </button>

            <button className="control-button" onClick={() => handleSkip(10)}>
              <RotateCw size={18} />
            </button>

            <div className="volume-wrapper">
              <button className="control-button" onClick={handleToggleMute}>
                {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                style={{ pointerEvents: 'auto' }}
              />
            </div>

            <div className="time-display">
              {formatTime(playedSeconds)} / {formatTime(duration)}
            </div>
          </div>

          <div className="controls-right">
            <div className="relative">
              <button
                className={`control-button ${showSpeedMenu ? 'bg-white/20' : ''}`}
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              >
                <span className="text-[11px] font-bold">{playbackRate}x</span>
              </button>

              {showSpeedMenu && (
                <div className="playback-speed-popover !display-block">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <div
                      key={rate}
                      className={`speed-option ${playbackRate === rate ? 'speed-active' : ''}`}
                      onClick={() => {
                        setPlaybackRate(rate)
                        setShowSpeedMenu(false)
                      }}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="control-button" onClick={handleToggleFullscreen}>
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomPlayer
