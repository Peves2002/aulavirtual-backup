'use client'

import { useRef, useState } from 'react'

import {
  Alert, Box, Button, Chip, CircularProgress, Divider,
  Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Tooltip, Typography
} from '@mui/material'
import * as XLSX from 'xlsx'
import { getSession } from 'next-auth/react'

import AppModal from '@/utils/components/AppModal'
import { AxiosPedido } from '../http/axiosPedido'

type Step = 'upload' | 'preview' | 'result'

interface FilaPreview {
  fila: number
  DNI_ESTUDIANTE: string
  CORREO: string
  NOMBRES: string
  APELLIDOS: string
  CELULAR: string
  CURSO_SLUG: string
  MONTO_PAGADO: string
  METODO_PAGO: string
  errores: string[]
}

interface ImportarPedidosModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const COLUMNAS_PLANTILLA = ['DNI_ESTUDIANTE', 'CORREO', 'NOMBRES', 'APELLIDOS', 'CELULAR', 'CURSO_SLUG', 'MONTO_PAGADO', 'METODO_PAGO']

function validarFila(row: any, fila: number): FilaPreview {
  const errores: string[] = []
  const DNI_ESTUDIANTE = String(row.DNI_ESTUDIANTE || '').trim()
  const CORREO = String(row.CORREO || '').trim()
  const NOMBRES = String(row.NOMBRES || '').trim()
  const APELLIDOS = String(row.APELLIDOS || '').trim()
  const CELULAR = String(row.CELULAR || '').trim()
  const CURSO_SLUG = String(row.CURSO_SLUG || '').trim()
  const MONTO_PAGADO = String(row.MONTO_PAGADO || '').trim()
  const METODO_PAGO = String(row.METODO_PAGO || '').trim()

  if (!DNI_ESTUDIANTE || !/^\d{8}$/.test(DNI_ESTUDIANTE)) errores.push('DNI debe tener exactamente 8 dígitos')
  if (!CORREO || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CORREO)) errores.push('Correo inválido')
  if (!NOMBRES || NOMBRES.length < 2) errores.push('Nombres inválidos (mínimo 2 caracteres)')
  if (!APELLIDOS || APELLIDOS.length < 2) errores.push('Apellidos inválidos (mínimo 2 caracteres)')
  if (CELULAR && !/^9\d{8}$/.test(CELULAR)) errores.push('Celular: formato 9XXXXXXXX')
  if (!CURSO_SLUG) errores.push('CURSO_SLUG es obligatorio')
  
  const montoNum = Number(MONTO_PAGADO)

  if (MONTO_PAGADO === '' || isNaN(montoNum) || montoNum < 0) errores.push('Monto pagado inválido (debe ser un número mayor o igual a 0)')

  return { fila, DNI_ESTUDIANTE, CORREO, NOMBRES, APELLIDOS, CELULAR, CURSO_SLUG, MONTO_PAGADO, METODO_PAGO, errores }
}

function descargarPlantilla() {
  const datos = [
    COLUMNAS_PLANTILLA,
    ['12345678', 'alumno@ejemplo.com', 'Juan', 'Pérez', '987654321', 'mi-curso-slug', '150.00', 'TRANSFERENCIA']
  ]

  const ws = XLSX.utils.aoa_to_sheet(datos)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Pedidos')
  XLSX.writeFile(wb, 'plantilla_pedidos.xlsx')
}

function descargarReporteErrores(errores: string[]) {
  const datos = [
    ['Detalle del error'],
    ...errores.map(e => [e])
  ]

  const ws = XLSX.utils.aoa_to_sheet(datos)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Errores')
  XLSX.writeFile(wb, 'reporte_errores_importacion.xlsx')
}

