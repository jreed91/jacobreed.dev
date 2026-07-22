## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2024-05-18 - XSS Vulnerability in YouTube Embed URLs
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` when falling back to external `videoUrl` directly without validating that it is a safe protocol (e.g. it allows `javascript:` or `data:` URIs, leading to XSS inside the `iframe` `src`).
**Learning:** `iframe` `src` injection is a significant vector for XSS if unvalidated input is passed to it; simple string fallback exposes the app to protocol-based attacks.
**Prevention:** Use the native `URL` constructor to reliably extract and check the `.protocol` property, ensuring it's either `http:` or `https:`. Return `about:blank` for unexpected protocols.
