## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-18 - [Prevent XSS in Iframe SRC via URL Validation]
**Vulnerability:** The `getYouTubeEmbedUrl` function accepted arbitrary unvalidated `videoUrl` strings (like `javascript:alert(1)`) directly into `<iframe>` `src` attributes, enabling Stored XSS.
**Learning:** `<iframe>` src attributes are vectors for executing unsafe URIs (`javascript:` and `data:`). Always parse and validate protocols explicitly using the native `URL` constructor rather than relying on loose string/Regex matching, and fall back to safe origins like `about:blank` for invalid inputs.
**Prevention:** Always enforce allow-lists for protocols (`http:`, `https:`) and validate the base path when rendering dynamic URLs in sensitive DOM attributes like `src` or `href`.
