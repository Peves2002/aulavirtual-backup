const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'features', 'admin', 'cursos', 'components', 'CourseBuilder', 'TabInformacion.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state for estado_venta
if (!content.includes('estado_venta: curso.estado_venta')) {
  content = content.replace(
    "nivel: curso.nivel || '',",
    "nivel: curso.nivel || '',\n    estado_venta: curso.estado_venta || 'EN_CONVOCATORIA',"
  );
}

// 2. Add estado_venta to payload
if (!content.includes('estado_venta: form.estado_venta,')) {
  content = content.replace(
    "nivel: (form.nivel || null) as 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | null,",
    "nivel: (form.nivel || null) as 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | null,\n          estado_venta: form.estado_venta,"
  );
}

// 3. Add UI selector for estado_venta right after tipo_emision
const uiSnippet = `          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant='body2' color='text.secondary'>Estado de Venta:</Typography>
          <Button
            variant={form.estado_venta === 'EN_CONVOCATORIA' ? 'contained' : 'outlined'}
            size='small'
            onClick={() => setForm(prev => ({ ...prev, estado_venta: 'EN_CONVOCATORIA' }))}
            startIcon={<i className='tabler-megaphone' />}
          >
            En Convocatoria
          </Button>
          <Button
            variant={form.estado_venta === 'ASINCRONICO' ? 'contained' : 'outlined'}
            size='small'
            onClick={() => setForm(prev => ({ ...prev, estado_venta: 'ASINCRONICO' }))}
            startIcon={<i className='tabler-shopping-cart' />}
          >
            Asincrónico (Grabado)
          </Button>
        </Box>
      </Grid>

      {(form.tipo_emision === 'SINCRONO' || form.tipo_emision === 'MIXTO') && (`;

if (!content.includes('Estado de Venta:')) {
  content = content.replace(
    "          </Button>\n        </Box>\n      </Grid>\n      {(form.tipo_emision === 'SINCRONO' || form.tipo_emision === 'MIXTO') && (",
    uiSnippet
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('TabInformacion.tsx updated successfully');
