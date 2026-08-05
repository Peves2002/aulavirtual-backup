'use client'

import { useState } from 'react'

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
  Paper,
  Grid
} from '@mui/material'
import { useSnackbar } from 'notistack'
import {
  Heart,
  Lightbulb,
  Users,
  TrendingUp,
  ShieldCheck,
  Award,
  Target,
  Star,
  CheckCircle,
  Rocket,
  BookOpen,
  ArrowUp,
  ArrowDown,
  type LucideIcon
} from 'lucide-react'

import AppModal from '@/utils/components/AppModal'

interface ValorItem {
  id: string
  title: string
  desc: string
  icon: string
}

interface ValoresSettingsProps {
  config: { [key: string]: string }
  onInputChange: (clave: string, valor: string) => void
}

export const ICON_OPTIONS: { key: string; Icon: LucideIcon; label: string }[] = [
  { key: 'Heart', Icon: Heart, label: 'Corazón' },
  { key: 'Lightbulb', Icon: Lightbulb, label: 'Idea' },
  { key: 'Users', Icon: Users, label: 'Equipo' },
  { key: 'TrendingUp', Icon: TrendingUp, label: 'Crecimiento' },
  { key: 'ShieldCheck', Icon: ShieldCheck, label: 'Integridad' },
  { key: 'Award', Icon: Award, label: 'Premio' },
  { key: 'Target', Icon: Target, label: 'Objetivo' },
  { key: 'Star', Icon: Star, label: 'Estrella' },
  { key: 'CheckCircle', Icon: CheckCircle, label: 'Calidad' },
  { key: 'Rocket', Icon: Rocket, label: 'Impulso' },
  { key: 'BookOpen', Icon: BookOpen, label: 'Aprendizaje' }
]

const ICON_MAP: Record<string, LucideIcon> = ICON_OPTIONS.reduce(
  (acc, { key, Icon }) => ({ ...acc, [key]: Icon }),
  {}
)

const DEFAULT_VALORES_SEED: ValorItem[] = [
  {
    id: 'seed-1',
    title: 'Compromiso',
    desc: 'Nos dedicamos plenamente a la formación de cada estudiante, acompañándolos en cada etapa de su aprendizaje.',
    icon: 'Heart'
  },
  {
    id: 'seed-2',
    title: 'Innovación',
    desc: 'Buscamos constantemente nuevas formas de enseñar y de acercar el conocimiento de manera más efectiva.',
    icon: 'Lightbulb'
  },
  {
    id: 'seed-3',
    title: 'Trabajo en Equipo',
    desc: 'Creemos en la colaboración como motor del aprendizaje y el crecimiento colectivo.',
    icon: 'Users'
  },
  {
    id: 'seed-4',
    title: 'Mejora Continua',
    desc: 'Actualizamos nuestros contenidos y metodologías para mantenernos a la vanguardia del sector.',
    icon: 'TrendingUp'
  },
  {
    id: 'seed-5',
    title: 'Integridad',
    desc: 'Actuamos con transparencia y honestidad, generando confianza en cada relación con nuestros estudiantes y empresas.',
    icon: 'ShieldCheck'
  }
]

