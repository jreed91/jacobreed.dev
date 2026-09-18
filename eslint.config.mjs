import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import * as espree from "espree";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextCoreWebVitals,
  // eslint-config-next routes every non-.ts/.tsx file through
  // next/dist/compiled/babel/eslint-parser, whose bundled eslint-scope predates
  // ESLint 10's ScopeManager#addGlobals. Nothing here needs the Babel parser:
  // the plain-JS files are configs without JSX, and .mts is TypeScript.
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: espree,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
  },
  {
    files: ["**/*.{mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: "module" },
    },
  },
  // eslint-plugin-react 7.37.5 resolves "detect" through the removed
  // context.getFilename(); naming the version skips that code path.
  {
    settings: { react: { version: "19.2" } },
  },
];

export default config;
