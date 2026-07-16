'use client'


import { IconButton, Badge, Tooltip } from '@mui/material'

import { useCart } from '../context/CartContext'

const CartIcon = ({ isTransparent = false }: { isTransparent?: boolean }) => {
    const { itemCount, setIsCartDrawerOpen } = useCart()

    return (
        <Tooltip title="Ver Carrito">
            <IconButton
                color="inherit"
                onClick={() => setIsCartDrawerOpen(true)}
                sx={{
                    bgcolor: isTransparent ? 'rgba(255,255,255,0.15)' : 'primary.50',
                    color: isTransparent ? '#ffffff' : 'primary.main',
                    '&:hover': { bgcolor: isTransparent ? 'rgba(255,255,255,0.25)' : 'primary.100' },
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
