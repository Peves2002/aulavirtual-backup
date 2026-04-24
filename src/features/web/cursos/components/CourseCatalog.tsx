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
  Tooltip,
  Divider,
  Badge,
  Fab
} from '@mui/material'
import { Search, X, Filter, ShoppingCart, RefreshCw, ChevronDown } from "lucide-react";
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
}

const CourseCatalog = ({ courses, categories }: CourseCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedModality, setSelectedModality] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const { itemCount, setIsCartDrawerOpen } = useCart()

  const searchParams = useSearchParams()

  useEffect(() => {
    const catId = searchParams.get('categoria')
    if (catId) {
      setSelectedCategory(catId)
    } else {
      setSelectedCategory('all')
    }
  }, [searchParams])

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.descripcion && course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || course.categoria?.slug === selectedCategory
      const matchesLevel = selectedLevel === 'all' || course.nivel === selectedLevel
      const matchesPrice = selectedPrice === 'all' ||
        (selectedPrice === 'free' ? course.es_gratis : !course.es_gratis)
      const matchesModality = selectedModality === 'all' || course.tipo_emision === selectedModality

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesModality
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime()
      } else if (sortBy === 'alphabetical') {
        return a.titulo.localeCompare(b.titulo)
      }
      return 0
    })
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPrice, selectedModality, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedLevel('all')
    setSelectedPrice('all')
    setSelectedModality('all')
    setSortBy('recent')
  }

  const hasFilters = searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedPrice !== 'all' ||
    selectedModality !== 'all' ||
    sortBy !== 'recent'

  return (
    <div className="elite-landing">
      <Box sx={{ bgcolor: '#fdfdfd', minHeight: '100vh', pb: 20 }}>
        <Container maxWidth={false} sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
          <Stack spacing={8}>
            {/* Search & Filters Controls */}
            <Stack spacing={4} alignItems="center">
              {/* Search Bar Elite */}
              <div className="w-full max-w-3xl relative">
                <input 
                  type="text"
                  placeholder="Buscar programa o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-20 px-8 pl-16 rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-bold text-lg text-primary placeholder:text-slate-300"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/30" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-primary" />
                  </button>
                )}
              </div>

              {/* Advanced Filter Bar */}
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                py: 4,
                px: 4,
                bgcolor: 'white',
                borderRadius: '3rem',
                border: '1px solid #f1f5f9',
                boxShadow: '0 20px 40px rgba(39, 67, 91, 0.03)'
              }}>
                {/* Categoría */}
                <TextField
                  select
                  size="small"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '1.5rem',
                      fontWeight: 800,
                      bgcolor: selectedCategory !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                      color: selectedCategory !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                      border: '1.5px solid',
                      borderColor: selectedCategory !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                      '& fieldset': { border: 'none' },
                    }
                  }}
                  sx={{ minWidth: 180 }}
                >
                  <MenuItem value="all">Especialidades</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.slug}>{cat.nombre}</MenuItem>
                  ))}
                </TextField>

                {/* Nivel */}
                <TextField
                  select
                  size="small"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '1.5rem',
                      fontWeight: 800,
                      bgcolor: selectedLevel !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                      color: selectedLevel !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                      border: '1.5px solid',
                      borderColor: selectedLevel !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                      '& fieldset': { border: 'none' },
                    }
                  }}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="all">Nivel</MenuItem>
                  <MenuItem value="BASICO">Básico</MenuItem>
                  <MenuItem value="INTERMEDIO">Intermedio</MenuItem>
                  <MenuItem value="AVANZADO">Avanzado</MenuItem>
                </TextField>

                {/* Modalidad */}
                <TextField
                  select
                  size="small"
                  value={selectedModality}
                  onChange={(e) => setSelectedModality(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '1.5rem',
                      fontWeight: 800,
                      bgcolor: selectedModality !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                      color: selectedModality !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                      border: '1.5px solid',
                      borderColor: selectedModality !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                      '& fieldset': { border: 'none' },
                    }
                  }}
                  sx={{ minWidth: 160 }}
                >
                  <MenuItem value="all">Modalidad</MenuItem>
                  <MenuItem value="ASINCRONO">Asíncrono</MenuItem>
                  <MenuItem value="SINCRONO">En Vivo</MenuItem>
                  <MenuItem value="MIXTO">Mixto</MenuItem>
                </TextField>

                <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 1 }} />

                {/* Ordenamiento */}
                <TextField
                  select
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '1.5rem',
                      fontWeight: 800,
                      bgcolor: '#f8fafc',
                      color: 'primary.main',
                      '& fieldset': { border: 'none' },
                    }
                  }}
                  sx={{ minWidth: 180 }}
                >
                  <MenuItem value="recent">Recientes primero</MenuItem>
                  <MenuItem value="alphabetical">A - Z</MenuItem>
                </TextField>

                {hasFilters && (
                  <IconButton
                    onClick={clearFilters}
                    sx={{
                      bgcolor: 'rgba(224, 123, 57, 0.1)',
                      color: 'hsl(var(--accent))',
                      '&:hover': { bgcolor: 'rgba(224, 123, 57, 0.2)' },
                      width: 48,
                      height: 48,
                      borderRadius: '1rem'
                    }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </IconButton>
                )}
              </Box>
            </Stack>

            <Fade in={true} timeout={1000}>
              <Box>
                <div className="flex items-center gap-3 mb-10 px-4">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                   <span className="text-sm font-black text-primary/40 uppercase tracking-[0.3em]">
                     {filteredAndSortedCourses.length} Programas Encontrados
                   </span>
                </div>
                <CourseList courses={filteredAndSortedCourses} />
              </Box>
            </Fade>
          </Stack>
        </Container>

        {/* Carrito Flotante Elite */}
        <Fab
          onClick={() => setIsCartDrawerOpen(true)}
          className="fixed bottom-10 right-10 w-20 h-20 bg-primary text-white hover:bg-accent transition-all duration-500 shadow-2xl shadow-primary/40 group overflow-hidden"
        >
          <Badge 
            badgeContent={itemCount} 
            color="error" 
            sx={{ 
                '& .MuiBadge-badge': { 
                    fontSize: '0.8rem', 
                    height: 24, 
                    minWidth: 24, 
                    borderRadius: 12, 
                    fontWeight: 900,
                    bgcolor: 'hsl(var(--accent))',
                    border: '2px solid #27435b'
                } 
            }}
          >
            <ShoppingCart className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Badge>
        </Fab>
      </Box>
    </div>
  )
}

export default CourseCatalog
