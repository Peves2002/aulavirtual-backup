const fs = require('fs');
const path = require('path');

const tabPath = path.join(__dirname, 'src', 'features', 'admin', 'cursos', 'components', 'CourseBuilder', 'TabInformacion.tsx');
let content = fs.readFileSync(tabPath, 'utf8');

// 1. Add to initial form state
if (!content.includes("codigo_embeber: curso.codigo_embeber || ''")) {
  content = content.replace(
    "nivel: curso.nivel || ''",
    "nivel: curso.nivel || '',\n    codigo_embeber: curso.codigo_embeber || ''"
  );
}

// 2. Add to handleSave payload
if (!content.includes('codigo_embeber: form.codigo_embeber || null')) {
  content = content.replace(
    "nivel: (form.nivel || null) as 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | null",
    "nivel: (form.nivel || null) as 'BASICO' | 'INTERMEDIO' | 'AVANZADO' | null,\n          codigo_embeber: form.codigo_embeber || null"
  );
}

// 3. Add to JSX (before URL Video)
const jsxCode = `      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          multiline
          rows={5}
          label='Código Embebido (Formulario CRM)'
          name='codigo_embeber'
          value={form.codigo_embeber}
          onChange={handleChange}
          helperText='Pega aquí el código HTML/JS (Ej: Mailchimp, Sender) para reemplazar el formulario de la portada.'
          InputProps={{
            startAdornment: <InputAdornment position='start'><i className='tabler-code text-xl text-textSecondary' /></InputAdornment>
          }}
        />
      </Grid>
`;
if (!content.includes('Código Embebido (Formulario CRM)')) {
  content = content.replace(
    "<CustomTextField\n          fullWidth\n          label='URL Video Presentación del Curso",
    jsxCode + "      <CustomTextField\n          fullWidth\n          label='URL Video Presentación del Curso"
  );
}

fs.writeFileSync(tabPath, content, 'utf8');
console.log('TabInformacion.tsx updated');
