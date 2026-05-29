/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: { preflight: false },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body:    ['Figtree', 'system-ui', 'sans-serif'],
        sans:    ['Figtree', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ATD web tokens — use CSS vars (hsl format, same as git) */
        background:  'hsl(var(--background, 240 20% 4%))',
        foreground:  'hsl(var(--foreground, 210 40% 98%))',
        card:        { DEFAULT: 'hsl(var(--card, 240 25% 8%))', foreground: 'hsl(var(--card-foreground, 210 40% 98%))' },
        popover:     { DEFAULT: 'hsl(var(--popover, 240 25% 7%))', foreground: 'hsl(var(--popover-foreground, 210 40% 98%))' },
        primary:     { DEFAULT: 'hsl(var(--primary, 343 84% 52%))', foreground: 'hsl(var(--primary-foreground, 0 0% 100%))', glow: 'hsl(var(--primary-glow, 343 90% 65%))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary, 199 89% 60%))', foreground: 'hsl(var(--secondary-foreground, 240 25% 6%))' },
        muted:       { DEFAULT: 'hsl(var(--muted, 240 18% 14%))', foreground: 'hsl(var(--muted-foreground, 220 15% 65%))' },
        accent:      { DEFAULT: 'hsl(var(--accent, 199 89% 60%))', foreground: 'hsl(var(--accent-foreground, 240 25% 6%))' },
        destructive: { DEFAULT: 'hsl(var(--destructive, 0 84% 60%))', foreground: 'hsl(var(--destructive-foreground, 210 40% 98%))' },
        border:      'hsl(var(--border, 240 18% 16%))',
        input:       'hsl(var(--input, 240 18% 14%))',
        ring:        'hsl(var(--ring, 343 84% 52%))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background, 240 25% 6%))',
          foreground: 'hsl(var(--sidebar-foreground, 220 15% 75%))',
          primary: 'hsl(var(--sidebar-primary, 343 84% 52%))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground, 0 0% 100%))',
          accent: 'hsl(var(--sidebar-accent, 240 20% 12%))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground, 210 40% 98%))',
          border: 'hsl(var(--sidebar-border, 240 18% 14%))',
          ring: 'hsl(var(--sidebar-ring, 343 84% 52%))',
        },
      },
      borderRadius: {
        lg: 'var(--radius, 0.875rem)',
        md: 'calc(var(--radius, 0.875rem) - 4px)',
        sm: 'calc(var(--radius, 0.875rem) - 8px)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'float':   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-glow': { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
}
