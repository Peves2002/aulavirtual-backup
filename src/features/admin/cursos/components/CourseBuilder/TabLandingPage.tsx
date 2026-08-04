'use client'

import React, { useState } from 'react'

import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  IconButton,
  Divider,
  Stack,
  FormControlLabel,
  Switch,
  Avatar,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { useSnackbar } from 'notistack'

import CustomTextField from '@core/components/mui/TextField'
import MediaLibrary from '../MediaLibrary'
import { useEditCurso } from '../../hooks/useCursos'

// --- REUSABLE COMPONENTS ---

// 1. Dual Image Uploader & URL Input
interface MediaFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function MediaField({ label, value, onChange, placeholder }: MediaFieldProps) {
  const [openMedia, setOpenMedia] = useState(false)

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography variant='body2' sx={{ mb: 1.5, fontWeight: 500, color: 'text.primary' }}>
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {value && (
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover'
            }}
          >
            <img src={value} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
        )}
        <TextField
          fullWidth
          size='small'
          placeholder={placeholder || 'URL de la imagen...'}
          value={value}
          onChange={e => onChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-link text-textSecondary' />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant='tonal'
          onClick={() => setOpenMedia(true)}
          startIcon={<i className='tabler-upload' />}
          sx={{ flexShrink: 0, height: 40 }}
        >
          Subir / Elegir
        </Button>
      </Box>
      <MediaLibrary
        open={openMedia}
        onClose={() => setOpenMedia(false)}
        onSelect={url => {
          onChange(url)
          setOpenMedia(false)
        }}
      />
    </Box>
  )
}

// 2. Inline Accordion Header Helper
interface SectionHeaderProps {
  title: string
  icon: string
  checked: boolean
  onToggle: (checked: boolean) => void
  info?: string
}

function SectionHeader({ title, icon, checked, onToggle, info }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        pr: 4,
        py: 1
      }}
      onClick={e => e.stopPropagation()} // Prevents Accordion expansion when clicking switch/buttons
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ bgcolor: checked ? 'primary.lighterOpacity' : 'action.selected', color: checked ? 'primary.main' : 'text.disabled', width: 36, height: 36 }}>
          <i className={icon} style={{ fontSize: '1.25rem' }} />
        </Avatar>
        <Box>
          <Typography variant='subtitle1' fontWeight={600} color={checked ? 'text.primary' : 'text.disabled'}>
            {title}
          </Typography>
          {info && (
            <Typography variant='caption' color='text.secondary'>
              {info}
            </Typography>
          )}
        </Box>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={e => onToggle(e.target.checked)}
            color='primary'
          />
        }
        label={checked ? 'Visible' : 'Oculto'}
        sx={{ mr: 0 }}
      />
    </Box>
  )
}

