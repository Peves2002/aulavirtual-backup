'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'

import { sanitizeDatetimeInput, toLocalDatetimeLocalValue } from '@/utils/functions/sanitizeDatetime'
import type { AlumnoPagoResumen, ConfirmacionCuota, RegistroCuotaAlumno } from '../entity/PagoCuota'
import { useBuscarAlumnosPagos, usePagosAlumno, usePagosMutations } from '../hooks/usePagos'
import { exportExcelReporteAlumno } from '../utils/exportPagosExcel'

type Props = {
  q: string
  onQChange: (value: string) => void
  debouncedQ: string
  alumnoId: string | null
  onSelectAlumno: (id: string | null) => void
}

type DraftRegistro = {
  id: string
  monto_pago: number
  confirmacion: ConfirmacionCuota
  fecha_envio_local: string
  observaciones: string
}

function toDraft(registros: RegistroCuotaAlumno[]): DraftRegistro[] {
  return registros.map(r => ({
    id: r.id,
    monto_pago: r.monto_pago,
    confirmacion: r.confirmacion,
    fecha_envio_local: toLocalDatetimeLocalValue(r.fecha_envio),
    observaciones: r.observaciones ?? ''
  }))
}

function isRowDirty(draft: DraftRegistro, original: RegistroCuotaAlumno) {
  const obsOrig = original.observaciones?.trim() || ''
  const obsDraft = draft.observaciones.trim()
  const fechaOrig = toLocalDatetimeLocalValue(original.fecha_envio)

  return (
    draft.monto_pago !== original.monto_pago ||
    draft.confirmacion !== original.confirmacion ||
    draft.fecha_envio_local !== fechaOrig ||
    obsDraft !== obsOrig
  )
}

