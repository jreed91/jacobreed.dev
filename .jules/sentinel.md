## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-07 - [HIGH] Fix XSS Vulnerability in Talk Video Iframe URL
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` fell back to returning the unvalidated original string if it wasn't a YouTube URL, which allowed `javascript:` protocols to be injected into an iframe `src` attribute.
**Learning:** Fallback URLs in `iframe` or `a` tags derived from dynamic sources (like MDX frontmatter) must be explicitly validated against an allowlist of safe protocols (like `http:` and `https:`) to prevent XSS.
**Prevention:** Use `new URL(url, base)` to validate protocols instead of relying on regex or `startsWith`, and explicitly fallback to `'about:blank'` for invalid or unsafe protocols.
