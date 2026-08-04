'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import { Divider } from '@mui/material'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'
import { ComunidadCard } from './ComunidadCard'

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
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()

  const { data: session } = useSession()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const rol = session?.user?.rol

  
  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <div
      className='bs-full overflow-y-auto overflow-x-hidden'
      onScroll={(e) => scrollMenu(e, false)}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem
          href={rol === 'ADMIN' ? '/admin/dashboard' : (rol === 'PROFESOR' ? '/profesor/dashboard' : '/estudiante/dashboard')}
          icon={<i className='tabler-smart-home' />}
        >
          Dashboard
        </MenuItem>

        {rol === 'ESTUDIANTE' && (
          <>
            <MenuItem href='/estudiante/pedidos' icon={<i className='tabler-shopping-cart' />}>
              Mis Pedidos
            </MenuItem>
            <MenuItem href='/estudiante/mis-cursos' icon={<i className='tabler-book' />}>
              Mis Cursos
            </MenuItem>
            {/* <MenuItem href='/estudiante/mis-ebooks' icon={<i className='tabler-book-2' />}>
              Mis Ebooks
            </MenuItem>
            <MenuItem href='/estudiante/suscripcion' icon={<i className='tabler-repeat' />}>
              Mi Suscripción
            </MenuItem> */}
            <MenuItem href='/estudiante/calendario' icon={<i className='tabler-calendar' />}>
              Calendario
            </MenuItem>
            {/* <MenuItem href='/estudiante/mis-simulacros' icon={<i className='tabler-clipboard-list' />}>
              Mis Simulacros
            </MenuItem> */}
            <MenuItem href='/estudiante/mis-certificados' icon={<i className='tabler-certificate' />}>
              Mis Certificados
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem href='/programas' icon={<i className='tabler-search' />}>
              Explorar Cursos
            </MenuItem>
            {/* <MenuItem href='/ebooks' icon={<i className='tabler-books' />}>
              Explorar Ebooks
            </MenuItem> */}
          </>
        )}

        {(rol === 'ADMIN' || (session?.user?.permisos && session.user.permisos.length > 0) || (rol === 'ASESOR' && !session?.user?.rol_personalizado_nombre)) && (
          <>
            <Divider sx={{ my: 2 }} />
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_INSCRIPCIONES') || (rol === 'ASESOR' && !session?.user?.rol_personalizado_nombre)) && (
              <MenuItem href='/admin/inscripciones' icon={<i className='tabler-file-description' />}>
                Inscripciones
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_USUARIOS')) && (
              <>
                <MenuItem href='/admin/usuarios' icon={<i className='tabler-users' />}>
                  Usuarios
                </MenuItem>
                <MenuItem href='/admin/roles' icon={<i className='tabler-shield-lock' />}>
                  Roles y Permisos
                </MenuItem>
              </>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_LEADS')) && (
              <MenuItem href='/admin/leads' icon={<i className='tabler-forms' />}>
                Registros de Eventos
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CATEGORIAS')) && (
              <MenuItem href='/admin/categorias' icon={<i className='tabler-category' />}>
                Categorías
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CURSOS')) && (
              <MenuItem href='/admin/cursos' icon={<i className='tabler-book' />}>
                Cursos
              </MenuItem>
            )}
            
            {/* {isFeatureEnabled('ebooks') && (rol === 'ADMIN' || session?.user?.permisos?.includes('VER_EBOOKS')) && (
              <MenuItem href='/admin/ebooks' icon={<i className='tabler-book-2' />}>
                Ebooks
              </MenuItem>
            )}
            
            {isFeatureEnabled('simulacros') && (rol === 'ADMIN' || session?.user?.permisos?.includes('VER_SIMULACROS')) && (
              <MenuItem href='/admin/simulacros' icon={<i className='tabler-clipboard-list' />}>
                Simulacros
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_RUTAS')) && (
              <MenuItem href='/admin/rutas' icon={<i className='tabler-route' />}>
                Rutas Aprendizaje
              </MenuItem>
            )} */}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_PEDIDOS') || (rol === 'ASESOR' && !session?.user?.rol_personalizado_nombre)) && (
              <MenuItem href='/admin/pedidos' icon={<i className='tabler-shopping-cart' />}>
                Pedidos
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CUPONES')) && (
              <MenuItem href='/admin/cupones' icon={<i className='tabler-ticket' />}>
                Cupones
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CERTIFICADOS')) && (
              <MenuItem href='/admin/certificados' icon={<i className='tabler-certificate' />}>
                Certificados
              </MenuItem>
            )}
            
            {/* {isFeatureEnabled('suscripciones') && (rol === 'ADMIN' || session?.user?.permisos?.includes('VER_SUSCRIPCIONES')) && (
              <>
                <MenuItem href='/admin/planes-suscripcion' icon={<i className='tabler-repeat' />}>
                  Planes de Suscripción
                </MenuItem>
                <MenuItem href='/admin/suscripciones' icon={<i className='tabler-users-group' />}>
                  Suscripciones
                </MenuItem>
              </>
            )} */}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_RECLAMACIONES') || (rol === 'ASESOR' && !session?.user?.rol_personalizado_nombre)) && (
              <MenuItem href='/admin/reclamaciones' icon={<i className='tabler-book-2' />}>
                Reclamaciones
              </MenuItem>
            )}
            
            {(rol === 'ADMIN' || session?.user?.permisos?.includes('EDITAR_CONTENIDO_WEB') || session?.user?.permisos?.includes('VER_CARRUSEL')) && (
              <SubMenu label='Edición Web' icon={<i className='tabler-world-edit' />}>
                {(rol === 'ADMIN' || session?.user?.permisos?.includes('EDITAR_CONTENIDO_WEB')) && (
                  <>
                    <MenuItem href='/admin/edicion-web'>Páginas Principales</MenuItem>
                    <MenuItem href='/admin/edicion-web/blogs'>Blogs</MenuItem>
                    <MenuItem href='/admin/edicion-web/noticias'>Noticias</MenuItem>
                  </>
                )}
                {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CARRUSEL')) && (
                  <MenuItem href='/admin/carrousel'>Carrusel Portada</MenuItem>
                )}
              </SubMenu>
            )}
            
            {/* {(rol === 'ADMIN' || session?.user?.permisos?.includes('VER_CONFIGURACION')) && (
              <MenuItem href='/admin/configuracion' icon={<i className='tabler-settings-2' />}>
                Configuración Sistema
              </MenuItem>
            )} */}
          </>
        )}

        {rol === 'PROFESOR' && (
          <>
            <Divider sx={{ my: 2 }} />
            <MenuItem href='/profesor/mis-cursos' icon={<i className='tabler-book' />}>
              Mis Cursos
            </MenuItem>
            {isFeatureEnabled('calendario') && (
              <MenuItem href='/profesor/calendario' icon={<i className='tabler-calendar' />}>
                Calendario
              </MenuItem>
            )}
          </>
        )}
      </Menu>
      <ComunidadCard />
    </div>
  )
}

export default VerticalMenu
