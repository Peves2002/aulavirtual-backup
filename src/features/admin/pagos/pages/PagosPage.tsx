'use client'

import { useEffect, useMemo, useState } from 'react'

import { usePathname } from 'next/navigation'

import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'

import AppModal from '@/utils/components/AppModal'
import { sanitizeDatetimeInput, toLocalDatetimeLocalValue } from '@/utils/functions/sanitizeDatetime'
import PagosPorAlumnoView from '../components/PagosPorAlumnoView'
import type { ConfirmacionCuota, CuotaReciente, RegistroCuotaManual, VistaPagosMode } from '../entity/PagoCuota'
import { usePagosCurso, usePagosFiltros, usePagosMutations, usePagosRecientes } from '../hooks/usePagos'
import { exportExcelTablaCuota } from '../utils/exportPagosExcel'

type DraftRegistroCuota = {
  id: string
  monto_pago: number
  confirmacion: ConfirmacionCuota
  fecha_envio_local: string
  observaciones: string
}

function toTablaDraft(registros: RegistroCuotaManual[]): DraftRegistroCuota[] {
  return registros.map(r => ({
    id: r.id,
    monto_pago: r.monto_pago,
    confirmacion: r.confirmacion,
    fecha_envio_local: toLocalDatetimeLocalValue(r.fecha_envio),
    observaciones: r.observaciones ?? ''
  }))
}

