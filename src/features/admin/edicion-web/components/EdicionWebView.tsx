'use client'

import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Grid,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Chip,
  CardHeader
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { getSession } from 'next-auth/react'

import { AxiosConfiguracion } from '../../configuracion/http/axiosConfiguracion'
import type { Configuracion } from '../../configuracion/entity/Configuracion'
import MediaLibrary from '../../cursos/components/MediaLibrary'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'
import { CONSULTORIA_SERVICIOS, HRCOREX_SERVICIOS } from '@/features/web/adph/data/services'
import TestimoniosSettings from '../../configuracion/components/TestimoniosSettings'

import RichTextEditor from '@/utils/components/RichTextEditor'

// ─── Helpers ───────────────────────────────────────────────────────────────────

const toYouTubeEmbed = (url: string): string => {
  if (!url) return ''
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    return url
  } catch {
    return url
  }
}

// ─── Collapsible Section Card ──────────────────────────────────────────────────

interface WebSectionCardProps {
  icon: string
  title: string
  subtitle: string
  url?: string
  children: React.ReactNode
}

function WebSectionCard({ icon, title, subtitle, url, children }: WebSectionCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Paper
      variant='outlined'
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1.5px solid',
        borderColor: open ? 'primary.main' : 'divider',
        transition: 'border-color 0.2s',
        mb: 2
      }}
    >
      <Box
        onClick={() => setOpen(o => !o)}
        sx={{
          display: 'flex', alignItems: 'center', gap: 2,
          px: 3, py: 2, cursor: 'pointer',
          bgcolor: open ? 'action.selected' : 'background.paper',
          '&:hover': { bgcolor: 'action.hover' },
          transition: 'background-color 0.15s',
        }}
      >
        <Box
          sx={{
            width: 40, height: 40, borderRadius: 2, flexShrink: 0,
            bgcolor: open ? 'primary.main' : 'action.hover',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
        >
          <i className={icon} style={{ fontSize: 20, color: open ? '#fff' : 'var(--mui-palette-text-secondary)' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant='subtitle1' fontWeight={700} sx={{ lineHeight: 1.2 }}>
            {title.replace(/<[^>]*>?/gm, '')}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {subtitle.replace(/<[^>]*>?/gm, '')}
          </Typography>
        </Box>
        <Stack direction='row' spacing={1} alignItems='center' sx={{ flexShrink: 0 }}>
          {url && (
            <Chip
              label={url}
              size='small'
              variant='outlined'
              component='a'
              href={url}
              target='_blank'
              clickable
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              icon={<i className='tabler-external-link' style={{ fontSize: 13 }} />}
              sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
            />
          )}
          <i
            className={open ? 'tabler-chevron-up' : 'tabler-chevron-down'}
            style={{ fontSize: 20, color: 'var(--mui-palette-text-secondary)' }}
          />
        </Stack>
      </Box>
      {open && (
        <Box sx={{ px: 3, py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          {children}
        </Box>
      )}
    </Paper>
  )
}

// ─── Tab Panel ─────────────────────────────────────────────────────────────────

function CustomTabPanel({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

interface EdicionWebViewProps {
  initialData?: Configuracion[]
}

export function EdicionWebView({ initialData }: EdicionWebViewProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(0)
  const [saving, setSaving] = useState(false)
  const [mediaSelectTarget, setMediaSelectTarget] = useState<{ key: string } | null>(null)
  const [openLogoMedia, setOpenLogoMedia] = useState(false)
  const [pendingLogoLabel, setPendingLogoLabel] = useState('')

  // ── Inicializar config desde BD ──────────────────────────────────────────────
  const initialMapped = (initialData || []).reduce((acc: { [key: string]: string }, curr: Configuracion) => {
    acc[curr.clave] = curr.valor
    return acc
  }, {})

  const [config, setConfig] = useState<{ [key: string]: string }>({
    // Home — Hero
    HOME_HERO_TITLE: '',
    HOME_HERO_DESCRIPTION: '',
    // Home — Secciones
    HOME_ESCUELAS_TITLE: 'Escuelas Especializadas',
    HOME_PROGRAMAS_TITLE: 'Programas en convocatoria',
    HOME_NOSOTROS_TITLE: 'Expertos en formación ejecutiva',
    HOME_NOSOTROS_DESC: '',
    HOME_NOSOTROS_VIDEO_URL: 'https://www.youtube.com/embed/ZUZif1Ll9u4',
    HOME_CORP_TITLE: 'Soluciones Corporativas',
    HOME_CORP_DESC: '',
    HOME_LOGOS: '[]',
    // Nosotros
    NOSOTROS_HERO_TITLE: 'Somos calidad y responsabilidad a tu servicio',
    NOSOTROS_HERO_DESC: '',
    NOSOTROS_STAT_1_VALUE: '+1,200',
    NOSOTROS_STAT_1_LABEL: 'Estudiantes formados',
    NOSOTROS_STAT_2_VALUE: '+80',
    NOSOTROS_STAT_2_LABEL: 'Cursos disponibles',
    NOSOTROS_STAT_3_VALUE: '+30',
    NOSOTROS_STAT_3_LABEL: 'Docentes expertos',
    NOSOTROS_STAT_4_VALUE: '98%',
    NOSOTROS_STAT_4_LABEL: 'Tasa de satisfacción',
    // Contacto
    CONTACTO_HERO_TITLE: 'Ponte en Contacto',
    CONTACTO_HERO_DESC: '',
    CONTACTO_HERO_EYEBROW: 'Estamos aquí para ayudarte',
    CONTACTO_UBICACION: 'Arequipa, Perú',
    CONTACTO_EMAIL: '',
    // Empresas
    EMPRESAS_HERO_TITLE: 'Lleva a tu equipo al siguiente nivel',
    EMPRESAS_HERO_DESC: '',
    // Consultoría
    CONSULTORIA_HERO_TITLE: 'Consultoría Estratégica en RRHH',
    CONSULTORIA_HERO_DESC: '',
    CONSULTORIA_SEC2_TITLE: 'Soluciones Corporativas a Medida',
    CONSULTORIA_SEC2_DESC: '',
    CONSULTORIA_SEC3_TITLE: 'Tecnología Inteligente para RRHH',
    CONSULTORIA_SEC3_DESC: '',
    // Nosotros — Misión / Visión
    NOSOTROS_MISION_TITLE: 'Nuestra Misión',
    NOSOTROS_MISION_TEXT: '',
    NOSOTROS_VISION_TITLE: 'Nuestra Visión',
    NOSOTROS_VISION_TEXT: '',
    NOSOTROS_VALORES: '[]',
    // Blogs y Noticias
    WEB_BLOGS: '[]',
    WEB_NOTICIAS: '[]',
    WEB_TESTIMONIOS: '[]',
    ...initialMapped
  })

  const handleInputChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  // Logos array helper
  const logosArray: { label: string; url: string }[] = (() => {
    try { return JSON.parse(config.HOME_LOGOS) } catch { return [] }
  })()

  const handleRemoveLogo = (index: number) => {
    const updated = logosArray.filter((_, i) => i !== index)
    handleInputChange('HOME_LOGOS', JSON.stringify(updated))
  }

  // ── Guardar ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = Object.entries(config).map(([clave, valor]) => {
        const item = initialData?.find(d => d.clave === clave)
        return { clave, valor, descripcion: item?.descripcion || '' }
      })
      const getAuthToken = async () => {
        const s = await getSession()
        return s?.user?.accessToken ?? null
      }
      const axiosConfig = new AxiosConfiguracion({ getAuthToken })
      await axiosConfig.save(payload)
      enqueueSnackbar('Contenido web actualizado correctamente.', { variant: 'success' })
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Error al guardar los cambios', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // ── Tabs de Contenido ────────────────────────────────────────────────────────
  const tabs = [
    {
      label: 'Inicio',
      icon: 'tabler-home',
      content: (
        <Stack spacing={2}>
          <WebSectionCard icon='tabler-home' title='Hero — Banner Principal' subtitle='Título y subtítulo del banner superior de la página de inicio' url='/'>
            <Stack spacing={3}>
              <RichTextEditor
                label='Título del Hero'
                placeholder='Aprende sin límites, crece sin fronteras'
                value={config.HOME_HERO_TITLE}
                onChange={(value) => handleInputChange('HOME_HERO_TITLE', value)}
                minHeight={60}
                simple
              />
              <RichTextEditor
                label='Descripción del Hero'
                placeholder='Accede a cursos especializados...'
                value={config.HOME_HERO_DESCRIPTION}
                onChange={(value) => handleInputChange('HOME_HERO_DESCRIPTION', value)}
              />
            </Stack>
          </WebSectionCard>

          <WebSectionCard icon='tabler-layout-list' title='Títulos de Secciones' subtitle='Encabezados que separan cada bloque de contenido de la home' url='/'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RichTextEditor
                  label='Título bloque Escuelas'
                  value={config.HOME_ESCUELAS_TITLE}
                  onChange={(value) => handleInputChange('HOME_ESCUELAS_TITLE', value)}
                  placeholder='Escuelas Especializadas'
                  minHeight={60}
                  simple
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RichTextEditor
                  label='Título bloque Programas'
                  value={config.HOME_PROGRAMAS_TITLE}
                  onChange={(value) => handleInputChange('HOME_PROGRAMAS_TITLE', value)}
                  placeholder='Programas en convocatoria'
                  minHeight={60}
                  simple
                />
              </Grid>
            </Grid>
          </WebSectionCard>

          <WebSectionCard icon='tabler-users' title='Sección Sobre Nosotros (Inicio)' subtitle='Bloque de presentación con video de YouTube que aparece a mitad de la home' url='/'>
            <Stack spacing={3}>
              <RichTextEditor
                label='Título'
                value={config.HOME_NOSOTROS_TITLE}
                onChange={(value) => handleInputChange('HOME_NOSOTROS_TITLE', value)}
                placeholder='Expertos en formación ejecutiva'
                minHeight={60}
                simple
              />
              <RichTextEditor
                label='Descripción'
                value={config.HOME_NOSOTROS_DESC}
                onChange={(value) => handleInputChange('HOME_NOSOTROS_DESC', value)}
              />
              <Box>
                <Typography variant='body2' fontWeight={500} sx={{ mb: 1 }}>
                  <i className='tabler-brand-youtube' style={{ fontSize: 16, color: '#FF0000', marginRight: 6, verticalAlign: 'middle' }} />
                  Video de Presentación (YouTube)
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='flex-start'>
                  <TextField
                    fullWidth size='small'
                    label='URL del Video'
                    value={config.HOME_NOSOTROS_VIDEO_URL}
                    onChange={(e) => handleInputChange('HOME_NOSOTROS_VIDEO_URL', toYouTubeEmbed(e.target.value))}
                    placeholder='https://www.youtube.com/watch?v=...'
                    helperText='Pega la URL normal de YouTube — se convierte a embed automáticamente'
                  />
                  {config.HOME_NOSOTROS_VIDEO_URL && (
                    <Box sx={{ width: 160, height: 90, flexShrink: 0, borderRadius: 1.5, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: '#000' }}>
                      <iframe src={config.HOME_NOSOTROS_VIDEO_URL} style={{ width: '100%', height: '100%', border: 'none' }} allow='accelerometer; autoplay; encrypted-media' title='Preview' />
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
          </WebSectionCard>

          <WebSectionCard icon='tabler-building' title='Sección Corporativa (Inicio)' subtitle='Banner oscuro con llamada a la acción hacia soluciones para empresas' url='/'>
            <Stack spacing={3}>
              <RichTextEditor
                label='Título'
                value={config.HOME_CORP_TITLE}
                onChange={(value) => handleInputChange('HOME_CORP_TITLE', value)}
                placeholder='Soluciones Corporativas'
                minHeight={60}
                simple
              />
              <RichTextEditor
                label='Descripción'
                value={config.HOME_CORP_DESC}
                onChange={(value) => handleInputChange('HOME_CORP_DESC', value)}
              />
            </Stack>
          </WebSectionCard>

          <WebSectionCard icon='tabler-building-community' title='Logos de Empresas Clientes' subtitle='Carrusel de logos que aparece en la home — recomendado fondo transparente (PNG)'>
            {logosArray.length > 0 && (
              <Stack spacing={1} sx={{ mb: 3 }}>
                {logosArray.map((logo, i) => (
                  <Paper key={i} variant='outlined' sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 64, height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.url} alt={logo.label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </Box>
                    <Typography variant='body2' sx={{ flex: 1 }}>{logo.label}</Typography>
                    <Button size='small' color='error' variant='text' onClick={() => handleRemoveLogo(i)} startIcon={<i className='tabler-trash' style={{ fontSize: '1rem' }} />}>
                      Quitar
                    </Button>
                  </Paper>
                ))}
              </Stack>
            )}
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography variant='subtitle2' gutterBottom>Agregar Logo</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems='flex-start'>
                <TextField
                  size='small' label='Nombre del logo' placeholder='Ej: TechCorp'
                  value={pendingLogoLabel}
                  onChange={(e) => setPendingLogoLabel(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant='outlined' size='small'
                  startIcon={<i className='tabler-photo' />}
                  onClick={() => setOpenLogoMedia(true)}
                  disabled={!pendingLogoLabel.trim()}
                >
                  Subir Logo
                </Button>
              </Stack>
            </Paper>
            <MediaLibrary
              open={openLogoMedia}
              onClose={() => setOpenLogoMedia(false)}
              onSelect={(url) => {
                const nuevo = { label: pendingLogoLabel.trim() || 'Logo', url }
                handleInputChange('HOME_LOGOS', JSON.stringify([...logosArray, nuevo]))
                setPendingLogoLabel('')
                setOpenLogoMedia(false)
              }}
              title='Seleccionar Logo de Empresa'
              acceptType='IMAGEN'
            />
          </WebSectionCard>
        </Stack>
      )
    },
    {
      label: 'Nosotros',
      icon: 'tabler-heart-handshake',
      content: (
        <WebSectionCard icon='tabler-heart-handshake' title='Página Nosotros' subtitle='Hero, descripción e indicadores estadísticos de la página institucional' url='/nosotros'>
          <Stack spacing={3}>
            <RichTextEditor
              label='Título del Hero'
              value={config.NOSOTROS_HERO_TITLE}
              onChange={(value) => handleInputChange('NOSOTROS_HERO_TITLE', value)}
              placeholder='Somos calidad y responsabilidad a tu servicio'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción'
              value={config.NOSOTROS_HERO_DESC}
              onChange={(value) => handleInputChange('NOSOTROS_HERO_DESC', value)}
            />
            
            {/* Imagen de Portada */}
            <Typography variant='subtitle2' fontWeight={700}>Fondo de Portada (Hero Banner)</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {config.NOSOTROS_HERO_IMAGE
                  ? <img src={config.NOSOTROS_HERO_IMAGE} alt='Hero' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Typography variant='caption' color='text.disabled'>Sin imagen (Gradiente por defecto)</Typography>
                }
              </Box>
              <Stack spacing={1}>
                <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: 'NOSOTROS_HERO_IMAGE' })}>
                  Cambiar Portada
                </Button>
                {config.NOSOTROS_HERO_IMAGE && (
                  <Button variant='text' size='small' color='error' onClick={() => handleInputChange('NOSOTROS_HERO_IMAGE', '')}>
                    Quitar (Usar gradiente)
                  </Button>
                )}
              </Stack>
            </Box>
            <Box>
              <Typography variant='body2' fontWeight={600} color='text.secondary' sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <i className='tabler-chart-bar' style={{ fontSize: 16 }} /> Estadísticas
              </Typography>
              <Grid container spacing={2}>
                {[
                  { vKey: 'NOSOTROS_STAT_1_VALUE', lKey: 'NOSOTROS_STAT_1_LABEL', emoji: '👩‍🎓', vPh: '+1,200', lPh: 'Estudiantes formados' },
                  { vKey: 'NOSOTROS_STAT_2_VALUE', lKey: 'NOSOTROS_STAT_2_LABEL', emoji: '📚', vPh: '+80', lPh: 'Cursos disponibles' },
                  { vKey: 'NOSOTROS_STAT_3_VALUE', lKey: 'NOSOTROS_STAT_3_LABEL', emoji: '👨‍🏫', vPh: '+30', lPh: 'Docentes expertos' },
                  { vKey: 'NOSOTROS_STAT_4_VALUE', lKey: 'NOSOTROS_STAT_4_LABEL', emoji: '🏆', vPh: '98%', lPh: 'Tasa de satisfacción' },
                ].map((s, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Paper variant='outlined' sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant='caption' color='text.secondary' sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <span style={{ fontSize: 16 }}>{s.emoji}</span> Estadística {i + 1}
                      </Typography>
                      <Stack spacing={1.5}>
                        <TextField size='small' fullWidth label='Valor' value={config[s.vKey] || ''} onChange={(e) => handleInputChange(s.vKey, e.target.value)} placeholder={s.vPh} />
                        <TextField size='small' fullWidth label='Etiqueta' value={config[s.lKey] || ''} onChange={(e) => handleInputChange(s.lKey, e.target.value)} placeholder={s.lPh} />
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ my: 1 }} />
            <Typography variant='subtitle1' fontWeight={700}>Sección: Misión y Visión</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <RichTextEditor label='Título Misión' value={config.NOSOTROS_MISION_TITLE || ''} onChange={(value) => handleInputChange('NOSOTROS_MISION_TITLE', value)} placeholder='Nuestra Misión' minHeight={60} simple />
                  <RichTextEditor label='Texto Misión' value={config.NOSOTROS_MISION_TEXT || ''} onChange={(value) => handleInputChange('NOSOTROS_MISION_TEXT', value)} placeholder='Brindar formación profesional...' />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <RichTextEditor label='Título Visión' value={config.NOSOTROS_VISION_TITLE || ''} onChange={(value) => handleInputChange('NOSOTROS_VISION_TITLE', value)} placeholder='Nuestra Visión' minHeight={60} simple />
                  <RichTextEditor label='Texto Visión' value={config.NOSOTROS_VISION_TEXT || ''} onChange={(value) => handleInputChange('NOSOTROS_VISION_TEXT', value)} placeholder='Ser la plataforma de referencia...' />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </WebSectionCard>
      )
    },
    {
      label: 'Empresas',
      icon: 'tabler-briefcase',
      content: (
        <WebSectionCard icon='tabler-briefcase' title='Página Empresas' subtitle='Textos del banner hero de la página de soluciones corporativas B2B' url='/empresas'>
          <Stack spacing={3}>
            <RichTextEditor
              label='Título del Hero'
              value={config.EMPRESAS_HERO_TITLE}
              onChange={(value) => handleInputChange('EMPRESAS_HERO_TITLE', value)}
              placeholder='Lleva a tu equipo al siguiente nivel'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción'
              value={config.EMPRESAS_HERO_DESC}
              onChange={(value) => handleInputChange('EMPRESAS_HERO_DESC', value)}
            />
            
            {/* Imagen de Portada */}
            <Typography variant='subtitle2' fontWeight={700}>Fondo de Portada (Hero Banner)</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {config.EMPRESAS_HERO_IMAGE
                  ? <img src={config.EMPRESAS_HERO_IMAGE} alt='Hero' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Typography variant='caption' color='text.disabled'>Sin imagen (Gradiente por defecto)</Typography>
                }
              </Box>
              <Stack spacing={1}>
                <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: 'EMPRESAS_HERO_IMAGE' })}>
                  Cambiar Portada
                </Button>
                {config.EMPRESAS_HERO_IMAGE && (
                  <Button variant='text' size='small' color='error' onClick={() => handleInputChange('EMPRESAS_HERO_IMAGE', '')}>
                    Quitar (Usar gradiente)
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </WebSectionCard>
      )
    },
    {
      label: 'Consultoría',
      icon: 'tabler-chart-dots',
      content: (
        <WebSectionCard icon='tabler-chart-dots' title='Página Consultoría' subtitle='Textos del banner hero y secciones de la página de consultoría estratégica en RRHH' url='/consultoria'>
          <Stack spacing={3}>
            <RichTextEditor
              label='Título del Hero'
              value={config.CONSULTORIA_HERO_TITLE}
              onChange={(value) => handleInputChange('CONSULTORIA_HERO_TITLE', value)}
              placeholder='Consultoría Estratégica en RRHH'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción'
              value={config.CONSULTORIA_HERO_DESC}
              onChange={(value) => handleInputChange('CONSULTORIA_HERO_DESC', value)}
            />

            {/* Imagen de Portada */}
            <Typography variant='subtitle2' fontWeight={700}>Fondo de Portada (Hero Banner)</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {config.CONSULTORIA_HERO_IMAGE
                  ? <img src={config.CONSULTORIA_HERO_IMAGE} alt='Hero' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Typography variant='caption' color='text.disabled'>Sin imagen (Gradiente por defecto)</Typography>
                }
              </Box>
              <Stack spacing={1}>
                <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: 'CONSULTORIA_HERO_IMAGE' })}>
                  Cambiar Portada
                </Button>
                {config.CONSULTORIA_HERO_IMAGE && (
                  <Button variant='text' size='small' color='error' onClick={() => handleInputChange('CONSULTORIA_HERO_IMAGE', '')}>
                    Quitar (Usar gradiente)
                  </Button>
                )}
              </Stack>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            <Typography variant='subtitle1' fontWeight={700}>Sección 2: Servicios Corporativos</Typography>
            
            <RichTextEditor
              label='Título de Sección 2'
              value={config.CONSULTORIA_SEC2_TITLE}
              onChange={(value) => handleInputChange('CONSULTORIA_SEC2_TITLE', value)}
              placeholder='Soluciones Corporativas a Medida'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción de Sección 2'
              value={config.CONSULTORIA_SEC2_DESC}
              onChange={(value) => handleInputChange('CONSULTORIA_SEC2_DESC', value)}
            />

            <Typography variant='subtitle2' fontWeight={700} sx={{ mt: 2 }}>Imágenes de Servicios Corporativos</Typography>
            <Grid container spacing={2}>
              {CONSULTORIA_SERVICIOS.map(s => {
                const key = `CONSULTORIA_SVC_${s.id.toUpperCase()}_IMAGE`
                return (
                  <Grid item xs={12} sm={6} md={4} key={s.id}>
                    <Paper variant='outlined' sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant='caption' fontWeight={700}>{s.title}</Typography>
                      <Box sx={{ flex: 1, minHeight: 90, borderRadius: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={config[key] || s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key })}>
                        Cambiar
                      </Button>
                      {config[key] && config[key] !== s.image && (
                        <Button variant='text' size='small' color='error' onClick={() => handleInputChange(key, s.image)}>Restablecer</Button>
                      )}
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant='subtitle1' fontWeight={700}>Sección 3: HR CoreX (Tech Suite)</Typography>

            <RichTextEditor
              label='Título de Sección 3'
              value={config.CONSULTORIA_SEC3_TITLE}
              onChange={(value) => handleInputChange('CONSULTORIA_SEC3_TITLE', value)}
              placeholder='Tecnología Inteligente para RRHH'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción de Sección 3'
              value={config.CONSULTORIA_SEC3_DESC}
              onChange={(value) => handleInputChange('CONSULTORIA_SEC3_DESC', value)}
            />

            <Typography variant='subtitle2' fontWeight={700} sx={{ mt: 2 }}>Imágenes de HR CoreX</Typography>
            <Grid container spacing={2}>
              {HRCOREX_SERVICIOS.map(s => {
                const key = `HRCOREX_SVC_${s.id.toUpperCase()}_IMAGE`
                return (
                  <Grid item xs={12} sm={6} md={4} key={s.id}>
                    <Paper variant='outlined' sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant='caption' fontWeight={700}>{s.title}</Typography>
                      <Box sx={{ flex: 1, minHeight: 90, borderRadius: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={config[key] || s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key })}>
                        Cambiar
                      </Button>
                      {config[key] && config[key] !== s.image && (
                        <Button variant='text' size='small' color='error' onClick={() => handleInputChange(key, s.image)}>Restablecer</Button>
                      )}
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Stack>
        </WebSectionCard>
      )
    },
    {
      label: 'Contacto',
      icon: 'tabler-phone',
      content: (
        <WebSectionCard icon='tabler-phone' title='Página Contacto' subtitle='Hero y datos de contacto de la página de contacto' url='/contacto'>
          <Stack spacing={3}>
            <TextField size='small' fullWidth label='Subtexto Hero (eyebrow)' value={config.CONTACTO_HERO_EYEBROW || ''} onChange={(e) => handleInputChange('CONTACTO_HERO_EYEBROW', e.target.value)} placeholder='Estamos aquí para ayudarte' />
            <RichTextEditor
              label='Título del Hero'
              value={config.CONTACTO_HERO_TITLE}
              onChange={(value) => handleInputChange('CONTACTO_HERO_TITLE', value)}
              placeholder='Ponte en Contacto'
              minHeight={60}
              simple
            />
            <RichTextEditor
              label='Descripción'
              value={config.CONTACTO_HERO_DESC}
              onChange={(value) => handleInputChange('CONTACTO_HERO_DESC', value)}
            />
            
            {/* Imagen de Portada */}
            <Typography variant='subtitle2' fontWeight={700}>Fondo de Portada (Hero Banner)</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {config.CONTACTO_HERO_IMAGE
                  ? <img src={config.CONTACTO_HERO_IMAGE} alt='Hero' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Typography variant='caption' color='text.disabled'>Sin imagen (Gradiente por defecto)</Typography>
                }
              </Box>
              <Stack spacing={1}>
                <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: 'CONTACTO_HERO_IMAGE' })}>
                  Cambiar Portada
                </Button>
                {config.CONTACTO_HERO_IMAGE && (
                  <Button variant='text' size='small' color='error' onClick={() => handleInputChange('CONTACTO_HERO_IMAGE', '')}>
                    Quitar (Usar gradiente)
                  </Button>
                )}
              </Stack>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant='subtitle1' fontWeight={700}>Datos de Contacto</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='Ubicación / Dirección'
                  value={config.CONTACTO_UBICACION}
                  onChange={(e) => handleInputChange('CONTACTO_UBICACION', e.target.value)}
                  placeholder='Arequipa, Perú'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-map-pin' style={{ fontSize: 16 }} /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='Email de Contacto'
                  value={config.CONTACTO_EMAIL}
                  onChange={(e) => handleInputChange('CONTACTO_EMAIL', e.target.value)}
                  placeholder='correo@empresa.com'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-mail' style={{ fontSize: 16 }} /></InputAdornment> }}
                />
              </Grid>
            </Grid>
          </Stack>
        </WebSectionCard>
      )
    },
    {
      label: 'Escuelas',
      icon: 'tabler-school',
      content: (
        <Stack spacing={2}>
          <Paper
            variant='outlined'
            sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'flex-start', bgcolor: 'info.lighter', borderColor: 'info.light', borderRadius: 2 }}
          >
            <i className='tabler-info-circle' style={{ fontSize: 20, color: 'var(--mui-palette-info-main)', flexShrink: 0, marginTop: 2 }} />
            <Typography variant='caption' color='text.secondary'>
              Haz clic en cada escuela para editar sus textos e imágenes. Los cambios se guardan junto con el botón principal de <strong>Guardar</strong>.
            </Typography>
          </Paper>

          {ESCUELAS.map((esc) => {
            const keyPrefix = `ESCUELA_${esc.id.toUpperCase().replace(/-/g, '_')}`
            const cardImageKey = `${keyPrefix}_IMAGE`
            const heroBgKey = `${keyPrefix}_HEROBG`
            const nameKey = `${keyPrefix}_NAME`
            const descKey = `${keyPrefix}_DESC`
            const aboutKey = `${keyPrefix}_ABOUT`
            const areasKey = `${keyPrefix}_AREAS`
            const certsEspKey = `${keyPrefix}_CERTS_ESP`
            const certsConsKey = `${keyPrefix}_CERTS_CONS`

            const cardImageUrl = config[cardImageKey] || esc.image
            const heroBgUrl = config[heroBgKey] || esc.heroBg

            // Areas and certs: stored as JSON array or newline-separated string
            const areasVal = config[areasKey] ?? (esc.areas || []).join('\n')
            const certsEspVal = config[certsEspKey] ?? (esc.certificationsEsp || []).join('\n')
            const certsConsVal = config[certsConsKey] ?? (esc.certificationsCons || []).join('\n')

            return (
              <WebSectionCard
                key={esc.id}
                icon='tabler-school'
                title={config[nameKey] || esc.name}
                subtitle={config[descKey] || esc.desc}
                url={`/escuelas/${esc.id}`}
              >
                <Stack spacing={3}>
                  {/* Nombre y descripción corta */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <RichTextEditor
                        label='Nombre de la Escuela'
                        value={config[nameKey] || esc.name}
                        onChange={(value) => handleInputChange(nameKey, value)}
                        placeholder={esc.name}
                        minHeight={60}
                        simple
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RichTextEditor
                        label='Descripción Corta (tarjeta)'
                        value={config[descKey] || esc.desc}
                        onChange={(value) => handleInputChange(descKey, value)}
                        placeholder={esc.desc}
                        minHeight={60}
                        simple
                      />
                    </Grid>
                  </Grid>

                  {/* Texto About */}
                  <RichTextEditor
                    label='Presentación / Sobre la Escuela'
                    value={config[aboutKey] ?? esc.about}
                    onChange={(value) => handleInputChange(aboutKey, value)}
                    placeholder={esc.about}
                    helperText='Este texto aparece en la sección de Presentación dentro de la página de la escuela'
                  />

                  <Divider />

                  {/* Áreas */}
                  <TextField
                    fullWidth multiline rows={5}
                    label='Líneas de Especialización (Áreas)'
                    value={areasVal}
                    onChange={(e) => handleInputChange(areasKey, e.target.value)}
                    helperText='Una área por línea. Ej: Reclutamiento y Selección Estratégica'
                  />

                  {/* Certificaciones */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth multiline rows={5}
                        label='Certificaciones de Especialista'
                        value={certsEspVal}
                        onChange={(e) => handleInputChange(certsEspKey, e.target.value)}
                        helperText='Una certificación por línea'
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth multiline rows={5}
                        label='Certificaciones de Consultor'
                        value={certsConsVal}
                        onChange={(e) => handleInputChange(certsConsKey, e.target.value)}
                        helperText='Una certificación por línea'
                      />
                    </Grid>
                  </Grid>

                  <Divider />

                  {/* Imágenes */}
                  <Typography variant='subtitle2' fontWeight={700}>Imágenes</Typography>
                  <Grid container spacing={3}>
                    {/* Card Image */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='body2' color='text.secondary' sx={{ mb: 1, fontWeight: 600 }}>
                        🃏 Imagen de Tarjeta — 600×400 px recomendado
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {cardImageUrl
                            ? <img src={cardImageUrl} alt='Card' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <Typography variant='caption' color='text.disabled'>Sin imagen</Typography>
                          }
                        </Box>
                        <Stack spacing={1}>
                          <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: cardImageKey })}>
                            Cambiar Imagen
                          </Button>
                          {config[cardImageKey] && config[cardImageKey] !== esc.image && (
                            <Button variant='text' size='small' color='error' onClick={() => handleInputChange(cardImageKey, esc.image)}>
                              Restablecer
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </Grid>

                    {/* Hero Banner */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='body2' color='text.secondary' sx={{ mb: 1, fontWeight: 600 }}>
                        🖼️ Imagen de Portada — 1920×600 px recomendado
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ width: 140, height: 90, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', overflow: 'hidden', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {heroBgUrl
                            ? <img src={heroBgUrl} alt='Hero' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <Typography variant='caption' color='text.disabled'>Sin imagen</Typography>
                          }
                        </Box>
                        <Stack spacing={1}>
                          <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setMediaSelectTarget({ key: heroBgKey })}>
                            Cambiar Portada
                          </Button>
                          {config[heroBgKey] && config[heroBgKey] !== esc.heroBg && (
                            <Button variant='text' size='small' color='error' onClick={() => handleInputChange(heroBgKey, esc.heroBg)}>
                              Restablecer
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </WebSectionCard>
            )
          })}
        </Stack>
      )
    },
    {
      label: 'Testimonios',
      icon: 'tabler-message-star',
      content: <TestimoniosSettings config={config} onInputChange={handleInputChange} />
    }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <CardHeader
          title='Edición de Contenido Web'
          subheader='Actualiza los textos, imágenes, testimonios, blogs y noticias que se muestran en el portal público'
          className='pbe-2'
          sx={{ flexShrink: 0 }}
          avatar={<Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className='tabler-world-edit' style={{ fontSize: 22, color: '#fff' }} />
          </Box>}
        />
        <Divider sx={{ flexShrink: 0 }} />

        {/* Tabs */}
        <Box sx={{ flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              px: 2, pt: 1,
              '& .MuiTab-root': { minHeight: 52, textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
              '& .MuiTab-iconWrapper': { mr: 0.75 }
            }}
          >
            {tabs.map((tab, i) => (
              <Tab
                key={i}
                label={tab.label}
                icon={<i className={tab.icon} style={{ fontSize: 18 }} />}
                iconPosition='start'
              />
            ))}
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
          {tabs.map((tab, i) => (
            <CustomTabPanel key={i} value={tabValue} index={i}>
              {tab.content}
            </CustomTabPanel>
          ))}
        </Box>

        {/* Footer Save */}
        <Box
          sx={{
            flexShrink: 0,
            borderTop: 1,
            borderColor: 'divider',
            px: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            bgcolor: 'background.paper'
          }}
        >
          <Button
            variant='contained'
            size='large'
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={18} color='inherit' /> : <i className='tabler-device-floppy' />}
            sx={{ minWidth: 200 }}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Paper>

      {/* Media Library modal */}
      <MediaLibrary
        open={!!mediaSelectTarget}
        onClose={() => setMediaSelectTarget(null)}
        onSelect={(url) => {
          if (mediaSelectTarget) {
            handleInputChange(mediaSelectTarget.key, url)
            enqueueSnackbar('Imagen seleccionada — recuerda guardar los cambios', { variant: 'info' })
          }
          setMediaSelectTarget(null)
        }}
        title='Seleccionar Imagen'
        acceptType='IMAGEN'
      />
    </Box>
  )
}
