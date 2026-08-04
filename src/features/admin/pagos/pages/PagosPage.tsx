'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
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
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'

import AppModal from '@/utils/components/AppModal'
import type { CuotaReciente, RegistroCuotaManual } from '../entity/PagoCuota'
import { usePagosCurso, usePagosFiltros, usePagosMutations, usePagosRecientes } from '../hooks/usePagos'

export default function PagosPage() {
  const { enqueueSnackbar } = useSnackbar()

  const [categoriaId, setCategoriaId] = useState('')
  const [subcategoriaId, setSubcategoriaId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [cuotaInspeccion, setCuotaInspeccion] = useState<number | null>(null)
  const [openCrear, setOpenCrear] = useState(false)
  const [moduloDraft, setModuloDraft] = useState<string[]>([])

  const { data: filtros, isLoading: loadingFiltros } = usePagosFiltros(
    categoriaId || undefined,
    subcategoriaId || undefined
  )

  const { data: recientes, isLoading: loadingRecientes } = usePagosRecientes(cuotaInspeccion == null)
  const { data: cursoData, isLoading: loadingCurso, isFetching } = usePagosCurso(cursoId || undefined)
  const { crearTabla, actualizarRegistro, guardarAccesos } = usePagosMutations(cursoId || undefined)

  const registrosCuota = useMemo(() => {
    if (!cursoData || cuotaInspeccion == null) return []

    return cursoData.registros
      .filter(r => r.numero_cuota === cuotaInspeccion)
      .toSorted((a, b) => a.alumno.localeCompare(b.alumno, 'es', { sensitivity: 'base' }))
  }, [cursoData, cuotaInspeccion])

  const enviadosCount = useMemo(
    () => registrosCuota.filter(r => r.confirmacion === 'ENVIADO').length,
    [registrosCuota]
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

      return
    }

    const deEstaCuota = modulosGuardadosKey ? modulosGuardadosKey.split('|') : []
    const previos = modulosBloqueadosKey ? modulosBloqueadosKey.split('|') : []

    setModuloDraft([...new Set([...previos, ...deEstaCuota])])
  }, [cuotaInspeccion, cursoId, modulosGuardadosKey, modulosBloqueadosKey])

  const resetDetalle = () => {
    setCuotaInspeccion(null)
    setModuloDraft([])
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

  const patchRegistro = async (
    registro: RegistroCuotaManual,
    data: Partial<{ monto_pago: number; confirmacion: 'ENVIADO' | 'NO_ENVIADO' }>
  ) => {
    try {
      await actualizarRegistro.mutateAsync({ id: registro.id, data })
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'Error al guardar', { variant: 'error' })
    }
  }

  const toggleModulo = (moduloId: string) => {
    if (modulosBloqueados.has(moduloId)) return

    setModuloDraft(prev => (prev.includes(moduloId) ? prev.filter(id => id !== moduloId) : [...prev, moduloId]))
  }

  const saveAccesos = async () => {
    if (cuotaInspeccion == null || !cursoId) return

    try {
      const res = await guardarAccesos.mutateAsync({
        numeroCuota: cuotaInspeccion,
        moduloIds: moduloDraft
      })

      enqueueSnackbar(
        `Configuración de cuota #${cuotaInspeccion} guardada. Accesos recalculados (${res.alumnosAfectados} enviado(s)).`,
        { variant: 'success' }
      )
      resetDetalle()
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message || err?.message || 'Error al guardar módulos', {
        variant: 'error'
      })
    }
  }

  const labelOf = (item: { nombre?: string; titulo?: string }) => item.nombre || item.titulo || ''
  const cursoTitulo = cursoData?.curso.titulo ?? 'Programa'
  const siguienteCuota = cursoData?.siguienteCuota ?? 1

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
        {cuotaInspeccion != null ? (
          <Button
            variant='outlined'
            startIcon={<i className='tabler-arrow-left' />}
            onClick={resetDetalle}
            sx={{ flexShrink: 0 }}
          >
            Volver
          </Button>
        ) : null}
      </Stack>

      {cuotaInspeccion == null ? (
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

      {cuotaInspeccion == null && !cursoId ? (
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

      {cursoId && cuotaInspeccion == null ? (
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
                  <Button
                    variant='contained'
                    onClick={() => {
                      setCuotaInspeccion(tabla.numero_cuota)
                      setModuloDraft([])
                    }}
                  >
                    Inspeccionar
                  </Button>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      ) : null}

      {cursoId && cuotaInspeccion != null ? (
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
              <Button variant='outlined' size='small' onClick={() => setOpenCrear(true)}>
                Agregar cuota
              </Button>
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
                      <TableCell width={130}>MONTO PAGÓ</TableCell>
                      <TableCell width={180}>CONFIRMACIÓN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registrosCuota.map(row => (
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
                        <TableCell>
                          <TextField
                            size='small'
                            type='number'
                            defaultValue={row.monto_pago}
                            key={`monto-${row.id}-${row.monto_pago}`}
                            inputProps={{ min: 0, step: '0.01' }}
                            onBlur={e => {
                              const m = Number(e.target.value)

                              if (!Number.isNaN(m) && m !== row.monto_pago) {
                                void patchRegistro(row, { monto_pago: m })
                              }
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={row.confirmacion === 'ENVIADO'}
                                onChange={(_, checked) =>
                                  void patchRegistro(row, {
                                    confirmacion: checked ? 'ENVIADO' : 'NO_ENVIADO'
                                  })
                                }
                              />
                            }
                            label={row.confirmacion === 'ENVIADO' ? 'Enviado' : 'No enviado'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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
                nuevos de esta cuota. Al guardar aplican a alumnos <strong>Enviado</strong> ({enviadosCount}
                ).
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
                disabled={guardarAccesos.isPending}
                onClick={() => void saveAccesos()}
              >
                Guardar módulos
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
    </Box>
  )
}
