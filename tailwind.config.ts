import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  theme: {
    extend: {},
  },
} satisfies Config;
