const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const vm = require('node:vm')
const ts = require('typescript')

// Ejecuta los handlers reales con autenticación y base de datos aisladas.
function loadRoute(file, prisma, authorized = true) {
  const auth = async () => ({ authorized, user: { id: 'alumno' }, error: { status: 401 } })
  const dependencies = {
    '@/utils/libs/prisma': { default: prisma },
    '@/utils/libs/auth-helpers': { requireAuth: auth, requireAdmin: auth },
    '@/utils/libs/apiResponse': { ApiResponse: {
      success: (_, data) => ({ status: 200, data }),
      error: (_, message, status) => ({ status, message })
    } },
    '@/utils/libs/validation': { handleApiError: error => { throw error } },
    '@/app/api/_shared/certificados/generarCodigoCertificado': {}
  }
  const source = readFileSync(path.join(__dirname, '..', file), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  })
  const exports = {}

  vm.runInNewContext(outputText, { exports, URL, require: name => {
    assert.ok(dependencies[name], `Dependencia no simulada: ${name}`)

    return dependencies[name]
  } })

  return exports
}

const studentRoute = 'src/app/api/estudiante/certificado/route.ts'
const adminRoute = 'src/app/api/admin/inscripciones/[id]/certificado/route.ts'

for (const [individual, general, enabled] of [
  [true, false, true], [false, true, false],
  [true, true, true], [false, false, false],
  [null, true, true], [null, false, false]
]) {
  test(`Certificación individual=${individual}, curso=${general}: ${enabled}`, async () => {
    const prisma = {
      inscripcion: { findUnique: async () => ({ estado: 'ACTIVO', certificacion_habilitada: individual }) },
      curso: { findUnique: async () => ({ certificacion_habilitada: general }) },
      certificado: { findUnique: async () => null },
      progresoCurso: { findUnique: async () => ({ porcentaje_progreso: 0 }) },
      examen: { findMany: async () => [] }
    }
    const route = loadRoute(studentRoute, prisma)
    const get = await route.GET({ url: 'http://localhost/api/estudiante/certificado?cursoId=curso' })

    assert.equal(get.data.certificacionHabilitada, enabled)

    const post = await route.POST({ json: async () => ({ cursoId: 'curso' }) })

    assert.equal(post.status, 403)
    assert.match(post.message, enabled ? /completar todas las lecciones/ : /aún no está habilitada/)
  })
}

test('La autorización individual mantiene el requisito de pago', async () => {
  const route = loadRoute(studentRoute, {
    inscripcion: { findUnique: async () => ({ estado: 'ACTIVO', certificacion_habilitada: true, certificado_habilitado: false }) },
    curso: { findUnique: async () => ({ certificacion_habilitada: false, precio_certificado: 50 }) }
  })
  const result = await route.POST({ json: async () => ({ cursoId: 'curso' }) })

  assert.equal(result.status, 403)
  assert.match(result.message, /pago previo/)
})

test('La acción individual y el pago actualizan campos independientes', async () => {
  const updates = []
  const route = loadRoute(adminRoute, { inscripcion: {
    findUnique: async () => ({ id: 'inscripcion' }),
    update: async args => { updates.push(args.data); return args.data }
  } })

  await route.PATCH({ json: async () => ({ habilitado: true, tipo: 'certificacion' }) }, { params: { id: 'inscripcion' } })
  await route.PATCH({ json: async () => ({ habilitado: false }) }, { params: { id: 'inscripcion' } })
  assert.equal(JSON.stringify(updates), JSON.stringify([{ certificacion_habilitada: true }, { certificado_habilitado: false }]))
})

test('La acción exige autorización de administrador', async () => {
  const route = loadRoute(adminRoute, {}, false)

  assert.equal((await route.PATCH({}, { params: { id: 'inscripcion' } })).status, 401)
})

test('La acción rechaza valores y tipos inválidos', async () => {
  const route = loadRoute(adminRoute, {})

  for (const body of [{ habilitado: 'true' }, { habilitado: true, tipo: 'otro' }]) {
    assert.equal((await route.PATCH({ json: async () => body }, { params: { id: 'inscripcion' } })).status, 400)
  }
})
