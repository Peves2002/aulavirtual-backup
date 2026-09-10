// Run with: node scripts/check-services.cjs
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

function load(file) {
  const module = { exports: {} }
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
  }).outputText
  const localRequire = name => {
    if (name === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
    if (name === 'next/image') return ({ fill, priority, unoptimized, ...props }) => React.createElement('img', props)
    if (name.endsWith('/ScrollReveal')) return ({ children, className }) => React.createElement('div', { className }, children)
    if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name + '.ts'))
    return require(name)
  }
  new Function('require', 'module', 'exports', compiled)(localRequire, module, module.exports)
  return module.exports
}

const base = path.resolve(__dirname, '../src/features/web/servicios')
const { SERVICES_DATA: services } = load(path.join(base, 'data/servicesData.ts'))
assert.equal(services.length, 8)
assert.equal(new Set(services.map(s => s.slug)).size, 8)
assert.equal(new Set(services.map(s => s.image)).size, 8)
const Catalog = load(path.join(base, 'components/ServiciosClient.tsx')).default
const Detail = load(path.join(base, 'components/ServiceDetailClient.tsx')).default
const catalog = renderToStaticMarkup(React.createElement(Catalog, { waNumero: '51972972499' }))
for (const service of services) {
  assert.ok(catalog.includes(`/servicios/${service.slug}`), `Missing route: ${service.slug}`)
  assert.ok(service.imageAlt, `Missing alt: ${service.slug}`)
  for (const image of [service.image, ...service.subServicios.map(s => s.image).filter(Boolean)]) {
    assert.ok(fs.existsSync(path.resolve(__dirname, '../public', image.slice(1))), `Missing asset: ${image}`)
  }
  const detail = renderToStaticMarkup(React.createElement(Detail, { service, waNumero: '51972972499' }))
  assert.ok(detail.includes(encodeURIComponent(service.title)), `Missing WhatsApp context: ${service.slug}`)
  for (const sub of service.subServicios) assert.ok(detail.includes(sub.title), `Missing specialty: ${sub.title}`)
  for (const text of service.entregables) assert.ok(detail.includes(text), `Missing deliverable: ${service.slug}`)
}
assert.ok(services.find(s => s.id === 'monitoreos-ocupacionales').subServicios.some(s => s.title === 'Agentes químicos'))
console.log('PASS: 8 services, unique routes and covers, local images, rendered details, deliverables and WhatsApp links.')
