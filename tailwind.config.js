const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
  darkMode: 'class',
  theme: {},
  variants: {
    typography: ['dark']
  },
  plugins: [require('@tailwindcss/typography')]
};