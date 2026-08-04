const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'features', 'admin', 'articulos', 'components', 'ArticuloFormDialog.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add etiquetasDB state
content = content.replace(
  'const [categoriasDB, setCategoriasDB] = useState<any[]>([])',
  `const [categoriasDB, setCategoriasDB] = useState<any[]>([])
  const [etiquetasDB, setEtiquetasDB] = useState<any[]>([])`
);

// 2. Add form data fields
content = content.replace(
  `categorias: [] as string[]
  })`,
  `categorias: [] as string[],
    etiquetas: [] as string[],
    fecha_evento: '',
    hora_evento: '',
    modalidad_evento: '',
    expositor: '',
    link_registro: ''
  })`
);

// 3. Update useEffect and fetch
content = content.replace(
  'fetchCategorias()',
  'fetchCategorias()\n    fetchEtiquetas()'
);

const fetchEtiquetasFn = `
  const fetchEtiquetas = async () => {
    try {
      const res = await fetch('/api/admin/etiquetas-articulos')
      if (res.ok) {
        const data = await res.json()
        setEtiquetasDB(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
`;
content = content.replace(
  'const fetchArticulo = async () => {',
  `${fetchEtiquetasFn}\n  const fetchArticulo = async () => {`
);

// 4. Update fetchArticulo mapping
content = content.replace(
  'categorias: data.categorias?.map((c: any) => c.id) || []',
  `categorias: data.categorias?.map((c: any) => c.id) || [],
          etiquetas: data.etiquetas?.map((e: any) => e.id) || [],
          fecha_evento: data.fecha_evento ? new Date(data.fecha_evento).toISOString().split('T')[0] : '',
          hora_evento: data.hora_evento || '',
          modalidad_evento: data.modalidad_evento || '',
          expositor: data.expositor || '',
          link_registro: data.link_registro || ''`
);

// 5. Add Etiquetas Select in JSX (next to Categorias)
const categoriasJSX = `          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Categorías</InputLabel>
              <Select
                multiple
                value={formData.categorias}
                onChange={(e) => handleChange('categorias', e.target.value)}
                input={<OutlinedInput label="Categorías" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const cat = categoriasDB.find(c => c.id === value)
                      return <Chip key={value} label={cat?.nombre || value} size="small" />
                    })}
                  </Box>
                )}
              >
                {categoriasDB.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>`;

const etiquetasJSX = `          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Etiquetas</InputLabel>
              <Select
                multiple
                value={formData.etiquetas}
                onChange={(e) => handleChange('etiquetas', e.target.value)}
                input={<OutlinedInput label="Etiquetas" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const eti = etiquetasDB.find(e => e.id === value)
                      return <Chip key={value} label={eti?.nombre || value} size="small" color="primary" variant="outlined" />
                    })}
                  </Box>
                )}
              >
                {etiquetasDB.map((eti) => (
                  <MenuItem key={eti.id} value={eti.id}>
                    {eti.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>`;

content = content.replace(categoriasJSX, `${categoriasJSX}\n\n${etiquetasJSX}`);

// 6. Add Event conditional rendering
const tipoJSX = `          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Tipo"
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
            >
              <MenuItem value="NOTICIA">Noticia</MenuItem>
              <MenuItem value="EVENTO">Evento</MenuItem>
              <MenuItem value="EXPERTO">Experto</MenuItem>
              <MenuItem value="BLOG">Blog</MenuItem>
            </TextField>
          </Grid>`;

const eventFieldsJSX = `
          {formData.tipo === 'EVENTO' && (
            <>
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Configuración de Evento</h4>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Fecha del Evento"
                        InputLabelProps={{ shrink: true }}
                        value={formData.fecha_evento}
                        onChange={(e) => handleChange('fecha_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        type="time"
                        label="Hora (Ej. 18:00)"
                        InputLabelProps={{ shrink: true }}
                        value={formData.hora_evento}
                        onChange={(e) => handleChange('hora_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Modalidad (Online / Presencial)"
                        value={formData.modalidad_evento}
                        onChange={(e) => handleChange('modalidad_evento', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Expositor / Speaker"
                        value={formData.expositor}
                        onChange={(e) => handleChange('expositor', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Link de Registro (URL Externa)"
                        value={formData.link_registro}
                        onChange={(e) => handleChange('link_registro', e.target.value)}
                        placeholder="https://zoom.us/..."
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </>
          )}
`;

content = content.replace(tipoJSX, `${tipoJSX}\n${eventFieldsJSX}`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dialog updated');
