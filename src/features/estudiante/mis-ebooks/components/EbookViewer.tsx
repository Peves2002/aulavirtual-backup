/* eslint-disable import/no-unresolved */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

type ToolType = 'select' | 'highlight' | 'underline'

interface AnnotRect {
  x: number
  y: number
  width: number
  height: number
}

interface Annotation {
  id: string
  pagina: number
  tipo: string
  texto?: string | null
  color: string
  posicion: { rects: AnnotRect[] }
}

const COLORS = [
  { value: '#fbbf24', label: 'Amarillo' },
  { value: '#86efac', label: 'Verde' },
  { value: '#93c5fd', label: 'Azul' },
  { value: '#f9a8d4', label: 'Rosa' },
  { value: '#fca5a5', label: 'Rojo' },
]

function getSelectionRects(container: HTMLElement): AnnotRect[] {
  const selection = window.getSelection()

  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return []

  const range = selection.getRangeAt(0)
  const box = container.getBoundingClientRect()

  return Array.from(range.getClientRects())
    .filter(r => r.width > 2 && r.height > 2)
    .map(r => ({
      x: ((r.left - box.left) / box.width) * 100,
      y: ((r.top - box.top) / box.height) * 100,
      width: (r.width / box.width) * 100,
      height: (r.height / box.height) * 100,
    }))
}

// ── overlay de anotaciones ────────────────────────────────────────────────
function AnnotationLayer({ annotations, pageNumber, onDelete }: {
  annotations: Annotation[]
  pageNumber: number
  onDelete: (id: string) => void
}) {
  const pageAnnots = annotations.filter(a => a.pagina === pageNumber)

  if (pageAnnots.length === 0) return null

  return (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {pageAnnots.map(annot =>
        annot.posicion.rects.map((rect, i) => (
          <Box
            key={`${annot.id}-${i}`}
            onClick={e => { e.stopPropagation(); if (confirm('¿Eliminar anotación?')) onDelete(annot.id) }}
            sx={{
              position: 'absolute',
              left: `${rect.x}%`, top: `${rect.y}%`,
              width: `${rect.width}%`, height: `${rect.height}%`,
              pointerEvents: 'all', cursor: 'pointer',
              ...(annot.tipo === 'highlight'
                ? { bgcolor: annot.color, opacity: 0.45, mixBlendMode: 'multiply' }
                : { borderBottom: `2.5px solid ${annot.color}`, opacity: 0.85 }),
            }}
            title={annot.texto ?? 'Clic para eliminar'}
          />
        ))
      )}
    </Box>
  )
}

