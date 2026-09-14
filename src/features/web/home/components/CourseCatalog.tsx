'use client'

import { useState, useMemo, useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  Fade,
  MenuItem,
  IconButton,
  Badge,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material'

import CourseList from './CourseList'
import { useCart } from '../../cart/context/CartContext'

interface Category {
  id: string
  nombre: string
  slug: string
}

interface CourseCatalogProps {
  courses: any[]
  categories: Category[]
  type?: 'curso' | 'diplomado' | 'programa' | 'especializacion'
}

// Para el filtro de Área (mockeado hasta que exista data real en el backend)


const CourseCatalog = ({ courses, categories, type = 'curso' }: CourseCatalogProps) => {
  const label = type === 'diplomado' ? 'diplomados' : type === 'programa' ? 'programas' : type === 'especializacion' ? 'especializaciones' : 'cursos'
  const labelCapitalized = type === 'diplomado' ? 'Diplomados' : type === 'programa' ? 'Programas' : type === 'especializacion' ? 'Especializaciones' : 'Cursos'
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedModalities, setSelectedModalities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('recent')
  
  const { itemCount, setIsCartDrawerOpen } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    const catSlug = searchParams.get('categoria')

    if (catSlug) {
      const foundCat = categories.find(c => c.slug === catSlug)

      setSelectedAreas(foundCat ? [foundCat.nombre] : [catSlug])
    } else {
      setSelectedAreas([])
    }
  }, [searchParams, categories])

  const handleToggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    )
  }

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleToggleModality = (modality: string) => {
    setSelectedModalities(prev => 
      prev.includes(modality) ? prev.filter(m => m !== modality) : [...prev, modality]
    )
  }

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.descripcion && course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategories.length === 0 || 
        (course.tipo && selectedCategories.map(c => c.toUpperCase()).includes(course.tipo.toUpperCase() === 'PROGRAMA' ? 'PROGRAMAS' : course.tipo.toUpperCase()))

      const matchesArea = selectedAreas.length === 0 || 
        (course.categoria?.nombre && selectedAreas.includes(course.categoria.nombre))

      const matchesModality = selectedModalities.length === 0 || 
        (course.tipo_emision && selectedModalities.includes(course.tipo_emision))

      return matchesSearch && matchesCategory && matchesArea && matchesModality
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime()
      } else if (sortBy === 'alphabetical') {
        return a.titulo.localeCompare(b.titulo)
      }

      return 0
    })
  }, [courses, searchTerm, selectedCategories, selectedAreas, selectedModalities, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedAreas([])
    setSelectedCategories([])
    setSelectedModalities([])
    setSortBy('recent')
  }

  const hasFilters = searchTerm !== '' ||
    selectedAreas.length > 0 ||
    selectedCategories.length > 0 ||
    selectedModalities.length > 0 ||
    sortBy !== 'recent'

  const AREAS_LIST = useMemo(() => categories.map(c => c.nombre), [categories])
  const CATEGORIAS_LIST = ['Curso', 'Diplomado', 'Programas']

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      <Container maxWidth={false} sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1.5, color: '#1e293b', letterSpacing: '-0.03em' }}>
            Nuestros {labelCapitalized}
          </Typography>
          <Typography variant="h6" sx={{ color: '#475569', fontWeight: 500, maxWidth: 600, mx: 'auto' }}>
            Encuentra el {label === 'cursos' ? 'curso' : label === 'diplomados' ? 'diplomado' : 'programa'} que impulse tu carrera profesional
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
          
          {/* Sidebar Filters */}
          <Stack spacing={2} sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, color: '#1e293b' }}>
                Filtros <i className="tabler-filter" style={{ fontSize: '1.2rem' }} />
              </Typography>
              {hasFilters && (
                <Button size="small" onClick={clearFilters} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Limpiar
                </Button>
              )}
            </Box>

            {/* 1. Categoría */}
            <Accordion 
              defaultExpanded 
              disableGutters 
              elevation={0} 
              sx={{ 
                bgcolor: 'white', 
                borderRadius: '12px !important', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                '&:before': { display: 'none' },
                overflow: 'hidden'
              }}
            >
              <AccordionSummary 
                expandIcon={<i className="tabler-chevron-left" style={{ fontSize: '1.2rem', color: '#475569' }} />} 
                sx={{ px: 2.5, minHeight: 56, '& .MuiAccordionSummary-content': { my: 1.5 } }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '1.05rem', color: '#1e293b' }}>Categoría</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <FormGroup>
                  {CATEGORIAS_LIST.map(cat => (
                    <FormControlLabel 
                      key={cat}
                      control={
                        <Checkbox 
                          size="small" 
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleToggleCategory(cat)}
                          sx={{ color: '#cbd5e1', '&.Mui-checked': { color: 'var(--mui-palette-primary-main)' }, p: 0.5, mr: 1 }}
                        />
                      } 
                      label={<Typography variant="body2" sx={{ color: '#475569', fontSize: '0.95rem' }}>{cat}</Typography>} 
                      sx={{ mb: 1, ml: 0 }}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            {/* 2. Área */}
            <Accordion 
              defaultExpanded 
              disableGutters 
              elevation={0} 
              sx={{ 
                bgcolor: 'white', 
                borderRadius: '12px !important', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                '&:before': { display: 'none' },
                overflow: 'hidden'
              }}
            >
              <AccordionSummary 
                expandIcon={<i className="tabler-chevron-left" style={{ fontSize: '1.2rem', color: '#475569' }} />} 
                sx={{ px: 2.5, minHeight: 56, '& .MuiAccordionSummary-content': { my: 1.5 } }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '1.05rem', color: '#1e293b' }}>Área</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <FormGroup>
                  {AREAS_LIST.map(area => (
                    <FormControlLabel 
                      key={area}
                      control={
                        <Checkbox 
                          size="small" 
                          checked={selectedAreas.includes(area)}
                          onChange={() => handleToggleArea(area)}
                          sx={{ color: '#cbd5e1', '&.Mui-checked': { color: 'var(--mui-palette-primary-main)' }, p: 0.5, mr: 1 }}
                        />
                      } 
                      label={<Typography variant="body2" sx={{ color: '#475569', fontSize: '0.95rem' }}>{area}</Typography>} 
                      sx={{ mb: 1, ml: 0 }}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            {/* 3. Modalidad */}
            <Accordion 
              defaultExpanded 
              disableGutters 
              elevation={0} 
              sx={{ 
                bgcolor: 'white', 
                borderRadius: '12px !important', 
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                '&:before': { display: 'none' },
                overflow: 'hidden'
              }}
            >
              <AccordionSummary 
                expandIcon={<i className="tabler-chevron-left" style={{ fontSize: '1.2rem', color: '#475569' }} />} 
                sx={{ px: 2.5, minHeight: 56, '& .MuiAccordionSummary-content': { my: 1.5 } }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '1.05rem', color: '#1e293b' }}>Modalidad</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <FormGroup>
                  {[
                    { value: 'ASINCRONO', label: 'Asincrónico' },
                    { value: 'SINCRONO', label: 'Sincrónico' },
                    { value: 'MIXTO', label: 'Híbrido' }
                  ].map(mod => (
                    <FormControlLabel 
                      key={mod.value}
                      control={
                        <Checkbox 
                          size="small" 
                          checked={selectedModalities.includes(mod.value)}
                          onChange={() => handleToggleModality(mod.value)}
                          sx={{ color: '#cbd5e1', '&.Mui-checked': { color: 'var(--mui-palette-primary-main)' }, p: 0.5, mr: 1 }}
                        />
                      } 
                      label={<Typography variant="body2" sx={{ color: '#475569', fontSize: '0.95rem' }}>{mod.label}</Typography>} 
                      sx={{ mb: 1, ml: 0 }}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

          </Stack>

          {/* Main Content Area */}
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}>
              {/* Search */}
              <TextField
                placeholder={`Buscar ${label}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1, maxWidth: 600 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-search" style={{ color: 'var(--mui-palette-primary-main)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <i className="tabler-x" style={{ fontSize: '1rem' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '16px',
                    bgcolor: 'white',
                    border: '1px solid #e2e8f0',
                    '& fieldset': { border: 'none' },
                    height: 48
                  }
                }}
              />
              
              {/* Order */}
              <TextField
                select
                size="small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-sort-ascending" style={{ color: 'var(--mui-palette-primary-main)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    '& fieldset': { border: 'none' },
                    bgcolor: '#ffffff',
                    height: 48,
                    minWidth: 180
                  }
                }}
              >
                <MenuItem value="recent">Recientes primero</MenuItem>
                <MenuItem value="alphabetical">A - Z</MenuItem>
              </TextField>
            </Box>

            <Fade in={true} timeout={1000}>
              <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 3, px: 1 }}>
                  <Chip
                    label={`${filteredAndSortedCourses.length} ${label} disponibles`}
                    size="small"
                    sx={{ bgcolor: 'white', fontWeight: 700, color: 'text.secondary', border: '1px solid #e2e8f0', px: 1 }}
                  />
                </Stack>
                <CourseList courses={filteredAndSortedCourses} label={label} />
              </Box>
            </Fade>

          </Box>
        </Box>
      </Container>

      {/* Carrito Flotante */}
      <Fab
        color="primary"
        aria-label="cart"
        onClick={() => setIsCartDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: '0 8px 32px rgba(var(--mui-palette-primary-mainChannel) / 0.4)',
          height: 70,
          width: 70,
          '&:hover': { transform: 'scale(1.1)' },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <Badge badgeContent={itemCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.9rem', height: 24, minWidth: 24, borderRadius: 12, fontWeight: 800 } }}>
          <i className="tabler-shopping-cart" style={{ fontSize: '2rem' }} />
        </Badge>
      </Fab>
    </Box>
  )
}

export default CourseCatalog
