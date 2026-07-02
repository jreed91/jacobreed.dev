## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-07-02 - [XSS via Unsafe Protocols in Markdown Frontmatter]
**Vulnerability:** Found a Cross-Site Scripting (XSS) vulnerability in `getYouTubeEmbedUrl` where an attacker could provide `javascript:` or `data:` URLs in a markdown file's frontmatter `videoUrl` field, which was then directly rendered into an iframe's `src` attribute.
**Learning:** React/Next.js do not natively sanitize iframe `src` attributes against unsafe URI protocols (`javascript:`, `data:`). Because this app parses markdown frontmatter directly into React props without intermediate sanitization, any URL fields must be explicitly validated before rendering.
**Prevention:** Use the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably extract and check the `.protocol` property. Ensure valid protocols (e.g., `http:`, `https:`) before using the URL in `href` or `src` attributes, falling back to `about:blank` for unsafe protocols.
