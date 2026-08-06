## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Sanitize YouTube Embed URLs to Prevent XSS]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` in `app/db/talks.ts` returned arbitrary user-supplied `videoUrl` directly if it didn't match the YouTube regex. These values were then used directly in `iframe` `src` attributes in `app/components/TalkLayout.tsx`, allowing XSS execution via `javascript:` URIs.
**Learning:** `iframe` `src` attributes are susceptible to executing scripts when supplied with `javascript:` or `data:` URIs. Relying solely on a regex check without protocol validation for the fallback creates a bypass vector.
**Prevention:** Validate protocols using `new URL(url, base)`. Return the URL only if the protocol is safe (e.g., `http:`, `https:`, or a valid root-relative path parsed against a base), and fallback to `about:blank` otherwise.
