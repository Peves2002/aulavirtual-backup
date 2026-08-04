'use client'

import { Box, Typography, Stack, Divider, Paper, Chip } from '@mui/material'
import { ShieldCheck } from 'lucide-react'

import CourseThumbnail from '@/utils/components/CourseThumbnail'
import CouponInput from './CouponInput'
import type { CourseCheckoutItem, EbookCheckoutItem } from './CheckoutView'

const FONT = 'Poppins, sans-serif'

interface OrderSummaryProps {
    courses: CourseCheckoutItem[]
    ebooks: EbookCheckoutItem[]
    appliedCoupon?: {
        codigo: string
        descuento: number
        total: number
    } | null
    onCouponApplied: (data: any) => void
}

const OrderSummary = ({ courses, ebooks = [], appliedCoupon, onCouponApplied }: OrderSummaryProps) => {
    const subtotal = [...courses, ...ebooks].reduce((acc, i) => acc + Number(i.precio), 0)
    const total = appliedCoupon ? appliedCoupon.total : subtotal
    const descuento = appliedCoupon ? appliedCoupon.descuento : 0
    const moneda = (courses[0] || ebooks[0])?.moneda || 'PEN'
    const allItems = [...courses.map(c => ({ ...c, tipo: 'CURSO' as const })), ...ebooks.map(e => ({ ...e, tipo: 'EBOOK' as const }))]

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '24px',
                bgcolor: 'hsl(var(--card))',
                border: '1.5px solid hsl(var(--border))',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                position: 'sticky',
                top: 100
            }}
        >
            <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--foreground))', mb: 3 }}>
                Resumen del <span style={{ color: 'hsl(var(--primary))' }}>Pedido</span>
            </Typography>

            <Stack spacing={3}>
                <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                    <Stack spacing={2}>
                        {allItems.map((item) => (
                            <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                <Box sx={{ width: 80, height: 50, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid', borderColor: 'hsl(var(--border))' }}>
                                    <CourseThumbnail src={item.miniatura} title={item.titulo} variant='simple' />
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Box display='flex' alignItems='center' gap={0.5} flexWrap='wrap' mb={0.25}>
                                        <Typography noWrap sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '0.8125rem', lineHeight: 1.2, color: 'hsl(var(--foreground))' }}>
                                            {item.titulo}
                                        </Typography>
                                        <Chip
                                            label={item.tipo === 'EBOOK' ? 'Ebook' : 'Curso'}
                                            size='small'
                                            color={item.tipo === 'EBOOK' ? 'info' : 'default'}
                                            variant='tonal'
                                            sx={{ fontSize: '0.6rem', height: 16 }}
                                        />
                                    </Box>
                                    <Typography sx={{ fontFamily: FONT, fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', display: 'block' }}>
                                        {item.moneda} {Number(item.precio).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', borderColor: 'hsl(var(--border))' }} />

                <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Subtotal</Typography>
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>{moneda} {subtotal.toFixed(2)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Descuento</Typography>
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--secondary))' }}>
                            - {moneda} {descuento.toFixed(2)}
                        </Typography>
                    </Stack>
                </Stack>

                {courses.length > 0 && (
                    <CouponInput
                        cursoIds={courses.map(c => c.id)}
                        onApplied={onCouponApplied}
                    />
                )}

                <Divider sx={{ borderColor: 'hsl(var(--border))' }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1rem', color: 'hsl(var(--foreground))' }}>Total</Typography>
                    <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.375rem', color: 'hsl(var(--primary))' }}>
                        {moneda} {total.toFixed(2)}
                    </Typography>
                </Stack>

                <Box sx={{ p: 2, backgroundColor: 'hsl(var(--primary) / 0.08)', borderRadius: '16px', border: '1px solid hsl(var(--primary) / 0.2)' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={16} color="#ffffff" />
                        </Box>
                        <Typography sx={{ fontFamily: FONT, fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--foreground))', lineHeight: 1.35 }}>
                            Compra 100% segura. Acceso inmediato tras confirmar el pago.
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
}

export default OrderSummary
