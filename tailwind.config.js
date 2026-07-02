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
        secondary: {
          DEFAULT: '#BDD962',
          foreground: '#0A0A0A',
        },
        muted: {
          DEFAULT: 'hsl(210, 15%, 93%)',
          foreground: 'hsl(215, 16%, 47%)',
        },
        border: 'hsl(214, 20%, 88%)',
        foreground: '#0A0A0A',
        background: 'hsl(0, 0%, 100%)',
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
        // Marca ADPH Group — usada solo en src/app/(web) y src/features/web/adph
        adph: {
          navy: '#1B3A6B',
          'navy-deep': '#13294D',
          teal: '#3BA8C5',
          'teal-glow': '#7FD1E5',
          'teal-dark': '#0083B0',
          graylux: '#8C9198',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        adph: ['var(--adph-font)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'adph-gradient-hero': 'linear-gradient(135deg, rgba(19,41,77,0.92), rgba(27,58,107,0.55) 60%, rgba(27,58,107,0.15))',
        'adph-gradient-navy': 'linear-gradient(135deg, #13294D, #1B3A6B)',
        'adph-gradient-teal': 'linear-gradient(135deg, #3BA8C5, #7FD1E5)',
      },
      boxShadow: {
        'adph-elegant': '0 20px 60px -20px rgba(27,58,107,0.35)',
        'adph-glow': '0 10px 40px -10px rgba(59,168,197,0.5)',
      },
    }
  }
}
