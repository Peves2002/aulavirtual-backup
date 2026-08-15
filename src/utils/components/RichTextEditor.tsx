'use client'

import { useEffect } from 'react'

import { Box, Divider, Stack, ToggleButton } from '@mui/material'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: number
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  icon,
  title
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  icon: string
  title: string
}) {
  return (
    <ToggleButton
      value={icon}
      selected={!!active}
      disabled={disabled}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      size='small'
      title={title}
      sx={{ border: 'none', p: 1 }}
    >
      <i className={icon} style={{ fontSize: 18 }} />
    </ToggleButton>
  )
}

/**
 * Editor de texto enriquecido (negrita, cursiva, subrayado, listas, enlaces)
 * basado en Tiptap puro (sin `mui-tiptap`, que exige @mui/material >= 5.16).
 */
export default function RichTextEditor({ value, onChange, placeholder, minHeight = 220 }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder || 'Escribe el contenido del artículo...' })
    ],
    content: value || '',
    onUpdate: ({ editor: e }) => onChange(e.getHTML())
  })

  // Sincroniza el contenido cuando `value` cambia desde afuera (ej. al abrir el diálogo de edición)
  useEffect(() => {
    if (!editor) return

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value])

  if (!editor) return null

  const handleLink = () => {
    const previa = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL del enlace', previa || 'https://')

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Stack direction='row' spacing={0.5} sx={{ p: 0.5, bgcolor: 'action.hover', flexWrap: 'wrap' }}>
        <ToolbarButton
          icon='tabler-bold'
          title='Negrita'
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon='tabler-italic'
          title='Cursiva'
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon='tabler-underline'
          title='Subrayado'
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />
        <ToolbarButton
          icon='tabler-h-2'
          title='Título'
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          icon='tabler-h-3'
          title='Subtítulo'
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />
        <ToolbarButton
          icon='tabler-list'
          title='Lista con viñetas'
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon='tabler-list-numbers'
          title='Lista numerada'
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon='tabler-blockquote'
          title='Cita'
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />
        <ToolbarButton icon='tabler-link' title='Enlace' active={editor.isActive('link')} onClick={handleLink} />
      </Stack>
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 1.5,
          minHeight,
          maxHeight: 480,
          overflowY: 'auto',
          cursor: 'text',
          '& .ProseMirror': { outline: 'none' },
          '& .ProseMirror p.is-editor-empty:first-of-type::before': {
            content: 'attr(data-placeholder)',
            color: 'text.disabled',
            float: 'left',
            height: 0,
            pointerEvents: 'none'
          },
          '& h2': { fontSize: '1.3rem', fontWeight: 700, mt: 1.5, mb: 0.5 },
          '& h3': { fontSize: '1.1rem', fontWeight: 700, mt: 1.5, mb: 0.5 },
          '& p': { mb: 1 },
          '& ul, & ol': { pl: 3, mb: 1 },
          '& blockquote': { borderLeft: '3px solid', borderColor: 'divider', pl: 2, ml: 0, color: 'text.secondary' },
          '& a': { color: 'primary.main' }
        }}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}
