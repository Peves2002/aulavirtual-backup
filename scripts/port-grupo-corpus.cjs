// Script de un solo uso para portar el frontend de electric-spark-academy
// (Vite + React Router) a componentes Next.js dentro de src/marketing y
// src/app/(site). Aplica: 'use client', conversion de react-router-dom a
// next/link y next/navigation, namespacing de tokens Tailwind con prefijo
// gc- para no chocar con el tema del dashboard, y conversion de imports de
// assets a rutas estaticas en /public.
const fs = require('fs')
const path = require('path')

const SRC_ROOT = 'D:/Proyectos/electric-spark-academy/src'
const DEST_ROOT = 'D:/Proyectos/aulavirtual/src/marketing'

// ── Reglas de renombrado de tokens Tailwind (orden no importa, son exactos) ──
const TOKEN_RENAMES = [
  ['bg-background', 'bg-gc-background'],
  ['bg-destructive', 'bg-gc-destructive'],
  ['bg-muted', 'bg-gc-muted'],
  ['bg-popover', 'bg-gc-popover'],
  ['bg-primary', 'bg-gc-primary'],
  ['bg-secondary', 'bg-gc-secondary'],
  ['border-border', 'border-gc-border'],
  ['border-destructive', 'border-gc-destructive'],
  ['border-muted', 'border-gc-muted'],
  ['ring-destructive', 'ring-gc-destructive'],
  ['ring-offset-background', 'ring-offset-gc-background'],
  ['ring-ring', 'ring-gc-ring'],
  ['text-destructive-foreground', 'text-gc-destructive-foreground'],
  ['text-foreground', 'text-gc-foreground'],
  ['text-muted-foreground', 'text-gc-muted-foreground'],
  ['text-popover-foreground', 'text-gc-popover-foreground'],
  ['text-primary-foreground', 'text-gc-primary-foreground'],
  ['text-primary', 'text-gc-primary'],
  ['font-sans', 'font-gc-sans'],
  ['font-display', 'font-gc-display'],
  ['section-padding', 'gc-section-padding'],
  ['container-custom', 'gc-container-custom'],
  ['btn-primary', 'gc-btn-primary'],
  ['btn-secondary', 'gc-btn-secondary'],
  ['card-hover', 'gc-card-hover'],
  ['bg-grid-pattern', 'gc-bg-grid-pattern']
]

// Tokens de color custom de Grupo Corpus que se usan con distintos prefijos de
// utilidad Tailwind (bg-, text-, border-, from-, via-, to-, ring-, shadow-...).
// Se captura cualquier prefijo de letras+guion inmediatamente antes del token
// y se reinserta con el namespace gc- (evita listar cada combinacion a mano).
// IMPORTANTE: "black" NO se incluye aqui suelto porque colisionaria con la
// utilidad de peso de fuente font-black; se listan solo los prefijos de color
// reales observados en el codigo fuente.
const PREFIXED_COLOR_TOKENS = [
  'blue-corp', 'blue-hover', 'blue-highlight',
  'gray-dark', 'gray-medium', 'gray-light', 'gray-perla'
]

const BLACK_COLOR_PREFIXES = ['bg', 'text', 'border', 'from', 'via', 'to', 'ring', 'shadow', 'fill', 'stroke', 'divide', 'outline', 'decoration', 'caret', 'accent', 'placeholder']

function renamePrefixedColorTokens(content) {
  let out = content
  for (const token of PREFIXED_COLOR_TOKENS) {
    out = out.replace(new RegExp(`([a-zA-Z]+-)${token}\\b`, 'g'), `$1gc-${token}`)
  }
  for (const prefix of BLACK_COLOR_PREFIXES) {
    out = out.replace(new RegExp(`\\b${prefix}-black\\b`, 'g'), `${prefix}-gc-black`)
  }
  out = out.replace(/var\(--blue-corp\)/g, 'var(--gc-blue-corp)')
  return out
}

