'use client'

import React, { useState } from 'react'
import { Grid, Typography, Box, Button, Divider, Stack, IconButton, Card, FormControlLabel, Switch, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useSnackbar } from 'notistack'
import CustomTextField from '@core/components/mui/TextField'
import { useEditCurso } from '../../hooks/useCursos'

export function TabSeccionesWeb({ curso, onSuccess }: any) {
  const { enqueueSnackbar } = useSnackbar()
  const editMutation = useEditCurso()

  // TOGGLES
  const [toggles, setToggles] = useState({
    mostrar_certificaciones: curso.mostrar_certificaciones ?? true,
    mostrar_herramientas: curso.mostrar_herramientas ?? true,
    mostrar_rankings: curso.mostrar_rankings ?? true,
    mostrar_empresas: curso.mostrar_empresas ?? true,
    mostrar_director: curso.mostrar_director ?? true,
    mostrar_acompanamiento: curso.mostrar_acompanamiento ?? true,
    mostrar_admision: curso.mostrar_admision ?? true,
    mostrar_becas: curso.mostrar_becas ?? true,
    mostrar_faqs: curso.mostrar_faqs ?? true,
    mostrar_relacionados: curso.mostrar_relacionados ?? true,
    mostrar_por_que_estudiar: curso.mostrar_por_que_estudiar ?? true,
    mostrar_por_que_nosotros: curso.mostrar_por_que_nosotros ?? true
  })

  const updateToggle = (key: string, checked: boolean) => setToggles(prev => ({ ...prev, [key]: checked }))

  // JSON ARRAYS
  const [faqs, setFaqs] = useState<any[]>(curso.faqs || [])
  const [certificaciones, setCertificaciones] = useState<any[]>(curso.certificaciones || [])
  const [herramientas, setHerramientas] = useState<any[]>(curso.herramientas || [])
  const [becas, setBecas] = useState<any[]>(curso.ayudas_becas || [])
  const [programasRelacionados, setProgramasRelacionados] = useState<any[]>(curso.programas_relacionados || [])
  
  const [rankings, setRankings] = useState<any[]>(curso.rankings || [])
  const [empresas, setEmpresas] = useState<any[]>(curso.empresas_alumnos || [])
  const [acompanamiento, setAcompanamiento] = useState<any[]>(curso.acompanamiento || [])
  const [porQueEstudiar, setPorQueEstudiar] = useState<any[]>(curso.por_que_estudiar || [])
  const [procesoAdmision, setProcesoAdmision] = useState<any[]>(curso.proceso_admision || [])
  
  // JSON OBJECTS
  const [director, setDirector] = useState<any>(curso.director || { foto: '', nombre: '', descripcion: '' })
  const [porQueNosotros, setPorQueNosotros] = useState<string>(curso.por_que_nosotros?.texto || '')

  // TÍTULOS PERSONALIZADOS
  const [tituloPrograma, setTituloPrograma] = useState(curso.titulo_programa || '')
  const [tituloCertificaciones, setTituloCertificaciones] = useState(curso.titulo_certificaciones || '')
  const [tituloPlanEstudios, setTituloPlanEstudios] = useState(curso.titulo_plan_estudios || '')
  const [tituloSalidas, setTituloSalidas] = useState(curso.titulo_salidas || '')
  const [tituloAdmision, setTituloAdmision] = useState(curso.titulo_admision || '')

  const handleSave = async () => {
    try {
      await editMutation.mutateAsync({
        id: curso.id,
        data: {
          ...toggles,
          // @ts-ignore
          faqs, certificaciones, herramientas, ayudas_becas: becas, programas_relacionados: programasRelacionados,
          // @ts-ignore
          rankings, empresas_alumnos: empresas, acompanamiento, por_que_estudiar: porQueEstudiar, proceso_admision: procesoAdmision,
          // @ts-ignore
          director, por_que_nosotros: { texto: porQueNosotros },
          titulo_programa: tituloPrograma,
          titulo_certificaciones: tituloCertificaciones,
          titulo_plan_estudios: tituloPlanEstudios,
          titulo_salidas: tituloSalidas,
          titulo_admision: tituloAdmision
        }
      })
      enqueueSnackbar('Secciones web actualizadas', { variant: 'success' })
      onSuccess()
    } catch (error: any) {
      enqueueSnackbar(error?.message || 'Error al guardar', { variant: 'error' })
    }
  }

  // GENERIC HELPERS
  const addItem = (setter: any, defaultObj: any) => setter((prev: any) => [...prev, defaultObj])
  const removeItem = (setter: any, index: number) => setter((prev: any) => prev.filter((_: any, i: number) => i !== index))
  const updateItem = (setter: any, index: number, field: string, value: any) => {
    setter((prev: any) => {
      const arr = [...prev]
      arr[index] = { ...arr[index], [field]: value }
      return arr
    })
  }

  const SectionHeader = ({ title, toggleKey }: { title: string, toggleKey: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant='h6'>{title}</Typography>
      <FormControlLabel control={<Switch checked={(toggles as any)[toggleKey]} onChange={(e) => updateToggle(toggleKey, e.target.checked)} />} label="Mostrar" />
    </Box>
  )

  return (
    <Grid container spacing={4}>
      
      {/* 0. TÍTULOS PERSONALIZADOS */}
      <Grid item xs={12}>
        <Typography variant='h6' sx={{ mb: 2 }}>Títulos Personalizados de Secciones</Typography>
        <Card sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Deja en blanco para usar los textos por defecto (Ej: "Plan de estudios"). El título de programa reemplaza al texto principal introductorio.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextField fullWidth multiline rows={2} label='Título: Programa / Introducción' value={tituloPrograma} onChange={e => setTituloPrograma(e.target.value)} placeholder="El Diplomado Internacional en Gestión..." />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField fullWidth label='Título: Certificaciones' value={tituloCertificaciones} onChange={e => setTituloCertificaciones(e.target.value)} placeholder="Prepárate para certificaciones profesionales" />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField fullWidth label='Título: Plan de Estudios' value={tituloPlanEstudios} onChange={e => setTituloPlanEstudios(e.target.value)} placeholder="Plan de estudios" />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField fullWidth label='Título: Salidas Profesionales' value={tituloSalidas} onChange={e => setTituloSalidas(e.target.value)} placeholder="Salidas profesionales" />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField fullWidth label='Título: Proceso de Admisión' value={tituloAdmision} onChange={e => setTituloAdmision(e.target.value)} placeholder="Proceso de admisión" />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
      
      {/* 1. POR QUÉ ESTUDIAR */}
      <Grid item xs={12}>
        <SectionHeader title="¿Por qué estudiar este programa?" toggleKey="mostrar_por_que_estudiar" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setPorQueEstudiar, { numero: '01', titulo: '', descripcion: '' })}>Añadir Motivo</Button>
        <Stack spacing={2}>
          {porQueEstudiar.map((item, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setPorQueEstudiar, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={2}><CustomTextField fullWidth label='Nro' value={item.numero} onChange={e => updateItem(setPorQueEstudiar, i, 'numero', e.target.value)} /></Grid>
                <Grid item xs={10}><CustomTextField fullWidth label='Título' value={item.titulo} onChange={e => updateItem(setPorQueEstudiar, i, 'titulo', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth label='Descripción' value={item.descripcion} onChange={e => updateItem(setPorQueEstudiar, i, 'descripcion', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 2. POR QUÉ ADPH GROUP */}
      <Grid item xs={12}>
        <SectionHeader title="Franja Azul (¿Por qué ADPH Group?)" toggleKey="mostrar_por_que_nosotros" />
        <CustomTextField fullWidth multiline rows={2} label='Texto' value={porQueNosotros} onChange={e => setPorQueNosotros(e.target.value)} />
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 3. CERTIFICACIONES */}
      <Grid item xs={12}>
        <SectionHeader title="Certificaciones Profesionales" toggleKey="mostrar_certificaciones" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setCertificaciones, { titulo: '', entidad: '', siglas: '', descripcion1: '', puntos: [] })}>Añadir Certificación</Button>
        <Stack spacing={2}>
          {certificaciones.map((cert, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setCertificaciones, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Título' value={cert.titulo} onChange={e => updateItem(setCertificaciones, i, 'titulo', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Entidad' value={cert.entidad} onChange={e => updateItem(setCertificaciones, i, 'entidad', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Siglas' value={cert.siglas} onChange={e => updateItem(setCertificaciones, i, 'siglas', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth multiline rows={2} label='Descripción' value={cert.descripcion1} onChange={e => updateItem(setCertificaciones, i, 'descripcion1', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth label='Puntos (Separados por coma)' value={(cert.puntos || []).join(', ')} onChange={e => updateItem(setCertificaciones, i, 'puntos', e.target.value.split(',').map((s: string) => s.trim()))} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 4. HERRAMIENTAS */}
      <Grid item xs={12}>
        <SectionHeader title="Herramientas Claves" toggleKey="mostrar_herramientas" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setHerramientas, { name: '', icon: '' })}>Añadir Herramienta</Button>
        <Stack spacing={2}>
          {herramientas.map((tool, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setHerramientas, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={6}><CustomTextField fullWidth label='Nombre Herramienta' value={tool.name} onChange={e => updateItem(setHerramientas, i, 'name', e.target.value)} /></Grid>
                <Grid item xs={6}><CustomTextField fullWidth label='URL Imagen / Logo' value={tool.icon} onChange={e => updateItem(setHerramientas, i, 'icon', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 5. RANKINGS */}
      <Grid item xs={12}>
        <SectionHeader title="Rankings y Acreditaciones" toggleKey="mostrar_rankings" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setRankings, { titulo: '', descripcion: '', logo: '' })}>Añadir Ranking</Button>
        <Stack spacing={2}>
          {rankings.map((rank, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setRankings, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><CustomTextField fullWidth label='Título' value={rank.titulo} onChange={e => updateItem(setRankings, i, 'titulo', e.target.value)} /></Grid>
                <Grid item xs={12} md={6}><CustomTextField fullWidth label='URL Logo' value={rank.logo} onChange={e => updateItem(setRankings, i, 'logo', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth label='Descripción' value={rank.descripcion} onChange={e => updateItem(setRankings, i, 'descripcion', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 6. EMPRESAS ESTUDIANTES */}
      <Grid item xs={12}>
        <SectionHeader title="Empresas de Estudiantes" toggleKey="mostrar_empresas" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setEmpresas, { nombre: '', logo: '' })}>Añadir Empresa</Button>
        <Stack spacing={2}>
          {empresas.map((emp, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setEmpresas, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={6}><CustomTextField fullWidth label='Nombre' value={emp.nombre} onChange={e => updateItem(setEmpresas, i, 'nombre', e.target.value)} /></Grid>
                <Grid item xs={6}><CustomTextField fullWidth label='URL Logo' value={emp.logo} onChange={e => updateItem(setEmpresas, i, 'logo', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 7. DIRECTOR */}
      <Grid item xs={12}>
        <SectionHeader title="Director del Máster" toggleKey="mostrar_director" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}><CustomTextField fullWidth label='Nombre' value={director.nombre} onChange={e => setDirector({ ...director, nombre: e.target.value })} /></Grid>
          <Grid item xs={12} md={8}><CustomTextField fullWidth label='URL Foto' value={director.foto} onChange={e => setDirector({ ...director, foto: e.target.value })} /></Grid>
          <Grid item xs={12}><CustomTextField fullWidth multiline rows={3} label='Descripción/Biografía' value={director.descripcion} onChange={e => setDirector({ ...director, descripcion: e.target.value })} /></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 8. ACOMPAÑAMIENTO */}
      <Grid item xs={12}>
        <SectionHeader title="Acompañamiento al Alumno" toggleKey="mostrar_acompanamiento" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setAcompanamiento, { titulo: '', descripcion: '', icono: '' })}>Añadir Bloque</Button>
        <Stack spacing={2}>
          {acompanamiento.map((acomp, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setAcompanamiento, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Título' value={acomp.titulo} onChange={e => updateItem(setAcompanamiento, i, 'titulo', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Ícono (Ej: M16 21v... SVG Path)' value={acomp.icono} onChange={e => updateItem(setAcompanamiento, i, 'icono', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Descripción' value={acomp.descripcion} onChange={e => updateItem(setAcompanamiento, i, 'descripcion', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 9. ADMISIÓN */}
      <Grid item xs={12}>
        <SectionHeader title="Proceso de Admisión" toggleKey="mostrar_admision" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setProcesoAdmision, { numero: '01', titulo: '', descripcion: '' })}>Añadir Paso</Button>
        <Stack spacing={2}>
          {procesoAdmision.map((paso, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setProcesoAdmision, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={2}><CustomTextField fullWidth label='Paso Nro' value={paso.numero} onChange={e => updateItem(setProcesoAdmision, i, 'numero', e.target.value)} /></Grid>
                <Grid item xs={5}><CustomTextField fullWidth label='Título' value={paso.titulo} onChange={e => updateItem(setProcesoAdmision, i, 'titulo', e.target.value)} /></Grid>
                <Grid item xs={5}><CustomTextField fullWidth label='Descripción' value={paso.descripcion} onChange={e => updateItem(setProcesoAdmision, i, 'descripcion', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 10. BECAS */}
      <Grid item xs={12}>
        <SectionHeader title="Ayudas y Becas" toggleKey="mostrar_becas" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setBecas, { title: '', description: '', items: [] })}>Añadir Beca</Button>
        <Stack spacing={2}>
          {becas.map((beca, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setBecas, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={6}><CustomTextField fullWidth label='Título' value={beca.title} onChange={e => updateItem(setBecas, i, 'title', e.target.value)} /></Grid>
                <Grid item xs={6}><CustomTextField fullWidth label='Descripción' value={beca.description || ''} onChange={e => updateItem(setBecas, i, 'description', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth label='Ítems (Separados por coma)' value={(beca.items || []).join(', ')} onChange={e => updateItem(setBecas, i, 'items', e.target.value.split(',').map((s: string) => s.trim()))} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 11. FAQS */}
      <Grid item xs={12}>
        <SectionHeader title="Preguntas Frecuentes" toggleKey="mostrar_faqs" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setFaqs, { question: '', answer: '' })}>Añadir FAQ</Button>
        <Stack spacing={2}>
          {faqs.map((faq, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setFaqs, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12}><CustomTextField fullWidth label='Pregunta' value={faq.question} onChange={e => updateItem(setFaqs, i, 'question', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth multiline rows={2} label='Respuesta' value={faq.answer} onChange={e => updateItem(setFaqs, i, 'answer', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}><Divider /></Grid>

      {/* 12. PROGRAMAS RELACIONADOS */}
      <Grid item xs={12}>
        <SectionHeader title="Programas Relacionados" toggleKey="mostrar_relacionados" />
        <Button variant='outlined' size="small" sx={{ mb: 2 }} onClick={() => addItem(setProgramasRelacionados, { title: '', category: '', description: '', image: '' })}>Añadir Programa</Button>
        <Stack spacing={2}>
          {programasRelacionados.map((prog, i) => (
            <Card key={i} sx={{ p: 2, position: 'relative' }}>
              <IconButton size='small' color='error' sx={{ position: 'absolute', top: 4, right: 4, zIndex: 10 }} onClick={() => removeItem(setProgramasRelacionados, i)}><i className='tabler-trash'/></IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Título' value={prog.title} onChange={e => updateItem(setProgramasRelacionados, i, 'title', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='Categoría' value={prog.category} onChange={e => updateItem(setProgramasRelacionados, i, 'category', e.target.value)} /></Grid>
                <Grid item xs={12} md={4}><CustomTextField fullWidth label='URL de Imagen' value={prog.image} onChange={e => updateItem(setProgramasRelacionados, i, 'image', e.target.value)} /></Grid>
                <Grid item xs={12}><CustomTextField fullWidth multiline rows={2} label='Descripción' value={prog.description} onChange={e => updateItem(setProgramasRelacionados, i, 'description', e.target.value)} /></Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Grid>

      {/* SAVE BUTTON */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button variant='contained' size='large' onClick={handleSave} disabled={editMutation.isPending} startIcon={<i className='tabler-device-floppy' />}>
            {editMutation.isPending ? 'Guardando...' : 'Guardar Configuración Landing'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
