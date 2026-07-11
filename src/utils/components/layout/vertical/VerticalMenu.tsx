'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import { Divider } from '@mui/material'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSession } from 'next-auth/react'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { isFeatureEnabled } from '@/utils/configs/projectFeatures'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()
  const { data: session } = useSession()

  const { transitionDuration } = verticalNavOptions
  const rol = session?.user?.rol

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: (container: any) => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: (container: any) => scrollMenu(container, true)
        })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {(rol === 'ADMIN' || rol === 'PROFESOR') && (
          <MenuItem
            href={rol === 'ADMIN' ? '/admin/dashboard' : '/profesor/dashboard'}
            icon={<i className='tabler-smart-home' />}
          >
            Dashboard
          </MenuItem>
        )}

        {rol === 'ESTUDIANTE' && (
          <>
            <MenuItem href='/estudiante/pedidos' icon={<i className='tabler-shopping-cart' />}>
              Mis Pedidos
            </MenuItem>
            <MenuItem href='/estudiante/mis-cursos' icon={<i className='tabler-book' />}>
              Mis Cursos
            </MenuItem>
            <MenuItem href='/estudiante/mis-diplomados' icon={<i className='tabler-award' />}>
              Mis Diplomados
            </MenuItem>
            <MenuItem href='/estudiante/mis-programas' icon={<i className='tabler-layout-grid' />}>
              Mis Programas
            </MenuItem>
            <MenuItem href='/estudiante/mis-certificados' icon={<i className='tabler-certificate' />}>
              Mis Certificados
            </MenuItem>
            {isFeatureEnabled('calendario') && (
              <MenuItem href='/estudiante/calendario' icon={<i className='tabler-calendar' />}>
                Calendario
              </MenuItem>
            )}
            <Divider sx={{ my: 1 }} />
            <MenuItem href='/cursos' icon={<i className='tabler-search' />}>
              Explorar Cursos
            </MenuItem>
          </>
        )}

        {rol === 'ADMIN' && (
          <>
            <Divider sx={{ my: 2 }} />
            <MenuItem href='/admin/usuarios' icon={<i className='tabler-users' />}>
              Usuarios
            </MenuItem>
            <MenuItem href='/admin/categorias' icon={<i className='tabler-category' />}>
              Categorias
            </MenuItem>
            <MenuItem href='/admin/cursos' icon={<i className='tabler-book' />}>
              Cursos
            </MenuItem>
            <MenuItem href='/admin/diplomados' icon={<i className='tabler-award' />}>
              Diplomados
            </MenuItem>
            <MenuItem href='/admin/programas' icon={<i className='tabler-layout-grid' />}>
              Programas
            </MenuItem>
            <MenuItem href='/admin/pedidos' icon={<i className='tabler-shopping-cart' />}>
              Pedidos
            </MenuItem>
            <MenuItem href='/admin/cupones' icon={<i className='tabler-ticket' />}>
              Cupones
            </MenuItem>
            <MenuItem href='/admin/certificados' icon={<i className='tabler-certificate' />}>
              Certificados
            </MenuItem>
            {isFeatureEnabled('calendario') && (
              <MenuItem href='/admin/calendario' icon={<i className='tabler-calendar' />}>
                Calendario
              </MenuItem>
            )}
            {isFeatureEnabled('suscripciones') && (
              <>
                <MenuItem href='/admin/planes-suscripcion' icon={<i className='tabler-repeat' />}>
                  Planes de Suscripcion
                </MenuItem>
                <MenuItem href='/admin/suscripciones' icon={<i className='tabler-users-group' />}>
                  Suscripciones
                </MenuItem>
              </>
            )}
            <MenuItem href='/admin/reclamaciones' icon={<i className='tabler-book-2' />}>
              Reclamaciones
            </MenuItem>
            <MenuItem href='/admin/configuracion' icon={<i className='tabler-settings' />}>
              Configuracion
            </MenuItem>
          </>
        )}

        {rol === 'PROFESOR' && (
          <>
            <Divider sx={{ my: 2 }} />
            <MenuItem href='/profesor/mis-cursos' icon={<i className='tabler-book' />}>
              Mis Cursos
            </MenuItem>
            <MenuItem href='/profesor/mis-diplomados' icon={<i className='tabler-award' />}>
              Mis Diplomados
            </MenuItem>
            <MenuItem href='/profesor/mis-programas' icon={<i className='tabler-layout-grid' />}>
              Mis Programas
            </MenuItem>
            {isFeatureEnabled('calendario') && (
              <MenuItem href='/profesor/calendario' icon={<i className='tabler-calendar' />}>
                Calendario
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
