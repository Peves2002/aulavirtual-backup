'use client'

import { Grid, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import { ESCUELAS } from '@/features/web/adph/data/escuelas'

type EscuelaSelectProps = {
  value: string | null | undefined
  onChange: (escuela: string | null) => void
  disabled?: boolean
  gridSize?: number
}

export function EscuelaSelect({
  value,
  onChange,
  disabled = false,
  gridSize = 6
}: EscuelaSelectProps) {
  return (
    <Grid item xs={12} sm={gridSize}>
      <CustomTextField
        select
        fullWidth
        label='Escuela'
        value={value || ''}
        onChange={e => onChange(e.target.value || null)}
        disabled={disabled}
        helperText='Selecciona la escuela a la que pertenece este programa.'
      >
        <MenuItem value=''>
          <em>Ninguna</em>
        </MenuItem>
        {ESCUELAS.map(escuela => (
          <MenuItem key={escuela.id} value={escuela.name}>
            {escuela.name}
          </MenuItem>
        ))}
      </CustomTextField>
    </Grid>
  )
}
