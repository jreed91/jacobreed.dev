## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where user-provided external links from MDX frontmatter were directly assigned to iframe `src` attributes without URL protocol validation in `getYouTubeEmbedUrl`.
**Learning:** React does not natively sanitize iframe `src` attributes. Attackers can provide `javascript:` or `data:` URIs in the frontmatter which execute arbitrary code when the iframe loads.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to ensure they are safe (`http:` or `https:`) before using them in iframe `src` attributes. Fall back to `about:blank` for unsafe protocols.
