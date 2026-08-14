import { Box } from '@mui/material'

import { sanitizeArticuloHtml } from '@/utils/libs/sanitizeHtml'

interface Props {
  html: string
}

/**
 * Único punto de la web pública donde se usa dangerouslySetInnerHTML para un
 * Articulo. Vuelve a sanear el HTML antes de renderizar (el admin ya lo sanea
 * al guardar, esto es defensa en profundidad).
 */
export default function ArticuloBody({ html }: Props) {
  const seguro = sanitizeArticuloHtml(html)

  return (
    <Box
      sx={{
        '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 4, mb: 1.5 },
        '& h3': { fontSize: '1.25rem', fontWeight: 700, mt: 3, mb: 1 },
        '& p': { mb: 2, lineHeight: 1.75, color: 'text.primary' },
        '& ul, & ol': { pl: 3, mb: 2, lineHeight: 1.75 },
        '& blockquote': {
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          pl: 2,
          ml: 0,
          my: 2,
          color: 'text.secondary',
          fontStyle: 'italic'
        },
        '& a': { color: 'primary.main', textDecoration: 'underline' }
      }}
      dangerouslySetInnerHTML={{ __html: seguro }}
    />
  )
}
