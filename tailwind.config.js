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
          DEFAULT: '#123D7A',
          foreground: '#ffffff',
          dark: '#0B2C5F',
          light: '#2F80ED',
        },
        secondary: {
          DEFAULT: '#2F80ED',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'hsl(210, 15%, 93%)',
          foreground: 'hsl(215, 16%, 47%)',
        },
        border: '#D9E2EC',
        foreground: '#1F2937',
        background: '#FFFFFF',
        surface: '#F5F7FA',
        success: '#27AE60',
        warning: '#F2C94C',
        error: '#EB5757',
        info: '#2D9CDB',
        sidebar: {
          DEFAULT: '#0B2C5F',
          foreground: '#ffffff',
          accent: '#123D7A',
          border: '#0B2C5F',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    }
  }
}
