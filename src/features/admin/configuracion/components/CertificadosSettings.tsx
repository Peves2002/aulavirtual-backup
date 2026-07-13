'use client'

import {
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  Grid,
  Divider,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material'
import { Rol } from '@prisma/client'

import { useUsuarios } from '../../usuarios/hooks/useUsuarios'

// ─── Plantillas disponibles ────────────────────────────────────────────────────

const PLANTILLAS_CERTIFICADO = [
  {
    id: 'clasico',
    nombre: 'Clásico',
    descripcion: 'Panel lateral con gradiente. Ideal para institutos y academias.',
    thumbnail: '/images/plantillas-certificado/clasico.png',
  },
  {
    id: 'clasico_resumido',
    nombre: 'Clásico (Resumido)',
    descripcion: 'Temario a dos columnas sin cuadro de notas para ahorrar espacio.',
    thumbnail: '/images/plantillas-certificado/clasico_resumido.png',
  },
  {
    id: 'corporativo',
    nombre: 'Corporativo',
    descripcion: 'Diseño formal con borde y detalles dorados. Empresas B2B.',
    thumbnail: '/images/plantillas-certificado/corporativo.png',
  },
  {
    id: 'moderno',
    nombre: 'Moderno',
    descripcion: 'Fondo oscuro con acentos de color. Academias tech y startups.',
    thumbnail: '/images/plantillas-certificado/moderno.png',
  },
  {
    id: 'elegante',
    nombre: 'Elegante',
    descripcion: 'Fondo crema con bordes ornamentales. Estilo universitario.',
    thumbnail: '/images/plantillas-certificado/elegante.png',
  },
]

// ─── Sección Label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant='h6'
      sx={{ mb: 2, pb: 1, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block' }}
    >
      {children}
    </Typography>
  )
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface CertificadosSettingsProps {
  config: { [key: string]: string }
  onInputChange: (key: string, value: string) => void
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CertificadosSettings({ config, onInputChange }: CertificadosSettingsProps) {
  const { data: usuariosData, isLoading } = useUsuarios({ limit: '1000' })
  const candidatos = (usuariosData?.usuarios || []).filter(
    (u: any) => u.rol === Rol.ADMIN || u.rol === Rol.PROFESOR
  )
  const plantillaActiva = config.CERTIFICADO_PLANTILLA || 'clasico'

  return (
    <Stack spacing={4}>

      {/* ── SELECTOR DE PLANTILLA ──────────────────────────────────── */}
      <Box>
        <SectionLabel>Plantilla de Certificado</SectionLabel>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          Selecciona el diseño que se usará para todos los certificados generados en la plataforma.
          Los colores y el logo se aplican automáticamente según el branding configurado.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {PLANTILLAS_CERTIFICADO.map((p) => {
            const isSelected = plantillaActiva === p.id

            return (
              <Box
                key={p.id}
                onClick={() => onInputChange('CERTIFICADO_PLANTILLA', p.id)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? 4 : 0,
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {/* Thumbnail */}
                <Box sx={{ position: 'relative', bgcolor: 'grey.100' }}>
                  <Box
                    component='img'
                    src={p.thumbnail}
                    alt={p.nombre}
                    sx={{ width: '100%', aspectRatio: '297/210', objectFit: 'cover', display: 'block' }}
                  />
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <i className='tabler-check' style={{ fontSize: 14, color: '#fff' }} />
                    </Box>
                  )}
                </Box>
                {/* Label */}
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Typography variant='subtitle2' fontWeight={700} noWrap>{p.nombre}</Typography>
                  <Typography variant='caption' color='text.secondary' sx={{ display: 'block', lineHeight: 1.3 }}>
                    {p.descripcion}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Divider />

      {/* ── INFORMACIÓN DE LA INSTITUCIÓN ─────────────────────────── */}
      <Box>
        <SectionLabel>Información de la Institución</SectionLabel>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          Estos datos se imprimirán en la cabecera del certificado. Si se dejan en blanco, se usarán los datos
          generales de branding.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Nombre de la Institución'
              value={config.CERTIFICADO_INSTITUTION_NAME || ''}
              onChange={(e) => onInputChange('CERTIFICADO_INSTITUTION_NAME', e.target.value)}
              placeholder='Ej: Instituto Tecnológico ARM'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Eslogan o Lema'
              value={config.CERTIFICADO_SLOGAN || ''}
              onChange={(e) => onInputChange('CERTIFICADO_SLOGAN', e.target.value)}
              placeholder='Ej: Capacitación de Élite'
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label='URL del Sitio Web'
              value={config.CERTIFICADO_INSTITUTION_URL || ''}
              onChange={(e) => onInputChange('CERTIFICADO_INSTITUTION_URL', e.target.value)}
              placeholder='https://www.adph.com.pe'
              helperText='Aparece al pie del certificado como referencia de verificación'
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* ── CONFIGURACIÓN DE FIRMAS ────────────────────────────────── */}
      <Box>
        <SectionLabel>Configuración de Firmas</SectionLabel>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          Selecciona al usuario que actuará como <strong>Gerente General</strong> en los certificados. Asegúrate
          de que tenga su <strong>Cargo</strong> y <strong>Firma</strong> configurados en su perfil.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label='Designar Principal Firmante'
              value={config.CERTIFICADO_GERENTE_GENERAL_ID || ''}
              onChange={(e) => onInputChange('CERTIFICADO_GERENTE_GENERAL_ID', e.target.value)}
              disabled={isLoading}
              helperText='Este usuario aparecerá como el principal firmante en todos los certificados.'
            >
              <MenuItem value=''>
                <em>Ninguno seleccionado</em>
              </MenuItem>
              {candidatos.map((u: any) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.nombre} {u.apellido} ({u.rol})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant='outlined' sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.CERTIFICADO_MOSTRAR_FIRMA_DOCENTE !== 'false'}
                    onChange={(e) => onInputChange('CERTIFICADO_MOSTRAR_FIRMA_DOCENTE', e.target.checked ? 'true' : 'false')}
                    color='primary'
                  />
                }
                label={
                  <Box>
                    <Typography variant='body2' fontWeight={600}>Mostrar firma del docente</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Si está activo, la firma del docente del curso aparecerá como firmante secundario en el certificado.
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ── VISTA PREVIA DEL GERENTE ───────────────────────────────── */}
      {config.CERTIFICADO_GERENTE_GENERAL_ID && candidatos.find((u: any) => u.id === config.CERTIFICADO_GERENTE_GENERAL_ID) && (
        <Paper variant='outlined' sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
          <Typography variant='subtitle2' gutterBottom>Vista Previa — Gerente General</Typography>
          {(() => {
            const gerente = candidatos.find((u: any) => u.id === config.CERTIFICADO_GERENTE_GENERAL_ID)

            return (
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  {gerente?.firma ? (
                    <Box
                      sx={{
                        width: 120,
                        height: 60,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        p: 0.5
                      }}
                    >
                      <img src={gerente.firma} alt='Firma' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </Box>
                  ) : (
                    <Typography variant='caption' color='error'>Sin firma configurada</Typography>
                  )}
                </Grid>
                <Grid item xs>
                  <Typography variant='body2' fontWeight={600}>{gerente?.nombre} {gerente?.apellido}</Typography>
                  <Typography variant='caption' display='block'>
                    {gerente?.cargo || <span style={{ color: 'red' }}>Sin cargo configurado</span>}
                  </Typography>
                </Grid>
              </Grid>
            )
          })()}
        </Paper>
      )}
    </Stack>
  )
}