function isTablaRowDirty(draft: DraftRegistroCuota, original: RegistroCuotaManual) {
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

export default function PagosPage() {
  const { enqueueSnackbar } = useSnackbar()
  const pathname = usePathname()

  const [vistaMode, setVistaMode] = useState<VistaPagosMode>('categoria')
  const [alumnoQ, setAlumnoQ] = useState('')
  const [alumnoDebouncedQ, setAlumnoDebouncedQ] = useState('')
  const [alumnoId, setAlumnoId] = useState<string | null>(null)

  const [categoriaId, setCategoriaId] = useState('')
  const [subcategoriaId, setSubcategoriaId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [cuotaInspeccion, setCuotaInspeccion] = useState<number | null>(null)
  const [openCrear, setOpenCrear] = useState(false)
  const [openEliminar, setOpenEliminar] = useState(false)
  const [cuotaAEliminar, setCuotaAEliminar] = useState<number | null>(null)
  const [moduloDraft, setModuloDraft] = useState<string[]>([])
  const [tablaDraft, setTablaDraft] = useState<DraftRegistroCuota[]>([])
  const [savingCambios, setSavingCambios] = useState(false)

  useEffect(() => {
    setVistaMode('categoria')
    setAlumnoQ('')
    setAlumnoDebouncedQ('')
    setAlumnoId(null)
    setCategoriaId('')
    setSubcategoriaId('')
    setCursoId('')
    setCuotaInspeccion(null)
    setModuloDraft([])
    setTablaDraft([])
    setOpenCrear(false)
    setOpenEliminar(false)
    setCuotaAEliminar(null)
  }, [pathname])

  useEffect(() => {
    const t = setTimeout(() => setAlumnoDebouncedQ(alumnoQ.trim()), 350)

    return () => clearTimeout(t)
  }, [alumnoQ])

  const { data: filtros, isLoading: loadingFiltros } = usePagosFiltros(
    categoriaId || undefined,
    subcategoriaId || undefined
  )

  const { data: recientes, isLoading: loadingRecientes } = usePagosRecientes(
    vistaMode === 'categoria' && cuotaInspeccion == null
  )

  const { data: cursoData, isLoading: loadingCurso, isFetching } = usePagosCurso(
    vistaMode === 'categoria' ? cursoId || undefined : undefined
  )

  const { crearTabla, actualizarRegistro, eliminarTabla, guardarAccesos } = usePagosMutations(
    cursoId || undefined
  )

  const registrosCuota = useMemo(() => {
    if (!cursoData || cuotaInspeccion == null) return []

    return cursoData.registros
      .filter(r => r.numero_cuota === cuotaInspeccion)
      .toSorted((a, b) => a.alumno.localeCompare(b.alumno, 'es', { sensitivity: 'base' }))
  }, [cursoData, cuotaInspeccion])

  const registrosKey = registrosCuota
    .map(
      r =>
        `${r.id}:${r.monto_pago}:${r.confirmacion}:${r.fecha_envio}:${r.observaciones ?? ''}`
    )
    .join('|')

  useEffect(() => {
    setTablaDraft(toTablaDraft(registrosCuota))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuotaInspeccion, cursoId, registrosKey])

  const originalById = useMemo(() => {
    const map = new Map<string, RegistroCuotaManual>()

    for (const r of registrosCuota) map.set(r.id, r)

    return map
  }, [registrosCuota])

  const enviadosCount = useMemo(
    () => tablaDraft.filter(r => r.confirmacion === 'ENVIADO').length,
    [tablaDraft]
  )

  const modulosBloqueados = useMemo(() => {
    if (!cursoData || cuotaInspeccion == null) return new Set<string>()

    const ids = new Set<string>()

    for (const [cuotaKey, mods] of Object.entries(cursoData.modulosPorCuota ?? {})) {
      if (Number(cuotaKey) < cuotaInspeccion) {
        for (const id of mods) ids.add(id)
      }
    }

    return ids
  }, [cursoData, cuotaInspeccion])

  const modulosGuardadosKey =
    cuotaInspeccion != null
      ? (cursoData?.modulosPorCuota?.[String(cuotaInspeccion)] ?? []).join('|')
      : ''

  const modulosBloqueadosKey = [...modulosBloqueados].sort().join('|')

  useEffect(() => {
    if (cuotaInspeccion == null) {
      setModuloDraft([])
      setTablaDraft([])

      return
    }

    const deEstaCuota = modulosGuardadosKey ? modulosGuardadosKey.split('|') : []
    const previos = modulosBloqueadosKey ? modulosBloqueadosKey.split('|') : []

    setModuloDraft([...new Set([...previos, ...deEstaCuota])])
  }, [cuotaInspeccion, cursoId, modulosGuardadosKey, modulosBloqueadosKey])

  const modulosBaseline = useMemo(() => {
    const deEstaCuota = modulosGuardadosKey ? modulosGuardadosKey.split('|').filter(Boolean) : []
    const previos = modulosBloqueadosKey ? modulosBloqueadosKey.split('|').filter(Boolean) : []

    return [...new Set([...previos, ...deEstaCuota])].sort().join('|')
  }, [modulosGuardadosKey, modulosBloqueadosKey])

  const hasTablaChanges = useMemo(() => {
    return tablaDraft.some(d => {
      const orig = originalById.get(d.id)

      return orig ? isTablaRowDirty(d, orig) : false
    })
  }, [tablaDraft, originalById])

  const hasModulosChanges = useMemo(() => {
    return [...moduloDraft].sort().join('|') !== modulosBaseline
  }, [moduloDraft, modulosBaseline])

  const hasCambiosPendientes = hasTablaChanges || hasModulosChanges

  const resetDetalle = () => {
    setCuotaInspeccion(null)
    setModuloDraft([])
    setTablaDraft([])
  }

  const updateTablaDraft = (id: string, patch: Partial<DraftRegistroCuota>) => {
    setTablaDraft(prev => prev.map(row => (row.id === id ? { ...row, ...patch } : row)))
  }

  const resetFiltros = () => {
    setCategoriaId('')
    setSubcategoriaId('')
    setCursoId('')
  }

  const handleVistaMode = (_: React.MouseEvent<HTMLElement>, value: VistaPagosMode | null) => {
    if (!value) return

    setVistaMode(value)
    resetDetalle()
    setAlumnoId(null)
    resetFiltros()
    setAlumnoQ('')
    setAlumnoDebouncedQ('')
  }

  const handleVolver = () => {
    if (vistaMode === 'alumno' && alumnoId) {
      setAlumnoId(null)

      return
    }

    resetDetalle()
    resetFiltros()
  }

  const handleCategoria = (id: string) => {
    setCategoriaId(id)
    setSubcategoriaId('')
    setCursoId('')
    resetDetalle()
  }

  const handleSubcategoria = (id: string) => {
    setSubcategoriaId(id)
    setCursoId('')
    resetDetalle()
  }

  const handleCrearTabla = async () => {
    try {
      const res = await crearTabla.mutateAsync()

      enqueueSnackbar(`Cuota #${res.numeroCuota} creada: ${res.creados} alumno(s)`, { variant: 'success' })
      setOpenCrear(false)
      setCuotaInspeccion(null)
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'No se pudo crear la cuota', {
        variant: 'error'
      })
    }
  }

  const abrirEliminarTabla = (numeroCuota: number) => {
    setCuotaAEliminar(numeroCuota)
    setOpenEliminar(true)
  }

  const handleEliminarTabla = async () => {
    if (cuotaAEliminar == null || !cursoId) return

    try {
      const res = await eliminarTabla.mutateAsync({ numeroCuota: cuotaAEliminar })

      enqueueSnackbar(
        `Tabla cuota #${cuotaAEliminar} eliminada (${res.registrosEliminados} registro(s))`,
        { variant: 'success' }
      )
      setOpenEliminar(false)
      setCuotaAEliminar(null)

      if (cuotaInspeccion === cuotaAEliminar) {
        resetDetalle()
      }
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'No se pudo eliminar la tabla', {
        variant: 'error'
      })
    }
  }

  const toggleModulo = (moduloId: string) => {
    if (modulosBloqueados.has(moduloId)) return

    setModuloDraft(prev => (prev.includes(moduloId) ? prev.filter(id => id !== moduloId) : [...prev, moduloId]))
  }

  const handleGuardarCambios = async () => {
    if (cuotaInspeccion == null || !cursoId || !hasCambiosPendientes) return

    setSavingCambios(true)

    try {
      const dirty = tablaDraft.filter(d => {
        const orig = originalById.get(d.id)

        return orig ? isTablaRowDirty(d, orig) : false
      })

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

      if (hasModulosChanges) {
        const res = await guardarAccesos.mutateAsync({
          numeroCuota: cuotaInspeccion,
          moduloIds: moduloDraft
        })

        enqueueSnackbar(
          `Cambios guardados. Accesos recalculados (${res.alumnosAfectados} enviado(s)).`,
          { variant: 'success' }
        )
      } else {
        enqueueSnackbar('Cambios guardados', { variant: 'success' })
      }
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'Error al guardar cambios', {
        variant: 'error'
      })
    } finally {
      setSavingCambios(false)
    }
  }

  const labelOf = (item: { nombre?: string; titulo?: string }) => item.nombre || item.titulo || ''
  const cursoTitulo = cursoData?.curso.titulo ?? 'Programa'
  const siguienteCuota = cursoData?.siguienteCuota ?? 1

  const modulosTitulosCuota = useMemo(() => {
    if (!cursoData || cuotaInspeccion == null) return []

    const ids = cursoData.modulosPorCuota?.[String(cuotaInspeccion)] ?? []
    const byId = new Map(cursoData.modulos.map(m => [m.id, m.titulo]))

    return ids.map(id => byId.get(id)).filter((t): t is string => Boolean(t))
  }, [cursoData, cuotaInspeccion])

  const handleExportarTablaExcel = () => {
    if (cuotaInspeccion == null || registrosCuota.length === 0) return

    try {
      exportExcelTablaCuota({
        cursoTitulo,
        numeroCuota: cuotaInspeccion,
        modulosCuota: modulosTitulosCuota,
        filas: registrosCuota.map(row => ({
          alumno: row.alumno,
          dni: row.dni,
          correo: row.correo,
          numero_cuota: row.numero_cuota,
          monto_pago: row.monto_pago,
          confirmacion: row.confirmacion,
          fecha_envio: row.fecha_envio,
          observaciones: row.observaciones
        }))
      })
      enqueueSnackbar('Excel descargado', { variant: 'success' })
    } catch (err: any) {
      enqueueSnackbar(err?.message || 'No se pudo exportar el Excel', { variant: 'error' })
    }
  }

  const formatFecha = (value: string | null) => {
    if (!value) return '—'

    try {
      return new Date(value).toLocaleString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return '—'
    }
  }

  const inspeccionarReciente = (item: CuotaReciente) => {
    if (item.categoria_id) setCategoriaId(item.categoria_id)
    if (item.subcategoria_id) setSubcategoriaId(item.subcategoria_id)
    setCursoId(item.curso_id)
    setCuotaInspeccion(item.numero_cuota)
    setModuloDraft([])
  }

  return (
    <Box className='flex flex-col gap-6 p-6'>
      <Stack direction='row' alignItems='flex-start' justifyContent='space-between' spacing={2}>
        <Box>
          <Typography variant='h4' className='font-semibold'>
            Pagos
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Registro manual de cuotas (lista física). No usa pasarelas de pago.
          </Typography>
        </Box>
        {cuotaInspeccion != null || (vistaMode === 'alumno' && alumnoId) ? (
          <Button
            variant='outlined'
            startIcon={<i className='tabler-arrow-left' />}
            onClick={handleVolver}
            sx={{ flexShrink: 0 }}
          >
            Volver
          </Button>
        ) : null}
      </Stack>

      {cuotaInspeccion == null && !alumnoId ? (
        <ToggleButtonGroup
          exclusive
          color='primary'
          value={vistaMode}
          onChange={handleVistaMode}
          size='small'
        >
          <ToggleButton value='categoria'>Por categoría</ToggleButton>
          <ToggleButton value='alumno'>Por alumno</ToggleButton>
        </ToggleButtonGroup>
      ) : null}

      {vistaMode === 'alumno' ? (
        <PagosPorAlumnoView
          q={alumnoQ}
          onQChange={setAlumnoQ}
          debouncedQ={alumnoDebouncedQ}
          alumnoId={alumnoId}
          onSelectAlumno={setAlumnoId}
        />
      ) : null}

      {vistaMode === 'categoria' && cuotaInspeccion == null ? (
        <Paper className='p-4'>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth size='small' disabled={loadingFiltros}>
              <InputLabel>Categoría</InputLabel>
              <Select label='Categoría' value={categoriaId} onChange={e => handleCategoria(e.target.value)}>
                {(filtros?.categorias ?? []).map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {labelOf(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size='small' disabled={!categoriaId || loadingFiltros}>
              <InputLabel>Subcategoría</InputLabel>
              <Select
                label='Subcategoría'
                value={subcategoriaId}
                onChange={e => handleSubcategoria(e.target.value)}
              >
                {(filtros?.subcategorias ?? []).map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {labelOf(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size='small' disabled={!subcategoriaId || loadingFiltros}>
              <InputLabel>Programa</InputLabel>
              <Select
                label='Programa'
                value={cursoId}
                onChange={e => {
                  setCursoId(e.target.value)
                  resetDetalle()
                }}
              >
                {(filtros?.programas ?? []).map(p => (
                  <MenuItem key={p.id} value={p.id}>
                    {labelOf(p)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      ) : null}

      {vistaMode === 'categoria' && cuotaInspeccion == null && !cursoId ? (
        <Box>
          <Typography variant='h6' className='mb-3'>
            Últimas cuotas agregadas
          </Typography>

          {loadingRecientes ? (
            <Box className='flex justify-center py-10'>
              <CircularProgress />
            </Box>
          ) : !(recientes?.length) ? (
            <Paper className='p-6 text-center'>
              <Typography color='text.secondary'>
                Todavía no hay tablas de cuota. Usa los filtros y pulsa <strong>Agregar cuota</strong>.
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>PROGRAMA</TableCell>
                    <TableCell>CATEGORÍA</TableCell>
                    <TableCell>CUOTA</TableCell>
                    <TableCell>ALUMNOS</TableCell>
                    <TableCell>ENVIADOS</TableCell>
                    <TableCell>MONTO</TableCell>
                    <TableCell>CREADA</TableCell>
                    <TableCell align='right'>ACCIÓN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recientes.map(item => (
                    <TableRow key={`${item.curso_id}-${item.numero_cuota}`} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight={600}>
                          {item.curso_titulo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {[item.categoria_nombre, item.subcategoria_nombre].filter(Boolean).join(' / ') ||
                            '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip size='small' label={`#${item.numero_cuota}`} />
                      </TableCell>
                      <TableCell>{item.totalAlumnos}</TableCell>
                      <TableCell>{item.enviados}</TableCell>
                      <TableCell>S/ {item.montoTotal.toFixed(2)}</TableCell>
                      <TableCell>{formatFecha(item.creado_en)}</TableCell>
                      <TableCell align='right'>
                        <Button size='small' variant='contained' onClick={() => inspeccionarReciente(item)}>
                          Inspeccionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : null}

      {vistaMode === 'categoria' && cursoId && cuotaInspeccion == null ? (
        <Box>
          <Stack direction='row' justifyContent='space-between' alignItems='center' className='mb-3'>
            <Typography variant='h6'>
              Tablas de cuotas
              {isFetching ? <CircularProgress size={16} className='ml-2 align-middle' /> : null}
            </Typography>
            <Button variant='contained' onClick={() => setOpenCrear(true)}>
              Agregar cuota
            </Button>
          </Stack>

          {loadingCurso ? (
            <Box className='flex justify-center py-10'>
              <CircularProgress />
            </Box>
          ) : !(cursoData?.tablas?.length) ? (
            <Paper className='p-6 text-center'>
              <Typography color='text.secondary' className='mb-3'>
                Aún no hay tablas. Hay {cursoData?.totalInscritos ?? 0} alumno(s) inscrito(s) en{' '}
                <strong>{cursoTitulo}</strong>.
              </Typography>
              <Button variant='outlined' onClick={() => setOpenCrear(true)}>
                Agregar cuota
              </Button>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {cursoData.tablas.map(tabla => (
                <Paper
                  key={tabla.numero_cuota}
                  className='p-4'
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 2
                  }}
                >
                  <Box>
                    <Typography variant='subtitle1' fontWeight={700}>
                      {cursoTitulo} — Cuota #{tabla.numero_cuota}
                    </Typography>
                    <Stack direction='row' spacing={1} className='mt-1' flexWrap='wrap' useFlexGap>
                      <Chip size='small' label={`${tabla.totalAlumnos} alumno(s)`} />
                      <Chip
                        size='small'
                        color={tabla.enviados > 0 ? 'success' : 'default'}
                        label={`${tabla.enviados} enviado(s)`}
                      />
                      <Chip size='small' variant='outlined' label={`S/ ${tabla.montoTotal.toFixed(2)}`} />
                    </Stack>
                  </Box>
                  <Stack direction='row' spacing={1} alignItems='center' flexShrink={0}>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setCuotaInspeccion(tabla.numero_cuota)
                        setModuloDraft([])
                      }}
                    >
                      Inspeccionar
                    </Button>
                    <Tooltip title='Eliminar tabla'>
                      <IconButton
                        color='error'
                        aria-label='Eliminar tabla'
                        onClick={() => abrirEliminarTabla(tabla.numero_cuota)}
                      >
                        <i className='tabler-trash text-[22px]' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      ) : null}

      {vistaMode === 'categoria' && cursoId && cuotaInspeccion != null ? (
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems='stretch'>
          <Box className='flex-1 min-w-0'>
            <Stack direction='row' alignItems='center' spacing={1} className='mb-3'>
              <Box className='flex-1'>
                <Typography variant='h6'>
                  {cursoTitulo} — Cuota #{cuotaInspeccion}
                  {isFetching ? <CircularProgress size={16} className='ml-2 align-middle' /> : null}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Vista interna de la tabla de cuotas
                </Typography>
              </Box>
              <Button
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-file-spreadsheet' />}
                onClick={handleExportarTablaExcel}
                disabled={registrosCuota.length === 0}
              >
                Excel
              </Button>
              <Button variant='outlined' size='small' onClick={() => setOpenCrear(true)}>
                Agregar cuota
              </Button>
              <Tooltip title='Eliminar tabla'>
                <IconButton
                  color='error'
                  size='small'
                  aria-label='Eliminar tabla'
                  onClick={() => abrirEliminarTabla(cuotaInspeccion)}
                >
                  <i className='tabler-trash text-[22px]' />
                </IconButton>
              </Tooltip>
            </Stack>

            {loadingCurso ? (
              <Box className='flex justify-center py-10'>
                <CircularProgress />
              </Box>
            ) : registrosCuota.length === 0 ? (
              <Paper className='p-6 text-center'>
                <Typography color='text.secondary'>
                  No hay alumnos en esta cuota. Puede que se hayan movido a otro N° de cuota.
                </Typography>
                <Button className='mt-3' onClick={resetDetalle}>
                  Volver a tablas
                </Button>
              </Paper>
            ) : (
              <TableContainer component={Paper}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>ALUMNO</TableCell>
                      <TableCell>DNI</TableCell>
                      <TableCell width={110}>N° CUOTA</TableCell>
                      <TableCell sx={{ width: 120, minWidth: 120 }}>MONTO PAGÓ</TableCell>
                      <TableCell width={180}>CONFIRMACIÓN</TableCell>
                      <TableCell width={210}>FECHA ENVÍO</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>OBSERVACIONES</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registrosCuota.map(row => {
                      const d = tablaDraft.find(x => x.id === row.id)

                      if (!d) return null

                      return (
                        <TableRow key={row.id} hover>
                          <TableCell>
                            <Typography variant='body2' fontWeight={600}>
                              {row.alumno}
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              {row.correo}
                            </Typography>
                          </TableCell>
                          <TableCell>{row.dni || '—'}</TableCell>
                          <TableCell>
                            <Typography variant='body2'>{row.numero_cuota}</Typography>
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

                                updateTablaDraft(row.id, {
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
                                    updateTablaDraft(row.id, {
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
                                updateTablaDraft(row.id, { fecha_envio_local: e.target.value })
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
                              onChange={e =>
                                updateTablaDraft(row.id, { observaciones: e.target.value })
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          <Box className='w-full lg:w-[280px] shrink-0'>
            <Paper className='p-4'>
              <Typography variant='subtitle1' fontWeight={700} className='mb-1'>
                MÓDULOS
              </Typography>
              <Typography variant='caption' color='text.secondary' display='block' className='mb-2'>
                Los módulos de cuotas anteriores quedan marcados y no se pueden desmarcar. Solo eliges los
                nuevos de esta cuota. Al guardar cambios se aplican la tabla y los módulos a alumnos{' '}
                <strong>Enviado</strong> ({enviadosCount}).
              </Typography>
              <Stack>
                {(cursoData?.modulos ?? []).map(mod => {
                  const bloqueado = modulosBloqueados.has(mod.id)

                  return (
                    <FormControlLabel
                      key={mod.id}
                      control={
                        <Checkbox
                          checked={moduloDraft.includes(mod.id)}
                          disabled={bloqueado}
                          onChange={() => toggleModulo(mod.id)}
                        />
                      }
                      label={
                        bloqueado ? (
                          <Typography variant='body2' color='text.secondary'>
                            {mod.titulo} <em>(cuota anterior)</em>
                          </Typography>
                        ) : (
                          mod.titulo
                        )
                      }
                    />
                  )
                })}
              </Stack>
              <Button
                className='mt-3'
                fullWidth
                variant='contained'
                disabled={!hasCambiosPendientes || savingCambios || guardarAccesos.isPending}
                onClick={() => void handleGuardarCambios()}
              >
                {savingCambios ? 'Guardando…' : 'Guardar cambios'}
              </Button>
            </Paper>
          </Box>
        </Stack>
      ) : null}

      <AppModal open={openCrear} handleClose={() => !crearTabla.isPending && setOpenCrear(false)}>
        <Typography variant='h6' className='mb-2'>
          Agregar cuota
        </Typography>
        <Typography variant='body2' color='text.secondary' className='mb-4'>
          Se creará la <strong>Cuota #{siguienteCuota}</strong> (progresiva) para todos los alumnos
          inscritos
          {cursoTitulo ? ` en “${cursoTitulo}”` : ''}.
        </Typography>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button onClick={() => setOpenCrear(false)} disabled={crearTabla.isPending}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={() => void handleCrearTabla()} disabled={crearTabla.isPending}>
            {crearTabla.isPending ? 'Creando…' : `Crear cuota #${siguienteCuota}`}
          </Button>
        </Stack>
      </AppModal>

      <AppModal
        open={openEliminar}
        handleClose={() => !eliminarTabla.isPending && setOpenEliminar(false)}
      >
        <Typography variant='h6' className='mb-2'>
          Eliminar tabla
        </Typography>
        <Typography variant='body2' color='text.secondary' className='mb-4'>
          Se eliminará la <strong>Cuota #{cuotaAEliminar}</strong>
          {cursoTitulo ? ` de “${cursoTitulo}”` : ''} y todos sus registros. Los accesos a módulos se
          recalcularán.
        </Typography>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button onClick={() => setOpenEliminar(false)} disabled={eliminarTabla.isPending}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => void handleEliminarTabla()}
            disabled={eliminarTabla.isPending}
          >
            {eliminarTabla.isPending ? 'Eliminando…' : 'Eliminar tabla'}
          </Button>
        </Stack>
      </AppModal>
    </Box>
  )
}