// --- MAIN LANDING PAGE CONFIG COMPONENT ---
export function TabLandingPage({ curso, onSuccess }: any) {
  const { enqueueSnackbar } = useSnackbar()
  const editMutation = useEditCurso()

  // 1. GENERAL TOGGLES STATE
  const [toggles, setToggles] = useState({
    mostrar_banner_disponibilidad: curso.mostrar_banner_disponibilidad ?? true,
    mostrar_beneficios: curso.mostrar_beneficios ?? true,
    mostrar_metodologia: curso.mostrar_metodologia ?? true,
    mostrar_objetivos: curso.mostrar_objetivos ?? true,
    mostrar_salidas: curso.mostrar_salidas ?? true,
    mostrar_perfil: curso.mostrar_perfil ?? true,
    mostrar_incluye: curso.mostrar_incluye ?? true,
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
    mostrar_por_que_nosotros: curso.mostrar_por_que_nosotros ?? true,
    mostrar_advanced_specializations: curso.mostrar_advanced_specializations ?? true,
    mostrar_partners_institucionales: curso.mostrar_partners_institucionales ?? true
  })

  const updateToggle = (key: string, checked: boolean) => {
    setToggles(prev => ({ ...prev, [key]: checked }))
  }

  // 2. COMPLEX DATA STATES
  const [bannerDisponibilidad, setBannerDisponibilidad] = useState<any>(
    curso.banner_disponibilidad || { texto_izquierdo: '75% de plazas reservadas', texto_derecho: '6 plazas disponibles' }
  )

  const [tituloPrograma, setTituloPrograma] = useState(curso.titulo_programa || '')
  
  const [objetivos] = useState<string[]>(curso.objetivos || [])

  const [metodologia] = useState<any[]>(curso.metodologia || [])
  const [beneficios, setBeneficios] = useState<any[]>(curso.beneficios || [])
  const [incluye] = useState<any[]>(curso.incluye || [])
  const [salidasProfesionales, setSalidasProfesionales] = useState<string[]>(curso.salidas_profesionales || [])
  const [newSalida, setNewSalida] = useState('')

  // Perfil estudiante JSON parsing
  const [perfilEstudiante, setPerfilEstudiante] = useState<any>(() => {
    try {
      const parsed = JSON.parse(curso.perfil_estudiante || '');

      if (parsed && typeof parsed === 'object') {
        return {
          titulo: parsed.titulo || '¿Es este programa para ti?',
          descripcion: parsed.descripcion || '',
          imagen: parsed.imagen || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
          secciones: parsed.secciones || [{ subtitulo: '', items: [] }]
        };
      }
    } catch (e) {}

    
return {
      titulo: '¿Es este programa para ti?',
      descripcion: 'Este curso está pensado para profesionales que quieren tomar decisiones estratégicas...',
      imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      secciones: [
        {
          subtitulo: 'Este curso está pensado para profesionales que:',
          items: curso.perfil_estudiante ? curso.perfil_estudiante.split('\n').filter(Boolean) : []
        }
      ]
    };
  })

  // Why study JSON parsing
  const [porQueEstudiar, setPorQueEstudiar] = useState<any>(() => {
    const data = curso.por_que_estudiar;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return {
        titulo: (data as any).titulo || `¿Por qué estudiar el ${curso.titulo}?`,
        descripcion: (data as any).descripcion || '',
        imagen: (data as any).imagen || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
        col1_titulo: (data as any).col1_titulo || 'Este programa te prepara para:',
        col1_items: (data as any).col1_items || [],
        col2_titulo: (data as any).col2_titulo || 'Aprenderás a trabajar con:',
        col2_items: (data as any).col2_items || []
      };
    }
    
    // Fallback: migrate old data if it is array
    const legacyCol1: string[] = [];
    const legacyCol2: string[] = [];

    if (Array.isArray(data)) {
      data.forEach((item: any, i: number) => {
        if (i % 2 === 0) {
          legacyCol1.push(item.descripcion || item.titulo || item);
        } else {
          legacyCol2.push(item.descripcion || item.titulo || item);
        }
      });
    }

    return {
      titulo: `¿Por qué estudiar el ${curso.titulo}?`,
      descripcion: 'Las empresas no necesitan más especialistas aislados, necesitan líderes capaces de entender el negocio completo y tomar decisiones estratégicas en entornos cada vez más complejos.\n\nEl MBA te prepara precisamente para eso. Combina visión global de empresa, aprendizaje práctico y conexión directa con el entorno empresarial para ayudarte a asumir mayores responsabilidades en tu carrera.\n\nAquí no solo estudias management, aprendes a liderar organizaciones, tomar decisiones estratégicas y transformar negocios en contextos reales.',
      imagen: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
      col1_titulo: 'Este programa te prepara para:',
      col1_items: legacyCol1.length > 0 ? legacyCol1 : [
        'Comprender cómo interactúan estrategia, marketing, finanzas y operaciones en la gestión empresarial.',
        'Tomar decisiones estratégicas en entornos digitales, complejos y cambiantes.',
        'Liderar equipos y proyectos con visión directiva.',
        'Analizar mercados, modelos de negocio y oportunidades de crecimiento.',
        'Avanzar hacia posiciones de mayor responsabilidad dentro de tu organización.'
      ],
      col2_titulo: 'Aprenderás a trabajar con:',
      col2_items: legacyCol2.length > 0 ? legacyCol2 : [
        'Herramientas de análisis y gestión empresarial basadas en datos.',
        'Metodologías estratégicas utilizadas por empresas líderes.',
        'Simulaciones empresariales y casos reales de negocio.',
        'Proyectos aplicados desarrollados junto a profesionales del sector.',
        'Inteligencia artificial aplicada a la toma de decisiones empresariales.'
      ]
    };
  })

  // ¿Por qué ADPH Group? JSON parsing
  const [porQueNosotros, setPorQueNosotros] = useState<any>(() => {
    const data = curso.por_que_nosotros;

    if (data && typeof data === 'object' && !Array.isArray(data) && (data as any).items) {
      return {
        titulo: (data as any).titulo || '¿Por qué ADPH Group?',
        descripcion: (data as any).descripcion || '',
        items: (data as any).items || [],
        banner_texto: (data as any).banner_texto || ''
      };
    }

    
return {
      titulo: '¿Por qué ADPH Group?',
      descripcion: (data as any).texto || 'ADPH Group es una institución que impulsa el progreso profesional...',
      items: [
        { numero: '01', titulo: 'Aprendizaje aplicado', descripcion: 'Una metodología práctica basada en retos reales que prepara a los profesionales para tomar decisiones que transforman el negocio.' },
        { numero: '02', titulo: 'Conexión con la industria', descripcion: 'Colaboración constante con empresas líderes en tecnología, consultoría e innovación.' },
        { numero: '03', titulo: 'Ecosistema dinámico', descripcion: 'Uno de los hubs más dinámicos en digitalización, emprendimiento e innovación.' },
        { numero: '04', titulo: 'Comunidad internacional', descripcion: 'Estudiantes y profesionales que amplían la mirada y enriquecen cada proyecto.' }
      ],
      banner_texto: '¡ADPH Group es una institución diseñada para profesionales que lideran, no que solo aprenden!'
    };
  })

  // Advanced Specializations JSON parsing
  const [advancedSpecializations, setAdvancedSpecializations] = useState<any>(() => {
    const data = curso.advanced_specializations;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return {
        titulo: (data as any).titulo || 'Advanced Specializations',
        subtitulo: (data as any).subtitulo || 'Impulsa tu formación. Define tu camino.',
        descripcion: (data as any).descripcion || '',
        focos_titulo: (data as any).focos_titulo || 'Elige entre dos focos:',
        foco_adph: (data as any).foco_adph || 'Aquí eliges tu camino. ADPH Group lo multiplica',
        tab1_label: (data as any).tab1_label || 'Habilidades Transversales',
        tab1_descripcion: (data as any).tab1_descripcion || '',
        tab1_items: (data as any).tab1_items || [],
        tab2_label: (data as any).tab2_label || 'Habilidades de Especialidad',
        tab2_descripcion: (data as any).tab2_descripcion || '',
        tab2_items: (data as any).tab2_items || []
      };
    }

    
return {
      titulo: 'Advanced Specializations',
      subtitulo: 'Impulsa tu formación. Define tu camino.',
      descripcion: 'Las Advanced Specializations son especializaciones certificadas que te permiten personalizar tu programa...',
      focos_titulo: 'Elige entre dos focos:',
      foco_adph: 'Aquí eliges tu camino. ADPH Group lo multiplica',
      tab1_label: 'Habilidades Transversales',
      tab1_descripcion: 'Desarrolla el liderazgo que el mundo digital exige...',
      tab1_items: ['IA & Machine Learning', 'Project Management & Agile', 'Emprendimiento', 'Innovation Strategy', 'Data-Driven Analytics', 'ESG & Sustainability'],
      tab2_label: 'Habilidades de Especialidad',
      tab2_descripcion: 'Pensadas para profundizar en áreas estratégicas...',
      tab2_items: ['Digital Business Transformation', 'Product Management', 'Big Data Tools', 'DEI Strategy', 'International Markets', 'Fintech', 'Business Analytics', 'Marketing Digital Avanzado']
    };
  })

  // Partners institucionales JSON parsing
  const [partnersInstitucionales, setPartnersInstitucionales] = useState<any>(() => {
    const data = curso.partners_institucionales;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return {
        titulo: (data as any).titulo || 'Un valor añadido gracias a nuestros partners institucionales',
        descripcion: (data as any).descripcion || '',
        partners: (data as any).partners || []
      };
    }

    
return {
      titulo: 'Un valor añadido gracias a nuestros partners institucionales',
      descripcion: 'Como partner oficial, tus especializaciones se imparten con una orientación real al ecosistema tecnológico...',
      partners: [
        { nombre: 'ADPH Group', logo: 'https://via.placeholder.com/150x50/ffffff/08479b?text=ADPH+Group' },
        { nombre: 'Tech Partner', logo: 'https://via.placeholder.com/150x50/ffffff/08479b?text=Tech+Partner' }
      ]
    };
  })

  // Requisitos de admisión Array parsing
  const [requisitosAdmision, setRequisitosAdmision] = useState<string[]>(() => {
    const data = curso.requisitos_admision;

    if (Array.isArray(data)) {
      return data;
    }

    
return [
      'Título universitario oficial o equivalente.',
      'Experiencia profesional relevante.',
      'Carta de motivación y CV actualizado.'
    ];
  })

  const [newRequisito, setNewRequisito] = useState('')
  
  // Custom section titles
  const [customTitles, setCustomTitles] = useState({
    titulo_certificaciones: curso.titulo_certificaciones || '',
    titulo_plan_estudios: curso.titulo_plan_estudios || '',
    titulo_salidas: curso.titulo_salidas || '',
    titulo_admision: curso.titulo_admision || ''
  })

  const [certificaciones, setCertificaciones] = useState<any[]>(curso.certificaciones || [])
  const [herramientas, setHerramientas] = useState<any[]>(curso.herramientas || [])
  const [rankings, setRankings] = useState<any[]>(curso.rankings || [])
  const [empresas, setEmpresas] = useState<any[]>(curso.empresas_alumnos || [])
  
  const [director, setDirector] = useState<any>(
    curso.director || { foto: '', nombre: '', descripcion: '' }
  )

  const [acompanamiento, setAcompanamiento] = useState<any[]>(curso.acompanamiento || [])
  const [procesoAdmision, setProcesoAdmision] = useState<any[]>(curso.proceso_admision || [])
  const [becas, setBecas] = useState<any[]>(curso.ayudas_becas || [])
  const [faqs, setFaqs] = useState<any[]>(curso.faqs || [])
  const [programasRelacionados, setProgramasRelacionados] = useState<any[]>(curso.programas_relacionados || [])

  // --- SAVE OPERATION ---
  const handleSaveAll = async () => {
    try {
      await editMutation.mutateAsync({
        id: curso.id,
        data: {
          ...toggles,
          banner_disponibilidad: bannerDisponibilidad,
          titulo_programa: tituloPrograma,
          objetivos,
          metodologia,
          beneficios,
          incluye,
          perfil_estudiante: JSON.stringify(perfilEstudiante),
          salidas_profesionales: salidasProfesionales,
          por_que_estudiar: porQueEstudiar,
          por_que_nosotros: porQueNosotros,
          advanced_specializations: advancedSpecializations,
          partners_institucionales: partnersInstitucionales,
          requisitos_admision: requisitosAdmision,
          ...customTitles,
          certificaciones,
          herramientas,
          rankings,
          empresas_alumnos: empresas,
          director,
          acompanamiento,
          proceso_admision: procesoAdmision,
          ayudas_becas: becas,
          faqs,
          programas_relacionados: programasRelacionados
        }
      })
      enqueueSnackbar('Landing Page actualizada con éxito', { variant: 'success' })
      onSuccess()
    } catch (e: any) {
      enqueueSnackbar(e?.message || 'Error al guardar los cambios', { variant: 'error' })
    }
  }

  // Helper lists functions
  const addTextItem = (setter: any, val: string, clearInput: any) => {
    if (!val.trim()) return
    setter((prev: any) => [...prev, val.trim()])
    clearInput('')
  }

  const removeIndexItem = (setter: any, index: number) => {
    setter((prev: any) => prev.filter((_: any, i: number) => i !== index))
  }

  const addObjItem = (setter: any, defaultObj: any) => {
    setter((prev: any) => [...prev, defaultObj])
  }

  const updateObjItem = (setter: any, index: number, field: string, value: any) => {
    setter((prev: any) => {
      const arr = [...prev]

      arr[index] = { ...arr[index], [field]: value }
      
return arr
    })
  }

  return (
    <Box sx={{ pb: 20, position: 'relative' }}>
      <Stack spacing={4}>
        
        {/* TÍTULOS GENERALES / CABECERA DE LANDING */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Títulos de Secciones y Textos de Introducción" icon="tabler-forms" checked={true} onToggle={() => {}} info="Configura títulos descriptivos generales" />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Título: Programa / Introducción Principal"
                  value={tituloPrograma}
                  onChange={e => setTituloPrograma(e.target.value)}
                  placeholder="El Diplomado Internacional en Gestión de..."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Título de Certificaciones"
                  value={customTitles.titulo_certificaciones}
                  onChange={e => setCustomTitles({ ...customTitles, titulo_certificaciones: e.target.value })}
                  placeholder="Prepárate para certificaciones profesionales"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Título del Plan de Estudios"
                  value={customTitles.titulo_plan_estudios}
                  onChange={e => setCustomTitles({ ...customTitles, titulo_plan_estudios: e.target.value })}
                  placeholder="Plan de estudios"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Título de Salidas Profesionales"
                  value={customTitles.titulo_salidas}
                  onChange={e => setCustomTitles({ ...customTitles, titulo_salidas: e.target.value })}
                  placeholder="Salidas profesionales"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Título del Proceso de Admisión"
                  value={customTitles.titulo_admision}
                  onChange={e => setCustomTitles({ ...customTitles, titulo_admision: e.target.value })}
                  placeholder="Proceso de admisión"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* BANNER DE DISPONIBILIDAD */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Banner de Disponibilidad (Plazas)" icon="tabler-alert-triangle" checked={toggles.mostrar_banner_disponibilidad} onToggle={c => updateToggle('mostrar_banner_disponibilidad', c)} info="Franja informativa de cupos" />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Texto Izquierdo (Cupos Reservados)"
                  value={bannerDisponibilidad.texto_izquierdo}
                  onChange={e => setBannerDisponibilidad({ ...bannerDisponibilidad, texto_izquierdo: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Texto Derecho (Cupos Libres)"
                  value={bannerDisponibilidad.texto_derecho}
                  onChange={e => setBannerDisponibilidad({ ...bannerDisponibilidad, texto_derecho: e.target.value })}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* BENEFICIOS */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Características Destacadas (Beneficios)" icon="tabler-gift" checked={toggles.mostrar_beneficios} onToggle={c => updateToggle('mostrar_beneficios', c)} info={`${beneficios.length} beneficios`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setBeneficios, { title: '', desc: '', icon: 'tabler-bolt' })}>
              Añadir Beneficio
            </Button>
            <Grid container spacing={4}>
              {beneficios.map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                    <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setBeneficios, i)}>
                      <i className="tabler-trash" />
                    </IconButton>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                      <CustomTextField label="Icono (Clase Tabler Icons)" size="small" value={item.icon} onChange={e => updateObjItem(setBeneficios, i, 'icon', e.target.value)} />
                      <CustomTextField label="Título" size="small" value={item.title} onChange={e => updateObjItem(setBeneficios, i, 'title', e.target.value)} />
                      <CustomTextField label="Descripción" size="small" multiline rows={2} value={item.desc} onChange={e => updateObjItem(setBeneficios, i, 'desc', e.target.value)} />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* ¿ES ESTE PROGRAMA PARA TI? */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="¿Es este programa para ti?" icon="tabler-user-check" checked={toggles.mostrar_perfil} onToggle={c => updateToggle('mostrar_perfil', c)} info="Sección de perfil de ingreso" />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <CustomTextField
                fullWidth
                label="Título de la Sección"
                value={perfilEstudiante.titulo}
                onChange={e => setPerfilEstudiante({ ...perfilEstudiante, titulo: e.target.value })}
              />
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                label="Descripción de Entrada"
                value={perfilEstudiante.descripcion}
                onChange={e => setPerfilEstudiante({ ...perfilEstudiante, descripcion: e.target.value })}
              />
              <MediaField
                label="Imagen del Perfil"
                value={perfilEstudiante.imagen}
                onChange={url => setPerfilEstudiante({ ...perfilEstudiante, imagen: url })}
              />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" fontWeight={600}>Listas de Requerimientos</Typography>
                <Button variant="outlined" size="small" startIcon={<i className="tabler-plus" />} onClick={() => {
                  const arr = [...(perfilEstudiante.secciones || [])]

                  arr.push({ subtitulo: '', items: [] })
                  setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                }}>
                  Añadir Bloque de Lista
                </Button>
              </Box>
              <Stack spacing={4}>
                {(perfilEstudiante.secciones || []).map((sec: any, idxSec: number) => (
                  <Card key={idxSec} sx={{ p: 4, border: '1px solid', borderColor: 'divider', position: 'relative' }}>
                    <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => {
                      const arr = perfilEstudiante.secciones.filter((_: any, i: number) => i !== idxSec)

                      setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                    }}>
                      <i className="tabler-trash" />
                    </IconButton>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                      <CustomTextField
                        fullWidth
                        label="Subtítulo del Bloque"
                        value={sec.subtitulo}
                        onChange={e => {
                          const arr = [...perfilEstudiante.secciones]

                          arr[idxSec].subtitulo = e.target.value
                          setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                        }}
                      />
                      <Box>
                        <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 2 }}>Elementos de la Lista</Typography>
                        <Stack spacing={2}>
                          {(sec.items || []).map((item: string, idxItem: number) => (
                            <Box key={idxItem} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <i className="tabler-circle-check text-success" />
                              <CustomTextField
                                fullWidth
                                size="small"
                                value={item}
                                onChange={e => {
                                  const arr = [...perfilEstudiante.secciones]

                                  arr[idxSec].items[idxItem] = e.target.value
                                  setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                                }}
                              />
                              <IconButton size="small" color="error" onClick={() => {
                                const arr = [...perfilEstudiante.secciones]

                                arr[idxSec].items = arr[idxSec].items.filter((_: any, i: number) => i !== idxItem)
                                setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                              }}>
                                <i className="tabler-x" />
                              </IconButton>
                            </Box>
                          ))}
                          <Button variant="text" size="small" startIcon={<i className="tabler-plus" />} sx={{ alignSelf: 'flex-start' }} onClick={() => {
                            const arr = [...perfilEstudiante.secciones]

                            if (!arr[idxSec].items) arr[idxSec].items = []
                            arr[idxSec].items.push('')
                            setPerfilEstudiante({ ...perfilEstudiante, secciones: arr })
                          }}>
                            Añadir Viñeta
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ¿POR QUÉ ESTUDIAR ESTE PROGRAMA? */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="¿Por qué estudiar este programa?" icon="tabler-bulb" checked={toggles.mostrar_por_que_estudiar} onToggle={c => updateToggle('mostrar_por_que_estudiar', c)} info="Estructura de introducción, banner y 2 columnas de listas" />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <CustomTextField
                fullWidth
                label="Título Principal"
                value={porQueEstudiar.titulo}
                onChange={e => setPorQueEstudiar({ ...porQueEstudiar, titulo: e.target.value })}
                placeholder="¿Por qué estudiar el MBA en EAE Barcelona?"
              />
              <CustomTextField
                fullWidth
                multiline
                rows={4}
                label="Descripción / Párrafos de Introducción (Separados por saltos de línea)"
                value={porQueEstudiar.descripcion}
                onChange={e => setPorQueEstudiar({ ...porQueEstudiar, descripcion: e.target.value })}
                placeholder="Párrafo 1&#10;&#10;Párrafo 2&#10;&#10;Párrafo 3"
              />
              <MediaField
                label="Imagen Central (Ilustrativa)"
                value={porQueEstudiar.imagen}
                onChange={url => setPorQueEstudiar({ ...porQueEstudiar, imagen: url })}
              />

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={6}>
                {/* Columna 1 */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 3 }}>Columna 1: Competencias / Objetivos</Typography>
                    <Stack spacing={3}>
                      <CustomTextField
                        fullWidth
                        label="Título de Columna 1"
                        value={porQueEstudiar.col1_titulo}
                        onChange={e => setPorQueEstudiar({ ...porQueEstudiar, col1_titulo: e.target.value })}
                        placeholder="Este programa te prepara para:"
                      />
                      <Box>
                        <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 2 }}>Elementos de la Lista 1</Typography>
                        <Stack spacing={2}>
                          {(porQueEstudiar.col1_items || []).map((item: string, idx: number) => (
                            <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <i className="tabler-circle-check text-success" />
                              <CustomTextField
                                fullWidth
                                size="small"
                                value={item}
                                onChange={e => {
                                  const arr = [...porQueEstudiar.col1_items]

                                  arr[idx] = e.target.value
                                  setPorQueEstudiar({ ...porQueEstudiar, col1_items: arr })
                                }}
                              />
                              <IconButton size="small" color="error" onClick={() => {
                                const arr = porQueEstudiar.col1_items.filter((_: any, i: number) => i !== idx)

                                setPorQueEstudiar({ ...porQueEstudiar, col1_items: arr })
                              }}>
                                <i className="tabler-x" />
                              </IconButton>
                            </Box>
                          ))}
                          <Button variant="text" size="small" startIcon={<i className="tabler-plus" />} sx={{ alignSelf: 'flex-start' }} onClick={() => {
                            const arr = [...(porQueEstudiar.col1_items || [])]

                            arr.push('')
                            setPorQueEstudiar({ ...porQueEstudiar, col1_items: arr })
                          }}>
                            Añadir Elemento
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>

                {/* Columna 2 */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 3 }}>Columna 2: Herramientas / Temas</Typography>
                    <Stack spacing={3}>
                      <CustomTextField
                        fullWidth
                        label="Título de Columna 2"
                        value={porQueEstudiar.col2_titulo}
                        onChange={e => setPorQueEstudiar({ ...porQueEstudiar, col2_titulo: e.target.value })}
                        placeholder="Aprenderás a trabajar con:"
                      />
                      <Box>
                        <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 2 }}>Elementos de la Lista 2</Typography>
                        <Stack spacing={2}>
                          {(porQueEstudiar.col2_items || []).map((item: string, idx: number) => (
                            <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <i className="tabler-circle-check text-success" />
                              <CustomTextField
                                fullWidth
                                size="small"
                                value={item}
                                onChange={e => {
                                  const arr = [...porQueEstudiar.col2_items]

                                  arr[idx] = e.target.value
                                  setPorQueEstudiar({ ...porQueEstudiar, col2_items: arr })
                                }}
                              />
                              <IconButton size="small" color="error" onClick={() => {
                                const arr = porQueEstudiar.col2_items.filter((_: any, i: number) => i !== idx)

                                setPorQueEstudiar({ ...porQueEstudiar, col2_items: arr })
                              }}>
                                <i className="tabler-x" />
                              </IconButton>
                            </Box>
                          ))}
                          <Button variant="text" size="small" startIcon={<i className="tabler-plus" />} sx={{ alignSelf: 'flex-start' }} onClick={() => {
                            const arr = [...(porQueEstudiar.col2_items || [])]

                            arr.push('')
                            setPorQueEstudiar({ ...porQueEstudiar, col2_items: arr })
                          }}>
                            Añadir Elemento
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ¿POR QUÉ ADPH GROUP? */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="¿Por qué ADPH Group?" icon="tabler-building-fortress" checked={toggles.mostrar_por_que_nosotros} onToggle={c => updateToggle('mostrar_por_que_nosotros', c)} info="Propuesta de valor e hitos numerados" />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <CustomTextField
                fullWidth
                label="Título de la Sección"
                value={porQueNosotros.titulo}
                onChange={e => setPorQueNosotros({ ...porQueNosotros, titulo: e.target.value })}
              />
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                label="Descripción Principal"
                value={porQueNosotros.descripcion}
                onChange={e => setPorQueNosotros({ ...porQueNosotros, descripcion: e.target.value })}
              />
              <CustomTextField
                fullWidth
                label="Texto de Banner Inferior (Franja)"
                value={porQueNosotros.banner_texto}
                onChange={e => setPorQueNosotros({ ...porQueNosotros, banner_texto: e.target.value })}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" fontWeight={600}>Hitos Numerados (Pilares)</Typography>
              <Grid container spacing={4}>
                {(porQueNosotros.items || []).map((item: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Card sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                      <Stack spacing={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={3}>
                            <CustomTextField label="Número" size="small" value={item.numero} onChange={e => {
                              const arr = [...porQueNosotros.items]

                              arr[idx].numero = e.target.value
                              setPorQueNosotros({ ...porQueNosotros, items: arr })
                            }} />
                          </Grid>
                          <Grid item xs={9}>
                            <CustomTextField label="Título del Hito" size="small" value={item.titulo} onChange={e => {
                              const arr = [...porQueNosotros.items]

                              arr[idx].titulo = e.target.value
                              setPorQueNosotros({ ...porQueNosotros, items: arr })
                            }} />
                          </Grid>
                        </Grid>
                        <CustomTextField label="Descripción Corta" size="small" multiline rows={2} value={item.descripcion} onChange={e => {
                          const arr = [...porQueNosotros.items]

                          arr[idx].descripcion = e.target.value
                          setPorQueNosotros({ ...porQueNosotros, items: arr })
                        }} />
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* CERTIFICACIONES */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Prepárate para certificaciones profesionales" icon="tabler-certificate" checked={toggles.mostrar_certificaciones} onToggle={c => updateToggle('mostrar_certificaciones', c)} info={`${certificaciones.length} certificaciones`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setCertificaciones, { titulo: '', entidad: '', siglas: '', descripcion1: '', puntos: [] })}>
              Añadir Certificación
            </Button>
            <Stack spacing={4}>
              {certificaciones.map((cert, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setCertificaciones, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Título de Certificación" value={cert.titulo} onChange={e => updateObjItem(setCertificaciones, i, 'titulo', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Entidad Certificadora" value={cert.entidad} onChange={e => updateObjItem(setCertificaciones, i, 'entidad', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Siglas (Ej: PSM I)" value={cert.siglas} onChange={e => updateObjItem(setCertificaciones, i, 'siglas', e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField fullWidth size="small" multiline rows={2} label="Descripción" value={cert.descripcion1} onChange={e => updateObjItem(setCertificaciones, i, 'descripcion1', e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField fullWidth size="small" label="Puntos Clave (Separados por coma)" value={(cert.puntos || []).join(', ')} onChange={e => updateObjItem(setCertificaciones, i, 'puntos', e.target.value.split(',').map((s: string) => s.trim()))} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* HERRAMIENTAS */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Domina herramientas claves para toma de decisiones empresariales" icon="tabler-tool" checked={toggles.mostrar_herramientas} onToggle={c => updateToggle('mostrar_herramientas', c)} info={`${herramientas.length} herramientas`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setHerramientas, { name: '', icon: '' })}>
              Añadir Herramienta
            </Button>
            <Grid container spacing={4}>
              {herramientas.map((tool, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                    <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setHerramientas, i)}>
                      <i className="tabler-trash" />
                    </IconButton>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                      <CustomTextField fullWidth size="small" label="Nombre de Herramienta" value={tool.name} onChange={e => updateObjItem(setHerramientas, i, 'name', e.target.value)} />
                      <MediaField label="Icono / Logo" value={tool.icon} onChange={url => updateObjItem(setHerramientas, i, 'icon', url)} />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* ADVANCED SPECIALIZATIONS */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Advanced Specializations" icon="tabler-directions" checked={toggles.mostrar_advanced_specializations} onToggle={c => updateToggle('mostrar_advanced_specializations', c)} info="Personalización de itinerario de especialidad" />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <CustomTextField fullWidth label="Título" value={advancedSpecializations.titulo} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, titulo: e.target.value })} />
              <CustomTextField fullWidth label="Subtítulo" value={advancedSpecializations.subtitulo} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, subtitulo: e.target.value })} />
              <CustomTextField fullWidth multiline rows={2} label="Descripción Principal" value={advancedSpecializations.descripcion} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, descripcion: e.target.value })} />
              <CustomTextField fullWidth label="Título Cabecera de Focos" value={advancedSpecializations.focos_titulo} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, focos_titulo: e.target.value })} />
              <CustomTextField fullWidth label="Mensaje Destacado de Multiplicador (Foco ADPH)" value={advancedSpecializations.foco_adph} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, foco_adph: e.target.value })} />
              
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 3 }}>Pestaña 1 (Ej: Habilidades Transversales)</Typography>
                    <Stack spacing={3}>
                      <CustomTextField label="Etiqueta Pestaña 1" size="small" value={advancedSpecializations.tab1_label} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab1_label: e.target.value })} />
                      <CustomTextField label="Descripción Pestaña 1" size="small" multiline rows={3} value={advancedSpecializations.tab1_descripcion} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab1_descripcion: e.target.value })} />
                      <CustomTextField label="Habilidades / Items Pestaña 1 (Separados por coma)" size="small" value={(advancedSpecializations.tab1_items || []).join(', ')} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab1_items: e.target.value.split(',').map((s: string) => s.trim()) })} />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 3 }}>Pestaña 2 (Ej: Habilidades de Especialidad)</Typography>
                    <Stack spacing={3}>
                      <CustomTextField label="Etiqueta Pestaña 2" size="small" value={advancedSpecializations.tab2_label} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab2_label: e.target.value })} />
                      <CustomTextField label="Descripción Pestaña 2" size="small" multiline rows={3} value={advancedSpecializations.tab2_descripcion} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab2_descripcion: e.target.value })} />
                      <CustomTextField label="Habilidades / Items Pestaña 2 (Separados por coma)" size="small" value={(advancedSpecializations.tab2_items || []).join(', ')} onChange={e => setAdvancedSpecializations({ ...advancedSpecializations, tab2_items: e.target.value.split(',').map((s: string) => s.trim()) })} />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* PARTNERS INSTITUCIONALES */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Un valor añadido gracias a nuestros partners institucionales" icon="tabler-users-group" checked={toggles.mostrar_partners_institucionales} onToggle={c => updateToggle('mostrar_partners_institucionales', c)} info="Alianzas y valor institucional" />
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              <CustomTextField fullWidth label="Título Principal" value={partnersInstitucionales.titulo} onChange={e => setPartnersInstitucionales({ ...partnersInstitucionales, titulo: e.target.value })} />
              <CustomTextField fullWidth multiline rows={2} label="Descripción de Alianzas" value={partnersInstitucionales.descripcion} onChange={e => setPartnersInstitucionales({ ...partnersInstitucionales, descripcion: e.target.value })} />
              
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" fontWeight={600}>Logos de Partners</Typography>
                <Button variant="outlined" size="small" startIcon={<i className="tabler-plus" />} onClick={() => {
                  const arr = [...(partnersInstitucionales.partners || [])]

                  arr.push({ nombre: '', logo: '' })
                  setPartnersInstitucionales({ ...partnersInstitucionales, partners: arr })
                }}>
                  Añadir Partner
                </Button>
              </Box>
              <Grid container spacing={4}>
                {(partnersInstitucionales.partners || []).map((partner: any, idx: number) => (
                  <Grid item xs={12} md={4} key={idx}>
                    <Card sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                      <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => {
                        const arr = partnersInstitucionales.partners.filter((_: any, i: number) => i !== idx)

                        setPartnersInstitucionales({ ...partnersInstitucionales, partners: arr })
                      }}>
                        <i className="tabler-trash" />
                      </IconButton>
                      <Stack spacing={3} sx={{ mt: 2 }}>
                        <CustomTextField label="Nombre del Partner" size="small" value={partner.nombre} onChange={e => {
                          const arr = [...partnersInstitucionales.partners]

                          arr[idx].nombre = e.target.value
                          setPartnersInstitucionales({ ...partnersInstitucionales, partners: arr })
                        }} />
                        <MediaField label="Logo Institucional" value={partner.logo} onChange={url => {
                          const arr = [...partnersInstitucionales.partners]

                          arr[idx].logo = url
                          setPartnersInstitucionales({ ...partnersInstitucionales, partners: arr })
                        }} />
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* RANKINGS Y ACREDITACIONES */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Rankings y Acreditaciones" icon="tabler-award" checked={toggles.mostrar_rankings} onToggle={c => updateToggle('mostrar_rankings', c)} info={`${rankings.length} acreditaciones`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setRankings, { titulo: '', descripcion: '', logo: '' })}>
              Añadir Acreditación
            </Button>
            <Stack spacing={4}>
              {rankings.map((rank, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setRankings, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <CustomTextField fullWidth size="small" label="Título del Ranking" value={rank.titulo} onChange={e => updateObjItem(setRankings, i, 'titulo', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MediaField label="Logo del Ranking" value={rank.logo} onChange={url => updateObjItem(setRankings, i, 'logo', url)} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField fullWidth size="small" label="Descripción" value={rank.descripcion} onChange={e => updateObjItem(setRankings, i, 'descripcion', e.target.value)} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* SALIDAS PROFESIONALES */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Salidas profesionales" icon="tabler-briefcase" checked={toggles.mostrar_salidas} onToggle={c => updateToggle('mostrar_salidas', c)} info={`${salidasProfesionales.length} salidas profesionales`} />
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <CustomTextField fullWidth label="Nueva Salida Profesional" size="small" value={newSalida} onChange={e => setNewSalida(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTextItem(setSalidasProfesionales, newSalida, setNewSalida) }} />
              <Button variant="contained" sx={{ alignSelf: 'flex-end', height: 40 }} onClick={() => addTextItem(setSalidasProfesionales, newSalida, setNewSalida)}>Añadir</Button>
            </Box>
            <Grid container spacing={4}>
              {salidasProfesionales.map((salida, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2">{salida}</Typography>
                    <IconButton size="small" color="error" onClick={() => removeIndexItem(setSalidasProfesionales, i)}>
                      <i className="tabler-x" />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* DONDE TRABAJAN NUESTROS ESTUDIANTES */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Donde trabajan nuestros estudiantes (Empresas)" icon="tabler-brand-meta" checked={toggles.mostrar_empresas} onToggle={c => updateToggle('mostrar_empresas', c)} info={`${empresas.length} empresas`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setEmpresas, { nombre: '', logo: '' })}>
              Añadir Empresa
            </Button>
            <Grid container spacing={4}>
              {empresas.map((emp, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                    <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setEmpresas, i)}>
                      <i className="tabler-trash" />
                    </IconButton>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                      <CustomTextField fullWidth size="small" label="Nombre de la Empresa" value={emp.nombre} onChange={e => updateObjItem(setEmpresas, i, 'nombre', e.target.value)} />
                      <MediaField label="Logo Corporativo" value={emp.logo} onChange={url => updateObjItem(setEmpresas, i, 'logo', url)} />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* DIRECCIÓN DEL MÁSTER */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Dirección del máster" icon="tabler-user" checked={toggles.mostrar_director} onToggle={c => updateToggle('mostrar_director', c)} info="Director y perfil académico" />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  label="Nombre Completo"
                  value={director.nombre || ''}
                  onChange={e => setDirector({ ...director, nombre: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MediaField
                  label="Fotografía del Director"
                  value={director.foto || ''}
                  onChange={url => setDirector({ ...director, foto: url })}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Biografía / Trayectoria"
                  value={director.descripcion || ''}
                  onChange={e => setDirector({ ...director, descripcion: e.target.value })}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* ACOMPAÑAMIENTO AL ALUMNO */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Acompañamiento al alumno" icon="tabler-users" checked={toggles.mostrar_acompanamiento} onToggle={c => updateToggle('mostrar_acompanamiento', c)} info={`${acompanamiento.length} bloques de soporte`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setAcompanamiento, { titulo: '', descripcion: '', icono: '' })}>
              Añadir Bloque de Soporte
            </Button>
            <Stack spacing={4}>
              {acompanamiento.map((acomp, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setAcompanamiento, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Título" value={acomp.titulo} onChange={e => updateObjItem(setAcompanamiento, i, 'titulo', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Icono" value={acomp.icono} onChange={e => updateObjItem(setAcompanamiento, i, 'icono', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Descripción" value={acomp.descripcion} onChange={e => updateObjItem(setAcompanamiento, i, 'descripcion', e.target.value)} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* PROCESO DE ADMISIÓN */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Proceso de admisión" icon="tabler-clipboard-list" checked={toggles.mostrar_admision} onToggle={c => updateToggle('mostrar_admision', c)} info={`${procesoAdmision.length} pasos`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setProcesoAdmision, { numero: '01', titulo: '', descripcion: '' })}>
              Añadir Paso de Admisión
            </Button>
            <Stack spacing={4}>
              {procesoAdmision.map((paso, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setProcesoAdmision, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={2}>
                      <CustomTextField fullWidth size="small" label="Nº de Paso" value={paso.numero} onChange={e => updateObjItem(setProcesoAdmision, i, 'numero', e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={5}>
                      <CustomTextField fullWidth size="small" label="Título del Paso" value={paso.titulo} onChange={e => updateObjItem(setProcesoAdmision, i, 'titulo', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <CustomTextField fullWidth size="small" label="Descripción" value={paso.descripcion} onChange={e => updateObjItem(setProcesoAdmision, i, 'descripcion', e.target.value)} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* REQUISITOS DE ADMISIÓN */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Requisitos" icon="tabler-key" checked={true} onToggle={() => {}} info={`${requisitosAdmision.length} requisitos registrados`} />
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <CustomTextField fullWidth label="Nuevo Requisito de Admisión" size="small" value={newRequisito} onChange={e => setNewRequisito(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTextItem(setRequisitosAdmision, newRequisito, setNewRequisito) }} />
              <Button variant="contained" sx={{ alignSelf: 'flex-end', height: 40 }} onClick={() => addTextItem(setRequisitosAdmision, newRequisito, setNewRequisito)}>Añadir</Button>
            </Box>
            <Grid container spacing={4}>
              {requisitosAdmision.map((req, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2">{req}</Typography>
                    <IconButton size="small" color="error" onClick={() => removeIndexItem(setRequisitosAdmision, i)}>
                      <i className="tabler-x" />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* AYUDAS Y BECAS */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Ayudas y Becas" icon="tabler-coin" checked={toggles.mostrar_becas} onToggle={c => updateToggle('mostrar_becas', c)} info={`${becas.length} becas`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setBecas, { title: '', description: '', items: [] })}>
              Añadir Beca
            </Button>
            <Stack spacing={4}>
              {becas.map((beca, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setBecas, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <CustomTextField fullWidth size="small" label="Título del Programa de Beca" value={beca.title} onChange={e => updateObjItem(setBecas, i, 'title', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomTextField fullWidth size="small" label="Descripción" value={beca.description} onChange={e => updateObjItem(setBecas, i, 'description', e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField fullWidth size="small" label="Requisitos (Separados por coma)" value={(beca.items || []).join(', ')} onChange={e => updateObjItem(setBecas, i, 'items', e.target.value.split(',').map((s: string) => s.trim()))} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* PREGUNTAS FRECUENTES (FAQS) */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Preguntas Frecuentes (FAQs)" icon="tabler-help-circle" checked={toggles.mostrar_faqs} onToggle={c => updateToggle('mostrar_faqs', c)} info={`${faqs.length} FAQs`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setFaqs, { question: '', answer: '' })}>
              Añadir Pregunta
            </Button>
            <Stack spacing={4}>
              {faqs.map((faq, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setFaqs, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <CustomTextField fullWidth label="Pregunta" size="small" value={faq.question} onChange={e => updateObjItem(setFaqs, i, 'question', e.target.value)} />
                    <CustomTextField fullWidth label="Respuesta" size="small" multiline rows={2} value={faq.answer} onChange={e => updateObjItem(setFaqs, i, 'answer', e.target.value)} />
                  </Stack>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* PROGRAMAS RELACIONADOS */}
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>
            <SectionHeader title="Programas Relacionados" icon="tabler-chart-bubble" checked={toggles.mostrar_relacionados} onToggle={c => updateToggle('mostrar_relacionados', c)} info={`${programasRelacionados.length} programas`} />
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" startIcon={<i className="tabler-plus" />} sx={{ mb: 4 }} onClick={() => addObjItem(setProgramasRelacionados, { title: '', category: '', description: '', image: '' })}>
              Añadir Programa Relacionado
            </Button>
            <Stack spacing={4}>
              {programasRelacionados.map((prog, i) => (
                <Card key={i} sx={{ p: 4, position: 'relative', border: '1px solid', borderColor: 'divider' }}>
                  <IconButton size="small" color="error" sx={{ position: 'absolute', top: 4, right: 4 }} onClick={() => removeIndexItem(setProgramasRelacionados, i)}>
                    <i className="tabler-trash" />
                  </IconButton>
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Título del Programa" value={prog.title} onChange={e => updateObjItem(setProgramasRelacionados, i, 'title', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CustomTextField fullWidth size="small" label="Categoría" value={prog.category} onChange={e => updateObjItem(setProgramasRelacionados, i, 'category', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <MediaField label="Imagen de Portada" value={prog.image} onChange={url => updateObjItem(setProgramasRelacionados, i, 'image', url)} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField fullWidth size="small" label="Descripción Breve" value={prog.description} onChange={e => updateObjItem(setProgramasRelacionados, i, 'description', e.target.value)} />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

      </Stack>

      {/* STICKY BOTTOM SAVE ACTION BAR */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 100,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled={editMutation.isPending}
          onClick={handleSaveAll}
          startIcon={<i className="tabler-device-floppy" />}
          sx={{ px: 6, py: 3, fontWeight: 700, borderRadius: '12px' }}
        >
          {editMutation.isPending ? 'Guardando...' : 'Guardar Cambios de Landing'}
        </Button>
      </Box>

    </Box>
  )
}
