'use client'

import { Grid, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { Categoria } from '@/features/admin/categorias/entity/Categoria'

type CategoriaSubcategoriaSelectProps = {
  categorias: Categoria[]
  categoriaPadreId: string
  onCategoriaPadreChange: (padreId: string) => void
  disabled?: boolean
  gridSize?: number
}

export function CategoriaSubcategoriaSelect({
  categorias,
  categoriaPadreId,
  onCategoriaPadreChange,
  disabled = false,
  gridSize = 6
}: CategoriaSubcategoriaSelectProps) {
  return (
    <Grid item xs={12} sm={gridSize}>
      <CustomTextField
        select
        fullWidth
        label='Categoría'
        value={categoriaPadreId}
        onChange={e => onCategoriaPadreChange(e.target.value)}
        disabled={disabled}
      >
        <MenuItem value=''>Sin categoría</MenuItem>
        {categorias.map(cat => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.nombre}
          </MenuItem>
        ))}
      </CustomTextField>
    </Grid>
  )
}
