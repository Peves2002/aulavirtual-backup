'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Container, Grid, Box, Typography } from '@mui/material'
import { ChevronRight, ShoppingCart } from 'lucide-react'

import OrderSummary from './OrderSummary'
import PaymentForm from './PaymentForm'

const FONT = 'Poppins, sans-serif'

interface CouponData {
    codigo: string
    descuento: number
    total: number
}

export interface CourseCheckoutItem {
    id: string
    titulo: string
    slug: string
    miniatura?: string
    precio: number
    moneda: string
    profesor: { nombre: string; apellido: string }
}

export interface EbookCheckoutItem {
    id: string
    titulo: string
    slug: string
    miniatura?: string
    precio: number
    moneda: string
}

interface CheckoutViewProps {
    courses: CourseCheckoutItem[]
    ebooks: EbookCheckoutItem[]
}

const CheckoutView = ({ courses, ebooks }: CheckoutViewProps) => {
    const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null)

    const hasOnlyEbooks = courses.length === 0 && ebooks.length > 0

    const breadcrumbBack = hasOnlyEbooks
        ? { label: 'Ebooks', href: '/ebooks' }
        : { label: 'Cursos', href: courses[0] ? `/cursos/${courses[0].slug}` : '/cursos' }

    return (
        <Box sx={{ minHeight: 'calc(100vh - 64px)', fontFamily: FONT }}>
            {/* Mini hero */}
            <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid hsl(var(--border))',
                py: { xs: 4, md: 5 },
                px: { xs: 3, md: 8, lg: 12 },
            }}>
                <Box aria-hidden className="bg-mesh" sx={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
                        {[
                            { label: 'Inicio', href: '/' },
                            breadcrumbBack,
                        ].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                <Link href={item.href} style={{ fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 500, color: 'hsl(var(--muted-foreground))', textDecoration: 'none' }}>
                                    {item.label}
                                </Link>
                                <ChevronRight size={12} color="hsl(var(--muted-foreground))" />
                            </Box>
                        ))}
                        <span style={{ fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>Checkout</span>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'hsl(var(--primary) / 0.1)', border: '1px solid hsl(var(--primary) / 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShoppingCart size={22} color="hsl(var(--primary))" />
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, color: 'hsl(var(--foreground))', lineHeight: 1.1 }}>
                                Finalizar Compra
                            </Typography>
                            <Typography sx={{ fontFamily: FONT, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', fontWeight: 400, mt: 0.25 }}>
                                Estás a un paso de comenzar tu transformación profesional.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={4} sx={{ order: { xs: 1, lg: 2 } }}>
                        <OrderSummary
                            courses={courses}
                            ebooks={ebooks}
                            appliedCoupon={appliedCoupon}
                            onCouponApplied={setAppliedCoupon}
                        />
                    </Grid>

                    <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 } }}>
                        <PaymentForm
                            courses={courses}
                            ebooks={ebooks}
                            appliedCouponCode={appliedCoupon?.codigo}
                            finalTotal={appliedCoupon ? appliedCoupon.total : undefined}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default CheckoutView
