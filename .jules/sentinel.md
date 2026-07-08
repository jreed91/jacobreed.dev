## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-02-14 - [XSS via Fallback URL in Iframe]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` where an unvalidated fallback `videoUrl` could be passed to an `iframe`'s `src` attribute. Malicious actors could provide `javascript:` or `data:` URIs.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Regex checks can be incomplete for fallback mechanisms.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., ensuring `http:` or `https:`) before injection to prevent XSS vulnerabilities from unsafe URIs. Use `about:blank` as a safe fallback for invalid or unsafe protocols.
