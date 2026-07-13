'use client'

import { useEffect } from 'react'

import {
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Swal from 'sweetalert2'

import AppModal from '@/utils/components/AppModal'
import CustomTextField from '@core/components/mui/TextField'

import { getYouTubeVideoId } from '../utils/video'

import type { Video, CreateVideoDto } from '../entity/Video'
import { useCreateVideo, useUpdateVideo } from '../hooks/useVideos'

interface Props {
  open: boolean
  handleClose: () => void
  video?: Video | null
}

export const VideoFormModal = ({ open, handleClose, video }: Props) => {
  const createVideo = useCreateVideo()
  const updateVideo = useUpdateVideo()

  const { control, handleSubmit, reset, watch } = useForm<CreateVideoDto>({
    defaultValues: {
      url: '',
      titulo: '',
    },
  })

  const urlValue = watch('url')
  const videoId = getYouTubeVideoId(urlValue)

  useEffect(() => {
    if (video) {
      reset({
        url: video.url,
        titulo: video.titulo ?? '',
      })
    } else {
      reset({
        url: '',
        titulo: '',
      })
    }
  }, [video, open, reset])

  const onSubmit = async (values: CreateVideoDto) => {
    try {
      if (video) {
        await updateVideo.mutateAsync({ id: video.id, payload: values })
      } else {
        await createVideo.mutateAsync(values)
      }

      Swal.fire({
        title: video ? 'Video actualizado' : 'Video guardado',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      })
      handleClose()
    } catch (err: any) {
      Swal.fire({
        title: 'Error',
        text: err?.message || 'No se pudo guardar el video',
        icon: 'error',
      })
    }
  }

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/

  return (
    <AppModal open={open} handleClose={handleClose}>
      <Typography variant='h5' fontWeight={700} sx={{ mb: 4 }}>
        {video ? 'Editar Video de YouTube' : 'Nuevo Video de YouTube'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller
              name='url'
              control={control}
              rules={{
                required: 'La URL es requerida',
                pattern: {
                  value: youtubeRegex,
                  message: 'Debe ser una URL de YouTube válida',
                },
              }}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Enlace de YouTube'
                  placeholder='https://www.youtube.com/watch?v=...'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='titulo'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Título del Video (Opcional)'
                  placeholder='Ej. Introducción al curso'
                />
              )}
            />
          </Grid>

          {/* Video Preview */}
          {videoId && (
            <Grid item xs={12}>
              <Typography variant='caption' color='text.secondary' display='block' sx={{ mb: 1 }}>
                Vista previa del video:
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                  borderRadius: 1,
                  overflow: 'hidden',
                  bgcolor: 'black',
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </AppModal>
  )
}
