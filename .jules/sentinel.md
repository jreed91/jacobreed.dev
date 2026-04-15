## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2024-05-18 - [Fix Server-Side Request Forgery / XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS and SSRF vulnerability where fallback logic in `getYouTubeEmbedUrl` directly returned any unverified string (including `javascript:` or `data:`) into an iframe `src` if it didn't match the YouTube regex.
**Learning:** Returning unvalidated fallback URLs for iframe sources can lead to XSS if a content author accidentally or maliciously includes unsafe protocols (e.g. `javascript:alert(1)`).
**Prevention:** Use the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`) to reliably extract and check the `.protocol` property and enforce safe protocols like `http:` and `https:`, returning `about:blank` for unsafe inputs.
