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
  IconButton,
  Tabs,
  Tab,
  Divider,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardHeader,
  FormControlLabel,
  MenuItem
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { getSession } from 'next-auth/react'

import { AxiosConfiguracion } from '../http/axiosConfiguracion'
import type { Configuracion } from '../entity/Configuracion'
import MediaLibrary from '../../cursos/components/MediaLibrary'
import CertificadosSettings from './CertificadosSettings'

// ─── Sub-components ────────────────────────────────────────────────────────────

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant='h6' sx={{ mb: 2, pb: 1, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block' }}>
      {children}
    </Typography>
  )
}

// ─── Payment Gateway Accordion ─────────────────────────────────────────────────

interface GatewayAccordionProps {
  icon: string
  title: string
  subtitle: string
  enabledKey: string
  config: { [key: string]: string }
  onInputChange: (key: string, value: string) => void
  children: React.ReactNode
}

function GatewayAccordion({ icon, title, subtitle, enabledKey, config, onInputChange, children }: GatewayAccordionProps) {
  const [open, setOpen] = useState(false)
  const enabled = config[enabledKey] === 'true'

  return (
    <Accordion expanded={open} onChange={(_, v) => setOpen(v)} variant='outlined' sx={{ borderRadius: 2 }}>
      <AccordionSummary>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: enabled ? 'success.light' : 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className={icon} style={{ fontSize: 18, color: enabled ? 'var(--mui-palette-success-dark)' : 'var(--mui-palette-text-secondary)' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle2' fontWeight={700}>{title}</Typography>
            <Typography variant='caption' color='text.secondary'>{subtitle}</Typography>
          </Box>
        </Box>
        <Switch
          checked={enabled}
          size='small'
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onInputChange(enabledKey, e.target.checked ? 'true' : 'false')}
        />
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
        <Divider sx={{ mb: 3 }} />
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface ConfiguracionViewProps {
  initialData?: Configuracion[]
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ConfiguracionView({ initialData }: ConfiguracionViewProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(0)
  const [saving, setSaving] = useState(false)
  const [showSecret, setShowSecret] = useState<{ [key: string]: boolean }>({})
  const [imagePicker, setImagePicker] = useState<{ key: string; title: string } | null>(null)

  const initialMapped = (initialData || []).reduce((acc: { [key: string]: string }, curr: Configuracion) => {
    acc[curr.clave] = curr.valor
    
return acc
  }, {})

  const [config, setConfig] = useState<{ [key: string]: string }>({
    // Branding
    TEMPLATE_NAME: 'Aula Virtual',
    TEMPLATE_SLOGAN: '',
    TEMPLATE_LOGO: '',
    SITE_FAVICON: '',
    SETTINGS_COOKIE_NAME: 'arm',
    PRIMARY_COLOR_MAIN: '#131FF2',
    PRIMARY_COLOR_LIGHT: '#242CBF',
    PRIMARY_COLOR_DARK: '#9196F2',
    WHATSAPP_NUMERO: '',
    WHATSAPP_NUMERO_EMPRESAS: '',

    // Comunidad (Sidebar)
    COMUNIDAD_HABILITADO: 'true',
    COMUNIDAD_TEXTO: '¡Únete a nuestra comunidad!',
    COMUNIDAD_DESCRIPCION: 'Conecta con otros estudiantes',
    COMUNIDAD_URL: '',
    COMUNIDAD_TIPO: 'otro',

    // Pagos
    PAYPAL_ENABLED: 'true',
    PAYPAL_CLIENT_ID: '',
    PAYPAL_EXCHANGE_RATE: '3.80',
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    IZIPAY_ENABLED: 'true',
    IZIPAY_MERCHANT_CODE: '',
    IZIPAY_RSA_KEY: '',
    CULQI_ENABLED: 'true',
    CULQI_PUBLIC_KEY: '',
    CULQI_RSA_ID: '',
    CULQI_RSA_PUBLIC_KEY: '',
    PAGO_MANUAL_ENABLED: 'false',
    PAGO_MANUAL_WHATSAPP_NUMERO: '',
    MP_ENABLED: 'true',
    MP_PUBLIC_KEY: '',

    // Comportamiento
    PEDIDOS_SOLICITAR_COMPROBANTE: 'true',
    COMENTARIOS_REQUIERE_APROBACION: 'false',
    chat_entre_alumnos: 'false',
    WEB_EMPRESAS_HABILITADO: 'true',

    // Ficha de Inscripcion
    INSCRIPCION_CONTACTO_DIRECCION: 'Av. Javier Prado Este 560, Oficina 2302 San Isidro',
    INSCRIPCION_CONTACTO_EMAIL: 'informes@adphgroup.com',
    INSCRIPCION_CONTACTO_TELEFONO: '(01) 7073571',
    INSCRIPCION_IMPORTANTE_TEXTO: '1. La información consignada en su ficha de inscripción...\n2. Los datos consignados serán utilizados...\n3. ADPH Group – Executive Education se reserva el derecho...\n4. ADPH Group se reserva el derecho de reprogramar las fechas...',

    // Certificados
    CERTIFICADO_INSTITUTION_NAME: '',
    CERTIFICADO_SLOGAN: '',
    CERTIFICADO_INSTITUTION_URL: '',
    CERTIFICADO_GERENTE_GENERAL_ID: '',
    CERTIFICADO_PLANTILLA: 'clasico',
    CERTIFICADO_MOSTRAR_FIRMA_DOCENTE: 'true',

    // SEO
    SEO_SITE_URL: '',
    SEO_OG_IMAGE: '',
    SEO_GOOGLE_VERIFICATION: '',
    SEO_KEYWORDS: '',
    SEO_HOME_TITLE: '',
    SEO_HOME_DESC: '',
    SEO_CURSOS_DESC: '',
    SEO_PROGRAMAS_DESC: '',
    SEO_DIPLOMADOS_DESC: '',
    SEO_NOTICIAS_DESC: '',
    SEO_NOSOTROS_DESC: '',
    SEO_CONTACTO_DESC: '',
    ...initialMapped
  })

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleInputChange = (clave: string, valor: string) => {
    setConfig(prev => ({ ...prev, [clave]: valor }))
  }

  const toggleSecret = (key: string) => {
    setShowSecret(prev => ({ ...prev, [key]: !prev[key] }))
  }

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
      enqueueSnackbar('Configuración actualizada. Si cambiaste el favicon, recarga la pestaña (Ctrl+F5).', { variant: 'success' })
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Error al guardar la configuración', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const SecretField = ({ label, configKey, helperText }: { label: string; configKey: string; helperText?: string }) => (
    <TextField
      label={label}
      fullWidth
      type={showSecret[configKey] ? 'text' : 'password'}
      value={config[configKey] || ''}
      onChange={(e) => handleInputChange(configKey, e.target.value)}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => toggleSecret(configKey)} edge='end' size='small'>
              <i className={showSecret[configKey] ? 'tabler-eye-off' : 'tabler-eye'} style={{ fontSize: 18 }} />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )

  // ── Tabs de Sistema ────────────────────────────────────────────────────────────
  const tabs = [
    {
      label: 'Branding',
      icon: 'tabler-brand-abstract',
      content: (
        <Stack spacing={4}>
          {/* Identidad */}
          <Box>
            <SectionLabel>Identidad de la Plataforma</SectionLabel>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='Nombre de la Plataforma'
                  value={config.TEMPLATE_NAME}
                  onChange={(e) => handleInputChange('TEMPLATE_NAME', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='Slogan'
                  value={config.TEMPLATE_SLOGAN}
                  onChange={(e) => handleInputChange('TEMPLATE_SLOGAN', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='Nombre de Cookie'
                  value={config.SETTINGS_COOKIE_NAME}
                  onChange={(e) => handleInputChange('SETTINGS_COOKIE_NAME', e.target.value)}
                  helperText='Prefijo para cookies de configuración del tema'
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* WhatsApp */}
          <Box>
            <SectionLabel>WhatsApp de Soporte</SectionLabel>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='WhatsApp Alumnos (Principal)'
                  value={config.WHATSAPP_NUMERO || ''}
                  onChange={(e) => handleInputChange('WHATSAPP_NUMERO', e.target.value)}
                  helperText='Sin + ni espacios. Ej: 51959436827'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-brand-whatsapp' style={{ color: '#25D366' }} /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth label='WhatsApp Soluciones Corporativas'
                  value={config.WHATSAPP_NUMERO_EMPRESAS || ''}
                  onChange={(e) => handleInputChange('WHATSAPP_NUMERO_EMPRESAS', e.target.value)}
                  helperText='Número para contactos B2B/Empresas'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-building-store' /></InputAdornment> }}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Logo */}
          <Box>
            <SectionLabel>Logo</SectionLabel>
            <Grid container spacing={3} alignItems='flex-start'>
              <Grid item xs={12} md={4}>
                <Paper variant='outlined' sx={{ p: 2, textAlign: 'center', borderRadius: 2, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                  {config.TEMPLATE_LOGO
                    ? <img src={config.TEMPLATE_LOGO} alt='Logo' style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    : <Typography variant='caption' color='text.disabled'>Sin logo</Typography>
                  }
                  <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setImagePicker({ key: 'TEMPLATE_LOGO', title: 'Seleccionar Logo' })}>
                    Cambiar logo
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Favicon */}
          <Box>
            <SectionLabel>Favicon</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              Icono en la pestaña del navegador. Usa una imagen cuadrada (mínimo 32×32 px).
            </Typography>
            <Grid container spacing={3} alignItems='flex-start'>
              <Grid item xs={12} md={4}>
                <Paper variant='outlined' sx={{ p: 2, textAlign: 'center', borderRadius: 2, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                  {config.SITE_FAVICON
                    ? <img src={config.SITE_FAVICON} alt='Favicon' style={{ width: 48, height: 48, objectFit: 'contain' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    : <Typography variant='caption' color='text.disabled'>Sin favicon personalizado</Typography>
                  }
                  <Stack direction='row' spacing={1} flexWrap='wrap' justifyContent='center'>
                    <Button variant='outlined' size='small' startIcon={<i className='tabler-photo' />} onClick={() => setImagePicker({ key: 'SITE_FAVICON', title: 'Seleccionar Favicon' })}>
                      Cambiar favicon
                    </Button>
                    {config.SITE_FAVICON && (
                      <Button variant='text' size='small' color='error' onClick={() => handleInputChange('SITE_FAVICON', '')}>Quitar</Button>
                    )}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Colores */}
          <Box>
            <SectionLabel>Colores del Tema</SectionLabel>
            <Box sx={{ mb: 3 }}>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>Paletas Predefinidas</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 110px)', gap: 1.5 }}>
                {[
                  { label: 'Teal & Lima', main: '#25927F', light: '#BDD962', dark: '#025E44' },
                  { label: 'Índigo & Lima', main: '#4F46E5', light: '#A3E635', dark: '#3730A3' },
                  { label: 'Océano Profundo', main: '#0369A1', light: '#38BDF8', dark: '#082F49' },
                  { label: 'Índigo & Dorado', main: '#7C3AED', light: '#FCD34D', dark: '#4C1D95' },
                  { label: 'Esmeralda', main: '#059669', light: '#A7F3D0', dark: '#064E3B' },
                  { label: 'Pizarra & Coral', main: '#475569', light: '#FB923C', dark: '#1E293B' },
                  { label: 'Granate & Champán', main: '#9F1239', light: '#FBCFE8', dark: '#4C0519' },
                  { label: 'Cian Tecnológico', main: '#0891B2', light: '#67E8F9', dark: '#164E63' },
                  { label: 'Naranja Fuego', main: '#EA580C', light: '#FED7AA', dark: '#7C2D12' },
                  { label: 'Azul Presidencial', main: '#1D4ED8', light: '#93C5FD', dark: '#1E3A8A' },
                  { label: 'Azul & Oro', main: '#2563EB', light: '#FCD34D', dark: '#1E3A8A' },
                  { label: 'Marino Oficial', main: '#0F4C81', light: '#BAE6FD', dark: '#0C2340' },
                ].map((palette) => (
                  <Box
                    key={palette.label}
                    onClick={() => {
                      handleInputChange('PRIMARY_COLOR_MAIN', palette.main)
                      handleInputChange('PRIMARY_COLOR_LIGHT', palette.light)
                      handleInputChange('PRIMARY_COLOR_DARK', palette.dark)
                    }}
                    sx={{
                      width: 110, cursor: 'pointer', borderRadius: 2, border: '2px solid',
                      borderColor: config.PRIMARY_COLOR_MAIN === palette.main ? 'primary.main' : 'divider',
                      overflow: 'hidden', transition: 'transform 0.15s, box-shadow 0.15s',
                      '&:hover': { transform: 'scale(1.04)', boxShadow: 3 },
                    }}
                  >
                    <Stack direction='row' sx={{ height: 32 }}>
                      <Box sx={{ flex: 1, bgcolor: palette.dark }} />
                      <Box sx={{ flex: 1, bgcolor: palette.main }} />
                      <Box sx={{ flex: 1, bgcolor: palette.light }} />
                    </Stack>
                    <Box sx={{ px: 1, py: 0.5, bgcolor: 'background.paper' }}>
                      <Typography variant='caption' sx={{ fontSize: '0.65rem', fontWeight: 600, display: 'block', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {palette.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Grid container spacing={3}>
              {[
                { label: 'Color Primario Principal', key: 'PRIMARY_COLOR_MAIN' },
                { label: 'Color Primario Claro', key: 'PRIMARY_COLOR_LIGHT' },
                { label: 'Color Primario Oscuro', key: 'PRIMARY_COLOR_DARK' }
              ].map(({ label, key }) => (
                <Grid item xs={12} md={4} key={key}>
                  <Typography variant='body2' fontWeight={500} sx={{ mb: 1 }}>{label}</Typography>
                  <Stack direction='row' spacing={1.5} alignItems='center'>
                    <TextField
                      fullWidth size='small'
                      value={config[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      inputProps={{ style: { fontFamily: 'monospace', fontSize: 13 } }}
                    />
                    <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: 1.5, bgcolor: config[key], border: '2px solid', borderColor: 'divider', cursor: 'pointer' }} component='label'>
                      <input
                        type='color'
                        value={/^#[0-9A-Fa-f]{6}$/.test(config[key]) ? config[key] : '#000000'}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                      />
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      )
    },
    {
      label: 'Comunidad (Menú Lateral)',
      icon: 'tabler-users',
      content: (
        <Stack spacing={4}>
          <Box>
            <SectionLabel>Enlace a Grupo / Comunidad</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Configura la tarjeta que aparecerá al fondo del menú lateral izquierdo para que los alumnos se unan a tu grupo.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper variant='outlined' sx={{ p: 2, bgcolor: 'action.hover' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={config.COMUNIDAD_HABILITADO === 'true'}
                        onChange={(e) => handleInputChange('COMUNIDAD_HABILITADO', e.target.checked ? 'true' : 'false')}
                        color='primary'
                      />
                    }
                    label={<Typography fontWeight={500}>Habilitar tarjeta de comunidad en el menú</Typography>}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label='Plataforma / Tipo'
                  value={config.COMUNIDAD_TIPO || 'otro'}
                  onChange={(e) => handleInputChange('COMUNIDAD_TIPO', e.target.value)}
                >
                  <MenuItem value='whatsapp'>WhatsApp</MenuItem>
                  <MenuItem value='facebook'>Facebook Group</MenuItem>
                  <MenuItem value='telegram'>Telegram</MenuItem>
                  <MenuItem value='discord'>Discord</MenuItem>
                  <MenuItem value='youtube'>YouTube (Canal)</MenuItem>
                  <MenuItem value='otro'>Otro (Enlace Genérico)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='URL del Enlace'
                  placeholder='https://chat.whatsapp.com/...'
                  value={config.COMUNIDAD_URL || ''}
                  onChange={(e) => handleInputChange('COMUNIDAD_URL', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Texto Principal'
                  placeholder='¡Únete a nuestra comunidad!'
                  value={config.COMUNIDAD_TEXTO || ''}
                  onChange={(e) => handleInputChange('COMUNIDAD_TEXTO', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Descripción breve'
                  placeholder='Conecta con otros estudiantes'
                  value={config.COMUNIDAD_DESCRIPCION || ''}
                  onChange={(e) => handleInputChange('COMUNIDAD_DESCRIPCION', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )
    },
    {
      label: 'Métodos de Pago',
      icon: 'tabler-credit-card',
      content: (
        <Stack spacing={1.5}>
          <Paper variant='outlined' sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'info.main', bgcolor: 'action.hover' }}>
            <Stack direction='row' spacing={1.5} alignItems='center'>
              <i className='tabler-info-circle' style={{ fontSize: 20, color: 'var(--mui-palette-info-main)' }} />
              <Typography variant='body2' color='text.secondary'>
                Las claves <strong>privadas/secretas</strong> se gestionan de forma segura en el servidor.
              </Typography>
            </Stack>
          </Paper>

          <GatewayAccordion icon='tabler-building-bank' title='Culqi' subtitle='Tarjetas de débito y crédito (Perú)' enabledKey='CULQI_ENABLED' config={config} onInputChange={handleInputChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label='Public Key' value={config.CULQI_PUBLIC_KEY} onChange={(e) => handleInputChange('CULQI_PUBLIC_KEY', e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label='RSA ID' value={config.CULQI_RSA_ID} onChange={(e) => handleInputChange('CULQI_RSA_ID', e.target.value)} /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label='RSA Public Key' multiline rows={3} value={config.CULQI_RSA_PUBLIC_KEY} onChange={(e) => handleInputChange('CULQI_RSA_PUBLIC_KEY', e.target.value)} /></Grid>
            </Grid>
          </GatewayAccordion>

          <GatewayAccordion icon='tabler-shield-check' title='IziPay' subtitle='Pasarela de pagos peruana' enabledKey='IZIPAY_ENABLED' config={config} onInputChange={handleInputChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label='Merchant Code' value={config.IZIPAY_MERCHANT_CODE} onChange={(e) => handleInputChange('IZIPAY_MERCHANT_CODE', e.target.value)} /></Grid>
              <Grid item xs={12}><TextField fullWidth label='RSA Key' multiline rows={2} value={config.IZIPAY_RSA_KEY} onChange={(e) => handleInputChange('IZIPAY_RSA_KEY', e.target.value)} /></Grid>
            </Grid>
          </GatewayAccordion>

          <GatewayAccordion icon='tabler-brand-paypal' title='PayPal' subtitle='Pagos internacionales (USD)' enabledKey='PAYPAL_ENABLED' config={config} onInputChange={handleInputChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label='Client ID' value={config.PAYPAL_CLIENT_ID} onChange={(e) => handleInputChange('PAYPAL_CLIENT_ID', e.target.value)} /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth type='number' label='Soles por Dólar' value={config.PAYPAL_EXCHANGE_RATE} onChange={(e) => handleInputChange('PAYPAL_EXCHANGE_RATE', e.target.value)} /></Grid>
            </Grid>
          </GatewayAccordion>

          <GatewayAccordion icon='tabler-shopping-cart' title='Mercado Pago' subtitle='Pagos en línea (Latinoamérica)' enabledKey='MP_ENABLED' config={config} onInputChange={handleInputChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label='Public Key' value={config.MP_PUBLIC_KEY || ''} onChange={(e) => handleInputChange('MP_PUBLIC_KEY', e.target.value)} /></Grid>
            </Grid>
          </GatewayAccordion>

          <GatewayAccordion icon='tabler-device-mobile' title='Pago Manual' subtitle='Yape, transferencias — el admin verifica el voucher' enabledKey='PAGO_MANUAL_ENABLED' config={config} onInputChange={handleInputChange}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label='Número de WhatsApp' value={config.PAGO_MANUAL_WHATSAPP_NUMERO || ''} onChange={(e) => handleInputChange('PAGO_MANUAL_WHATSAPP_NUMERO', e.target.value)} /></Grid>
            </Grid>
          </GatewayAccordion>
        </Stack>
      )
    },
    {
      label: 'Integraciones',
      icon: 'tabler-api',
      content: (
        <Stack spacing={3}>
          <TextField
            label='Google Client ID'
            fullWidth
            value={config.GOOGLE_CLIENT_ID}
            onChange={(e) => handleInputChange('GOOGLE_CLIENT_ID', e.target.value)}
          />
          <SecretField label='Google Client Secret' configKey='GOOGLE_CLIENT_SECRET' />
        </Stack>
      )
    },
    {
      label: 'Certificados',
      icon: 'tabler-certificate',
      content: <CertificadosSettings config={config} onInputChange={handleInputChange} />
    },
    {
      label: 'Plataforma',
      icon: 'tabler-adjustments',
      content: (
        <Stack spacing={4}>
          <Box>
            <SectionLabel>Compras y Comprobantes</SectionLabel>
            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.default' }}>
              <FormControlLabel
                control={<Switch checked={config.PEDIDOS_SOLICITAR_COMPROBANTE === 'true'} onChange={(e) => handleInputChange('PEDIDOS_SOLICITAR_COMPROBANTE', e.target.checked ? 'true' : 'false')} />}
                label='Habilitar solicitud de comprobantes en el Checkout'
              />
            </Paper>
          </Box>

          <Divider />

          <Box>
            <SectionLabel>Moderación de Comentarios</SectionLabel>
            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.default' }}>
              <FormControlLabel
                control={<Switch checked={config.COMENTARIOS_REQUIERE_APROBACION === 'true'} onChange={(e) => handleInputChange('COMENTARIOS_REQUIERE_APROBACION', e.target.checked ? 'true' : 'false')} />}
                label='Requerir aprobación antes de publicar comentarios de estudiantes'
              />
            </Paper>
          </Box>

          <Divider />

          <Box>
            <SectionLabel>Chat entre Usuarios</SectionLabel>
            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.default' }}>
              <FormControlLabel
                control={<Switch checked={config.chat_entre_alumnos === 'true'} onChange={(e) => handleInputChange('chat_entre_alumnos', e.target.checked ? 'true' : 'false')} />}
                label='Permitir mensajes directos entre alumnos'
              />
            </Paper>
          </Box>

          <Divider />

          <Box>
            <SectionLabel>Visibilidad de Páginas</SectionLabel>
            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.default' }}>
              <FormControlLabel
                control={<Switch checked={config.WEB_EMPRESAS_HABILITADO !== 'false'} onChange={(e) => handleInputChange('WEB_EMPRESAS_HABILITADO', e.target.checked ? 'true' : 'false')} />}
                label='Mostrar página de Empresas en el portal público'
              />
            </Paper>
          </Box>
        </Stack>
      )
    },

    // ── Ficha de Inscripción ───────────────────────────────────────────────────────
    {
      label: 'Ficha de Inscripción',
      icon: 'tabler-file-invoice',
      content: (
        <Stack spacing={4}>
          <Box>
            <SectionLabel>Información de Contacto</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Estos datos de contacto aparecerán en el lateral de la página de Ficha de Inscripción.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Dirección'
                  value={config.INSCRIPCION_CONTACTO_DIRECCION || ''}
                  onChange={(e) => handleInputChange('INSCRIPCION_CONTACTO_DIRECCION', e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-map-pin' /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='E-mail de Contacto'
                  value={config.INSCRIPCION_CONTACTO_EMAIL || ''}
                  onChange={(e) => handleInputChange('INSCRIPCION_CONTACTO_EMAIL', e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-mail' /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Teléfono'
                  value={config.INSCRIPCION_CONTACTO_TELEFONO || ''}
                  onChange={(e) => handleInputChange('INSCRIPCION_CONTACTO_TELEFONO', e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-phone' /></InputAdornment> }}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>
            <SectionLabel>Información Importante</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Puedes escribir los términos o advertencias que el estudiante debe leer antes de inscribirse. Puedes usar formato HTML básico (como &lt;ol&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ol&gt;) o simplemente escribir con saltos de línea.
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={6}
              label='Texto / Advertencias Importantes'
              value={config.INSCRIPCION_IMPORTANTE_TEXTO || ''}
              onChange={(e) => handleInputChange('INSCRIPCION_IMPORTANTE_TEXTO', e.target.value)}
            />
          </Box>
        </Stack>
      )
    },

    // ── Pestaña SEO ────────────────────────────────────────────────────────────────
    {
      label: 'SEO',
      icon: 'tabler-search',
      content: (
        <Stack spacing={4}>

          {/* Configuración Global */}
          <Box>
            <SectionLabel>Configuración Global</SectionLabel>
            <Box sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: 'info.lighter', border: '1px solid', borderColor: 'info.light' }}>
              <Typography variant='body2' color='info.dark' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <i className='tabler-info-circle' style={{ fontSize: 18 }} />
                Estos valores afectan el posicionamiento en Google. Los campos vacíos usarán los valores por defecto del sistema.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='URL base del sitio'
                  placeholder='https://adph.com'
                  value={config.SEO_SITE_URL || ''}
                  onChange={(e) => handleInputChange('SEO_SITE_URL', e.target.value)}
                  helperText='Sin barra final. Se usa en sitemap.xml y etiquetas canonical.'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-world' /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Google Search Console (verificación)'
                  placeholder='Pega aquí el código de verificación de Google'
                  value={config.SEO_GOOGLE_VERIFICATION || ''}
                  onChange={(e) => handleInputChange('SEO_GOOGLE_VERIFICATION', e.target.value)}
                  helperText='Se insertará como meta tag en el <head> de todas las páginas.'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-brand-google' /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Palabras clave globales (keywords)'
                  placeholder='formación profesional, cursos, diplomados, ADPH Group, Perú'
                  value={config.SEO_KEYWORDS || ''}
                  onChange={(e) => handleInputChange('SEO_KEYWORDS', e.target.value)}
                  helperText='Separadas por comas. Se aplican a todo el sitio como base.'
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label='Imagen Open Graph por defecto'
                  placeholder='URL de imagen para redes sociales'
                  value={config.SEO_OG_IMAGE || ''}
                  onChange={(e) => handleInputChange('SEO_OG_IMAGE', e.target.value)}
                  helperText='Imagen que aparece al compartir el sitio en WhatsApp, Facebook, LinkedIn. Recomendado: 1200×630 px.'
                  InputProps={{ startAdornment: <InputAdornment position='start'><i className='tabler-photo' /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-start', pt: '6px !important' }}>
                <Button
                  variant='outlined'
                  fullWidth
                  startIcon={<i className='tabler-photo-up' />}
                  onClick={() => setImagePicker({ key: 'SEO_OG_IMAGE', title: 'Imagen Open Graph' })}
                  sx={{ height: 56 }}
                >
                  Subir imagen
                </Button>
              </Grid>
              {config.SEO_OG_IMAGE && (
                <Grid item xs={12}>
                  <img src={config.SEO_OG_IMAGE} alt='OG Preview' style={{ maxWidth: 300, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider />

          {/* Meta por Página */}
          <Box>
            <SectionLabel>Meta Description por Página</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Personaliza el texto que aparece en los resultados de Google para cada sección del sitio. Máximo 160 caracteres recomendado.
            </Typography>
            <Stack spacing={3}>

              {/* Inicio */}
              <Paper variant='outlined' sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'primary.lighter', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className='tabler-home' style={{ fontSize: 16, color: 'var(--mui-palette-primary-main)' }} />
                  </Box>
                  <Typography variant='subtitle2' fontWeight={700}>Página de Inicio</Typography>
                  <Typography variant='caption' sx={{ ml: 'auto', color: 'text.disabled' }}>/ (home)</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth size='small'
                      label='Meta Title'
                      placeholder={`${config.TEMPLATE_NAME || 'ADPH Group'} | Formación Profesional`}
                      value={config.SEO_HOME_TITLE || ''}
                      onChange={(e) => handleInputChange('SEO_HOME_TITLE', e.target.value)}
                      inputProps={{ maxLength: 70 }}
                      helperText={`${(config.SEO_HOME_TITLE || '').length}/70 caracteres`}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth size='small'
                      label='Meta Description'
                      placeholder='Formación profesional de alto impacto en Gestión Humana, Psicología Organizacional y más.'
                      value={config.SEO_HOME_DESC || ''}
                      onChange={(e) => handleInputChange('SEO_HOME_DESC', e.target.value)}
                      multiline rows={2}
                      inputProps={{ maxLength: 160 }}
                      helperText={`${(config.SEO_HOME_DESC || '').length}/160 caracteres`}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Cursos */}
              {[
                { key: 'SEO_CURSOS_DESC', label: 'Catálogo de Cursos', icon: 'tabler-book', path: '/cursos' },
                { key: 'SEO_PROGRAMAS_DESC', label: 'Programas Ejecutivos', icon: 'tabler-certificate', path: '/programas' },
                { key: 'SEO_DIPLOMADOS_DESC', label: 'Diplomados', icon: 'tabler-award', path: '/diplomados' },
                { key: 'SEO_NOTICIAS_DESC', label: 'Noticias', icon: 'tabler-news', path: '/noticias' },
                { key: 'SEO_NOSOTROS_DESC', label: 'Nosotros / Quiénes Somos', icon: 'tabler-users', path: '/nosotros' },
                { key: 'SEO_CONTACTO_DESC', label: 'Contacto', icon: 'tabler-mail', path: '/contacto' },
              ].map(({ key, label, icon, path }) => (
                <Paper key={key} variant='outlined' sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'primary.lighter', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={icon} style={{ fontSize: 16, color: 'var(--mui-palette-primary-main)' }} />
                    </Box>
                    <Typography variant='subtitle2' fontWeight={700}>{label}</Typography>
                    <Typography variant='caption' sx={{ ml: 'auto', color: 'text.disabled' }}>{path}</Typography>
                  </Box>
                  <TextField
                    fullWidth size='small'
                    label='Meta Description'
                    placeholder={`Explora nuestros ${label.toLowerCase()} en ADPH Group...`}
                    value={config[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    multiline rows={2}
                    inputProps={{ maxLength: 160 }}
                    helperText={`${(config[key] || '').length}/160 caracteres · La URL ${path} no cambia`}
                  />
                </Paper>
              ))}

            </Stack>
          </Box>

          <Divider />

          {/* Preview Google */}
          <Box>
            <SectionLabel>Vista Previa en Google</SectionLabel>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              Así se verá la página de inicio en los resultados de búsqueda:
            </Typography>
            <Paper variant='outlined' sx={{ p: 3, borderRadius: 2, maxWidth: 600 }}>
              <Typography variant='caption' sx={{ color: '#202124', fontFamily: 'Arial, sans-serif' }}>
                {config.SEO_SITE_URL || 'https://adphgroup.com'} › inicio
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{ color: '#1a0dab', fontFamily: 'Arial, sans-serif', fontWeight: 400, lineHeight: 1.3, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                {config.SEO_HOME_TITLE || `${config.TEMPLATE_NAME || 'ADPH Group'} | ${config.TEMPLATE_SLOGAN || 'Formación Profesional'}`}
              </Typography>
              <Typography variant='body2' sx={{ color: '#4d5156', fontFamily: 'Arial, sans-serif', fontSize: '0.8125rem' }}>
                {config.SEO_HOME_DESC || config.TEMPLATE_SLOGAN || 'Descripción de la página de inicio...'}
              </Typography>
            </Paper>
          </Box>

        </Stack>
      )
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
        <CardHeader
          title='Configuración del Sistema'
          subheader='Ajustes técnicos: branding, pasarelas de pago, integraciones y comportamiento de la plataforma'
          className='pbe-2'
          sx={{ flexShrink: 0 }}
          avatar={
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'warning.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className='tabler-settings-2' style={{ fontSize: 22, color: '#fff' }} />
            </Box>
          }
        />
        <Divider sx={{ flexShrink: 0 }} />

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

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
          {tabs.map((tab, i) => (
            <CustomTabPanel key={i} value={tabValue} index={i}>
              {tab.content}
            </CustomTabPanel>
          ))}
        </Box>

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
            {saving ? 'Guardando...' : 'Guardar Configuración'}
          </Button>
        </Box>
      </Paper>

      <MediaLibrary
        open={!!imagePicker}
        onClose={() => setImagePicker(null)}
        onSelect={(url) => {
          if (imagePicker) {
            handleInputChange(imagePicker.key, url)
            enqueueSnackbar('Imagen actualizada — recuerda guardar', { variant: 'info' })
          }

          setImagePicker(null)
        }}
        title={imagePicker?.title || 'Seleccionar Imagen'}
        acceptType='IMAGEN'
      />
    </Box>
  )
}