export default function ModalImportarPedidos({ open, onClose, onSuccess }: ImportarPedidosModalProps) {
  const [step, setStep] = useState<Step>('upload')
  const [filas, setFilas] = useState<FilaPreview[]>([])
  const [dragging, setDragging] = useState(false)
  const [resultado, setResultado] = useState<{ creados: number; errores: number; detallesErrores: string[] } | null>(null)
  const [isPending, setIsPending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClose_ = () => {
    setStep('upload')
    setFilas([])
    setResultado(null)
    onClose()
  }

  const parsearArchivo = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const wb = XLSX.read(data, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' })
      const parseadas = rows.map((row, idx) => validarFila(row, idx + 2))

      setFilas(parseadas)
      setStep('preview')
    }

    reader.readAsArrayBuffer(file)
  }

  const handleFile = (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) return
    parsearArchivo(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]

    if (file) handleFile(file)
  }

  const handleImportar = async () => {
    const validas = filas.filter(f => f.errores.length === 0)

    if (validas.length === 0) return

    setIsPending(true)

    try {
      const session = await getSession()
      const token = session?.user?.accessToken ?? null
      const axiosPedido = new AxiosPedido({ getAuthToken: () => token })

      const res = await axiosPedido.importarPedidos(validas.map(v => ({
        ...v,
        MONTO_PAGADO: Number(v.MONTO_PAGADO)
      })))

      setResultado({
        creados: res.creados || 0,
        errores: res.errores || 0,
        detallesErrores: res.detallesErrores || []
      })
      
      if (res.creados > 0) {
        onSuccess()
      }

      setStep('result')
    } catch (err: any) {
      setResultado({ creados: 0, errores: 1, detallesErrores: [err?.message || 'Error de conexión al importar'] })
      setStep('result')
    } finally {
      setIsPending(false)
    }
  }

  const validas = filas.filter(f => f.errores.length === 0)
  const invalidas = filas.filter(f => f.errores.length > 0)

  return (
    <AppModal open={open} handleClose={handleClose_} sx={{ maxWidth: 800 }}>

      {/* PASO 1: Upload */}
      {step === 'upload' && (
        <Stack spacing={3}>
          <Box>
            <Typography variant='h5' fontWeight={700}>Importar Pedidos Masivos desde Excel</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              Sube un archivo .xlsx con los datos de los pedidos. Si el usuario no existe, será creado usando su DNI como contraseña.
            </Typography>
          </Box>

          {/* Zona drag & drop */}
          <Box
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: '2px dashed',
              borderColor: dragging ? 'primary.main' : 'divider',
              borderRadius: 3,
              p: 5,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: dragging ? 'primary.lighterOpacity' : 'action.hover',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.lighterOpacity' }
            }}
          >
            <i className='tabler-file-spreadsheet' style={{ fontSize: 48, color: '#25927F', marginBottom: 8 }} />
            <Typography variant='subtitle1' fontWeight={600}>Arrastra tu archivo aquí</Typography>
            <Typography variant='body2' color='text.secondary'>o haz clic para seleccionar (.xlsx, .xls)</Typography>
            <input
              ref={fileInputRef}
              type='file'
              accept='.xlsx,.xls'
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files?.[0]) handleFile(e.target.files[0])
                e.target.value = ''
              }}
            />
          </Box>

          <Divider>o</Divider>

          <Stack direction='row' spacing={2} justifyContent='center'>
            <Button
              variant='contained'
              color='success'
              startIcon={<i className='tabler-download' />}
              onClick={descargarPlantilla}
            >
              Descargar Plantilla
            </Button>
          </Stack>

          <Alert severity='success' sx={{ borderRadius: 2 }}>
            <strong>Columnas requeridas:</strong> DNI_ESTUDIANTE, CORREO, NOMBRES, APELLIDOS, CURSO_SLUG, MONTO_PAGADO<br />
            <strong>Opcionales:</strong> CELULAR, METODO_PAGO
          </Alert>
        </Stack>
      )}

      {/* PASO 2: Vista previa */}
      {step === 'preview' && (
        <Stack spacing={3}>
          <Box>
            <Typography variant='h5' fontWeight={700}>Vista Previa de Pedidos</Typography>
            <Stack direction='row' spacing={1.5} sx={{ mt: 1 }}>
              <Chip label={`${validas.length} válidos`} color='success' size='small' variant='tonal' />
              {invalidas.length > 0 && (
                <Chip label={`${invalidas.length} con errores locales`} color='error' size='small' variant='tonal' />
              )}
            </Stack>
          </Box>

          <TableContainer sx={{ maxHeight: 340, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Table size='small' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Fila</TableCell>
                  <TableCell>Estudiante</TableCell>
                  <TableCell>DNI</TableCell>
                  <TableCell>Slug Curso</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filas.map(f => (
                  <TableRow
                    key={f.fila}
                    sx={{ bgcolor: f.errores.length > 0 ? 'error.lighterOpacity' : undefined }}
                  >
                    <TableCell>{f.fila}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{f.NOMBRES} {f.APELLIDOS}</Typography>
                      <Typography variant="caption" color="text.secondary">{f.CORREO}</Typography>
                    </TableCell>
                    <TableCell>{f.DNI_ESTUDIANTE}</TableCell>
                    <TableCell>{f.CURSO_SLUG}</TableCell>
                    <TableCell>S/ {f.MONTO_PAGADO}</TableCell>
                    <TableCell>
                      {f.errores.length === 0 ? (
                        <Chip label='Válido' color='success' size='small' variant='tonal' />
                      ) : (
                        <Tooltip title={f.errores.join(' · ')} arrow>
                          <Chip label='Error' color='error' size='small' variant='tonal' sx={{ cursor: 'help' }} />
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction='row' justifyContent='space-between'>
            <Button variant='outlined' color='secondary' onClick={() => setStep('upload')}
              startIcon={<i className='tabler-arrow-left' />}
            >
              Volver
            </Button>
            <Button
              variant='contained'
              disabled={validas.length === 0 || isPending}
              onClick={handleImportar}
              startIcon={isPending ? <CircularProgress size={16} color='inherit' /> : <i className='tabler-upload' />}
            >
              {isPending ? 'Importando...' : `Importar ${validas.length} pedidos`}
            </Button>
          </Stack>
        </Stack>
      )}

      {/* PASO 3: Resultado */}
      {step === 'result' && resultado && (
        <Stack spacing={3}>
          <Typography variant='h5' fontWeight={700}>Resultado de la Importación</Typography>

          <Stack direction='row' spacing={2}>
            <Alert severity='success' sx={{ flex: 1, borderRadius: 2 }}>
              <strong>{resultado.creados}</strong> pedidos creados exitosamente
            </Alert>
            {resultado.errores > 0 && (
              <Alert severity='error' sx={{ flex: 1, borderRadius: 2 }}>
                <strong>{resultado.errores}</strong> pedidos rechazados por el servidor
              </Alert>
            )}
          </Stack>

          {resultado.errores > 0 && (
            <>
              <TableContainer sx={{ maxHeight: 260, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table size='small' stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mensaje de Error del Servidor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultado.detallesErrores.map((msg, i) => (
                      <TableRow key={i}>
                        <TableCell>{msg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant='outlined'
                startIcon={<i className='tabler-download' />}
                onClick={() => descargarReporteErrores(resultado.detallesErrores)}
                sx={{ alignSelf: 'flex-start' }}
              >
                Descargar reporte de errores
              </Button>
            </>
          )}

          <Stack direction='row' justifyContent='flex-end'>
            <Button variant='contained' onClick={handleClose_}>
              Cerrar
            </Button>
          </Stack>
        </Stack>
      )}
    </AppModal>
  )
}
