'use client'

import { useState, useEffect } from "react"

import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"

import { ArrowRight, Search, X, RefreshCw } from "lucide-react"

import { Box, TextField, MenuItem, IconButton, Divider } from "@mui/material"

import { getAssetPath } from "@/lib/assets"
import CourseCard from "@/features/web/cursos/components/CourseCard"

import { Button } from "./ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel"

const socialMedia = [
  { icon: getAssetPath("iconos/facebook.svg"), link: "#", name: "Facebook", color: "bg-[#1877F2]", shadow: "shadow-[#1877F2]/20" },
  { icon: getAssetPath("iconos/instagram.svg"), link: "#", name: "Instagram", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", shadow: "shadow-[#ee2a7b]/20" },
  { icon: getAssetPath("iconos/youtube.svg"), link: "#", name: "YouTube", color: "bg-[#FF0000]", shadow: "shadow-[#FF0000]/20" },
  { icon: getAssetPath("iconos/tiktok.svg"), link: "#", name: "TikTok", color: "bg-black", shadow: "shadow-black/20" },
];

type Category = { id: string; nombre: string; slug: string }
type Course = {
  id: string
  titulo: string
  slug: string
  miniatura?: string
  precio: number
  moneda: string
  es_gratis: boolean
  duracion?: string | null
  video_presentacion?: string | null
  nivel?: string
  tipo_emision?: string
  fecha_inicio?: string | null
  creado_en?: string
  es_comprado?: boolean
  categoria?: { nombre: string; slug?: string }
  profesor: { id?: string; slug?: string; nombre: string; apellido: string; avatar?: string }
  descripcion?: string
}

export function AulaVirtualSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedModality, setSelectedModality] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

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

  useEffect(() => {
    fetch('/api/web/catalogo')
      .then(r => r.json())
      .then(data => {
        const payload = data?.result ?? data;

        setCourses(payload?.courses ?? []);
        setCategories(payload?.categories ?? []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.descripcion && course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || course.categoria?.slug === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.nivel === selectedLevel

    const matchesPrice = selectedPrice === 'all' ||
      (selectedPrice === 'free' ? course.es_gratis : !course.es_gratis)

    const matchesModality = selectedModality === 'all' || course.tipo_emision === selectedModality

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesModality
  }).sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.creado_en || 0).getTime() - new Date(a.creado_en || 0).getTime()
    } else if (sortBy === 'alphabetical') {
      return a.titulo.localeCompare(b.titulo)
    }

    return 0
  });

  return (
    <section id="aula-virtual" className="relative py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header compacto en una fila */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-frost text-primary font-bold text-xs uppercase tracking-[0.4em] mb-3">
              Elite Academy
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-black text-primary leading-tight tracking-tighter">
              Lidera la <span className="text-gradient-orange">Construcción 4.0</span>
            </h2>
            <p className="text-slate-500 text-base font-medium mt-2 max-w-lg">
              Capacitaciones de alto nivel diseñadas por expertos para el mercado global.
            </p>
          </motion.div>

          <div className="flex items-center gap-6 shrink-0">
            {/* Mini stat */}
            <div className="hidden lg:flex items-center gap-3 glass-modern bg-white/70 px-6 py-3 rounded-2xl shadow">
              <span className="text-3xl font-black text-primary leading-none">500+</span>
              <div className="flex flex-col">
                <span className="text-xs font-black text-primary uppercase tracking-widest">Graduados</span>
                <div className="flex -space-x-2 mt-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-[8px] font-black">+</div>
                </div>
              </div>
            </div>
            <Link href="/cursos">
              <Button className="bg-primary hover:bg-orange-600 text-white font-black px-7 py-5 text-sm rounded-2xl glow-orange shadow-xl group">
                Explorar Cursos
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filters Controls */}
        <div className="flex flex-col gap-4 items-center mb-8">
          {/* Search Bar Elite */}
          <div className="w-full max-w-3xl relative">
            <input
              type="text"
              placeholder="Buscar programa o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 px-8 pl-16 rounded-3xl bg-white border border-slate-100 shadow-xl focus:outline-none transition-all font-bold text-lg text-[var(--primary-main)] placeholder:text-slate-300"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--primary-main)] opacity-30" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 text-[var(--primary-main)]" />
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
            py: 2,
            px: 4,
            bgcolor: 'white',
            borderRadius: '3rem',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 30px rgba(39, 67, 91, 0.03)'
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
                  fontFamily: "'Poppins', sans-serif",
                  bgcolor: selectedCategory !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                  color: selectedCategory !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                  border: '1.5px solid',
                  borderColor: selectedCategory !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                  '& fieldset': { border: 'none' },
                }
              }}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiMenuItem-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 600 } }
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
                  fontFamily: "'Poppins', sans-serif",
                  bgcolor: selectedLevel !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                  color: selectedLevel !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                  border: '1.5px solid',
                  borderColor: selectedLevel !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                  '& fieldset': { border: 'none' },
                }
              }}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiMenuItem-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 600 } }
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
                  fontFamily: "'Poppins', sans-serif",
                  bgcolor: selectedModality !== 'all' ? 'rgba(224, 123, 57, 0.05)' : '#f8fafc',
                  color: selectedModality !== 'all' ? 'hsl(var(--accent))' : 'primary.main',
                  border: '1.5px solid',
                  borderColor: selectedModality !== 'all' ? 'hsl(var(--accent))' : 'transparent',
                  '& fieldset': { border: 'none' },
                }
              }}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiMenuItem-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 600 } }
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
                  fontFamily: "'Poppins', sans-serif",
                  bgcolor: '#f8fafc',
                  color: 'primary.main',
                  '& fieldset': { border: 'none' },
                }
              }}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiMenuItem-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 600 } }
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
        </div>

        {/* Course Carousel */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-slate-400 font-bold py-16">No hay cursos disponibles en esta categoría.</p>
        ) : (
          <div className="relative">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-8">
                <AnimatePresence mode="popLayout">
                  {filteredCourses.map((course, idx) => (
                    <CarouselItem key={course.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full"
                      >
                        <CourseCard
                          id={course.id}
                          titulo={course.titulo}
                          slug={course.slug}
                          miniatura={course.miniatura}
                          precio={course.precio}
                          moneda={course.moneda}
                          es_gratis={course.es_gratis}
                          profesor={course.profesor}
                          categoria={course.categoria}
                          nivel={course.nivel}
                          tipo_emision={course.tipo_emision}
                          fecha_inicio={course.fecha_inicio}
                          creado_en={course.creado_en}
                          duracion={course.duracion}
                          es_comprado={course.es_comprado}
                          video_presentacion={course.video_presentacion}
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {/* Notify Me / Upcoming Form */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 glass-dark p-8 md:p-12 rounded-[2rem] relative overflow-hidden text-center text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
              Próximos lanzamientos <span className="text-gradient-orange">exclusivos</span>.
            </h3>
            <p className="text-slate-300 text-base font-medium mb-6">
              Suscríbete para ser el primero en recibir acceso anticipado y descuentos VIP en nuestros nuevos cursos certificados.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 p-2 glass-frost rounded-3xl">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="bg-transparent border-none text-white px-6 py-4 outline-none flex-1 font-bold placeholder:text-white/40"
              />
              <Button className="bg-primary hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl">
                NOTIFICARME
              </Button>
            </form>
          </div>
        </motion.div> */}
      </div>

      {/* Social Media - Bottom Right Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 right-4 lg:right-12 flex flex-col items-end gap-3 z-20 pointer-events-auto"
      >
        <span className="text-primary/40 font-black text-[10px] uppercase tracking-[0.4em] mr-2">
          Redes Sociales
        </span>
        <div className="flex flex-row gap-4">
          {socialMedia.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-300 group ${social.shadow}`}
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-6 h-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
