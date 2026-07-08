'use client'

import { memo, useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'

import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { HexColorPicker } from 'react-colorful'

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/

function normalizeHex(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`

  return HEX_REGEX.test(withHash) ? withHash.toUpperCase() : null
}

interface BrandingColorFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function BrandingColorFieldComponent({ label, value, onChange }: BrandingColorFieldProps) {
  const swatchRef = useRef<HTMLButtonElement>(null)
  const nativeInputRef = useRef<HTMLInputElement>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [draftColor, setDraftColor] = useState(value)
  const [textValue, setTextValue] = useState(value)
  const [supportsEyeDropper, setSupportsEyeDropper] = useState(false)

  const popoverOpen = Boolean(anchorEl)
  const displayColor = normalizeHex(draftColor) ?? normalizeHex(value) ?? '#000000'

  useEffect(() => {
    setSupportsEyeDropper(typeof window !== 'undefined' && 'EyeDropper' in window)
  }, [])

  useEffect(() => {
    setDraftColor(value)
    setTextValue(value)
  }, [value])

  const commitColor = useCallback((nextValue: string) => {
    const normalized = normalizeHex(nextValue)
    if (!normalized) return

    setDraftColor(normalized)
    setTextValue(normalized)

    if (normalized !== value) {
      onChange(normalized)
    }
  }, [onChange, value])

  useEffect(() => {
    const input = nativeInputRef.current
    if (!input) return

    input.value = displayColor

    const handleNativeChange = () => {
      commitColor(input.value)
    }

    input.addEventListener('change', handleNativeChange)

    return () => {
      input.removeEventListener('change', handleNativeChange)
    }
  }, [commitColor, displayColor])

  const handleOpenPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    commitColor(draftColor)
    setAnchorEl(null)
  }

  const handleTextCommit = () => {
    const normalized = normalizeHex(textValue)
    if (normalized) {
      commitColor(normalized)
    } else {
      setTextValue(value)
    }
  }

  const openNativeColorPicker = () => {
    const input = nativeInputRef.current
    if (!input) return

    input.value = displayColor
    input.click()
  }

  const handleEyeDropper = async () => {
    setAnchorEl(null)

    if (supportsEyeDropper) {
      try {
        type EyeDropperConstructor = new () => { open: () => Promise<{ sRGBHex: string }> }
        const EyeDropperCtor = (window as Window & { EyeDropper: EyeDropperConstructor }).EyeDropper
        const result = await new EyeDropperCtor().open()

        commitColor(result.sRGBHex)
      } catch {
        // Usuario canceló el cuenta gotas
      }
      return
    }

    openNativeColorPicker()
  }

  return (
    <Box>
      <Typography variant='body2' fontWeight={500} sx={{ mb: 1 }}>
        {label}
      </Typography>

      <Stack direction='row' spacing={1.5} alignItems='center'>
        <TextField
          fullWidth
          size='small'
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onBlur={handleTextCommit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleTextCommit()
          }}
          inputProps={{ style: { fontFamily: 'monospace', fontSize: 13 } }}
        />

        <Box
          component='button'
          type='button'
          ref={swatchRef}
          onClick={handleOpenPopover}
          title='Abrir selector de color'
          aria-label={`Seleccionar ${label}`}
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: displayColor,
            border: '2px solid',
            borderColor: 'divider',
            cursor: 'pointer',
            p: 0,
          }}
        />

        <IconButton
          size='small'
          onClick={handleEyeDropper}
          title={supportsEyeDropper ? 'Cuenta gotas' : 'Selector de color del navegador'}
          aria-label={`Cuenta gotas para ${label}`}
          sx={{
            width: 44,
            height: 44,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
          }}
        >
          <i className='tabler-color-picker' style={{ fontSize: 20 }} />
        </IconButton>
      </Stack>

      <input
        ref={nativeInputRef}
        type='color'
        tabIndex={-1}
        aria-hidden
        style={{
          position: 'fixed',
          opacity: 0,
          width: 1,
          height: 1,
          bottom: 0,
          right: 0,
          border: 0,
          padding: 0,
        }}
      />

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { p: 2, mt: 1, borderRadius: 2, overflow: 'visible' },
          },
        }}
      >
        <Stack spacing={2} alignItems='stretch'>
          <HexColorPicker color={displayColor} onChange={setDraftColor} />
          <Button variant='contained' size='small' onClick={handleClosePopover}>
            Aplicar
          </Button>
        </Stack>
      </Popover>
    </Box>
  )
}

export default memo(BrandingColorFieldComponent)

interface BrandingColorFieldBoundProps {
  label: string
  configKey: string
  value: string
  onFieldChange: (key: string, value: string) => void
}

export function BrandingColorFieldBound({
  label,
  configKey,
  value,
  onFieldChange,
}: BrandingColorFieldBoundProps) {
  const handleChange = useCallback(
    (nextValue: string) => onFieldChange(configKey, nextValue),
    [configKey, onFieldChange]
  )

  return (
    <BrandingColorFieldComponent
      label={label}
      value={value}
      onChange={handleChange}
    />
  )
}
