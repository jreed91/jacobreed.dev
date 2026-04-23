## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2024-05-24 - SSRF/XSS in iframe source URLs
**Vulnerability:** External URLs specified in Markdown frontmatter (`videoUrl`) were passed into `getYouTubeEmbedUrl` which simply returned the original URL if it wasn't a YouTube format. This URL was then used directly in an `iframe`'s `src` attribute. This allowed for potential XSS via `javascript:` or `data:` URIs or SSRF.
**Learning:** URL handlers for user-provided external links or iframe sources must validate the protocol to ensure only safe origins (like `http:` and `https:`) are allowed. The native `new URL(url, base)` constructor is an effective way to parse protocols without Regex bypasses.
**Prevention:** Validate protocols (`url.protocol === 'http:' || url.protocol === 'https:'`) for any dynamically generated or user-provided `iframe` `src` attributes, safely falling back to `about:blank`.
