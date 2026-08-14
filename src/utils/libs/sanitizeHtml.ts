import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's',
  'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'a', 'code', 'pre'
]

/**
 * Sanea el HTML enriquecido de un Articulo (generado por RichTextEditor) antes
 * de persistirlo o de renderizarlo con dangerouslySetInnerHTML.
 */
export function sanitizeArticuloHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ['href'] },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer nofollow' })
    }
  })
}