// ── página individual ─────────────────────────────────────────────────────
function PageItem({ pageNumber, pageWidth, tool, color, ebookId, annotations, onAnnotationSaved, onAnnotationDeleted, onVisible, pageRef: externalRef }: {
  pageNumber: number
  pageWidth: number
  tool: ToolType
  color: string
  ebookId: string
  annotations: Annotation[]
  onAnnotationSaved: (a: Annotation) => void
  onAnnotationDeleted: (id: string) => void
  onVisible: (page: number) => void
  pageRef: (el: HTMLDivElement | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // IntersectionObserver para rastrear qué página es visible
  useEffect(() => {
    const el = ref.current

    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio >= 0.4) onVisible(pageNumber) },
      { threshold: 0.4 }
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [pageNumber, onVisible])

  const handleMouseUp = useCallback(async () => {
    if (tool === 'select' || !ref.current) return

    const rects = getSelectionRects(ref.current)

    if (rects.length === 0) return

    const selectedText = window.getSelection()?.toString() ?? ''

    window.getSelection()?.removeAllRanges()

    const res = await fetch(`/api/estudiante/ebooks/${ebookId}/anotaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: pageNumber, tipo: tool, texto: selectedText || null, color, posicion: { rects } }),
    })

    if (res.ok) onAnnotationSaved(await res.json())
  }, [tool, color, ebookId, pageNumber, onAnnotationSaved])

  const cursorMap: Record<ToolType, string> = { select: 'text', highlight: 'crosshair', underline: 'crosshair' }

  return (
    <Box
      ref={el => {
        const div = el as HTMLDivElement | null

          ; (ref as React.MutableRefObject<HTMLDivElement | null>).current = div
        externalRef(div)
      }}
      sx={{
        position: 'relative',
        cursor: cursorMap[tool],
        userSelect: 'text',
        mb: 2,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        flexShrink: 0,
        overflow: 'hidden',
      }}
      onMouseUp={handleMouseUp}
    >
      <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer renderAnnotationLayer={false} />
      <AnnotationLayer annotations={annotations} pageNumber={pageNumber} onDelete={onAnnotationDeleted} />
    </Box>
  )
}

// ── visor principal ───────────────────────────────────────────────────────
interface Props { ebookId: string }

export const EbookViewer = ({ ebookId }: Props) => {
  const [pdfData, setPdfData] = useState<{ data: ArrayBuffer } | null>(null)
  const [loadingPdf, setLoadingPdf] = useState(true)
  const [errorPdf, setErrorPdf] = useState(false)
  const [numPages, setNumPages] = useState(0)
  const [visiblePage, setVisiblePage] = useState(1)
  const [baseWidth, setBaseWidth] = useState(800)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [tool, setTool] = useState<ToolType>('select')
  const [color, setColor] = useState('#fbbf24')
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [savingAnnot, setSavingAnnot] = useState(false)
  const [pageInput, setPageInput] = useState('')

  const [pdfList, setPdfList] = useState<{ nombre: string; url: string }[]>([])
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const pageWidth = Math.round(baseWidth * zoom)
  const ZOOM_STEP = 0.25
  const ZOOM_MIN = 0.5
  const ZOOM_MAX = 3

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    fetch(`/api/estudiante/ebooks/${ebookId}/pdf?list=true`)
      .then(r => r.ok ? r.json() : { pdfs: [] })
      .then(data => {
        setPdfList(data.pdfs || [])
        setSelectedPdfIndex(0)
      })
      .catch(() => {})
  }, [ebookId])

  useEffect(() => {
    setLoadingPdf(true); setErrorPdf(false); setPdfData(null); setNumPages(0)
    fetch(`/api/estudiante/ebooks/${ebookId}/pdf?index=${selectedPdfIndex}`)
      .then(r => {
        if (!r.ok) throw new Error()

        return r.arrayBuffer()
      })
      .then(buf => { setPdfData({ data: buf }); setLoadingPdf(false) })
      .catch(() => { setLoadingPdf(false); setErrorPdf(true) })
  }, [ebookId, selectedPdfIndex])

  useEffect(() => {
    fetch(`/api/estudiante/ebooks/${ebookId}/anotaciones`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Annotation[]) => setAnnotations(data))
      .catch(() => { })
  }, [ebookId])

  useEffect(() => {
    const el = wrapperRef.current

    if (!el) return
    const obs = new ResizeObserver(() => setBaseWidth(el.clientWidth - 2))

    obs.observe(el); setBaseWidth(el.clientWidth - 2)

    return () => obs.disconnect()
  }, [pdfData, isFullscreen])

  useEffect(() => {
    const handle = () => setIsFullscreen(!!document.fullscreenElement)

    document.addEventListener('fullscreenchange', handle)

    return () => document.removeEventListener('fullscreenchange', handle)
  }, [])

  useEffect(() => {
    const el = wrapperRef.current

    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return

      e.preventDefault()
      setZoom(z => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)).toFixed(2))))
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => el.removeEventListener('wheel', onWheel)
  }, [pdfData])

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen()
  }

  const handleAnnotationSaved = useCallback((a: Annotation) => {
    setSavingAnnot(false)
    setAnnotations(prev => [...prev, a])
  }, [])

  const handleAnnotationDeleted = useCallback(async (id: string) => {
    await fetch(`/api/estudiante/ebooks/${ebookId}/anotaciones/${id}`, { method: 'DELETE' })
    setAnnotations(prev => prev.filter(a => a.id !== id))
  }, [ebookId])

  const handleVisible = useCallback((page: number) => setVisiblePage(page), [])

  const goToPage = (n: number) => {
    const target = Math.max(1, Math.min(numPages, n))
    const el = pageRefs.current[target]

    if (el && wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' })
    }
  }

  const handlePageInputSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    const n = parseInt(pageInput, 10)

    if (!isNaN(n)) goToPage(n)
    setPageInput('')
  }

  const toolConfig = [
    { type: 'select' as ToolType, icon: 'tabler-cursor-text', label: 'Seleccionar' },
    { type: 'highlight' as ToolType, icon: 'tabler-highlight', label: 'Resaltar' },
    { type: 'underline' as ToolType, icon: 'tabler-underline', label: 'Subrayar' },
  ]

  const isInitialLoading = loadingPdf && pdfList.length === 0

  if (isInitialLoading || errorPdf) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', maxWidth: 1000, height: 'calc(100vh - 220px)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, bgcolor: '#1a1a1a', borderRadius: 2 }}>
          {loadingPdf
            ? <><CircularProgress sx={{ color: '#fff' }} /><Typography color='#aaa'>Cargando ebook...</Typography></>
            : <><i className='tabler-file-off' style={{ fontSize: '3rem', color: '#666' }} /><Typography color='#666'>No se pudo cargar el ebook.</Typography></>
          }
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: isFullscreen ? '100vw' : 1000, height: isFullscreen ? '100vh' : 'calc(100vh - 220px)', minHeight: 400, bgcolor: '#1a1a1a', borderRadius: isFullscreen ? 0 : 2, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: '#2a2a2a', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0, flexWrap: 'wrap' }}>
          {pdfList.length > 1 && (
            <>
              <Tooltip title={sidebarOpen ? 'Ocultar archivos' : 'Mostrar archivos'} placement='bottom'>
                <IconButton
                  size='small'
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  sx={{
                    color: sidebarOpen ? '#fff' : '#888',
                    bgcolor: sidebarOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }
                  }}
                >
                  <i className='tabler-menu-2' style={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Tooltip>
              <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(255,255,255,0.12)', mx: 0.5 }} />
            </>
          )}

          <Stack direction='row' spacing={0.5}>
            {toolConfig.map(t => (
              <Tooltip key={t.type} title={t.label} placement='bottom'>
                <IconButton size='small' onClick={() => setTool(t.type)} sx={{ color: tool === t.type ? '#fff' : '#888', bgcolor: tool === t.type ? 'rgba(255,255,255,0.15)' : 'transparent', borderRadius: '8px', border: tool === t.type ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
                  <i className={t.icon} style={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>

          <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(255,255,255,0.12)', mx: 0.5 }} />

          {tool !== 'select' && (
            <Stack direction='row' spacing={0.5} alignItems='center'>
              {COLORS.map(c => (
                <Tooltip key={c.value} title={c.label} placement='bottom'>
                  <Box onClick={() => setColor(c.value)} sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: c.value, cursor: 'pointer', border: color === c.value ? '2px solid #fff' : '2px solid transparent', transition: 'transform 0.15s', '&:hover': { transform: 'scale(1.2)' } }} />
                </Tooltip>
              ))}
            </Stack>
          )}

          {savingAnnot && <CircularProgress size={14} sx={{ color: '#888', ml: 1 }} />}



          <Box sx={{ flex: 1 }} />

          {/* Zoom */}
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Tooltip title='Alejar (Ctrl+scroll)' placement='bottom'>
              <span>
                <IconButton size='small' onClick={() => setZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} disabled={zoom <= ZOOM_MIN} sx={{ color: '#888', '&:not(:disabled):hover': { color: '#fff' } }}>
                  <i className='tabler-zoom-out' style={{ fontSize: '1rem' }} />
                </IconButton>
              </span>
            </Tooltip>
            <Typography onClick={() => setZoom(1)} sx={{ color: '#ccc', fontSize: '0.78rem', minWidth: 42, textAlign: 'center', cursor: 'pointer', '&:hover': { color: '#fff' } }} title='Restablecer zoom'>
              {Math.round(zoom * 100)}%
            </Typography>
            <Tooltip title='Acercar (Ctrl+scroll)' placement='bottom'>
              <span>
                <IconButton size='small' onClick={() => setZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} disabled={zoom >= ZOOM_MAX} sx={{ color: '#888', '&:not(:disabled):hover': { color: '#fff' } }}>
                  <i className='tabler-zoom-in' style={{ fontSize: '1rem' }} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>

          <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(255,255,255,0.12)', mx: 0.5 }} />

          {/* Ir a página */}
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Tooltip title='Ir a página (Enter)' placement='bottom'>
              <InputBase
                value={pageInput}
                onChange={e => setPageInput(e.target.value)}
                onKeyDown={handlePageInputSubmit}
                placeholder={String(visiblePage)}
                inputProps={{ style: { textAlign: 'center', width: 32, padding: 0, fontSize: '0.8rem', color: '#ccc' } }}
                sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '6px', px: 1, height: 28, border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </Tooltip>
            <Typography sx={{ color: '#666', fontSize: '0.8rem' }}>/ {numPages || '—'}</Typography>
          </Stack>

          <Tooltip title='Descargar PDF' placement='bottom'>
            <Button
              component='a'
              href={`/api/estudiante/ebooks/${ebookId}/pdf?index=${selectedPdfIndex}&download=true`}
              download
              variant='contained'
              size='small'
              startIcon={<i className='tabler-download' style={{ fontSize: '1rem' }} />}
              sx={{
                bgcolor: 'var(--web-primary, #25927F)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'none',
                height: 28,
                px: 2.5,
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(37, 146, 127, 0.3)',
                '&:hover': {
                  bgcolor: 'var(--web-primary-hover, #1d7465)',
                  boxShadow: '0 4px 12px rgba(37, 146, 127, 0.4)',
                }
              }}
            >
              Descargar
            </Button>
          </Tooltip>

          <Tooltip title={isFullscreen ? 'Salir (Esc)' : 'Pantalla completa'} placement='bottom'>
            <IconButton size='small' onClick={toggleFullscreen} sx={{ color: '#888', '&:hover': { color: '#fff' } }}>
              <i className={isFullscreen ? 'tabler-arrows-minimize' : 'tabler-arrows-maximize'} style={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {tool !== 'select' && (
          <Box sx={{ bgcolor: 'rgba(251,191,36,0.08)', borderBottom: '1px solid rgba(251,191,36,0.15)', px: 2, py: 0.5 }}>
            <Typography sx={{ fontSize: '0.72rem', color: '#fbbf24' }}>
              {tool === 'highlight' ? 'Selecciona texto para resaltarlo' : 'Selecciona texto para subrayarlo'} · Clic sobre una anotación para eliminarla
            </Typography>
          </Box>
        )}

        {/* Área de lectura continua con Sidebar para PDFs */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'row' }}>
          {/* Sidebar for PDFs (only visible if there are multiple PDFs and sidebarOpen is true) */}
          {pdfList.length > 1 && sidebarOpen && (
            <Box
              sx={{
                width: 220,
                flexShrink: 0,
                bgcolor: '#222222',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                p: 2.5,
                gap: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#888888',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 1.5,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Archivos PDF
              </Typography>
              {pdfList.map((pdf, idx) => {
                const isActive = selectedPdfIndex === idx
                return (
                  <Box
                    key={idx}
                    onClick={() => setSelectedPdfIndex(idx)}
                    sx={{
                      p: 2,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      bgcolor: isActive ? 'rgba(37, 146, 127, 0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(37, 146, 127, 0.3)' : '1px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(37, 146, 127, 0.2)' : 'rgba(255,255,255,0.05)',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.82rem',
                        lineHeight: 1.3,
                        fontFamily: 'Inter, sans-serif',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        color: isActive ? '#ffffff' : '#b3b3b3',
                      }}
                    >
                      {pdf.nombre}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          )}

          {/* Área de lectura continua */}
          <Box
            ref={wrapperRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              overflowX: zoom > 1 ? 'auto' : 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: loadingPdf ? 'center' : 'flex-start',
              p: 2,
              bgcolor: '#1a1a1a',
              minHeight: 400,
              position: 'relative',
            }}
          >
            {loadingPdf && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, py: 10 }}>
                <CircularProgress sx={{ color: 'var(--web-primary, #25927F)' }} />
                <Typography sx={{ color: '#aaa', fontSize: '0.85rem' }}>Cargando archivo...</Typography>
              </Box>
            )}

            {!loadingPdf && pdfData && (
              <Document
                file={pdfData}
                onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                loading={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}><CircularProgress sx={{ color: '#fff' }} /></Box>}
              >
                {Array.from({ length: numPages }, (_, i) => i + 1).map(pageNum => (
                  <PageItem
                    key={pageNum}
                    pageNumber={pageNum}
                    pageWidth={pageWidth}
                    tool={tool}
                    color={color}
                    ebookId={ebookId}
                    annotations={annotations}
                    onAnnotationSaved={handleAnnotationSaved}
                    onAnnotationDeleted={handleAnnotationDeleted}
                    onVisible={handleVisible}
                    pageRef={el => { pageRefs.current[pageNum] = el }}
                  />
                ))}
              </Document>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
