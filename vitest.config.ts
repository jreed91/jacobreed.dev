import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Mirrors tsconfig "baseUrl": "." so bare imports like 'app/db/blog' resolve correctly
      app: path.resolve(__dirname, 'app'),
    },
  },
});
