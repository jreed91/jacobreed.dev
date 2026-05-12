## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-12 - Prevent XSS in YouTube Embed URLs
**Vulnerability:** The `getYouTubeEmbedUrl` function returned unmodified inputs if they didn't match the YouTube regex, allowing `javascript:` and `data:` URIs to be injected via MDX frontmatter.
**Learning:** URL fallback mechanisms must explicitly validate safe protocols (e.g. `http:`, `https:`) before returning unsanitized user-provided links, even in simple regex-based extractor functions.
**Prevention:** Use the `URL` constructor with a safe dummy base (e.g., `new URL(url, 'http://localhost')`) to reliably parse and allowlist `.protocol` properties, defaulting to `about:blank` for unsafe protocols.
