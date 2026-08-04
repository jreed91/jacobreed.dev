## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2024-08-04 - XSS via Unvalidated Iframe SRC in MDX Metadata
**Vulnerability:** The `getYouTubeEmbedUrl` function returned unvalidated `videoUrl` directly into an iframe `src` attribute when the URL didn't match the YouTube regex, allowing potential XSS via `javascript:` or `data:` URIs provided in MDX frontmatter.
**Learning:** React and Next.js do not natively sanitize strings passed to iframe `src` attributes. External inputs, even from markdown metadata, must be treated as untrusted and strictly validated.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
