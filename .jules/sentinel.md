## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` where an unrecognized URL in talk frontmatter was passed unsanitized directly to an iframe's `src` attribute.
**Learning:** Iframes and links parsing user/metadata URLs can execute XSS if an attacker inputs a `javascript:` or `data:` URI.
**Prevention:** Always validate and sanitize fallback URIs dynamically passed to `href` or `src` attributes. Require safe protocols (`http://`, `https://`) or relative paths (`/`), and fallback to a safe default like `about:blank`.
