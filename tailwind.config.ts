import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  theme: {
    extend: {
      // Code & Craft Color Palette
      colors: {
        // Light theme colors
        'cc-deep-slate': '#1a202c',
        'cc-slate': '#2d3748',
        'cc-sage-blue': '#5fa8be',
        'cc-warm-gray': '#64748b',
        'cc-light-blue': '#e8f4f8',
        'cc-border': '#e2e8f0',
        'cc-white': '#ffffff',
        // Dark theme colors
        'cc-sky-blue': '#7dd3fc',
        'cc-soft-gray': '#cbd5e0',
      },
      // Code & Craft Typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Type scale from design spec
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.5px', fontWeight: '600' }],
        'h2': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      // Code & Craft Spacing System
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
} satisfies Config;
