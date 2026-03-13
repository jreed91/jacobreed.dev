## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-12 - MDX Frontmatter Iframe XSS
**Vulnerability:** XSS via unsafe URIs (`javascript:`) in MDX frontmatter fields mapped directly to `iframe src` attributes (e.g., `videoUrl`).
**Learning:** Next.js Server Components rendering MDX content can act as an injection vector if frontmatter metadata isn't sanitized before being applied as DOM attributes. In this codebase, the fallback for non-YouTube `videoUrl`s allowed arbitrary unsafe schemes like `javascript:` and `data:`.
**Prevention:** Explicitly validate URL schemes using the native `URL` API and fallback to safe paths (e.g., `/`) or allowed schemes (`http:`, `https:`). Ensure relative paths (e.g., those starting with `/`) are correctly handled when validating.
