'use client'


import { IconButton, Badge, Tooltip } from '@mui/material'

import { useCart } from '../context/CartContext'

interface CartIconProps {
  white?: boolean;
}

const CartIcon = ({ white = false }: CartIconProps) => {
    const { itemCount, setIsCartDrawerOpen } = useCart()

    return (
        <Tooltip title="Ver Carrito">
            <IconButton
                color="inherit"
                onClick={() => setIsCartDrawerOpen(true)}
                sx={{
                    bgcolor: white ? 'rgba(255,255,255,0.1)' : 'primary.50',
                    color: white ? '#FFFFFF' : 'primary.main',
                    '&:hover': { bgcolor: white ? 'rgba(255,255,255,0.2)' : 'primary.100' },
                    borderRadius: '10px',
                    width: 44,
                    height: 44
                }}
            >
                <Badge
                    badgeContent={itemCount}
                    color="error"
                    sx={{ '& .MuiBadge-badge': { fontWeight: 800 } }}
                >
                    <i className="tabler-shopping-cart" style={{ fontSize: '1.6rem' }} />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}

export default CartIcon
