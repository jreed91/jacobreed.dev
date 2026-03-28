## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-20 - Unsafe Protocol URIs in Fallback URLs allow XSS
**Vulnerability:** XSS vulnerability where user-supplied URLs (from frontmatter like `videoUrl` fallback in `app/db/talks.ts`) were passed unsanitized into an iframe `src` attribute. Unsafe URIs like `javascript:alert(1)` could execute arbitrary code.
**Learning:** `iframe` elements, just like `a` and `form` actions, are susceptible to protocol-based XSS if the injected string is not validated to start with standard `http://`, `https://`, or relative `/` routes.
**Prevention:** Always validate that URLs originating from external inputs (or MDX metadata fallback) start with safe prefixes (e.g. `http://` or `https://` or `/`). Otherwise, force the value to `about:blank`.
