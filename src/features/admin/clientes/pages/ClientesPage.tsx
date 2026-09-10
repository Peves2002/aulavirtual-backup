'use client'

import { useMemo, useState } from 'react'

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    MenuItem,
    Typography
} from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { DebouncedInput } from '@/utils/components/others/DebouncedInput'

type ClienteStatus = 'Activo' | 'Pendiente' | 'Inactivo'

type Cliente = {
    id: string
    razonSocial: string
    ruc: string
    contacto: string
    correo: string
    telefono: string
    ubicacion: string
    servicios: number
    estado: ClienteStatus
    iniciales: string
    color: string
}

const CLIENTES_DEMO: Cliente[] = [
    {
        id: 'cli-001',
        razonSocial: 'R&R Químicos S.A.C.',
        ruc: '20510439954',
        contacto: 'Carlos Ramírez',
        correo: 'gerencia@rrquimicos.com',
        telefono: '+51 998 321 640',
        ubicacion: 'Lima / Lima / Callao',
        servicios: 4,
        estado: 'Activo',
        iniciales: 'RQ',
        color: '#e0f2fe'
    },
    {
        id: 'cli-002',
        razonSocial: 'IDECAP Formación Profesional',
        ruc: '20600879490',
        contacto: 'María Torres',
        correo: 'info@idecap.edu.pe',
        telefono: '+51 919 150 620',
        ubicacion: 'La Libertad / Trujillo',
        servicios: 2,
        estado: 'Activo',
        iniciales: 'IF',
        color: '#dcfce7'
    },
    {
        id: 'cli-003',
        razonSocial: 'Flottweg Perú S.A.C.',
        ruc: '20600322223',
        contacto: 'Jorge Salazar',
        correo: 'compras@flottweg.com',
        telefono: '+51 913 254 464',
        ubicacion: 'Lima / Lima / Miraflores',
        servicios: 6,
        estado: 'Pendiente',
        iniciales: 'FP',
        color: '#fef3c7'
    },
    {
        id: 'cli-004',
        razonSocial: 'Lara Consulting & Engineering',
        ruc: '20601669626',
        contacto: 'Ana Cárdenas',
        correo: 'ayacuchin@laraconsulting.com.pe',
        telefono: '+51 956 107 920',
        ubicacion: 'Lima / Lima / San Isidro',
        servicios: 3,
        estado: 'Activo',
        iniciales: 'LC',
        color: '#fce7f3'
    },
    {
        id: 'cli-005',
        razonSocial: 'World Vision Perú',
        ruc: '20545515840',
        contacto: 'José Santiváñez',
        correo: 'contacto@worldvision.org.pe',
        telefono: '+51 961 609 580',
        ubicacion: 'Lima / Lima / Jesús María',
        servicios: 1,
        estado: 'Inactivo',
        iniciales: 'WV',
        color: '#ede9fe'
    }
]

const STATUS_COLORS: Record<ClienteStatus, 'success' | 'warning' | 'secondary'> = {
    Activo: 'success',
    Pendiente: 'warning',
    Inactivo: 'secondary'
}

