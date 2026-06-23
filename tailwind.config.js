/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin'), require('tailwindcss-animate')],
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
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        'gc-display': ['Playfair Display', 'serif'],
        'gc-sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'gc-border': 'hsl(var(--gc-border) / 0.1)',
        'gc-input': 'hsl(var(--gc-input))',
        'gc-ring': 'hsl(var(--gc-ring))',
        'gc-background': 'hsl(var(--gc-background))',
        'gc-foreground': 'hsl(var(--gc-foreground))',
        'gc-blue-corp': 'hsl(var(--gc-blue-corp))',
        'gc-blue-hover': 'hsl(var(--gc-blue-hover))',
        'gc-blue-highlight': 'hsl(var(--gc-blue-highlight))',
        'gc-black': 'hsl(var(--gc-black))',
        'gc-gray-dark': 'hsl(var(--gc-gray-dark))',
        'gc-gray-medium': 'hsl(var(--gc-gray-medium))',
        'gc-gray-light': 'hsl(var(--gc-gray-light))',
        'gc-gray-perla': 'hsl(var(--gc-gray-perla))',
        'gc-primary': {
          DEFAULT: 'hsl(var(--gc-primary))',
          foreground: 'hsl(var(--gc-primary-foreground))',
        },
        'gc-secondary': {
          DEFAULT: 'hsl(var(--gc-secondary))',
          foreground: 'hsl(var(--gc-secondary-foreground))',
        },
        'gc-destructive': {
          DEFAULT: 'hsl(var(--gc-destructive))',
          foreground: 'hsl(var(--gc-destructive-foreground))',
        },
        'gc-muted': {
          DEFAULT: 'hsl(var(--gc-muted))',
          foreground: 'hsl(var(--gc-muted-foreground))',
        },
        'gc-accent': {
          DEFAULT: 'hsl(var(--gc-accent))',
          foreground: 'hsl(var(--gc-accent-foreground))',
        },
        'gc-popover': {
          DEFAULT: 'hsl(var(--gc-popover))',
          foreground: 'hsl(var(--gc-popover-foreground))',
        },
        'gc-card': {
          DEFAULT: 'hsl(var(--gc-card))',
          foreground: 'hsl(var(--gc-card-foreground))',
        },
      },
      keyframes: {
        'gc-fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'gc-fade-in-up': 'gc-fade-in-up 0.6s ease-out forwards',
        marquee: 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 45s linear infinite',
      },
    }
  },
}
