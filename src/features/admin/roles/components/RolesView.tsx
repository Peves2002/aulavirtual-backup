'use client'

import { useState, useEffect, useCallback } from 'react'

import {
  Box,
  Typography,
  Card,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  
  Checkbox,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  Stack
} from '@mui/material'
import { useSnackbar } from 'notistack'

import { PERMISOS, type PermisoDef } from '@/utils/libs/permissions'

interface RolPersonalizado {
  id: string
  nombre: string
  descripcion: string | null
  permisos: string[]
  creado_en: string
  _count?: {
    usuarios: number
  }
}

export default function RolesView() {
  const { enqueueSnackbar } = useSnackbar()
  
  // State
  const [roles, setRoles] = useState<RolPersonalizado[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editingRole, setEditingRole] = useState<RolPersonalizado | null>(null)
  
  // Form State
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPerms, setFormPerms] = useState<string[]>([])
  const [roleToDelete, setRoleToDelete] = useState<RolPersonalizado | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/roles')

      if (res.ok) {
        const json = await res.json()

        setRoles(json.result || json.data || [])
      } else {
        enqueueSnackbar('Error al obtener la lista de roles', { variant: 'error' })
      }
    } catch (e) {
      console.error(e)
      enqueueSnackbar('Ocurrió un error inesperado al conectar con el servidor', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  // Open modal for creation
  const handleOpenCreate = () => {
    setEditingRole(null)
    setFormName('')
    setFormDesc('')
    setFormPerms([])
    setOpenModal(true)
  }

  // Open modal for editing
  const handleOpenEdit = (role: RolPersonalizado) => {
    setEditingRole(role)
    setFormName(role.nombre)
    setFormDesc(role.descripcion || '')
    setFormPerms(role.permisos || [])
    setOpenModal(true)
  }

  // Toggle permission selection
  const handleTogglePerm = (code: string) => {
    setFormPerms(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  // Select/Deselect all permissions
  const handleToggleSelectAll = () => {
    if (formPerms.length === PERMISOS.length) {
      setFormPerms([])
    } else {
      setFormPerms(PERMISOS.map(p => p.code))
    }
  }

  // Submit create or edit
  const handleSubmit = async () => {
    if (!formName.trim()) {
      enqueueSnackbar('El nombre del rol es requerido', { variant: 'warning' })
      
return
    }

    try {
      setSubmitting(true)

      const payload = {
        nombre: formName.trim(),
        descripcion: formDesc.trim(),
        permisos: formPerms
      }

      const url = editingRole ? `/api/admin/roles/${editingRole.id}` : '/api/admin/roles'
      const method = editingRole ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        enqueueSnackbar(
          editingRole ? 'Rol actualizado correctamente' : 'Rol creado correctamente',
          { variant: 'success' }
        )
        setOpenModal(false)
        fetchRoles()
      } else {
        const errorData = await res.json()

        enqueueSnackbar(errorData.message || 'Error al guardar el rol', { variant: 'error' })
      }
    } catch (e) {
      console.error(e)
      enqueueSnackbar('Error de red al intentar guardar', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  // Delete Role
  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return

    try {
      setSubmitting(true)

      const res = await fetch(`/api/admin/roles/${roleToDelete.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        enqueueSnackbar('Rol eliminado correctamente', { variant: 'success' })
        setOpenDeleteModal(false)
        fetchRoles()
      } else {
        enqueueSnackbar('Error al eliminar el rol', { variant: 'error' })
      }
    } catch (e) {
      console.error(e)
      enqueueSnackbar('Error de conexión al eliminar', { variant: 'error' })
    } finally {
      setSubmitting(false)
      setRoleToDelete(null)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 600, mb: 0.5 }}>Roles y Permisos</Typography>
          <Typography variant='body2' color='text.secondary'>
            Crea roles personalizados y define accesos específicos para el personal administrativo.
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={handleOpenCreate}
        >
          Nuevo Rol
        </Button>
      </Box>

      {/* Roles List */}
      <Card sx={{ borderRadius: 2 }}>
        <CardHeader title='Listado de Roles Personalizados' sx={{ pb: 2 }} />
        <Divider />
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Permisos Asignados</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Usuarios</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 6 }}>
                    <CircularProgress size={40} />
                    <Typography sx={{ mt: 2 }} color='text.secondary'>Cargando roles...</Typography>
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 6 }}>
                    <Typography color='text.secondary'>No se han creado roles personalizados todavía.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role) => (
                  <TableRow key={role.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {role.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {role.descripcion || <Typography variant='body2' color='text.disabled'>Sin descripción</Typography>}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 450 }}>
                        {role.permisos.length === PERMISOS.length ? (
                          <Chip label='Todos los permisos' size='small' color='success' variant='outlined' />
                        ) : role.permisos.length === 0 ? (
                          <Chip label='Ninguno' size='small' color='default' variant='outlined' />
                        ) : (
                          role.permisos.map((code) => {
                            const name = PERMISOS.find(p => p.code === code)?.name || code

                            
return (
                              <Chip key={code} label={name} size='small' color='info' variant='outlined' />
                            )
                          })
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        label={role._count?.usuarios || 0}
                        size='small'
                        color={role._count?.usuarios ? 'primary' : 'default'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <IconButton
                          color='primary'
                          size='small'
                          onClick={() => handleOpenEdit(role)}
                        >
                          <i className='tabler-edit' style={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          color='error'
                          size='small'
                          onClick={() => {
                            setRoleToDelete(role)
                            setOpenDeleteModal(true)
                          }}
                        >
                          <i className='tabler-trash' style={{ fontSize: 20 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog
        open={openModal}
        onClose={() => !submitting && setOpenModal(false)}
        maxWidth='md'
        fullWidth
        scroll='paper'
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          {editingRole ? 'Editar Rol Personalizado' : 'Crear Nuevo Rol Personalizado'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              label='Nombre del Rol'
              placeholder='Ej: Editor de Contenido, Asesor de Ventas'
              fullWidth
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              disabled={submitting}
              required
            />
            <TextField
              label='Descripción'
              placeholder='Describe qué puede hacer el usuario asignado a este rol...'
              fullWidth
              multiline
              rows={2}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              disabled={submitting}
            />

            <Divider />

            {/* Checkboxes structure */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Permisos y Accesos ({formPerms.length} seleccionados)
                </Typography>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={handleToggleSelectAll}
                  disabled={submitting}
                >
                  {formPerms.length === PERMISOS.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
                </Button>
              </Box>

              <Grid container spacing={2}>
                {PERMISOS.map((perm: PermisoDef) => {
                  const isChecked = formPerms.includes(perm.code)

                  
return (
                    <Grid item xs={12} sm={6} key={perm.code}>
                      <Paper
                        variant='outlined'
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          borderColor: isChecked ? 'primary.main' : 'divider',
                          bgcolor: isChecked ? 'action.hover' : 'background.paper',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main'
                          }
                        }}
                        onClick={() => !submitting && handleTogglePerm(perm.code)}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={() => {}}
                          disabled={submitting}
                          sx={{ p: 0.5, mt: -0.25 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: isChecked ? 'primary.main' : 'text.primary' }}>
                            {perm.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {perm.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenModal(false)} disabled={submitting} color='secondary'>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            disabled={submitting || !formName.trim()}
            startIcon={submitting && <CircularProgress size={16} />}
          >
            {editingRole ? 'Guardar Cambios' : 'Crear Rol'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteModal}
        onClose={() => !submitting && setOpenDeleteModal(false)}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>¿Eliminar este rol?</DialogTitle>
        <DialogContent>
          <Typography color='text.secondary'>
            ¿Estás seguro de que deseas eliminar el rol <strong>{roleToDelete?.nombre}</strong>? 
            Los usuarios que tengan este rol asignado volverán a su rol básico por defecto. Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDeleteModal(false)} disabled={submitting} color='secondary'>
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant='contained'
            color='error'
            disabled={submitting}
            startIcon={submitting && <CircularProgress size={16} color='inherit' />}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
