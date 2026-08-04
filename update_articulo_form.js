const fs = require('fs');
const path = require('path');

const formPath = path.join(__dirname, 'src', 'features', 'admin', 'articulos', 'components', 'ArticuloFormDialog.tsx');
let content = fs.readFileSync(formPath, 'utf8');

// 1. Add to initial form state
if (!content.includes("codigo_embeber: articulo?.codigo_embeber || ''")) {
  content = content.replace(
    "link_registro: articulo?.link_registro || ''",
    "link_registro: articulo?.link_registro || '',\n    codigo_embeber: articulo?.codigo_embeber || ''"
  );
}

// 2. Add to handleSave mapping
if (!content.includes('codigo_embeber: formData.codigo_embeber')) {
  content = content.replace(
    "link_registro: formData.link_registro,",
    "link_registro: formData.link_registro,\n      codigo_embeber: formData.codigo_embeber,"
  );
}

// 3. Add JSX
const jsxCode = `          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Código Embebido (Formulario CRM)"
              value={formData.codigo_embeber}
              onChange={(e) => handleChange('codigo_embeber', e.target.value)}
              helperText="Pega aquí el código HTML/JS (Ej: Mailchimp, Sender) para reemplazar el formulario o registro nativo."
            />
          </Grid>
`;

if (!content.includes('Código Embebido (Formulario CRM)')) {
  content = content.replace(
    '<Grid item xs={12}>\n            <TextField\n              fullWidth\n              multiline\n              rows={3}\n              label="Resumen"',
    jsxCode + '          <Grid item xs={12}>\n            <TextField\n              fullWidth\n              multiline\n              rows={3}\n              label="Resumen"'
  );
}

fs.writeFileSync(formPath, content, 'utf8');
console.log('ArticuloFormDialog.tsx updated');
