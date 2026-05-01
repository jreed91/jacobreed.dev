## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix fallback URL XSS via Protocol Validation]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` where fallback URLs (e.g., from MDX frontmatter) were returned unchanged and injected directly into `iframe src` attributes.
**Learning:** `javascript:` and `data:` URIs placed inside dynamic frontend attributes (`href`, `src`) execute within the context of the user's browser, leading to XSS. Standard Regex checks or `.startsWith()` are easily bypassed with padding (`  javascript:alert()`).
**Prevention:** Always validate external or user-provided URLs by passing them through the native `URL` constructor (providing a dummy base URL `new URL(url, 'http://localhost')` for relative path resilience). Enforce an allowlist of safe protocols (e.g., `http:`, `https:`).
