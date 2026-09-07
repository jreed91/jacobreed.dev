import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Mirrors the tsconfig "*": ["./*"] path mapping so bare imports like
      // 'app/db/blog' resolve correctly.
      app: path.resolve(import.meta.dirname, 'app'),
    },
  },
});
