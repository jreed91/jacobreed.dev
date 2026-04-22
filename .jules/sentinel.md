## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-28 - [Sanitize iframe URLs to prevent XSS]
**Vulnerability:** The `getYouTubeEmbedUrl` in `app/db/talks.ts` was returning any non-matching string exactly as provided, which was then injected into an `iframe src` attribute in `app/components/TalkLayout.tsx`. This created an XSS/SSRF risk if malicious URLs (like `javascript:alert(1)` or `data:...`) were somehow provided via the input.
**Learning:** Even when extracting components of valid URLs using Regex, ensure the default/fallback logic returns safe outputs, or enforces an allowed protocol list (e.g. `http:` / `https:`).
**Prevention:** Use the native `URL` constructor with a safe base URL (e.g. `new URL(url, 'http://localhost')`) to parse and validate protocols for unknown strings. If the protocol is safe, allow it; else default to `about:blank`.
