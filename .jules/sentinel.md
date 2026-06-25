## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS/SSRF vulnerability where user-provided `videoUrl` in `getYouTubeEmbedUrl` was not validated when it didn't match the YouTube regex, allowing malicious URLs (e.g. `javascript:alert(1)`) to be passed directly to the `iframe` `src` attribute.
**Learning:** `iframe` `src` attributes are susceptible to `javascript:` and `data:` URI attacks. React/Next.js does not sanitize these values automatically. When using native `URL` constructors to validate URLs, empty strings fallback correctly as root-relative URLs, but invalid protocols must be strictly filtered or sanitized.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection into `iframe` `src` to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
