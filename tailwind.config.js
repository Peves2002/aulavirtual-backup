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
        background: '#ffffff',
        foreground: '#0A0A0A',
        card: {
          DEFAULT: '#f3f5f9',
          foreground: '#0A0A0A',
        },
        primary: {
          DEFAULT: '#25927F',
          foreground: '#ffffff',
          dark: '#025E44',
          light: '#BDD962',
        },
        secondary: {
          DEFAULT: '#BDD962',
          foreground: '#0A0A0A',
        },
        muted: {
          DEFAULT: '#eef1f5',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#eef1f5',
          foreground: '#0A0A0A',
        },
        border: '#dde3ed',
        input: '#eef1f5',
        ring: '#25927F',
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
        display: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    }
  }
}