export default function ValoresSettings({ config, onInputChange }: ValoresSettingsProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ValorItem | null>(null)

  // Form states
  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formIcon, setFormIcon] = useState('Heart')

  const valoresList: ValorItem[] = (() => {
    try {
      const dataStr = config.NOSOTROS_VALORES

      if (!dataStr) return DEFAULT_VALORES_SEED

      const parsed = JSON.parse(dataStr)

      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_VALORES_SEED

      return parsed
    } catch {
      return DEFAULT_VALORES_SEED
    }
  })()

  const persist = (newList: ValorItem[]) => {
    onInputChange('NOSOTROS_VALORES', JSON.stringify(newList))
  }

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormTitle('')
    setFormDesc('')
    setFormIcon('Heart')
    setOpenModal(true)
  }

  const handleOpenEdit = (item: ValorItem) => {
    setEditingItem(item)
    setFormTitle(item.title)
    setFormDesc(item.desc)
    setFormIcon(item.icon || 'Heart')
    setOpenModal(true)
  }

  const handleSave = () => {
    if (!formTitle.trim() || !formDesc.trim()) {
      enqueueSnackbar('Título y Descripción son obligatorios', { variant: 'warning' })

      return
    }

    let newList: ValorItem[]

    if (editingItem) {
      newList = valoresList.map(v =>
        v.id === editingItem.id ? { ...v, title: formTitle, desc: formDesc, icon: formIcon } : v
      )
      enqueueSnackbar('Valor modificado — recuerda guardar cambios generales', { variant: 'info' })
    } else {
      const newItem: ValorItem = {
        id: Date.now().toString(),
        title: formTitle,
        desc: formDesc,
        icon: formIcon
      }

      newList = [...valoresList, newItem]
      enqueueSnackbar('Valor añadido — recuerda guardar cambios generales', { variant: 'info' })
    }

    persist(newList)
    setOpenModal(false)
  }

  const handleDelete = (id: string) => {
    persist(valoresList.filter(v => v.id !== id))
    enqueueSnackbar('Valor eliminado — recuerda guardar cambios generales', { variant: 'info' })
  }

  const handleMove = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir

    if (newIndex < 0 || newIndex >= valoresList.length) return

    const newList = [...valoresList]

    ;[newList[index], newList[newIndex]] = [newList[newIndex], newList[index]]
    persist(newList)
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant='subtitle1' fontWeight={700}>Tarjetas de Valores</Typography>
          <Typography variant='body2' color='text.secondary'>
            Administra las tarjetas de valores institucionales, su ícono y su orden de aparición.
          </Typography>
        </Box>
        <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={handleOpenAdd}>
          Agregar Valor
        </Button>
      </Box>

      <Grid container spacing={2}>
        {valoresList.map((item, index) => {
          const ItemIcon = ICON_MAP[item.icon] || Heart

          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper
                variant='outlined'
                sx={{ p: 2.5, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}
              >
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ItemIcon size={20} />
                  </Box>
                  <Typography variant='subtitle2' fontWeight={700} sx={{ flexGrow: 1 }}>
                    {item.title}
                  </Typography>
                </Stack>
                <Typography variant='body2' color='text.secondary' sx={{ flexGrow: 1 }}>
                  {item.desc}
                </Typography>
                <Stack direction='row' spacing={0.5} justifyContent='flex-end' sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  <IconButton size='small' disabled={index === 0} onClick={() => handleMove(index, -1)}>
                    <ArrowUp size={16} />
                  </IconButton>
                  <IconButton size='small' disabled={index === valoresList.length - 1} onClick={() => handleMove(index, 1)}>
                    <ArrowDown size={16} />
                  </IconButton>
                  <IconButton size='small' color='primary' onClick={() => handleOpenEdit(item)}>
                    <i className='tabler-edit' style={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size='small' color='error' onClick={() => handleDelete(item.id)}>
                    <i className='tabler-trash' style={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      <AppModal open={openModal} handleClose={() => setOpenModal(false)}>
        <Typography variant='h6' sx={{ mb: 3 }}>{editingItem ? 'Editar Valor' : 'Agregar Valor'}</Typography>
        <Stack spacing={3}>
          <TextField
            label='Título'
            fullWidth
            value={formTitle}
            placeholder='Ej: Compromiso'
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <TextField
            label='Descripción'
            fullWidth
            multiline
            rows={3}
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />
          <Box>
            <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
              Ícono
            </Typography>
            <Stack direction='row' flexWrap='wrap' gap={1}>
              {ICON_OPTIONS.map(({ key, Icon, label }) => (
                <IconButton
                  key={key}
                  title={label}
                  onClick={() => setFormIcon(key)}
                  sx={{
                    border: '2px solid',
                    borderRadius: 2,
                    borderColor: formIcon === key ? 'primary.main' : 'divider',
                    bgcolor: formIcon === key ? 'primary.main' : 'transparent',
                    color: formIcon === key ? '#fff' : 'text.secondary'
                  }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Stack>
          </Box>
          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant='contained' onClick={handleSave}>Aceptar</Button>
          </Stack>
        </Stack>
      </AppModal>
    </Stack>
  )
}