export default function PagosPorAlumnoView({
  q,
  onQChange,
  debouncedQ,
  alumnoId,
  onSelectAlumno
}: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const { data: alumnos, isLoading: loadingBusqueda, isFetching } = useBuscarAlumnosPagos(
    debouncedQ,
    !alumnoId
  )
  const { data: detalle, isLoading: loadingDetalle } = usePagosAlumno(alumnoId || undefined)
  const { actualizarRegistro } = usePagosMutations()

  const [draft, setDraft] = useState<DraftRegistro[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!detalle) {
      setDraft([])

      return
    }

    setDraft(toDraft(detalle.registros))
  }, [detalle])

  const originalById = useMemo(() => {
    const map = new Map<string, RegistroCuotaAlumno>()

    for (const r of detalle?.registros ?? []) map.set(r.id, r)

    return map
  }, [detalle])

  const hasChanges = useMemo(() => {
    if (!detalle) return false

    return draft.some(d => {
      const orig = originalById.get(d.id)

      return orig ? isRowDirty(d, orig) : false
    })
  }, [draft, detalle, originalById])

  const updateDraft = (id: string, patch: Partial<DraftRegistro>) => {
    setDraft(prev => prev.map(row => (row.id === id ? { ...row, ...patch } : row)))
  }

  const handleGuardar = async () => {
    if (!detalle || !hasChanges) return

    const dirty = draft.filter(d => {
      const orig = originalById.get(d.id)

      return orig ? isRowDirty(d, orig) : false
    })

    setSaving(true)

    try {
      for (const row of dirty) {
        const orig = originalById.get(row.id)!
        const data: Partial<{
          monto_pago: number
          confirmacion: ConfirmacionCuota
          observaciones: string | null
          fecha_envio: string
        }> = {}

        if (row.monto_pago !== orig.monto_pago) {
          if (Number.isNaN(row.monto_pago) || row.monto_pago < 0) {
            throw new Error('Hay un monto inválido')
          }

          data.monto_pago = row.monto_pago
        }

        if (row.confirmacion !== orig.confirmacion) {
          data.confirmacion = row.confirmacion
        }

        const obsDraft = row.observaciones.trim() || null
        const obsOrig = orig.observaciones?.trim() || null

        if (obsDraft !== obsOrig) {
          data.observaciones = obsDraft
        }

        const fechaOrig = toLocalDatetimeLocalValue(orig.fecha_envio)

        if (row.fecha_envio_local !== fechaOrig) {
          const iso = sanitizeDatetimeInput(row.fecha_envio_local)

          if (!iso) throw new Error('Hay una fecha de envío inválida')
          data.fecha_envio = iso
        }

        await actualizarRegistro.mutateAsync({ id: row.id, data })
      }

      enqueueSnackbar('Cambios guardados', { variant: 'success' })
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'Error al guardar', {
        variant: 'error'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleExportarAlumnoExcel = () => {
    if (!detalle || detalle.registros.length === 0) return

    try {
      exportExcelReporteAlumno({
        alumno: detalle.alumno.alumno,
        dni: detalle.alumno.dni,
        correo: detalle.alumno.correo,
        filas: detalle.registros.map(row => ({
          curso_titulo: row.curso_titulo,
          categoria_nombre: row.categoria_nombre,
          subcategoria_nombre: row.subcategoria_nombre,
          numero_cuota: row.numero_cuota,
          monto_pago: row.monto_pago,
          confirmacion: row.confirmacion,
          fecha_envio: row.fecha_envio,
          observaciones: row.observaciones,
          modulosCuota: row.modulos_cuota ?? []
        }))
      })
      enqueueSnackbar('Excel descargado', { variant: 'success' })
    } catch (err: any) {
      enqueueSnackbar(err?.message || 'No se pudo exportar el Excel', { variant: 'error' })
    }
  }

  if (alumnoId) {
    return (
      <Box>
        {loadingDetalle ? (
          <Box className='flex justify-center py-10'>
            <CircularProgress />
          </Box>
        ) : !detalle ? (
          <Paper className='p-6 text-center'>
            <Typography color='text.secondary'>No se encontraron pagos para este alumno.</Typography>
          </Paper>
        ) : (
          <>
            <Box className='mb-4' sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box className='flex-1'>
                <Typography variant='h6' fontWeight={700}>
                  {detalle.alumno.alumno}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  DNI: {detalle.alumno.dni || '—'} · {detalle.alumno.correo}
                </Typography>
              </Box>
              <Button
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-file-spreadsheet' />}
                onClick={handleExportarAlumnoExcel}
                disabled={detalle.registros.length === 0}
              >
                Excel
              </Button>
              <Button
                variant='contained'
                size='small'
                startIcon={<i className='tabler-device-floppy' />}
                onClick={() => void handleGuardar()}
                disabled={!hasChanges || saving}
              >
                {saving ? 'Guardando…' : 'Guardar'}
              </Button>
            </Box>

            {detalle.registros.length === 0 ? (
              <Paper className='p-6 text-center'>
                <Typography color='text.secondary'>
                  Este alumno aún no tiene cuotas registradas.
                </Typography>
              </Paper>
            ) : (
              <TableContainer component={Paper}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>PROGRAMA</TableCell>
                      <TableCell>CATEGORÍA</TableCell>
                      <TableCell width={90}>CUOTA</TableCell>
                      <TableCell sx={{ width: 120, minWidth: 120 }}>MONTO PAGÓ</TableCell>
                      <TableCell width={180}>CONFIRMACIÓN</TableCell>
                      <TableCell width={210}>FECHA ENVÍO</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>OBSERVACIONES</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detalle.registros.map(row => {
                      const d = draft.find(x => x.id === row.id)

                      if (!d) return null

                      return (
                        <TableRow key={row.id} hover>
                          <TableCell>
                            <Typography variant='body2' fontWeight={600}>
                              {row.curso_titulo}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {[row.categoria_nombre, row.subcategoria_nombre].filter(Boolean).join(' / ') ||
                              '—'}
                          </TableCell>
                          <TableCell>
                            <Chip size='small' label={`#${row.numero_cuota}`} />
                          </TableCell>
                          <TableCell sx={{ width: 120, minWidth: 120 }}>
                            <TextField
                              size='small'
                              type='number'
                              value={d.monto_pago}
                              sx={{ width: 100 }}
                              inputProps={{ min: 0, step: '0.01', style: { textAlign: 'right' } }}
                              onChange={e => {
                                const m = Number(e.target.value)

                                updateDraft(row.id, {
                                  monto_pago: Number.isNaN(m) ? 0 : m
                                })
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={d.confirmacion === 'ENVIADO'}
                                  onChange={(_, checked) =>
                                    updateDraft(row.id, {
                                      confirmacion: checked ? 'ENVIADO' : 'NO_ENVIADO'
                                    })
                                  }
                                />
                              }
                              label={d.confirmacion === 'ENVIADO' ? 'Enviado' : 'No enviado'}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size='small'
                              type='datetime-local'
                              value={d.fecha_envio_local}
                              InputLabelProps={{ shrink: true }}
                              onChange={e =>
                                updateDraft(row.id, { fecha_envio_local: e.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size='small'
                              fullWidth
                              multiline
                              maxRows={3}
                              placeholder='Opcional'
                              value={d.observaciones}
                              inputProps={{ maxLength: 500 }}
                              onChange={e => updateDraft(row.id, { observaciones: e.target.value })}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Box>
    )
  }

  const seleccionar = (alumno: AlumnoPagoResumen) => {
    onSelectAlumno(alumno.id)
  }

  return (
    <Box className='flex flex-col gap-4'>
      <Paper className='p-4'>
        <TextField
          fullWidth
          size='small'
          label='Buscar alumno'
          placeholder='Nombre, apellido o DNI'
          value={q}
          onChange={e => onQChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-search' />
              </InputAdornment>
            )
          }}
        />
        <Typography variant='caption' color='text.secondary' display='block' className='mt-2'>
          Escribe al menos 2 caracteres para buscar alumnos con cuotas registradas.
        </Typography>
      </Paper>

      {debouncedQ.length < 2 ? (
        <Paper className='p-6 text-center'>
          <Typography color='text.secondary'>
            Busca por nombre, apellido o DNI para ver los pagos por cuotas del alumno.
          </Typography>
        </Paper>
      ) : loadingBusqueda || isFetching ? (
        <Box className='flex justify-center py-10'>
          <CircularProgress />
        </Box>
      ) : !(alumnos?.length) ? (
        <Paper className='p-6 text-center'>
          <Typography color='text.secondary'>
            No se encontraron alumnos con cuotas para “{debouncedQ}”.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>ALUMNO</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>CUOTAS</TableCell>
                <TableCell>ENVIADOS</TableCell>
                <TableCell>MONTO ENVIADO</TableCell>
                <TableCell align='right'>ACCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.map(alumno => (
                <TableRow key={alumno.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {alumno.alumno}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {alumno.correo}
                    </Typography>
                  </TableCell>
                  <TableCell>{alumno.dni || '—'}</TableCell>
                  <TableCell>{alumno.totalCuotas}</TableCell>
                  <TableCell>{alumno.enviados}</TableCell>
                  <TableCell>S/ {alumno.montoTotal.toFixed(2)}</TableCell>
                  <TableCell align='right'>
                    <Button size='small' variant='contained' onClick={() => seleccionar(alumno)}>
                      Ver pagos
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