export function ClientesPage() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')

    const clientes = useMemo(() => {
        const query = search.toLowerCase().trim()

        return CLIENTES_DEMO.filter(cliente => {
            const matchesSearch = !query || [cliente.razonSocial, cliente.ruc, cliente.correo, cliente.ubicacion].join(' ').toLowerCase().includes(query)
            const matchesStatus = status === 'all' || cliente.estado === status

            return matchesSearch && matchesStatus
        })
    }, [search, status])

    return (
        <Box className='flex flex-col gap-6'>
            <Box className='flex flex-col gap-1'>
                <Typography variant='h4' className='font-bold'>Clientes</Typography>
                <Typography color='text.secondary'>Empresas que utilizan los servicios y soluciones de la plataforma.</Typography>
            </Box>

            <Box className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {[
                    { label: 'Total de clientes', value: '128', icon: 'tabler-building-community', color: '#2563eb' },
                    { label: 'Clientes activos', value: '96', icon: 'tabler-building-check', color: '#16a34a' },
                    { label: 'Por atender', value: '12', icon: 'tabler-clock-hour-4', color: '#d97706' }
                ].map(stat => (
                    <Card key={stat.label} className='border border-solid border-divider shadow-none'>
                        <CardContent className='flex items-center gap-4'>
                            <Avatar sx={{ bgcolor: `${stat.color}14`, color: stat.color, width: 48, height: 48 }}>
                                <i className={`${stat.icon} text-[24px]`} />
                            </Avatar>
                            <Box>
                                <Typography variant='h5' className='font-bold'>{stat.value}</Typography>
                                <Typography variant='body2' color='text.secondary'>{stat.label}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Card>
                <CardHeader
                    title='Directorio de clientes'
                    subheader='Consulta las empresas, sus responsables y los servicios contratados.'
                    action={
                        <Button variant='contained' startIcon={<i className='tabler-plus' />}>
                            Agregar cliente
                        </Button>
                    }
                    className='pbe-4'
                />
                <Box className='flex flex-col gap-4 border-be p-6 md:flex-row md:items-center md:justify-between'>
                    <DebouncedInput value={search} onChange={value => setSearch(String(value))} placeholder='Buscar por empresa, RUC, correo o ubicación' className='is-full md:is-[360px]' />
                    <CustomTextField select value={status} onChange={event => setStatus(event.target.value)} className='is-full md:is-[180px]' label='Estado'>
                        <MenuItem value='all'>Todos los estados</MenuItem>
                        <MenuItem value='Activo'>Activos</MenuItem>
                        <MenuItem value='Pendiente'>Pendientes</MenuItem>
                        <MenuItem value='Inactivo'>Inactivos</MenuItem>
                    </CustomTextField>
                </Box>

                <Box className='overflow-x-auto'>
                    <table className='min-w-[980px] w-full border-collapse'>
                        <thead>
                            <tr className='border-be border-divider'>
                                {['Empresa', 'Contacto', 'Ubicación', 'Servicios', 'Estado', 'Acciones'].map(label => (
                                    <th key={label} className='px-6 py-4 text-left text-[0.75rem] font-semibold uppercase tracking-wide text-textSecondary'>{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.id} className='border-be border-divider transition-colors hover:bg-actionHover'>
                                    <td className='px-6 py-4'>
                                        <Box className='flex items-center gap-3'>
                                            <Avatar
                                                src='/images/avatars/usuario.png'
                                                alt={`Avatar de ${cliente.razonSocial}`}
                                                sx={{ bgcolor: cliente.color, color: '#334155', fontSize: 13, fontWeight: 700 }}
                                            >
                                                {cliente.iniciales}
                                            </Avatar>
                                            <Box>
                                                <Typography className='font-medium'>{cliente.razonSocial}</Typography>
                                                <Typography variant='caption' color='text.secondary'>RUC {cliente.ruc}</Typography>
                                            </Box>
                                        </Box>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <Typography variant='body2'>{cliente.contacto}</Typography>
                                        <Typography variant='caption' color='text.secondary'>{cliente.correo}</Typography>
                                    </td>
                                    <td className='px-6 py-4'><Typography variant='body2'>{cliente.ubicacion}</Typography></td>
                                    <td className='px-6 py-4'><Chip label={`${cliente.servicios} servicios`} size='small' variant='tonal' color='info' /></td>
                                    <td className='px-6 py-4'><Chip label={cliente.estado} size='small' variant='tonal' color={STATUS_COLORS[cliente.estado]} /></td>
                                    <td className='px-6 py-4'>
                                        <Box className='flex items-center gap-1'>
                                            <IconButton size='small' title='Ver cliente'><i className='tabler-eye text-[20px]' /></IconButton>
                                            <IconButton size='small' title='Editar cliente'><i className='tabler-edit text-[20px]' /></IconButton>
                                            <IconButton size='small' title='Más opciones'><i className='tabler-dots-vertical text-[20px]' /></IconButton>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!clientes.length && <Typography className='p-10 text-center' color='text.secondary'>No se encontraron clientes con esos criterios.</Typography>}
                </Box>
            </Card>
        </Box>
    )
}