// ── Reglas de imports locales conocidos (rutas exactas, en orden) ──
const IMPORT_REWRITES = [
  [/from ["']@\/components\/site\/SubpageLayout["']/g, 'from "@/marketing/components/site/SubpageLayout"'],
  [/from ["'](?:\.\.\/)+components\/site\/Navbar["']/g, 'from "@/marketing/components/site/Navbar"'],
  [/from ["'](?:\.\.\/)+components\/site\/Footer["']/g, 'from "@/marketing/components/site/Footer"'],
  [/from ["']@\/components\/site\/([A-Za-z]+)["']/g, 'from "@/marketing/components/site/$1"'],
  [/from ["']\.\/(Navbar|Footer|Floating)["']/g, 'from "./$1"']
]

function convertAssetImports(content) {
  // import X from "../assets/logos/y.svg" | "../../assets/y.png" -> const X = "/images/grupo-corpus/.../y.ext"
  return content.replace(
    /import\s+(\w+)\s+from\s+["'](?:\.\.\/)+assets\/(.+?)["'];?/g,
    (_match, varName, assetPath) => `const ${varName} = "/images/grupo-corpus/${assetPath}"`
  )
}

function convertReactRouter(content) {
  let out = content

  // Imports combinados conocidos (mas especificos primero)
  out = out.replace(
    /import\s*\{\s*Link\s*,\s*useLocation\s*,\s*useNavigate\s*\}\s*from\s*["']react-router-dom["'];?/g,
    'import Link from "next/link"\nimport { usePathname, useRouter } from "next/navigation"'
  )
  out = out.replace(
    /import\s*\{\s*Link\s*,\s*useParams\s*,\s*useNavigate\s*\}\s*from\s*["']react-router-dom["'];?/g,
    'import Link from "next/link"\nimport { useParams, useRouter } from "next/navigation"'
  )
  out = out.replace(
    /import\s*\{\s*useLocation\s*\}\s*from\s*["']react-router-dom["'];?/g,
    'import { usePathname } from "next/navigation"'
  )
  out = out.replace(
    /import\s*\{\s*Link\s*\}\s*from\s*["']react-router-dom["'];?/g,
    'import Link from "next/link"'
  )

  // Prop to= -> href= (solo aparece en componentes <Link>/<NavLink> en este repo)
  out = out.replace(/\bto=/g, 'href=')

  // Hooks
  out = out.replace(/const\s+location\s*=\s*useLocation\(\);?/g, 'const pathname = usePathname()')
  out = out.replace(/location\.pathname/g, 'pathname')
  out = out.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter()')
  out = out.replace(/\bnavigate\(/g, 'router.push(')

  return out
}

function renameTokens(content) {
  let out = content
  for (const [from, to] of TOKEN_RENAMES) {
    out = out.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
  }
  return out
}

function rewriteImports(content) {
  let out = content
  for (const [pattern, replacement] of IMPORT_REWRITES) {
    out = out.replace(pattern, replacement)
  }
  return out
}

function transform(content) {
  let out = content
  out = convertAssetImports(out)
  out = convertReactRouter(out)
  out = rewriteImports(out)
  out = renameTokens(out)
  out = renamePrefixedColorTokens(out)
  if (!out.startsWith("'use client'")) {
    out = `'use client'\n\n${out}`
  }
  return out
}

function portFile(srcRel, destRel) {
  const srcPath = path.join(SRC_ROOT, srcRel)
  const destPath = path.join(DEST_ROOT, destRel)
  const content = fs.readFileSync(srcPath, 'utf8')
  const transformed = transform(content)
  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  fs.writeFileSync(destPath, transformed, 'utf8')
  console.log(`OK ${srcRel} -> src/marketing/${destRel}`)
}

const SITE_COMPONENTS = [
  'About', 'Certification', 'Contact', 'Courses', 'Faq', 'FinalCTA', 'Floating',
  'Footer', 'Hero', 'Marquee', 'Methodology', 'Navbar', 'Pricing',
  'SoftwareShowcase', 'StatsBar', 'SubpageLayout', 'Testimonials', 'WhyUs'
]

for (const name of SITE_COMPONENTS) {
  portFile(`components/site/${name}.tsx`, `components/site/${name}.tsx`)
}

const PAGES = ['Index', 'CampusVirtual', 'Contacto', 'CursosCatalogo', 'CursosEnVivo', 'Nosotros', 'Recursos']

for (const name of PAGES) {
  portFile(`pages/${name}.tsx`, `pages/${name}.tsx`)
}

console.log('Listo.')
