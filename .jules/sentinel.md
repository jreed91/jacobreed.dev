## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-28 - [Fix SSRF/XSS in iframe fallback URL]
**Vulnerability:** In `app/db/talks.ts`, `getYouTubeEmbedUrl` returned unmodified fallback URLs for non-YouTube links, which were used directly in the `iframe` `src` attribute in `TalkLayout.tsx`. This allowed arbitrary protocol strings like `javascript:alert(1)` to be injected, leading to a Cross-Site Scripting (XSS) / Server-Side Request Forgery (SSRF) vulnerability.
**Learning:** Fallback inputs mapping to sensitive attributes like `src` or `href` should never blindly trust user input or data sources.
**Prevention:** Always validate protocols using the native `URL` constructor (`new URL(url, base)`) and strictly allowlist safe protocols (`http:`, `https:`), falling back to a safe default like `about:blank` for unsafe protocols.
