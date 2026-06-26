'use client'

import { Box, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

interface BreadcrumbStep {
    label: string
    onClick?: () => void
    active?: boolean
}

interface BreadcrumbTrailProps {
    steps: BreadcrumbStep[]
    sx?: SxProps<Theme>
}

const ARROW = 12
const GAP = 6

// Mismo verde usado en el resto del reproductor (chip "Lección X", tabs, íconos de sección).
const TEXT = '#025E44'
const BG = 'rgba(2,94,68,0.08)'
const BG_HOVER = 'rgba(2,94,68,0.16)'

// Las esquinas (arriba/abajo) siempre quedan en el borde de la caja (0 y 100%).
// El lado derecho agrega una punta que sobresale hasta el 100% a la mitad de
// la altura (salvo el último paso); el lado izquierdo agrega una muesca que
// se hunde hasta ARROW px a la mitad de la altura (salvo el primer paso).
// Cada paso (salvo el primero) se desplaza hacia la izquierda lo suficiente
// para que su muesca quede cerca de la punta del paso anterior, dejando un
// pequeño espacio (GAP) visible entre ambos.
function clipPathFor(isFirst: boolean, isLast: boolean) {
    const right = isLast ? '100%' : `calc(100% - ${ARROW}px)`

    const points = [
        '0 0',
        `${right} 0`,
        ...(isLast ? [] : ['100% 50%']),
        `${right} 100%`,
        '0 100%',
        ...(isFirst ? [] : [`${ARROW}px 50%`])
    ]

    return `polygon(${points.join(', ')})`
}

const BreadcrumbTrail = ({ steps, sx }: BreadcrumbTrailProps) => {
    return (
        <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', rowGap: 1, ...sx }}>
            {steps.map((step, i) => {
                const isFirst = i === 0
                const isLast = i === steps.length - 1

                return (
                    <Box
                        key={i}
                        component={step.onClick ? 'button' : 'span'}
                        onClick={step.onClick}
                        title={step.label}
                        sx={{
                            display: 'block',
                            border: 'none',
                            font: 'inherit',
                            bgcolor: BG,
                            color: TEXT,
                            fontWeight: isLast ? 700 : 600,
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: { xs: 140, sm: 200, md: 260 },
                            py: 1,
                            pl: `${isFirst ? 16 : ARROW + 10}px`,
                            pr: `${isLast ? 16 : ARROW + 6}px`,
                            ml: isFirst ? 0 : `${GAP - ARROW}px`,
                            cursor: step.onClick ? 'pointer' : 'default',
                            clipPath: clipPathFor(isFirst, isLast),
                            transition: 'background-color 0.15s',
                            '&:hover': step.onClick ? { bgcolor: BG_HOVER } : {}
                        }}
                    >
                        {step.label}
                    </Box>
                )
            })}
        </Stack>
    )
}

export default BreadcrumbTrail
