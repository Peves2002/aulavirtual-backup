/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#25927F',
          foreground: '#ffffff',
          dark: '#025E44',
          light: '#BDD962',
        },
        /* Coplimita semantic tokens (web pages) */
        secondary: { DEFAULT: '#f3f4f8', foreground: '#1e3558' },
        muted:     { DEFAULT: '#f3f4f8', foreground: '#6b7280' },
        card:      { DEFAULT: '#ffffff', foreground: '#1e3558' },
        border:    'hsl(214, 20%, 88%)',
        foreground: '#1e3558',
        background: '#ffffff',
        /* Coplimita brand palette (from oklch originals) */
        'brand-navy':      '#1e3558',
        'brand-navy-deep': '#141e3d',
        'brand-teal':      '#42b8c9',
        'brand-orange':    '#f47a22',
        'brand-lime':      '#89cc18',
        /* Legacy dashboard colors */
        'color-1': 'hsl(170, 60%, 36%)',
        'color-2': 'hsl(75, 63%, 62%)',
        'color-3': 'hsl(167, 96%, 19%)',
        'color-4': 'hsl(152, 50%, 46%)',
        'color-5': 'hsl(0, 0%, 4%)',
        sidebar: {
          DEFAULT: 'hsl(167, 96%, 19%)',
          foreground: '#ffffff',
          accent: 'hsl(170, 60%, 36%)',
          border: 'hsl(167, 96%, 25%)',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  }
}
