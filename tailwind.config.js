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
          DEFAULT: '#FFB600', // Amarillo MS&M
          foreground: '#000000', // Negro
          dark: '#E5A300', // Slightly darker yellow for hover
          light: '#FFC433', // Slightly lighter yellow
        },
        secondary: {
          DEFAULT: '#4D4D4D', // Gris oscuro
          foreground: '#FFFFFF', // Blanco
        },
        muted: {
          DEFAULT: '#F2F2F2', // Gris claro
          foreground: '#4D4D4D', // Gris oscuro
        },
        border: '#F2F2F2', // Gris claro
        foreground: '#000000', // Negro
        background: '#FFFFFF', // Blanco
        'color-1': 'hsl(43, 100%, 50%)', // Amarillo MS&M
        'color-2': 'hsl(0, 0%, 0%)', // Negro
        'color-3': 'hsl(0, 0%, 100%)', // Blanco
        'color-4': 'hsl(0, 0%, 30%)', // Gris oscuro
        'color-5': 'hsl(0, 0%, 95%)', // Gris claro
        sidebar: {
          DEFAULT: '#000000', // Negro
          foreground: '#FFFFFF', // Blanco
          accent: '#FFB600', // Amarillo MS&M
          border: '#4D4D4D', // Gris oscuro
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
