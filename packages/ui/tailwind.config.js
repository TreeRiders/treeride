/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--color-background)',
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tinted: 'var(--color-background-tinted)',
        },
        foreground: {
          DEFAULT: 'var(--color-foreground)',
          100: 'var(--color-foreground-100)',
          400: 'var(--color-foreground-400)',
          600: 'var(--color-foreground-600)',
        },
        selection: {
          DEFAULT: 'var(--color-selection)',
          100: 'var(--color-selection-100)',
        },
        blink: {
          DEFAULT: 'var(--color-blink)',
        },
        border: {
          DEFAULT: 'var(--color-border-100)',
          100: 'var(--color-border-100)',
          200: 'var(--color-border-200)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
      },
      backgroundImage: {
        window: 'linear-gradient(to bottom, var(--color-background-primary) 0%, var(--color-background-secondary) 70%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('tailwindcss-animate')],
}
