## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix XSS in iframe src attribute]
**Vulnerability:** XSS vulnerability where standard unsanitized string values (e.g. `videoUrl` fallback in MDX frontmatter) were injected directly into an `iframe` `src` attribute via `getYouTubeEmbedUrl`.
**Learning:** External links sourced from user-provided content or MDX frontmatter can contain unsafe URIs like `javascript:` or `data:`, bypassing validation entirely if relying strictly on Regex meant for specific host matching (like YouTube). React natively protects `href` tags but does not sanitize strings passed to `iframe` `src`.
**Prevention:** Validate protocols of external URLs using the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`). Enforce `http:` or `https:`, and safely fall back to `about:blank` for unsafe URIs.
