## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` returned the original `videoUrl` directly without validation if it didn't match the YouTube regex, allowing unsafe URIs like `javascript:alert(1)` to be injected into the `src` attribute of `<iframe>` elements in `app/components/TalkLayout.tsx`.
**Learning:** `<iframe>` `src` attributes can execute arbitrary JavaScript if passed a `javascript:` URI. When accepting user-controlled input for an iframe source, failing to match a whitelist regex is not enough; the fallback behavior must also be safe.
**Prevention:** When dynamically setting iframe `src` attributes or external link `href` attributes from unvalidated input, enforce `http://`, `https://`, or root-relative (`/`) protocols for fallback URLs, explicitly rejecting `javascript:`, `data:`, or `vbscript:` URIs.
