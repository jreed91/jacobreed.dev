## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS in YouTube embeds]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` where fallback URLs were returned raw without protocol validation. If a malicious user controlled the metadata `videoUrl` and supplied a `javascript:` or `data:` URI, it could be executed when embedded into an `iframe` `src` attribute.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Regex or `startsWith` checks can often be bypassed. The native `URL` constructor is the most reliable way to extract and validate protocols safely.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor (with a dummy base URL for relative paths) before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
